const params = new URLSearchParams(window.location.search);

document.querySelector('#display-firstName').textContent = params.get('firstName') || 'Not provided';
document.querySelector('#display-lastName').textContent = params.get('lastName') || 'Not provided';
document.querySelector('#display-email').textContent = params.get('email') || 'Not provided';
document.querySelector('#display-phone').textContent = params.get('phone') || 'Not provided';
document.querySelector('#display-organization').textContent = params.get('organization') || 'Not provided';
document.querySelector('#display-timestamp').textContent = formatTimestamp(params.get('timestamp')) || 'Not provided';

function formatTimestamp(timestamp) {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  return date.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  });
}