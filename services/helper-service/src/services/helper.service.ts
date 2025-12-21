import { HelperProfile } from '@anyhelper/shared';
import { HelperRepository } from '../repositories/helper.repository';

export class HelperService {
  private helperRepository: HelperRepository;

  constructor() {
    this.helperRepository = new HelperRepository();
  }

  async searchHelpers(filters: {
    serviceType?: string;
    location?: string;
    minRating?: number;
    maxPrice?: number;
    skills?: string[];
  }): Promise<HelperProfile[]> {
    return this.helperRepository.search(filters);
  }

  async getHelperById(id: string): Promise<HelperProfile> {
    const helper = await this.helperRepository.findById(id);
    if (!helper) {
      throw new Error('Helper not found');
    }
    return helper;
  }

  async createHelper(data: Omit<HelperProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<HelperProfile> {
    return this.helperRepository.create(data);
  }

  async updateHelper(id: string, updates: Partial<HelperProfile>): Promise<HelperProfile> {
    const helper = await this.helperRepository.update(id, updates);
    if (!helper) {
      throw new Error('Helper not found');
    }
    return helper;
  }

  async getAvailability(id: string) {
    const helper = await this.getHelperById(id);
    return helper.availability;
  }

  async updateAvailability(id: string, availability: HelperProfile['availability']) {
    return this.updateHelper(id, { availability });
  }

  async getReviews(id: string) {
    // In production, fetch from reviews service or database
    const helper = await this.getHelperById(id);
    return {
      rating: helper.rating,
      reviewCount: helper.reviewCount,
      reviews: [], // Would fetch actual reviews
    };
  }
}

