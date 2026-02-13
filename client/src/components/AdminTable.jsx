const AdminTable = ({ entries, onDelete, onRefresh }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreClass = (percentage) => {
    if (percentage <= 30) return 'score-low';
    if (percentage <= 60) return 'score-medium';
    if (percentage <= 85) return 'score-high';
    return 'score-perfect';
  };

  return (
    <div className="admin-table-container">
      <div className="table-header">
        <h2>All Submissions</h2>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="no-data">
          <p>No submissions yet</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name 1</th>
                <th>Name 2</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{entry.name1}</td>
                  <td>{entry.name2}</td>
                  <td>
                    <span className={`score-badge ${getScoreClass(entry.percentage)}`}>
                      {entry.percentage}%
                    </span>
                  </td>
                  <td>{formatDate(entry.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => onDelete(entry._id)}
                      className="delete-btn"
                      title="Delete entry"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
