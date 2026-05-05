export default function Judges() {
  const judges = [
    { 
      id: '01', 
      avatar: 'UP', 
      name: 'UMESH PATHAK',
      role: 'CTO',
      company: 'TechStartup Nashik',
      bio: '15 years in deep tech, 3 successful exits, mentor at NASSCOM.',
      photo: '/assets/judges/umesh-pathak.jpg',
      gradient: 'linear-gradient(135deg, #1a1a1a, #4a0000)',
      linkedin: 'https://linkedin.com/in/umeshpathak'
    },
    { 
      id: '02', 
      avatar: 'SP', 
      name: 'SHREEKANT PATIL',
      role: 'FOUNDER',
      company: 'PARENIT',
      bio: 'Serial entrepreneur & angel investor. Specializes in B2B SaaS scaling.',
      photo: '', // Deliberately blank to demonstrate the fallback gradient
      gradient: 'linear-gradient(135deg, #4d0000, #990000)',
      linkedin: 'https://linkedin.com/in/shreekantpatil'
    },
    { 
      id: '03', 
      avatar: 'NS', 
      name: 'NAYAN SANAP',
      role: 'AI RESEARCHER',
      company: 'OPENAI LABS',
      bio: 'Pioneering work in large language models and computer vision pipelines.',
      photo: '/assets/judges/nayan-sanap.jpg', 
      gradient: 'linear-gradient(135deg, #222233, #444466)',
      linkedin: 'https://linkedin.com/in/nayansanap'
    },
    { 
      id: '04', 
      avatar: 'DV', 
      name: 'DEEPAK VARTAK',
      role: 'VP ENGINEERING',
      company: 'FINTECH HUB',
      bio: 'Architected highly scalable fintech systems handling 1M+ TPS.',
      photo: '/assets/judges/deepak-vartak.jpg', 
      gradient: 'linear-gradient(135deg, #332200, #664400)',
      linkedin: 'https://linkedin.com/in/deepakvartak'
    },
  ];

  return (
    <section id="judges">
      <div className="section-label">05 / Jury</div>
      <h2 className="section-title">MEET THE<br />JUDGES.</h2>
      <hr className="section-divider" />
      <div className="judges-grid">
        {judges.map((judge) => (
          <div className="judge-card" key={judge.id}>
            <div className="terminal-bar">
              <span className="t-dot r"></span>
              <span className="t-dot y"></span>
              <span className="t-dot g"></span>
              <span style={{ marginLeft: '6px' }}>judge_{judge.id}</span>
              <span style={{ marginLeft: 'auto' }}>×</span>
            </div>
            <div className="judge-body">
              {judge.linkedin && (
                <a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className="judge-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
              
              {judge.photo ? (
                <img src={judge.photo} alt={judge.name} className="judge-avatar-img" loading="lazy" />
              ) : (
                <div className="judge-avatar-fallback" style={{ background: judge.gradient }}>
                  {judge.avatar}
                </div>
              )}
              
              <div className="judge-name">{judge.name}</div>
              <div className="judge-affiliation">{judge.role} · {judge.company}</div>
              <div className="judge-bio">{judge.bio}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '20px', textAlign: 'center' }}>
        + 16 more industry mentors to be announced. Stay tuned.
      </p>
    </section>
  );
}
