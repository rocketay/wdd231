const timestampField = document.querySelector('#timestamp');
const modalButtons = document.querySelectorAll('.modal-link');
const closeButtons = document.querySelectorAll('.close-modal');

timestampField.value = new Date().toISOString();

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    const modal = document.querySelector(`#${modalId}`);
    modal.showModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('dialog');
    modal.close();
  });
});