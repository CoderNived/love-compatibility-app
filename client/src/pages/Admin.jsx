import { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import StatsChart from '../components/StatsChart';
import AdminLogin from '../components/AdminLogin';

const Admin = () => {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Check if already logged in (password in sessionStorage)
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setAdminPassword(savedPassword);
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && adminPassword) {
      fetchData();
    }
  }, [isAuthenticated, adminPassword]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch entries with admin password in headers
      const entriesRes = await fetch(`${import.meta.env.VITE_API_URL}/api/love`, {
        headers: {
          'x-admin-password': adminPassword
        }
      });

      // Fetch stats
      const statsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/love/stats`, {
        headers: {
          'x-admin-password': adminPassword
        }
      });

      if (entriesRes.status === 401 || statsRes.status === 401) {
        // Wrong password
        alert('Invalid admin password!');
        handleLogout();
        return;
      }

      const entriesData = await entriesRes.json();
      const statsData = await statsRes.json();

      if (entriesData.success) {
        setEntries(entriesData.data);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/love/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword
        }
      });

      const data = await response.json();

      if (data.success) {
        fetchData(); // Refresh data
      } else {
        alert('Failed to delete entry');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete entry');
    }
  };

  const handleLogin = (password) => {
    setAdminPassword(password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminPassword');
    setIsAuthenticated(false);
    setAdminPassword('');
    setEntries([]);
    setStats(null);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Show loading
  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="loader-content">
            <div className="spinner"></div>
            <h3>Loading Dashboard...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="admin-title">📊 Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="action-btn reset-btn"
            style={{ margin: 0 }}
          >
            🚪 Logout
          </button>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Submissions</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💯</div>
              <div className="stat-value">{stats.avgPercentage}%</div>
              <div className="stat-label">Average Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🕐</div>
              <div className="stat-value">{stats.recentCount}</div>
              <div className="stat-label">Last 24 Hours</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">
                {stats.topScores.length > 0 ? stats.topScores[0].percentage : 0}%
              </div>
              <div className="stat-label">Highest Score</div>
            </div>
          </div>
        )}

        {stats && <StatsChart stats={stats} />}

        <AdminTable entries={entries} onDelete={handleDelete} onRefresh={fetchData} />
      </div>
    </div>
  );
};

export default Admin;