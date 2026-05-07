// ================= MENU =================
const menuBtn = document.getElementById("menuBtn");
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("show");
  });
}

// ================= URL PARAMS =================
const params = new URLSearchParams(window.location.search);
const place = params.get("place");
const continent = params.get("continent");

// ================= DATA =================
const data = {

  // 🌍 CONTINENTS → COUNTRIES
  europe: {
    title: "Europe",
    desc: "Old streets, slow life, and deep culture.",
    countries: [
      { name: "Italy", place: "italy" }
    ]
  },

  asia: {
    title: "Asia",
    desc: "Fast, vibrant, and deeply rooted traditions.",
    countries: [
      { name: "Japan", place: "japan" }
    ]
  },

  africa: {
    title: "Africa",
    desc: "Color, rhythm, and unforgettable energy.",
    countries: [
      { name: "Morocco", place: "morocco" }
    ]
  },

  // 🌍 COUNTRIES → CITIES
  italy: {
    title: "Italy",
    desc: "Not the checklist version — the slow, lived-in version.",
    cities: [
      { name: "Rome", desc: "Get lost. That’s the point." },
      { name: "Florence", desc: "Art, but also quiet streets." },
      { name: "Naples", desc: "Messy, real, unforgettable." }
    ]
  },

  japan: {
    title: "Japan",
    desc: "Precision, calm, and moments you don’t rush.",
    cities: [
      { name: "Tokyo", desc: "Fast outside, still inside." },
      { name: "Kyoto", desc: "Tradition that breathes." },
      { name: "Osaka", desc: "Food that actually hits." }
    ]
  },

  morocco: {
    title: "Morocco",
    desc: "Color, chaos, and rhythm you don’t control.",
    cities: [
      { name: "Marrakech", desc: "Alive in every sense." },
      { name: "Fez", desc: "Old world, still moving." },
      { name: "Chefchaouen", desc: "Quiet, blue, unreal." }
    ]
  }
};

// ================= COUNTRY PAGE LOGIC =================
const grid = document.getElementById("cityGrid");

// 👉 1. If CONTINENT → show COUNTRIES
if (data[continent] && grid) {
  document.getElementById("countryTitle").innerText = data[continent].title;
  document.getElementById("countryDesc").innerText = data[continent].desc;

  grid.innerHTML = "";

  data[continent].countries.forEach(country => {
    const card = `
      <a href="country.html?place=${country.place}" class="info-card">
        <div class="card-body">
          <h3>${country.name}</h3>
          <p>Explore ${country.name}</p>
        </div>
      </a>
    `;
    grid.innerHTML += card;
  });
}

// 👉 2. If COUNTRY → show CITIES
if (data[place] && grid) {
  document.getElementById("countryTitle").innerText = data[place].title;
  document.getElementById("countryDesc").innerText = data[place].desc;

  grid.innerHTML = "";

  data[place].cities.forEach(city => {
    const card = `
      <a href="cityguide.html?city=${city.name.toLowerCase()}" class="info-card">
        <div class="card-body">
          <h3>${city.name}</h3>
          <p>${city.desc}</p>
        </div>
      </a>
    `;
    grid.innerHTML += card;
  });
}

// ================= CONTACT PAGE =================
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

if (messageInput && charCount) {
  messageInput.addEventListener("input", () => {
    charCount.textContent = messageInput.value.length + " / 200";
  });
}

function validateContactForm() {
  let isValid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const topic = document.getElementById("topic");
  const message = document.getElementById("message");

  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  if (name.value.trim() === "") {
    document.getElementById("nameError").textContent = "Please enter your name";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value)) {
    document.getElementById("emailError").textContent = "Enter a valid email";
    isValid = false;
  }

  if (topic.value === "") {
    document.getElementById("topicError").textContent = "Please select a topic";
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    document.getElementById("messageError").textContent = "Message must be at least 10 characters";
    isValid = false;
  }

  return isValid;
}

