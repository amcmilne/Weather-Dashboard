// GIVEN a weather dashboard with form inputs

var APIkey = "5831006d1c289c5139ab47f54c14a209";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
var mostRecentCitySearch;

$.ajax({
    url: queryURL,
    method: "GET"
})
function getAllStorage() {
    let searchHistory = [];

    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
        console.log(localStorage.key(i));

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
document.getElementById("search").addEventListener("click", saveSearchHistory);

// I view current weather conditions for that city: the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index //retrieve this data from API, load to the html

// I view the UV index I am presented with a color that indicates whether the conditions are favorable, moderate, or severe //ASSIGN COLOR BASED ON UV INDEX FROM API

// I view future weather conditions for that city I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity //PULL FROM API AND LOAD IN HTML

// I click on a city in the search history //PULL FROM LOCAL STORAGE

// I am again presented with current and future conditions for that city
function currentCityForecast() {
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

        for (i = 0; i < cityHistory.length; i++) {
            document.getElementById('searchHistory').innerHTML += '<a class="panel-block"><span class="panel-icon"><i class="fas fa-map-marked-alt">' + cityHistory[i]["sLocation"] + '</i></span></a>';
        }
    }
}

populateSearchHistory();


var cityForcast = document.querySelectorAll('.panel-icon');
for (var i = 0; i < timeSlots.length; i++) {
    let slot = cityForecast[i].textContent;
    let = localStorage.getItem();
}