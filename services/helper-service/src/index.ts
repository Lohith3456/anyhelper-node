import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { helperRoutes } from './routes/helper.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/helpers', helperRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'helper-service' });
});

app.listen(PORT, () => {
  console.log(`Helper Service running on port ${PORT}`);
});

