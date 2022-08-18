import React, {useEffect,useState} from "react";
import './weather.css';

//Api kry = c711ea7ee5b118627a4a2ebce904a407
// api url country & code = https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// api loc = https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const Weather = () => {

  const [weather,setData] = useState([])

  const searchInputBox = document.getElementById("input-box");

  // Event listner function on key press
  searchInputBox.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      console.log(searchInputBox.value);
      getWeatherReport(searchInputBox.value);
    }
  });

  //Get weather report
  function getWeatherReport(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c711ea7ee5b118627a4a2ebce904a407&units=metric`)
      .then((weather) => {
        return weather.json();
        console.log(weather);
        setData(weather);
      })
      .then(showWeatherReport);
  }

  useEffect(()=>{
    getWeatherReport();
  },[]);

  //Show weather report
  function showWeatherReport(weather) {
    console.log(weather);

    let customCity = document.getElementById("customCity");
    customCity.innerText = `${weather.name}, ${weather.sys.country}`;

    let humidity = document.getElementById("humidity");
    humidity.innerHTML = `${weather.main.humidity}`;

    let feelslike = document.getElementById("feelsLike");
    feelslike.innerHTML = `${Math.round(weather.main.feels_like)}&deg;C`;

    let maxTemp = document.getElementById("maxTemp");
    maxTemp.innerHTML = `${Math.round(weather.main.temp_max)}&deg;C`;

    let minTemp = document.getElementById("minTemp");
    minTemp.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C`;

    let cloudWeather = document.getElementById("cloud");
    cloudWeather.innerText = `${weather.weather[0].main}`;

    let currentTemp = document.getElementById("currentTemp");
    currentTemp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let date = document.getElementById("currentDate");
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
  }

  //Date  Manage

  function dateManage(dateArg) {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
  }

  // *********************************** First weather card ***********************

  /// Get geolocation longitude & latitude
  function getWeather() {
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
      var crd = position.coords;
      getDataLocation(crd.latitude, crd.longitude);
    }
  }

  // Fetching Data api
  function getDataLocation(lat, lon) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=28.69&lon=76.92&appid=c711ea7ee5b118627a4a2ebce904a407&units=metric"
      )
      .then((locWeather) => {
        return locWeather.json();
      })
      .then(detailsWeatherReport);
  }
  getDataLocation();

  // details weather report
  function detailsWeatherReport(locWeather) {
    console.log(locWeather);

    let cityAuto = document.getElementById("cityAuto");
    cityAuto.innerText = `${locWeather.name}, ${locWeather.sys.country}`;

    let tempGeo = document.getElementById("tempGeo");
    tempGeo.innerHTML = `${Math.round(locWeather.main.temp)}&deg;C`;

    let geoClouds = document.getElementById("geoClouds");
    geoClouds.innerText = `${locWeather.weather[0].main}`;

    let geoFeels = document.getElementById("geoFeels");
    geoFeels.innerHTML = `${Math.round(locWeather.main.feels_like)}&deg;C`;

    let geoWind = document.getElementById("geoWind");
    geoWind.innerText = `${locWeather.wind.speed} km/h`;

    let geoHumidity = document.getElementById("geoHumidity");
    geoHumidity.innerText = `${locWeather.main.humidity}`;

    let mxmn = document.getElementById("mxmn");
    mxmn.innerText = `${locWeather.main.temp_min} / ${locWeather.main.temp_max}`;

    let geoTime = document.getElementById("geoTime");
    let d = new Date();
    let minute = d.getMinutes();
    let hour = d.getHours();
    geoTime.innerHTML = `${hour}:${minute}`;
  }
};

export default Weather;