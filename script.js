/* ============================================================
   DZ Carp — script.js
   Clean modern JS for navigation + UI
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("back-to-top");

/* ===============================
   MOBILE MENU
================================ */

hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");

});

/* Close menu on link click */

navLinks.forEach(link => {

link.addEventListener("click", () => {

navMenu.classList.remove("open");
hamburger.classList.remove("open");

});

});

/* ===============================
   NAVBAR SCROLL EFFECT
================================ */

window.addEventListener("scroll", () => {

if(window.scrollY > 80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

const target = document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

window.scrollTo({
top: target.offsetTop - 70,
behavior: "smooth"
});

}

});

});

/* ===============================
   BACK TO TOP BUTTON
================================ */

window.addEventListener("scroll", () => {

if(window.scrollY > 600){

backToTop.classList.add("visible");

}else{

backToTop.classList.remove("visible");

}

});

backToTop.addEventListener("click", () => {

window.scrollTo({
top:0,
behavior:"smooth"
});

});

/* ===============================
   SIMPLE FADE IN ANIMATION
================================ */

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".animate").forEach(el => {

observer.observe(el);

});

});
