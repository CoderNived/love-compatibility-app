import { useState } from 'react';
import LoveForm from '../components/LoveForm';
import ResultCard from '../components/ResultCard';

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (name1, name2) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/love`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name1, name2 }),
      });

      const data = await response.json();

      if (data.success) {
        // Simulate calculation delay for effect
        setTimeout(() => {
          setResult(data.data);
          setLoading(false);
        }, 2000);
      } else {
        alert(data.error || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to calculate. Please try again.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="home-page">
      <div className="floating-hearts">
        <div className="heart">❤️</div>
        <div className="heart">💕</div>
        <div className="heart">💖</div>
        <div className="heart">💗</div>
        <div className="heart">💓</div>
        <div className="heart">💝</div>
      </div>

      <div className="home-container">
        <div className="hero-section">
          <h1 className="hero-title">
            💘 Love Compatibility Analyzer 💘
          </h1>
          <p className="hero-subtitle">
            Discover your romantic compatibility percentage
          </p>
        </div>

        {!result && !loading && <LoveForm onCalculate={handleCalculate} />}
        
        {loading && (
          <div className="glass-card loader-card">
            <div className="loader-content">
              <div className="spinner"></div>
              <h3>Calculating Love Compatibility...</h3>
              <p>Analyzing cosmic connections ✨</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <ResultCard result={result} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Home;
