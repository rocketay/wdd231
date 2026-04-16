import { initializeNavigation, setYear } from './navigation.js';

initializeNavigation();
setYear();

document.querySelector('#timestamp').value = new Date().toLocaleString();
