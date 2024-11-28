document.getElementById('getWeatherButton').addEventListener('click', function() {
    const cityNameOrZip = document.getElementById('cityInput').value;
    const apiKey = '47ef0e1f06b0010b4e3e855d5fb8a1cd'; // Your API key

    if (cityNameOrZip === '') {
        document.getElementById('errorMessage').textContent = 'Please enter a city or zip code!';
        return; // Exit the function if no city is entered
    }

    // Clear any previous error message
    document.getElementById('errorMessage').textContent = '';
    
    // Show the loading spinner
    document.getElementById('loading').style.display = 'block';

    // Fetch the current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(currentWeather => {
            // Display current weather
            document.getElementById('location').textContent = `Location: ${currentWeather.name}`;
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°C`;
            document.getElementById('conditions').textContent = `Conditions: ${currentWeather.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${currentWeather.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${currentWeather.wind.speed} m/s`;
            document.getElementById('weatherIcon').src = `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;

            // Fetch the 5-day / 3-hour forecast
            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(forecastData => {
            // Extract and display the 3-hourly forecast
            const forecastResults = forecastData.list.map(forecast => `
                <li>
                    ${new Date(forecast.dt * 1000).toLocaleString()}: ${forecast.main.temp}°C, ${forecast.weather[0].description}
                </li>
            `).join('');
            document.getElementById('eightDayForecastList').innerHTML = forecastResults;
        })
        .catch(error => {
            // Display the error message if something goes wrong
            document.getElementById('errorMessage').textContent = `Error: ${error.message}`;
        })
        .finally(() => {
            // Hide the loading spinner once everything is done
            document.getElementById('loading').style.display = 'none';
        });
});
