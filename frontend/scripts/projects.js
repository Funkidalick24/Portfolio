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

// Load all projects from JSON and display them
fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        // Fetch the card partial once
        fetch('partials/card.html')
            .then(res => res.text())
            .then(cardTemplate => {
                projects.forEach((project, idx) => {
                    // Create a DOM node from the template
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = cardTemplate.trim();
                    const card = tempDiv.firstChild;

                    // Fill in the data
                    card.querySelector('.card-title').textContent = project.title;
                    card.querySelector('.card-description').textContent = project.description;
                    card.querySelector('.card-image').src = project.image;
                    card.querySelector('.card-image').alt = project.title;
                    card.querySelector('.card-link[aria-label="GitHub Repo"]').href = project.github;
                    card.querySelector('.card-link[aria-label="Open Project"]').href = project.live;

                    // Optionally set a unique id
                    card.id = `card-${idx + 1}`;

                    // Append to the cards section
                    document.getElementById('cards-section').appendChild(card);

                    // Add click event listener to toggle 'flipped' class
                    card.addEventListener('click', function() {
                        this.classList.toggle('flipped');
                    });
                });
            });
    })
    .catch(error => {
        console.error('Error loading projects:', error);
    });

loadPartial("site-footer", "partials/footer.html");