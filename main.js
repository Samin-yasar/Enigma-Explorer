// Replace this with your actual Render backend URL
const BACKEND_URL = "https://whoogle-yourname.onrender.com";

// Handle form submission
document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const query = document.getElementById("search-input").value.trim();
    if (!query) return;

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
            resultsContainer.innerHTML = "<p>No results or an error occurred.</p>";
            return;
        }

        resultsContainer.innerHTML = data.map(result => `
            <div class="result">
                <a href="${result.url}" target="_blank">${result.title}</a>
                <p>${result.description}</p>
                <small>${result.url}</small>
            </div>
        `).join("");
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = "<p>Failed to fetch results.</p>";
    }
});

// Toggle dark/light mode
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
