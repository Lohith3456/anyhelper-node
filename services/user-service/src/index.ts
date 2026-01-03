import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/user.routes';

dotenv.config();
import { connectMongo } from './lib/mongo';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

async function start() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/anyhelper';
    await connectMongo(uri);

    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start service:', err);
    process.exit(1);
  }
}

start();

