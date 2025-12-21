import { Router } from 'express';
import { CommunicationController } from '../controllers/communication.controller';

const router = Router();
const communicationController = new CommunicationController();

router.get('/conversations/:userId', communicationController.getConversations.bind(communicationController));
router.get('/conversations/:conversationId/messages', communicationController.getMessages.bind(communicationController));
router.post('/conversations', communicationController.createConversation.bind(communicationController));
router.post('/messages', communicationController.sendMessage.bind(communicationController));

export { router as communicationRoutes };

