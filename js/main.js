
////////// Today Data //////////////

let todayName = document.querySelector("#today-Name")
let todayDateDayNumber = document.querySelector("#todayDateDayNumber")
let todayDateDayMonth = document.querySelector("#todayDateDayMonth")
let todayLocation = document.querySelector("#todayLocation")
let todayTemp = document.querySelector("#todayTemp")
let todayConditionImg = document.querySelector("#todayConditionImg")
let todayConditionText = document.querySelector("#todayConditionText")
let humidity = document.querySelector("#humidity")
let wind = document.querySelector("#wind")
let windDirection = document.querySelector("#windDirection")


//////////// tomorrow Data //////////

let nextDayName =document.getElementsByClassName("nextDayName")
let nextConditionImg =document.getElementsByClassName("nextConditionImg")
let nextMaxTemp =document.getElementsByClassName("nextMaxTemp")
let nextMinTemp =document.getElementsByClassName("nextMinTemp")
let nextConditionText =document.getElementsByClassName("nextConditionText")

//////////// Search///////////////
let searchInput = document.getElementById("search");


// Fetch API Data
async function getWeatherData(cityName){ 
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf5f85b582114163b6374446242302&q=07112&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}
getWeatherData();


////////////// display Today data/////////////////
function displayTodayData(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"}) 
    todayDateDayNumber.innerHTML = todayDate.getDate();
    todayDateDayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"}) 
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity +"%";
    wind.innerHTML = data.current.wind_kph+"Km/h";
    windDirection.innerHTML = data.current.wind_dir;
}


//////////// display next day data ////////////
function dispalyNextData(data){ 
    let forecastData = data.forecast.forecastday;
    for(let i = 0; i < 2; i++){ 
        let nextDate = new Date(forecastData[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"}); 
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src" , forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
}


///////// start App/////////////
async function startApp(city = "cairo"){  
   let weatherData = await getWeatherData(city);
   if(!weatherData.error) { 
       displayTodayData(weatherData);
       dispalyNextData(weatherData);
   }
}
startApp();


searchInput.addEventListener("keyup", function() {
    startApp(searchInput.value);
});
