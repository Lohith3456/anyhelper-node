import { ServiceModel } from '../models/service.model';

import { randomUUID } from 'crypto';

export class ServiceRepository {
  async create(data: { id?: string; name: string; slug: string; description?: string; category?: string }) {
    const id = data.id || randomUUID();
    const service = await ServiceModel.create({ ...data, id });
    return service.toObject();
  }

  async findById(id: string) {
    return ServiceModel.findOne({ id }).lean().exec();
  }

  async findBySlug(slug: string) {
    return ServiceModel.findOne({ slug }).lean().exec();
  }

  async findAll(activeOnly = false) {
    const query = activeOnly ? { isActive: true } : {};
    return ServiceModel.find(query).lean().exec();
  }

  async upsertBySlug(slug: string, data: Partial<{ name: string; description?: string; category?: string; isActive?: boolean }>) {
    return ServiceModel.findOneAndUpdate({ slug }, { $set: data }, { upsert: true, new: true }).lean().exec();
  }
}
