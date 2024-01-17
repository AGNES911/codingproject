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
  console.log(response.data);
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