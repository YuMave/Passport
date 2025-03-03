const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  feeBreakdown: {
    baseAmount: Number,
    expeditedFee: Number,
    additionalPagesFee: Number,
    replacementFee: Number,
    emergencyFee: Number,
    deliveryFee: Number,
    serviceFee: Number
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'net_banking', 'digital_wallet', 'upi'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: String,
  paymentGatewayResponse: Object,
  paymentDate: Date,
  receiptUrl: String,
  refundAmount: Number,
  refundDate: Date,
  refundReason: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);

