const calorieForm = document.getElementById("calorieForm");

calorieForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // input values
    const age = Number(document.getElementById("calAge").value);
    const gender = document.getElementById("calGender").value;
    const height = Number(document.getElementById("calHeight").value);
    const weight = Number(document.getElementById("calWeight").value);
    const activity = document.getElementById("calActivity").value;
    const goal = document.getElementById("calGoal").value;

    // Validate input values
    if (age <= 0 || height <= 0 || weight <= 0 || gender === "" || activity === "" || goal === "") {
        alert("Please enter valid values.");
        return;
    }

    // Calculate BMR
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // calculate TDEE
    let tdee;
    switch (activity) {
        case "sedentary":
            tdee = bmr * 1.2;
            break;
        case "light":
            tdee = bmr * 1.375;
            break;
        case "moderate":
            tdee = bmr * 1.55;
            break;
        case "active":
            tdee = bmr * 1.725;
            break;
        case "extra":
            tdee = bmr * 1.9;
            break;
        default:
            tdee = bmr * 1.2;
    }

    // Target Calories
    let targetCalories;

    if (goal === "lose") {
        targetCalories = tdee - 500;
    } else if (goal === "gain") {
        targetCalories = tdee + 500;
    } else {
        targetCalories = tdee;
    }

    // Display Results
    document.getElementById("bmrValue").textContent =
        Math.round(bmr) + " kcal";

    document.getElementById("tdeeValue").textContent =
        Math.round(tdee) + " kcal";

    document.getElementById("targetValue").textContent =
        Math.round(targetCalories) + " kcal";

    // Dashboard Calories Card
    document.getElementById("caloriesValue").textContent =
        Math.round(targetCalories) + " kcal";
    saveToStorage("fittrack_calories", {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target: Math.round(targetCalories)
    });
  });
