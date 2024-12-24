const url = 'https://api.openweathermap.org/data/2.5/weather';
const tempValue = "°C";
const windValue = " m/s";
const apiKey = "c4fb958b0a074c5e8f62c9655f0ff485"

let currentIcon;
let timeIcon = document.getElementById('weather');

let form = document.getElementById('frmCity');
form.addEventListener('submit',searchCity);

defaultCity();

function searchCity(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let city = formData.get("city");
    getCityData(city);
}

//La aplicacion comienza por defecto con esta ciudad
function defaultCity() {
    let city = "Buenos Aires";
    getCityData(city);
}

async function getCityData(city) {
    try {
        let res = await fetch(url + `?q=${city}&appid=${apiKey}&units=metric`);
        let json = await res.json();
        console.log(json);
        showData(json);
    } catch (error) {
        console.log(error);
    }
}

function showData(json) {
    const {main, name , weather , wind} = json;

    //Elimina el icono anterior, para poder aplicar el nuevo
    if (timeIcon.classList.contains(currentIcon)){
        timeIcon.classList.remove(currentIcon);
    }

    currentIcon = getWeatherIcon(weather[0].icon);

    timeIcon.classList.add("fa-solid" , currentIcon , "fa-5x");
    document.getElementById('currentTemp').textContent = main.temp + tempValue;
    document.getElementById('cityName').textContent = name;
    document.getElementById('humidity').textContent = main.humidity + "%";
    document.getElementById('wind').textContent = wind.speed + windValue;
}

//Define el icono del clima, en base al codigo recibido de la API
function getWeatherIcon(weatherIcon) {
    let icon;
    switch (weatherIcon) {
        case "01d":
            icon = "fa-sun"
            break;
        case "01n":
            icon = "fa-moon"
            break;
        case "02d":
            icon = "fa-cloud-sun"
            break;
        case "02n":
            icon = "fa-cloud-moon"
            break;
        case "03d":
        case "03n":
            icon = "fa-cloud"
            break;
        case "04d":
        case "04n":
            icon = "fa-cloud"
            break;
        case "09d":
        case "09d":
            icon = "fa-cloud-showers-heavy"
            break;
        case "10d":
            icon = "fa-cloud-sun-rain"
            break;
        case "10n":
            icon = "fa-cloud-moon-rain"
            break;
        case "11d":
        case "11d":
            icon = "fa-cloud-bolt"
            break;
        case "13d":
        case "13d":
            icon = "fa-snowflake"
            break;
        case "50d":
        case "50d":
            icon = "fa-smog"
            break;    
        default:
            break;
    }
    return icon;
}