import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { communicationRoutes } from './routes/communication.routes';
import { SocketHandler } from './handlers/socket.handler';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/communication', communicationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'communication-service' });
});

// Socket.IO handler
const socketHandler = new SocketHandler(io);
socketHandler.initialize();

httpServer.listen(PORT, () => {
  console.log(`Communication Service running on port ${PORT}`);
});

