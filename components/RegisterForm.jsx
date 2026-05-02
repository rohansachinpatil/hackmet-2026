'use client';
import { useState, useEffect } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: '',
    leadName: '',
    email: '',
    college: '',
    track: '',
    idea: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. Create Order via Backend API
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to initialize registration.');

      // 2. Open Razorpay Checkout
      const options = {
        key: data.keyId,
        amount: '29900', // ₹299
        currency: 'INR',
        name: 'HACK::MET 2026',
        description: 'Team Registration Fee',
        order_id: data.orderId,
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch('/api/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId: data.registrationId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed.');
            
            setStatus({ type: 'success', message: 'Registration Successful! Confirmation email sent.' });
            setFormData({ teamName: '', teamSize: '', leadName: '', email: '', college: '', track: '', idea: '' });
          } catch (err) {
            setStatus({ type: 'error', message: err.message });
          }
        },
        prefill: {
          name: formData.leadName,
          email: formData.email,
        },
        theme: {
          color: '#FF3B3B',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setStatus({ type: 'error', message: 'Payment failed. Please try again.' });
      });
      rzp.open();

    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-section" id="register">
      <div className="section-label">08 / Register</div>
      <h2 className="section-title" style={{ color: 'var(--white)' }}>READY TO BUILD<br />SOMETHING LEGENDARY?</h2>
      <p style={{ fontSize: '12px', color: '#888888', marginTop: '16px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.8' }}>
        Fill in your details below and we&apos;ll send the confirmation and onboarding kit to your email within 24 hours.
      </p>

      <form className="reg-form" onSubmit={handleRegister}>
        {status.message && (
          <div style={{ padding: '12px', marginBottom: '16px', background: status.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 59, 59, 0.1)', color: status.type === 'success' ? '#4CAF50' : '#FF3B3B', border: `1px solid ${status.type === 'success' ? '#4CAF50' : '#FF3B3B'}` }}>
            {status.message}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Team Name</label>
            <input className="form-input" type="text" name="teamName" required value={formData.teamName} onChange={handleInputChange} placeholder="[ Team Pixel... ]" />
          </div>
          <div className="form-group">
            <label className="form-label">Team Size</label>
            <select className="form-select" name="teamSize" required value={formData.teamSize} onChange={handleInputChange}>
              <option value="">▼ Select</option>
              <option value="2">2 Members</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Team Lead Name</label>
            <input className="form-input" type="text" name="leadName" required value={formData.leadName} onChange={handleInputChange} placeholder="[ Your name... ]" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="[ you@college.edu ]" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">College / Institution</label>
          <input className="form-input" type="text" name="college" required value={formData.college} onChange={handleInputChange} placeholder="[ MET Institute of Engineering... ]" />
        </div>
        <div className="form-group">
          <label className="form-label">Preferred Track</label>
          <select className="form-select" name="track" required value={formData.track} onChange={handleInputChange}>
            <option value="">▼ Select a track</option>
            <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
            <option value="Sustainability & Climate Tech">Sustainability &amp; Climate Tech</option>
            <option value="Health & MedTech">Health &amp; MedTech</option>
            <option value="FinTech & Blockchain">FinTech &amp; Blockchain</option>
            <option value="EdTech & Social Impact">EdTech &amp; Social Impact</option>
            <option value="Open Innovation">Open Innovation</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Brief Idea (1–2 lines)</label>
          <textarea className="form-input" name="idea" required value={formData.idea} onChange={handleInputChange} style={{ minHeight: '80px', resize: 'vertical' }} placeholder="[ Describe the problem you want to solve... ]"></textarea>
        </div>
        
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '10px', padding: '14px', opacity: loading ? 0.7 : 1 }}>
          {loading ? '[ PROCESSING... ]' : '[ SUBMIT REGISTRATION — ₹299 / TEAM ]'}
        </button>
        
        <p className="register-note">Secure payment via Razorpay · All participants receive confirmation within 24 hrs · Refund policy: 100% refund if event is cancelled</p>
      </form>
    </div>
  );
}
