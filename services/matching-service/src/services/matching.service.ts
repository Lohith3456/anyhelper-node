import axios from 'axios';
import { MatchingRequest, MatchingResult } from '@anyhelper/shared';

const HELPER_SERVICE_URL = process.env.HELPER_SERVICE_URL || 'http://localhost:3002';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:9002'; // Next.js AI service

export class MatchingService {
  async findMatches(request: MatchingRequest): Promise<MatchingResult[]> {
    // Fetch all helpers from helper service
    const helpersResponse = await axios.get(`${HELPER_SERVICE_URL}/api/helpers`, {
      params: {
        serviceType: request.serviceType,
        location: request.customerLocation,
      },
    });

    const helpers = helpersResponse.data.data || [];

    // Calculate match scores for each helper
    const matchPromises = helpers.map(async (helper: any) => {
      const score = await this.calculateMatchScore(helper.id, request);
      return {
        helperId: helper.id,
        matchScore: score.score,
        reasons: score.reasons,
      };
    });

    const matches = await Promise.all(matchPromises);

    // Sort by match score (highest first)
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }

  async calculateMatchScore(
    helperId: string,
    request: Omit<MatchingRequest, 'customerId'>
  ): Promise<{ score: number; reasons: string[] }> {
    // Fetch helper details
    const helperResponse = await axios.get(`${HELPER_SERVICE_URL}/api/helpers/${helperId}`);
    const helper = helperResponse.data.data;

    if (!helper) {
      throw new Error('Helper not found');
    }

    let score = 0;
    const reasons: string[] = [];

    // Location match (0-30 points)
    if (helper.location.toLowerCase().includes(request.customerLocation.toLowerCase())) {
      score += 30;
      reasons.push('Location match');
    } else {
      score += 10;
      reasons.push('Different location');
    }

    // Service type match (0-25 points)
    if (helper.serviceTypes.includes(request.serviceType)) {
      score += 25;
      reasons.push('Service type match');
    }

    // Rating (0-25 points)
    if (helper.rating >= 4.5) {
      score += 25;
      reasons.push('High rating');
    } else if (helper.rating >= 4.0) {
      score += 15;
      reasons.push('Good rating');
    } else if (helper.rating >= 3.5) {
      score += 10;
      reasons.push('Average rating');
    }

    // Review count (0-10 points)
    if (helper.reviewCount >= 50) {
      score += 10;
      reasons.push('Many reviews');
    } else if (helper.reviewCount >= 20) {
      score += 5;
      reasons.push('Some reviews');
    }

    // Skills match (0-10 points)
    const requestLower = request.requestDescription.toLowerCase();
    const matchingSkills = helper.skills.filter((skill: string) =>
      requestLower.includes(skill.toLowerCase())
    );
    if (matchingSkills.length > 0) {
      score += 10;
      reasons.push(`Skills match: ${matchingSkills.join(', ')}`);
    }

    // In production, call AI service for intelligent matching
    // try {
    //   const aiResponse = await axios.post(`${AI_SERVICE_URL}/api/ai/matching`, {
    //     requestDescription: request.requestDescription,
    //     customerLocation: request.customerLocation,
    //     serviceType: request.serviceType,
    //     availableTime: request.availableTime,
    //   });
    //   // Use AI response to adjust score
    // } catch (error) {
    //   console.error('AI matching service unavailable, using basic matching');
    // }

    return { score, reasons };
  }
}

