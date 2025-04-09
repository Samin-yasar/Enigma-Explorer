const BACKEND_URL = "https://enigma-explorer.onrender.com";
const CORS_PROXY = "https://corsproxy.io/?"; // Free CORS proxy

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

  const optionalFields = ["gl", "tbs", "hl", "lr", "near"];
  optionalFields.forEach(id => {
    const value = document.getElementById(id)?.value.trim();
    if (value) params.append(id, value);
  });

  const targetUrl = `${BACKEND_URL}/search?${params.toString()}`;
  const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;

  fetch(proxyUrl)
    .then(res => res.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const results = doc.querySelectorAll('.result');

      console.log("[DEBUG] Total Results Found:", results.length);

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
  document.body.classList.toggle("light", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.body.classList.add(saved);
    themeToggle.checked = saved === "dark";
  } else {
    document.body.classList.add("light");
  }

  // Random phrase
  const phrases = [
    "Explore the universe of knowledge!",
    "Your privacy is our priority.",
    "Discover new galaxies of information.",
    "Search with confidence and security.",
    "Uncover the secrets of the cosmos."
  ];
  const phraseElement = document.getElementById("random-phrase");
  phraseElement.textContent = phrases[Math.floor(Math.random() * phrases.length)];
});

// Voice Search
const voiceBtn = document.getElementById("voice-btn");
const voiceStatus = document.getElementById("voice-status");
const searchInput = document.getElementById("search-input");

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  voiceBtn.addEventListener("click", () => {
    recognition.start();
    voiceStatus.textContent = "🎙️ Listening...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    voiceStatus.textContent = `✅ You said: "${transcript}"`;
    document.getElementById("search-form").dispatchEvent(new Event("submit"));
  };

  recognition.onerror = () => {
    voiceStatus.textContent = "❌ Voice search failed.";
  };
} else {
  voiceStatus.textContent = "⚠️ Voice search not supported on this browser.";
  voiceBtn.disabled = true;
}
