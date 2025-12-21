import { Router } from 'express';
import { HelperController } from '../controllers/helper.controller';

const router = Router();
const helperController = new HelperController();

router.get('/', helperController.searchHelpers.bind(helperController));
router.get('/:id', helperController.getHelperById.bind(helperController));
router.post('/', helperController.createHelper.bind(helperController));
router.put('/:id', helperController.updateHelper.bind(helperController));
router.get('/:id/availability', helperController.getAvailability.bind(helperController));
router.put('/:id/availability', helperController.updateAvailability.bind(helperController));
router.get('/:id/reviews', helperController.getReviews.bind(helperController));

export { router as helperRoutes };

