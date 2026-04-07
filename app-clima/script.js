const nameCity = document.querySelector("#city");
const resultado = document.querySelector("#resultado");
const API_KEY = "a87ab4161cfc2bf2b03f414271030b99";

async function getWeather() {
    const city = nameCity.value.trim();
    if (city === '') return

    resultado.textContent = 'Buscando...';

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(url)
        console.log(data)

        if (data.cod === 404) {
            resultado.innerHTML = `
            <h2>Ciudad no encontrada</h2>
            `
            return;
        } 

        const w = data;
        resultado.innerHTML = `
        <h2>${w.name}</h2>
        <p>${w.main.temp}</p>
        <p>${w.weather[0].description}</p>
        `

    } catch (error) {
        resultado.textContent = 'Error al obtener el clima';
    }

    nameCity.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            getWeather();
        }
    })

}