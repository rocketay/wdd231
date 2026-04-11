import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const message = document.querySelector("#visitor-message");

/* DISPLAY CARDS */

places.forEach(place => {
  const card = document.createElement("div");
  card.classList.add("discover-card");

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = place.image;
  img.alt = place.name;
  img.loading = "lazy";

  figure.appendChild(img);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.textContent = "Learn More";

  card.appendChild(title);
  card.appendChild(figure);
  card.appendChild(address);
  card.appendChild(description);
  card.appendChild(button);

  grid.appendChild(card);
});

/* LOCAL STORAGE MESSAGE */

const today = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
  message.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysDifference = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysDifference < 1) {
    message.textContent = "Back so soon! Awesome!";
  } else if (daysDifference === 1) {
    message.textContent = "You last visited 1 day ago.";
  } else {
    message.textContent = `You last visited ${daysDifference} days ago.`;
  }
}

localStorage.setItem("lastVisit", today);