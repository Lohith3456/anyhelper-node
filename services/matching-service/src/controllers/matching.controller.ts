import { Request, Response } from 'express';
import { MatchingService } from '../services/matching.service';
import { ApiResponse } from '@anyhelper/shared';

export class MatchingController {
  private matchingService: MatchingService;

  constructor() {
    this.matchingService = new MatchingService();
  }

  async findMatches(req: Request, res: Response) {
    try {
      const matchingRequest = req.body;
      const matches = await this.matchingService.findMatches(matchingRequest);

      res.json({
        success: true,
        data: matches,
      } as ApiResponse<typeof matches>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getMatchScore(req: Request, res: Response) {
    try {
      const { helperId } = req.params;
      const { requestDescription, customerLocation, serviceType, availableTime } = req.query;
      
      const score = await this.matchingService.calculateMatchScore(helperId, {
        requestDescription: requestDescription as string,
        customerLocation: customerLocation as string,
        serviceType: serviceType as string,
        availableTime: availableTime as string,
      });

      res.json({
        success: true,
        data: score,
      } as ApiResponse<typeof score>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

