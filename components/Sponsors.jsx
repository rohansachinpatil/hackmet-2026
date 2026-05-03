export default function Sponsors() {
  return (
    <section>
      <div className="section-label">06 / Sponsors</div>
      <h2 className="section-title">POWERED BY<br />INDUSTRY LEADERS.</h2>
      <hr className="section-divider" />
      <div className="sponsors-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="sponsor-tile" style={{ border: 'none', padding: '60px 20px' }}>
          <div className="sponsor-logo-box" style={{ width: '100%', maxWidth: '400px', height: '150px', padding: '20px', background: 'transparent', border: 'none' }}>
            <img 
              src="/baratisponsorlogo.png" 
              alt="Baratiz" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
          </div>
          <div className="sponsor-name" style={{ fontSize: '20px', marginTop: '16px' }}>Baratiz</div>
          <div className="sponsor-tier gold-tier" style={{ fontSize: '14px', padding: '6px 16px', marginTop: '12px' }}>Title Sponsor</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <a href="mailto:ecell@met.edu" className="btn-outline">[ BECOME A SPONSOR ]</a>
      </div>
    </section>
  );
}
