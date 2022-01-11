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
        .then(response => response.json())
        .then(data => console.log(data));
    
}
$("#search").on( "click",getWeather);
    
//uv-index api

//5-Day weather api