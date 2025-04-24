import { imagesConfig } from './gridContent';
import settings from '../settings';
import { shuffle } from '../../../../../../lib/utils/arrays';

export default () => {
  /**
 * Create HTML for an object item
 *
 * @param {Object} prod
 */
  const itemToHtml = (prod) => {
    let html = '';
    if (prod && prod.id) {
      html += `
      <li class="ME178-gridChristmas product-small grid-2-break grid-3-break grid-4-break grid-5-break  grid3 grid-normal" style="background-image: url('${prod.url}')">
        <span> ${prod.text}</span>
      </li> 
      `;
    }
    return html;
  };

  /**
   * Apply images to visible grid
   *
   * @param {NodeList} gridProducts
   * @param {Array} images
   */
  const applyImagesToVisibleGrid = (gridProducts, images) => {
    const addedImages = [];
    let counter = 0;
    [].forEach.call(gridProducts, (prod, idx) => {
      if ((idx + 1) % settings.EVERY_NTH_CHILD === 0) {
        prod.insertAdjacentHTML('afterend', itemToHtml(images[counter]));
        addedImages.push(images[counter]);
        counter += 1;
      }
    });

    return addedImages;
  };

  /**
   * Run
   *
   * @param {HTMLElement} grid
   * @param {Object} imagesToShow
   * @param {Number} numAvailable
   */
  /* eslint-disable */
  const run = (grid, imagesToShow, numAvailable) => {
    if (grid) {
      const gridProducts = grid.querySelectorAll('.product-small');
      if (gridProducts && gridProducts.length >= settings.EVERY_NTH_CHILD) {
        applyImagesToVisibleGrid(gridProducts, imagesToShow);
      }
    }
  };

  // ----------------------------------------------------------
  // Add images
  // ----------------------------------------------------------
  const grid = document.querySelector('.entry-content');
  const imagesToShow = shuffle(imagesConfig).slice(0, settings.NUM_TO_SHOW);
  const numAvailable = imagesToShow.length;

  run(grid, imagesToShow, numAvailable);
};
