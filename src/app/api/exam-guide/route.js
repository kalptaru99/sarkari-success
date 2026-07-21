import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const examData = {
  "SSC CGL": {
    fullName: "SSC Combined Graduate Level",
    pattern: "Tier 1 (100 questions, 200 marks) + Tier 2 (3 Papers)",
    negativeMarking: "0.5 marks per wrong answer",
    subjects: ["Quantitative Aptitude", "General Intelligence", "English Language", "General Awareness"],
    topTopics: {
      "Quantitative Aptitude": ["Geometry (9-15 questions in Tier 2)", "Data Interpretation", "Trigonometry", "Mensuration", "Percentage"],
      "General Intelligence": ["Coding-Decoding", "Analogy", "Number Series", "Syllogism", "Blood Relations"],
      "English Language": ["Reading Comprehension (15-30 in Tier 2)", "Para Jumbles", "Error Spotting", "Active-Passive Voice"],
      "General Awareness": ["Indian History", "Polity", "Economy", "Static GK", "Current Affairs"]
    },
    cutoffs: { "2024": 153, "2023": 149, "2022": 114, "2021": 140, "2020": 147 },
    totalMarks: 200,
  },
  "SSC CHSL": {
    fullName: "SSC Combined Higher Secondary Level",
    pattern: "Tier 1 (100 questions, 200 marks) + Tier 2",
    negativeMarking: "0.5 marks per wrong answer",
    subjects: ["Quantitative Aptitude", "General Intelligence", "English Language", "General Awareness"],
    topTopics: {
      "Quantitative Aptitude": ["Number System", "Percentage", "Profit & Loss", "Time & Work", "Geometry"],
      "General Intelligence": ["Analogy", "Series", "Coding-Decoding", "Blood Relations"],
      "English Language": ["Reading Comprehension", "Error Detection", "Fill in Blanks", "Vocabulary"],
      "General Awareness": ["History", "Geography", "Polity", "Current Affairs"]
    },
    cutoffs: { "2024": 132, "2023": 128, "2022": 134, "2021": 130 },
    totalMarks: 200,
  },
  "RRB NTPC": {
    fullName: "Railway Recruitment Board Non-Technical Popular Categories",
    pattern: "CBT 1 (100 questions) + CBT 2 (120 questions)",
    negativeMarking: "0.33 marks per wrong answer",
    subjects: ["Mathematics", "General Intelligence", "General Awareness"],
    topTopics: {
      "Mathematics": ["Number System", "Percentage", "Ratio & Proportion", "Time & Work", "Geometry"],
      "General Intelligence": ["Analogy", "Series", "Coding-Decoding", "Syllogism"],
      "General Awareness": ["Railway GK", "History", "Geography", "Science", "Current Affairs"]
    },
    cutoffs: { "2024": 75, "2023": 72, "2022": 78, "2021": 74 },
    totalMarks: 100,
  },
  "IBPS PO": {
    fullName: "Institute of Banking Personnel Selection Probationary Officer",
    pattern: "Prelims (100 marks) + Mains (200 marks) + Interview",
    negativeMarking: "0.25 marks per wrong answer",
    subjects: ["Quantitative Aptitude", "Reasoning Ability", "English Language", "General Awareness", "Computer Knowledge"],
    topTopics: {
      "Quantitative Aptitude": ["Data Interpretation", "Number Series", "Quadratic Equations", "Arithmetic"],
      "Reasoning Ability": ["Puzzles", "Seating Arrangement", "Syllogism", "Inequalities"],
      "English Language": ["Reading Comprehension", "Error Detection", "Para Jumbles"],
      "General Awareness": ["Banking Awareness", "Current Affairs", "Financial Terms"]
    },
    cutoffs: { "2024": 58, "2023": 55, "2022": 60, "2021": 56 },
    totalMarks: 100,
  },
  "BPSC": {
    fullName: "Bihar Public Service Commission Combined Competitive Examination",
    pattern: "Prelims (150 marks) + Mains (900 marks) + Interview",
    negativeMarking: "No negative marking in Prelims",
    subjects: ["General Studies Paper 1", "General Studies Paper 2", "Hindi Language"],
    topTopics: {
      "General Studies Paper 1": ["Bihar History", "General Science", "Current Affairs", "Geography"],
      "General Studies Paper 2": ["Indian History", "Indian Polity", "Economy", "Bihar GK"],
      "Hindi Language": ["Grammar", "Essay", "Comprehension"]
    },
    cutoffs: { "2024": 112, "2023": 108, "2022": 115, "2021": 110 },
    totalMarks: 150,
  },
  "UPSC Civil Services": {
    fullName: "UPSC Civil Services Examination (IAS/IPS/IFS)",
    pattern: "Prelims (400 marks) + Mains (1750 marks) + Interview (275 marks)",
    negativeMarking: "0.83 marks per wrong answer in Prelims",
    subjects: ["GS Paper 1", "GS Paper 2", "GS Paper 3", "GS Paper 4 Ethics", "CSAT"],
    topTopics: {
      "GS Paper 1": ["Modern History", "World History", "Geography", "Art & Culture", "Indian Society"],
      "GS Paper 2": ["Indian Polity", "Governance", "International Relations", "Social Justice"],
      "GS Paper 3": ["Economy", "Agriculture", "Environment", "Science & Technology"],
      "GS Paper 4 Ethics": ["Ethics", "Integrity", "Case Studies", "Emotional Intelligence"]
    },
    cutoffs: { "2024": 100, "2023": 90, "2022": 105, "2021": 87 },
    totalMarks: 200,
  },
};

