import { Router } from 'express';
import { MatchingController } from '../controllers/matching.controller';

const router = Router();
const matchingController = new MatchingController();

router.post('/match', matchingController.findMatches.bind(matchingController));
router.get('/helpers/:helperId/score', matchingController.getMatchScore.bind(matchingController));

export { router as matchingRoutes };

