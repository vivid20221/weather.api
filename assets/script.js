// var language = event.target.getAttribute('data-language');
// // date var dateString = moment.unix(value).format("MM/DD/YYYY");

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const citySearch = document.getElementById('search-city');
const searchBtn = document.getElementById('search');
const apiKey = "d311c6fd7ebc4183cb52d300bdd43ba2";
const currentTemp = document.getElementById('currentTemp');
const currentWind = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
// removeItem(keyName)

function getLatLon() {
    var cityName = citySearch.value;
    const cityApi = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    console.log(cityName);
    fetch(cityApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const lat = data.city.coord.lat;
            const lon = data.city.coord.lon;
            secondCall(lat, lon);
        })
}

function secondCall(lat, lon) {
    const secondApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(secondApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            currentTemp.textContent = data.list[0].main.temp;
            currentWind.textContent = data.list[0].wind.speed;
            currentHumidity.textContent = data.list[0].main.humidity;
        })
}


searchBtn.addEventListener('click', getLatLon);
