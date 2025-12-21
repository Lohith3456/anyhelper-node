import { Message } from '@anyhelper/shared';
import { randomUUID } from 'crypto';

// In-memory store for demo purposes
const messages: Message[] = [];

export class MessageRepository {
  async create(data: Omit<Message, 'id' | 'createdAt' | 'readAt'>): Promise<Message> {
    const now = new Date();
    const message: Message = {
      id: randomUUID(),
      ...data,
      createdAt: now,
    };
    messages.push(message);
    return message;
  }

  async findById(id: string): Promise<Message | null> {
    return messages.find(m => m.id === id) || null;
  }

  async findByConversation(conversationId: string): Promise<Message[]> {
    return messages
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async markAsRead(messageId: string): Promise<Message | null> {
    const index = messages.findIndex(m => m.id === messageId);
    if (index === -1) return null;

    messages[index] = {
      ...messages[index],
      readAt: new Date(),
    };
    return messages[index];
  }

  async findBySender(senderId: string): Promise<Message[]> {
    return messages.filter(m => m.senderId === senderId);
  }

  async findByReceiver(receiverId: string): Promise<Message[]> {
    return messages.filter(m => m.receiverId === receiverId);
  }
}

