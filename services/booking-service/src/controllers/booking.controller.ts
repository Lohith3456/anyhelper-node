import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { ApiResponse } from '@anyhelper/shared';

export class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  async getBookings(req: Request, res: Response) {
    try {
      const { status, startDate, endDate } = req.query;
      const bookings = await this.bookingService.getBookings({
        status: status as string,
        startDate: startDate as string,
        endDate: endDate as string,
      });

      res.json({
        success: true,
        data: bookings,
      } as ApiResponse<typeof bookings>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.getBookingById(id);

      res.json({
        success: true,
        data: booking,
      } as ApiResponse<typeof booking>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async createBooking(req: Request, res: Response) {
    try {
      const bookingData = req.body;
      const booking = await this.bookingService.createBooking(bookingData);

      res.status(201).json({
        success: true,
        data: booking,
        message: 'Booking created successfully',
      } as ApiResponse<typeof booking>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const booking = await this.bookingService.updateBooking(id, updates);

      res.json({
        success: true,
        data: booking,
        message: 'Booking updated successfully',
      } as ApiResponse<typeof booking>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const booking = await this.bookingService.updateStatus(id, status);

      res.json({
        success: true,
        data: booking,
        message: 'Booking status updated',
      } as ApiResponse<typeof booking>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getCustomerBookings(req: Request, res: Response) {
    try {
      const { customerId } = req.params;
      const bookings = await this.bookingService.getCustomerBookings(customerId);

      res.json({
        success: true,
        data: bookings,
      } as ApiResponse<typeof bookings>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getHelperBookings(req: Request, res: Response) {
    try {
      const { helperId } = req.params;
      const bookings = await this.bookingService.getHelperBookings(helperId);

      res.json({
        success: true,
        data: bookings,
      } as ApiResponse<typeof bookings>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

