import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    const session = await getServerSession();
    const {
      exam,
      questions,
      selectedAnswers,
      timeTaken,
      timePerQuestion,
    } = await request.json();

    if (!session?.user?.email) {
      return Response.json({ error: 'Login required' }, { status: 401 });
    }

    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.rows[0].id;

    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    questions.forEach((q, i) => {
      if (!selectedAnswers[i]) {
        unattempted++;
      } else if (selectedAnswers[i] === q.correct_answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = correct;
    const totalMarks = questions.length;

    const attemptResult = await pool.query(
      `INSERT INTO mock_attempts 
        (user_id, exam, total_questions, correct, wrong, unattempted, score, total_marks, time_taken)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [userId, exam, questions.length, correct, wrong, unattempted, score, totalMarks, timeTaken]
    );

    const mockAttemptId = attemptResult.rows[0].id;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const selected = selectedAnswers[i] || null;
      const isCorrect = selected === q.correct_answer;
      const isUnattempted = !selected;

      await pool.query(
        `INSERT INTO question_attempts
          (mock_attempt_id, user_id, exam, subject, topic, question_id, selected_answer, correct_answer, is_correct, is_unattempted, time_spent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [mockAttemptId, userId, exam, q.topic, null, q.id, selected, q.correct_answer, isCorrect, isUnattempted, timePerQuestion?.[i] || null]
      );

      if (!isCorrect && !isUnattempted) {
        const existing = await pool.query(
          'SELECT id, frequency FROM mistake_bank WHERE user_id = $1 AND question_id = $2',
          [userId, q.id]
        );

        if (existing.rows.length > 0) {
          await pool.query(
            'UPDATE mistake_bank SET frequency = frequency + 1, last_seen = NOW() WHERE id = $1',
            [existing.rows[0].id]
          );
        } else {
          await pool.query(
            `INSERT INTO mistake_bank (user_id, exam, subject, topic, question_id, mistake_type)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, exam, q.topic, null, q.id, 'wrong_answer']
          );
        }
      }
    }

    await pool.query(
      `INSERT INTO student_profiles (user_id, target_exam, total_mocks_taken, average_score, last_active)
       VALUES ($1, $2, 1, $3, CURRENT_DATE)
       ON CONFLICT (user_id) DO UPDATE SET
         total_mocks_taken = student_profiles.total_mocks_taken + 1,
         average_score = (student_profiles.average_score * student_profiles.total_mocks_taken + $3) / (student_profiles.total_mocks_taken + 1),
         last_active = CURRENT_DATE`,
      [userId, exam, (score / totalMarks) * 100]
    );

    return Response.json({
      success: true,
      mockAttemptId,
      correct,
      wrong,
      unattempted,
      score,
      totalMarks,
    });

  } catch (error) {
    console.error('Mock attempt error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return Response.json({ error: 'Login required' }, { status: 401 });
    }

    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.rows[0].id;

    const attempts = await pool.query(
      `SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20`,
      [userId]
    );

    const subjectPerformance = await pool.query(
      `SELECT 
        subject,
        COUNT(*) as total,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
        SUM(CASE WHEN NOT is_correct AND NOT is_unattempted THEN 1 ELSE 0 END) as wrong
       FROM question_attempts 
       WHERE user_id = $1
       GROUP BY subject
       ORDER BY correct DESC`,
      [userId]
    );

    const mistakeBank = await pool.query(
      `SELECT mb.*, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.explanation
       FROM mistake_bank mb
       JOIN questions q ON mb.question_id = q.id
       WHERE mb.user_id = $1 AND mb.is_resolved = false
       ORDER BY mb.frequency DESC
       LIMIT 10`,
      [userId]
    );

    return Response.json({
      attempts: attempts.rows,
      subjectPerformance: subjectPerformance.rows,
      mistakeBank: mistakeBank.rows,
    });

  } catch (error) {
    console.error('Get attempts error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}