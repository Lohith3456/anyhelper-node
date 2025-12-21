import { User, UserRole } from '@anyhelper/shared';
import { randomUUID } from 'crypto';

// In-memory store for demo purposes
// In production, replace with actual database (MongoDB, PostgreSQL, etc.)
const users: (User & { password: string })[] = [];

export class UserRepository {
  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }): Promise<User & { password: string }> {
    const now = new Date();
    const user: User & { password: string } = {
      id: randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
    return user;
  }

  async findById(id: string): Promise<(User & { password: string }) | null> {
    return users.find(u => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<(User & { password: string }) | null> {
    return users.find(u => u.email === email) || null;
  }

  async update(id: string, updates: Partial<User>): Promise<(User & { password: string }) | null> {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date(),
    };
    return users[index];
  }

  async findAll(): Promise<(User & { password: string })[]> {
    return users;
  }
}

