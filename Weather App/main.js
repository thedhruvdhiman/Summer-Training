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
  redirectingFunc(weather.weather[0].description)
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

function redirectingFunc(info){
  if(info === 'overcast clouds' || info === 'broken clouds' || info === 'scattered clouds' || info === 'few clouds' || info === 'Clouds'){
    backgroundImage('Clouds')
  }
  if(info === 'thunderstorm with light rain' || info === 'thunderstorm with rain' || info === 'thunderstorm with heavy rain' || info === 'light thunderstorm' || info === 'thunderstorm' || info === 'heavy thunderstorm' || info === 'ragged thunderstorm' || info === 'thunderstorm with light drizzle' || info === 'thunderstorm with drizzle' || info === 'thunderstorm with heavy drizzle'){
    backgroundImage('Thunderstorm')
  }
  if (info === 'light intensity drizzle' || info === 'drizzle' || info === 'heavy intensity drizzle' || info === 'light intensity drizzle rain' || info === 'drizzle rain' || info === 'heavy intensity drizzle rain' || info === 'shower rain and drizzle' || info === 'heavy shower rain and drizzle' || info === 'shower drizzle') {
    backgroundImage('Drizzle')
  }
  if(info === 'light rain' ||info ===  'moderate rain' || info === 'heavy intensity rain' ||info ===  'very heavy rain' || info === 'extreme rain' ||info === 'freezing rain' || info ===    'light intensity shower rain' || info ==='shower rain' ||info === 'heavy intensity shower rain' || info ==='ragged shower rain'){
    backgroundImage('Rain')
  }
  if (info === 'light snow'||info === 'Snow'||info === 'Heavy snow'||info === 'Sleet'||info === 'Light shower sleet'||   info === 'Light sleet'||info === 'Light rain and snow'||info === 'Rain and snow'||info === 'Light shower snow'||info === 'Shower snow'||info === 'Heavy shower snow') {
    backgroundImage('Snow')
  }
  if (info === 'clear sky') {
    backgroundImage('Clouds')
  }
}

function backgroundImage(data){
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  switch (data) {
    case "Clouds":
        document.body.style.backgroundImage = "url(./icons/broken_clouds.jpg)";
      break
    case "Thunderstorm":
        document.body.style.backgroundImage = "url(./icons/thunderstorm.jpg)";
      break
    case "Drizzle":
        document.body.style.backgroundImage = "url(./icons/drizzle.jpg)";
      break
      case "Rain":
        document.body.style.backgroundImage = "url(./icons/rain.jpg)";
    break
    case  "Snow":
          document.body.style.backgroundImage = "url(./icons/snow.jpg)";
      break
    case "Clear":
    document.body.style.backgroundImage = "url(./icons/clear_sky.jpg)";
      break
    default:
    console.log('error')
  }
}
