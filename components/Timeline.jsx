'use client';
import { useState, useEffect } from 'react';

const events = [
  {
    id: 1,
    phase: '> PHASE_01 :: PRE-EVENT',
    dateStr: '01 MAY 2026',
    dateIso: '2026-05-01T09:00:00+05:30',
    title: 'Registrations Open',
    desc: 'Official registration portal goes live. Early bird teams get priority mentor allocation.'
  },
  {
    id: 2,
    dateStr: '20 JUNE 2026',
    dateIso: '2026-06-20T23:59:00+05:30',
    title: 'Registration Deadline',
    desc: 'Last date to register your team. No extensions will be granted after this date.'
  },
  {
    id: 3,
    dateStr: '05 JULY 2026',
    dateIso: '2026-07-05T23:59:00+05:30',
    title: 'Idea Submission Deadline',
    desc: 'Submit your 1-page problem statement and approach. Shortlisted teams notified by 8 July.'
  },
  {
    id: 4,
    phase: '> PHASE_02 :: HACKATHON WEEKEND',
    dateStr: '12 JULY 2026 — 09:00 AM',
    dateIso: '2026-07-12T09:00:00+05:30',
    title: 'Hackathon Begins',
    desc: 'Inauguration, team check-in, opening keynote, and the 48-hour clock starts ticking.'
  },
  {
    id: 5,
    dateStr: '12–13 JULY 2026',
    dateIso: '2026-07-12T14:00:00+05:30',
    title: 'Mentoring & Build Sprints',
    desc: 'Scheduled mentor sessions, workshops on AWS / Figma / APIs, mid-point check-ins.'
  },
  {
    id: 6,
    dateStr: '13 JULY 2026 — 09:00 AM',
    dateIso: '2026-07-13T09:00:00+05:30',
    title: 'Final Submissions',
    desc: 'Code freeze. Submit your GitHub repo, demo video, and deck by 9 AM sharp.'
  },
  {
    id: 7,
    phase: '> PHASE_03 :: JUDGING & CLOSING',
    dateStr: '13 JULY 2026 — 02:00 PM',
    dateIso: '2026-07-13T14:00:00+05:30',
    title: 'Judging & Closing Ceremony',
    desc: 'Top 10 teams present to the jury. Winners announced. Prize distribution and closing.'
  }
];

export default function Timeline() {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const getEventStatus = (eventDateIso) => {
    if (!currentTime) return 'status-upcoming';
    
    const eventTime = new Date(eventDateIso).getTime();
    const now = currentTime.getTime();
    const oneHour = 60 * 60 * 1000;
    
    if (now > eventTime + oneHour) {
      return 'status-completed';
    } else if (now >= eventTime - oneHour && now <= eventTime + oneHour) {
      return 'status-live';
    } else {
      return 'status-upcoming';
    }
  };

  const renderBadgeContent = (status) => {
    if (status === 'status-completed') return '✓ COMPLETED';
    if (status === 'status-live') return <><span className="live-dot"></span>LIVE NOW</>;
    return 'UPCOMING';
  };

  return (
    <section id="timeline" style={{ maxWidth: '720px' }}>
      <div className="section-label">04 / Timeline</div>
      <h2 className="section-title">MARK YOUR<br />CALENDAR.</h2>
      <hr className="section-divider" />
      <div className="timeline">
        {events.map((event, index) => {
          const status = getEventStatus(event.dateIso);
          return (
            <div key={event.id}>
              {event.phase && (
                <div className="tl-phase-wrapper">
                  {index > 0 && <div className="tl-phase-divider"></div>}
                  <div className="tl-phase-label">{event.phase}</div>
                </div>
              )}
              <div className="tl-item" data-event-date={event.dateIso}>
                <div className={`tl-dot ${status}`}></div>
                <div className="tl-date">{event.dateStr}</div>
                <div className="tl-title">{event.title}</div>
                <p className="tl-desc">{event.desc}</p>
                <span className={`tl-badge ${status}`}>
                  {renderBadgeContent(status)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
