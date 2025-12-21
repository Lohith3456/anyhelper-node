# Quick Start Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   cd anyhelper-node
   npm install
   ```

2. **Build shared package:**
   ```bash
   cd packages/shared
   npm install
   npm run build
   cd ../..
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Running Services

### Option 1: Run All Services (Recommended for Development)

From the root directory:
```bash
npm run dev
```

This will start all services concurrently on their respective ports:
- API Gateway: http://localhost:3000
- User Service: http://localhost:3001
- Helper Service: http://localhost:3002
- Matching Service: http://localhost:3003
- Booking Service: http://localhost:3004
- Payment Service: http://localhost:3005
- Communication Service: http://localhost:3006

### Option 2: Run Individual Services

Navigate to each service directory and run:
```bash
cd services/user-service
npm install
npm run dev
```

## Testing the API

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "customer"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### Create Helper Profile
```bash
curl -X POST http://localhost:3000/api/helpers \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-here",
    "skills": ["plumbing", "electrical"],
    "bio": "Experienced handyman",
    "hourlyRate": 50,
    "location": "New York, NY",
    "serviceTypes": ["plumbing", "electrical"],
    "availability": {
      "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "hours": "9:00 AM - 5:00 PM"
    }
  }'
```

### Find Matches
```bash
curl -X POST http://localhost:3000/api/matching/match \
  -H "Content-Type: application/json" \
  -d '{
    "requestDescription": "Need a plumber to fix a leaky faucet",
    "customerLocation": "New York, NY",
    "serviceType": "plumbing",
    "availableTime": "Tomorrow 2 PM",
    "customerId": "customer-id-here"
  }'
```

## Docker Deployment

To run all services using Docker:

```bash
docker-compose up --build
```

## Notes

- All services use in-memory storage for demo purposes
- Replace with actual databases (MongoDB, PostgreSQL) for production
- JWT tokens expire in 15 minutes (access) and 7 days (refresh)
- Socket.IO is available on the Communication Service for real-time messaging

