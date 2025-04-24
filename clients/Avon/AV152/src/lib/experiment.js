/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import debounce from 'lodash/debounce';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import quantitySelector from './components/quantitySelector';
import addToCart from './helpers/addToBasket';
import productCard from './components/productCard';
const { ID, VARIATION } = shared;

const getScrollPercent = () => {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

const startExperiment = (products) => {
  pollerLite(['.ContentRow', '[alt="Advent Calandars."]'], () => {
    let hero = document.querySelector('[alt="Advent Calandars."]').closest('.ContentRow');

    let newHTML = `
    
      <div class="${ID}-container">
      
        <div class="container-fluid">

          <a href="https://avon.uk.com/collections/bestsellers" class="${ID}-banner" id="${ID}-banner-link">

            <div class="${ID}-banner--content">
              <h2>Top Rated Staples you can trust</h2>
              <p> The most loved products, bought time and time again. </p>
              <button type="button" class="${ID}-button">Shop Now</button>
            </div>

            <div class="${ID}-banner--image"></div>
          
          </a>

          <div class="${ID}-toprated">
          
            <h2>Top Rated</h2>

            <div class="${ID}-products">

              ${products.map((product) => productCard(ID, product)).join('\n')}

            </div>
          
          
          </div>

        </div>
      
      
      
      </div>
    
    `;

    hero.insertAdjacentHTML('afterend', newHTML);

    // set up event listeners

    document.body.addEventListener('click', (e) => {
      const { target } = e;
      const inputBox = target.closest(`.${ID}-product`)?.querySelector('input');
      const targetMatched = (targetSelector) => target.matches(targetSelector) || target.closest(targetSelector);
      //const parentElm = target.closest(`.${ID}__banner-block`);
      if (e.target.classList.contains(`${ID}-addtobasket`)) {
        e.preventDefault();
        const card = target.closest(`.${ID}-product`);
        const currentSku = target.closest(`.${ID}-product--atb`).getAttribute('data-sku');

        card.classList.add('adding');
        console.log(currentSku);

        addToCart(currentSku, parseInt(inputBox.value)).then((res) => {
          location.reload();
          //   setTimeout(() => {
          //     card.classList.remove('adding');
          //     console.log(res);
          //     //const imgSrc = card.querySelector(`.${id}__img--wrapper>img`).getAttribute('src');
          //     //updateMinicart(res, imgSrc);
          //   }, 1500);
        });
        fireEvent(`Click - Add To Bag button clicked for: ${e.target.href}`, true);
      } else if (targetMatched(`.${ID}__plus-btn`)) {
        inputBox.value = parseInt(inputBox.value) + 1;
        fireEvent('Interactions with quantity');
      } else if (targetMatched(`.${ID}__minus-btn`)) {
        inputBox.value = parseInt(inputBox.value <= 1 ? 2 : inputBox.value) - 1;
        fireEvent('Interactions with quantity');
      }
    });
  });
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    // Nav tracking
    if (e.target.closest('#site-navigation')) {
      let closestA = e.target.closest('a');
      let navText = closestA.innerText;
      fireEvent(`Click - ${navText} clicked in nav`, true);
    }

    // Search tracking
    if (e.target.closest('#header-search')) {
      fireEvent(`Click - Search clicked in nav`, true);
    }

    // ATB tracking
    if (e.target.closest('.btn-basket') && e.target.closest('.product-listing')) {
      let closestProduct = e.target.closest('.product-listing');
      let productTitle = closestProduct.querySelector('.product-title > a').innerText;
      let quantity = closestProduct.querySelector('.product-quantity').value;
      fireEvent(`Click - ATB clicked on existing product carousel, adding ${quantity} of ${productTitle}`, true);
    }

    if (e.target.closest(`#${ID}-banner-link`)) {
      fireEvent(`Click - Banner clicked to go to https://avon.uk.com/collections/bestsellers`, true);
    }

    if (e.target.closest(`.${ID}-product`) && e.target.closest(`a`)) {
      let closestProduct = e.target.closest(`.${ID}-product`);
      let productTitle = closestProduct.querySelector(`.${ID}-product--content > a`).innerText;
      let productHref = closestProduct.querySelector(`.${ID}-product--content > a`).href;
      fireEvent(`Click - Product clicked to go to ${productHref}, product title: ${productTitle}`, true);
    }
  });

  window.addEventListener(
    'scroll',
    debounce(() => {
      if (getScrollPercent() > 25) {
        fireEvent(`Interaction - user has got to Scroll Depth 25%`, true);
      }

      if (getScrollPercent() > 50) {
        fireEvent(`Interaction - user has got to Scroll Depth 50%`, true);
      }

      if (getScrollPercent() > 75) {
        fireEvent(`Interaction - user has got to Scroll Depth 75%`, true);
      }

      if (getScrollPercent() > 95) {
        fireEvent(`Interaction - user has got to the bottom of the page`, true);
      }
    }, 100)
  );
};

export default (products) => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment(products);
};
