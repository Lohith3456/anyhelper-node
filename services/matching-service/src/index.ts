import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { matchingRoutes } from './routes/matching.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/matching', matchingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'matching-service' });
});

app.listen(PORT, () => {
  console.log(`Matching Service running on port ${PORT}`);
});

