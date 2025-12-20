import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ theme, toggleTheme }) => {
  const [formData, setFormData] = useState({ email: '', password: '', securityQuestion: '', securityAnswer: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://job-tracker-api-negi.onrender.com/register', formData);
      if (res.data.status === 'ok') {
        alert("Account created! Please Login.");
        navigate('/login');
      } else {
        alert("Error: " + res.data.error);
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Minimal Navbar */}
      <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-main)' }}>
           {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="center-screen">
        <div className="auth-card">
          <div style={{ textAlign: 'left', marginBottom: '30px' }}>
            <button className="btn-link" onClick={() => navigate('/')}>← Back to Home</button>
          </div>

          <h2 style={{ marginBottom: '30px' }}>Create Account</h2>
          <form onSubmit={handleSignup}>
            <input placeholder="Email Address" onChange={e => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Create Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
            
            <div style={{ textAlign: 'left', marginBottom: '10px' }}>
               <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Security Question (For Recovery)</label>
            </div>
            <select onChange={e => setFormData({...formData, securityQuestion: e.target.value})} required>
              <option value="">Select a Question...</option>
              <option value="pet">What is your first pet's name?</option>
              <option value="city">What city were you born in?</option>
              <option value="mother">What is your mother's maiden name?</option>
            </select>
            <input placeholder="Your Answer" onChange={e => setFormData({...formData, securityAnswer: e.target.value})} required />

            <button className="btn-primary w-full" type="submit">Sign Up</button>
          </form>
          
          <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an account? <button className="btn-link" style={{ fontWeight: 'bold', color: 'var(--olive-dark)' }} onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>

      <footer className="footer">© 2025 JobLog Inc. Designed with Elegance.</footer>
    </div>
  );
};

export default Signup;