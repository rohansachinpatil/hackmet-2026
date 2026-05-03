export default function Tracks() {
  const tracks = [
    {
      id: '01',
      icon: '🤖',
      name: 'AI & MACHINE LEARNING',
      desc: 'Build intelligent systems that learn, adapt, and solve real problems using ML, NLP, or computer vision.',
      tags: [{ text: 'HOT', active: true }, { text: 'NLP' }, { text: 'CV' }, { text: 'GenAI' }],
    },
    {
      id: '02',
      icon: '🌱',
      name: 'SUSTAINABILITY & CLIMATE TECH',
      desc: 'Address pressing environmental challenges — smart energy, waste management, or climate data systems.',
      tags: [{ text: 'CleanTech' }, { text: 'IoT' }, { text: 'GreenAI' }],
    },
    {
      id: '03',
      icon: '🏥',
      name: 'HEALTH & MEDTECH',
      desc: 'Innovate in diagnostics, telemedicine, mental health, wearables, or health data analytics.',
      tags: [{ text: 'HealthAI' }, { text: 'Wearables' }, { text: 'Diagnostics' }],
    },
    {
      id: '04',
      icon: '🏦',
      name: 'FINTECH & BLOCKCHAIN',
      desc: "Reimagine financial services, payments, credit access, or DeFi for India's next billion users.",
      tags: [{ text: 'DeFi' }, { text: 'UPI' }, { text: 'Web3' }],
    },
    {
      id: '05',
      icon: '🎓',
      name: 'EDTECH & SOCIAL IMPACT',
      desc: 'Create inclusive tools for learning, skill development, or civic challenges in underserved communities.',
      tags: [{ text: 'EdAI' }, { text: 'Bharat' }, { text: 'Impact' }],
    },
    {
      id: '06',
      icon: '🔓',
      name: 'OPEN INNOVATION',
      desc: 'Your problem, your solution. No domain restriction — surprise us with something genuinely novel.',
      tags: [{ text: 'OPEN', active: true }, { text: 'Wildcard' }],
    },
  ];

  return (
    <section id="tracks">
      <div className="section-label">02 / Tracks</div>
      <h2 className="section-title">CHOOSE YOUR<br />BATTLE GROUND</h2>
      <hr className="section-divider" />
      <div className="tracks-grid">
        {tracks.map((track) => (
          <div className="track-card" key={track.id}>
            <div className="track-header">TRACK_{track.id}.exe <span className="t-dot g" style={{ width: '8px', height: '8px' }}></span></div>
            <div className="track-body">
              <span className="track-icon">{track.icon}</span>
              <div className="track-name">{track.name}</div>
              <p className="track-desc">{track.desc}</p>
              <div className="track-tags">
                {track.tags.map((tag, i) => (
                  <span className={`tag ${tag.active ? 'active' : ''}`} key={i}>{tag.text}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
