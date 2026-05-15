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
      segment TEXT,
      esg_level INTEGER,
      conversation_summary TEXT,
      advisor_reason TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  console.log('Database initialized.');
}
