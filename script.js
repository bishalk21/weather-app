const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");

const weatherImg = document.getElementById("weather-img");
const temperature = document.getElementById("temp");
const description = document.getElementById("status");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const locNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

const key = "4748e17639e0331e43f64ee25de15c79";

inputBox.addEventListener("keypress", function (e) {
  //   console.log(e.target.value);
  if (e.key === "Enter") {
    e.preventDefault();
    searchWeather(e.target.value);
  }
});

searchBtn.addEventListener("click", function () {
  //   console.log(inputBox.value);
  searchWeather(inputBox.value);
});

async function searchWeather(city) {
  let weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  fetch(weather_api)
    .then((response) => response.json())
    .then((weather_data) => {
      console.log(weather_data);

      if (weather_data.cod === "404") {
        locNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
      } else {
        locNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML = `${
          Math.round((weather_data.main.temp - 273.15) * 10) / 10
        }<sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind.innerHTML = `${
          Math.round(((weather_data.wind.speed * 3600) / 1000) * 10) / 10
        }Km/H`;
      }

      switch (weather_data.weather[0].main) {
        case "Clouds":
          weatherImg.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHa_S6GtWxPvee00Io7eRC8EK1NZMBHjBtA&usqp=CAU";
          break;
        case "Clear":
          weatherImg.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhS-Sxtvs6RgluWQeMJAJczvVdSRvBzQLLhQ&usqp=CAU";
          break;
        case "Rain":
          image.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT0LywqHFYIt4Z4lAkSQLzACeRiVVGk2F9_g&usqp=CAU";
          break;
        case "Mist":
          image.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzl53X8dXYVyuMLdmaZSmxRyIUlKJ91gGWQg&usqp=CAU";
          break;
        case "Snow":
          image.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgaHw9vgbMvieQvU3KIyjTORC6ADBaIGgV9w&usqp=CAU";
          break;
      }
    });
}
