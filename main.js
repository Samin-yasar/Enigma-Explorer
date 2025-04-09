const BACKEND_URL = "https://corsproxy.io/?url=https://enigma-explorer.onrender.com";

// Search form submission
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("search-input").value.trim();
  if (query) fetchWhoogleSearch(query);
});

function fetchWhoogleSearch(query) {
  const resultsBox = document.getElementById("results");
  resultsBox.innerHTML = `<p>🔭 Searching the stars...</p>`;

  const params = new URLSearchParams();
  params.append("q", query);

  ["gl", "tbs", "hl", "lr", "near"].forEach(id => {
    const value = document.getElementById(id)?.value.trim();
    if (value) params.append(id, value);
  });

  const url = `${BACKEND_URL}/search?${params.toString()}`;

  fetch(url)
    .then(res => res.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const results = doc.querySelectorAll('.result');

      if (results.length > 0) {
        resultsBox.innerHTML = `<h3>Search Results:</h3><ul>`;
        results.forEach(result => {
          const title = result.querySelector('.result__title')?.innerText || "No title";
          const link = result.querySelector('.result__url')?.href || "#";
          const snippet = result.querySelector('.result__snippet')?.innerText || "";

          resultsBox.innerHTML += `
            <li>
              <a href="${link}" target="_blank">${title}</a>
              <p>${snippet}</p>
            </li>
          `;
        });
        resultsBox.innerHTML += `</ul>`;
      } else {
        resultsBox.innerHTML = `<p>❌ No results found. Try a different query.</p>`;
      }
    })
    .catch(err => {
      resultsBox.innerHTML = `<p>⚠️ Error: ${err.message}</p>`;
    });
}

// Advanced toggle
document.getElementById("toggle-advanced").addEventListener("click", () => {
  const advanced = document.getElementById("advanced-fields");
  const toggle = document.getElementById("toggle-advanced");
  advanced.classList.toggle("expanded");
  toggle.textContent = advanced.classList.contains("expanded")
    ? "Hide Advanced ↑"
    : "Advanced Options ↓";
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", () => {
  const isDark = themeToggle.checked;
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Random phrase
const phrases = [
  "Explore the universe of knowledge!",
  "Your privacy is our priority.",
  "Discover new galaxies of information.",
  "Search with confidence and security.",
  "Uncover the secrets of the cosmos."
];
document.getElementById("random-phrase").textContent =
  phrases[Math.floor(Math.random() * phrases.length)];

// 🌠 Star Cursor Trail
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

// 🎧 Sound effect on star hover (optional)
document.body.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("star")) {
    const audio = document.getElementById("space-sound");
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
});
