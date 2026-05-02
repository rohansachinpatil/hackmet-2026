import Razorpay from 'razorpay';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import nodemailer from 'nodemailer';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { teamName, teamSize, leadName, email, college, track, idea } = body;

    // Basic validation
    if (!teamName || !teamSize || !leadName || !email || !college || !track || !idea) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Create Razorpay order (₹299 = 29900 paise)
    const order = await razorpay.orders.create({
      amount: 29900,
      currency: 'INR',
      receipt: `hackmet_${Date.now()}`,
      notes: { teamName, leadName, email },
    });

    // Save registration to DB with pending status
    const registration = await Registration.create({
      teamName,
      teamSize: parseInt(teamSize),
      leadName,
      email,
      college,
      track,
      idea,
      razorpayOrderId: order.id,
      paymentStatus: 'pending',
    });

    return Response.json({
      orderId: order.id,
      registrationId: registration._id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Register error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
