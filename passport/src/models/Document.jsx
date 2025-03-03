const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },
  documentType: {
    type: String,
    enum: [
      'identity_proof',
      'address_proof',
      'birth_proof',
      'passport_photo',
      'previous_passport',
      'marriage_certificate',
      'divorce_decree',
      'employment_verification',
      'parental_consent',
      'police_report',
      'other'
    ],
    required: true
  },
  documentName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'jpg', 'png'],
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
