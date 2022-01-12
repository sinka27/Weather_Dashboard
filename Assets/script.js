var cities = [];
var citySearchInputEl = document.querySelector("#searched-city");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var weatherContainerEl=document.querySelector("#current-weather-container");
var cityFormEl=document.querySelector("#city-search-form");
//var cityInputEl=document.querySelector("#cityInput");

// Fetch weather api
var getWeather = function(){
    var cityName = $("#cityInput").val();
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&APPID=ba0a6d61f2ea067651161c344b40f248')
        .then(function(response){
            response.json().then(function(data){
                displayWeather(data, cityName);
    
});
        });
    }
$("#search").on( "click",getWeather);

//Displaying current city weather
var displayWeather = function(weather, searchCity){
    //clear old content
    weatherContainerEl.textContent= "";  
    citySearchInputEl.textContent=searchCity;
 
    console.log(weather);
 
    //create date element
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);
 
    //create an image element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);
 
    //create a span element to hold temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"
   
    //create a span element to hold Humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
 
    //create a span element to hold Wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"
 
    //append to container
    weatherContainerEl.appendChild(temperatureEl);
 
    //append to container
    weatherContainerEl.appendChild(humidityEl);
 
    //append to container
    weatherContainerEl.appendChild(windSpeedEl);
 
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat,lon)
 }
    
//uv-index api
var getUvIndex = function(lat,lon){
    var apiKey = "ba0a6d61f2ea067651161c344b40f248"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
            console.log(data)
        });
    });
    console.log(lat);
    console.log(lon);
}
//Displaying uv-index 
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainerEl.appendChild(uvIndexEl);
}

//5-Day weather api