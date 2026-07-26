// darkmode.js

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme preference
const savedTheme = getFromStorage("fittrack_theme");
if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        saveToStorage("fittrack_theme", "dark");
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        saveToStorage("fittrack_theme", "light");
    }
});