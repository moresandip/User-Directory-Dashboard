import React from 'react';
import { Mail, Phone, Briefcase, ChevronRight, Edit3, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(user);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  };

  return (
    <div 
      className="user-card glass fade-in" 
      onClick={() => navigate(`/user/${user.id}`)}
    >
      <button className="delete-btn" onClick={handleDeleteClick} title="Delete User">
        <Trash2 size={18} />
      </button>
      <button className="edit-btn" onClick={handleEditClick} title="Edit User">
        <Edit3 size={18} />
      </button>
      
      <h3>{user.name}</h3>
      <div className="user-info-row">
        <Mail size={16} />
        <span>{user.email}</span>
      </div>
      <div className="user-info-row">
        <Phone size={16} />
        <span>{user.phone}</span>
      </div>
      <div className="user-info-row">
        <Briefcase size={16} />
        <span>{user.company.name}</span>
      </div>
      
      <div style={{ position: 'absolute', right: '1.5rem', bottom: '1.5rem', color: 'var(--accent-color)' }}>
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default UserCard;
