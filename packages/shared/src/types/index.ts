import { z } from 'zod';

// User Types
export const UserRoleSchema = z.enum(['customer', 'helper', 'admin']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleSchema,
  phone: z.string().optional(),
  location: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isVerified: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

// Helper/Service Provider Types
export const HelperProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  skills: z.array(z.string()),
  bio: z.string().optional(),
  hourlyRate: z.number().optional(),
  rating: z.number().default(0),
  reviewCount: z.number().default(0),
  availability: z.object({
    days: z.array(z.string()),
    hours: z.string(),
  }),
  location: z.string(),
  isVerified: z.boolean().default(false),
  serviceTypes: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type HelperProfile = z.infer<typeof HelperProfileSchema>;

// Booking Types
export const BookingStatusSchema = z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']);
export type BookingStatus = z.infer<typeof BookingStatusSchema>;

export const BookingSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  helperId: z.string(),
  serviceType: z.string(),
  scheduledDate: z.date(),
  scheduledTime: z.string(),
  duration: z.number(), // in hours
  status: BookingStatusSchema,
  price: z.number(),
  address: z.string(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Booking = z.infer<typeof BookingSchema>;

// Payment Types
export const PaymentStatusSchema = z.enum(['pending', 'processing', 'completed', 'failed', 'refunded']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const PaymentSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  amount: z.number(),
  currency: z.string().default('USD'),
  status: PaymentStatusSchema,
  paymentMethod: z.string(),
  transactionId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payment = z.infer<typeof PaymentSchema>;

// Matching Types
export const MatchingRequestSchema = z.object({
  requestDescription: z.string(),
  customerLocation: z.string(),
  serviceType: z.string(),
  availableTime: z.string(),
  customerId: z.string(),
});

export type MatchingRequest = z.infer<typeof MatchingRequestSchema>;

export const MatchingResultSchema = z.object({
  helperId: z.string(),
  matchScore: z.number(),
  reasons: z.array(z.string()),
});

export type MatchingResult = z.infer<typeof MatchingResultSchema>;

// Communication Types
export const MessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  type: z.enum(['text', 'image', 'file']).default('text'),
  createdAt: z.date(),
  readAt: z.date().optional(),
});

export type Message = z.infer<typeof MessageSchema>;

export const ConversationSchema = z.object({
  id: z.string(),
  participantIds: z.array(z.string()),
  lastMessage: MessageSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Conversation = z.infer<typeof ConversationSchema>;

// API Response Types
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

