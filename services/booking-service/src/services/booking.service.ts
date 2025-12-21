import { Booking, BookingStatus } from '@anyhelper/shared';
import { BookingRepository } from '../repositories/booking.repository';
import axios from 'axios';

const HELPER_SERVICE_URL = process.env.HELPER_SERVICE_URL || 'http://localhost:3002';

export class BookingService {
  private bookingRepository: BookingRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async getBookings(filters: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Booking[]> {
    return this.bookingRepository.findAll(filters);
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Booking> {
    // Verify helper availability
    const helperResponse = await axios.get(`${HELPER_SERVICE_URL}/api/helpers/${data.helperId}`);
    const helper = helperResponse.data.data;

    if (!helper) {
      throw new Error('Helper not found');
    }

    // Check for conflicts
    const existingBookings = await this.bookingRepository.findByHelperAndTime(
      data.helperId,
      data.scheduledDate,
      data.scheduledTime
    );

    if (existingBookings.length > 0) {
      throw new Error('Helper is not available at this time');
    }

    return this.bookingRepository.create({
      ...data,
      status: 'pending',
    });
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const booking = await this.bookingRepository.update(id, updates);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    return this.updateBooking(id, { status });
  }

  async getCustomerBookings(customerId: string): Promise<Booking[]> {
    return this.bookingRepository.findByCustomer(customerId);
  }

  async getHelperBookings(helperId: string): Promise<Booking[]> {
    return this.bookingRepository.findByHelper(helperId);
  }
}

