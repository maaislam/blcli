/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  const newGiftBuilderIntroText = `
  Go the extra mile and build them a gift that’s tailored to suit their wellbeing. <span class="${ID}-bold">Choose three or more products to get 25% off.</span>`;

  pollerLite(['#shopify-section-gift-builder .gift-builder__hero'], () => {
    let giftRefresh = localStorage.getItem('giftRefresh');
    if (giftRefresh) {
      localStorage.removeItem('giftRefresh');

      // const miniBagLinePrices = document.querySelectorAll('.mini-cart-items .mini-cart-item.non-cracker span[rv-html="item.line_price | money Currency.currentCurrency"]');

      const miniBagGiftItems = document.querySelectorAll(
        `.mini-cart-items .mini-cart-item.non-cracker[rv-class-non-cracker="item.properties._main_cracker | neq 'true'"]`
      );
      console.log(miniBagGiftItems);
      // const applyDiscount = localStorage.getItem("applyDiscountMiniCart");
      // console.log(applyDiscount);

      let totalGiftQuantity = 0;

      miniBagGiftItems.forEach((giftItem) => {
        const quantity = parseInt(
          giftItem.querySelector(`span[rv-html="item.quantity | prepend 'x'"]`).textContent.split('x')[1]
        );
        totalGiftQuantity += quantity;
      });

      if (totalGiftQuantity > 2) {
        const miniBagLinePrices = document.querySelectorAll(
          '.mini-cart-items .mini-cart-item.non-cracker span[rv-html="item.line_price | money Currency.currentCurrency"]'
        );
        miniBagLinePrices.forEach((linePrice) => {
          const originalPrice = (parseFloat(linePrice.textContent.split('£')[1]).toFixed(2) * 1.33).toFixed(2);
          const originalPriceHTML = `<span class="is-size-7 has-text-weight-medium is-inline-block ${ID}-line-through" style="margin-left: 10px;">£${originalPrice}</span>`;

          linePrice.insertAdjacentHTML('afterend', originalPriceHTML);
        });
      }

      const miniBag = document.querySelector(".header-actions a[href='/cart']");
      miniBag.click();
    }

    let numberOfProducts = 0;
    const newProductSummaryContainer = `
     <div class="${ID}-product-summary-container-desktop ${ID}-hide">
          <div class="${ID}-product-summary-dropdown ${ID}-mobile-order">
           ${numberOfProducts} Product | Summary
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M6 8L0 0.982456L0.839999 0L6 6.03509L11.16 0L12 0.982456L6 8Z" fill="black"/>
          </svg>
          </div>
          <div class="${ID}-product-summary-callout ${ID}-mobile-order">
            <h3>Add 2 more products to get 25% off</h3>
          </div>
        <div class="${ID}-product-summary-price ${ID}-mobile-order">
          <p>£55.00</p>
        </div>
        <div class="${ID}-product-summary-atb-button-container ${ID}-mobile-order">
          <button class="${ID}-product-summary-atb-button add-gift-to-bag">Add to bag</button>
        </div>
     </div>
      `;

    const productSummaryLightboxDesktop = `
    <div class="${ID}-product-summary-lightbox-desktop ${ID}-hide">
      <div class="${ID}-product-summary-lightbox-desktop-inner">
        <div class="${ID}-product-summary-lightbox-desktop-header">
          <h3>Summary</h3>
          <svg class="${ID}-summary-close" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="black"/>
          </svg>
        </div>
        <div class="${ID}-product-summary-lightbox-desktop-body">

        </div>
        <div class="${ID}-product-summary-lightbox-desktop-gold-highlight">
        </div>
        <div class="${ID}-product-summary-lightbox-desktop-footer">
          <div class="${ID}-product-summary-lightbox-desktop-footer-left">
            <h4>Subtotal</h4>
            <h4>Savings</h4>
            <h4>Gift TOTAL</h4>
          </div>
          <div class="${ID}-product-summary-lightbox-desktop-footer-right">
            <h4>DYNAMIC MESSAGE</h4>
            <button class="${ID}-product-summary-add-to-bag">ADD TO BAG</button>
          </div>
        </div>
      </div>
    </div>
     `;

    const dimHTML = `
     <div class="${ID}-dim ${ID}-hide">
     </div>`;

    //INSERT NEW HTML
    const giftBuilderIntroText = document.querySelector('#shopify-section-gift-builder .gift-builder__hero p:nth-child(2)');
    giftBuilderIntroText.innerHTML = newGiftBuilderIntroText;

    const giftBuilderInsert = document.querySelector('#shopify-section-gift-builder');
    giftBuilderInsert.insertAdjacentHTML('afterbegin', newProductSummaryContainer);
    giftBuilderInsert.insertAdjacentHTML('afterbegin', dimHTML);
    giftBuilderInsert.insertAdjacentHTML('afterbegin', productSummaryLightboxDesktop);

    //TARGET NEW HTML AS DOM ELEMENTS
    const productSummaryDropdown = document.querySelector(`.${ID}-product-summary-dropdown`);

    const dimDOM = document.querySelector(`.${ID}-dim`);
    const productSummaryLightboxDesktopDOM = document.querySelector(`.${ID}-product-summary-lightbox-desktop`);
    const productSummaryCloseDOM = document.querySelector(`.${ID}-summary-close`);

    function toggleLightBox() {
      productSummaryLightboxDesktopDOM.classList.toggle(`${ID}-hide`);
      dimDOM.classList.toggle(`${ID}-hide`);
    }

    dimDOM.addEventListener('click', function () {
      toggleLightBox();
    });

    productSummaryDropdown.addEventListener('click', function () {
      toggleLightBox();
    });

    productSummaryCloseDOM.addEventListener('click', function () {
      toggleLightBox();
    });

    let productArray = [];
    productArray.push({
      id: window.giftBoxProduct,
      quantity: 0,
      //   // properties: {
      //   //   GiftID: "giftg2qf92c1v3",
      //   //   _automatic: false,
      //   // },
    });
    let subTotal = 0;
    let total, savings, totalLineThrough;

    function performCalculations() {
      numberOfProducts = 0;
      subTotal = 0;
      total = 0;
      savings = 0;
      totalLineThrough = 0;

      productArray.forEach((product, index) => {
        if (index > 0) {
          numberOfProducts += parseInt(product.quantity);
          subTotal += parseFloat((product.price * product.quantity).toFixed(2));
        }
      });

      if (numberOfProducts > 2) {
        totalLineThrough = subTotal;
        total = (subTotal * 0.75).toFixed(2);
        savings = (subTotal * 0.25).toFixed(2);
      } else {
        total = subTotal;
      }
    }

    const updateProductSummary = (selectThisGift) => {
      productSummaryDropdown.innerHTML = `${numberOfProducts} Product | Summary 
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M6 8L0 0.982456L0.839999 0L6 6.03509L11.16 0L12 0.982456L6 8Z" fill="black"/>
      </svg>
      `;
      const productSummaryCalloutDOM = document.querySelector(`.${ID}-product-summary-callout h3`);

      if (numberOfProducts < 3) {
        const productText = numberOfProducts === 2 ? 'product' : 'products';
        productSummaryCalloutDOM.innerHTML = `Add ${3 - numberOfProducts} more ${productText} to get 25% off`;
      } else {
        productSummaryCalloutDOM.innerHTML = `Congratulations, You've got 25% off`;
      }
      //Update total Price
      let priceDesktopDOM = document.querySelector(`.${ID}-product-summary-price p`);

      const addToBagSummaryDOM = document.querySelector(`.${ID}-product-summary-atb-button`);
      console.log(numberOfProducts);

      if (numberOfProducts > 2) {
        priceDesktopDOM.innerHTML = `<span class="${ID}-line-through">£${totalLineThrough.toFixed(2)}</span> £${total}`;
        addToBagSummaryDOM.classList.add(`${ID}-three-items`);
      } else {
        priceDesktopDOM.textContent = `£${total}`;
        addToBagSummaryDOM.classList.remove(`${ID}-three-items`);
      }
    };

    function generateUniqueString() {
      var ts = String(new Date().getTime()),
        i = 0,
        out = '';
      for (i = 0; i < ts.length; i += 2) {
        out += Number(ts.substr(i, 2)).toString(36);
      }
      return 'gift' + out.substr(-25);
    }

    const addToProductArray = (selectThisGift) => {
      const giftId = generateUniqueString();
      const productName = selectThisGift
        .closest('.gift-builder__products-card-content-inner')
        .querySelector('.selected-product-title').textContent;
      const quantity = parseInt(selectThisGift.closest('.cta-container').querySelector('.qty-selector input').value);
      const price = parseFloat(
        selectThisGift
          .closest('.gift-builder__products-card-content-inner')
          .querySelector('.selected-product-price')
          .textContent.split('£')[1]
      );
      const imgURL = selectThisGift
        .closest('.gift-builder__products-card')
        .querySelector('.gift-builder__products-card-image img')
        .getAttribute('src');
      const productID = selectThisGift.getAttribute('data-selected-product-id');

      if (productArray.length > 1) {
        productArray.push({
          productName: productName,
          quantity: quantity,
          price: price,
          imgURL: imgURL,
          id: productID,
          properties: {
            _Gift: true,
            _gift_builder: true,
            // do these need to be unique? most seem to start giftg2qf - is this a prefix?
            GiftID: giftId,
            _Gift_Wrap_Product: false,
            _gift_option_pair: `_${productID}`,
            _automatic: false,
          },
        });
      } else {
        productArray.push({
          productName: productName,
          quantity: quantity,
          price: price,
          imgURL: imgURL,
          id: productID,
          properties: {
            _Gift: true,
            _gift_builder: true,
            // do these need to be unique? most seem to start giftg2qf - is this a prefix?
            GiftID: giftId,
            _Gift_Wrap_Product: false,
            _automatic: false,
            _gift_option_pair: `${productID}_`,
          },
        });
      }
    };

    const updateProductSummaryLightbox = () => {
      const productSummaryBodyDOM = document.querySelector(`.${ID}-product-summary-lightbox-desktop-body`);
      productSummaryBodyDOM.innerHTML = '';
      productArray.forEach((product, index) => {
        if (index > 0) {
          const lightboxProductContainer = `
        <div class="${ID}-product-summary-lightbox-desktop-product">
          <div class="${ID}-product-summary-lightbox-desktop-product-image">
            <img src="${product.imgURL}" />
          </div>
          <div class="${ID}-product-summary-lightbox-desktop-product-info">
            <div class="${ID}-product-summary-lightbox-desktop-product-name">
              ${product.productName}
            </div>
            <div class="${ID}-product-summary-lightbox-desktop-product-price">
            ${
              numberOfProducts > 2
                ? `£${(product.price * 0.75).toFixed(2)} <span class="${ID}-line-through" >£${product.price.toFixed(2)}</span>`
                : `£${product.price.toFixed(2)}`
            }
            </div>
            <div class="${ID}-product-summary-lightbox-desktop-product-select-quantity">
              <div class="${ID}-product-summary-lightbox-desktop-product-quantity-button">
                <div class="qty-selector">
                  <i class="qty-change icon-regular-minus is-size-8" data-index="${index}"></i>
                    <input type="number" min="1" value="${product.quantity}" data-index="${index}" tabindex="0">
                  <i class="qty-change plus icon-regular-plus is-size-8" data-index="${index}"></i>
                </div>
              </div>
              <div class="${ID}-product-summary-lightbox-desktop-update-quantity" data-index="${index}">
                UPDATE
              </div>
              <div class="${ID}-product-summary-lightbox-desktop-remove-product" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                  <path d="M0.846154 4.0625V12.1875C0.846154 12.6344 1.22692 13 1.69231 13H9.30769C9.77308 13 10.1538 12.6344 10.1538 12.1875V4.0625H0.846154ZM3.38462 11.375H2.53846V5.6875H3.38462V11.375ZM5.07692 11.375H4.23077V5.6875H5.07692V11.375ZM6.76923 11.375H5.92308V5.6875H6.76923V11.375ZM8.46154 11.375H7.61538V5.6875H8.46154V11.375ZM10.3654 1.625H7.61538V0.609375C7.61472 0.447956 7.54764 0.293332 7.42877 0.179191C7.3099 0.0650497 7.14887 0.000641831 6.98077 0L4.01923 0C3.85113 0.000641831 3.6901 0.0650497 3.57123 0.179191C3.45236 0.293332 3.38528 0.447956 3.38462 0.609375V1.625H0.634615C0.466442 1.62543 0.305285 1.68977 0.186368 1.80396C0.0674511 1.91814 0.000446677 2.07289 0 2.23438V3.25H11V2.23438C10.9996 2.07289 10.9325 1.91814 10.8136 1.80396C10.6947 1.68977 10.5336 1.62543 10.3654 1.625ZM6.76923 1.625H4.23077V0.823063H6.76923V1.625Z" fill="#4A4A4A"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="${ID}-product-summary-lightbox-desktop-product-price ${ID}-hide-mobile">
          ${
            numberOfProducts > 2
              ? `£${(product.price * product.quantity * 0.75).toFixed(2)}`
              : `£${(product.price * product.quantity).toFixed(2)}`
          }
          
          </div>
        </div>
      `;
          productSummaryBodyDOM.insertAdjacentHTML('afterbegin', lightboxProductContainer);
        }
      });
      // Add event listeners to plus and minus buttons, update and remove buttons
      const plusButtons = document.querySelectorAll(`.${ID}-product-summary-lightbox-desktop-product .qty-change.plus`);
      const minusButtons = document.querySelectorAll(
        `.${ID}-product-summary-lightbox-desktop-product .qty-change.icon-regular-minus`
      );
      const updateButtons = document.querySelectorAll(
        `.${ID}-product-summary-lightbox-desktop-product .${ID}-product-summary-lightbox-desktop-update-quantity`
      );
      const removeProducts = document.querySelectorAll(
        `.${ID}-product-summary-lightbox-desktop-product .${ID}-product-summary-lightbox-desktop-remove-product`
      );

      plusButtons.forEach((plusButton) => {
        plusButton.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          productArray[index].quantity++;
          // console.log(productArray[index].quantity);
          plusButton.closest('.qty-selector').querySelector('input').value = productArray[index].quantity;
        });
      });

      minusButtons.forEach((minusButton) => {
        minusButton.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          if (productArray[index].quantity > 1) {
            productArray[index].quantity--;
            minusButton.closest('.qty-selector').querySelector('input').value = productArray[index].quantity;
          }
        });
      });
      updateButtons.forEach((updateButton) => {
        updateButton.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          const updatedQuantity = parseInt(productArray[index].quantity);
          // console.log(updatedQuantity, "updated quanitity");
          numberOfProducts = 0;
          productArray.forEach((product, index) => {
            if (index > 0) {
              numberOfProducts += parseInt(product.quantity);
            }
          });
          updateProductSummaryLightbox();
          performCalculations();
          updateProductTotalLightbox();
          updateProductSummary();
        });
      });
      //Remove product from lightbox
      removeProducts.forEach((removeProduct) => {
        removeProduct.addEventListener('click', (event) => {
          const index = removeProduct.getAttribute('data-index');
          // console.log(index);
          deleteItem(index);
          performCalculations();
          updateProductSummaryLightbox();
          updateProductTotalLightbox();
          updateProductSummary();
        });
      });
    };

    const updateProductTotalLightbox = () => {
      const productSummaryLightboxDesktopFooterLeft = `
        <h4 class="${ID}-product-summary-lightbox-desktop-footer-left-subtotal">Subtotal (${
        numberOfProducts > 1 ? `${numberOfProducts} Products` : `${numberOfProducts} Product`
      }) ${
        numberOfProducts > 2
          ? `<span class="${ID}-line-through ${ID}-margin-left">£${totalLineThrough}</span>`
          : `<span class="${ID}-margin-left">£${total}</span>`
      }</h4>
        <h4 class="${ID}-product-summary-lightbox-desktop-footer-left-discount">${
        numberOfProducts > 2 ? `Your savings (25% off) <span class="${ID}-margin-left">£${savings}</span>` : `<br>`
      }</h4>
        <h4 class="${ID}-product-summary-lightbox-desktop-footer-left-total">Your gift total <span class="${ID}-margin-left">£${total}</span></h4>
        `;
      const productSummaryLightboxDesktopFooterLeftDOM = document.querySelector(
        `.${ID}-product-summary-lightbox-desktop-footer-left`
      );
      productSummaryLightboxDesktopFooterLeftDOM.innerHTML = '';
      productSummaryLightboxDesktopFooterLeftDOM.insertAdjacentHTML('afterbegin', productSummaryLightboxDesktopFooterLeft);

      let productSummaryCalloutDOM = document.querySelector(`.${ID}-product-summary-lightbox-desktop-footer-right h4`);
      if (numberOfProducts < 3) {
        const productText = numberOfProducts === 2 ? 'product' : 'products';
        productSummaryCalloutDOM.innerHTML = `Add ${3 - numberOfProducts} more ${productText} to get 25% off`;
      } else {
        productSummaryCalloutDOM.innerHTML = `Congratulations, You've got 25% off`;
      }
    };

    //Delete item from array/summary
    const deleteItem = (index) => {
      productArray.splice(index, 1);
      console.log(productArray);
    };

    //Update basket

    function addToCartAPI(button) {
      const apiUrl = 'https://www.neomorganics.com/cart/add.js';

      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [...productArray],
        }),
      };

      fetch(apiUrl, requestData)
        .then((response) => response.json())
        .then(() => {
          button.innerText = 'Added';
          fetch('https://www.neomorganics.com/cart.js', { cache: 'default' })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((returnedData) => {
              let basketCountElement = document.querySelector('.cart-count');
              basketCountElement.innerText = returnedData.item_count;
              if (returnedData.item_count > 0 && basketCountElement.classList.contains('is-hidden')) {
                basketCountElement.classList.remove('is-hidden');
              }
              localStorage.setItem('giftRefresh', true);
              // localStorage.setItem("productArray", JSON.stringify(productArray));
              // console.log(productArray.length);
              // if(productArray.length > 3){
              //   localStorage.setItem("applyDiscountMiniCart", true);
              // }
              location.reload();
              setTimeout(() => {
                button.innerText = 'Add to bag';
              }, 3000);
            })
            .catch((error) => {
              console.error('There was a problem with the fetch operation:', error);
            });
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    }

    const addToBagDesktopDOM = document.querySelector(
      `.${ID}-product-summary-atb-button-container .${ID}-product-summary-atb-button`
    );
    addToBagDesktopDOM.addEventListener('click', function () {
      addToCartAPI(this);
    });

    const addToBagSummaryDOM = document.querySelector(`.${ID}-product-summary-add-to-bag`);
    addToBagSummaryDOM.addEventListener('click', function () {
      addToCartAPI(this);
    });

    // Select the node that will be observed for mutations
    const addToGiftBuilderSection = document.querySelector('#shopify-section-gift-builder .gift-builder__type');

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    const elementsWithListener = new Set();

    // Create a Mutation Observer to watch for changes
    const observeAddToGiftBuilder = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          // console.log("child or attribute mutation")
          //target add to gift and only add event listener if it doesn't already have one
          //check through set and if not there add event listener
          const addToGift = document.querySelector(`button.add-product-to-gift[tabindex="0"]`);

          if (addToGift && !elementsWithListener.has(addToGift)) {
            // console.log("add to gift and not in set")
            addToGift.addEventListener('click', function () {
              // console.log(this)
              const productSummary = document.querySelector(`.${ID}-product-summary-container-desktop`);
              productSummary.classList.remove(`${ID}-hide`);
              addToProductArray(this);
              performCalculations();
              updateProductSummary(this);
              updateProductSummaryLightbox();
              updateProductTotalLightbox();
              window.scrollTo({
                top: 0,
                behavior: 'smooth', // Optional: Smooth scrolling animation
              });
            });
            elementsWithListener.add(addToGift);
          }
        }
        // else if (mutation.type === "attributes") {
        //   console.log("The " + mutation.attributeName + " attribute was modified.");
        // }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(observeAddToGiftBuilder);

    // Start observing the target node for configured mutations
    observer.observe(addToGiftBuilderSection, config);

    // // Later, you can stop observing
    // observer.disconnect();
  });
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    // Nav tracking
    if (e.target.closest('.gift-builder__collection.first-level')) {
      fireEvent(`Click - User selects a category`, true);
    }

    if (e.target.closest('.gift-builder__second-level')) {
      fireEvent(`Click - User selects a product type`, true);
    }

    if (e.target.closest('.gift-builder__products-card .add-product-to-gift')) {
      fireEvent(`Click - User adds a product`, false);
    }

    if (e.target.closest('.icon-regular-plus')) {
      fireEvent(`Click - User updates quantity on carousel +1`, true);
    }

    if (e.target.closest('.icon-regular-minus')) {
      fireEvent(`Click - User updates quantity on carousel -1`, true);
    }

    if (e.target.closest('.js-add-another-gift')) {
      fireEvent(`Click - User interacts with add another product`, true);
    }

    if (e.target.closest('.js-continue-to-upsells')) {
      fireEvent(`Click - User interacts with add finishing touches`, true);
    }

    if (e.target.closest('.gift-builder__sticky-progress-inner .add-gift-to-bag ')) {
      fireEvent(`Click - User interacts with add to bag in the summary tray`, true);
    }

    if (e.target.closest('.gift-builder__upsell-slider .add-product-to-gift')) {
      fireEvent(`Click - User interacts with add to gift on the finishing touches page`, true);
    }

    if (e.target.closest('.gift-builder__upsell  .skip-gift-section')) {
      fireEvent(`Click - User interacts with skip on the finishing touches page`, true);
    }

    if (e.target.closest('.gift-builder__summary .add-gift-to-bag')) {
      fireEvent(`Click - User interacts with add to bag on the summary page`, true);
    }

    if (e.target.closest('.gift-builder__summary .reset-gift-builder')) {
      fireEvent(`Click - User interacts with start over on the summary page`, true);
    }

    if (e.target.closest('.mini-cart-item .icon-solid-trash-alt')) {
      fireEvent(`Click - User removes product from the bag`, true);
    }

    if (e.target.closest(`a.quantity-box[title="plus 1"]`)) {
      // console.log('minibag +1')
      fireEvent(`Click - User updates quantity in the mini bag +1`, true);
    }

    if (e.target.closest(`a.quantity-box[title="minus 1"]`)) {
      // console.log('minibag -1')
      fireEvent(`Click - User updates quantity in the mini bag -1`, true);
    }
  });
};

