let find = document.getElementById("find");
let search = document.getElementById("search");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(location){
        let latitude = location.coords.latitude
        let longitude = location.coords.longitude
        getWeather(`${latitude}, ${longitude}`)
    })
}

var realTime;
var nextDay;
var nextDay2;
var locate;
var cityName = [];
var forecast = [];
var currentData = [];
var forecastTom = [];
var forecastAfterTom = [];
var days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
var months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
search.addEventListener("input", function () {
   console.log('hello');
  getWeather(search.value);
  
//   realTime = search.value;

  // console.log();
  // getWeather(search.value)
});

async function getWeather(city) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f9708c7c44d94f7998e191858241806&q=${city}&days=4`
    );
    let data = await response.json();

    console.log(search.value);
    cityName = data.location.name;
    currentData = data.current;
    locate = data;
    nextDay = locate.forecast.forecastday[1].hour[1];
    console.log(nextDay);
    nextDay2 = locate.forecast.forecastday[2].hour[2];
    forecast.push(currentData);
    displayData();
    console.log(data);
  } catch (error) {
    console.log(error, "error");
  }
}

// getWeather();

function displayData() {
  var box = ``;
  var date = new Date();
  var day = date.getDay();
  var month = date.getMonth();
  var dayNum = date.getDate();
  for (var i = 0; i < forecast.length; i++) {
    box = `
         <div class="col-md-4 gy-3 py-4">
                    <div class="card bg-dark p-3">
                       <div class="card-border border-bottom border-info py-2 text-white d-flex justify-content-between">
                        <span>${days[(day+1)%7]}</span>
                        <span>${dayNum} ${months[month]}</span>
                       </div>
                        <div class="card-body py-5">
                            <span class="text-white fs-4">${cityName}</span>
                          <h1 class="card-title text-center text-white">${currentData.temp_c}C</h1>
                          <div class="d-flex align-items-center justify-content-center">
                            <span class="text-info">${currentData.condition.text}</span>
                            <img src="http:${currentData.condition.icon}" alt="${currentData.condition.text}">
                          </div>
                         <div class="row">
                            <div class="col-md-4">
                                <i class="fa-solid fa-umbrella text-white"></i>
                                <span class="text-white">${currentData.pressure_in}%</span>
                            </div>
                            <div class="col-md-4">
                                <i class="fa-solid fa-gauge text-white"></i>
                                <span class="text-white">${currentData.wind_kph}Km/h</span>
                            </div>
                            <div class="col-md-4">
                                <i class="fa-solid fa-wand-sparkles text-white"></i>
                                <span class="text-white">East</span>
                            </div>
                         </div>   
                        </div>
                      </div>
                </div>
                <div class="col-md-4 gy-3 py-4">
                    <div class="card bg-dark py-3">
                       <div class="card-border border-bottom border-info py-2 text-white d-flex justify-content-center">
                        <span class="text-center">${days[(day+2)%7]}</span>
                        
                       </div>
                        <div class="card-body py-5">
                            <span class="text-white fs-4">${cityName}</span>
                          <h1 class="card-title text-center text-white">${nextDay.temp_c}C</h1>
                          <div class="d-flex align-items-center justify-content-center">
                            <span class="text-info">${nextDay.condition.text}</span>
                                                        <img src="http:${nextDay.condition.icon}" alt="${nextDay.condition.text}">
                          </div>
                         <div class="row">
                            <div class="col-md-4">
                                <i class="fa-solid fa-umbrella text-white"></i>
                                <span class="text-white">${nextDay.pressure_in}%</span>
                            </div>
                            <div class="col-md-4">
                                <i class="fa-solid fa-gauge text-white"></i>
                                <span class="text-white">${nextDay.wind_kph}Km/h</span>
                            </div>
                            <div class="col-md-4">
                                <i class="fa-solid fa-wand-sparkles text-white"></i>
                                <span class="text-white">East</span>
                            </div>
                         </div>
                        </div>
                      </div>
                </div>

                <div class="col-md-4 gy-3 py-4">
                    <div class="card bg-dark py-3">
                       <div class="card-border border-bottom border-info py-2 text-white d-flex justify-content-center">
                        <span class="text-center">${days[(day+3)%7]}</span>
                        
                       </div>
                        <div class="card-body py-5">
                            <span class="text-white fs-4">${cityName}</span>
                          <h1 class="card-title text-center text-white">${nextDay2.temp_c}C</h1>
                          <div class="d-flex align-items-center justify-content-center">
                            <span class="text-info">${nextDay2.condition.text}</span>
                                                        <img src="http:${nextDay2.condition.icon}" alt="${nextDay.condition.text}">
                          </div>
                         <div class="row">
                            <div class="col-md-4">
                                <i class="fa-solid fa-umbrella text-white"></i>
                                <span class="text-white">${nextDay2.pressure_in}%</span>
                            </div>
                            <div class="col-md-4">
                                <i class="fa-solid fa-gauge text-white"></i>
                                <span class="text-white">${nextDay2.wind_kph}Km/h</span>
                            </div>
                            <div class="col-md-4">
                                <i class="fa-solid fa-wand-sparkles text-white"></i>
                                <span class="text-white">East</span>
                            </div>
                         </div>
                        </div>
                      </div>
                </div>
        `;
  }
  document.getElementById("dataDis").innerHTML = box;
}


