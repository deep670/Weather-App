const apiKey = "YOUR_API_KEY_HERE"; 
// Example: const apiKey = "a8b9c123456789...";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            // Update Text
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".description").innerHTML = data.weather[0].description;

            // Update Icon
            // OpenWeatherMap provides icon codes (e.g., 10d, 01n)
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            // Change Background based on Weather ID
            // Weather IDs: https://openweathermap.org/weather-conditions
            const weatherId = data.weather[0].id;
            const body = document.body;

            // Reset classes
            body.className = "";

            if (weatherId >= 200 && weatherId < 300) { body.classList.add("rain"); } // Thunderstorm
            else if (weatherId >= 300 && weatherId < 600) { body.classList.add("rain"); } // Drizzle/Rain
            else if (weatherId >= 600 && weatherId < 700) { body.classList.add("rain"); } // Snow
            else if (weatherId >= 700 && weatherId < 800) { body.classList.add("mist"); } // Atmosphere (Mist, Fog)
            else if (weatherId == 800) { 
                // Check if it's day or night (icon ends with 'n' is night)
                if(iconCode.endsWith('n')) body.classList.add("night");
                else body.classList.add("clear"); 
            } 
            else if (weatherId > 800) { body.classList.add("clouds"); } // Clouds

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Allow pressing "Enter" key
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});