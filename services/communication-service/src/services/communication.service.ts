import { Conversation, Message } from '@anyhelper/shared';
import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { Server as SocketIOServer } from 'socket.io';

export class CommunicationService {
  private conversationRepository: ConversationRepository;
  private messageRepository: MessageRepository;
  private io?: SocketIOServer;

  constructor(io?: SocketIOServer) {
    this.conversationRepository = new ConversationRepository();
    this.messageRepository = new MessageRepository();
    this.io = io;
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return this.conversationRepository.findByParticipant(userId);
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.messageRepository.findByConversation(conversationId);
  }

  async createConversation(participantIds: string[]): Promise<Conversation> {
    if (participantIds.length < 2) {
      throw new Error('Conversation must have at least 2 participants');
    }

    // Check if conversation already exists
    const existing = await this.conversationRepository.findByParticipants(participantIds);
    if (existing) {
      return existing;
    }

    return this.conversationRepository.create(participantIds);
  }

  async sendMessage(data: {
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    type?: 'text' | 'image' | 'file';
  }): Promise<Message> {
    const message = await this.messageRepository.create({
      conversationId: data.conversationId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
      type: data.type || 'text',
    });

    // Update conversation last message
    await this.conversationRepository.updateLastMessage(data.conversationId, message);

    // Emit real-time message via Socket.IO
    if (this.io) {
      this.io.to(data.conversationId).emit('new_message', message);
      this.io.to(data.receiverId).emit('message_received', message);
    }

    return message;
  }

  setSocketIO(io: SocketIOServer) {
    this.io = io;
  }
}

