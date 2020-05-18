// weather api key
var apiKey = "138ccdcbc1c05e83db93a0593cb96881";
// linking weatherDiv div
var weatherDiv = $("#weatherDiv");
// linking lastSearches div
var lastSearchesEl = $("#lastSearches");

// hide the currentWeatherDiv
var currentWeatherDiv = $("#currentWeatherDiv");
currentWeatherDiv.hide();

// on page load
// retrieve search names from local storage
// for the length of localstorage
for (var i = 0; i < localStorage.length; i++) {
  // push each key to the searchArray
  searchArray.push(localStorage.getItem(localStorage.key(i)));
}
// create an array for previous searches
var searchArray = [];
// push the searches into the search array
// searchArray.push(lastSearchFromStorage);
console.log(searchArray);
// generate buttons for previously searched cities
var lastSearchBtn = $("<button>", {
  class: "button is-outlined is-info is-fullwidth buttons",
  "data-city": currentCity,
}).text(currentCity);

// create index for localstorage
var indexNumber = 0;

// add an event listener to the submit button
$("#submit").on("click", function (e) {
  e.preventDefault();
  // add 1 to the index
  indexNumber++;
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
    // show the currentweather div
    currentWeatherDiv.show();
    // console.log(response);
    // remove the loading symbol from the input box
    $(".control").removeClass("is-loading");

    // get the current temperature, humidity, wind speed, icon ID, and city
    var currentConditions = {
      currentTemp: response.main.temp,
      currentHumidity: response.main.humidity,
      currentWind: response.wind.speed,
      currentIcon: response.weather[0].icon,
      currentCity: response.name,
    };
    // save the currentCity
    var currentCitySaved = currentConditions.currentCity;
    // save the returned search name(currentCity) to local storage for later use
    localStorage.setItem(`city${indexNumber}`, currentCitySaved);
    // create a button with the returned search name
    var lastSearchBtn = $("<button>", {
      class: "button is-outlined is-info is-fullwidth buttons",
      "data-city": currentCitySaved,
      id: currentCitySaved,
    }).text(currentCitySaved);
    // add event listener to the generated buttons
    $(document).on("click", `#${currentCitySaved}`, function () {
      // add loading animation
      $(".control").addClass("is-loading");
      // grab city data
      var clickedCity = $(this).data("city");
      // new search sources with clicked city
      var clickedCurrentSrc = `https://api.openweathermap.org/data/2.5/weather?q=${clickedCity}&units=imperial&appid=${apiKey}`;
      var clickedFiveDaySrc = `https://api.openweathermap.org/data/2.5/forecast?q=${clickedCity}&units=imperial&appid=${apiKey}`;
      // run a new ajax call for up to date info on previous searched cities
      $.get(clickedCurrentSrc).then(function (response) {
        // remove search animation
        $(".control").removeClass("is-loading");
        var clickedCurrentConditions = {
          currentTemp: response.main.temp,
          currentHumidity: response.main.humidity,
          currentWind: response.wind.speed,
          currentIcon: response.weather[0].icon,
          currentCity: response.name,
        };
        updateCurrentDay(clickedCurrentConditions);
      });
      fiveDay(clickedFiveDaySrc);
    });
    // append the button to the lastSearches div
    lastSearchesEl.append(lastSearchBtn);
    // console the items to test
    console.log(currentConditions);
    updateCurrentDay(currentConditions);
  });
  // call the 5 day forcast API
  fiveDay(fiveDaySrc);
});

// add a clear button for the lastSearches div
$("#clearSearch").on("click", function () {
  // empty the last searches
  lastSearchesEl.empty();
  // clear localstorage
  localStorage.clear();
  // reset indexNumber to 0
  indexNumber = 0;
});

function currentDay(currentDaySrc) {}

function fiveDay(fiveDaySrc) {
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
      // console.log(date, temp, humidity);
    }
  });
}

function updateCurrentDay(currentConditions) {
  // create header element to hold the city name
  $("#currentCity").text(currentConditions.currentCity);
  // create <p> elements for each weather condition
  $("#currentTemp").text(currentConditions.currentTemp);
  $("#currentHumidity").text(currentConditions.currentHumidity);
  $("#currentWind").text(currentConditions.currentWind);
  // get access to the weather icon with the icon id
  $("#currentIconEl").attr(
    "src",
    `http://openweathermap.org/img/wn/${currentConditions.currentIcon}.png`
  );
}