// ================= MAP =================
function updateMap() {
  const input = document.getElementById("mapSearch").value;
  const frame = document.getElementById("mapFrame");

  if (input.trim() !== "") {
    frame.src = "https://www.google.com/maps?q=" + encodeURIComponent(input) + "&output=embed";
  }
}

// ================= BUDGET =================

function calculateTripBudget() {

  const days =
    parseInt(document.getElementById("days").value);

  let daily =
    parseInt(document.getElementById("daily").value);

  const style =
    document.getElementById("style").value;

  if (style === "budget") {
    daily = daily * 0.8;
  }

  else if (style === "luxury") {
    daily = daily * 1.6;
  }

  const total = days * daily;

  document.getElementById("budgetResult").style.display = "block";

  document.getElementById("budgetTotal").innerText =
    total.toFixed(0);

  return false;
}

// ================= CHECKLIST =================
function resetChecklist() {
  const checkboxes = document.querySelectorAll(".checklist input");
  checkboxes.forEach(cb => cb.checked = false);
}

// ================= CITY GUIDE =================
const cityParams = new URLSearchParams(window.location.search);
const city = cityParams.get("city");

const cityData = {
  rome: {
    title: "Rome",
    desc: "History everywhere, but the best moments are the quiet ones in between.",
    things: ["Colosseum", "Trevi Fountain", "Vatican Museums"],
    food: ["Local pasta spots", "Gelato shops", "Trastevere cafés"],
    tips: ["Go early to landmarks", "Walk as much as possible", "Avoid tourist restaurants"]
  },

  florence: {
    title: "Florence",
    desc: "Art, quiet streets, and a slower rhythm.",
    things: ["Duomo", "Uffizi Gallery", "Arno River walks"],
    food: ["Tuscan cuisine", "Wine bars", "Local bakeries"],
    tips: ["Walk everywhere", "Go early to museums", "Stay central"]
  },

  naples: {
    title: "Naples",
    desc: "Messy, loud, and full of life.",
    things: ["Pizza spots", "Historic center", "Mount Vesuvius"],
    food: ["Neapolitan pizza", "Street food", "Espresso bars"],
    tips: ["Expect chaos", "Watch your belongings", "Eat locally"]
  },

  tokyo: {
    title: "Tokyo",
    desc: "Fast on the surface, calm underneath if you let it be.",
    things: ["Shibuya Crossing", "TeamLab Museum", "Shrines"],
    food: ["Sushi bars", "Street ramen", "Convenience store finds"],
    tips: ["Use trains", "Carry cash", "Explore side streets"]
  }
};

if (cityData[city] && document.getElementById("cityTitle")) {

  document.getElementById("cityTitle").innerText = cityData[city].title;
  document.getElementById("cityDesc").innerText = cityData[city].desc;

  const thingsList = document.getElementById("thingsList");
  const foodList = document.getElementById("foodList");
  const tipsList = document.getElementById("tipsList");

  thingsList.innerHTML = "";
  foodList.innerHTML = "";
  tipsList.innerHTML = "";

  cityData[city].things.forEach(item => {
    thingsList.innerHTML += `<li>${item}</li>`;
  });

  cityData[city].food.forEach(item => {
    foodList.innerHTML += `<li>${item}</li>`;
  });

  cityData[city].tips.forEach(item => {
    tipsList.innerHTML += `<li>${item}</li>`;
  });
}

// ================= FOOD DATA =================
const foodData = [
  { name: "Italy 🍝", type: "comfort", desc: "Fresh pasta, espresso, and slow meals." },
  { name: "Japan 🍣", type: "fine", desc: "Precision, balance, and elevated dining." },
  { name: "Morocco 🌶️", type: "street", desc: "Spices, markets, and food that feels alive." },
  { name: "Naples 🍕", type: "street", desc: "Pizza, chaos, and flavor everywhere." },
  { name: "Paris 🍷", type: "fine", desc: "Elegant dining and unforgettable flavors." }
];

