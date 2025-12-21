import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();
const paymentController = new PaymentController();

router.post('/create', paymentController.createPayment.bind(paymentController));
router.get('/:id', paymentController.getPaymentById.bind(paymentController));
router.post('/:id/process', paymentController.processPayment.bind(paymentController));
router.post('/:id/refund', paymentController.refundPayment.bind(paymentController));
router.get('/booking/:bookingId', paymentController.getPaymentByBooking.bind(paymentController));

export { router as paymentRoutes };

