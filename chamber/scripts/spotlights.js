const spotlightContainer = document.querySelector('#spotlights-container');
const spotlightUrl = 'data/members.json';

async function getSpotlights() {
  try {
    const response = await fetch(spotlightUrl);
    const data = await response.json();

    const qualifiedMembers = data.members.filter(member =>
      member.membership === 2 || member.membership === 3
    );

    const shuffledMembers = shuffleArray(qualifiedMembers);

    const spotlightCount = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = shuffledMembers.slice(0, spotlightCount);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error('Error loading spotlights:', error);
    spotlightContainer.innerHTML = '<p>Spotlights unavailable at the moment.</p>';
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('section');
    const name = document.createElement('h3');
    const image = document.createElement('img');
    const phone = document.createElement('p');
    const address = document.createElement('p');
    const website = document.createElement('a');
    const membership = document.createElement('p');

    name.textContent = member.name;

    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = 'lazy';
    image.width = 300;
    image.height = 200;

    phone.textContent = member.phone;
    address.textContent = member.address;

    website.href = member.website;
    website.textContent = 'Visit Website';
    website.target = '_blank';
    website.rel = 'noopener noreferrer';

    membership.textContent = getMembershipLabel(member.membership);

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(phone);
    card.appendChild(address);
    card.appendChild(website);
    card.appendChild(membership);

    spotlightContainer.appendChild(card);
  });
}

function getMembershipLabel(level) {
  if (level === 3) return 'Gold Member';
  if (level === 2) return 'Silver Member';
  return 'Member';
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

getSpotlights();
