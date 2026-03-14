```javascript
// Smooth scroll for navigation links

document.querySelectorAll("nav a").forEach(link => {

link.addEventListener("click", function(e){

let target = this.getAttribute("href");

if(target.startsWith("#")){

e.preventDefault();

document.querySelector(target).scrollIntoView({
behavior:"smooth"
});

}

});

});

console.log("DZ Carp website loaded successfully.");
```
