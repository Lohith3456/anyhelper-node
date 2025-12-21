import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { ApiResponse } from '@anyhelper/shared';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPayment(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      const payment = await this.paymentService.createPayment(paymentData);

      res.status(201).json({
        success: true,
        data: payment,
        message: 'Payment created successfully',
      } as ApiResponse<typeof payment>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.getPaymentById(id);

      res.json({
        success: true,
        data: payment,
      } as ApiResponse<typeof payment>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async processPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { paymentMethod } = req.body;
      const result = await this.paymentService.processPayment(id, paymentMethod);

      res.json({
        success: true,
        data: result,
        message: 'Payment processed successfully',
      } as ApiResponse<typeof result>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async refundPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const result = await this.paymentService.refundPayment(id, reason);

      res.json({
        success: true,
        data: result,
        message: 'Refund processed successfully',
      } as ApiResponse<typeof result>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getPaymentByBooking(req: Request, res: Response) {
    try {
      const { bookingId } = req.params;
      const payment = await this.paymentService.getPaymentByBooking(bookingId);

      res.json({
        success: true,
        data: payment,
      } as ApiResponse<typeof payment>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

