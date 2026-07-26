// app.js

const healthForm = document.getElementById("healthForm");

healthForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);
    const activityLevel = document.getElementById("activityLevel").value;
    const goal = document.getElementById("goal").value;

    if (age <= 0 || height <= 0 || weight <= 0 || gender === "" || activityLevel === "" || goal === "") {
        alert("Please fill all fields correctly.");
        return;
    }

    const bmi = weight / ((height / 100) ** 2);

    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal Weight";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let tdee;
    switch (activityLevel) {
        case "sedentary":
            tdee = bmr * 1.2;
            break;
        case "lightlyActive":
            tdee = bmr * 1.375;
            break;
        case "moderatelyActive":
            tdee = bmr * 1.55;
            break;
        case "veryActive":
            tdee = bmr * 1.725;
            break;
        case "extraActive":
            tdee = bmr * 1.9;
            break;
        default:
            tdee = bmr * 1.2;
    }

    let targetCalories;
    if (goal === "loseWeight") {
        targetCalories = tdee - 500;
    } else if (goal === "gainWeight") {
        targetCalories = tdee + 500;
    } else {
        targetCalories = tdee;
    }

    document.getElementById("bmiValue").textContent = bmi.toFixed(2);
    document.getElementById("caloriesValue").textContent = Math.round(targetCalories) + " kcal";

    saveToStorage("fittrack_bmi", { value: bmi.toFixed(2), category: category });
    saveToStorage("fittrack_calories", {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        target: Math.round(targetCalories)
    });
});