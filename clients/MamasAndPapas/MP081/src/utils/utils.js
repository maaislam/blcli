export const createElement = function(type, classes) {
  const element = document.createElement(type);
  if (classes) {
    if (typeof classes === 'object') {
      for (let i = 0; i < classes.length; i++) {
        element.classList.add(classes[i]);
      }
    } else {
      element.classList.add(classes);
    }
  }

  return element;
};