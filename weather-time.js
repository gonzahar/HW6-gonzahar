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
}

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
}

function fetchWeatherAndTime(city) {
    const apiUrl = weatherApiuRLS[city];
    fetch(aprUrl)
        .then(response => response.json())
        .then(data => {
            const current = data.current;
            const temp = Math.round(current.temperature_2m);
            const weatherCode = current.weatherCode;
            const timeZone = current.timeZone;

            const locatTime = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', hour12: true, timeZone: timeZone
            });
           
            document.getElementById("temperature").innerText = `${temp}°F`;
            showImage("weather-icon", weatherCode, localTime);
            updatePatioStatus(temp, weatherCode);
        });
}

function updatePatioStatus(temp, weatherCode) {
    const patioElement = document.getElementById("patio-status");
    if(temp < 55 || temp > 95 || weatherCode >= 55) {
        patioElement.innerText = "Patio is CLOSED!";
        patioElement.style.color = "red";
    }
    else {
        patioElement.innerText = "Patio is OPEN!";
        patioElement.style.color = "green";
    }
}

// Determine Day/Night Icon
function showImage(elementID, weatherCode, localTimeStr) {
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
        PartlyCloudy: isDayTime ? "images/partly-cloudy-day.png" : "images/partly-cloudy-night.png",
        Rainy: isDayTime ? "images/rainy-day.png" : "images/rainy-night.png",
    }
    // const img = //  LOCATION OF YOUR IMAGE
    // img.src = // CHANGE YOUR WEATHER IMAGE
}