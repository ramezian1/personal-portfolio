<<<<<<< HEAD
<<<<<<< HEAD
document.getElementById('getWeatherButton').addEventListener('click', function() {
    const cityName = document.getElementById('cityInput').value;
    const apiKey = '47ef0e1f06b0010b4e3e855d5fb8a1cd'; // Your API key

    if (cityName === '') {
        document.getElementById('errorMessage').textContent = 'Please enter a city or zip code!';
        return; // Exit the function if no city is entered
=======
=======
>>>>>>> ab4e306b708f222243130463e3be3211da759347
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
<<<<<<< HEAD
>>>>>>> e413bfc490e85e95caea74200e167dc1f7014d49
=======
>>>>>>> ab4e306b708f222243130463e3be3211da759347
    }

    // Clear any previous error message
    document.getElementById('errorMessage').textContent = '';
    
    // Show the loading spinner
    document.getElementById('loading').style.display = 'block';

<<<<<<< HEAD
<<<<<<< HEAD
    // Fetch the current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
=======
=======
>>>>>>> ab4e306b708f222243130463e3be3211da759347
    // Determine if input is numeric (zip code) or alphabetic (city name)
    const isZipCode = /^\d+$/.test(cityNameOrZip);

    // API URLs based on input type
    const weatherUrl = isZipCode 
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${cityNameOrZip},us&appid=${apiKey}&units=imperial` 
    : `https://api.openweathermap.org/data/2.5/weather?q=${cityNameOrZip}&appid=${apiKey}&units=imperial`;

    const forecastUrl = isZipCode
    ? `https://api.openweathermap.org/data/2.5/forecast?zip=${cityNameOrZip},us&appid=${apiKey}&units=imperial`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameOrZip}&appid=${apiKey}&units=imperial`;
<<<<<<< HEAD
>>>>>>> e413bfc490e85e95caea74200e167dc1f7014d49
=======
>>>>>>> ab4e306b708f222243130463e3be3211da759347

    // Fetch current weather
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
<<<<<<< HEAD
<<<<<<< HEAD
                throw new Error('City not found');
=======
                throw new Error('Location not found');
>>>>>>> e413bfc490e85e95caea74200e167dc1f7014d49
=======
                throw new Error('Location not found');
>>>>>>> ab4e306b708f222243130463e3be3211da759347
            }
            return response.json();
        })
        .then(currentWeather => {
            // Display current weather
            document.getElementById('location').textContent = `Location: ${currentWeather.name}`;
<<<<<<< HEAD
<<<<<<< HEAD
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°C`;
=======
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°F`;
>>>>>>> e413bfc490e85e95caea74200e167dc1f7014d49
=======
            document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°F`;
>>>>>>> ab4e306b708f222243130463e3be3211da759347
            document.getElementById('conditions').textContent = `Conditions: ${currentWeather.weather[0].description}`;
            document.getElementById('humidity').textContent = `Humidity: ${currentWeather.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${currentWeather.wind.speed} m/s`;
            document.getElementById('weatherIcon').src = `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;

            // Fetch the 5-day / 3-hour forecast
            return fetch(forecastUrl);
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> ab4e306b708f222243130463e3be3211da759347
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
<<<<<<< HEAD
        })
>>>>>>> e413bfc490e85e95caea74200e167dc1f7014d49
=======
        })
>>>>>>> ab4e306b708f222243130463e3be3211da759347
