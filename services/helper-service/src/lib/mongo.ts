import mongoose from 'mongoose';

export async function connectMongo(uri: string) {
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  await mongoose.connect(uri, {} as mongoose.ConnectOptions);

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  });

  return mongoose;
}
