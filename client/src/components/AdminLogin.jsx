import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter password');
      return;
    }

    // Store password in sessionStorage (clears when browser closes)
    sessionStorage.setItem('adminPassword', password);
    onLogin(password);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="glass-card form-card" style={{ maxWidth: '400px', margin: '100px auto' }}>
          <h2 className="form-title">🔐 Admin Login</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0.9 }}>
            Enter admin password to continue
          </p>
          
          <form onSubmit={handleSubmit} className="love-form">
            <div className="input-group">
              <label htmlFor="password">Admin Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="form-input"
                autoFocus
              />
            </div>

            {error && (
              <p style={{ color: '#ff6b9d', textAlign: 'center', marginTop: '0.5rem' }}>
                {error}
              </p>
            )}

            <button type="submit" className="calculate-btn">
              🔓 Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;