export type Segment = 'CONSERVATIVE' | 'BALANCED' | 'GROWTH' | 'AGGRESSIVE';

export interface Lead {
  id: number;
  name: string;
  segment?: Segment;
  esg_level?: number;
  conversation_summary?: string;
  advisor_reason?: string;
  status: string;
  created_at: string;
}
