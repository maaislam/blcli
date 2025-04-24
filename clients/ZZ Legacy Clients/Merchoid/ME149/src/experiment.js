import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME149',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    components.brandsTitle();
    components.subHeading();
    components.changeGrid();

    if (settings.VARIATION === '2') {
      components.stickyFilterBar();
      components.createfilterBox();
      components.addCategories();
      components.showHideLightbox();
      components.activeFilters();
      components.showHideCategories();
      components.exitLightbox();

      // if product is zelda
      const brand = document.querySelector('[property="og:brand"]').content;
      if (brand === 'Legend of Zelda') {
        components.bestSellers();
      }
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc change the grid classes
     */
    changeGrid: function changeGrid() {
      const grid = document.querySelectorAll('.product-small');
      for (let i = 0; i < grid.length; i += 1) {
        const element = grid[i];
        element.classList.remove('small-block-grid-3');
        element.classList.remove('grid-3-break');
        element.classList.remove('grid3');
        element.classList.add('small-block-grid-2');
        element.classList.add('grid2');
        element.classList.add('grid-2-break');
        element.parentNode.classList.remove('small-block-grid-3');
        element.parentNode.classList.add('small-block-grid-2');
      }
    },
    /**
     * @desc Create the merchoid X brand title
     */
    brandsTitle: function brandsTitle() {
      const brandLogo = document.querySelector('.row.brand-byline .brand-image').getAttribute('src');
      const newBrandCollabBlock = document.createElement('div');
      newBrandCollabBlock.classList.add('ME149-brand_collab');
      newBrandCollabBlock.innerHTML = `<div class="ME149-merchoid_logo"></div><div class="ME149-times"></div><div class="ME149-brand_logo" style ="background-image: url('${brandLogo}')"></div>`;

      const productTitle = document.querySelector('.cat-header');
      productTitle.insertAdjacentElement('afterend', newBrandCollabBlock);
    },
    /**
     * @desc Add subheading under title
     */
    subHeading: function subheading() {
      const brandTitle = document.querySelector('[property="og:brand"]').content;
      const brandCollab = document.querySelector('.ME149-brand_collab');
      const subTitle = document.createElement('div');
      subTitle.classList.add('ME149-premium_text');
      subTitle.innerHTML = `- Officially Licensed <span class="ME149-brand">${brandTitle}</span> Merchandise -`;
      brandCollab.insertAdjacentElement('afterend', subTitle);
    },
    /**
     * @desc Create the sticky filter bar
     */
    stickyFilterBar: function stickyFilterBar() {
      const filterBar = document.createElement('div');
      filterBar.classList.add('ME149-filter_bar');
      filterBar.innerHTML = '<span class="ME149-sticky_bar">Refine Products</div>';
      document.body.appendChild(filterBar);
    },
    /**
     * @desc Create the filter popup box
     */
    createfilterBox: function createfilterBox() {
      const filterBox = document.createElement('div');
      filterBox.classList.add('ME149-filters_box');
      filterBox.innerHTML = `
      <div class="ME149-filters">
        <div class="ME149-exit">&times;</div>
        <h3>- Refine Products -</h3>
        <div class="ME149-filterlist">
          <span>Product Category</span>
          <div class="ME149-categories"></div>
          <div class="ME149-refine_button"><span>Refine</span></div>
        </div>
      </div>`;
      document.body.appendChild(filterBox);
    },
    /**
     * @desc Get the categories on the page, put in array and
     * then add them to a list in the filter box
     */
    addCategories: function addCategories() {
      const categoriesArr = [];
      const allCategories = document.querySelectorAll('.section-category-heading');
      for (let i = 0; i < allCategories.length; i += 1) {
        const element = allCategories[i];
        const categoryText = element.textContent;
        categoriesArr.push(categoryText);
      }
      /**
      * @desc loop through array, add the categories as li
      */
      for (let j = 0; j < categoriesArr.length; j += 1) {
        const element = categoriesArr[j];
        const filterOption = document.createElement('div');
        filterOption.classList.add('ME149-filter_option');
        filterOption.innerHTML = `<span>${element}</span>`;

        document.querySelector('.ME149-categories').appendChild(filterOption);
      }
    },
    /**
     * @desc add active on click of filters
     */
    activeFilters: function activeFilters() {
      const popUpFilters = document.querySelectorAll('.ME149-filter_option');
      popUpFilters.forEach((element) => {
        element.addEventListener('click', () => {
          if (!element.classList.contains('ME149-filter_active')) {
            element.classList.add('ME149-filter_active');
          } else {
            element.classList.remove('ME149-filter_active');
          }
        });
      });
    },
    /**
     * @desc Show the lightbox on click of refine button
     */
    showHideLightbox: function showHideLightbox() {
      const filterBar = document.querySelector('.ME149-filter_bar');
      const filterBox = document.querySelector('.ME149-filters_box');
      filterBar.addEventListener('click', () => {
        document.body.classList.add('ME149-no_scroll');
        filterBox.classList.add('ME149-box_active');
      });
    },
    /**
     * @desc When the refine button is clicked, loop through the categories
     * on the page, if matching category is active, show it, if not add class
     * to hide it
     */
    showHideCategories: function showHideCategories() {
      const refineButton = document.querySelector('.ME149-refine_button');
      const filterBox = document.querySelector('.ME149-filters_box');
      refineButton.addEventListener('click', () => {
        // hide the filter box
        filterBox.classList.remove('ME149-box_active');
        document.body.classList.remove('ME149-no_scroll');


        const brandCategories = document.querySelectorAll('.brand-category');
        for (let i = 0; i < brandCategories.length; i += 1) {
          const brandCategory = brandCategories[i];
          const categoryText = brandCategory.querySelector('h2').textContent;
          const activeFilters = document.querySelectorAll('.ME149-filter_option.ME149-filter_active');
          if (activeFilters.length) {
            brandCategory.classList.add('ME149-category-hidden');
          } else {
            brandCategory.classList.remove('ME149-category-hidden');
          }
          [].forEach.call(activeFilters, (element) => {
            const activeFilterText = element.textContent;
            if (activeFilterText === categoryText) {
              brandCategory.classList.remove('ME149-category-hidden');
            }
          });
        }
      });
    },
    /**
     * @desc lightbox exit click
     */
    exitLightbox: function exitLightbox() {
      const filterBox = document.querySelector('.ME149-exit');
      filterBox.addEventListener('click', () => {
        document.querySelector('.ME149-filters_box').classList.remove('ME149-box_active');
        document.body.classList.remove('ME149-no_scroll');
        const allCategories = document.querySelectorAll('.section-category-heading');
        for (let i = 0; i < allCategories.length; i += 1) {
          const element = allCategories[i];
          element.classList.remove('ME149-category-hidden');
        }
      });
      const filterOverlay = document.querySelector('.ME149-filters_box');
      const innerFilters = document.querySelector('.ME149-filters');
      filterOverlay.addEventListener('click', () => {
        document.body.classList.remove('ME149-no_scroll');
        document.querySelector('.ME149-filters_box').classList.remove('ME149-box_active');
        const allCategories = document.querySelectorAll('.section-category-heading');
        for (let i = 0; i < allCategories.length; i += 1) {
          const element = allCategories[i];
          element.classList.remove('ME149-category-hidden');
        }
      });
      innerFilters.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    },
    /**
     * @desc Add best sellers at the top of the page
     */
    bestSellers: function bestSellers() {
      // create the best selling wrapper
      const bestSellingWrap = document.createElement('div');
      bestSellingWrap.classList.add('ME149-bestSellers');
      bestSellingWrap.innerHTML = '<h3>Best Sellers</h3><div class="ME149-bestSelling_products"></div>';

      const productWrap = document.querySelector('.row.category-page .large-12.columns');
      productWrap.insertBefore(bestSellingWrap, productWrap.firstChild);

      const bestSelling = ['Zelda: Breath of the Wild Cosplay Hoodie', 'Legend of Zelda: Too Hyrule For School Link Backpack', 'Zelda: Zelda Lullaby Ladies Nightwear Set', 'Zelda: Write Your Legend Ladies Hoodie'];
      const products = document.querySelectorAll('.products .product-small');
      [].forEach.call(bestSelling, (element) => {
        for (let index = 0; index < products.length; index += 1) {
          const brandProduct = products[index];
          const productName = brandProduct.querySelector('.name');

          if (productName) {
            if (productName.textContent === element) {
              const bestSeller = brandProduct.cloneNode(true);
              document.querySelector('.ME149-bestSelling_products').appendChild(bestSeller);
            }
          }
        }
      });
    },
  },
};

export default Experiment;
