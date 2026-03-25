const apiKey = '614af4846a84b80a96e8cd9189f92bbc';

const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const forecastContainer = document.querySelector('#forecast');

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=Escazu,CR&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Escazu,CR&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    // CURRENT WEATHER
    const currentResponse = await fetch(currentUrl);
    const currentData = await currentResponse.json();

    currentTemp.textContent = `${Math.round(currentData.main.temp)}°C`;
    weatherDesc.textContent = capitalize(currentData.weather[0].description);

    // FORECAST
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    displayForecast(forecastData.list);

  } catch (error) {
    currentTemp.textContent = 'Unavailable';
    weatherDesc.textContent = 'Error loading weather';
    console.error('Weather error:', error);
  }
}

function displayForecast(list) {
  forecastContainer.innerHTML = '';

  const filtered = list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  filtered.forEach(day => {
    const card = document.createElement('p');

    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    card.textContent = `${dayName}: ${Math.round(day.main.temp)}°C`;

    forecastContainer.appendChild(card);
  });
}


function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

getWeather();
