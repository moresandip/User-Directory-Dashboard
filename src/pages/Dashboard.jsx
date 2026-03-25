import React, { useState } from 'react';
import UserCard from '../components/UserCard';
import { Search, Loader2, Plus, X } from 'lucide-react';
import { useUserContext } from '../context/UserContext';

const Dashboard = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useUserContext();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // null means create mode
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: ''
  });

  const openModal = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        companyName: user.company.name
      });
    } else {
      setCurrentUser(null);
      setFormData({ name: '', email: '', phone: '', companyName: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      // Edit mode
      updateUser({
        ...currentUser,
        ...formData,
        company: { ...currentUser.company, name: formData.companyName }
      });
    } else {
      // Create mode
      const newUser = {
        id: Date.now(),
        ...formData,
        company: { name: formData.companyName, catchPhrase: '', bs: '' },
        address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '0', lng: '0' } },
        website: 'example.com'
      };
      addUser(newUser);
    }
    closeModal();
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = sortBy === 'name' ? a.name : a.company.name;
    let bVal = sortBy === 'name' ? b.name : b.company.name;
    
    if (sortOrder === 'asc') return aVal.localeCompare(bVal);
    return bVal.localeCompare(aVal);
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--accent-color)" />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', textAlign: 'center' }}>
        User Directory <span style={{ color: 'var(--accent-color)' }}>Dashboards</span>
      </h1>

      <div className="create-btn-wrapper">
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={20} /> Create User
        </button>
      </div>

      <div className="controls-container glass" style={{ padding: '1rem' }}>
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="sort-wrapper">
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Sort by:</span>
          <select 
            className="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
          <select 
            className="sort-select" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="user-grid">
        {sortedUsers.map(user => (
          <UserCard key={user.id} user={user} onEdit={openModal} onDelete={deleteUser} />
        ))}
      </div>
      
      {sortedUsers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
          No users found matching your search.
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button 
              className="edit-btn" 
              style={{ top: '1rem', right: '1rem' }} 
              onClick={closeModal}
            >
              <X size={20} />
            </button>
            <h3>{currentUser ? 'Edit User' : 'Create New User'}</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  className="form-input" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  name="companyName" 
                  className="form-input" 
                  value={formData.companyName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {currentUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
