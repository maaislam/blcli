/* eslint-disable import/prefer-default-export */
export const waitUntilElementExists = (selector, callback) => {
  const el = document.querySelector(selector);
  if (el) {
    return callback(el);
  }
  setTimeout(() => waitUntilElementExists(selector, callback), 500);
};
