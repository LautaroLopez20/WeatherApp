const url = 'https://api.openweathermap.org/data/2.5/weather';

let form = document.getElementById('frmCity');
form.addEventListener('submit',searchCity);

defaultCity();

function searchCity(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let city = formData.get("city");
    getCityData(city);
}

function defaultCity() {
    let city = "tandil";
    getCityData(city);
}

async function getCityData(city) {
    try {
        let res = await fetch(url + `?q=${city}&appid=c4fb958b0a074c5e8f62c9655f0ff485&units=metric`);
        let json = await res.json();
        console.log(json);
        showData(json);
    } catch (error) {
        console.log(error);
    }
}

function showData(json) {
    const {main, name , clouds , wind} = json;

    document.getElementById('currentTemp').textContent = main.temp + "°C";
    document.getElementById('cityName').textContent = name;
    document.getElementById('humidity').textContent = main.humidity + "%";
    document.getElementById('wind').textContent = wind.speed + "m/s";
}
