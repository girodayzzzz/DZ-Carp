```javascript
// DZ-Carp Website JavaScript

// Mobile menu toggle
const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav");

if (menuButton) {
menuButton.addEventListener("click", () => {
navMenu.classList.toggle("active");
});
}


// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach(link => {

link.addEventListener("click", function(e) {

const targetId = this.getAttribute("href");

if (targetId.startsWith("#")) {

e.preventDefault();

const targetElement = document.querySelector(targetId);

if (targetElement) {

targetElement.scrollIntoView({
behavior: "smooth"
});

}

}

});

});


// Button hover animation
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

button.addEventListener("mouseenter", () => {

button.style.transform = "scale(1.05)";

});

button.addEventListener("mouseleave", () => {

button.style.transform = "scale(1)";

});

});


// Simple console message
console.log("DZ-Carp website loaded successfully");
```
