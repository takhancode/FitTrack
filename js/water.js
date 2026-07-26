// water.js

const waterGlasses = document.querySelectorAll(".water-glass");
const waterCountDisplay = document.getElementById("waterCount");
const waterProgressBar = document.getElementById("waterProgressBar");
const waterReset = document.getElementById("waterReset");

let waterCount = getFromStorage("fittrack_water") || 0;
const totalGlasses = 8;

function updateWaterDisplay() {
    // Update the count text
    waterCountDisplay.textContent = waterCount;

    // Update the progress bar width
    const percent = (waterCount / totalGlasses) * 100;
    waterProgressBar.style.width = percent + "%";

    // Fill/unfill glasses visually
    waterGlasses.forEach(function (glass, index) {
        if (index < waterCount) {
            glass.classList.add("filled");
        } else {
            glass.classList.remove("filled");
        }
    });

    // Update Dashboard card
    document.getElementById("waterValue").textContent = waterCount + " / " + totalGlasses;
    // Save to LocalStorage
    saveToStorage("fittrack_water", waterCount);

}

// Click a glass — fills up to that glass (like a real progress tracker)
waterGlasses.forEach(function (glass, index) {
    glass.addEventListener("click", function () {
        // If clicking the last filled glass, unfill it (toggle behavior)
        if (index === waterCount - 1) {
            waterCount = waterCount - 1;
        } else {
            waterCount = index + 1;
        }

        updateWaterDisplay();
    });
});

// Reset button
waterReset.addEventListener("click", function () {
    waterCount = 0;
    updateWaterDisplay();
});

// Initial display on page load
updateWaterDisplay();