// ================= RENDER FUNCTION =================
function renderFood(filter = "all") {
  const grid = document.getElementById("foodGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = filter === "all"
    ? foodData
    : foodData.filter(item => item.type === filter);

  filtered.forEach(item => {
    const card = `
      <div class="info-card">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
    grid.innerHTML += card;
  });
}

// ================= FILTER BUTTON =================
function filterFood(type) {
  renderFood(type);
}

// ================= INITIAL LOAD =================
renderFood();

function getWeather(passedCity) {
  const city = passedCity || document.getElementById("weatherSearch").value;
  const result = document.getElementById("weatherResult");

  if (!city || city.trim() === "") {
    result.innerHTML = "Please enter a city.";
    return;
  }

  result.innerHTML = `
    <h2>${city}</h2>
    <p>🌤️ Mild / Clear</p>
    <p>🌡️ ~70°F</p>
    <p style="color:#5e646b;">*Demo weather preview</p>
  `;
}

const weatherParams = new URLSearchParams(window.location.search);
const weatherCity = weatherParams.get("city");

if (weatherCity && document.getElementById("weatherSearch")) {
  document.getElementById("weatherSearch").value = weatherCity;
  getWeather(weatherCity);
}

function goToWeather() {
  const city = document.getElementById("mapSearch").value;
  if (city.trim() !== "") {
    window.location.href = "weather.html?city=" + encodeURIComponent(city);
  }
}

// ================= LIVE WEATHER =================

async function getWeather(passedCity) {

  const city =
    passedCity ||
    document.getElementById("weatherSearch").value;

  const result = document.getElementById("weatherResult");

  if (!city || city.trim() === "") {

    result.innerHTML = `
      <div class="info-card">
        <div class="card-body">
          <p>Please enter a city.</p>
        </div>
      </div>
    `;

    return;
  }

  result.innerHTML = `
    <div class="info-card">
      <div class="card-body">
        <p>Loading weather...</p>
      </div>
    </div>
  `;

  try {

    // STEP 1: GET COORDINATES
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {

      result.innerHTML = `
        <div class="info-card">
          <div class="card-body">
            <p>City not found.</p>
          </div>
        </div>
      `;

      return;
    }

    const location = geoData.results[0];

    // STEP 2: GET WEATHER
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
    );

    const weatherData = await weatherResponse.json();

    const weather = weatherData.current_weather;

    // WEATHER CODE INTERPRETER
    let condition = "Clear";

    if (weather.weathercode >= 1 && weather.weathercode <= 3) {
      condition = "Cloudy";
    }

    if (weather.weathercode >= 45 && weather.weathercode <= 48) {
      condition = "Foggy";
    }

    if (weather.weathercode >= 51 && weather.weathercode <= 67) {
      condition = "Rainy";
    }

    if (weather.weathercode >= 71 && weather.weathercode <= 77) {
      condition = "Snow";
    }

    if (weather.weathercode >= 80) {
      condition = "Stormy";
    }

    result.innerHTML = `

      <div class="info-card">

        <div class="card-body" style="text-align:center;">

          <h2 style="
            font-size:2rem;
            margin-bottom:10px;
          ">
            ${location.name}
          </h2>

          <p style="
            color:#5e646b;
            margin-bottom:20px;
          ">
            ${location.country}
          </p>

          <div style="
            font-size:4rem;
            margin-bottom:10px;
          ">
            🌤️
          </div>

          <h3 style="
            font-size:3rem;
            margin-bottom:10px;
            color:#4f6d8f;
          ">
            ${weather.temperature}°C
          </h3>

          <p style="
            font-size:1.1rem;
            margin-bottom:8px;
          ">
            ${condition}
          </p>

          <p style="
            color:#5e646b;
          ">
            Wind Speed: ${weather.windspeed} km/h
          </p>

        </div>

      </div>
    `;

  } catch (error) {

    result.innerHTML = `
      <div class="info-card">
        <div class="card-body">
          <p>Something went wrong loading weather data.</p>
        </div>
      </div>
    `;

    console.error(error);
  }
}