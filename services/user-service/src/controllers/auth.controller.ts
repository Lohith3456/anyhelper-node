import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '@anyhelper/shared';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name, role, phone, location } = req.body;
      const result = await this.authService.register({
        email,
        password,
        name,
        role,
        phone,
        location,
      });

      res.status(201).json({
        success: true,
        data: result,
        message: 'User registered successfully',
      } as ApiResponse<typeof result>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      res.json({
        success: true,
        data: result,
        message: 'Login successful',
      } as ApiResponse<typeof result>);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email, verificationCode } = req.body;
      await this.authService.verifyEmail(email, verificationCode);

      res.json({
        success: true,
        message: 'Email verified successfully',
      } as ApiResponse<null>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshToken(refreshToken);

      res.json({
        success: true,
        data: result,
      } as ApiResponse<typeof result>);
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

