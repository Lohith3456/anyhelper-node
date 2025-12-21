import { Conversation, Message } from '@anyhelper/shared';
import { randomUUID } from 'crypto';

// In-memory store for demo purposes
const conversations: Conversation[] = [];

export class ConversationRepository {
  async create(participantIds: string[]): Promise<Conversation> {
    const now = new Date();
    const conversation: Conversation = {
      id: randomUUID(),
      participantIds,
      createdAt: now,
      updatedAt: now,
    };
    conversations.push(conversation);
    return conversation;
  }

  async findById(id: string): Promise<Conversation | null> {
    return conversations.find(c => c.id === id) || null;
  }

  async findByParticipant(userId: string): Promise<Conversation[]> {
    return conversations.filter(c => c.participantIds.includes(userId));
  }

  async findByParticipants(participantIds: string[]): Promise<Conversation | null> {
    return conversations.find(c => {
      const cIds = c.participantIds.sort();
      const pIds = [...participantIds].sort();
      return cIds.length === pIds.length && cIds.every((id, i) => id === pIds[i]);
    }) || null;
  }

  async updateLastMessage(conversationId: string, message: Message): Promise<Conversation | null> {
    const index = conversations.findIndex(c => c.id === conversationId);
    if (index === -1) return null;

    conversations[index] = {
      ...conversations[index],
      lastMessage: message,
      updatedAt: new Date(),
    };
    return conversations[index];
  }
}

