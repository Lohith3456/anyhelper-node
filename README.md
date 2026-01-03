# AnyHelper Connect - Microservices Backend

This is the microservices backend for AnyHelper Connect, a service marketplace platform that connects customers with service providers.

## Architecture

The backend is built using a microservices architecture with the following services:

1. **User Service** (Port 3001) - Authentication, user profiles, and verification
2. **Helper Service** (Port 3002) - Service provider profiles, skills, and availability
3. **Matching Service** (Port 3003) - AI-powered service matching
4. **Booking Service** (Port 3004) - Scheduling, bookings, and reminders
5. **Payment Service** (Port 3005) - Payment processing
6. **Communication Service** (Port 3006) - Real-time chat and messaging
7. **API Gateway** (Port 3000) - Single entry point for all services

## Project Structure

```
anyhelper-node/
├── packages/
│   └── shared/          # Shared types and utilities
├── services/
│   ├── user-service/
│   ├── helper-service/
│   ├── matching-service/
│   ├── booking-service/
│   ├── payment-service/
│   ├── communication-service/
│   └── api-gateway/
└── package.json         # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies for all services:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration (especially JWT secrets)

### Running Services

#### Development Mode (All Services)

Run all services concurrently:
```bash
npm run dev
```

#### Individual Services

Each service can be run independently:

```bash
# User Service
cd services/user-service
npm run dev

# Helper Service
cd services/helper-service
npm run dev

# Matching Service
cd services/matching-service
npm run dev

# Booking Service
cd services/booking-service
npm run dev

# Payment Service
cd services/payment-service
npm run dev

# Communication Service
cd services/communication-service
npm run dev

# API Gateway
cd services/api-gateway
npm run dev
```

## API Endpoints

### User Service
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Helper Service
- `GET /api/helpers` - Search helpers
- `GET /api/helpers/:id` - Get helper by ID
- `POST /api/helpers` - Create helper profile
- `PUT /api/helpers/:id` - Update helper profile

### Matching Service
- `POST /api/matching/match` - Find matching helpers
- `GET /api/matching/helpers/:helperId/score` - Get match score

### Booking Service
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status

### Payment Service
- `POST /api/payments/create` - Create payment
- `POST /api/payments/:id/process` - Process payment
- `POST /api/payments/:id/refund` - Refund payment

### Communication Service
- `GET /api/communication/conversations/:userId` - Get user conversations
- `POST /api/communication/conversations` - Create conversation
- `POST /api/communication/messages` - Send message

### API Gateway
All services are accessible through the gateway at `http://localhost:3000`

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Real-time**: Socket.IO (Communication Service)
- **Validation**: Zod
- **Authentication**: JWT
- **Architecture**: Microservices with API Gateway

## Development Notes

- All services use in-memory storage for demo purposes. In production, replace with actual databases (MongoDB, PostgreSQL, etc.)
- JWT authentication is implemented in the User Service
- The Matching Service can integrate with the AI service running in the Next.js frontend
- Payment Service includes placeholder logic for payment gateway integration (Stripe, PayPal, etc.)
- Communication Service uses Socket.IO for real-time messaging

## Production Considerations

1. **Database**: Replace in-memory stores with proper databases
2. **Message Queue**: Add RabbitMQ or Kafka for inter-service communication
3. **Service Discovery**: Implement service discovery (Consul, Eureka)
4. **API Gateway**: Add rate limiting, caching, and request validation
5. **Monitoring**: Add logging (Winston), metrics (Prometheus), and tracing
6. **Security**: Implement proper authentication, authorization, and encryption
7. **Deployment**: Use Docker and Kubernetes for containerization and orchestration
8. **Testing**: Add unit and integration tests

## License

Private - AnyHelper Connect

