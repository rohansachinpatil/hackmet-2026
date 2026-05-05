export default function About() {
  return (
    <section id="about">
      <div className="section-label">01 / About</div>
      <h2 className="section-title">WHAT IS<br />HACK::MET 2026?</h2>
      <hr className="section-divider" />
      <div className="about-grid">
        <div className="about-text">
          <p>E-Cell MET Hackathon 2026 (HACK::MET) is the flagship annual innovation competition by the Entrepreneurship
            Cell of MET Institute of Engineering, Nashik — one of Maharashtra&apos;s most energetic student innovation ecosystems.</p>
          <p>Over 48 relentless hours, teams of 2–4 students will ideate, prototype, and pitch solutions to real-world
            problems across 6 high-impact domains. Whether you&apos;re a developer, designer, product thinker, or domain expert
            — there&apos;s a track for you.</p>
          <p>Beyond coding, HACK::MET offers mentorship sessions, workshops, networking with industry leaders, and a
            launchpad for the ideas that deserve to exist in the world.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a href="#register" className="btn-primary">[ JOIN NOW ]</a>
            <a
              href="/assets/HackMET2026_Brochure.pdf"
              className="btn-outline btn-brochure"
              target="_blank"
              rel="noopener noreferrer"
              download="HackMET2026_Brochure.pdf"
              style={{ pointerEvents: 'none', opacity: 0.45 }}
            >
              [ ⬇ BROCHURE &mdash; COMING SOON ]
            </a>
          </div>
        </div>
        <div>
          <div className="about-card">
            <div className="terminal-bar">
              <span className="t-dot r"></span><span className="t-dot y"></span><span className="t-dot g"></span>
              <span style={{ marginLeft: '8px' }}>EVENT_INFO.sys</span>
              <span style={{ marginLeft: 'auto' }}>×</span>
            </div>
            <div className="about-card-body">
              {[
                ['📅', 'DATE', '12–13 July 2026'],
                ['📍', 'VENUE', 'MET Institute of Engineering, Nashik'],
                ['⏱', 'DURATION', '48 Hours (Non-Stop)'],
                ['👥', 'TEAM SIZE', '2 – 4 Members'],
                ['🎓', 'ELIGIBILITY', 'UG / PG Students (Any Stream)'],
                ['💰', 'REG. FEE', '₹299 / Team'],
                ['📤', 'DEADLINE', '20 June 2026'],
              ].map(([icon, key, val]) => (
                <div className="info-row" key={key}>
                  <span className="info-icon">{icon}</span>
                  <span className="info-key">{key}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
