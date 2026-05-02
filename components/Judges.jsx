export default function Judges() {
  const judges = [
    { id: '01', avatar: 'UP', bg: '', name: 'UMESH PATHAK' },
    { id: '02', avatar: 'SP', bg: '#880000', name: 'SHREEKANT PATIL' },
    { id: '03', avatar: 'NS', bg: '#444466', name: 'NAYAN SANAP' },
    { id: '04', avatar: 'DV', bg: '#664400', name: 'DEEPAK VARTAK' },
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
              <div className="judge-avatar" style={{ background: judge.bg || 'var(--primary)' }}>{judge.avatar}</div>
              <div className="judge-name">{judge.name}</div>
              <div className="judge-role">Jury Member</div>
              <div className="judge-org">HACK::MET 2026</div>
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
