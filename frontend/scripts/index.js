import { loadPartial } from "./partials-loader.js";

loadPartial("site-header", "partials/header.html").then(() => {
    // Now the header is loaded, so we can safely add the event listener
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('open'); // <-- Add this line
        });
    }
});

loadPartial("site-footer", "partials/footer.html");