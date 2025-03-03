const express = require('express');
const router = express.Router();
const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
  verifyDocument,
  rejectDocument
} = require('../controllers/documentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('file'), uploadDocument);
router.get('/', protect, getDocuments);
router.get('/:id', protect, getDocumentById);
router.delete('/:id', protect, deleteDocument);
router.put('/:id/verify', protect, authorize('admin', 'officer'), verifyDocument);
router.put('/:id/reject', protect, authorize('admin', 'officer'), rejectDocument);

module.exports = router;

