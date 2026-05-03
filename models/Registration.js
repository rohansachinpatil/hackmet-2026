import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  yearOfStudy: { type: String, required: true },
  branch: { type: String, required: true, trim: true },
  gender: { type: String, trim: true, default: '' },
  isLead: { type: Boolean, default: false },
});

const RegistrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true, trim: true },
  teamSize: { type: Number, required: true, min: 2, max: 4 },
  preferredTrack: { type: String, required: true },
  briefIdea: { type: String, default: '' },
  members: { type: [MemberSchema], required: true, validate: v => v.length >= 2 && v.length <= 4 },
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
