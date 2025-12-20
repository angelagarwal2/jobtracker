import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* NAVBAR */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="brand-font" style={{ fontSize: '1.8rem', fontWeight: '700' }}>
          JobLog.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Toggle Button */}
          <button onClick={toggleTheme} style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-main)' }}>
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>

          <button className="btn-outline" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: '1.1' }}>
          Your Career Journey,<br />
          <span style={{ fontStyle: 'italic', color: 'var(--olive-light)' }}>Organized.</span>
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '50px', lineHeight: '1.6' }}>
          Stop using messy spreadsheets. JobLog is the professional, serene way 
          to track your applications, interviews, and offers in one place.
        </p>

        {/* Removed width:100% via CSS change, now it will size to text */}
        <button className="btn-primary" onClick={() => navigate('/signup')} style={{ padding: '16px 48px', fontSize: '1.1rem' }}>
          Start Tracking for Free
        </button>
      </header>

      <footer className="footer">
        © 2025 JobLog Inc. Designed with Elegance.
      </footer>
    </div>
  );
};

export default LandingPage;