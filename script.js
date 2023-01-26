let weather = {
    "apiKey": "397fc8ab7c6bb7a5df799aa7652c0324",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        const temp_convert = Math.round(((temp-273.15)*1.8)+32)

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp_convert + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document
.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if(event.key == "Enter")
    {
        weather.search();
    }
});

weather.fetchWeather("Tallahassee")