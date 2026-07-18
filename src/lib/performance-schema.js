import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createPerformanceTables() {
  try {
    await pool.query(`

      CREATE TABLE IF NOT EXISTS mock_attempts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        exam VARCHAR(100) NOT NULL,
        total_questions INTEGER NOT NULL,
        correct INTEGER NOT NULL,
        wrong INTEGER NOT NULL,
        unattempted INTEGER NOT NULL,
        score INTEGER NOT NULL,
        total_marks INTEGER NOT NULL,
        time_taken INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS question_attempts (
        id SERIAL PRIMARY KEY,
        mock_attempt_id INTEGER REFERENCES mock_attempts(id),
        user_id INTEGER REFERENCES users(id),
        exam VARCHAR(100) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        topic VARCHAR(100),
        question_id INTEGER REFERENCES questions(id),
        selected_answer VARCHAR(1),
        correct_answer VARCHAR(1),
        is_correct BOOLEAN,
        is_unattempted BOOLEAN DEFAULT false,
        time_spent INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS student_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        target_exam VARCHAR(100),
        exam_date DATE,
        daily_study_hours INTEGER DEFAULT 4,
        current_level VARCHAR(20) DEFAULT 'beginner',
        strong_subjects TEXT[],
        weak_subjects TEXT[],
        total_mocks_taken INTEGER DEFAULT 0,
        average_score DECIMAL(5,2) DEFAULT 0,
        last_active DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS daily_missions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        mission_date DATE NOT NULL,
        tasks JSONB NOT NULL,
        completed_tasks JSONB DEFAULT '[]',
        is_completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS mistake_bank (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        exam VARCHAR(100) NOT NULL,
        subject VARCHAR(100) NOT NULL,
        topic VARCHAR(100),
        question_id INTEGER REFERENCES questions(id),
        mistake_type VARCHAR(50),
        frequency INTEGER DEFAULT 1,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_resolved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS revision_schedule (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        subject VARCHAR(100) NOT NULL,
        topic VARCHAR(100) NOT NULL,
        priority INTEGER DEFAULT 1,
        next_revision DATE,
        last_revised DATE,
        revision_count INTEGER DEFAULT 0,
        mastery_level INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

    `);

    console.log('Performance tables created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating performance tables:', error);
    process.exit(1);
  }
}

createPerformanceTables();