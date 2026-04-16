export function initializeNavigation() {
    const button = document.querySelector('#menu-button');
    const navigation = document.querySelector('#primary-nav');
  
    if (!button || !navigation) return;
  
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      navigation.classList.toggle('open');
    });
  }
  
  export function setYear() {
    const year = document.querySelector('#year');
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }
  