// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  submitApplication,
  getApplicationStatus,
  addApplicationNote,
  requestAdditionalInfo
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, createApplication);
router.get('/', protect, getApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);
router.put('/:id/submit', protect, submitApplication);
router.get('/:id/status', protect, getApplicationStatus);
router.post('/:id/notes', protect, addApplicationNote);
router.post('/:id/request-info', protect, authorize('admin', 'officer'), requestAdditionalInfo);

module.exports = router;