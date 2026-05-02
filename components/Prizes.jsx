export default function Prizes() {
  return (
    <section id="prizes">
      <div className="section-label">03 / Prizes</div>
      <h2 className="section-title">WIN BIG.<br />WIN REAL.</h2>
      <hr className="section-divider" />

      <div className="alert-box">
        <div className="alert-header">⚠ &nbsp; SYSTEM ALERT — PRIZE POOL</div>
        <div className="alert-body">!! Total prize pool exceeds ₹1,15,000 including cash awards, pre-seed funding
          opportunities, internship offers, and exclusive swag kits from sponsors.</div>
      </div>

      <div className="prizes-grid">
        <div className="prize-card">
          <div className="prize-rank">2nd Place</div>
          <span className="prize-medal">🥈</span>
          <span className="prize-amt">₹20,000</span>
          <div className="prize-label">Cash Prize</div>
          <div className="prize-perks">
            <div className="prize-perk">Mentor 1-on-1 session</div>
            <div className="prize-perk">Swag Kit + Cert</div>
            <div className="prize-perk">Internship Fast-Track</div>
          </div>
        </div>
        <div className="prize-card gold">
          <div className="prize-top-badge">★ WINNER</div>
          <div className="prize-rank">1st Place</div>
          <span className="prize-medal">🏆</span>
          <span className="prize-amt">₹30,000</span>
          <div className="prize-label">Cash Prize</div>
          <div className="prize-perks">
            <div className="prize-perk">Pre-seed funding access</div>
            <div className="prize-perk">Incubation opportunity</div>
            <div className="prize-perk">Media coverage</div>
            <div className="prize-perk">Trophy + Premium swag</div>
            <div className="prize-perk">Investor introductions</div>
          </div>
        </div>
        <div className="prize-card">
          <div className="prize-rank">3rd Place</div>
          <span className="prize-medal">🥉</span>
          <span className="prize-amt">₹5,000</span>
          <div className="prize-label">Cash Prize</div>
          <div className="prize-perks">
            <div className="prize-perk">Certificate + Swag</div>
            <div className="prize-perk">Partner discounts</div>
          </div>
        </div>
      </div>

      <div className="special-awards-grid" style={{ marginTop: '32px', display: 'grid', gap: '16px' }}>
        <div className="about-card">
          <div className="terminal-bar"><span className="t-dot g"></span><span style={{ marginLeft: '8px' }}>SPECIAL_AWARDS.log</span></div>
          <div className="about-card-body">
            <div className="info-row"><span className="info-key">BEST AI HACK</span><span className="info-val">₹20,000</span></div>
            <div className="info-row"><span className="info-key">BEST UI/UX</span><span className="info-val">₹15,000</span></div>
            <div className="info-row"><span className="info-key">SOCIAL IMPACT</span><span className="info-val">₹15,000</span></div>
            <div className="info-row"><span className="info-key">ROOKIE TEAM</span><span className="info-val">₹10,000</span></div>
          </div>
        </div>
        <div className="about-card">
          <div className="terminal-bar"><span className="t-dot y"></span><span style={{ marginLeft: '8px' }}>PERKS.sys</span></div>
          <div className="about-card-body">
            <div className="info-row"><span className="info-key">MEALS</span><span className="info-val">Free for all participants</span></div>
            <div className="info-row"><span className="info-key">STAY</span><span className="info-val">Accommodation available</span></div>
            <div className="info-row"><span className="info-key">MERCH</span><span className="info-val">T-shirt, badge, swag bag</span></div>
            <div className="info-row"><span className="info-key">CERTS</span><span className="info-val">All participants get one</span></div>
          </div>
        </div>
        <div className="about-card">
          <div className="terminal-bar"><span className="t-dot r"></span><span style={{ marginLeft: '8px' }}>OPPORTUNITIES.exe</span></div>
          <div className="about-card-body">
            <div className="info-row"><span className="info-key">INCUBATION</span><span className="info-val">MET E-Cell fast-track</span></div>
            <div className="info-row"><span className="info-key">INTERNSHIPS</span><span className="info-val">Partner companies</span></div>
            <div className="info-row"><span className="info-key">MENTORSHIP</span><span className="info-val">Post-event program</span></div>
            <div className="info-row"><span className="info-key">NETWORK</span><span className="info-val">20+ industry experts</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
