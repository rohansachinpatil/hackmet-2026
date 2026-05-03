'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th', 'PG 1st', 'PG 2nd', 'PhD', 'Other'];
const GENDER_OPTIONS = ['Prefer not to say', 'Male', 'Female', 'Non-binary', 'Other'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[+]?[0-9]{10,13}$/;
const IDEA_MAX = 500;

function createEmptyMember(isLead = false) {
  return {
    name: '',
    email: '',
    phone: '',
    yearOfStudy: '',
    branch: '',
    gender: '',
    isLead,
  };
}

// ─── Per-field validation rules ───
function validateField(fieldKey, value, { isLead = false } = {}) {
  const v = typeof value === 'string' ? value.trim() : value;

  switch (fieldKey) {
    case 'teamName':
    case 'name':
    case 'branch': {
      if (!v) return 'This field is required.';
      if (v.length < 2) return 'Must be at least 2 characters.';
      if (/^\d+$/.test(v)) return 'Cannot be numbers only.';
      return null;
    }
    case 'email': {
      if (!v) return 'Email is required.';
      if (!EMAIL_RE.test(v)) return 'Invalid email format.';
      return null;
    }
    case 'phone': {
      // Phone is optional for lead, absent for others
      if (!v) return null; // optional
      if (!PHONE_RE.test(v.replace(/\s/g, ''))) return 'Must be 10-13 digits, optional + prefix.';
      return null;
    }
    case 'teamSize':
    case 'yearOfStudy':
    case 'track': {
      if (!v) return 'Please select an option.';
      return null;
    }
    case 'idea': {
      if (!v) return null; // optional now
      if (v.length > IDEA_MAX) return `Maximum ${IDEA_MAX} characters exceeded.`;
      return null;
    }
    default:
      return null;
  }
}

// ─── Reusable ValidatedField wrapper ───
function ValidatedField({ children, fieldKey, value, touched, onBlur, error, hint, charCounter }) {
  const isValid = touched && error === null;
  const isInvalid = touched && error !== null;

  const stateClass = isValid ? 'field-valid' : isInvalid ? 'field-invalid' : '';

  return (
    <div className={`form-group ${stateClass}`}>
      {children}
      {/* Status icon */}
      {isValid && <span className="field-icon field-icon--valid">✓</span>}
      {isInvalid && <span className="field-icon field-icon--invalid">✗</span>}
      {/* Inline error */}
      {isInvalid && <span className="field-error">&gt; ERROR: {error}</span>}
      {/* Optional hint (e.g. "Any stream is eligible.") */}
      {hint && !isInvalid && <span className="form-hint">{hint}</span>}
      {/* Character counter */}
      {charCounter !== undefined && (
        <span className={`char-counter ${typeof value === 'string' && value.length > IDEA_MAX ? 'char-counter--over' : ''}`}>
          {typeof value === 'string' ? value.length : 0} / {IDEA_MAX} characters
        </span>
      )}
    </div>
  );
}


export default function RegisterForm() {
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [track, setTrack] = useState('');
  const [idea, setIdea] = useState('');
  const [members, setMembers] = useState([createEmptyMember(true)]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [validationErrors, setValidationErrors] = useState([]);
  const [visibleIndices, setVisibleIndices] = useState([0]);

  // ─── Touched / field-error state ───
  // Keys: "teamName", "teamSize", "track", "idea", "member.0.name", "member.0.email", etc.
  const [touched, setTouched] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);

  // Mark a field as touched and validate it
  const handleBlur = useCallback((key, value, opts) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const err = validateField(key.split('.').pop(), value, opts);
    setFieldErrors((prev) => ({ ...prev, [key]: err }));
  }, []);

  // Helper: get field state
  const getFieldState = (key) => ({
    touched: !!touched[key],
    error: fieldErrors[key] !== undefined ? fieldErrors[key] : undefined,
  });

  // Assert button text to prevent ₹1 regression
  useEffect(() => {
    const btnText = document.querySelector('button[type="submit"]')?.textContent || '';
    console.assert(!btnText.includes('₹1'), 'CRITICAL BUG: Button text contains placeholder ₹1 fee!');
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // When team size changes, adjust members array
  useEffect(() => {
    const size = parseInt(teamSize);
    if (!size || size < 2 || size > 4) return;

    setMembers((prev) => {
      const next = [...prev];
      if (next.length === 0) next.push(createEmptyMember(true));

      if (size > next.length) {
        for (let i = next.length; i < size; i++) {
          next.push(createEmptyMember(false));
        }
      } else if (size < next.length) {
        const indicesToRemove = [];
        for (let i = size; i < next.length; i++) {
          indicesToRemove.push(i);
        }
        setVisibleIndices((prev) => prev.filter((idx) => !indicesToRemove.includes(idx)));
        setTimeout(() => {
          setMembers((current) => current.slice(0, size));
        }, 300);
        return prev;
      }
      return next;
    });
  }, [teamSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleIndices(members.map((_, i) => i));
    }, 30);
    return () => clearTimeout(timer);
  }, [members.length]);

  const handleMemberChange = (index, field, value) => {
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    // Re-validate on change if already touched
    const key = `member.${index}.${field}`;
    if (touched[key]) {
      const err = validateField(field, value, { isLead: index === 0 });
      setFieldErrors((prev) => ({ ...prev, [key]: err }));
    }
    if (validationErrors.length) setValidationErrors([]);
  };

  // ─── Full-form validation for submit ───
  const runFullValidation = () => {
    const errors = [];
    const newTouched = {};
    const newFieldErrors = {};
    const size = parseInt(teamSize);

    // Team-level fields
    const teamFields = [
      { key: 'teamName', val: teamName },
      { key: 'teamSize', val: teamSize },
      { key: 'track', val: track },
      { key: 'idea', val: idea },
    ];
    teamFields.forEach(({ key, val }) => {
      newTouched[key] = true;
      const err = validateField(key, val);
      newFieldErrors[key] = err;
      if (err) errors.push(`${key === 'teamName' ? 'Team Name' : key === 'teamSize' ? 'Team Size' : key === 'track' ? 'Preferred Track' : 'Brief Idea'}: ${err}`);
    });

    if (!size) {
      setTouched((prev) => ({ ...prev, ...newTouched }));
      setFieldErrors((prev) => ({ ...prev, ...newFieldErrors }));
      return errors;
    }

    // Member fields
    const requiredMemberFields = ['name', 'email', 'yearOfStudy', 'branch'];
    members.slice(0, size).forEach((m, i) => {
      const label = i === 0 ? 'Team Lead (Member 01)' : `Member ${String(i + 1).padStart(2, '0')}`;
      requiredMemberFields.forEach((f) => {
        const key = `member.${i}.${f}`;
        newTouched[key] = true;
        const err = validateField(f, m[f], { isLead: i === 0 });
        newFieldErrors[key] = err;
        if (err) errors.push(`${label}: ${err}`);
      });
      // Phone for lead
      if (i === 0) {
        const phoneKey = `member.0.phone`;
        newTouched[phoneKey] = true;
        const phoneErr = validateField('phone', m.phone, { isLead: true });
        newFieldErrors[phoneKey] = phoneErr;
        if (phoneErr) errors.push(`${label} Phone: ${phoneErr}`);
      }
    });

    // Duplicate email check
    const emails = members.slice(0, size).map((m) => m.email.trim().toLowerCase());
    const seen = new Map();
    emails.forEach((email, i) => {
      if (!email) return;
      if (seen.has(email)) {
        const key = `member.${i}.email`;
        const dupErr = `Duplicate email detected.`;
        newFieldErrors[key] = dupErr;
        errors.push(`Member ${String(i + 1).padStart(2, '0')}: ${dupErr}`);
      } else {
        seen.set(email, i);
      }
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setFieldErrors((prev) => ({ ...prev, ...newFieldErrors }));
    return errors;
  };

  const scrollToFirstError = () => {
    if (!formRef.current) return;
    const firstInvalid = formRef.current.querySelector('.field-invalid .form-input, .field-invalid .form-select');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const errors = runFullValidation();
    if (errors.length > 0) {
      setValidationErrors(errors);
      // Allow state to render, then scroll
      setTimeout(scrollToFirstError, 100);
      return;
    }
    setValidationErrors([]);

    setLoading(true);

    const size = parseInt(teamSize);
    const payload = {
      team_name: teamName,
      team_size: size,
      preferred_track: track,
      brief_idea: idea,
      members: members.slice(0, size).map((m, i) => ({
        name: m.name,
        email: m.email,
        ...(i === 0 ? { phone: m.phone } : {}),
        year_of_study: m.yearOfStudy,
        branch: m.branch,
        gender: m.gender || '',
        is_lead: i === 0,
      })),
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to initialize registration.');

      const lead = members[0];
      const options = {
        key: data.keyId,
        amount: '29900', // ₹299
        currency: 'INR',
        name: 'HACK::MET 2026',
        description: 'Team Registration Fee',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId: data.registrationId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed.');

            setStatus({ type: 'success', message: 'Registration Successful! Confirmation email sent.' });
            setTeamName('');
            setTeamSize('');
            setTrack('');
            setIdea('');
            setMembers([createEmptyMember(true)]);
            setTouched({});
            setFieldErrors({});
          } catch (err) {
            setStatus({ type: 'error', message: err.message });
          }
        },
        prefill: {
          name: lead.name,
          email: lead.email,
          contact: lead.phone,
        },
        theme: {
          color: '#FF3B3B',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        setStatus({ type: 'error', message: 'Payment failed. Please try again.' });
      });
      rzp.open();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-section" id="register">
      <div className="section-label">08 / Register</div>
      <h2 className="section-title" style={{ color: 'var(--white)' }}>READY TO BUILD<br />SOMETHING LEGENDARY?</h2>
      <p style={{ fontSize: '12px', color: '#888888', marginTop: '16px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.8' }}>
        Fill in your team details below and we&apos;ll send the confirmation and onboarding kit to your email within 24 hours.
      </p>

      <form className="reg-form" onSubmit={handleRegister} noValidate ref={formRef}>
        {status.message && (
          <div style={{ padding: '12px', marginBottom: '16px', background: status.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 59, 59, 0.1)', color: status.type === 'success' ? '#4CAF50' : '#FF3B3B', border: `1px solid ${status.type === 'success' ? '#4CAF50' : '#FF3B3B'}`, fontFamily: "'Space Mono', monospace", fontSize: '11px', lineHeight: '1.6' }}>
            {status.message}
          </div>
        )}

        {validationErrors.length > 0 && (
          <div style={{ padding: '12px', marginBottom: '16px', background: 'rgba(255, 59, 59, 0.08)', border: '1px solid #FF3B3B', fontFamily: "'Space Mono', monospace", fontSize: '10px', lineHeight: '1.8', color: '#FF3B3B' }}>
            {validationErrors.map((err, i) => (
              <div key={i}>▶ {err}</div>
            ))}
          </div>
        )}

        {/* ── Team Info ── */}
        <div className="form-row">
          <ValidatedField fieldKey="teamName" value={teamName} touched={getFieldState("teamName").touched} error={getFieldState("teamName").error}>
            <label className="form-label">Team Name</label>
            <input
              className="form-input"
              type="text"
              required
              value={teamName}
              onChange={(e) => { setTeamName(e.target.value); if (touched['teamName']) { const err = validateField('teamName', e.target.value); setFieldErrors((p) => ({ ...p, teamName: err })); } }}
              onBlur={() => handleBlur('teamName', teamName)}
              placeholder="[ Team Pixel... ]"
            />
          </ValidatedField>
          <ValidatedField fieldKey="teamSize" value={teamSize} touched={getFieldState("teamSize").touched} error={getFieldState("teamSize").error}>
            <label className="form-label">Team Size</label>
            <select
              className="form-select"
              required
              value={teamSize}
              onChange={(e) => { setTeamSize(e.target.value); handleBlur('teamSize', e.target.value); }}
              onBlur={() => handleBlur('teamSize', teamSize)}
            >
              <option value="">▼ Select</option>
              <option value="2">2 Members</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
            </select>
          </ValidatedField>
        </div>

        {/* ── Dynamic Member Rows ── */}
        {members.map((member, index) => {
          const num = String(index + 1).padStart(2, '0');
          const isLead = index === 0;
          const isVisible = visibleIndices.includes(index);
          const mk = (f) => `member.${index}.${f}`;

          return (
            <div
              key={index}
              className={`member-row ${isVisible ? 'member-row--visible' : ''}`}
              style={{ borderTop: '1px solid #333' }}
            >
              {/* Member Badge */}
              <div className="member-badge">
                <span>&gt; MEMBER_{num}</span>
                {isLead && <span className="member-badge__lead"> :: TEAM LEAD</span>}
              </div>

              {/* Name + Email row */}
              <div className="form-row">
                <ValidatedField fieldKey={mk('name')} value={member.name} touched={getFieldState(mk('name')).touched} error={getFieldState(mk('name')).error}>
                  <label className="form-label">Member {num} Name</label>
                  <input
                    className="form-input"
                    type="text"
                    required
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    onBlur={() => handleBlur(mk('name'), member.name)}
                    placeholder={isLead ? '[ Your name... ]' : '[ Member name... ]'}
                  />
                </ValidatedField>
                <ValidatedField fieldKey={mk('email')} value={member.email} touched={getFieldState(mk('email')).touched} error={getFieldState(mk('email')).error}>
                  <label className="form-label">Member {num} Email</label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    value={member.email}
                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                    onBlur={() => handleBlur(mk('email'), member.email)}
                    placeholder={isLead ? '[ you@college.edu ]' : '[ member@college.edu ]'}
                  />
                </ValidatedField>
              </div>

              {/* Phone (lead only) + Year of Study row */}
              <div className="form-row">
                {isLead ? (
                  <ValidatedField fieldKey={mk('phone')} value={member.phone} touched={getFieldState(mk('phone')).touched} error={getFieldState(mk('phone')).error}>
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      value={member.phone}
                      onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                      onBlur={() => handleBlur(mk('phone'), member.phone, { isLead: true })}
                      placeholder="[ +91 XXXXXXXXXX ]"
                      pattern="^[+]?[0-9]{10,13}$"
                    />
                  </ValidatedField>
                ) : (
                  <ValidatedField fieldKey={mk('yearOfStudy')} value={member.yearOfStudy} touched={getFieldState(mk('yearOfStudy')).touched} error={getFieldState(mk('yearOfStudy')).error}>
                    <label className="form-label">Year of Study</label>
                    <select
                      className="form-select"
                      required
                      value={member.yearOfStudy}
                      onChange={(e) => { handleMemberChange(index, 'yearOfStudy', e.target.value); handleBlur(mk('yearOfStudy'), e.target.value); }}
                      onBlur={() => handleBlur(mk('yearOfStudy'), member.yearOfStudy)}
                    >
                      <option value="">▼ Select Year</option>
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>{y} Year</option>
                      ))}
                    </select>
                  </ValidatedField>
                )}
                {isLead ? (
                  <ValidatedField fieldKey={mk('yearOfStudy')} value={member.yearOfStudy} touched={getFieldState(mk('yearOfStudy')).touched} error={getFieldState(mk('yearOfStudy')).error}>
                    <label className="form-label">Year of Study</label>
                    <select
                      className="form-select"
                      required
                      value={member.yearOfStudy}
                      onChange={(e) => { handleMemberChange(index, 'yearOfStudy', e.target.value); handleBlur(mk('yearOfStudy'), e.target.value); }}
                      onBlur={() => handleBlur(mk('yearOfStudy'), member.yearOfStudy)}
                    >
                      <option value="">▼ Select Year</option>
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>{y} Year</option>
                      ))}
                    </select>
                  </ValidatedField>
                ) : (
                  <ValidatedField fieldKey={mk('branch')} value={member.branch} hint="Any stream is eligible." touched={getFieldState(mk('branch')).touched} error={getFieldState(mk('branch')).error}>
                    <label className="form-label">Branch / Department</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      value={member.branch}
                      onChange={(e) => handleMemberChange(index, 'branch', e.target.value)}
                      onBlur={() => handleBlur(mk('branch'), member.branch)}
                      placeholder="[ e.g., Computer Engineering, MBA, Pharmacy... ]"
                    />
                  </ValidatedField>
                )}
              </div>

              {/* Branch + Gender row for lead */}
              {isLead && (
                <div className="form-row">
                  <ValidatedField fieldKey={mk('branch')} value={member.branch} hint="Any stream is eligible." touched={getFieldState(mk('branch')).touched} error={getFieldState(mk('branch')).error}>
                    <label className="form-label">Branch / Department</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      value={member.branch}
                      onChange={(e) => handleMemberChange(index, 'branch', e.target.value)}
                      onBlur={() => handleBlur(mk('branch'), member.branch)}
                      placeholder="[ e.g., Computer Engineering, MBA, Pharmacy... ]"
                    />
                  </ValidatedField>
                  <div className="form-group">
                    <label className="form-label">Gender <span className="form-label--optional">(optional)</span></label>
                    <select
                      className="form-select"
                      value={member.gender}
                      onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                    >
                      <option value="">▼ Select</option>
                      {GENDER_OPTIONS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Gender row for non-lead members */}
              {!isLead && (
                <div className="form-group">
                  <label className="form-label">Gender <span className="form-label--optional">(optional)</span></label>
                  <select
                    className="form-select"
                    value={member.gender}
                    onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                  >
                    <option value="">▼ Select</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Track + Idea ── */}
        <div style={{ borderTop: '1px solid #333', paddingTop: '20px', marginTop: '4px' }}>
          <ValidatedField fieldKey="track" value={track} touched={getFieldState("track").touched} error={getFieldState("track").error}>
            <label className="form-label">Preferred Track</label>
            <select
              className="form-select"
              required
              value={track}
              onChange={(e) => { setTrack(e.target.value); handleBlur('track', e.target.value); }}
              onBlur={() => handleBlur('track', track)}
            >
              <option value="">▼ Select a track</option>
              <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
              <option value="Sustainability & Climate Tech">Sustainability &amp; Climate Tech</option>
              <option value="Health & MedTech">Health &amp; MedTech</option>
              <option value="FinTech & Blockchain">FinTech &amp; Blockchain</option>
              <option value="EdTech & Social Impact">EdTech &amp; Social Impact</option>
              <option value="Open Innovation">Open Innovation</option>
            </select>
          </ValidatedField>
          <ValidatedField fieldKey="idea" value={idea} charCounter touched={getFieldState("idea").touched} error={getFieldState("idea").error}>
            <label className="form-label">Area of Interest <span className="form-label--optional">(optional)</span></label>
            <textarea
              className="form-input"
              value={idea}
              onChange={(e) => { setIdea(e.target.value); if (touched['idea']) { const err = validateField('idea', e.target.value); setFieldErrors((p) => ({ ...p, idea: err })); } }}
              onBlur={() => handleBlur('idea', idea)}
              style={{ minHeight: '80px', resize: 'vertical' }}
              placeholder="[ e.g., Interested in AI for healthcare, or fintech for rural India... ]"
              maxLength={IDEA_MAX}
            ></textarea>
            <span style={{ display: 'block', marginTop: '8px', fontSize: '11px', fontFamily: "'Space Mono', monospace", color: '#666666' }}>
              &gt; NOTE: A detailed problem statement is required separately by 5 July 2026. This field helps us match you with relevant mentors.
            </span>
          </ValidatedField>
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading || status.type === 'success'}
          className="btn-primary"
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '10px',
            padding: '14px',
            opacity: loading ? 0.7 : 1,
            backgroundColor: status.type === 'success' ? '#4CAF50' : (status.type === 'error' ? '#FF3B3B' : undefined),
            color: (status.type === 'success' || status.type === 'error') ? '#FFFFFF' : undefined,
            borderColor: status.type === 'success' ? '#4CAF50' : (status.type === 'error' ? '#FF3B3B' : undefined)
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              [ PROCESSING... <span style={{ display: 'inline-block', width: '6px', height: '12px', background: 'currentColor', animation: 'blink 1s steps(1) infinite' }}></span> ]
            </span>
          ) : status.type === 'success' ? (
            '[ ✓ REGISTERED SUCCESSFULLY ]'
          ) : status.type === 'error' ? (
            '[ SUBMISSION FAILED — TRY AGAIN ]'
          ) : (
            '[ SUBMIT REGISTRATION — ₹299 / TEAM ]'
          )}
        </button>

        <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px', marginBottom: '16px' }}>
          Payment processed securely via Razorpay after form submission.
        </p>

        <p className="register-note">Secure payment via Razorpay · All participants receive confirmation within 24 hrs · Refund policy: 100% refund if event is cancelled</p>
      </form>
    </div>
  );
}
