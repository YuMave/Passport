const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    location: {
        name: String,
        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        },
        contactNumber: String
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'rescheduled', 'missed'],
        default: 'scheduled'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    biometricsCollected: {
        type: Boolean,
        default: false
    },
    notes: String,
    reminderSent: {
        type: Boolean,
        default: false
    },
    rescheduledFrom: Date,
    rescheduledReason: String
}, { timestamps: true });

// Generate confirmation code before saving
AppointmentSchema.pre('save', async function(next) {
  if (!this.confirmationCode) {
    // Create a unique confirmation code
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.confirmationCode = `APT-${randomStr}`;
  }
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
