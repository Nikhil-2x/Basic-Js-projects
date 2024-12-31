
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector("#city-input");
  const getWeatherbtn = document.querySelector("#get-weather-btn");
  const weatherInfo = document.querySelector("#weather-info");
  const cityNameDisplay = document.querySelector("#city-name");
  const temperatureDisplay = document.querySelector("#temperature");
  const descriptionDisplay = document.querySelector("#description");
  const errorMessage = document.querySelector("#error-message");

  // IMPORTANT: Replace 'your_actual_api_key' with your OpenWeatherMap API key
  // To get your API key, sign up for a free account at: https://openweathermap.org/
  const API_KEY = "your_actual_api_key"; // <-- Put your API key here

  getWeatherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchData(city);
      displayData(weatherData);
    } catch (error) {
      showerror();
    }
  });

  async function fetchData(city) {
    //keep this link as it is
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(response);
    console.log(typeof response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temp: ${main.temp}`;
    descriptionDisplay.textContent = `Weather:${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");

    errorMessage.classList.add("hidden");
  }

  function showerror() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
