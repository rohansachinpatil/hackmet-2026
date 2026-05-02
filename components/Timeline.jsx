export default function Timeline() {
  return (
    <section id="timeline" style={{ maxWidth: '720px' }}>
      <div className="section-label">04 / Timeline</div>
      <h2 className="section-title">MARK YOUR<br />CALENDAR.</h2>
      <hr className="section-divider" />
      <div className="timeline">
        <div className="tl-item">
          <div className="tl-dot done"></div>
          <div className="tl-date">01 MAY 2026</div>
          <div className="tl-title">Registrations Open</div>
          <p className="tl-desc">Official registration portal goes live. Early bird teams get priority mentor allocation.</p>
          <span className="tl-badge live">LIVE</span>
        </div>
        <div className="tl-item">
          <div className="tl-dot active"></div>
          <div className="tl-date">20 JUNE 2026</div>
          <div className="tl-title">Registration Deadline</div>
          <p className="tl-desc">Last date to register your team. No extensions will be granted after this date.</p>
          <span className="tl-badge">UPCOMING</span>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-date">05 JULY 2026</div>
          <div className="tl-title">Idea Submission Deadline</div>
          <p className="tl-desc">Submit your 1-page problem statement and approach. Shortlisted teams notified by 8 July.</p>
          <span className="tl-badge">UPCOMING</span>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-date">12 JULY 2026 — 09:00 AM</div>
          <div className="tl-title">Hackathon Begins</div>
          <p className="tl-desc">Inauguration, team check-in, opening keynote, and the 48-hour clock starts ticking.</p>
          <span className="tl-badge">UPCOMING</span>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-date">12–13 JULY 2026</div>
          <div className="tl-title">Mentoring &amp; Build Sprints</div>
          <p className="tl-desc">Scheduled mentor sessions, workshops on AWS / Figma / APIs, mid-point check-ins.</p>
          <span className="tl-badge">UPCOMING</span>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-date">13 JULY 2026 — 09:00 AM</div>
          <div className="tl-title">Final Submissions</div>
          <p className="tl-desc">Code freeze. Submit your GitHub repo, demo video, and deck by 9 AM sharp.</p>
          <span className="tl-badge">UPCOMING</span>
        </div>
        <div className="tl-item">
          <div className="tl-dot"></div>
          <div className="tl-date">13 JULY 2026 — 02:00 PM</div>
          <div className="tl-title">Judging &amp; Closing Ceremony</div>
          <p className="tl-desc">Top 10 teams present to the jury. Winners announced. Prize distribution and closing.</p>
          <span className="tl-badge">UPCOMING</span>
        </div>
      </div>
    </section>
  );
}
