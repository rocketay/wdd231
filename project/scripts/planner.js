import { initializeNavigation, setYear } from './navigation.js';
import { getFoods } from './data.js';
import { getSavedLog, saveLog } from './storage.js';

initializeNavigation();
setYear();

const foodSelect = document.querySelector('#food-select');
const plannerForm = document.querySelector('#planner-form');
const plannerLog = document.querySelector('#planner-log');
const clearLogButton = document.querySelector('#clear-log');
const totalCalories = document.querySelector('#total-calories');
const totalProtein = document.querySelector('#total-protein');
const totalCarbs = document.querySelector('#total-carbs');
const totalFats = document.querySelector('#total-fats');

let foods = [];
let savedItems = getSavedLog();

function renderFoodOptions(items) {
  foodSelect.innerHTML += items.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
}

function renderLog() {
  if (!savedItems.length) {
    plannerLog.innerHTML = '<article class="log-item"><h3>No meals saved yet</h3><p>Choose a food and add it to start your nutrition log.</p></article>';
    updateTotals();
    return;
  }

  plannerLog.innerHTML = savedItems.map((item, index) => `
    <article class="log-item">
      <div class="log-top">
        <div>
          <h3>${item.name}</h3>
          <p>${item.meal} • ${item.servings} serving(s)</p>
        </div>
        <button class="button button-secondary" data-remove="${index}">Remove</button>
      </div>
      <div class="log-macros">
        <span>${item.calories} cal</span>
        <span>${item.protein} g protein</span>
        <span>${item.carbs} g carbs</span>
        <span>${item.fats} g fats</span>
      </div>
    </article>
  `).join('');

  plannerLog.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', () => {
      savedItems.splice(Number(button.dataset.remove), 1);
      saveLog(savedItems);
      renderLog();
    });
  });

  updateTotals();
}

function updateTotals() {
  const totals = savedItems.reduce((accumulator, item) => {
    accumulator.calories += item.calories;
    accumulator.protein += item.protein;
    accumulator.carbs += item.carbs;
    accumulator.fats += item.fats;
    return accumulator;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  totalCalories.textContent = totals.calories;
  totalProtein.textContent = `${totals.protein} g`;
  totalCarbs.textContent = `${totals.carbs} g`;
  totalFats.textContent = `${totals.fats} g`;
}

plannerForm.addEventListener('submit', event => {
  event.preventDefault();

  const selectedFood = foods.find(item => item.id === Number(foodSelect.value));
  const mealType = document.querySelector('#meal-type').value;
  const servings = Number(document.querySelector('#servings').value);

  const entry = {
    ...selectedFood,
    meal: mealType,
    servings,
    calories: selectedFood.calories * servings,
    protein: selectedFood.protein * servings,
    carbs: selectedFood.carbs * servings,
    fats: selectedFood.fats * servings
  };

  savedItems = [...savedItems, entry];
  saveLog(savedItems);
  renderLog();
  plannerForm.reset();
  document.querySelector('#servings').value = 1;
});

clearLogButton.addEventListener('click', () => {
  savedItems = [];
  saveLog(savedItems);
  renderLog();
});

async function initializePlanner() {
  foods = await getFoods();
  renderFoodOptions(foods);
  renderLog();
}

initializePlanner();
