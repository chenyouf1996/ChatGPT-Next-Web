// eventManager.js

const eventListeners = {};

export function emitEvent(eventName, data) {
  const listeners = eventListeners[eventName];
  if (listeners) {
    listeners.forEach((listener) => listener(data));
  }
}

export function subscribeEvent(eventName, callback) {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }
  eventListeners[eventName].push(callback);
}

export function unsubscribeEvent(eventName, callback) {
  const listeners = eventListeners[eventName];
  if (listeners) {
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
}
