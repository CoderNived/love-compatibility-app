import { useEffect, useState } from 'react';

const ResultCard = ({ result, onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti for high scores
    if (result.percentage > 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [result]);

  const getCompatibilityMessage = (percentage) => {
    if (percentage <= 30) return { text: "Just friends? 🤷‍♀️", emoji: "😅" };
    if (percentage <= 60) return { text: "Potential! 🌱", emoji: "🌟" };
    if (percentage <= 85) return { text: "Great match ❤️", emoji: "😍" };
    return { text: "Soulmates 💍", emoji: "🥰" };
  };

  const compatibility = getCompatibilityMessage(result.percentage);

  const copyResult = () => {
    const text = `${result.name1} ❤️ ${result.name2}\nLove Compatibility: ${result.percentage}%\n${compatibility.text}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#ff6b9d', '#c06c84', '#f67280', '#ffa07a'][Math.floor(Math.random() * 4)]
            }}></div>
          ))}
        </div>
      )}

      <div className="glass-card result-card">
        <div className="result-emoji">{compatibility.emoji}</div>
        
        <h2 className="result-names">
          {result.name1} <span className="heart-icon">❤️</span> {result.name2}
        </h2>

        <div className="percentage-container">
          <svg className="percentage-ring" width="200" height="200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="10"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - result.percentage / 100)}`}
              transform="rotate(-90 100 100)"
              className="percentage-progress"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff6b9d', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c06c84', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
          <div className="percentage-text">
            <span className="percentage-number">{result.percentage}</span>
            <span className="percentage-symbol">%</span>
          </div>
        </div>

        <h3 className="compatibility-message">{compatibility.text}</h3>

        <div className="result-actions">
          <button onClick={copyResult} className="action-btn copy-btn">
            📋 Copy Result
          </button>
          <button onClick={onReset} className="action-btn reset-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultCard;
