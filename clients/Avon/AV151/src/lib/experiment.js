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
const { ID, VARIATION } = shared;

const getScrollPercent = () => {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

const startExperiment = () => {
  pollerLite(['.shopify-section.hero.hero-holiday'], () => {
    let hero = document.querySelector('.shopify-section.hero.hero-holiday');

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

              <div class="${ID}-product">

                <a href="https://avon.uk.com/products/anew-protinol-power-serum" class="${ID}-product--image">
                
                  <img src="//avon.uk.com/cdn/shop/files/prod_1223839_1_685ae7e7-37e6-4c9d-9e2a-2d032f65f015_1200x.jpg?v=1691146618" alt="Anew Renewal Protinol Power Serum" class="${ID}-product--image--img" />

                  <span class="${ID}-greylozenge">Save £6</span>
                  <span class="${ID}-purplelozenge">18% off</span>
                
                </a>

                <div class="${ID}-product--content">
                
                  <a href="https://avon.uk.com/products/anew-protinol-power-serum"> Anew Renewal Protinol Power Serum </a>
                
                  <div class="${ID}-product--contentprice">
                    <span class="${ID}-nowprice">£19.50</span>
                    <span class="${ID}-wasprice">£24.00</span>
                  </div>

                  <div class="${ID}-product--contentamount">30ml (£73.33 / 100ml)</div>
                
                </div>

                <div class="${ID}-product--atb ${window.outerWidth > 600 ? `${ID}-desktop` : `${ID}-mobile`}">
                
                  <div class="${ID}-product--atbquantity">
                    ${window.outerWidth > 600 ? `
                      <button type="button" class="${ID}-minus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                      <input type="number" id="${ID}-quantity-value" class="${ID}-quantity-value" value="1" />
                      <button type="button" class="${ID}-plus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20M12 4V20" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    ` 
                    : 
                    `
                      <select id="${ID}-quantity-value" class="${ID}-quantity-select">
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                        <option value="3"> 3</option>
                        <option value="4"> 4</option>
                        <option value="5"> 5</option>
                        <option value="6"> 6</option>
                        <option value="7"> 7</option>
                        <option value="8"> 8</option>
                        <option value="9"> 9</option>
                        <option value="10"> 10</option>
                      </select>
                    `}
                  </div>

                  <div class="${ID}-product--atbbutton">
                  
                    <button type="button" data-product-id="39569615323181" class="${ID}-addtobasket">Add to basket</button>
                  
                  </div>

                </div>

              </div>



              <div class="${ID}-product">

                <a href="https://avon.uk.com/products/far-away-original-edp-100ml" class="${ID}-product--image">
                
                  <img src="https://avon.uk.com/cdn/shop/products/prod_1227734_1_613x613_3357a846-5c34-45d5-9d81-6a766d62ed85_1200x.jpg?v=1666011368" alt="Far Away Original EDP 100ml" class="${ID}-product--image--img" />

                  <span class="${ID}-greylozenge">More sizes available</span>
                
                </a>

                <div class="${ID}-product--content">
                
                  <a href="https://avon.uk.com/products/far-away-original-edp-100ml"> Far Away Original EDP 100ml </a>
                
                  <div class="${ID}-product--contentprice">
                    <span class="${ID}-nowprice">£24.00</span>
                  </div>

                  <div class="${ID}-product--contentamount">100ml (£24 / 100ml)</div>
                
                </div>

                <div class="${ID}-product--atb ${window.outerWidth > 600 ? `${ID}-desktop` : `${ID}-mobile`}">
                
                  <div class="${ID}-product--atbquantity">
                    ${window.outerWidth > 600 ? `
                      <button type="button" class="${ID}-minus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                      <input type="number" id="${ID}-quantity-value" class="${ID}-quantity-value" value="1" />
                      <button type="button" class="${ID}-plus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20M12 4V20" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    `
        :
        `
                      <select id="${ID}-quantity-value" class="${ID}-quantity-select">
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                        <option value="3"> 3</option>
                        <option value="4"> 4</option>
                        <option value="5"> 5</option>
                        <option value="6"> 6</option>
                        <option value="7"> 7</option>
                        <option value="8"> 8</option>
                        <option value="9"> 9</option>
                        <option value="10"> 10</option>
                      </select>
                    `}
                  </div>

                  <div class="${ID}-product--atbbutton">
                  
                    <button type="button" data-product-id="41269500444717" class="${ID}-addtobasket">Add to basket</button>
                  
                  </div>

                </div>

              </div>



              <div class="${ID}-product">

                <a href="https://avon.uk.com/products/new-skin-so-soft-original-dry-oil-spray-bonus-size-250ml" class="${ID}-product--image">
                
                  <img src="https://avon.uk.com/cdn/shop/products/1226300-SP-001-GD-MAR2521-CMYK_1200x.png?v=1625121729" alt="Skin So Soft Original Dry Oil Spray Bonus Size - 250ml" class="${ID}-product--image--img" />

                  <span class="${ID}-greylozenge">More sizes available</span>
                
                </a>

                <div class="${ID}-product--content">
                
                  <a href="https://avon.uk.com/products/new-skin-so-soft-original-dry-oil-spray-bonus-size-250ml"> Skin So Soft Original Dry Oil Spray Bonus Size - 250ml </a>
                
                  <div class="${ID}-product--contentprice">
                    <span class="${ID}-nowprice">£6.50</span>
                  </div>

                  <div class="${ID}-product--contentamount">250ml (£2.40 / 100ml)</div>
                
                </div>

                <div class="${ID}-product--atb ${window.outerWidth > 600 ? `${ID}-desktop` : `${ID}-mobile`}">
                
                  <div class="${ID}-product--atbquantity">
                    ${window.outerWidth > 600 ? `
                      <button type="button" class="${ID}-minus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                      <input type="number" id="${ID}-quantity-value" class="${ID}-quantity-value" value="1" />
                      <button type="button" class="${ID}-plus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20M12 4V20" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    `
        :
        `
                      <select id="${ID}-quantity-value" class="${ID}-quantity-select">
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                        <option value="3"> 3</option>
                        <option value="4"> 4</option>
                        <option value="5"> 5</option>
                        <option value="6"> 6</option>
                        <option value="7"> 7</option>
                        <option value="8"> 8</option>
                        <option value="9"> 9</option>
                        <option value="10"> 10</option>
                      </select>
                    `}
                  </div>

                  <div class="${ID}-product--atbbutton">
                  
                    <button type="button" data-product-id="41609219768365" class="${ID}-addtobasket">Add to basket</button>
                  
                  </div>

                </div>

              </div>



              <div class="${ID}-product">

                <a href="https://avon.uk.com/products/avon-true-colour-lipstick" class="${ID}-product--image">
                
                  <img src="https://avon.uk.com/cdn/shop/products/1222635-SP-022-GD-NOV1120-CMYK_1200x.png?v=1692364367" alt="Avon True Ultra Satin Lipstick" class="${ID}-product--image--img" />

                  <span class="${ID}-greylozenge">More colours available</span>
                
                </a>

                <div class="${ID}-product--content">
                
                  <a href="https://avon.uk.com/products/avon-true-colour-lipstick"> Avon True Ultra Satin Lipstick </a>
                
                  <div class="${ID}-product--contentprice">
                    <span class="${ID}-nowprice">£6.50</span>
                    <span class="${ID}-wasprice">£8.50</span>
                  </div>

                  <div class="${ID}-product--contentamount">3.6g (£18.06 / 10g)</div>
                
                </div>

                <div class="${ID}-product--atb ${window.outerWidth > 600 ? `${ID}-desktop` : `${ID}-mobile`}">
                
                  <div class="${ID}-product--atbquantity">
                    ${window.outerWidth > 600 ? `
                      <button type="button" class="${ID}-minus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                      <input type="number" id="${ID}-quantity-value" class="${ID}-quantity-value" value="1" />
                      <button type="button" class="${ID}-plus"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12H20M12 4V20" stroke="#444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    `
        :
        `
                      <select id="${ID}-quantity-value" class="${ID}-quantity-select">
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                        <option value="3"> 3</option>
                        <option value="4"> 4</option>
                        <option value="5"> 5</option>
                        <option value="6"> 6</option>
                        <option value="7"> 7</option>
                        <option value="8"> 8</option>
                        <option value="9"> 9</option>
                        <option value="10"> 10</option>
                      </select>
                    `}
                  </div>

                  <div class="${ID}-product--atbbutton">
                  
                    <button type="button" data-product-id="39272217313325" class="${ID}-addtobasket">Add to basket</button>
                  
                  </div>

                </div>

              </div>

            </div>
          
          
          </div>

        </div>
      
      
      
      </div>
    
    `;
    if (document.querySelector(`.${ID}-container`)) {
      return;
    }
    hero.insertAdjacentHTML('afterend', newHTML);

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains(`${ID}-minus`) || e.target.closest(`.${ID}-minus`)) {
        let quantity = e.target.closest(`.${ID}-product--atbquantity`).querySelector(`.${ID}-quantity-value`);
        if (quantity.value > 1) {
          quantity.value = parseInt(quantity.value) - 1;
        }
        fireEvent(`Click - user has clicked to decrease the quantity of one of the products`, true);
      }

      if (e.target.classList.contains(`${ID}-plus`) || e.target.closest(`.${ID}-plus`)) {
        let quantity = e.target.closest(`.${ID}-product--atbquantity`).querySelector(`.${ID}-quantity-value`);
        if (quantity.value < 199) {
          quantity.value = parseInt(quantity.value) + 1;
        }
        fireEvent(`Click - user has clicked to increase the quantity of one of the products`, true);
      }
    });

    // set up event listeners

    let allCheckoutButtons = document.querySelectorAll(`.${ID}-addtobasket`);
    [].slice.call(allCheckoutButtons).forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let productId = e.target.getAttribute('data-product-id');
        let currQuantity = e.target.closest(`.${ID}-product--atb`).querySelector(`#${ID}-quantity-value`).value;

        let theData = {
          quantity: currQuantity,
          id: productId,
        };

        fireEvent(`Click - add to bag button clicked for productId: ${productId}`, true);

        window.jQuery.ajax({
          cache: true,
          type: 'POST',
          url: 'https://avon.uk.com/cart/add.js',
          data: theData,
          dataType: 'json',
          success: function () {
            e.target.innerText = 'Added';
            window.jQuery.ajax({
              cache: true,
              type: 'GET',
              dataType: 'json',
              url: 'https://avon.uk.com/cart.js',
              success: function (returnedData) {
                let basketCountElement = document.querySelector('.cart-count');
                basketCountElement.innerText = returnedData.item_count;
                if (returnedData.item_count > 0 && basketCountElement.classList.contains('no-items')) {
                  basketCountElement.classList.remove('no-items');
                }
                setTimeout(() => {
                  e.target.innerText = 'Add to basket';
                }, 3000);
              },
            });
          },
        });
      });
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

export default () => {
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

  startExperiment();
};
