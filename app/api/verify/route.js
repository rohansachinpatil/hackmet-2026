import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import nodemailer from 'nodemailer';

async function sendConfirmationEmail(registration) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HACK::MET 2026" <${process.env.EMAIL_USER}>`,
    to: registration.email,
    subject: '✅ Registration Confirmed — HACK::MET 2026',
    html: `
      <div style="font-family: monospace; background: #0a0a0a; color: #e0e0e0; padding: 32px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF3B3B; font-size: 20px;">HACK::MET 2026</h1>
        <h2 style="color: #ffffff;">Registration Confirmed ✓</h2>
        <p>Hey <strong>${registration.leadName}</strong>,</p>
        <p>Your team <strong>${registration.teamName}</strong> is officially registered for HACK::MET 2026!</p>
        <hr style="border-color: #333; margin: 24px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888;">Team Name</td><td style="color: #fff;">${registration.teamName}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Team Size</td><td style="color: #fff;">${registration.teamSize} Members</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Track</td><td style="color: #fff;">${registration.track}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">College</td><td style="color: #fff;">${registration.college}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Payment</td><td style="color: #4CAF50;">₹1 Paid ✓</td></tr>
        </table>
        <hr style="border-color: #333; margin: 24px 0;" />
        <p>📅 <strong>Date:</strong> 12–13 July 2026</p>
        <p>📍 <strong>Venue:</strong> MET Institute of Engineering, Nashik</p>
        <p style="color: #888; font-size: 12px; margin-top: 32px;">Questions? Email us at met.iot.ecell@gmail.com</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = body;

    // Verify Razorpay signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return Response.json({ error: 'Payment verification failed.' }, { status: 400 });
    }

    // Update registration to paid
    const registration = await Registration.findByIdAndUpdate(
      registrationId,
      {
        paymentStatus: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );

    if (!registration) {
      return Response.json({ error: 'Registration not found.' }, { status: 404 });
    }

    // Send confirmation email
    try {
      await sendConfirmationEmail(registration);
    } catch (emailError) {
      console.error('Email failed (non-critical):', emailError);
    }

    return Response.json({ success: true, message: 'Payment verified and registration confirmed!' });
  } catch (error) {
    console.error('Verify error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
