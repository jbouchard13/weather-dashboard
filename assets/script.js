// weather api key
var apiKey = "138ccdcbc1c05e83db93a0593cb96881";

var weatherDiv = $("#weatherDiv");

// add an event listener to the submit button
$("#submit").on("click", function (e) {
  e.preventDefault();
  // grab the input from both the city and state input boxes
  var cityInput = $("#cityInput").val().trim();
  // var stateInput = $("#stateInput").val().trim();

  // add the is-loading class to the input to show the loading symbol
  $(".control").addClass("is-loading");
  console.log(cityInput);

  // create the api call source for current weather conditions
  var currentSrc = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
  // start the ajax call to the openweather api for current weather conditions
  $.get(currentSrc).then(function (response) {
    console.log(response);
    // remove the loading symbol from the input box
    $(".control").removeClass("is-loading");

    // get the current temperature, humidity, wind speed, and icon ID
    var currentKelvin = response.main.temp;
    // convert the temperature in kelvin to fahrenheit
    var currentTemp = Math.round((currentKelvin - 273.15) * 1.8 + 32);
    var currentHumidity = response.main.humidity;
    var currentWind = response.wind.speed;
    var currentID = response.weather[0].id;
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
  });
});
