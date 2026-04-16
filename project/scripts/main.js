import { initializeNavigation, setYear } from './navigation.js';
import { getFoods } from './data.js';
import { getSavedLog, saveLog } from './storage.js';

initializeNavigation();
setYear();

const listContainer = document.querySelector('#food-list');
const categoryFilter = document.querySelector('#category-filter');
const modal = document.querySelector('#food-modal');
const modalBody = document.querySelector('#modal-body');
const closeModal = document.querySelector('#close-modal');
const foodCount = document.querySelector('#food-count');
const averageCalories = document.querySelector('#average-calories');
const savedCount = document.querySelector('#saved-count');

let foods = [];

function renderCategories(items) {
  const categories = ['all', ...new Set(items.map(item => item.category))];
  categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category === 'all' ? 'All categories' : category}</option>`).join('');
}

function createCard(item) {
  return `
    <article class="food-card">
      <div class="food-card-header">
        <div>
          <h3>${item.name}</h3>
          <p class="card-meta">${item.serving}</p>
        </div>
        <span class="food-badge">${item.category}</span>
      </div>
      <div class="card-details">
        <div class="detail-box"><span>Calories</span><strong>${item.calories}</strong></div>
        <div class="detail-box"><span>Protein</span><strong>${item.protein} g</strong></div>
        <div class="detail-box"><span>Carbs</span><strong>${item.carbs} g</strong></div>
        <div class="detail-box"><span>Fats</span><strong>${item.fats} g</strong></div>
      </div>
      <button class="button button-secondary" data-id="${item.id}">View Details</button>
    </article>
  `;
}

function renderFoods(items) {
  listContainer.innerHTML = items.map(createCard).join('');

  listContainer.querySelectorAll('button[data-id]').forEach(button => {
    button.addEventListener('click', () => {
      const selected = foods.find(item => item.id === Number(button.dataset.id));
      openModal(selected);
    });
  });
}

function updateSummary(items) {
  foodCount.textContent = items.length;
  averageCalories.textContent = Math.round(items.reduce((total, item) => total + item.calories, 0) / items.length);
  savedCount.textContent = getSavedLog().length;
}

function openModal(item) {
  modalBody.innerHTML = `
    <p class="eyebrow">${item.category}</p>
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    <div class="card-details">
      <div class="detail-box"><span>Serving</span><strong>${item.serving}</strong></div>
      <div class="detail-box"><span>Calories</span><strong>${item.calories}</strong></div>
      <div class="detail-box"><span>Protein</span><strong>${item.protein} g</strong></div>
      <div class="detail-box"><span>Carbs</span><strong>${item.carbs} g</strong></div>
      <div class="detail-box"><span>Fats</span><strong>${item.fats} g</strong></div>
      <div class="detail-box"><span>Fiber</span><strong>${item.fiber} g</strong></div>
    </div>
    <div class="hero-actions">
      <button class="button" id="save-from-modal">Save to Planner</button>
    </div>
  `;

  modal.showModal();

  document.querySelector('#save-from-modal').addEventListener('click', () => {
    const currentLog = getSavedLog();
    const updatedLog = [...currentLog, { ...item, meal: item.category, servings: 1, savedAt: new Date().toLocaleString() }];
    saveLog(updatedLog);
    savedCount.textContent = updatedLog.length;
    modal.close();
  });
}

async function initializePage() {
  foods = await getFoods();
  renderCategories(foods);
  renderFoods(foods);
  updateSummary(foods);
}

categoryFilter.addEventListener('change', () => {
  const selected = categoryFilter.value;
  const filtered = selected === 'all' ? foods : foods.filter(item => item.category === selected);
  renderFoods(filtered);
});

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  const isInDialog = bounds.top <= event.clientY && event.clientY <= bounds.top + bounds.height && bounds.left <= event.clientX && event.clientX <= bounds.left + bounds.width;
  if (!isInDialog) {
    modal.close();
  }
});

initializePage();
