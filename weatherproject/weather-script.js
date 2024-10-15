function initializeAutocomplete() {
    const input = document.getElementById('cityInput');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'], // Only show cities in the suggestions
        // Optional: restrict suggestions to the US
        // componentRestrictions: { country: "us" } 
    });

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        console.log(place); // Log place details to see what was selected
    });
}

document.getElementById('getWeatherButton').addEventListener('click', function() {
    const cityNameOrZip = document.getElementById('cityInput').value;
    const apiKey = '47ef0e1f06b0010b4e3e855d5fb8a1cd'; // Your API key

    if (cityNameOrZip === '') {
        document.getElementById('errorMessage').textContent = 'Please enter a city or zip code!';
        return; // Exit the function if no input is entered
    }

    // Clear any previous error message
    document.getElementById('errorMessage').textContent = '';
    
    // Show the loading spinner
    document.getElementById('loading').style.display = 'block';

    // Determine if input is numeric (zip code) or alphabetic (city name)
    const isZipCode = /^\d+$/.test(cityNameOrZip);

    // API URLs based on input type
    const weatherUrl = isZipCode 
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${cityNameOrZip},us&appid=${apiKey}&units=imperial` 
    : `https://api.openweathermap.org/data/2.5/weather?q=${cityNameOrZip}&appid=${apiKey}&units=imperial`;

    const forecastUrl = isZipCode
    ? `https://api.openweathermap.org/data/2.5/forecast?zip=${cityNameOrZip},us&appid=${apiKey}&units=imperial`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameOrZip}&appid=${apiKey}&units=imperial`;

    // Fetch current weather
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(currentWeather => {
            // Display current weather
            document.getElementById('location').textContent = `Location: ${currentWeather.name}`;
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°F`;
            document.getElementById('conditions').textContent = `Conditions: ${currentWeather.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${currentWeather.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${currentWeather.wind.speed} m/s`;
            document.getElementById('weatherIcon').src = `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;

            // Fetch the 5-day / 3-hour forecast
            return fetch(forecastUrl);
            })
            .then(response => response.json())
            .then(forecastData => {
                // Extract and display the 3-hourly forecast in Fahrenheit
                const forecastResults = forecastData.list.map(forecast => {
                    const date = new Date(forecast.dt * 1000).toLocaleDateString(); // Format date
                    const temp = `${forecast.main.temp.toFixed(2)}°F`; // Temperature in Fahrenheit
                    const description = forecast.weather[0].description; // Weather description
                    const iconCode = forecast.weather[0].icon; // Weather icon code
                    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Construct icon URL

                    return `
                        <div class="forecast-item">
                            <img src="${iconUrl}" class="weather-icon" alt="${description}">
                            <div>${date}</div>
                            <div>${temp}</div>
                            <div>${description}</div>
                        </div>
                    `;
                }).join('');
                
                document.getElementById('eightDayForecastList').innerHTML = forecastResults;
            });
        })