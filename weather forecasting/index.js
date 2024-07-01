const city_name = document.querySelector(".city_name");
const button = document.getElementById("search_btn");
const weather_icons = document.querySelector(".weather-icons");
const tempature = document.querySelector(".tempature");
const weather = document.querySelector(".weather_repo");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const loc_not_found = document.querySelector(".loc_not_found");
const weather_images = document.querySelector(".weather-images");


async function weatherCast(loc) {
    const api_key = "d0e8dcb90fee3059ed7c97b43ec50586";
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${api_key}`;
    var response = "";
    var weather_data = "";
    var status = 404;
    try{
        response = await fetch(`${api_url}`);
        weather_data = await response.json();
        status = 200;
        tempature.innerHTML = `${Math.round(weather_data.main.temp - 273)}°c`;
        weather.innerHTML = `${weather_data.weather[0].description}`;
        city.innerHTML = `${weather_data.name}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind.innerHTML = `${weather_data.wind.speed} km/h`;

    }
    catch(error){
        status = 404;
        console.log("Error Fetching data ",error);
    }
    console.log(20, weather_data);

    
    console.log(27, weather_data.cod);
    if (status == '404') {
        loc_not_found.style.display = "block";
        weather_images.style.display = "none";
        return;
    }
    else {
        loc_not_found.style.display = "none";
        weather_images.style.display = "block";
        if (weather_data.weather[0].main == "Clouds") {
            weather_icons.src = "images/clouds.png";
        }
        else if (weather_data.weather[0].main == "Mist") {
            weather_icons.src = "images/mist.png";
        }
        else if (weather_data.weather[0].main == "Clear") {
            weather_icons.src = "images/clear.png";
        }
        else if (weather_data.weather[0].main == "Drizzle") {
            weather_icons.src = "images/drizzle.png";
        }
        // else if(weather_data.weather[0].main =="Humidity")
        // {
        //     weather_icons.src= "images/humidity.png";
        // }
        else if (weather_data.weather[0].main == "Rain") {
            weather_icons.src = "images/rain.png";
        }
        // else if(weather_data.weather[0].main =="Wind")
        // {
        //     weather_icons.src= "images/wind.png";
        // }
        else if (weather_data.weather[0].main == "Snow") {
            weather_icons.src = "images/snow.png";
        }
    }
}

button.addEventListener('click', () => {
    weatherCast(city_name.value);
})
