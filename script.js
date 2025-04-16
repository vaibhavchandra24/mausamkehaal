const apiKey = "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";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    // Step 1: Get coordinates from city name
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      alert("City not found!");
      return;
    }

    const { lat, lon } = geoData[0];

    // Step 2: Get 16-day forecast data
    const forecastRes = await fetch(
      `https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastRes.json();

    // Step 3: Display forecast cards
    forecastData.list.forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      const desc = day.weather[0].description;
      const tempDay = day.temp.day;
      const tempNight = day.temp.night;

      const card = document.createElement("div");
      card.classList.add("forecast-card");

      card.innerHTML = `
        <h4>${date}</h4>
        <img src="${icon}" alt="${desc}" />
        <p><strong>${desc}</strong></p>
        <p>🌞 Day: ${tempDay}°C</p>
        <p>🌙 Night: ${tempNight}°C</p>
      `;

      forecastContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    alert("Something went wrong while fetching weather data.");
  }
}
const apiKey = "c23f9ab1bfb19be4e7726728c1bc45fc";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
  const geoData = await geoRes.json();
  if (!geoData[0]) return alert("City not found");

  const { lat, lon } = geoData[0];

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
  );

  const data = await res.json();
  displayWeather(data);
}

function displayWeather(data) {
  const container = document.getElementById("weatherInfo");
  container.innerHTML = "";

  data.daily.slice(0, 8).forEach(day => {
    const date = new Date(day.dt * 1000);
    const card = document.createElement("div");
    card.className = "weather-card fade-in";
    card.innerHTML = `
      <h3>${date.toDateString()}</h3>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon" />
      <p>${day.weather[0].main}</p>
      <p>Temp: ${day.temp.day}°C</p>
      <p>Humidity: ${day.humidity}%</p>
    `;
    container.appendChild(card);
  });
}