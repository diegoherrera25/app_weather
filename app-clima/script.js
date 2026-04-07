const nameCity = document.querySelector("#city");
const resultado = document.querySelector("#resultado");
const API_KEY = "a87ab4161cfc2bf2b03f414271030b99";

async function getWeather() {
  const city = nameCity.value.trim();
  if (city === "") return;

  resultado.textContent = "Buscando...";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(url);
    console.log(data);

    if (data.cod === 404) {
      resultado.innerHTML = `
            <h2>Ciudad no encontrada</h2>
            `;
      return;
    }

    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const w = data;
    resultado.innerHTML = `
        <div class="card">
          <h2>${w.name}</h2>
          <p>🌡️ Temperature: ${w.main.temp}</p>
          <p>☁️ Description: ${w.weather[0].description}</p>
          <p>💧 Humedad: ${data.main.humidity}%</p>
          <p>💨 Viento: ${data.wind.speed} m/s</p>
        </div>
        `;
    
    resultado.style.animation = "none";
    resultado.offsetHeight;
    resultado.style.animation = "fadeInResult 0.5s ease";
  } catch (error) {
    resultado.textContent = "Error al obtener el clima";
  }
}

nameCity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

const toggle = document.getElementById("toggleTheme");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  updateIcon(isDark);
});

function updateIcon(isDark) {
  const icon = document.getElementById("toggleTheme");
  if (isDark) {
    icon.textContent = "☀️";
  } else {
    icon.textContent = "🌙";
  }
}
