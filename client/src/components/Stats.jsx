import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Stats = ({ token, logout, theme, toggleTheme }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://job-tracker-api-negi.onrender.com/jobs', { headers: { Authorization: token } });
        setJobs(res.data);
      } catch (error) { console.error(error); }
    };
    fetchJobs();
  }, [token]);

  // ... (Stats Logic stays same) ...
  const total = jobs.length;
  const interviewing = jobs.filter(j => j.status === 'Interviewing').length;
  const offers = jobs.filter(j => j.status === 'Offer').length;
  const rejected = jobs.filter(j => j.status === 'Rejected').length;
  const applied = jobs.filter(j => j.status === 'Applied').length;
  const interviewRate = total > 0 ? ((interviewing + offers) / total * 100).toFixed(0) : 0;
  const successRate = total > 0 ? (offers / total * 100).toFixed(1) : 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar logout={logout} theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container" style={{ flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Your Career Insights</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tracking your progress is the first step to landing the role.</p>
        </div>

        {/* TOP METRICS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          <StatCard title="Total Applications" value={total} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>} subtext="Keep pushing!" />
          <StatCard title="Interview Rate" value={`${interviewRate}%`} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>} subtext="Apps converting to interviews" highlight />
          <StatCard title="Current Offers" value={offers} icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>} subtext="Jobs secured" color="var(--olive-dark)" />
        </div>

        {/* BOTTOM SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'stretch' }}>
          <div className="card" style={{ padding: '35px' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.3rem', marginBottom: '25px' }}>Funnel Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ProgressBar label="Applied" value={applied} total={total} color="#666" />
              <ProgressBar label="Interviewing" value={interviewing} total={total} color="#C5A059" />
              <ProgressBar label="Offers" value={offers} total={total} color="#4B5320" />
              <ProgressBar label="Rejected" value={rejected} total={total} color="#d9534f" />
            </div>
          </div>
          <div className="card" style={{ padding: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.3rem' }}>Success Rate</h3>
            <div style={{ position: 'relative', width: '160px', height: '160px', margin: '30px 0' }}>
               <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--olive-dark)" strokeWidth="3" strokeDasharray={`${successRate}, 100`} />
               </svg>
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem', fontWeight: 'bold', color: 'var(--olive-dark)' }}>{successRate}%</div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>of applications resulted in an offer.</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 JobLog Inc. Designed with Elegance.
      </footer>
    </div>
  );
};

const StatCard = ({ title, value, icon, subtext, highlight, color }) => (
  <div className="card" style={{ padding: '30px', borderTop: highlight ? '4px solid var(--gold-accent)' : '1px solid var(--border-color)' }}>
    <div style={{ color: 'var(--olive-dark)', marginBottom: '15px' }}>{icon}</div>
    <h2 style={{ margin: '0 0 5px 0', fontSize: '2.5rem', color: color || 'var(--text-main)' }}>{value}</h2>
    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1.1rem' }}>{title}</div>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '5px' }}>{subtext}</div>
  </div>
);

const ProgressBar = ({ label, value, total, color }) => {
  const percent = total > 0 ? (value / total * 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '500' }}>
        <span>{label}</span><span style={{ fontWeight: 'bold' }}>{value}</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
      </div>
    </div>
  );
};

export default Stats;