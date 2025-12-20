import React, { useState } from 'react';
import Navbar from './Navbar';

const Profile = ({ token, logout, theme, toggleTheme }) => {
  // 1. Get real data from LocalStorage
  const savedEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const savedName = localStorage.getItem('userName') || 'JobLog Member';
  const savedRole = localStorage.getItem('userRole') || 'Open to Work';

  // Create initials
  const initials = savedEmail.substring(0, 2).toUpperCase();

  const [isEditing, setIsEditing] = useState(false);
  
  // 2. Initialize State
  const [userData, setUserData] = useState({
    name: savedName,
    email: savedEmail,
    role: savedRole
  });

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userRole', userData.role);
    alert("Profile updated successfully!");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-cream)' }}>
      <Navbar logout={logout} theme={theme} toggleTheme={toggleTheme} />
      
      {/* ADDED CONTRAST: Slightly darker background for this section */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', background: theme === 'light' ? '#F2F0E6' : 'var(--bg-main)' }}>
        
        {/* WIDER CARD & STRONGER SHADOW */}
        <div className="card" style={{ 
          width: '100%', 
          maxWidth: '750px', /* Increased Width */
          padding: '0', 
          overflow: 'hidden', 
          position: 'relative',
          backgroundColor: theme === 'light' ? '#FFFFFF' : 'var(--bg-card)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)', /* Pop Effect */
          border: '1px solid var(--border-color)'
        }}>
          
          {/* HEADER BANNER */}
          <div style={{ height: '160px', background: 'linear-gradient(135deg, var(--olive-dark) 0%, var(--olive-light) 100%)' }}></div>

          {/* AVATAR */}
          <div style={{ 
            position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
            width: '110px', height: '110px', borderRadius: '50%',
            background: 'var(--bg-white)', padding: '5px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              width: '100%', height: '100%', borderRadius: '50%', 
              background: '#F3F4F6', color: 'var(--olive-dark)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.4rem', fontFamily: 'Playfair Display', fontWeight: '700'
            }}>
              {initials}
            </div>
          </div>

          {/* PROFILE CONTENT */}
          <div style={{ padding: '70px 50px 50px 50px', textAlign: 'center' }}>
            
            {/* Name & Role */}
            <h2 style={{ fontSize: '2rem', margin: '0 0 5px 0' }}>{userData.name}</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 15px 0', fontSize: '1.1rem' }}>{userData.role}</p>
            
            <span style={{ 
              display: 'inline-block', padding: '6px 16px', borderRadius: '20px', 
              background: 'rgba(75, 83, 32, 0.1)', color: 'var(--olive-dark)', 
              fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase'
            }}>
              Active Member
            </span>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '35px 0' }} />

            {/* DETAILS FORM */}
            <div style={{ textAlign: 'left', display: 'grid', gap: '25px', maxWidth: '500px', margin: '0 auto' }}>
              
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Full Name
                </label>
                {isEditing ? (
                  <input value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} style={{ margin: 0 }} />
                ) : (
                  <div style={{ fontSize: '1.1rem', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>{userData.name}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Email Address
                </label>
                {isEditing ? (
                  <input value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} style={{ margin: 0 }} />
                ) : (
                  <div style={{ fontSize: '1.1rem', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>{userData.email}</div>
                )}
              </div>

              {/* Target Role */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Target Role
                </label>
                {isEditing ? (
                  <input value={userData.role} onChange={e => setUserData({...userData, role: e.target.value})} style={{ margin: 0 }} />
                ) : (
                  <div style={{ fontSize: '1.1rem', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>{userData.role}</div>
                )}
              </div>

            </div>

            {/* BUTTONS */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
              {isEditing ? (
                <>
                  <button className="btn-primary" onClick={handleSave} style={{ width: 'auto', padding: '12px 30px' }}>Save Changes</button>
                  <button className="btn-outline" onClick={() => setIsEditing(false)} style={{ width: 'auto', padding: '12px 30px', borderColor: '#ccc', color: '#666' }}>Cancel</button>
                </>
              ) : (
                <button className="btn-primary" onClick={() => setIsEditing(true)} style={{ width: '100%', maxWidth: '300px' }}>Edit Profile</button>
              )}
            </div>

            {!isEditing && (
               <button 
                 className="btn-link" 
                 style={{ marginTop: '25px', color: '#e74c3c', fontSize: '0.85rem' }}
                 onClick={() => confirm("Are you sure? This action is permanent.") && alert("Account deletion requested.")}
               >
                 Delete Account
               </button>
            )}

          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 JobLog Inc. Designed with Elegance.
      </footer>
    </div>
  );
};

export default Profile;