import { useState } from 'react';

const LoveForm = ({ onCalculate }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names');
      return;
    }

    onCalculate(name1.trim(), name2.trim());
  };

  return (
    <div className="glass-card form-card">
      <h2 className="form-title">Enter Two Names</h2>
      <form onSubmit={handleSubmit} className="love-form">
        <div className="input-group">
          <label htmlFor="name1">First Name</label>
          <input
            type="text"
            id="name1"
            placeholder="Enter first name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            maxLength="50"
            className="form-input"
          />
        </div>

        <div className="heart-divider">💕</div>

        <div className="input-group">
          <label htmlFor="name2">Second Name</label>
          <input
            type="text"
            id="name2"
            placeholder="Enter second name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            maxLength="50"
            className="form-input"
          />
        </div>

        <button type="submit" className="calculate-btn">
          💘 Calculate Love 💘
        </button>
      </form>
    </div>
  );
};

export default LoveForm;
