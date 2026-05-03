export default function Hero() {
  return (
    <section className="hero" style={{ paddingTop: '120px' }}>
      <div className="hero-badge">▶ REGISTRATIONS OPEN &nbsp;·&nbsp; <span>DEADLINE: 20 JUNE 2026</span></div>
      <h1>HACK THE <span className="accent">FUTURE.</span><br />BUILD WHAT<br />MATTERS.</h1>
      <p className="hero-sub">E-CELL MET HACKATHON 2026</p>
      <p className="hero-desc">
        48 hours. 500+ hackers. ₹1,15,000+ in prizes. Join the biggest student innovation sprint in
        Maharashtra and turn your ideas into reality.
      </p>
      <div className="hero-btns">
        <a href="#register" className="btn-primary">[ REGISTER NOW ]</a>
        <a href="#tracks" className="btn-outline">[ VIEW TRACKS ]</a>
      </div>

      <div className="hero-terminal">
        <div className="terminal-bar">
          <span className="t-dot r"></span>
          <span className="t-dot y"></span>
          <span className="t-dot g"></span>
          <span style={{ marginLeft: '8px' }}>BOOT.SYS — E-Cell MET Hackathon 2026</span>
        </div>
        <div className="terminal-body">
          <div><span className="g">system</span><span className="w"> &gt;</span> initializing hackathon_2026.exe</div>
          <div><span className="g">status</span><span className="w"> &gt;</span> <span className="y">REGISTRATION_OPEN</span></div>
          <div><span className="g">teams</span><span className="w"> &gt;</span> <span className="w">500+ registered</span></div>
          <div><span className="g">prize</span><span className="w"> &gt;</span> <span className="w">₹1,15,000+ in total rewards</span></div>
          <div><span className="g">venue</span><span className="w"> &gt;</span> <span className="w">MET Institute of Engineering, Nashik</span></div>
          <div><span className="g">date</span><span className="w"> &gt;</span> <span className="w">12–13 JULY 2026 (48 HRS)</span></div>
          <div><span className="g">await</span><span className="w"> &gt;</span> your_team.register() <span className="blink"></span></div>
        </div>
      </div>
    </section>
  );
}
