// Mock requestAnimationFrame sinse React 16 needs it
/* istanbul ignore next */
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
