import { config } from 'dotenv';
config();

import { connectMongo } from '../lib/mongo';
import { ServiceModel } from '../models/service.model';

const DEFAULT_SERVICES = [
  { name: 'Cleaners', slug: 'cleaners', description: 'House cleaning and deep cleaning services' },
  { name: 'Plumbers', slug: 'plumbers', description: 'Plumbing and leak repair services' },
  { name: 'Electricians', slug: 'electricians', description: 'Electrical repairs and installations' },
  { name: 'Handyman', slug: 'handyman', description: 'General handyman services' },
  { name: 'Drivers', slug: 'drivers', description: 'Local transportation and errands' },
  { name: 'Babysitters', slug: 'babysitters', description: 'Childcare and babysitting' },
  { name: 'Tutors', slug: 'tutors', description: 'Home tutoring and lessons' },
  { name: 'Pet Sitters', slug: 'pet-sitters', description: 'Pet sitting and walking services' },
  { name: 'Gardeners', slug: 'gardeners', description: 'Gardening and lawn care' },
  { name: 'Moving Helpers', slug: 'moving-helpers', description: 'Assistance with moving and heavy lifting' },
  { name: 'Beauty & Wellness', slug: 'beauty-wellness', description: 'Beauty and wellness services' },
  { name: 'Tech Support', slug: 'tech-support', description: 'Technical support and device repair' },
];

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/anyhelper';
  await connectMongo(uri);

  for (const s of DEFAULT_SERVICES) {
    const id = randomUUID();
    await ServiceModel.findOneAndUpdate(
      { slug: s.slug },
      { 
        $set: { name: s.name, description: s.description, isActive: true, slug: s.slug },
        $setOnInsert: { id }
      },
      { upsert: true }
    );
    console.log(`Seeded service: ${s.slug} (id: ${id})`);
  }

  console.log('Service seeding complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});

function randomUUID() {
    throw new Error('Function not implemented.');
}
