import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(path.join(__dirname, '../data/unicredit.db'));
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export function initDatabase(): void {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      employment_status TEXT,
      monthly_income REAL,
      monthly_spending REAL,
      savings REAL,
      goals TEXT,
      risk_tolerance TEXT,
      interested_products TEXT,
      money_problems TEXT,
      banking_preference TEXT,
      conversation_summary TEXT,
      advisor_reason TEXT,
      additional_notes TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  console.log('Database initialized.');
}
