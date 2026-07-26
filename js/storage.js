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

        const bmiResultValue = document.getElementById("bmiResultValue");
        const bmiResultLabel = document.getElementById("bmiResultLabel");
        if (bmiResultValue) bmiResultValue.textContent = savedBmi.value;
        if (bmiResultLabel) bmiResultLabel.textContent = savedBmi.category;
    }

    if (savedCalories) {
        // Dashboard card
        document.getElementById("caloriesValue").textContent = savedCalories.target + " kcal";

        // Calorie Calculator's own result boxes
        const bmrValue = document.getElementById("bmrValue");
        const tdeeValue = document.getElementById("tdeeValue");
        const targetValue = document.getElementById("targetValue");
        if (bmrValue) bmrValue.textContent = savedCalories.bmr + " kcal";
        if (tdeeValue) tdeeValue.textContent = savedCalories.tdee + " kcal";
        if (targetValue) targetValue.textContent = savedCalories.target + " kcal";
    }

    if (savedWater !== null) {
        document.getElementById("waterValue").textContent = savedWater + " / 8";
    }
}

restoreDashboard();