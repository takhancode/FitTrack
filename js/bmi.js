document.getElementById("bmiForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const height = Number(document.getElementById("bmiHeight").value);
    const weight = Number(document.getElementById("bmiWeight").value);

    // Validate input values
    if (height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values.");
        return;
    }

    // Calculate BMI
    const bmi = weight / ((height / 100) ** 2);

    // BMI Category
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

    // Show result
    document.getElementById("bmiResultValue").textContent = bmi.toFixed(2);
    document.getElementById("bmiResultLabel").textContent = category;

    // Dashboard card update
    document.getElementById("bmiValue").textContent = bmi.toFixed(2);
});