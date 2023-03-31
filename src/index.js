let apiKey = "o2ae200bf1666aet3874ee9af35b0d33";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Hamilton&key=o2ae200bf1666aet3874ee9af35b0d33`;
axios.get(apiUrl).then(showTemperature);
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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
          ${day}
          <br />
          <img src="" id="weather" alt="" width="100px" height="100px" />
          <br />
          <span class="forecast-temp">12</span>°
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast() {
  let apiKey = "o2ae200bf1666aet3874ee9af35b0d33";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metrics`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector(".number");
  fahrenheitElement.innerHTML = `${temperature}` * 1.8 + 32;
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector(".number");
  celsiusElement.innerHTML = `${temperature}`;
}

// Feature #1
let dateElement = document.querySelector("#Day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

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
  temperature = Math.round(response.data.temperature.current);
  let dateChange = document.querySelector("#Day");
  dateChange.innerHTML = `${formatDate()}`;
  let degrees = document.querySelector(".number");
  degrees.innerHTML = `${temperature}`;
  let weatherElement = document.querySelector("#weather");
  weatherElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherElement.setAttribute("alt", response.data.condition.description);

  let descriptionElement = document.querySelector(".card-body");
  descriptionElement.innerHTML = response.data.condition.description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = `o2ae200bf1666aet3874ee9af35b0d33`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=o2ae200bf1666aet3874ee9af35b0d33&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
