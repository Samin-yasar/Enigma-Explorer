const DUCKDUCKGO_API = "https://api.duckduckgo.com/";
const BRAVE_API_KEY = "BSACWggEoT6fY5A1zTU9bPjtzCQX40A"; // Replace with your Brave API key
const BRAVE_API = "https://api.search.brave.com/res/v1/web/search";

// Search form submission
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("search-input").value.trim();
  if (query) fetchSearch(query);
});

function fetchSearch(query) {
  const resultsBox = document.getElementById("results");
  resultsBox.innerHTML = `<p>🔭 Searching the stars...</p>`;

  const params = new URLSearchParams({ q: query, format: "json", no_html: 1 });
  ["gl", "hl", "lr", "near", "tbs"].forEach(id => {
    const value = document.getElementById(id)?.value.trim();
    if (value) params.append(id, value);
  });

  fetch(`${DUCKDUCKGO_API}?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
      if (data.Results && data.Results.length > 0) {
        displayResults(data.Results, resultsBox);
      } else {
        fetchBraveSearch(query, resultsBox);
      }
    })
    .catch(err => {
      console.error("DuckDuckGo failed:", err);
      fetchBraveSearch(query, resultsBox);
    });
}

function fetchBraveSearch(query, resultsBox) {
  const braveParams = new URLSearchParams({ q: query, count: 10 });
  fetch(`${BRAVE_API}?${braveParams.toString()}`, {
    headers: { "X-Subscription-Token": BRAVE_API_KEY }
  })
    .then(res => res.json())
    .then(data => {
      if (data.web && data.web.results && data.web.results.length > 0) {
        displayResults(data.web.results, resultsBox);
      } else {
        resultsBox.innerHTML = `<p>❌ No results found. Try a different query.</p>`;
      }
    })
    .catch(err => {
      resultsBox.innerHTML = `<p>⚠️ Error: ${err.message}</p>`;
    });
}

function displayResults(results, resultsBox) {
  resultsBox.innerHTML = `<h3>Search Results:</h3><ul>`;
  results.forEach(result => {
    const title = result.title || result.heading || "No title";
    const link = result.url || result.Result || "#";
    const snippet = result.description || result.Abstract || "";

    resultsBox.innerHTML += `
      <li>
        <a href="${link}" target="_blank">${title}</a>
        <p>${snippet}</p>
      </li>
    `;
  });
  resultsBox.innerHTML += `</ul>`;
}

// Random phrase
const phrases = [
  "Explore the universe of knowledge!",
  "Your privacy is our priority.",
  "Discover new galaxies of information.",
  "Search with confidence and security.",
  "Uncover the secrets of the cosmos.",
  "Explore the Web Without a Trace.",
  "Discover More, Worry Less.",
  "Search Without Compromise.",
  "Find What You Need, Keep What You Want Private.",
  "Your Queries, Your Privacy.",
  "Your Secrets, Our Mission: Enigma Explorer"
];
document.getElementById("random-phrase").textContent =
  phrases[Math.floor(Math.random() * phrases.length)];

// Star cursor trail
const MAX_STARS = 50;
let stars = [];

document.addEventListener("mousemove", (e) => {
  if (stars.length >= MAX_STARS) {
    stars.shift().remove();
  }

  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${e.clientX}px`;
  star.style.top = `${e.clientY}px`;
  document.body.appendChild(star);
  stars.push(star);

  setTimeout(() => {
    star.remove();
  }, 600);
});

// Sound effect on star hover
document.body.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("star")) {
    const audio = document.getElementById("space-sound");
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
});

// Toggle advanced fields
document.getElementById("toggle-advanced").addEventListener("click", () => {
  const advancedFields = document.getElementById("advanced-fields");
  const isVisible = advancedFields.style.display === "flex";
  advancedFields.style.display = isVisible ? "none" : "flex";
  document.getElementById("toggle-advanced").textContent = isVisible ? "Advanced Options ↓" : "Advanced Options ↑";
});

// Spawn cosmic elements
function spawnCosmicElements() {
  const universe = document.getElementById("universe");
  
  // Stars across layers
  const layers = [".stars", ".stars2", ".stars3"];
  layers.forEach((selector, index) => {
    const layer = document.querySelector(selector);
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";
      star.style.width = star.style.height = (Math.random() * 2 + 1) + "px";
      star.style.animationDelay = Math.random() * 2 + "s";
      layer.appendChild(star);
    }
  });

  // Additional shooting stars
  for (let i = 0; i < 2; i++) {
    const shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";
    shootingStar.style.top = Math.random() * 20 + "vh";
    shootingStar.style.animationDelay = Math.random() * 5 + "s";
    universe.appendChild(shootingStar);
  }

  // Asteroids
  for (let i = 0; i < 5; i++) {
    const asteroid = document.createElement("div");
    asteroid.className = "asteroid";
    asteroid.style.width = asteroid.style.height = (Math.random() * 20 + 10) + "px";
    asteroid.style.top = Math.random() * 80 + 10 + "vh";
    asteroid.style.animationDuration = (Math.random() * 10 + 10) + "s";
    asteroid.style.animationDelay = Math.random() * 5 + "s";
    universe.appendChild(asteroid);
  }
}

document.addEventListener("DOMContentLoaded", spawnCosmicElements);
