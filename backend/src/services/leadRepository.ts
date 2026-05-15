import { getDb } from './database';
import { Lead, LeadInput } from '../types';

function serialize(val: string[] | undefined): string | null {
  return val && val.length ? JSON.stringify(val) : null;
}

function parse(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val) as string[]; } catch { return []; }
}

export function insertLead(input: LeadInput): number {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO leads
      (name, age, employment_status, monthly_income, monthly_spending, savings,
       goals, risk_tolerance, interested_products, money_problems, banking_preference,
       conversation_summary, advisor_reason, additional_notes)
    VALUES
      (@name, @age, @employment_status, @monthly_income, @monthly_spending, @savings,
       @goals, @risk_tolerance, @interested_products, @money_problems, @banking_preference,
       @conversation_summary, @advisor_reason, @additional_notes)
  `);
  const result = stmt.run({
    ...input,
    goals: serialize(input.goals),
    interested_products: serialize(input.interested_products),
    money_problems: serialize(input.money_problems),
  });
  return result.lastInsertRowid as number;
}

export function getAllLeads(): Lead[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all() as Record<string, unknown>[];
  return rows.map((row) => ({
    ...(row as unknown as Lead),
    goals: parse(row.goals as string | null),
    interested_products: parse(row.interested_products as string | null),
    money_problems: parse(row.money_problems as string | null),
  }));
}

export function updateLeadStatus(id: number, status: string): void {
  getDb().prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, id);
}
