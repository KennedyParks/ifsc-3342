// First, create an array of climbing spots with their corresponding location IDs and weather URLs
const climbingSpots = [
    { name: "Sam's Throne", locationId: "sams-throne", weatherUrl: "https://api.openweathermap.org/data/2.5/weather?q=Marble%20Falls,AR&appid=YOUR_API_KEY" },
    { name: "Horseshoe Canyon Ranch", locationId: "horseshoe-canyon-ranch", weatherUrl: "https://api.openweathermap.org/data/2.5/weather?q=Jasper,AR&appid=YOUR_API_KEY" },
    { name: "Mt. Magazine", locationId: "mt-magazine", weatherUrl: "https://api.openweathermap.org/data/2.5/weather?q=Paris,AR&appid=YOUR_API_KEY" }
  ];
  
  // Iterate through the climbingSpots array and create a dropdown menu for each spot
  climbingSpots.forEach(spot => {
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
  
    const weatherData = document.createElement("div");
    weatherData.className = "weather-data";
    
    const weatherText = document.createElement("p");
    weatherData.appendChild(weatherText);
  
    dropdownMenu.appendChild(weatherData);
    document.getElementById(spot.locationId).appendChild(dropdownMenu);
  
    // Fetch the weather data for the spot using the OpenWeatherMap API
    fetch(spot.weatherUrl)
      .then(response => response.json())
      .then(data => {
        const weather = data.weather[0].description;
        const temp = Math.round((data.main.temp - 273.15) * 9/5 + 32); // Convert from Kelvin to Fahrenheit
        weatherText.innerText = `Weather: ${weather} | Temperature: ${temp}°F`;
      })
      .catch(error => {
        console.error(`Error fetching weather data for ${spot.name}: ${error}`);
        weatherText.innerText = "Unable to fetch weather data";
      });
  
    // Add event listener to show/hide dropdown menu when spot is clicked
    document.getElementById(spot.locationId).addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });
  });
  