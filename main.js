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

// 🔍 Search Submit (Basic behavior)
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("search-input").value.trim();
  const resultsBox = document.getElementById("results");
  if (query) {
    // You can replace this line with real search logic
    resultsBox.innerHTML = `<p class="privacy">🔎 You searched for: <b>${query}</b></p>`;
  }
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

// 🌌 Star Cursor Effect
document.addEventListener("mousemove", (e) => {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${e.clientX}px`;
  star.style.top = `${e.clientY}px`;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 600);
});
