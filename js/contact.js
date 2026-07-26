// contact.js

const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show success message
    contactSuccess.classList.add("show");

    // Clear the form
    contactForm.reset();

    // Hide message again after 4 seconds
    setTimeout(function () {
        contactSuccess.classList.remove("show");
    }, 4000);
});