import { Request, Response } from 'express';

export class AuthController {
  async register(req: Request, res: Response) {
    res.status(404).json({ success: false, error: 'Registration has been removed' });
  }

  async login(req: Request, res: Response) {
    res.status(404).json({ success: false, error: 'Login has been removed' });
  }

  async verifyEmail(req: Request, res: Response) {
    res.status(404).json({ success: false, error: 'Verification has been removed' });
  }

  async refreshToken(req: Request, res: Response) {
    res.status(404).json({ success: false, error: 'Refresh token has been removed' });
  }
}

