import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.get('/:id', authenticateToken, userController.getUserById.bind(userController));
router.put('/:id', authenticateToken, userController.updateUser.bind(userController));
router.post('/:id/verify', authenticateToken, userController.verifyProfile.bind(userController));
router.get('/:id/profile', authenticateToken, userController.getProfile.bind(userController));

export { router as userRoutes };

