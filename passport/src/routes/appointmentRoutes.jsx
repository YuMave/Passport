// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAvailableSlots,
  scheduleAppointment,
  getAppointmentById,
  rescheduleAppointment,
  cancelAppointment,
  completeAppointment,
  getAppointmentsByDate
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/available-slots', protect, getAvailableSlots);
router.post('/', protect, scheduleAppointment);
router.get('/:id', protect, getAppointmentById);
router.put('/:id/reschedule', protect, rescheduleAppointment);
router.put('/:id/cancel', protect, cancelAppointment);
router.put('/:id/complete', protect, authorize('admin', 'officer'), completeAppointment);
router.get('/date/:date', protect, authorize('admin', 'officer'), getAppointmentsByDate);

module.exports = router;
