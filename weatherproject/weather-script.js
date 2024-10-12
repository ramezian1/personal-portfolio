document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const cityName = document.getElementById('cityInput').value; // Ensure the ID matches your HTML
    const apiKey = '47ef0e1f06b0010b4e3e855d5fb8a1cd'; // Replace with your actual API key

    // Get the city coordinates
    const cityUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    fetch(cityUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found'); // Handle errors (e.g., city not found)
            }
            return response.json();
        })
        .then(cityData => {
            // Fetch the 3-hour forecast
            const hourlyUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
            return fetch(hourlyUrl);
        })
        .then(response => {
            return response.json();
        })
        .then(hourlyData => {
            // Extract and display the 3-hourly forecast for the next 5 days
            const hourlyResults = hourlyData.list.map(forecast => `
                <p>${new Date(forecast.dt * 1000).toLocaleString()}: ${forecast.main.temp}°C, ${forecast.weather[0].description}</p>
            `).join('');
            document.getElementById('hourly-result').innerHTML = `
                <h2>3-Hourly Forecast for ${hourlyData.city.name}</h2>
                ${hourlyResults}
            `;
            
            // Fetch the 8-day forecast using the coordinates from the initial city request
            const lat = hourlyData.city.coord.lat; // Use the coordinates from the hourly data
            const lon = hourlyData.city.coord.lon;
            const dailyUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=hourly,minutely`;

            return fetch(dailyUrl);
        })
        .then(response => {
            return response.json();
        })
        .then(dailyData => {
            // Extract and display the 8-day forecast
            const dailyResults = dailyData.daily.map(forecast => `
                <p>${new Date(forecast.dt * 1000).toLocaleDateString()}: ${forecast.temp.day}°C, ${forecast.weather[0].description}</p>
            `).join('');
            document.getElementById('daily-result').innerHTML = `
                <h2>8-Day Forecast</h2>
                ${dailyResults}
            `;
        })
        .catch(error => {
            document.getElementById('hourly-result').innerHTML = `<p>Error: ${error.message}</p>`;
            document.getElementById('daily-result').innerHTML = ''; // Clear daily results if there's an error
        });
});

// Initialize Google Places Autocomplete
function initMap() {
    const input = document.getElementById('cityInput'); // Ensure this matches the input field ID
    const autocomplete = new google.maps.places.Autocomplete(input);
  
    // Listener for when a place is selected
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
            // Handle selected place (e.g., fetch weather data)
            console.log('Selected place:', place);
            const cityName = place.name; // Get the city name
            getWeatherData(cityName); // Call your function to get weather data
        }
    });
}

// Function to fetch weather data (not needed as a separate function, 
