document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

document.querySelector('.weather-info p').textContent = "🌡️ Temp: 32°C | 🌥️ Partly Cloudy";

const ctx = document.getElementById('forecastChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: '°C',
      data: [32, 31, 30, 28, 29, 30, 31],
      backgroundColor: 'rgba(0, 201, 255, 0.2)',
      borderColor: '#00c9ff',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: false }
    }
  }
});
