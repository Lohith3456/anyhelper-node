import { Request, Response } from 'express';
import { HelperService } from '../services/helper.service';
import { ApiResponse } from '@anyhelper/shared';

export class HelperController {
  private helperService: HelperService;

  constructor() {
    this.helperService = new HelperService();
  }

  async searchHelpers(req: Request, res: Response) {
    try {
      const { serviceType, location, minRating, maxPrice, skills } = req.query;
      const helpers = await this.helperService.searchHelpers({
        serviceType: serviceType as string,
        location: location as string,
        minRating: minRating ? Number(minRating) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        skills: skills ? (skills as string).split(',') : undefined,
      });

      res.json({
        success: true,
        data: helpers,
      } as ApiResponse<typeof helpers>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getHelperById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const helper = await this.helperService.getHelperById(id);

      res.json({
        success: true,
        data: helper,
      } as ApiResponse<typeof helper>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async createHelper(req: Request, res: Response) {
    try {
      const helperData = req.body;
      const helper = await this.helperService.createHelper(helperData);

      res.status(201).json({
        success: true,
        data: helper,
        message: 'Helper profile created successfully',
      } as ApiResponse<typeof helper>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async updateHelper(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const helper = await this.helperService.updateHelper(id, updates);

      res.json({
        success: true,
        data: helper,
        message: 'Helper profile updated successfully',
      } as ApiResponse<typeof helper>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getAvailability(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const availability = await this.helperService.getAvailability(id);

      res.json({
        success: true,
        data: availability,
      } as ApiResponse<typeof availability>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async updateAvailability(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const availability = req.body;
      const updated = await this.helperService.updateAvailability(id, availability);

      res.json({
        success: true,
        data: updated,
        message: 'Availability updated successfully',
      } as ApiResponse<typeof updated>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getReviews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reviews = await this.helperService.getReviews(id);

      res.json({
        success: true,
        data: reviews,
      } as ApiResponse<typeof reviews>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

