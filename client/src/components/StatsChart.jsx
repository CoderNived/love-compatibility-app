import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StatsChart = ({ stats }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !stats) return;

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Prepare data from distribution
    const labels = ['Just Friends (0-30%)', 'Potential (31-60%)', 'Great Match (61-85%)', 'Soulmates (86-100%)'];
    const data = [0, 0, 0, 0];

    stats.distribution.forEach((bucket) => {
      if (bucket._id === 0) data[0] = bucket.count;
      else if (bucket._id === 31) data[1] = bucket.count;
      else if (bucket._id === 61) data[2] = bucket.count;
      else if (bucket._id === 86) data[3] = bucket.count;
    });

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Compatibility Distribution',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff',
              font: {
                size: 12
              },
              padding: 15
            }
          },
          title: {
            display: true,
            text: 'Love Score Distribution',
            color: '#fff',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: 20
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stats]);

  return (
    <div className="chart-container glass-card">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StatsChart;
