function updatewaether(response) {
  let tempElement = document.querySelector("#temp");
  let temp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}"class="emoji">`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "8400d24aba831a8003c9oa48b04ft300";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updatewaether);
}
function handlesearchsubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-button");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handlesearchsubmit);
searchCity("Lisbon");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "8400d24aba831a8003c9oa48b04ft300";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  response.data.daily.forEach(function (dayv87b) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
      <div class="forecast-day">${formatDay(day.time)}</div>
        <div class="icon">
            <img
          src="${day.condition.icon_url}" class="icon"/>
        </div>
        <div class="Temperature-max-min">
        <span class="temp-max">${Math.round(
          day.temperature.maximum
        )}°</span>  <span class="temp-min">${Math.round(
        day.temperature.minimum
      )}°</span>
        </div>
        </div>
        </div>
        `;
  });
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
