import { getDb } from './database';
import { Lead, LeadInput } from '../types';

export function insertLead(input: LeadInput): number {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO leads
      (name, phone, segment, esg_level, conversation_summary, advisor_reason)
    VALUES
      (@name, @phone, @segment, @esg_level, @conversation_summary, @advisor_reason)
  `);
  const result = stmt.run(input);
  return result.lastInsertRowid as number;
}

export function getAllLeads(): Lead[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  return rows as Lead[];
}

export function updateLeadStatus(id: number, status: string): void {
  getDb().prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, id);
}
