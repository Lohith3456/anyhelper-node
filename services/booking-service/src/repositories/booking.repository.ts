import { Booking, BookingStatus } from '@anyhelper/shared';
import { randomUUID } from 'crypto';

// In-memory store for demo purposes
const bookings: Booking[] = [];

export class BookingRepository {
  async create(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const now = new Date();
    const booking: Booking = {
      id: randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    bookings.push(booking);
    return booking;
  }

  async findById(id: string): Promise<Booking | null> {
    return bookings.find(b => b.id === id) || null;
  }

  async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date(),
    };
    return bookings[index];
  }

  async findAll(filters: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Booking[]> {
    let results = [...bookings];

    if (filters.status) {
      results = results.filter(b => b.status === filters.status as BookingStatus);
    }

    if (filters.startDate) {
      const start = new Date(filters.startDate);
      results = results.filter(b => b.scheduledDate >= start);
    }

    if (filters.endDate) {
      const end = new Date(filters.endDate);
      results = results.filter(b => b.scheduledDate <= end);
    }

    return results;
  }

  async findByCustomer(customerId: string): Promise<Booking[]> {
    return bookings.filter(b => b.customerId === customerId);
  }

  async findByHelper(helperId: string): Promise<Booking[]> {
    return bookings.filter(b => b.helperId === helperId);
  }

  async findByHelperAndTime(helperId: string, date: Date, time: string): Promise<Booking[]> {
    return bookings.filter(b => 
      b.helperId === helperId &&
      b.scheduledDate.toDateString() === date.toDateString() &&
      b.scheduledTime === time &&
      (b.status === 'pending' || b.status === 'confirmed')
    );
  }

  async findUpcoming(until: Date): Promise<Booking[]> {
    return bookings.filter(b => 
      b.scheduledDate <= until &&
      b.scheduledDate >= new Date() &&
      (b.status === 'pending' || b.status === 'confirmed')
    );
  }
}

