import settings from './settings';

/**
 * Item to HTML
 */
const itemToHtml = (prod) => {
  let html = '';
  if(prod && prod.link) {
    html += `
    <product class="${settings.ID}-prod-cta p-r-2 p-b-9 p-b-5-s p-l-2 w-3 w-4-m w-6">
      <div class="${settings.ID}-prod-cta__inner">
        <div class="pos-relative product">
          <div class="pos-relative ${settings.ID}-prod-cta__title">
            ${prod.title}
          </div>

          <div class="pos-relative">
            <a href="${prod.link}">
              <img src="${prod.img}">
            </a>
          </div>

          <div class="pos-relative">
            <a href="${prod.link}" class="${settings.ID}-prod-cta__text button w-12 p-r-0 p-l-0">
              ${prod.copy}
            </a>
          </div>
        </div>
      </div>
    </product>
    `;
  }

  return html;
};

/**
 * Remove all images from visible grid
 *
 * @param {HTMLElement} grid
 */
const removeImagesFromVisibleGrid = (grid) => {
  const existing = grid.querySelectorAll(`.${settings.ID}-prod-cta`);
  [].forEach.call(existing, (img) => {

    img.remove();
  });
};

/**
 * Apply images to visible grid
 *
 * @param {NodeList} gridProducts
 * @param {Array} images
 */
const applyImagesToVisibleGrid = (gridProducts, images) => {
  let everyN = settings.INGRID.EVERY_NTH_CHILD;

  const addedImages = [];
  let counter = 0;

  [].forEach.call(gridProducts, (prod, idx) => {
    if((idx + 1) / everyN === 1) {
      prod.insertAdjacentHTML('afterend', itemToHtml(images[counter]));
      addedImages.push(images[counter]);
      counter += 1;

      // To allow alternative columns every 6th, then every 5th, etc.
      everyN = everyN + (
        (everyN % 2 == 0) ? settings.INGRID.EVERY_NTH_CHILD : settings.INGRID.EVERY_NTH_CHILD + 1
      );
    }
  });

  return addedImages;
};

/**
 * Run
 *
 * @param {HTMLElement} grid
 * @param {Object} imagesToShow
 */
export const runIngrid = (grid, imagesToShow) => {
  if(grid) {
    removeImagesFromVisibleGrid(grid);

    const gridProducts = grid.querySelectorAll('product');
    if(gridProducts && gridProducts.length >= settings.INGRID.EVERY_NTH_CHILD) {
      applyImagesToVisibleGrid(gridProducts, imagesToShow);
    }
  }
};
