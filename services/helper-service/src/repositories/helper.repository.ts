import { HelperProfile } from '@anyhelper/shared';
import { randomUUID } from 'crypto';

// In-memory store for demo purposes
const helpers: HelperProfile[] = [];

export class HelperRepository {
  async create(data: Omit<HelperProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<HelperProfile> {
    const now = new Date();
    const helper: HelperProfile = {
      id: randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    helpers.push(helper);
    return helper;
  }

  async findById(id: string): Promise<HelperProfile | null> {
    return helpers.find(h => h.id === id) || null;
  }

  async findByUserId(userId: string): Promise<HelperProfile | null> {
    return helpers.find(h => h.userId === userId) || null;
  }

  async update(id: string, updates: Partial<HelperProfile>): Promise<HelperProfile | null> {
    const index = helpers.findIndex(h => h.id === id);
    if (index === -1) return null;

    helpers[index] = {
      ...helpers[index],
      ...updates,
      updatedAt: new Date(),
    };
    return helpers[index];
  }

  async search(filters: {
    serviceType?: string;
    location?: string;
    minRating?: number;
    maxPrice?: number;
    skills?: string[];
  }): Promise<HelperProfile[]> {
    let results = [...helpers];

    if (filters.serviceType) {
      results = results.filter(h => h.serviceTypes.includes(filters.serviceType!));
    }

    if (filters.location) {
      results = results.filter(h => 
        h.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.minRating !== undefined) {
      results = results.filter(h => h.rating >= filters.minRating!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(h => 
        h.hourlyRate ? h.hourlyRate <= filters.maxPrice! : false
      );
    }

    if (filters.skills && filters.skills.length > 0) {
      results = results.filter(h => 
        filters.skills!.some(skill => h.skills.includes(skill))
      );
    }

    return results;
  }

  async findAll(): Promise<HelperProfile[]> {
    return helpers;
  }
}

