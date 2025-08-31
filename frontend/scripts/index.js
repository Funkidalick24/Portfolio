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

// Load projects from JSON and display 3 random cards
fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        // Shuffle and select 3 projects
        const selected = projects.sort(() => 0.5 - Math.random()).slice(0, 3);

        // Fetch the card partial once
        fetch('partials/card.html')
            .then(res => res.text())
            .then(cardTemplate => {
                selected.forEach((project, idx) => {
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

let quotesArray = [];
let currentQuoteIndex = 0;
let quoteTemplate = "";

fetch("data/quotes.json")
  .then(response => response.json())
  .then(quotes => {
    quotesArray = quotes;
    return fetch("partials/quote.html");
  })
  .then(res => res.text())
  .then(template => {
    quoteTemplate = template;
    showQuote(currentQuoteIndex);
    setInterval(nextQuote, 5000); // Change quote every 5 seconds
  });

function showQuote(index) {
  const quoteSection = document.getElementById("quote-section");
  // Fade out
  quoteSection.style.opacity = 0;
  setTimeout(() => {
    quoteSection.innerHTML = ""; // Clear previous
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = quoteTemplate.trim();
    const card = tempDiv.firstChild;
    const quote = quotesArray[index];

    card.querySelector("#quote").textContent = quote.quote;
    card.querySelector("#author").textContent = quote.author;
    card.querySelector("#personal").textContent = quote.personal;

    quoteSection.appendChild(card);

    // Add flip event directly to the card
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });

    // Fade in
    quoteSection.style.opacity = 1;
  }, 400); // Match this to your CSS transition duration
}

function nextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotesArray.length;
  showQuote(currentQuoteIndex);
}

loadPartial("site-footer", "partials/footer.html");