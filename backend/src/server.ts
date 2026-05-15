import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDatabase } from './services/database';
import chatRoutes from './routes/chatRoutes';
import leadRoutes from './routes/leadRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', chatRoutes);
app.use('/api', leadRoutes);

initDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
