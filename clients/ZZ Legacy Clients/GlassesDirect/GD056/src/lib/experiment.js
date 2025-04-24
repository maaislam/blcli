import { setup } from './services';
import { events } from '../../../../../lib/utils';
import { observer, pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

const activate = () => {
  setup();
  const { ID } = settings;

  // Changes
  const pageChanges = {
    Category: () => {
      // Update default home trial label
      const newHomeTrialLabel = 'Try<br/>For Free';
      pollerLite([
        () => {
          try {
            return !!window.gd.pages.category.categoryHomeTrial;
          } catch (e) {}
        },
      ], () => {
        window.gd.pages.category.categoryHomeTrial.labels.notInList = newHomeTrialLabel;
      });

      const buildButtons = () => {
        // Change [buy now] to [view]
        const products = document.querySelectorAll('.product');
        [].forEach.call(products, (product) => {
          if (product.getAttribute(`data-${ID}-modified`) === null) {
            // Prevent from being modifed more than once
            product.setAttribute(`data-${ID}-modified`, '');

            const addToBag = product.querySelector('.add-to-basket');
            const url = product.querySelector('.product-link').href;

            // Create new cta
            addToBag.insertAdjacentElement('beforebegin', (() => {
              const element = document.createElement('a');
              element.className = 'action btn btn-action action-basket';
              element.href = url;
              element.innerHTML = 'View frame';
              element.addEventListener('click', () => {
                events.send(ID, 'User clicked', 'View frame');
              });
              return element;
            })());

            // Hide add to bag form
            addToBag.style.display = 'none';

            // Change home trial text
            const hometrial = product.querySelector('.action-hometrial');
            if (hometrial.getAttribute('data-action') !== 'remove') {
              hometrial.innerHTML = newHomeTrialLabel;
            }
          }
        });
      };

      // Apply changes to new products on load
      const searchProductList = document.querySelector('#search-results');
      observer.connect(searchProductList, buildButtons, {
        config: {
          attributes: true,
          childList: true,
          nodeTree: false,
        },
      });

      // On page load
      buildButtons();
    },

    Product: () => {
      const addToBasket = document.querySelector('#action-basket');
      if (addToBasket.innerText.trim().toUpperCase() === 'ADD TO BASKET') {
        addToBasket.innerText = 'Select lenses';
      }
    },
  };

  // Init
  const pageType = window.universal_variable.page.type;
  if (typeof pageChanges[pageType] === 'function') {
    pageChanges[pageType]();
  }
};

export default activate;
