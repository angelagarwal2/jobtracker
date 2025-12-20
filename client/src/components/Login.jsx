import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://job-tracker-api-negi.onrender.com/login', { email, password });
      if (res.data.status === 'ok') {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        
        // --- THE FIX: Save the email to use in Profile ---
        localStorage.setItem('userEmail', email); 
        
        navigate('/dashboard');
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      alert("Server connection failed");
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

          <h1 style={{ marginBottom: '10px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Please sign in to continue</p>

          <form onSubmit={handleLogin}>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button className="btn-primary w-full" type="submit">Enter</button>
          </form>
          
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn-link" style={{ justifyContent: 'center' }} onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              New here? <button className="btn-link" style={{ fontWeight: 'bold', color: 'var(--olive-dark)' }} onClick={() => navigate('/signup')}>Create an Account</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">© 2025 JobLog Inc. Designed with Elegance.</footer>
    </div>
  );
};

export default Login;