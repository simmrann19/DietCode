import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import FleetMap from '../components/FleetMap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) setError(err);
    else navigate('/', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-visual-map">
          <FleetMap trips={[]} vehicles={[]} drivers={[]} />
        </div>
        <h2 className="login-visual-title">Fleet intelligence,<br />in real time.</h2>
        <p className="login-visual-desc">
          Track vehicles, manage trips, and monitor your entire logistics operation from one command center.
        </p>
        <svg className="login-visual-truck" width="200" height="100" viewBox="0 0 120 60" fill="none">
          <rect x="8" y="22" width="52" height="22" rx="4" fill="rgba(252,112,17,0.3)" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M60 28h28l8 16H60V28z" fill="rgba(252,112,17,0.2)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="24" cy="48" r="6" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="84" cy="48" r="6" stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
              <path d="M5 17h1l2-8h8l2 8h1"/>
              <circle cx="7.5" cy="17.5" r="2.5"/>
              <circle cx="16.5" cy="17.5" r="2.5"/>
            </svg>
          </div>
          <h1 className="login-title">TransitOps</h1>
          <p className="login-subtitle">Fleet Management Dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@transitops.in" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <div className="form-error form-error-block">{error}</div>}
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
        <p className="login-hint">Demo: admin@transitops.in / admin123</p>
      </div>
    </div>
  );
}
