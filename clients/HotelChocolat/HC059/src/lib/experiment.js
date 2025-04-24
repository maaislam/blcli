/**
 * HC059 - Search Improvements
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/about-the-velvetiser.html
 */
import { cookieOpt, setup, clickEvents } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  cookieOpt();

  // Write experiment code here
  pollerLite(['#search-suggestions'], () => {
    // alert('search suggestions');
    const searchSuggestionsEl = document.querySelector('#search-suggestions');
    searchSuggestionsEl.classList.add('active');
    searchSuggestionsEl.classList.add(`${ID}-search-suggestions`);


    const newSearchSuggestionsContainer = `<div id="search-suggestion-wrapper" class="${ID}-search-suggestion-wrapper search-suggestion-wrapper full">
      <div class="product-suggestions">
        <div class="search-phrase">
          <div class="${ID}-offer__img">
            <span class="results-title">The Velvetiser</span>
            <p class="${ID}-subtitle">In-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit.</p>
          </div>
          <div class="${ID}-offer__desc">
            <ul class="${ID}-velvetiserOptions__wrapper">
              <a href="/uk/velvetiser-hot-chocolate-machine.html" id="copper-velvetiser"><li class="${ID}-velvetiser__option">
                <img width="180" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw426a7268/images/472726-2.jpg?sw=500&sh=500&sm=fit">
                <button class="${ID}-choose-velvetiser">Shop Copper</button>
              </li></a>
              <a href="/uk/velvetiser-hot-chocolate-maker.html" id="charcoal-velvetiser"><li class="${ID}-velvetiser__option">
                <img width="180" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwab63b057/images/472727-2a.jpg?sw=500&sh=500&sm=fit">
                <button class="${ID}-choose-velvetiser">Shop Charcoal</button>
              </li></a>
              <a href="/uk/velvetiser-hot-chocolate-pack.html" id="white-velvetiser"><li class="${ID}-velvetiser__option">
                <img width="180" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwdabba475/images/472725-2.jpg?sw=500&sh=500&sm=fit">
                <button class="${ID}-choose-velvetiser">Shop White</button>
              </li></a>
            </ul>
          </div>
        </div>
      </div>
      <div class="phrase-suggestions">
        <div class="hitgroup">
          <h4 class="header">Popular Searches</h4>
          <a class="hit" href="/uk/shop/collections/products/all-products/">Shop All Chocolate</a>
          <a class="hit" href="/uk/shop/collections/prices/chocolate-offers/">Offers</a>
          <a class="hit" href="/uk/shop/collections/products/selectors/">Selectors</a>
          <a class="hit" href="/uk/shop/collections/products/hot-chocolate/">Hot Chocolate</a>
          <a class="hit" href="/uk/shop/collections/">Chocolate Collections</a>
          <a class="hit" href="/uk/shop/gift-ideas/shop-by-occasion/birthday/">Birthday Gifts</a>
          <a class="hit" href="/uk/shop/gift-ideas/">Gift Ideas</a>
        </div>
        <div class="offer-mobile">
          <a href="/uk/velvetiser-hot-chocolate-maker.html">
            <h2>The Velvetiser - Charcoal Edition</h2>
            <div class="offer__img" style="background-image: url('https://editor-assets.abtasty.com/48343/609a8afc34d4e1620740860.jpg');">
            <button id="HC059-choose-velvetiser" type="button" title="Choose Yours Now" value="Choose Yours Now" class="button-fancy-large add-to-cart">Shop Now</button>
            </div>
          </a>
        </div>
      </div>  
    </div>`;

    setTimeout(() => {
      searchSuggestionsEl.insertAdjacentHTML('afterbegin', newSearchSuggestionsContainer);
      searchSuggestionsEl.setAttribute('style', 'display: block;');

      clickEvents();
    }, 500);
    


    // observer.connect(document.querySelector('#search-suggestions'), () => {
    //   console.log('SOMETHING HAS CHANGED-------');
    //   if (searchSuggestionsEl.classList.contains('active')) {
    //     console.log('>>>SHOWN');
    //   }
    // }, {
    //   throttle: 200,
    //   config: {
    //     attributes: false,
    //     childList: true,
    //     // subtree: true,
    //   },
    // });
  });

  
};


export default activate;
