import { shuffle } from '../../../../../../../lib/utils/arrays';

export default () => {
  const settings = { ID: 'ME194', NUM_TO_SHOW: 6, EVERY_NTH_CHILD: 6 };

  const imagesConfig = [
    {
      classLabel: 'ME194-official',
      textHTML:
      '<span>Unless you have a time travelling quantum suit, once they\'re gone they\'re gone!</span>',
      id: 1,
    },
    {
      classLabel: 'ME194-official',
      textHTML:
      '<span>Feel like a real Avenger with rare, limited edition gear</span>',
      id: 2,
    },
    {
      classLabel: 'ME194-official',
      textHTML:
      '<span>High quality products that would even make Stark Industries proud</span>',
      id: 3,
    },
  ];
    /**
     * Create HTML for an object item
     *
     */
    const itemToHtml = prod => {
      let html = '';
      if (prod && prod.textHTML) {
        html += `
        <li class="ME194-gridBlock product-small grid-2-break ${prod.classLabel}">
          <div class="ME194-product_text">${prod.textHTML}</div>
        </li>
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
    const run = (grid, imagesToShow, numAvailable) => {
      if (grid) {
        removeImagesFromVisibleGrid(grid);

        const gridProducts = grid.querySelectorAll('.product-small');
        if (gridProducts && gridProducts.length >= settings.EVERY_NTH_CHILD) {
          applyImagesToVisibleGrid(gridProducts, imagesToShow);

          const prodCtas = document.querySelectorAll(`.${settings.ID}-prod-cta`);

          [].forEach.call(prodCtas, (prodCta) => {
            const isInView = checkInView(prodCta);
            if (isInView) {
              prodCta.classList.add(`${settings.ID}-flagged-in-view`);
            }
          });
        }
      }
    };

    // ----------------------------------------------------------
    // Add images
    // ----------------------------------------------------------
      const grid = document.querySelector('.entry-content');
      const imagesToShow = shuffle(imagesConfig).slice(0,settings.NUM_TO_SHOW);
      const numAvailable = imagesToShow.length;

      run(grid, imagesToShow, numAvailable);
};

