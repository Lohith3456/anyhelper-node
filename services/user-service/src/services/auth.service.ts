import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '@anyhelper/shared';
import { UserRepository } from '../repositories/user.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    phone?: string;
    location?: string;
  }) {
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone,
      location: data.location,
      isVerified: false,
    };

    const createdUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    // Generate tokens
    const tokens = this.generateTokens(createdUser.id, createdUser.role);

    return {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        role: createdUser.role,
        isVerified: createdUser.isVerified,
      },
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const tokens = this.generateTokens(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      },
      ...tokens,
    };
  }

  async verifyEmail(email: string, verificationCode: string) {
    // In production, verify the code from database/cache
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // For now, accept any code (implement proper verification logic)
    await this.userRepository.update(user.id, { isVerified: true });
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        userId: string;
        role: UserRole;
      };

      const tokens = this.generateTokens(decoded.userId, decoded.role);
      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  private generateTokens(userId: string, role: UserRole) {
    const accessToken = jwt.sign(
      { userId, role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId, role },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }
}

