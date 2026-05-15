import { Router, Request, Response } from 'express';
import { insertLead, getAllLeads, updateLeadStatus } from '../services/leadRepository';
import { UserProfile, LeadInput } from '../types';

const router = Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'unicredit2026';

function checkAdmin(req: Request, res: Response): boolean {
  if (req.headers['x-admin-password'] !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized.' });
    return false;
  }
  return true;
}

router.post('/leads', async (req: Request, res: Response) => {
  try {
    const { clientProfile, conversationSummary, advisorReason } = req.body as {
      clientProfile: UserProfile;
      conversationSummary: string;
      advisorReason: string;
    };

    if (!clientProfile?.name) {
      res.status(400).json({ error: 'clientProfile.name is required.' });
      return;
    }

    const lead: LeadInput = {
      name: clientProfile.name,
      segment: clientProfile.segment,
      esg_level: clientProfile.esg_level,
      conversation_summary: conversationSummary,
      advisor_reason: advisorReason,
    };

    const leadId = insertLead(lead);
    res.status(201).json({ success: true, leadId });
  } catch (error) {
    console.error('Lead error:', error);
    res.status(500).json({ error: 'Could not save lead.' });
  }
});

router.get('/leads', (req: Request, res: Response) => {
  if (!checkAdmin(req, res)) return;
  res.json(getAllLeads());
});

router.patch('/leads/:id', (req: Request, res: Response) => {
  if (!checkAdmin(req, res)) return;
  const { status } = req.body as { status: string };
  const valid = ['new', 'contacted', 'converted', 'dismissed'];
  if (!valid.includes(status)) {
    res.status(400).json({ error: `status must be one of: ${valid.join(', ')}` });
    return;
  }
  updateLeadStatus(Number(req.params.id), status);
  res.json({ success: true });
});

export default router;
