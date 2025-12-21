import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '@anyhelper/shared';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      res.json({
        success: true,
        data: user,
      } as ApiResponse<typeof user>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const user = await this.userService.updateUser(id, updates);

      res.json({
        success: true,
        data: user,
        message: 'User updated successfully',
      } as ApiResponse<typeof user>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async verifyProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { verificationData } = req.body;
      const user = await this.userService.verifyProfile(id, verificationData);

      res.json({
        success: true,
        data: user,
        message: 'Profile verification submitted',
      } as ApiResponse<typeof user>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await this.userService.getProfile(id);

      res.json({
        success: true,
        data: profile,
      } as ApiResponse<typeof profile>);
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

