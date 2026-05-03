'use client';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Who can participate in HACK::MET 2026?',
      a: 'Any currently enrolled undergraduate or postgraduate student from any college or stream in India can participate. You do not need to be from a technical background — multidisciplinary teams are encouraged and often win!',
    },
    {
      q: 'What is the team size requirement?',
      a: 'Teams must have a minimum of 2 members and a maximum of 4 members. Solo registrations are not accepted. Cross-college teams are allowed and appreciated.',
    },
    {
      q: 'Is accommodation provided?',
      a: 'Yes! MET campus provides accommodation for outstation participants. Meals (breakfast, lunch, dinner, midnight snacks) are provided free of charge for all registered participants throughout the 48-hour event.',
    },
    {
      q: 'Can I work on a pre-existing idea or project?',
      a: 'You may bring prior research or conceptual work, but all code and prototypes must be built during the hackathon. Judges will evaluate what was built during the 48-hour window. Using public APIs, open-source libraries, and cloud services is allowed.',
    },
    {
      q: 'What technologies can we use?',
      a: 'Any technology, language, framework, or platform is allowed. Hardware hacks are welcome too! Sponsors like AWS, GitHub, and GCP provide free credits for participants.',
    },
    {
      q: 'How are projects judged?',
      a: 'Projects are evaluated on Innovation (25%), Technical Complexity (25%), Feasibility & Business Potential (20%), User Experience (15%), and Presentation Quality (15%). Judges are industry experts, investors, and senior engineers.',
    },
    {
      q: 'What is the registration fee?',
      a: 'The registration fee is ₹299 per team, irrespective of team size. This covers meals, accommodation, swag kit, and participation certificate. Payment is accepted via UPI, net banking, or card.',
    },
  ];

  return (
    <section id="faq" style={{ maxWidth: '800px' }}>
      <div className="section-label">07 / FAQ</div>
      <h2 className="section-title">FREQUENTLY<br />ASKED QUESTIONS</h2>
      <hr className="section-divider" />
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={index}>
            <div className="faq-q" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              <span className="faq-q-text">{faq.q}</span>
              <span className="faq-toggle">+</span>
            </div>
            <div className="faq-a">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
