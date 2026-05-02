# HACK::MET 2026 🚀

**Live Website:** [https://hackmet-2026.vercel.app/](https://hackmet-2026.vercel.app/)

Welcome to the official repository for **HACK::MET 2026**, the biggest student innovation sprint in Maharashtra hosted by **E-Cell MET Institute of Engineering, Nashik**.

## 🛠 Tech Stack
This project was migrated from a static HTML template to a robust, full-stack Next.js web application.
- **Frontend**: Next.js (App Router), React, standard CSS (Space Mono & Press Start 2P fonts for retro-terminal styling).
- **Backend**: Next.js API Routes (Serverless).
- **Database**: MongoDB (Mongoose) for secure registration data storage.
- **Payments**: Razorpay integration for team registration fees.
- **Email**: Nodemailer for automated confirmation receipts.

## 💻 Running Locally

First, make sure you configure your `.env.local` file with the required environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment
This project is deployed using [Vercel](https://vercel.com/). Environment variables are configured securely in the Vercel dashboard, and the Razorpay client is lazily initialized within the API route to ensure seamless build compilation.

---
*Built with ♥ by E-Cell MET Tech Team*
