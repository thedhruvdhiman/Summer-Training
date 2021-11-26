const api = {
  key: "ed7387a20844c306436a07a021e0b8b8",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  console.log(weather)
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  backgroundImage(weather.weather[0].description)
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
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