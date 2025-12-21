import cron from 'node-cron';
import { BookingRepository } from '../repositories/booking.repository';
import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

export class ReminderService {
  private bookingRepository: BookingRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  start() {
    // Run every hour to check for upcoming bookings
    cron.schedule('0 * * * *', async () => {
      await this.sendReminders();
    });

    console.log('Reminder service started');
  }

  private async sendReminders() {
    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Get bookings scheduled for tomorrow
    const upcomingBookings = await this.bookingRepository.findUpcoming(oneDayFromNow);

    for (const booking of upcomingBookings) {
      // Send reminder to customer
      await this.sendReminderToUser(booking.customerId, booking, 'customer');
      
      // Send reminder to helper
      await this.sendReminderToUser(booking.helperId, booking, 'helper');
    }
  }

  private async sendReminderToUser(userId: string, booking: any, userType: 'customer' | 'helper') {
    try {
      // In production, integrate with email/SMS service
      // For now, just log
      console.log(`Reminder sent to ${userType} ${userId} for booking ${booking.id}`);
      
      // In production, you would:
      // 1. Fetch user details from user service
      // 2. Send email/SMS via notification service
      // 3. Or use AI service to generate personalized reminder
    } catch (error) {
      console.error(`Failed to send reminder to ${userType} ${userId}:`, error);
    }
  }
}

