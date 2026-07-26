// report.js

const generateReportBtn = document.getElementById("generateReportBtn");

generateReportBtn.addEventListener("click", function () {

    const savedBmi = getFromStorage("fittrack_bmi");
    const savedCalories = getFromStorage("fittrack_calories");
    const savedWater = getFromStorage("fittrack_water") || 0;

    let score = 0;

    // BMI score (max 40)
    if (savedBmi) {
        document.getElementById("reportBMI").textContent = savedBmi.value + " (" + savedBmi.category + ")";

        if (savedBmi.category === "Normal Weight") {
            score += 40;
        } else if (savedBmi.category === "Overweight" || savedBmi.category === "Underweight") {
            score += 25;
        } else if (savedBmi.category === "Obese") {
            score += 10;
        }
    } else {
        document.getElementById("reportBMI").textContent = "Not calculated yet";
    }

    // Calories score (max 30)
    if (savedCalories) {
        document.getElementById("reportCalories").textContent = savedCalories.target + " kcal target";
        score += 30;
    } else {
        document.getElementById("reportCalories").textContent = "Not calculated yet";
    }

    // Water score (max 30)
    document.getElementById("reportWater").textContent = savedWater + " / 8 glasses";
    score += (savedWater / 8) * 30;

    // Static tips (no storage needed)
    document.getElementById("reportWorkout").textContent = "Aim for at least 3 workouts this week";
    document.getElementById("reportNutrition").textContent = "Include protein in every meal";

    // Final Health Score
    document.getElementById("reportScore").textContent = Math.round(score) + "%";

    // Update Dashboard's Health Score card too
    document.getElementById("healthScore").textContent = Math.round(score) + "%";
});