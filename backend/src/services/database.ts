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
      phone TEXT,
      segment TEXT,
      esg_level INTEGER,
      conversation_summary TEXT,
      advisor_reason TEXT,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Migration: add any missing columns to existing databases
  const cols = (db.pragma('table_info(leads)') as { name: string }[]).map((c) => c.name);
  const migrations: [string, string][] = [
    ['phone',                'ALTER TABLE leads ADD COLUMN phone TEXT'],
    ['segment',              'ALTER TABLE leads ADD COLUMN segment TEXT'],
    ['esg_level',            'ALTER TABLE leads ADD COLUMN esg_level INTEGER'],
    ['conversation_summary', 'ALTER TABLE leads ADD COLUMN conversation_summary TEXT'],
    ['advisor_reason',       'ALTER TABLE leads ADD COLUMN advisor_reason TEXT'],
    ['status',               "ALTER TABLE leads ADD COLUMN status TEXT DEFAULT 'new'"],
  ];
  for (const [col, sql] of migrations) {
    if (!cols.includes(col)) db.exec(sql);
  }

  console.log('Database initialized.');
}
