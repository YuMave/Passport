const express = require('express');
const router = express.Router();
const {
  calculateFees,
  initiatePayment,
  verifyPayment,
  getPaymentDetails,
  getPaymentReceipt,
  initiateRefund,
  getPaymentHistory
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/calculate-fees', protect, calculateFees);
router.post('/initiate', protect, initiatePayment);
router.post('/verify', protect, verifyPayment);
router.get('/:id', protect, getPaymentDetails);
router.get('/:id/receipt', protect, getPaymentReceipt);
router.post('/:id/refund', protect, authorize('admin'), initiateRefund);
router.get('/history', protect, getPaymentHistory);

module.exports = router;