// GIVEN a weather dashboard with form inputs

var APIkey = "5831006d1c289c5139ab47f54c14a209";
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,alerts&appid=" + APIkey;
var locationServiceURL = "https://api.opencagedata.com/geocode/v1/json?q={location}&key=199b3951d4114ac68f01018959609898";


var mostRecentCitySearch;

$.ajax({
    url: queryURL,
    method: "GET"
})
function getAllStorage() {
    let searchHistory = [];

    for (var i = 0; i < localStorage.length; i++) {

        searchHistory.push({
            sDate: localStorage.key(i),
            sLocation: localStorage.getItem(localStorage.key(i))
        }
        );

    }
    return searchHistory;
}

// I search for a city //SEARCH FEATURE
function saveSearchHistory() {
    let d = new Date();
    localStorage.setItem(d.toISOString(), document.getElementById("city").value);
}

// I am presented with current and future conditions for that city //retrieve info from API

// that city is added to the search history
document.getElementById("search").addEventListener("click",
    function () {
        getWeather(document.getElementById("city").value);
        saveSearchHistory();
    });

// I view current weather conditions for that city: the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index //retrieve this data from API, load to the html

// I view the UV index I am presented with a color that indicates whether the conditions are favorable, moderate, or severe //ASSIGN COLOR BASED ON UV INDEX FROM API

// I view future weather conditions for that city I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity //PULL FROM API AND LOAD IN HTML

// I click on a city in the search history //PULL FROM LOCAL STORAGE

// I am again presented with current and future conditions for that city

function getWeather(lookupCity) {

    let lsURL = locationServiceURL.replace("{location}", lookupCity);

    let lat;
    let lon;

    $.ajax({
        url: lsURL,
        method: "GET",
        success: function (response) {
            //city to lat/long
            lat = response.results[0]["geometry"]["lat"];
            lon = response.results[0]["geometry"]["lng"];

            currentWeatherForecasts(lat, lon, lookupCity);
        }
    });
}

function currentWeatherForecasts(lat, lon, location) {
    let q = queryURL;
    q = queryURL.replace("{lat}", lat);
    q = q.replace("{lon}", lon);

    $.ajax({
        url: q,
        method: "GET"
    })
        .then(function (response) {

            // Transfer content to HTML
            $(".city").text(location);
            $(".windspeed").text("Wind Speed: " + response.current.wind_speed);
            $(".humidity").text("Humidity: " + response.current.humidity);
            $(".uvIndex").text("UV Index: " + response.current.uvi);

            // Convert the temp to fahrenheit
            var tempF = (response.current.temp - 273.15) * 1.80 + 32;

            // add temp content to html 
            $(".temperature").text("Temperature (F): " + tempF.toFixed(1));

            //future forecast
            //
            renderFiveDay(response.daily);

        });
}
function renderFiveDay(forecastArray) {

    $("#forecastDays").empty();
    for (let i = 0; i < 5; i++) {
        let date = new Date(forecastArray[i].dt * 1000);
        let tempF = (forecastArray[i].temp.max - 273.15) * 1.80 + 32;
        tempF = tempF.toFixed(1);
        document.getElementById('forecastDays').innerHTML += `
                    <div class="column">
                        <div class="card">
                            <div class="card-image">
                            </div>
                            <div class="card-content">
                                <div class="media">
                                </div>
                                <div class="content">
                                    <time><strong>`+ date + `<strong></time>
                                    <br>
                                    <br>
                                    <p id="temperature">Temperature:`+ tempF + `</p>
                                    <br>
                                    <p id="humidity">Humidity:`+ forecastArray[i].humidity + `</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }
}

// I open the weather dashboard I am presented with the last searched city forecast //PULL FROM LOCAL STORAGE
function populateSearchHistory() {
    let cityHistory = getAllStorage();

    if (Array.isArray(cityHistory) && cityHistory.length > 0) {
        mostRecentCitySearch = cityHistory.sort(function (a, b) {
            var time1 = a.sDate;
            var time2 = b.sDate;
            if (time1 > time2) {
                return -1;
            }
            if (time1 < time2) {
                return 1;
            }
            // must be equal
            return 0;
        })[0]['sLocation'];

        getWeather(mostRecentCitySearch);

        for (i = 0; i < cityHistory.length; i++) {
            loc = cityHistory[i]["sLocation"];
            if (loc) {
                document.getElementById('searchHistory').innerHTML += '<a class="panel-block" data-location="' + loc + '"><span class="panel-icon">' + loc + '</i></span></a>';
            }
        }
    }
}

populateSearchHistory();

$(document).on("click", ".panel-block", function () {
    getWeather($(this).attr("data-location"));
});
