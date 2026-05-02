import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true, trim: true },
  teamSize: { type: Number, required: true, min: 2, max: 4 },
  leadName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  college: { type: String, required: true, trim: true },
  track: { type: String, required: true },
  idea: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Registration ||
  mongoose.model('Registration', RegistrationSchema);
