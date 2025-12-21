import { Payment } from '@anyhelper/shared';
import { randomUUID } from 'crypto';

// In-memory store for demo purposes
const payments: Payment[] = [];

export class PaymentRepository {
  async create(data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> {
    const now = new Date();
    const payment: Payment = {
      id: randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    payments.push(payment);
    return payment;
  }

  async findById(id: string): Promise<Payment | null> {
    return payments.find(p => p.id === id) || null;
  }

  async update(id: string, updates: Partial<Payment>): Promise<Payment | null> {
    const index = payments.findIndex(p => p.id === id);
    if (index === -1) return null;

    payments[index] = {
      ...payments[index],
      ...updates,
      updatedAt: new Date(),
    };
    return payments[index];
  }

  async findByBooking(bookingId: string): Promise<Payment | null> {
    return payments.find(p => p.bookingId === bookingId) || null;
  }

  async findAll(): Promise<Payment[]> {
    return payments;
  }
}

