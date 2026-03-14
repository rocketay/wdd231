const url = 'data/members.json';
const cards = document.querySelector('#members-container');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  cards.innerHTML = '';

  members.forEach((member) => {
    const section = document.createElement('section');
    const name = document.createElement('h2');
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const website = document.createElement('a');
    const image = document.createElement('img');
    const membership = document.createElement('p');
    const description = document.createElement('p');

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;
    website.textContent = 'Visit Website';
    website.href = member.website;
    website.target = '_blank';

    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = 'lazy';
    image.width = 300;
    image.height = 200;

    membership.textContent = `Membership Level: ${member.membership}`;
    description.textContent = member.description;

    section.appendChild(image);
    section.appendChild(name);
    section.appendChild(address);
    section.appendChild(phone);
    section.appendChild(website);
    section.appendChild(membership);
    section.appendChild(description);

    cards.appendChild(section);
  });
}

gridButton.addEventListener('click', () => {
  cards.classList.add('grid-view');
  cards.classList.remove('list-view');
});

listButton.addEventListener('click', () => {
  cards.classList.add('list-view');
  cards.classList.remove('grid-view');
});

getMembers();