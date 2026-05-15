import { Router, Request, Response } from 'express';
import { defaultClientProfile } from '../data/clientProfile';
import productsData from '../data/products.json';
import { chatWithRAG } from '../services/geminiService';
import { ChatRequest, Product } from '../types';

const router = Router();
const products = productsData as Product[];

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, clientProfile, conversationHistory = [] }: ChatRequest = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const profile = clientProfile || defaultClientProfile;
    const chatResponse = await chatWithRAG(message, profile, products, conversationHistory);

    res.json(chatResponse);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

export default router;
