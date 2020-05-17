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
  var currentSrc = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
  var fiveDaySrc = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;
  // start the ajax call to the openweather api for current weather conditions
  $.get(currentSrc).then(function (response) {
    currentWeatherDiv.show();
    console.log(response);
    // remove the loading symbol from the input box
    $(".control").removeClass("is-loading");

    // get the current temperature, humidity, wind speed, icon ID, and city
    var currentKelvin = response.main.temp;
    // convert the temperature in kelvin to fahrenheit
    var currentTemp = Math.round((currentKelvin - 273.15) * 1.8 + 32);
    var currentHumidity = response.main.humidity;
    var currentWind = response.wind.speed;
    var currentID = response.weather[0].id;
    var currentCity = response.name;
    console.log(
      "temp",
      currentTemp,
      "humidity",
      currentHumidity,
      "wind",
      currentWind,
      "iconID",
      currentID
    );
    // create a new div element to hold the current day weather
    // create header element to hold the city name
    $("#currentCity").text(currentCity);
    // create <p> elements for each weather condition
    $("#currentTemp").text(currentTemp);
    $("#currentHumidity").text(currentHumidity);
    $("#currentWind").text(currentWind);
    // get access to the weather icon with the icon id
    // append the icon id to the div
  });
  // call the 5 day forcast API
  $.get(fiveDaySrc).then(function (response) {
    console.log(response);

  });
});

function forecastLoop (response[i]) {
  for(var i = 0; i <= 4; i++) {
    // grab the info for the next 5 days
    // run a for loop to loop over the data
    // for each day create a card with forcast
    // date
    // temp
    // humidity
    // weather icon
  }
}
