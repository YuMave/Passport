const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
  enableTwoFactor,
  verifyTwoFactor,
  disableTwoFactor
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/enable-2fa', protect, enableTwoFactor);
router.post('/verify-2fa', protect, verifyTwoFactor);
router.delete('/disable-2fa', protect, disableTwoFactor);

module.exports = router;

