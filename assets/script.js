// weather api key
var apiKey = "138ccdcbc1c05e83db93a0593cb96881";

// add an event listener to the submit button
$("#submit").on("click", function (e) {
  e.preventDefault();
  // grab the input from both the city and state input boxes
  var cityInput = $("#cityInput").val().trim();
  // var stateInput = $("#stateInput").val().trim();

  console.log(cityInput, stateInput);

  // create the api call source for current weather conditions
  var currentSrc = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
  // start the ajax call to the openweather api for current weather conditions
  $.get(currentSrc).then(function (response) {
    console.log(response);
  });
});
