import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Briefcase, Loader2 } from 'lucide-react';
import { useUserContext } from '../context/UserContext';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading } = useUserContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundUser = users.find(u => u.id.toString() === id);
      setUser(foundUser);
    }
  }, [id, users, loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--accent-color)" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff4d4d' }}>User not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ marginTop: '1rem', display: 'inline-flex' }}
        >
          <ArrowLeft size={18} /> Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <button 
        onClick={() => navigate('/')} 
        className="btn btn-secondary"
        style={{ marginBottom: '2rem', display: 'inline-flex' }}
      >
        <ArrowLeft size={18} /> Back to Directory
      </button>

      <div className="glass" style={{ padding: '2.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'var(--accent-color)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000'
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>{user.name}</h1>
            <p style={{ color: 'var(--text-dim)', margin: '5px 0 0 0' }}>@{user.username || user.name.toLowerCase().replace(' ', '')}</p>
          </div>
        </div>

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="detail-section">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
              <Mail size={20} /> Contact Information
            </h3>
            <p><span style={{ color: 'var(--text-dim)' }}>Email:</span> {user.email}</p>
            <p><span style={{ color: 'var(--text-dim)' }}>Phone:</span> {user.phone}</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={16} color="var(--text-dim)" />
              <a href={`http://${user.website}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>{user.website}</a>
            </p>
          </div>

          <div className="detail-section">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
              <Briefcase size={20} /> Company
            </h3>
            <p><span style={{ color: 'var(--text-dim)' }}>Name:</span> {user.company.name}</p>
            <p><span style={{ color: 'var(--text-dim)' }}>Catch Phrase:</span> {user.company.catchPhrase}</p>
            <p><span style={{ color: 'var(--text-dim)' }}>Scope:</span> {user.company.bs}</p>
          </div>

          <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
              <MapPin size={20} /> Address
            </h3>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
