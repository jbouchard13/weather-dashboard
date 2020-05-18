// weather api key
var apiKey = "138ccdcbc1c05e83db93a0593cb96881";

var weatherDiv = $("#weatherDiv");

// hide the currentWeatherDiv
var currentWeatherDiv = $("#currentWeatherDiv");
currentWeatherDiv.hide();

// add an event listener to the submit button
$("#submit").on("click", function (e) {
  e.preventDefault();
  // grab the input from both the city and state input boxes
  var cityInput = $("#cityInput").val().trim();

  // add the is-loading class to the input to show the loading symbol
  $(".control").addClass("is-loading");
  console.log(cityInput);

  // create the api call source for current weather conditions
  var currentSrc = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;
  var fiveDaySrc = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=${apiKey}`;
  // start the ajax call to the openweather api for current weather conditions
  $.get(currentSrc).then(function (response) {
    currentWeatherDiv.show();
    console.log(response);
    // remove the loading symbol from the input box
    $(".control").removeClass("is-loading");

    // get the current temperature, humidity, wind speed, icon ID, and city
    var currentTemp = response.main.temp;
    // convert the temperature in kelvin to fahrenheit
    // var currentTemp = Math.round((currentKelvin - 273.15) * 1.8 + 32);
    var currentHumidity = response.main.humidity;
    var currentWind = response.wind.speed;
    var currentIcon = response.weather[0].icon;
    var currentCity = response.name;
    console.log(
      "temp",
      currentTemp,
      "humidity",
      currentHumidity,
      "wind",
      currentWind,
      "iconID",
      currentIcon
    );
    // create a new div element to hold the current day weather
    // create header element to hold the city name
    $("#currentCity").text(currentCity);
    // create <p> elements for each weather condition
    $("#currentTemp").text(currentTemp);
    $("#currentHumidity").text(currentHumidity);
    $("#currentWind").text(currentWind);
    // get access to the weather icon with the icon id
    $("#currentIconEl").attr(
      "src",
      `http://openweathermap.org/img/wn/${currentIcon}.png`
    );
    // append the icon id to the div
  });
  // call the 5 day forcast API
  $.get(fiveDaySrc).then(function (response) {
    $("#fiveDayDiv").empty();
    // grab the info for the forecast
    var forecastList = response.list;
    // grab the info for the next 5 days
    // place the 5 days into an array with the 12:00 forecast
    var fiveDay = [
      forecastList[3],
      forecastList[11],
      forecastList[19],
      forecastList[27],
      forecastList[35],
    ];
    console.log(forecastList);
    for (var i = 0; i < fiveDay.length; i++) {
      // for each day create a tile with forcast
      var tileEl = $("<div>", {
        class: "tile is-vertical column",
      });
      // date
      var date = fiveDay[i].dt_txt;
      var dateEl = $("<h3>", {
        class: "title",
      }).text(date);
      // temp
      var temp = fiveDay[i].main.temp;
      var tempEl = $("<p>").text(`Temperature: ${temp}°F`);
      // humidity
      var humidity = fiveDay[i].main.humidity;
      var humidityEl = $("<p>").text(`Humidity: ${humidity}%`);
      // weather icon
      var weatherIconId = fiveDay[i].weather[0].icon;
      var iconEl = $("<img>", {
        src: `http://openweathermap.org/img/wn/${weatherIconId}.png`,
        class: "forecast-icons",
      });
      // append the data elements to the new div
      tileEl.append(dateEl, iconEl, tempEl, humidityEl);
      // append the til to the 5 day div
      $("#fiveDayDiv").append(tileEl);
      console.log(date, temp, humidity);
    }
  });
});
