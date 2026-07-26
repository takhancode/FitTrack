// workout.js

const workoutFilters = document.getElementById("workoutFilters");
const workoutGrid = document.getElementById("workoutGrid");

let allExercises = [];

// Map our simple filter buttons to the muscle names the database actually uses
const muscleMap = {
    chest: ["chest"],
    back: ["lats", "middle back", "lower back", "traps"],
    legs: ["quadriceps", "hamstrings", "calves", "glutes", "abductors", "adductors"],
    arms: ["biceps", "triceps", "forearms"],
    core: ["abdominals"]
};

async function loadExercises() {
    workoutGrid.innerHTML = "<p class='nutrition-loading'>Loading exercises...</p>";

    try {
        const url = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/dist/exercises.json";
        const response = await fetch(url);
        const data = await response.json();

        // Only keep exercises that have clear instructions and a primary muscle
        allExercises = data.filter(function (ex) {
            return ex.name && ex.primaryMuscles && ex.primaryMuscles.length > 0;
        });

        renderExercises("all");

    } catch (error) {
        workoutGrid.innerHTML = "<p class='nutrition-loading'>Couldn't load exercises right now. Please refresh and try again.</p>";
        console.log(error);
    }
}

function renderExercises(muscleGroup) {
    let filtered;

    if (muscleGroup === "all") {
        filtered = allExercises.slice(0, 12);
    } else {
        const targetMuscles = muscleMap[muscleGroup];

        filtered = allExercises.filter(function (ex) {
            return ex.primaryMuscles.some(function (m) {
                return targetMuscles.includes(m);
            });
        }).slice(0, 12);
    }

    workoutGrid.innerHTML = "";

    if (filtered.length === 0) {
        workoutGrid.innerHTML = "<p class='nutrition-loading'>No exercises found for this category.</p>";
        return;
    }

    filtered.forEach(function (exercise) {
        const card = document.createElement("div");
        card.className = "workout-card";

        const tag = exercise.primaryMuscles[0];
        const firstStep = exercise.instructions && exercise.instructions[0]
            ? exercise.instructions[0]
            : "No instructions available.";

        card.innerHTML =
            "<div class='workout-card__icon'><i class='fa-solid fa-dumbbell'></i></div>" +
            "<h3>" + exercise.name + "</h3>" +
            "<p class='workout-card__tag'>" + tag + "</p>" +
            "<p class='workout-card__desc'>" + firstStep.slice(0, 90) + "...</p>";

        workoutGrid.appendChild(card);
    });
}

// Filter pill clicks
const filterButtons = workoutFilters.querySelectorAll(".filter-pill");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("filter-pill--active");
        });
        button.classList.add("filter-pill--active");

        const muscleGroup = button.getAttribute("data-muscle");
        renderExercises(muscleGroup);
    });
});

// Load exercises when page loads
loadExercises();