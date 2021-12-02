// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "ed7387a20844c306436a07a021e0b8b8";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            // if( weather.description === "clear sky"){backgroundImage(weather.description)}
            backgroundImage(weather.description)
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function backgroundImage(data){
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    switch (data) {
      case "clear sky":
            document.body.style.backgroundImage = "url(./icons/clear_sky.jpg)";
        break;
        case  "snow":
            document.body.style.backgroundImage = "url(./icons/snow.jpg)";
        break
        case "thunderstorm":
            document.body.style.backgroundImage = "url(./icons/thunderstorm.jpg)";
        break
        case "shower rain":
            document.body.style.backgroundImage = "url(./icons/shower rain.jpg)";
        break
        case "rain":
            document.body.style.backgroundImage = "url(./icons/rain.jpg)";
        break


        case "few clouds":
            document.body.style.backgroundImage = "url(./icons/few cloud.jpg)";
        break
        case "broken clouds":
            document.body.style.backgroundImage = "url(./icons/broken clouds.jpg)";
        break
        case "Clouds":
            document.body.style.backgroundImage = "url(./icons/broken clouds.jpg)";
        break




        case "mist":
            document.body.style.backgroundImage = "url(./icons/mist.jpg)";
        break
        case "scattered clouds":
            document.body.style.backgroundImage = "url(./icons/scattered clouds.jpg)";
        break
      default:
      console.log('error')
    }
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
