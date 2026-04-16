const LOG_KEY = 'nutritrack-daily-log';

export function getSavedLog() {
  return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
}

export function saveLog(items) {
  localStorage.setItem(LOG_KEY, JSON.stringify(items));
}
