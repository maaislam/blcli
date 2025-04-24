/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { observer, pollerLite } from '../../../../../lib/uc-lib';
import ViewTypes from './components/PLPviewsMarkup';
import stickyFilter from './components/filterChanges';
import stickyOuterFilters from './components/stickyOuterFilters';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  /**
  * move the top filters below the title
  * add active if filters are on the page
  */
  const moveFilters = () => {
    const filterSort = document.querySelector('.browse__sort-container.mobile-and-tablet-only');
    const pageTitle = document.querySelector('.browse__header-section h1');

    pageTitle.insertAdjacentElement('afterend', filterSort);

    const filtersBeingShown = document.querySelectorAll('.browse__applied-filters__item');
    if (filtersBeingShown && filtersBeingShown.length > 1) {
      const allFilters = document.querySelectorAll('.browse__applied-filters__item').length - 1;
      filterSort.classList.add(`${settings.ID}-filters_active`);
      filterSort.querySelector('button').textContent = `Filter (${allFilters})`;
    } else {
      filterSort.classList.remove(`${settings.ID}-filters_active`);
      filterSort.querySelector('button').textContent = 'Filter';
    }
  };
  moveFilters();

  /* Add the main sticky filter */
  stickyOuterFilters();

  /**
  * add the new views
  */
  const productViews = new ViewTypes();

  /**
  * move elements within the product listings
  */
  const changeInnerProducts = () => {
    // change the product inner elements depending
    const allProducts = document.querySelectorAll('#list .product-tile.js-product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];

      // make the first word bold
      const productTitle = element.querySelector('.product-tile__description');
      if (productTitle) {
        productTitle.innerHTML = productTitle.innerHTML.replace(/^\s*\w+/, '<span>$&</span>');
      }

      const productName = element.querySelector('.product-tile__description');
      // change the image src so it's not as pixelated
      const image = element.querySelector('.product-tile__image-container img');
      let productSrc;
      // get the image attribute
      if (image.getAttribute('data-srcset')) {
        productSrc = image.getAttribute('data-srcset');
      } else {
        productSrc = image.getAttribute('srcset');
      }


      // change the colour of the savings price
      
      pollerLite(['.product-tile__savings'], () => {
        const savingPrice = element.querySelector('.product-tile__savings');
        if(savingPrice) {
          element.querySelector('.product-tile__savings').innerText = element.querySelector('.product-tile__savings').innerText.replace(/((Save)\s(£)[\d.\s]+)|((Save)\s)/gmi,'');
          element.querySelector('.product-tile__price span').style = 'color: #DD223B';
        }
      });
        

      // add classes to the el if there are no reviews/sale price for styling
      const reviewSelector = element.querySelector('.rating-stars__stars');
      const savingPrice = element.querySelector('.product-tile__savings');
      if(!element.classList.contains(`${settings.ID}-noSaleReview`) || !element.classList.contains(`${settings.ID}-noReview`) || !element.classList.contains(`${settings.ID}-noSale`)) {
        if (!reviewSelector && !savingPrice) {
          element.classList.add(`${settings.ID}-noSaleReview`);
        }
        else if (!reviewSelector) {
          element.classList.add(`${settings.ID}-noReview`);
        }
        else if (!savingPrice) {
          element.classList.add(`${settings.ID}-noSale`);
        }
      }

      const productMatch = productSrc.match(/.+(cloudfront).+(\/)[\d]+(-)(606)/);
      if (productMatch && productMatch[0].trim()) {
        image.setAttribute('src', productMatch[0].trim());
      }


      const priceContainer = element.querySelector('.product-tile__pricing-container');

      // move the price to below the title - remove this is price is same as wireframe
      const offersContainer = element.querySelector('[itemprop=offers]');
      if (offersContainer) {
        productName.insertAdjacentElement('afterend', offersContainer);
      }

      // move the price to the bottom
      const savingsPrice = element.querySelector('.product-tile__savings');
      if (savingsPrice) {
        savingsPrice.insertAdjacentElement('afterend', element.querySelector('.product-tile__horizontal-item'));
      }

      // Get the last listed price from "note" text
      const lastListedEl = element.querySelector('.enhanced-web-prices');
      if (lastListedEl) {
        if (lastListedEl.textContent) {
          const lastListedElText = lastListedEl.textContent.match(/[£](\d+(?:\.\d{1,2})?)/);
          if (lastListedElText) {
            priceContainer.querySelector('.product-tile__savings').insertAdjacentHTML('afterbegin', `<div class="${settings.ID}-lastPrice">£${lastListedElText[0]}</div>`);
          }
        }
      }
      const financeMessage = element.querySelector('.product-tile__ifc-monthly-pricing');
      if (financeMessage) {
        const financePrice = financeMessage.querySelector('strong').textContent;
        offersContainer.insertAdjacentHTML('afterend', `<div class="${settings.ID}-finance"><p>From <span>${financePrice}</span> p/m</p></div>`);
      
        // add another finance message for the list view
        const productTitle = element.querySelector('[itemprop="offers"]');
        productTitle.insertAdjacentHTML('afterend', `<div class="${settings.ID}-financeSecond"><p>From <span>${financePrice}</span> p/m</p></div>`);
      
      }
    }
  };
  changeInnerProducts();


  const moveReviews = () => {
    const allProducts = document.querySelectorAll('#list .product-tile.js-product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];

      // move the reviews
      const reviews = element.querySelector('.rating-stars');
      if (reviews) {
        element.querySelector('.product-tile__image-container').appendChild(reviews); // remove this is price is same as wireframe
        
        const secondReviews = document.createElement('div');
        secondReviews.classList.add(`${settings.ID}-reviewsView`);
        secondReviews.innerHTML = reviews.innerHTML;

        element.querySelector('.product-tile__description').insertAdjacentElement('afterend', secondReviews);
      }
    }
  };
  moveReviews();

  /**
  * change the way the sticky filter works
  */
  stickyFilter();

  /**
  * remove all changes for the observer
  */
  const removeAllProducts = () => {
    const allProducts = document.querySelectorAll('.product-tile-list__item.js-product-list-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const financeButton = element.querySelector(`.${settings.ID}-finance`);
      const secondFinanceButton = element.querySelector(`.${settings.ID}-financeSecond`);
      if (financeButton) {
        financeButton.remove();
        secondFinanceButton.remove();
      }
      const newlastPrice = element.querySelector(`.${settings.ID}-lastPrice`);
      if (newlastPrice) {
        newlastPrice.remove();
      }

      // add classes to the el if there are no reviews/sale price for styling
      const reviewSelector = element.querySelector('.rating-stars__stars');

      const savingPrice = element.querySelector('.product-tile__savings');

      if(!element.classList.contains(`${settings.ID}-noSaleReview`) || !element.classList.contains(`${settings.ID}-noReview`) || !element.classList.contains(`${settings.ID}-noSale`)) {
        if (!reviewSelector && !savingPrice) {
          element.classList.remove(`${settings.ID}-noSaleReview`);
        }
        else if (!reviewSelector) {
          element.classList.remove(`${settings.ID}-noReview`);
        }
        else if (!savingPrice) {
          element.classList.remove(`${settings.ID}-noSale`);
        }
      }

    }

    const views = document.querySelector(`.${settings.ID}_viewTypes`);
    if (views) {
      views.remove();
    }

    const allSecondaryReviews = document.querySelectorAll(`.${settings.ID}-reviewsView`);
    for (let index = 0; index < allSecondaryReviews.length; index += 1) {
      const element = allSecondaryReviews[index];
      element.remove();
    }
  };

  // when the show more button is clicked, rebuilt if filtered then clicked
  const showMoreProducts = () => {
    const showMore = document.querySelector('#js-load-next');
    showMore.addEventListener('click', () => {
      removeAllProducts();
      const productViews = new ViewTypes();
      changeInnerProducts();
      moveFilters();
      moveReviews();
    });
  };
  showMoreProducts();

  /**
  * If any changes are made on the page, remove everything and re-add it
  */
  observer.connect([document.querySelector('.product-tile-list.js-infinite-scroll')], () => {
    removeAllProducts();
    const productViews = new ViewTypes();
    changeInnerProducts();
    moveFilters();
    moveReviews();
    // stickyFilter();
  }, {
    throttle: 1000,
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });

  /**
  * observer for when the filters are clicked and rebuilt
  */
  observer.connect([document.querySelector('.browse__main-content')], () => {
    removeAllProducts();
    const productViews = new ViewTypes();
    changeInnerProducts();
    moveFilters();
    stickyFilter();

    const removeClearAll = () => {
      const clearButton = document.querySelector('#filter-modal .button-holder #clear');
      if (clearButton && clearButton.style.display === 'none') {
        clearButton.classList.add(`${settings.ID}-clear_button-hide`);
      } else {
        clearButton.classList.remove(`${settings.ID}-clear_button-hide`);
      }
    };
    removeClearAll();
    moveReviews();
  }, {
    throttle: 1000,
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });

  // trigger the filter scroll on click if nothing is done
  const filterButton = document.querySelector('.cta.js-modal-trigger.filter-toggle');
  if (filterButton) {
    filterButton.addEventListener('click', () => {
      stickyFilter();
      events.send(`${settings.ID} v${settings.VARIATION}`, 'filter click', `${settings.ID} v${settings.VARIATION} filter click`);
      removeAllProducts();
      const productViews = new ViewTypes();

      const stickFilter = document.querySelector(`.${settings.ID}-filterbar`);
      if (stickFilter) {
        stickFilter.remove();
      }
    });
  }

  // when the filter is closed/opened
  observer.connect([document.querySelector('#filter-modal')], () => {
    removeAllProducts();
    const productViews = new ViewTypes();
    stickyFilter();
    moveFilters();
    moveReviews();
    showMoreProducts();
  }, {
    throttle: 1000,
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });
};

export default activate;
