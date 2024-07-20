const apiKey = 'ef5b96d4f76eff5b651ed4cd933e200b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again.');
        });
}

function displayWeatherData(data) {
    const weatherInfo = document.querySelector('.weather-info');
    const weatherIcon = document.querySelector('.weather-icon');
    
    document.getElementById('location').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    
    const weatherCondition = data.weather[0].main.toLowerCase();
    if (weatherCondition.includes('clear')) {
        weatherIcon.textContent = '☀️';
    } else if (weatherCondition.includes('cloud')) {
        weatherIcon.textContent = '☁️';
    } else if (weatherCondition.includes('rain')) {
        weatherIcon.textContent = '🌧️';
    } else if (weatherCondition.includes('snow')) {
        weatherIcon.textContent = '❄️';
    } else {
        weatherIcon.textContent = '🌤️';
    }
    
    weatherInfo.style.display = 'block';
    setTimeout(() => {
        weatherInfo.classList.add('show');
    }, 10);
}