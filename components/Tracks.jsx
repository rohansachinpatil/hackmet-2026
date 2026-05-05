'use client';
import { useState, useEffect } from 'react';

export default function Tracks() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    // TODO: Replace this mock with an actual fetch call to /api/tracks/counts
    const mockFetch = setTimeout(() => {
      setCounts({
        '01': 47,
        '02': 22,
        '03': 15,
        '04': 28,
        '05': 19,
        '06': 38,
      });
    }, 1200);
    return () => clearTimeout(mockFetch);
  }, []);

  const tracks = [
    {
      id: '01',
      icon: '🤖',
      name: 'AI & MACHINE LEARNING',
      desc: 'Build intelligent systems that learn, adapt, and solve real problems using ML, NLP, or computer vision.',
      tags: [{ text: 'HOT', active: true }, { text: 'NLP' }, { text: 'CV' }, { text: 'GenAI' }],
      skillLevel: 'INTERMEDIATE',
    },
    {
      id: '02',
      icon: '🌱',
      name: 'SUSTAINABILITY & CLIMATE TECH',
      desc: 'Address pressing environmental challenges — smart energy, waste management, or climate data systems.',
      tags: [{ text: 'CleanTech' }, { text: 'IoT' }, { text: 'GreenAI' }],
      skillLevel: 'BEGINNER FRIENDLY',
    },
    {
      id: '03',
      icon: '🏥',
      name: 'HEALTH & MEDTECH',
      desc: 'Innovate in diagnostics, telemedicine, mental health, wearables, or health data analytics.',
      tags: [{ text: 'HealthAI' }, { text: 'Wearables' }, { text: 'Diagnostics' }],
      skillLevel: 'BEGINNER FRIENDLY',
    },
    {
      id: '04',
      icon: '🏦',
      name: 'FINTECH & BLOCKCHAIN',
      desc: "Reimagine financial services, payments, credit access, or DeFi for India's next billion users.",
      tags: [{ text: 'DeFi' }, { text: 'UPI' }, { text: 'Web3' }],
      skillLevel: 'INTERMEDIATE',
    },
    {
      id: '05',
      icon: '🎓',
      name: 'EDTECH & SOCIAL IMPACT',
      desc: 'Create inclusive tools for learning, skill development, or civic challenges in underserved communities.',
      tags: [{ text: 'EdAI' }, { text: 'Bharat' }, { text: 'Impact' }],
      skillLevel: 'BEGINNER FRIENDLY',
    },
    {
      id: '06',
      icon: '🔓',
      name: 'OPEN INNOVATION',
      desc: 'Your problem, your solution. No domain restriction — surprise us with something genuinely novel.',
      tags: [{ text: 'OPEN', active: true }, { text: 'Wildcard' }],
      skillLevel: 'BEGINNER FRIENDLY',
    },
  ];

  const getSkillColor = (level) => {
    switch (level) {
      case 'BEGINNER FRIENDLY': return '#4caf50';
      case 'INTERMEDIATE': return '#FFAA00';
      case 'ADVANCED': return 'var(--primary)';
      default: return 'var(--text-sec)';
    }
  };

  return (
    <section id="tracks">
      <div className="section-label">02 / Tracks</div>
      <h2 className="section-title">CHOOSE YOUR<br />BATTLE GROUND</h2>
      <hr className="section-divider" />
      <div className="tracks-grid">
        {tracks.map((track) => (
          <div className="track-card" key={track.id}>
            <div className="track-header">
              <span>TRACK_{track.id}.exe</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {counts ? (
                  <span className="track-count-badge">
                    {counts[track.id] === Math.max(...Object.values(counts)) && (
                      <span className="hot-tag">🔥 HOT</span>
                    )}
                    [ {counts[track.id].toString().padStart(2, '0')} TEAMS ]
                  </span>
                ) : (
                  <span className="track-count-badge">
                    [ -- TEAMS ]
                  </span>
                )}
                <span className="t-dot g" style={{ width: '8px', height: '8px' }}></span>
              </div>
            </div>
            <div className="track-body">
              <span className="track-icon">{track.icon}</span>
              <div className="track-name">{track.name}</div>
              <p className="track-desc">{track.desc}</p>
              <div className="track-tags">
                {track.tags.map((tag, i) => (
                  <span className={`tag ${tag.active ? 'active' : ''}`} key={i}>{tag.text}</span>
                ))}
              </div>
              <div className="track-skill-level">
                <span style={{ marginRight: '6px' }}>&gt; SKILL LEVEL:</span>
                <span style={{ color: getSkillColor(track.skillLevel), display: 'flex', alignItems: 'center' }}>
                  <span className="blink-dot" style={{ backgroundColor: getSkillColor(track.skillLevel) }}></span>
                  {track.skillLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
