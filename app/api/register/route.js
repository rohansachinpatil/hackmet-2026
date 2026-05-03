import Razorpay from 'razorpay';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    await connectDB();

    const body = await request.json();
    const { team_name, team_size, preferred_track, brief_idea, members } = body;

    // Basic validation
    if (!team_name || !team_size || !preferred_track || !members || !Array.isArray(members) || members.length < 2) {
      return Response.json({ error: 'All fields except Area of Interest are required.' }, { status: 400 });
    }

    // Validate each member
    for (const m of members) {
      if (!m.name || !m.email || !m.year_of_study || !m.branch) {
        return Response.json({ error: 'All member fields (name, email, year_of_study, branch) are required.' }, { status: 400 });
      }
    }

    // Duplicate email check
    const emails = members.map((m) => m.email.toLowerCase());
    if (new Set(emails).size !== emails.length) {
      return Response.json({ error: 'Duplicate email addresses detected among members.' }, { status: 400 });
    }

    const lead = members.find((m) => m.is_lead) || members[0];

    // Create Razorpay order (₹299 = 29900 paise)
    const order = await razorpay.orders.create({
      amount: 29900,
      currency: 'INR',
      receipt: `hackmet_${Date.now()}`,
      notes: { teamName: team_name, leadName: lead.name, email: lead.email },
    });

    // Save registration to DB with pending status
    const registration = await Registration.create({
      teamName: team_name,
      teamSize: parseInt(team_size),
      preferredTrack: preferred_track,
      briefIdea: brief_idea,
      members: members.map((m) => ({
        name: m.name,
        email: m.email,
        phone: m.phone || '',
        yearOfStudy: m.year_of_study,
        branch: m.branch,
        gender: m.gender || '',
        isLead: !!m.is_lead,
      })),
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
