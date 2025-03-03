const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicationType: {
    type: String,
    enum: ['new', 'renewal', 'lost', 'damaged', 'name_change', 'address_update'],
    required: true
  },
  passportType: {
    type: String,
    enum: ['regular', 'official', 'diplomatic'],
    default: 'regular'
  },
  pageCount: {
    type: Number,
    enum: [36, 60],
    default: 36
  },
  processingType: {
    type: String,
    enum: ['normal', 'expedited', 'emergency'],
    default: 'normal'
  },
  personalInfo: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    nationality: String,
    previousNationality: String
  },
  contactInfo: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    }
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  status: {
    type: String,
    enum: [
      'draft',
      'submitted',
      'document_verification',
      'payment_pending',
      'payment_completed',
      'appointment_scheduled',
      'biometrics_completed',
      'under_review',
      'additional_info_required',
      'approved',
      'printing',
      'ready_for_delivery',
      'delivered',
      'rejected'
    ],
    default: 'draft'
  },
  statusHistory: [{
    status: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  notes: [String],
  trackingNumber: {
    type: String,
    unique: true
  },
  deliveryMethod: {
    type: String,
    enum: ['pickup', 'courier'],
    default: 'pickup'
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  deliveryTracking: String,
  submissionDate: Date,
  estimatedCompletionDate: Date,
  completionDate: Date,
  isExpedited: {
    type: Boolean,
    default: false
  },
  isEmergency: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Generate tracking number before saving
ApplicationSchema.pre('save', async function(next) {
  if (!this.trackingNumber) {
    // Create a unique tracking number with format PSP-YYYY-XXXXXXX
    const year = new Date().getFullYear();
    const randomStr = Math.floor(1000000 + Math.random() * 9000000).toString();
    this.trackingNumber = `PSP-${year}-${randomStr}`;
  }
  
  // Set estimated completion date based on application type and processing
  if (this.status === 'payment_completed' && !this.estimatedCompletionDate) {
    let daysToAdd = 0;
    
    if (this.isEmergency) {
      daysToAdd = 2;
    } else if (this.isExpedited) {
      daysToAdd = 10;
    } else {
      // Normal processing
      switch(this.applicationType) {
        case 'new':
          daysToAdd = 42; // 6 weeks
          break;
        case 'renewal':
          daysToAdd = 35; // 5 weeks
          break;
        case 'name_change':
        case 'address_update':
          daysToAdd = 28; // 4 weeks
          break;
        default:
          daysToAdd = 42;
      }
    }
    
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);
    this.estimatedCompletionDate = estimatedDate;
  }
  
  next();
});

module.exports = mongoose.model('Application', ApplicationSchema);
