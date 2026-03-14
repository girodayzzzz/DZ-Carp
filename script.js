```javascript
// DZ Carp Website Script


// Smooth scrolling for anchor links

document.querySelectorAll("nav a").forEach(link => {

link.addEventListener("click", function(e){

let target = this.getAttribute("href");

if(target.startsWith("#")){

e.preventDefault();

let element = document.querySelector(target);

if(element){

element.scrollIntoView({
behavior: "smooth"
});

}

}

});

});



// Header shadow when scrolling

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

if(window.scrollY > 50){
header.style.boxShadow = "0 6px 15px rgba(0,0,0,0.25)";
}else{
header.style.boxShadow = "none";
}

});



// Simple fade-in animation for sections

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.style.opacity = 1;
entry.target.style.transform = "translateY(0)";
}

});

});

sections.forEach(section => {

section.style.opacity = 0;
section.style.transform = "translateY(40px)";
section.style.transition = "all 0.6s ease";

observer.observe(section);

});



console.log("DZ Carp website loaded successfully");
```
