import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { bookingRoutes } from './routes/booking.routes';
import { ReminderService } from './services/reminder.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'booking-service' });
});

// Start reminder service
const reminderService = new ReminderService();
reminderService.start();

app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});

