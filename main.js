// Replace this with your actual Render backend URL
const BACKEND_URL = "https://enigma-explorer.onrender.com";

// Handle search form submission
document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        fetchWhoogleSearch(query);
    }
});

// Fetch Whoogle Search results
function fetchWhoogleSearch(query) {
    const resultsBox = document.getElementById("results");
    resultsBox.innerHTML = `<p>🔭 Searching the stars...</p>`;

    const whoogleUrl = `https://enigma-explorer.onrender.com/search?q=${encodeURIComponent(query)}`;

    fetch(whoogleUrl)
        .then(res => res.text())
        .then(data => {
            // If you want to parse the HTML results returned from Whoogle, you can use DOMParser
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const results = doc.querySelectorAll('.result');

            if (results.length > 0) {
                resultsBox.innerHTML = `<h3>Search Results:</h3><ul>`;
                results.forEach(result => {
                    const title = result.querySelector('.result__title').innerText;
                    const link = result.querySelector('.result__url').href;
                    const snippet = result.querySelector('.result__snippet').innerText;

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
            document.getElementById("results").innerHTML = `<p>⚠️ Error: ${err.message}</p>`;
        });

// 🌠 Random Phrase Logic
const phrases = [
  "Explore the universe of knowledge!",
  "Your privacy is our priority.",
  "Discover new galaxies of information.",
  "Search with confidence and security.",
  "Uncover the secrets of the cosmos."
];

document.addEventListener("DOMContentLoaded", () => {
  const phraseElement = document.getElementById("random-phrase");
  phraseElement.textContent = phrases[Math.floor(Math.random() * phrases.length)];
});

// 🌓 Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

// 🎤 Voice Search
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

// 🌌 Star Cursor Effect with Cleanup
const MAX_STARS = 50; // Max number of stars allowed at any given time
let stars = [];

document.addEventListener("mousemove", (e) => {
  // Check if the number of stars exceeds the max limit
  if (stars.length >= MAX_STARS) {
    const firstStar = stars.shift(); // Remove the oldest star
    firstStar.remove(); // Clean up the DOM
  }

  // Create a new star at the mouse position
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${e.clientX}px`;
  star.style.top = `${e.clientY}px`;
  document.body.appendChild(star);

  // Store the star for cleanup
  stars.push(star);

  // Remove the star after 600ms
  setTimeout(() => {
    star.remove();
  }, 600);
});  // <-- This closing parenthesis closes the 'addEventListener' function
