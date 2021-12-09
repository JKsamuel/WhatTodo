/**
 * Title: Weather.js
 * Author: Jongeun Kim
 * Number: 000826393
 * Date: Dec 9, 2021
 * Reference web page: 1. https://openweathermap.org/api
 *                     2. https://openweathermap.org/current
 *                     3. https://stackoverflow.com/questions/6193574/save-javascript-objects-in-sessionstorage
 *                     4. https://www.w3schools.com/html/html5_geolocation.asp
 *                     5. https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude
 *                     6. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
 *                     7. https://en.wikipedia.org/wiki/List_of_HTTP_status_codes    
 * Purpose: Display current weather information of user's location.
 */

window.addEventListener("load", function(){

    


    // Get API keys: https://home.openweathermap.org/api_keys
    const API_KEY = "d4b9bf43f48db80788c5152008165b74";                          

    // Select Element
    // Weather conditions: https://openweathermap.org/weather-conditions
    const iconSelect = document.querySelector(".weather__icon");
    const Weather__description = document.querySelector(".weather__description");
    const weather__temperature = document.querySelector(".weather__temperature");
    const Weather__location = document.querySelector(".weather__location");
    const Weather__humidity = document.querySelector(".weather__humidity");
    const WeatherShowing = document.querySelector("section.weather");
    
    // Save a location as a coordinate using sessionStorage.
    // Keyname: "coords"
    // keyvalue: coordinates(lat, lon) as JSON string
    function saveCoord(coordObj) {
        // JSON.stringify() method converts a JSON object to a JSON string
        // setItem() method returns string, So I used JSON.stringify() method.
        // Reference: 1. Module 4 Guide from prof.Sam Scott
        //            2. https://stackoverflow.com/questions/6193574/save-javascript-objects-in-sessionstorage
        sessionStorage.setItem("coords", JSON.stringify(coordObj));
    }
    
    // Reference: https://www.w3schools.com/html/html5_geolocation.asp
    function handleGeoSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordObj = { latitude, longitude };
        saveCoord(coordObj);
        getWeather(latitude, longitude);
    }
    
    // Display Error msg
    function handleGeoError() {
        iconSelect.setAttribute("src", "icons/unknown.png");
        Weather__description.innerText = `???`;
        weather__temperature.innerText = "-℃";
        Weather__location.innerText = "Some where";
        Weather__humidity.innerText = "I have no idea";
    }
    
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude
    function getGeolocation() {
        // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, {
            enableHighAccuracy: true                        // enableHighAccuracy: is a boolean value, if set true and if the device is able to provide a more accurate position,
        });                                                 // it will do so.
    }
    
    // Fetching the API using Ajax fetch() method
    function getWeather(lat, lon) {
        let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang={en}`;
    
        fetch(WEATHER_URL)  // When I put {credentials: 'include'} as a second parameter in fetch() method, then it doesn't work. I am still trying to figure out why.
            .then(response => response.json())
            .then(function (json) {
                const description = json.weather[0].description;
                const icon = json.weather[0].icon;
                const temperature = json.main.temp;
                const currentLocation = json.name;
                const humidity = json.main.humidity;
                const errorCode = json.cod;     // internal parameter
                // Reference: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (errorCode === "401") {          // 401: Unauthorized 
                    handleGeoError();
                } else {
                    iconSelect.setAttribute("src", `icons/${icon}.png`);
                    Weather__description.innerText = `${description}`;
                    weather__temperature.innerText = `${temperature.toFixed(1)}℃`;
                    Weather__location.innerText = `${currentLocation}`;
                    Weather__humidity.innerText = `${humidity}%`;
                }
            });
    }
    
    function loadCoord() {
        const loadedCoords = sessionStorage.getItem("coords");
        if (loadedCoords === null) {
            getGeolocation();
        } else {
            const parsedCoords = JSON.parse(loadedCoords);
            getWeather(parsedCoords.latitude, parsedCoords.longitude);
        }
    }

    // Activate weather section on the Application
    loadCoord();
})