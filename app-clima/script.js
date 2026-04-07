const nameCity = document.querySelector("#city");
const resultado = document.querySelector("#resultado");
const API_KEY = "a87ab4161cfc2bf2b03f414271030b99";

async function getWeather() {
    const city = nameCity.value.trim();
    if (city === '') return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    console.log(url)

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    if (data.cod === '404') {
        resultado.innerHTML = `
        <h2>Ciudad no encontrada</h2>
        `
    } 
}