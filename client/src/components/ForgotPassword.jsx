import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const checkEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/get-security-question', { email });
      if (res.data.status === 'ok') {
        setQuestion(res.data.question);
        setStep(2);
      } else {
        alert("Email not found");
      }
    } catch (err) {
      alert("Error finding account");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/reset-password', { email, answer, newPassword });
      if (res.data.status === 'ok') {
        alert("Password Reset Successful! Please Login.");
        navigate('/login');
      } else {
        alert("Error: " + res.data.error);
      }
    } catch (err) {
      alert("Reset failed");
    }
  };

  return (
    <div className="center-screen">
      <div className="auth-card">
         {/* Back Button */}
         <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <button 
            className="link-btn" 
            onClick={() => navigate('/login')}
            style={{ fontSize: '0.9rem', color: '#999', margin: 0 }}
          >
            ← Back to Login
          </button>
        </div>

        <h2>Recovery</h2>
        {step === 1 ? (
          <form onSubmit={checkEmail}>
            <input placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required />
            <button className="btn">Next</button>
          </form>
        ) : (
          <form onSubmit={resetPassword}>
            <p style={{marginBottom:'15px', fontWeight:'bold'}}>
              {question === 'pet' ? "First pet's name?" : question === 'city' ? "Birth city?" : "Mother's maiden name?"}
            </p>
            <input placeholder="Your Answer" onChange={e => setAnswer(e.target.value)} required />
            <input type="password" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} required />
            <button className="btn">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;