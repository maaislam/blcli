import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import resultCards from './components/resultCards';
import getBasketRecommendations from './helpers/getBasketRecommendations';
import addToBag from './helpers/addToBag';
import getProducts from './helpers/getProducts';

const { ID, VARIATION } = shared;

const reset = () => {
  const suggestionWrapper = document.querySelector(`.${ID}__searchSuggestionWrapper`);
  if (suggestionWrapper) {
    suggestionWrapper.remove();
  }

  document.documentElement.classList.remove(`${ID}__noScroll`);
}

const setSearchSuggestions = () => {
  getBasketRecommendations()
    .then(data => {
      if (data && data.recommendations) {
        const { recommendedProducts } = data.recommendations;

        if (VARIATION === 'control') {
          if (!document.body.classList.contains(`${ID}__conditionMet-control`)) {
            fireBootsEvent('User would have seen the search suggestion', true, eventTypes.experience_action, {
              action: actionTypes.view_search_results,
              action_detail: 'User would have seen the search suggestion',
            });
  
            document.body.classList.add(`${ID}__conditionMet-control`);
          }

          return;
        }

        if (!document.body.classList.contains(`${ID}__conditionMet-var`)) {
          fireBootsEvent('User has seen the search suggestion', true, eventTypes.experience_action, {
            action: actionTypes.view_search_results,
            action_detail: 'User has seen the search suggestion',
          });

          document.body.classList.add(`${ID}__conditionMet-var`)
        }

        const skus = recommendedProducts.map(product => product.id);

        getProducts(skus).then((products) => {
          // console.log('products: ', products);
          const header = document.querySelector('#header');
          
          const searchSuggestionHtml = `
          <div class="${ID}__searchSuggestionWrapper">
            <div class="${ID}__searchSuggestion">
              <div class="${ID}__searchSuggestion-title">Related to products in your basket</div>
              ${resultCards(ID, products)}
            </div>
            <div class="${ID}__overlay"></div>
          </div>`;

          if (!document.querySelector(`.${ID}__searchSuggestionWrapper`)) {
            header.insertAdjacentHTML('beforebegin', searchSuggestionHtml);
            document.documentElement.classList.add(`${ID}__noScroll`);
          }
        })
        .catch(error => console.log('Error fetching products:', error));
      }
    })
    .catch(error => console.log('Error fetching basket recommendations:', error));
};

const searchInputHandler = (target) => {
  const { value } = target;

  if (value.length > 0) {
    reset();
    return;
  } else {
    setSearchSuggestions();
  }
};

const fireAddToCartEvent = () => {
  fireBootsEvent('User adds a product to basket', true, eventTypes.experience_action, {
    action: actionTypes.add_to_cart,
    action_detail: 'User adds a product to basket',
  });
}

export default () => {
  const testID = `${ID}|Post ATB cross sell`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;


  bootsEvents.initiate = true;
  bootsEvents.methods = ["datalayer"];
  bootsEvents.property = "G-C3KVJJE2RH";
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    const searchSuggestionWrapper = document.querySelector(`.${ID}__searchSuggestionWrapper`);
    const searchInput = document.querySelector('#AlgoliaSearchInput');
    const searchInputCondition = searchInput && searchInput.value.length === 0;

    const searchSelectorConditions = target.closest('#mobileLink_search') || target.closest('#searchBarInput')

    const setSearchSuggestionConditions = searchInputCondition && searchSelectorConditions && !searchSuggestionWrapper;

    if (setSearchSuggestionConditions) {
      setSearchSuggestions();
    } else if ((target.closest('#oct-basket-container') || target.closest(`#${ID}__overlay`)) && searchSuggestionWrapper) {
      reset();
    } else if (target.closest(`#${ID}__atc`)) {
      e.preventDefault();
      const sku = target.closest(`#${ID}__atc`).getAttribute('data-sku');
      fireAddToCartEvent();
      addToBag(sku);
      reset();
    } else if ((target.closest('#mobileLink_search') || target.closest('#mobileLink_basket') || target.closest('#mobileLink_burger')) && searchSuggestionWrapper) {
      reset();
    } else if (target.closest(`#${ID}__viewBtn`)) {
      e.preventDefault();
      fireBootsEvent('User views a product', true, eventTypes.experience_action, {
        action: actionTypes.view_product,
        action_detail: 'User views a product',
      });
      const pathname = target.closest(`#${ID}__viewBtn`).getAttribute('data-url');
      window.location.href = `${window.location.origin}${pathname}`;
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const getSearchBoxDimensions = () => {
    const searchBox = document.querySelector('#searchBox');
    if (!searchBox) return;
    const { width, left } = searchBox.getBoundingClientRect();
    return { width, left };
  }

  const updateSearchSuggestionStyles = () => {
    const searchBox = document.querySelector('#searchBox');
    if (!searchBox) return;
    
    const { width: searchBoxWidth, left: searchBoxLeft } = getSearchBoxDimensions();

    const headerWrapper = document.querySelector('#headerWrapper');
    // Set max-width & left based on #searchBox width and left position
    headerWrapper.style.setProperty('--searchSuggestionWidth', `${searchBoxWidth}px`);
    headerWrapper.style.setProperty('--searchSuggestionLeft', `${searchBoxLeft}px`);
  }
  updateSearchSuggestionStyles();
  window.addEventListener('resize', updateSearchSuggestionStyles);

  const searchBox = document.querySelector('#AlgoliaSearchInput');
  searchBox.addEventListener('input', (e) => searchInputHandler(e.target));
};
