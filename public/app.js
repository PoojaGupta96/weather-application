// Fetch weather and air quality function
const getWeather = async (city) => {
  try {
    // Fetch weather data
    const weatherResponse = await fetch(`/weather?city=${city}`);
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weatherData = await weatherResponse.json();

    console.log(weatherData); 
  
    document.querySelector("#cityName").innerHTML = city;
    document.querySelector("#humidity").textContent = weatherData.main.humidity;
    document.querySelector("#humidity2").textContent =
      weatherData.main.humidity;
    document.querySelector("#feels_like").textContent =
      weatherData.main.feels_like;
    document.querySelector("#temp_min").textContent = weatherData.main.temp_min;
    document.querySelector("#temp").textContent = weatherData.main.temp;
    document.querySelector("#temp2").textContent = weatherData.main.temp;
    document.querySelector("#max_temp").textContent = weatherData.main.temp_max;
    document.querySelector("#wind_speed").textContent = weatherData.wind.speed;
    document.querySelector("#wind_speed2").textContent = weatherData.wind.speed;
    document.querySelector("#wind_degrees").textContent = weatherData.wind.deg;
    document.querySelector("#sunrise").textContent = new Date(
      weatherData.sys.sunrise * 1000
    ).toLocaleTimeString();
    document.querySelector("#sunset").textContent = new Date(
      weatherData.sys.sunset * 1000
    ).toLocaleTimeString();

    const updateElements = [
      { id: "feels_like3", property: "feels_like" },
      { id: "humidity3", property: "humidity" },
      { id: "temp_min3", property: "temp_min" },
      { id: "temp3", property: "temp" },
      { id: "temp_max3", property: "temp_max" },
      { id: "wind_speed3", property: "speed" },
      { id: "wind_degrees3", property: "deg" },
      { id: "sunrise3", property: "sunrise" },
      { id: "sunset3", property: "sunset" },
    ];

    updateElements.forEach(({ id, property }) => {
      const elementId = `${id}_${city.toLowerCase()}`;
      const element = document.getElementById(elementId);
      if (element) {
        if (property === "speed" || property === "deg") {
          element.textContent = weatherData.wind[property];
        } else if (property === "sunrise" || property === "sunset") {
          const time = new Date(weatherData.sys[property] * 1000);
          element.textContent = time.toLocaleTimeString();
        } else {
          element.textContent = weatherData.main[property];
        }
      }
    });

    const cityElement = document.getElementById(city.toLowerCase());
    if (cityElement) {
      cityElement.style.display = "table-row";
    }

    // Fetch air quality data
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    const airQualityResponse = await fetch(
      `/air_pollution?lat=${lat}&lon=${lon}`
    );
    if (!airQualityResponse.ok) {
      throw new Error("Failed to fetch air quality data");
    }
    const airQualityData = await airQualityResponse.json();

    console.log(airQualityData); // Log the air quality data to the console

    const aqi = airQualityData.list[0].main.aqi;
    let airQualityStatus = "";

    switch (aqi) {
      case 1:
        airQualityStatus = "Good";
        break;
      case 2:
        airQualityStatus = "Fair";
        break;
      case 3:
        airQualityStatus = "Moderate";
        break;
      case 4:
        airQualityStatus = "Poor";
        break;
      case 5:
        airQualityStatus = "Very Poor";
        break;
      default:
        airQualityStatus = "Unknown";
    }

    // Update air quality information in the HTML
    document.querySelector("#air_quality").textContent = airQualityStatus;
  } catch (error) {
    console.error(error);
  }
};

// Call the function for each default city
getWeather("Bangalore");
getWeather("Delhi");
getWeather("Lucknow");
getWeather("Birgunj");

document.querySelector("#submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  await getWeather(city);
  document.getElementById("city").value = "";
});
