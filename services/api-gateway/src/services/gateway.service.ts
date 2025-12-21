import axios from 'axios';

const SERVICES = {
  user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  helper: process.env.HELPER_SERVICE_URL || 'http://localhost:3002',
  matching: process.env.MATCHING_SERVICE_URL || 'http://localhost:3003',
  booking: process.env.BOOKING_SERVICE_URL || 'http://localhost:3004',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3005',
  communication: process.env.COMMUNICATION_SERVICE_URL || 'http://localhost:3006',
};

export class GatewayService {
  async checkServicesHealth(): Promise<Record<string, { status: string; responseTime?: number }>> {
    const health: Record<string, { status: string; responseTime?: number }> = {};

    for (const [name, url] of Object.entries(SERVICES)) {
      try {
        const start = Date.now();
        const response = await axios.get(`${url}/health`, { timeout: 5000 });
        const responseTime = Date.now() - start;

        health[name] = {
          status: response.data.status === 'ok' ? 'healthy' : 'unhealthy',
          responseTime,
        };
      } catch (error) {
        health[name] = {
          status: 'unhealthy',
        };
      }
    }

    return health;
  }
}

