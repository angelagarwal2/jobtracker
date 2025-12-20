import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ logout, theme, toggleTheme }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="brand-font" style={{ fontSize: '1.8rem', fontWeight: '700' }}>
        JobLog.
      </div>

      <div className="nav-links">
        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>Dashboard</Link>
        <Link to="/stats" className={`nav-item ${isActive('/stats')}`}>Stats</Link>
        <Link to="/profile" className={`nav-item ${isActive('/profile')}`}>Profile</Link>

        {/* Theme Toggle Button (SVG) */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none', border: '1px solid #ddd', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--olive-dark)'
          }}
        >
          {theme === 'light' ? (
            // Moon Icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            // Sun Icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          )}
        </button>

        <button 
          onClick={logout} 
          style={{
            background: 'transparent', border: '1px solid var(--text-muted)', 
            padding: '8px 24px', borderRadius: '4px', cursor: 'pointer',
            fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem'
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;