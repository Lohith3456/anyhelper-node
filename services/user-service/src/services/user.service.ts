import { User } from '@anyhelper/shared';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = await this.userRepository.update(id, updates);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async verifyProfile(id: string, verificationData: any): Promise<User> {
    // In production, implement proper verification logic
    const user = await this.userRepository.update(id, {
      isVerified: true,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getProfile(id: string): Promise<User> {
    return this.getUserById(id);
  }
}

