import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import About from '@/components/About';
import Tracks from '@/components/Tracks';
import Prizes from '@/components/Prizes';
import Timeline from '@/components/Timeline';
import Judges from '@/components/Judges';
import Sponsors from '@/components/Sponsors';
import FAQ from '@/components/FAQ';
import RegisterForm from '@/components/RegisterForm';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Countdown />

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span>REGISTRATIONS OPEN</span><span>₹1,15,000+ PRIZES</span><span>48 HOURS</span><span>500+ PARTICIPANTS</span>
          <span>12–13 JULY 2026</span><span>MET INSTITUTE NASHIK</span><span>REGISTRATIONS OPEN</span>
          <span>₹1,15,000+ PRIZES</span><span>48 HOURS</span><span>500+ PARTICIPANTS</span>
          <span>12–13 JULY 2026</span><span>MET INSTITUTE NASHIK</span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item"><span className="stat-num">500+</span><span className="stat-desc">Participants</span></div>
        <div className="stat-item"><span className="stat-num">₹1.15L+</span><span className="stat-desc">Total Prize Pool</span></div>
        <div className="stat-item"><span className="stat-num">48H</span><span className="stat-desc">Non-Stop Hacking</span></div>
        <div className="stat-item"><span className="stat-num">6</span><span className="stat-desc">Tracks</span></div>
        <div className="stat-item"><span className="stat-num">20+</span><span className="stat-desc">Industry Mentors</span></div>
        <div className="stat-item"><span className="stat-num">1</span><span className="stat-desc">Title Sponsor</span></div>
      </div>

      <About />

      {/* PROCESS STEPS */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 80px' }}>
        <div className="process-steps">
          <div className="process-step">
            <span className="step-num">01</span>
            <div className="step-title">REGISTER YOUR TEAM</div>
            <p className="step-desc">Form a team of 2–4, fill the registration form, and pay the nominal fee before 20 June 2026.</p>
          </div>
          <div className="process-step">
            <span className="step-num">02</span>
            <div className="step-title">SUBMIT IDEA BRIEF</div>
            <p className="step-desc">Submit a 1-page problem statement and proposed approach by 5 July 2026 for screening.</p>
          </div>
          <div className="process-step">
            <span className="step-num">03</span>
            <div className="step-title">HACK FOR 48 HOURS</div>
            <p className="step-desc">Show up at MET on 12 July. Build, mentor, iterate, and ship your solution in 48 hours.</p>
          </div>
          <div className="process-step">
            <span className="step-num">04</span>
            <div className="step-title">PITCH & WIN</div>
            <p className="step-desc">Present to a jury of industry experts. Top teams win prizes, mentorship, and recognition.</p>
          </div>
        </div>
      </div>

      <Tracks />
      <Prizes />
      <Timeline />
      <Judges />
      <Sponsors />
      <FAQ />
      <RegisterForm />

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="nav-logo" style={{ color: 'var(--white)' }}>E-CELL<span style={{ color: 'var(--primary)' }}>::</span>MET</span>
            <p>Entrepreneurship Cell, MET Institute of Engineering. Empowering the next generation of student innovators since 2015.</p>
          </div>
          <div>
            <div className="footer-col-title">QUICK LINKS</div>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#tracks">Tracks</a></li>
              <li><a href="#prizes">Prizes</a></li>
              <li><a href="#timeline">Timeline</a></li>
              <li><a href="#register">Register</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">CONTACT</div>
            <ul className="footer-links">
              <li><a href="mailto:met.iot.ecell@gmail.com">met.iot.ecell@gmail.com</a></li>
              <li><a href="tel:+917020672694">+91 70206 72694</a></li>
              <li><a href="#">E-Cell MET, Institute of Technology (Polytechnic)</a></li>
              <li><a href="#">MET Bhujbal Knowledge City, Adgaon, Nashik</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">SOCIALS</div>
            <ul className="footer-links">
              <li><a href="https://www.instagram.com/ecell.met/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/ecell-met/posts/?feedView=all" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://x.com/Ecell_MetNashik" target="_blank" rel="noreferrer">Twitter / X</a></li>
              <li><a href="https://www.ecell-met.tech/" target="_blank" rel="noreferrer">Website</a></li>
              <li><a href="https://www.youtube.com/@ecell-met-live" target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 E-Cell MET Hackathon. All rights reserved.</p>
          <p>Built with <span className="accent">♥</span> by E-Cell MET Tech Team</p>
        </div>
      </footer>
    </>
  );
}
