import { fullStory } from '../../../../../lib/utils';
import { group } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * Splits a list of products up into sections with a 'load more' button
 * @param {HTMLCollection|Array} products Master list of products to be split up
 * @param {number} productsPerSection number of products to show per section
 */
function productListToSections(productList, productsPerSection) {
  // convert productList to array
  productList = Array.prototype.map.call(productList, list => list);
  if (!productList || !productList.length) return false;
  const container = productList[0].parentElement;
  const groupedProducts = group(productList, productsPerSection || 8);
  const groupElements = groupedProducts.map((products, i) => {
    const element = document.createElement('ul');
    element.className = `${ID}_productGroup products large-block-grid-4 small-block-grid-2`;
    if (i === 0) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
    // element.setAttribute('data-group', i + 1);
    products.forEach((el) => {
      element.appendChild(el);
    });
    return element;
  });


  // Load in one section at a time when button is clicked
  let lastLoadedGroup = 1;
  const loadMore = document.createElement('div');
  loadMore.classList.add(`${ID}_productGroupLoad`);
  loadMore.innerHTML = `<span class="${ID}_productGroupLoad-CTA">Load more</span>`;
  loadMore.addEventListener('click', () => {
    setTimeout(() => {
      const nextGroup = groupElements[lastLoadedGroup + 1];
      const isLast = !groupElements[lastLoadedGroup + 2];
      if (nextGroup) {
        // Show next group
        nextGroup.style.display = 'block';
        lastLoadedGroup += 1;
      }

      if (isLast) {
        // Reached end of groups, hide CTA
        loadMore.style.display = 'none';
      }
    }, 500);
  });

  // Render
  const newContainer = document.createElement('div');
  newContainer.classList.add(`${ID}_productGroupContainer`);
  groupElements.forEach((section) => {
    newContainer.appendChild(section);
  });
  newContainer.appendChild(loadMore);
  container.insertAdjacentElement('afterend', newContainer);
  container.parentElement.removeChild(container);
}

export { setup, productListToSections }; // eslint-disable-line
