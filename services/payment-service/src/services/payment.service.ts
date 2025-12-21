import { Payment, PaymentStatus } from '@anyhelper/shared';
import { PaymentRepository } from '../repositories/payment.repository';
import axios from 'axios';

const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:3004';

export class PaymentService {
  private paymentRepository: PaymentRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  async createPayment(data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Payment> {
    // Verify booking exists
    const bookingResponse = await axios.get(`${BOOKING_SERVICE_URL}/api/bookings/${data.bookingId}`);
    const booking = bookingResponse.data.data;

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Verify amount matches booking price
    if (data.amount !== booking.price) {
      throw new Error('Payment amount does not match booking price');
    }

    return this.paymentRepository.create({
      ...data,
      status: 'pending',
    });
  }

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  }

  async processPayment(id: string, paymentMethod: string): Promise<Payment> {
    const payment = await this.getPaymentById(id);

    if (payment.status !== 'pending') {
      throw new Error('Payment is not in pending status');
    }

    // In production, integrate with payment gateway (Stripe, PayPal, etc.)
    // For now, simulate payment processing
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success (in production, check actual payment gateway response)
    const updatedPayment = await this.paymentRepository.update(id, {
      status: 'completed',
      transactionId,
      paymentMethod,
    });

    if (!updatedPayment) {
      throw new Error('Failed to update payment');
    }

    // Update booking status to confirmed
    try {
      await axios.put(`${BOOKING_SERVICE_URL}/api/bookings/${payment.bookingId}/status`, {
        status: 'confirmed',
      });
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }

    return updatedPayment;
  }

  async refundPayment(id: string, reason: string): Promise<Payment> {
    const payment = await this.getPaymentById(id);

    if (payment.status !== 'completed') {
      throw new Error('Only completed payments can be refunded');
    }

    // In production, process refund through payment gateway
    const updatedPayment = await this.paymentRepository.update(id, {
      status: 'refunded',
    });

    if (!updatedPayment) {
      throw new Error('Failed to process refund');
    }

    return updatedPayment;
  }

  async getPaymentByBooking(bookingId: string): Promise<Payment | null> {
    return this.paymentRepository.findByBooking(bookingId);
  }
}

