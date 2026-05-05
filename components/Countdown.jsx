'use client';
import { useEffect, useState } from 'react';

export default function Countdown() {
  const [time, setTime] = useState({ days: '00', hrs: '00', min: '00', sec: '00' });

  useEffect(() => {
    const target = new Date('2026-07-12T09:00:00+05:30').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ days: '00', hrs: '00', min: '00', sec: '00' }); return; }
      const pad = (n) => String(n).padStart(2, '0');
      setTime({
        days: pad(Math.floor(diff / 86400000)),
        hrs: pad(Math.floor((diff % 86400000) / 3600000)),
        min: pad(Math.floor((diff % 3600000) / 60000)),
        sec: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-section">
      <div className="countdown-label-top">
        &gt; REGISTRATION CLOSES IN<span className="blink"></span>
      </div>
      <div className="countdown-wrap">
        {[['Days', time.days], ['Hours', time.hrs], ['Mins', time.min], ['Secs', time.sec]].map(([label, val]) => (
          <div className="countdown-unit" key={label}>
            <span className="countdown-num">{val}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
