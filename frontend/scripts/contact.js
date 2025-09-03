import { loadPartial } from "./partials-loader.js";

loadPartial("site-header", "partials/header.html").then(() => {
    // Now the header is loaded, so we can safely add the event listener
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
    }
});

// Handle contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // For now, just show an alert (in a real app, you'd send to a server)
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

            // Reset the form
            this.reset();
        });
    }
});

loadPartial("site-footer", "partials/footer.html");