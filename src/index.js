function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "o2ae200bf1666aet3874ee9af35b0d33";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Hamilton&key=o2ae200bf1666aet3874ee9af35b0d33`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.wind.speed);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 4;
}

// Feature #1
let dateElement = document.querySelector("#Day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Current weather update
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordSearch = document.querySelector("h2");
  coordSearch.innerHTML = `Currently based on your ${latitude} and your ${longitude}`;
  let apiKey = `o2ae200bf1666aet3874ee9af35b0d33`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Hamilton&key=o2ae200bf1666aet3874ee9af35b0d33`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Search Weather update

function searchWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  searchCity(cityInput.value);
  let titleChange = document.querySelector("h2");
  titleChange.innerHTML = ` Currently in ${cityInput.value}`;
}
let searchBox = document.querySelector("#search-form");
searchBox.addEventListener("submit", searchWeather);

// Weather API call

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let dateChange = document.querySelector("#Day");
  dateChange.innerHTML = `${formatDate()}`;
  let degrees = document.querySelector(".number");
  degrees.innerHTML = `${temperature}`;
  let weatherElement = document.querySelector("#weather");
  weatherElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherElement.setAttribute{
    "alt", response.data.condition.description};
  }
  let descriptionElement = document.querySelector(".card-body");
  descriptionElement.innerHTML = response.data.condition.description;
}

function searchCity(city) {
  let apiKey = `o2ae200bf1666aet3874ee9af35b0d33`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=o2ae200bf1666aet3874ee9af35b0d33&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
