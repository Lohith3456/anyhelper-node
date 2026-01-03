import express from 'express';
import { ServiceRepository } from '../repositories/service.repository';

const router = express.Router();
const repo = new ServiceRepository();

// List IDs
router.get('/ids', async (req, res) => {
  const services = await repo.findAll(true);
  const output = services.map((s: any) => ({ id: s.id, slug: s.slug, name: s.name }));
  res.json(output);
});

// List (active only by default)
router.get('/', async (req, res) => {
  const services = await repo.findAll(true);
  res.json(services);
});

// Get by slug
router.get('/:slug', async (req, res) => {
  const slug = req.params.slug;
  const service = await repo.findBySlug(slug);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
});

// Upsert (admin/seed)
router.post('/', async (req, res) => {
  const { slug, name, description, category, isActive } = req.body;
  if (!slug || !name) return res.status(400).json({ error: 'slug and name are required' });

  const updated = await repo.upsertBySlug(slug, { name, description, category, isActive });
  res.status(201).json(updated);
});

export default router;
