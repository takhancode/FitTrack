// storage.js — shared LocalStorage helpers, used by other feature files

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const data = localStorage.getItem(key);

    if (data) {
        return JSON.parse(data);
    }

    return null;
}

// Restore saved data into the Dashboard cards when the page loads
function restoreDashboard() {
    const savedBmi = getFromStorage("fittrack_bmi");
    const savedCalories = getFromStorage("fittrack_calories");
    const savedWater = getFromStorage("fittrack_water");

    if (savedBmi) {
        document.getElementById("bmiValue").textContent = savedBmi.value;
    }

    if (savedCalories) {
        document.getElementById("caloriesValue").textContent = savedCalories + " kcal";
    }

    if (savedWater !== null) {
        document.getElementById("waterValue").textContent = savedWater + " / 8";
    }
}

restoreDashboard();