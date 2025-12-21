import { Request, Response } from 'express';
import { CommunicationService } from '../services/communication.service';
import { ApiResponse } from '@anyhelper/shared';

export class CommunicationController {
  private communicationService: CommunicationService;

  constructor() {
    this.communicationService = new CommunicationService();
  }

  async getConversations(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const conversations = await this.communicationService.getConversations(userId);

      res.json({
        success: true,
        data: conversations,
      } as ApiResponse<typeof conversations>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const messages = await this.communicationService.getMessages(conversationId);

      res.json({
        success: true,
        data: messages,
      } as ApiResponse<typeof messages>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async createConversation(req: Request, res: Response) {
    try {
      const { participantIds } = req.body;
      const conversation = await this.communicationService.createConversation(participantIds);

      res.status(201).json({
        success: true,
        data: conversation,
        message: 'Conversation created successfully',
      } as ApiResponse<typeof conversation>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const messageData = req.body;
      const message = await this.communicationService.sendMessage(messageData);

      res.status(201).json({
        success: true,
        data: message,
        message: 'Message sent successfully',
      } as ApiResponse<typeof message>);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      } as ApiResponse<null>);
    }
  }
}

