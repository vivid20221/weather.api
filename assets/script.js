// var language = event.target.getAttribute('data-language');
// // date var dateString = moment.unix(value).format("MM/DD/YYYY");

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const citySearch = document.getElementById('search-city');
const searchBtn = document.getElementById('search');
const apiKey = "d8fb84e836945d223bbf58e5c2d3e94e";
const currentTemp = document.getElementById('currentTemp');
const currentWind = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
const monCurrentTemp = document.getElementById('monCurrentTemp');
const monCurrentWind = document.getElementById('monCurrentWind');
const monCurrentHumidity = document.getElementById('monCurrentHumidity')
const cardContainer = document.getElementById("weatherCards"); 
// removeItem(keyName)
function getLatLon() {
    var cityName = citySearch.value; 
    const cityApi = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
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
    const secondApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(secondApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            fiveDayDisplay(data)
            currentTemp.textContent = data.list[0].main.temp;
            currentWind.textContent = data.list[0].wind.speed;
           currentHumidity.textContent = data.list[0].main.humidity;
        })
}

// <!-- <div class="card" style="width: 14rem; height: 15rem; background-color: rgb(128, 213, 228);">
//         <div class="card-body">
//           <h4 class="card-title">Monday</h4><p>temp: <span id="monCurrentTemp"></span></p>
//           <p>wind: <span id="monCurrentWind"></span></p>
//           <p>Humidity: <span id="monCurrentHumidity"></span></p>
//           </p>
//          </div>
//       </div> -->
function fiveDayDisplay(data) {
    let card = document.createElement('div')
    for (let i = 0; i < data.list.length; i++) {
        const element = data.list[i];
        if (element.dt_txt.includes('09:00:00')){
        let card = document.createElement('div')
        card.classList.add('card')
        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
       
        cardBody.innerHTML = `<h4 class="card-title">${element.dt_txt}</h4>
        <p>temp: <span id="monCurrentTemp">${element.main.temp}</span></p>
                  <p>wind:${element.wind.speed}<span id="monCurrentWind"></span></p>
                  <p>Humidity${element.main.humidity} <span id="monCurrentHumidity"></span></p>
                  </p>`
        
        
        
        card.append(cardBody)
        cardContainer.append(card)
        }

    } 
    
}


searchBtn.addEventListener('click', getLatLon);
