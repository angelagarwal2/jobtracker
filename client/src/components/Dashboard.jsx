import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = ({ token, logout, theme, toggleTheme }) => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const [formData, setFormData] = useState({ 
    company: '', position: '', notes: '', interviewDate: '', status: 'Applied' 
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const axiosJWT = axios.create({ headers: { Authorization: token } });

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await axiosJWT.get('https://job-tracker-api-negi.onrender.com/jobs');
      setJobs(res.data);
    } catch (error) { console.error(error); }
  };

  const addJob = async (e) => {
    e.preventDefault();
    await axiosJWT.post('https://job-tracker-api-negi.onrender.com/jobs', formData);
    setFormData({ company: '', position: '', notes: '', interviewDate: '', status: 'Applied' });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    if(!confirm("Delete this application?")) return;
    await axiosJWT.delete(`https://job-tracker-api-negi.onrender.com/jobs/${id}`);
    fetchJobs();
  };

  const startEdit = (job) => { setEditingId(job._id); setEditForm(job); };
  
  const saveEdit = async () => {
    await axiosJWT.put(`https://job-tracker-api-negi.onrender.com/jobs/${editingId}`, editForm);
    setEditingId(null); fetchJobs();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'All' ? true : job.status === filter;
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar logout={logout} theme={theme} toggleTheme={toggleTheme} />

      <div className="container" style={{ flex: 1 }}>
        <div className="dashboard-grid">
          
          {/* LEFT: Sidebar Form */}
          <div className="sidebar-form">
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.4rem' }}>Add New Role</h3>
            <form onSubmit={addJob}>
              <label>COMPANY</label>
              <input placeholder="e.g. Google" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
              <label>POSITION</label>
              <input placeholder="e.g. Senior Developer" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} required />
              <label>STATUS</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <label>INTERVIEW DATE (Optional)</label>
              <input type="date" value={formData.interviewDate} onChange={e => setFormData({...formData, interviewDate: e.target.value})} />
              <label>NOTES</label>
              <input placeholder="Referral, salary range..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
              <button className="btn-primary" style={{marginTop:'10px'}}>ADD APPLICATION</button>
            </form>
          </div>

          {/* RIGHT: Main Content */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setFilter(status)}
                    style={{
                      padding: '8px 16px', borderRadius: '20px', border: 'none',
                      background: filter === status ? 'var(--olive-dark)' : 'var(--bg-white)',
                      color: filter === status ? 'white' : 'var(--text-muted)',
                      boxShadow: filter !== status ? 'inset 0 0 0 1px #ddd' : 'none',
                      cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div style={{ position: 'relative', width: '250px' }}>
                <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input placeholder="Search roles..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', margin: 0, paddingLeft: '35px', borderRadius: '30px', border: '1px solid #ddd' }} />
              </div>
            </div>

            {filteredJobs.length === 0 ? <div style={{textAlign:'center', padding:'40px', color:'var(--text-muted)', border:'1px dashed #ddd', borderRadius:'8px'}}>No applications found.</div> : null}

            {filteredJobs.map(job => (
              <div key={job._id} className="job-card">
                 {editingId === job._id ? (
                   // Edit Mode
                   <div style={{width:'100%', display:'flex', gap:'15px', flexDirection:'column'}}>
                      <h4 style={{margin:0, color:'var(--olive-dark)'}}>Editing Role</h4>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                        <div><label>Company</label><input value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} /></div>
                        <div><label>Position</label><input value={editForm.position} onChange={e => setEditForm({...editForm, position: e.target.value})} /></div>
                        <div><label>Status</label><select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})}><option value="Applied">Applied</option><option value="Interviewing">Interviewing</option><option value="Offer">Offer</option><option value="Rejected">Rejected</option></select></div>
                        <div><label>Notes</label><input value={editForm.notes} onChange={e => setEditForm({...editForm, notes: e.target.value})} /></div>
                      </div>
                      <div style={{display:'flex', gap:'10px'}}>
                         <button className="btn-primary" onClick={saveEdit} style={{width:'auto', padding:'8px 24px'}}>Save Changes</button>
                         <button className="btn-outline" onClick={() => setEditingId(null)} style={{width:'auto', padding:'8px 24px', border:'1px solid #ccc', color:'#666'}}>Cancel</button>
                      </div>
                   </div>
                 ) : (
                   // View Mode
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width:'100%' }}>
                     <div>
                       <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem' }}>{job.company}</h3>
                       <p style={{ margin: '0 0 10px 0', fontWeight: '500', color: 'var(--text-main)' }}>{job.position}</p>
                       <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '15px' }}>
                          {job.interviewDate && <span style={{display:'flex', alignItems:'center', gap:'5px'}}>🗓️ {new Date(job.interviewDate).toLocaleDateString()}</span>}
                          {job.notes && <span>📝 {job.notes}</span>}
                       </div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                       <span className="status-badge" style={{background: job.status === 'Offer' ? '#d4edda' : job.status === 'Rejected' ? '#f8d7da' : 'rgba(70, 78, 46, 0.1)', color: job.status === 'Offer' ? '#155724' : job.status === 'Rejected' ? '#721c24' : 'var(--olive-dark)'}}>{job.status}</span>
                       <div style={{display:'flex', gap:'8px'}}>
                         <button onClick={() => startEdit(job)} style={{background:'none', border:'1px solid #eee', borderRadius:'4px', cursor:'pointer', color:'#666', padding:'6px'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                         <button onClick={() => deleteJob(job._id)} style={{background:'none', border:'1px solid #fee', borderRadius:'4px', cursor:'pointer', color:'#d9534f', padding:'6px'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 JobLog Inc. Designed with Elegance.
      </footer>
    </div>
  );
};

export default Dashboard;