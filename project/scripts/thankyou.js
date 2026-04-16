import { initializeNavigation, setYear } from './navigation.js';

initializeNavigation();
setYear();

const results = document.querySelector('#submission-results');
const params = new URLSearchParams(window.location.search);

const fields = [
  ['First Name', params.get('first-name')],
  ['Last Name', params.get('last-name')],
  ['Email', params.get('email')],
  ['Phone', params.get('phone')],
  ['Main Goal', params.get('goal-type')],
  ['Daily Calorie Target', params.get('daily-calories')],
  ['Favorite Healthy Foods', params.get('favorite-foods')],
  ['Notes', params.get('notes')],
  ['Submitted', params.get('timestamp')]
];

results.innerHTML = fields.map(([label, value]) => `<p><strong>${label}:</strong> ${value || 'Not provided'}</p>`).join('');