export async function GET(request) {
  try {
    const session = await getServerSession();
    const { searchParams } = new URL(request.url);
    const exam = searchParams.get('exam') || 'SSC CGL';
    const preview = searchParams.get('preview') === 'true';

    const data = examData[exam] || examData['SSC CGL'];

    if (preview) {
      return Response.json({
        success: true,
        preview: false,
        exam,
        examData: data,
        aiAnalysis: null,
      });
    }

    if (!session?.user?.email) {
      return Response.json({ error: 'Login required', needsLogin: true }, { status: 401 });
    }

    const userResult = await pool.query(
      'SELECT id, name FROM users WHERE email = $1',
      [session.user.email]
    );

    const userId = userResult.rows[0].id;
    const userName = userResult.rows[0].name;

    const profile = await pool.query('SELECT * FROM student_profiles WHERE user_id = $1', [userId]);
    const attempts = await pool.query('SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [userId]);
    const subjectPerformance = await pool.query(
      'SELECT subject, ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy FROM question_attempts WHERE user_id = $1 GROUP BY subject ORDER BY accuracy ASC',
      [userId]
    );

    const avgScore = attempts.rows.length > 0
      ? Math.round(attempts.rows.reduce((sum, a) => sum + (a.correct / a.total_questions * 100), 0) / attempts.rows.length)
      : 0;

    const language = profile.rows[0]?.preferred_language || 'Hindi';

    const prompt = 'You are an expert exam analyst for Indian government exams.\n\n'
      + 'Create a personalized Exam Intelligence Report for:\n'
      + 'Student: ' + userName + '\n'
      + 'Target Exam: ' + exam + ' (' + data.fullName + ')\n'
      + 'Language: ' + language + '\n\n'
      + 'Student Performance:\n'
      + 'Average Mock Score: ' + avgScore + '%\n'
      + 'Subject-wise Accuracy:\n'
      + subjectPerformance.rows.map(s => '- ' + s.subject + ': ' + s.accuracy + '%').join('\n') + '\n\n'
      + 'Exam Data:\n'
      + 'Pattern: ' + data.pattern + '\n'
      + 'Negative Marking: ' + data.negativeMarking + '\n'
      + 'Recent Cutoffs: ' + Object.entries(data.cutoffs).map(([y, s]) => y + ': ' + s).join(', ') + '\n\n'
      + 'Top Topics by Subject:\n'
      + Object.entries(data.topTopics).map(([sub, topics]) => sub + ': ' + topics.join(', ')).join('\n') + '\n\n'
      + 'Generate a personalized report with these sections:\n\n'
      + 'EXAM OVERVIEW\n'
      + '[Brief overview of exam pattern and difficulty]\n\n'
      + 'YOUR CURRENT POSITION\n'
      + '[Based on student score vs cutoff - honest assessment]\n\n'
      + 'TOP 5 TOPICS TO FOCUS NOW\n'
      + '[Based on exam weightage AND student weak areas]\n\n'
      + 'TOPICS TO SKIP OR DEPRIORITIZE\n'
      + '[Low weightage topics the student can skip]\n\n'
      + '6-MONTH STUDY ROADMAP\n'
      + '[Month-wise plan specific to this student]\n\n'
      + 'DAILY STUDY SCHEDULE\n'
      + '[Hours per subject per day]\n\n'
      + 'BOOK RECOMMENDATIONS\n'
      + '[Best books for this specific exam]\n\n'
      + 'SELECTION PREDICTION\n'
      + '[Honest prediction if student follows the plan]\n\n'
      + 'Write in ' + language + ' language. Be specific, data-driven and encouraging. Use actual numbers from the data.';

    const aiResponse = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 3000,
      messages: [{ role: 'user', content: prompt }]
    });

    return Response.json({
      success: true,
      preview: false,
      exam,
      examData: data,
      userName,
      avgScore,
      subjectPerformance: subjectPerformance.rows,
      aiAnalysis: aiResponse.content[0].text,
      language,
    });

  } catch (error) {
    console.error('Exam guide error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}