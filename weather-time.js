document.querySelectorAll('input[name="city"]').forEach(radio => {
    radio.addEventListener("change", updateCityInfo);
});

function updateCityInfo() {
    // The id of the radio button is the city name
    const selectedCity = document.querySelector('input[name="city"]:checked').id;

    // TODO: Call the function to update the map image and address based on the selected city
    updateMap(selectedCity);

    // TODO: Call the function to update business hours for the selected city
    updateHours(selectedCity);

    // TODO: Fetch and display weather and time information for the selected city
    fetchWeatherAndTime(selectedCity);
};

function updateMap(city) {
    const mapImages = {
        city1: "images/map-city1.jpg",
        city2: "images/map-city2.jpg",
        city3: "images/map-city3.jpg"
    };

    const mapLinks = {
        city1: "https://www.google.com/maps/d/u/0/edit?mid=1yBXtKtaFSA9NB3iFDm4-64s1uQtFX4o&usp=sharing",
        city2: "https://www.google.com/maps/d/u/0/edit?mid=1Po55h8CN_k4vUWj1bfLOp2aQGLu-xig&usp=sharing",
        city3: "https://www.google.com/maps/d/u/0/edit?mid=1lK2m5hDNvv1Lnbfwk0_jm_eJhUbOjGw&usp=sharing"
    };

    const addresses = {
        city1: "123 Las Vegas Blvd, Las Vegas, NV",
        city2: "123 Tech Street, Orlando, FL",
        city3: "1234 Fifth Ave, New York, NY"
    };

    // TODO: Update the map image source, alt text, map link, and address label
    document.getElementById("map-image").src = mapImages[city];
    document.getElementById("map-image").alt = `Map of ${city}`;
    document.getElementById("map-link").href = mapLinks[city];
    document.getElementById("map-address").innerText = addresses[city];
};

function fetchWeatherAndTime(city) {
    const cityWeather = {
        city1: "https://api.open-meteo.com/v1/forecast?latitude=36.175&longitude=-115.1372&current=temperature_2m,weather_code,is_day&timezone=America%2FLos_Angeles&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch",
        city2: "https://api.open-meteo.com/v1/forecast?latitude=28.5383&longitude=-81.3792&current=temperature_2m,weather_code,is_day&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch",
        city3: "https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current=temperature_2m,weather_code,is_day&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    };
    const cityName = {
        city1: "Las Vegas",
        city2: "Orlando",
        city3: "New York"
    };
    const cityTimeZones = {
        city1: "America/Los_Angeles",
        city2: "America/New_York",
        city3: "America/New_York"
    };
    const apiUrl = cityWeather[city];
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const current = data.current;
            const temp = Math.round(current.temperature_2m);
            const weatherCode = current.weather_code;
            const timeZone = cityTimeZones[city];

            const localTime = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', hour12: true, timeZone: timeZone
            });
           
            document.getElementById("temperature").innerText = `Current Temp: ${temp}°F`;
            showImage("weather-icon", weatherCode, localTime);
            updatePatioStatus(temp, weatherCode);
            bistroStatus(localTime, city, cityName);      
        });

};

function updatePatioStatus(temp, weatherCode) {
    const patioElement = document.getElementById("patio-status");
    if(temp < 55 || temp > 95 || weatherCode >= 55) {
        patioElement.innerText = "Patio is CLOSED! ❌";
        patioElement.style.color = "red";
        patioElement.style.fontWeight = "bold";
    }
    else {
        patioElement.innerText = "Patio is OPEN! ✅";
        patioElement.style.color = "green";
        patioElement.style.fontWeight = "bold";
    }
};

// Determine Day/Night Icon
function showImage(elementID, weather_code, localTimeStr) {
    const [time, ampm] = localTimeStr.split(' ');
    const [hourStr] = time.split(':');
    let hour = parseInt(hourStr);
    
    // Convert to 24-hr format
    if (ampm === "PM" && hour !== 12) {
        hour += 12;
    }
    if (ampm === "AM" && hour === 12) {
        hour = 0;
    }
    const isDayTime = hour >= 6 && hour < 20;
    
    const weatherImages = {
        Clear: isDayTime ? "images/clear-day.png" : "images/clear-night.png",
        Cloudy: isDayTime ? "images/partly-cloudy-day.png" : "images/partly-cloudy-night.png",
        Rainy: isDayTime ? "images/rainy-day.png" : "images/rainy-night.png",
    }
    const img = document.getElementById("weather-icon");
    if(weather_code === 0) {
        img.src = weatherImages.Clear;
    }
    else if(weather_code > 0 && weather_code <= 48 ) {
        img.src = weatherImages.Cloudy;
    }
    else {
        img.src = weatherImages.Rainy;
    }
};

// TODO Update business hours based on the selected city
function updateHours(city) { 
    const openHours = {
        city1: "Open: Monday-Friday: 8am-5pm",
        city2: "Open: Tuesday-Saturday: 9am-4pm",
        city3: "Open: Wednesday-Sunday: 10am-6pm"
    }
    const closedHours = {
        city1: "Closed: Saturday-Sunday",
        city2: "Closed: Sunday-Monday",
        city3: "Closed: Monday-Tuesday"
    }

    document.getElementById("open").innerText = openHours[city];
    document.getElementById("closed").innerText = closedHours[city];
};

function bistroStatus(localTime, city, cityName) {
    if(localTime >= "08:00 AM" && localTime <= "05:00 PM" && city === "city1") {
        document.getElementById("localTime").innerText = ` ${cityName[city]} Local Time: ${localTime} - Bistro is OPEN! ✅`;
        document.getElementById("localTime").style.color = "green";
        document.getElementById("localTime").style.fontWeight = "bold"; 
    }
    else if(localTime >= "09:00 AM" && localTime <= "04:00 PM" && city === "city2") {
        document.getElementById("localTime").innerText = ` ${cityName[city]} Local Time: ${localTime} - Bistro is OPEN! ✅`;
        document.getElementById("localTime").style.color = "green";
        document.getElementById("localTime").style.fontWeight = "bold"; 
    }
    else if(localTime >= "10:00 AM" && localTime <= "06:00 PM" && city === "city3") {
        document.getElementById("localTime").innerText = ` ${cityName[city]} Local Time: ${localTime} - Bistro is OPEN! ✅`;
        document.getElementById("localTime").style.color = "green";
        document.getElementById("localTime").style.fontWeight = "bold"; 
    }
    else {
        document.getElementById("localTime").innerText = ` ${cityName[city]} Local Time: ${localTime} - Bistro is CLOSED! ❌`;
        document.getElementById("localTime").style.color = "red";
        document.getElementById("localTime").style.fontWeight = "bold"; 
    }
    
}