//Add tracking (events 5-10 in brief)
const addVariationTracking = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.${ID}-product-summary-dropdown`)) {
      fireEvent(`Click - User opens the summary`, true);
    }

    if (e.target.closest(`.${ID}-dim`) || e.target.closest(`.${ID}-summary-close`)) {
      fireEvent(`Click - User closes the summary`, true);
    }

    if (e.target.closest(`.${ID}-product-summary-lightbox-desktop-product-quantity-button .icon-regular-plus`)) {
      fireEvent(`Click - User updates quantity in the summary +1`, true);
    }

    if (e.target.closest(`.${ID}-product-summary-lightbox-desktop-product-quantity-button .icon-regular-minus`)) {
      fireEvent(`Click - User updates quantity in the summary -1`, true);
    }

    if (e.target.closest(`.${ID}-product-summary-lightbox-desktop-update-quantity`)) {
      fireEvent(`Click - User submits updates summary`, true);
    }

    if (e.target.closest(`.${ID}-product-summary-lightbox-desktop-remove-product`)) {
      fireEvent(`Click - User removes product from the summary`, true);
    }

    if (e.target.closest(`.${ID}-product-summary-add-to-bag`)) {
      fireEvent(`Click - User adds to bag from summary`, true);
    }
  });
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  if (window.location.href.indexOf('us.neomorganics.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomorganics.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

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
  addVariationTracking();
};
