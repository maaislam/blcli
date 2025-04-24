import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
export const setup = () => {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Get current hometrial basket data
 * @returns {Promise.<object>}
 */
export const getHometrialBasketData = () => new Promise((resolve, reject) => {
  /**
   * Scrapes the data from a product element on /basket/hometrial/'
   * @param {HTMLElement} product
   */
  const scrapeProductData = product => ({
    link: product.getAttribute('href'),
    image: product.querySelector('.item-image').getAttribute('src'),
    name: product.querySelector('.item-name').textContent.trim(),
    brand: product.querySelector('.item-brand').textContent.trim(),
  });
  const hometrialData = [];
  const request = new XMLHttpRequest();
  request.open('GET', '/basket/hometrial/', true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const temp = document.createElement('div');
      temp.innerHTML = request.responseText;
      const orderItems = temp.querySelectorAll('.hometrial-current .product-link');
      for (let i = 0; i < orderItems.length; i += 1) {
        const data = scrapeProductData(orderItems[i]);
        if (data.name.toLowerCase() !== 'empty slot') {
          hometrialData.push(data);
        }
      }
      resolve(hometrialData);
    } else {
      reject();
    }
  };
  request.onerror = () => {
    reject();
  };
  request.send();
});
