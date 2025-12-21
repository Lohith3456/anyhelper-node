import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const router = Router();
const bookingController = new BookingController();

router.get('/', bookingController.getBookings.bind(bookingController));
router.get('/:id', bookingController.getBookingById.bind(bookingController));
router.post('/', bookingController.createBooking.bind(bookingController));
router.put('/:id', bookingController.updateBooking.bind(bookingController));
router.put('/:id/status', bookingController.updateStatus.bind(bookingController));
router.get('/customer/:customerId', bookingController.getCustomerBookings.bind(bookingController));
router.get('/helper/:helperId', bookingController.getHelperBookings.bind(bookingController));

export { router as bookingRoutes };

