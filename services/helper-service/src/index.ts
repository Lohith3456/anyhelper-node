import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { helperRoutes } from './routes/helper.routes';

dotenv.config();
import { connectMongo } from './lib/mongo';
import { serviceRoutes } from './routes/services.routes';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/helpers', helperRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'helper-service' });
});

async function start() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/anyhelper';
    await connectMongo(uri);

    app.listen(PORT, () => {
      console.log(`Helper Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start service:', err);
    process.exit(1);
  }
}

start();

