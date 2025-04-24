import { events, fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import session from './session';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Get Site from hostname
 * EJ or HS
 */
export const getSiteFromHostname = () => {
  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.body.classList.add(siteIdent);
  }
};

export const removeCtaButtons = () => {
  const { ID, VARIATION } = shared;

  const allRemoveButtons = document.querySelectorAll(`.${ID}-btn__remove`);
  const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);
  [].forEach.call(allRemoveButtons, (rmBtn) => {
    rmBtn.addEventListener('click', (e) => {
      if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
        const productToRemove = rmBtn.getAttribute('data-to-remove');
        let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
        delete savedProducts[`${productToRemove}`];
        localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
        // --- UPDATE Pin icons on Products
        updatePinIcons();

        if (Object.keys(savedProducts).length === 0) {
          document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
          document.querySelector(`.${ID}-savedItemsList__wrapper`).classList.add('hidden');
          document.querySelector('body').setAttribute('style', 'overflow: visible;');
          document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('hidden');
        } else {
          updateSavedItemsContent(savedItemsList);
          // savedItemsList.classList.add('hidden');
        }

      }
    });
  });
};

export const removeCtaIcons = () => {
  const { ID, VARIATION } = shared;

  const allRemoveIcons = document.querySelectorAll(`.${ID}-closeIcon__remove`);
  const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);
  [].forEach.call(allRemoveIcons, (rmIcon) => {
    rmIcon.addEventListener('click', (e) => {
      if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
        const productToRemove = rmIcon.getAttribute('data-to-remove');
        let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
        delete savedProducts[`${productToRemove}`];
        localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
        // --- UPDATE Pin icons on Products
        updatePinIcons();

        if (Object.keys(savedProducts).length === 0) {
          document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
          document.querySelector(`.${ID}-savedItemsList__wrapper`).classList.add('hidden');
          document.querySelector('body').setAttribute('style', 'overflow: visible;');
          document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('hidden');
        } else {
          updateSavedItemsContent(savedItemsList);
          // savedItemsList.classList.add('hidden');
        }

      }
    });
  });
};

export const addPinsToProducts = () => {
  const { ID, VARIATION } = shared;

  let prePinnedProducts = {};
  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
    prePinnedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

    if (Object.keys(prePinnedProducts).length > 0) {
      document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('show');
    }
  }
  if (window.location.pathname.indexOf('/webstore/d/') > -1) {
    const product = document.querySelector('.detail-page__container .product-gallery__main-container');
    let productUrl = window.location.pathname;
    // if(getSiteFromHostname() == 'ernestjones') {
    //   productUrl = `https://www.ernestjones.co.uk${productUrl}`;
    // } else if(getSiteFromHostname() == 'hsamuel') {
    //   productUrl = `https://www.hsamuel.co.uk${productUrl}`;
    // }
    // // new pathname
    // productUrl = new URL(productUrl).pathname;
    let icon = '';
    if (VARIATION == '1') {
      icon = 'heart';
    } else {
      icon = 'pin';
    }
    let activeProduct = '';
    if (Object.keys(prePinnedProducts).length > 0
    && prePinnedProducts[`${productUrl}`]) {
      activeProduct = 'active';
    }
    const iconContainer = `<div class="${ID}-icon__wrapper ${icon} ${activeProduct}">
      <div class="label-text">Save for later</div>
      <div class="${ID}-icon"></div>
    </div>`;
    // --- Add icon only if it doesn't previously exists
    if (!product.querySelector(`.${ID}-icon__wrapper`)) {
      product.insertAdjacentHTML('afterbegin', iconContainer);
    }
  } else if (window.location.pathname.indexOf('/webstore/l/') > -1) {
    let allProducts = document.querySelectorAll('ol#js-product-list li');
    [].forEach.call(allProducts, product => {
      // if (product.querySelector(`.${ID}-icon__wrapper`)) {
      //   const itemToRemove = product.querySelector(`.${ID}-icon__wrapper`);
      //   itemToRemove.parentNode.removeChild(itemToRemove);
      // } else {
        
      // }
      if (product.querySelector('a.productLink')) {
        let productUrl = product.querySelector('a.productLink').getAttribute('href');
        if(getSiteFromHostname() == 'ernestjones') {
          productUrl = `https://www.ernestjones.co.uk${productUrl}`;
        } else if(getSiteFromHostname() == 'hsamuel') {
          productUrl = `https://www.hsamuel.co.uk${productUrl}`;
        }
        // new pathname
        productUrl = new URL(productUrl).pathname;
        let icon = '';
        if (VARIATION == '1') {
          icon = 'heart';
        } else {
          icon = 'pin';
        }
        let activeProduct = '';
        if (Object.keys(prePinnedProducts).length > 0
        && prePinnedProducts[`${productUrl}`]) {
          activeProduct = 'active';
        }
        const iconContainer = `<div class="${ID}-icon__wrapper ${icon} ${activeProduct}">
          <div class="label-text">Save for later</div>
          <div class="${ID}-icon"></div>
        </div>`;
        // --- Add icon only if it doesn't previously exists
        if (!product.querySelector(`.${ID}-icon__wrapper`)) {
          product.insertAdjacentHTML('afterbegin', iconContainer);
        }
      }
      
      
      
      
    });
  }
  
};

export const generateSavedProductsElements = () => {
  const { ID, VARIATION } = shared;

  let icon = '';
  if (VARIATION == '1') {
    icon = 'heart';
  } else {
    icon = 'pin';
  }
  const savedProductsTab = `<div class="${ID}-savedItems__wrapper hidden" >
    <div class="${ID}-savedItems__container">
      <div class="${ID}-savedItems__content">
        <div class="icon ${icon}"></div>
        <div class="label-text">Saved Products</div>
      </div>
    </div>
  <div>`;

  if (!document.querySelector(`.${ID}-savedItems__wrapper`)) {
    document.querySelector('body').insertAdjacentHTML('afterbegin', savedProductsTab);
  }

  // --- get distance from bottom of Header to top of the page
  // document.querySelector('header.header').offsetTop + 
  let distanceFromTop = '';
  if (document.querySelector('.promotion-messages')) {
    //document.querySelector('.promotion-messages').offsetTop + 
    distanceFromTop = document.querySelector('.promotion-messages').offsetHeight;
    distanceFromTop = distanceFromTop - 12;
    distanceFromTop = `style="top: ${distanceFromTop}px !important;"`;
  }
  // if (distanceFromTop >= 200) {
  //   distanceFromTop = '10vw';
  // } else {
  //   distanceFromTop = `${distanceFromTop}px`;
  // }
  // distanceFromTop = `0px`;
  const savedProductsList = `<div class="${ID}-savedItemsList__wrapper hidden v${VARIATION}">
    <div class="${ID}-savedItemsList__overlay"></div>
    <div class="${ID}-savedItemsList__container">
      <div class="${ID}-header__wrapper">
        <div class="${ID}-closeIcon"></div>
        <h2>Your Saved Products</h2>
      </div>
      <ul class="${ID}-savedItemsList v${VARIATION}"></ul>
    </div>
  </div>`;
  const savedItemsTab = document.querySelector(`.${ID}-savedItems__wrapper`);
  // savedItemsTab.insertAdjacentHTML('beforebegin', savedProductsList);
  if (!document.querySelector(`.${ID}-savedItemsList__wrapper`)) {
    document.querySelector('header.header').insertAdjacentHTML('beforeend', savedProductsList);

    const savedItemsList = document.querySelector(`.${ID}-savedItemsList__wrapper`);
    savedItemsTab.addEventListener('click', (e) => {
      savedItemsList.classList.toggle('hidden');
      if (savedItemsList.classList.contains('hidden')) {
        document.querySelector('body').setAttribute('style', 'overflow: visible;');
      } else {
        document.querySelector('body').setAttribute('style', 'overflow: hidden;');
        events.send(`${ID} variation:${VARIATION}`, 'click', 'Saved products list');
      }

      
      /**
       * @desc Saved Products List DOES NOT contain hidden
       * Shows the Saved list lightbox -------------------
       * and updates the content -------------------------
       */
      updateSavedItemsContent(savedItemsList);

      /**
       * @desc Remove click CTA for VARIATION 1
       * add Event Listeners to each "remove" CTA
       */
      removeCtaButtons();

      
      /**
       * @desc Remove click CTA for VARIATION 2
       * add Event Listeners to each "remove" icon
       */
      removeCtaIcons();

      const savedItemsEvent = () => {
        const savedItems = document.querySelectorAll(`.${ID}-savedItemsList .${ID}-product__wrapper`);
        if(savedItems) {
          for (let index = 0; index < savedItems.length; index += 1) {
            const element = savedItems[index];
            element.querySelector(`.${ID}-btn__shop`).addEventListener('click', () => {
              events.send(`${ID} v${VARIATION}`, 'click', 'Saved product');
            });
          }
        }
      }
      savedItemsEvent();

    });

    /**
     * @desc Show/Hide 'Saved Products' list
     */
    savedItemsList.querySelector(`.${ID}-savedItemsList__overlay`).addEventListener('click', (e) => {
      savedItemsList.classList.toggle('hidden');
      if (savedItemsList.classList.contains('hidden')) {
        document.querySelector('body').setAttribute('style', 'overflow: visible;');
      } else {
        document.querySelector('body').setAttribute('style', 'overflow: hidden;');
      }
    });
    document.querySelector(`.${ID}-closeIcon`).addEventListener('click', (e) => {
      savedItemsList.classList.toggle('hidden');
      if (savedItemsList.classList.contains('hidden')) {
        document.querySelector('body').setAttribute('style', 'overflow: visible;');
      } else {
        document.querySelector('body').setAttribute('style', 'overflow: hidden;');
      }
    });
  }
  


  
};

export const updateSavedItemsContent = (savedItemsList) => {
  const { ID, VARIATION } = shared;
  let savedItems = {};
  if (!savedItemsList.classList.contains('hidden')) {
    if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
      savedItems = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
      let listItems = '';
      const keys = Object.keys(savedItems);
      for (const key of keys) {
        const item = savedItems[key];
        let productTitle = item.title;
        if (VARIATION == '2') {
          if (productTitle.length > 65) {
            const length = 65;
            const trimmedString = productTitle.substring(0, length);
            productTitle = `${trimmedString}...`;
          }
        }
        let device = '';
        if (window.innerWidth <= 420) {
          device = 'mobile';
        }

        // --- Check if session is first, then show Prices
        // ---- if not, hide prices
        let hidePrices = '';
        if (!session.firstSession) {
          hidePrices = 'style="display: none !important;"';
        }
        listItems += `<li class="${ID}-product__wrapper ${ID}-product__wrapper-v${VARIATION} ${device}">
          <div class="${ID}-closeIcon__remove" data-to-remove="${item.url}"></div>
          <div class="${ID}-productImg__wrapper">
            <a href="${item.url}"><img src="${item.img}"/></a>
          </div>
          <div class="${ID}-productTitle__wrapper">
            <p>${productTitle}</p>
            <div class="${ID}-productPrice__wrapper" ${hidePrices}>
              ${item["current-price"]}
              ${item["old-price"]}
            </div>
            <div class="${ID}-btn__wrapper">
              <a class="${ID}-btn__shop" href="${item.url}">SHOP</a>
              <span class="${ID}-btn__remove" data-to-remove="${item.url}">Remove</span>
            </div>
          </div>
          
        </li>`;

      }


      document.querySelector(`.${ID}-savedItemsList`).innerHTML = listItems;
    }

    // --- Re-add event listeners
    if (VARIATION == '1') {
      removeCtaButtons();
    } else if (VARIATION == '2') {
      removeCtaIcons();
    }

  }
};


export const updatePinIcons = () => {
  const { ID, VARIATION } = shared;

  let prePinnedProducts = {};
  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
    prePinnedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
    if (Object.keys(prePinnedProducts).length > 0) {
      document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('show');
    }
  }
// --- PDP ---
  if (window.location.pathname.indexOf('/webstore/d/') > -1) {
    const productUrl = window.location.pathname;
    let icon = '';
    if (VARIATION == '1') {
      icon = 'heart';
    } else {
      icon = 'pin';
    }
    let activeProduct = '';
    if (Object.keys(prePinnedProducts).length > 0
    && prePinnedProducts[`${productUrl}`]) {
      // activeProduct = 'active';
      document.querySelector(`.${ID}-icon__wrapper`).classList.add('active');
    } else {
      if (document.querySelector(`.${ID}-icon__wrapper`).classList.contains('active')) {
        document.querySelector(`.${ID}-icon__wrapper`).classList.remove('active');
      }
    }
// --- PLP ----
  } else if (window.location.pathname.indexOf('/webstore/l/') > -1) {
    let allProducts = document.querySelectorAll('ol#js-product-list li');
    [].forEach.call(allProducts, product => {
      // console.log(product.querySelector('a.productLink'));
      // console.log('>>>>>');
      if (product.querySelector('a.productLink')) {
        // product.setAttribute('style', 'background-color: lightcoral;');
        // if (product.querySelector('a.productLink')) {
          const productUrl = product.querySelector('a.productLink').getAttribute('href');
          let icon = '';
          if (VARIATION == '1') {
            icon = 'heart';
          } else {
            icon = 'pin';
          }
          let activeProduct = '';
          if (Object.keys(prePinnedProducts).length > 0
          && prePinnedProducts[`${productUrl}`]) {
            // activeProduct = 'active';
            product.querySelector(`.${ID}-icon__wrapper`).classList.add('active');
          } else {
            if (product.querySelector(`.${ID}-icon__wrapper`).classList.contains('active')) {
              product.querySelector(`.${ID}-icon__wrapper`).classList.remove('active');
            }
          }
        // }
      }
      

    });
  }
  
};

export const productPageFunctions = () => {
  const { ID, VARIATION } = shared;

  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
    let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
    if (Object.keys(savedProducts).length > 0) {
      document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('hidden');
    } else {
      document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('hidden');
    } 
  }
  pollerLite(['.detail-page__container .product-gallery__main-container'], () => {
    /**
     * @desc Adds Pins to each Product
     */
    addPinsToProducts();

    /**
     * @desc Product Pins Event Listeners
     * Add / Remove product from 'Saved Product'
     */
    // let allProducts = document.querySelectorAll('ol#js-product-list li');
    // [].forEach.call(allPinIcons, icon => {
    
    const icon = document.querySelector(`.${ID}-icon__wrapper`);
    if (icon && !icon.classList.contains('eventAdded')) {
      icon.classList.add('eventAdded');
      icon.addEventListener('click', (e) => {
        icon.classList.toggle('active');
        events.send(`${ID} variation:${VARIATION}`, 'click', 'save product on PDP');
        const productTitle = document.querySelector('h1.product-name ').innerHTML;
        const productImg = document.querySelector('img.product-gallery__image').getAttribute('src');
        let productUrl = window.location.pathname;
        const currentPrice = document.querySelector('.product-summary .product-price--current').outerHTML;
        let oldPrice = '';
        // if (product.querySelector('.product-tile__price-history-container del')) {
        //   oldPrice = product.querySelector('.product-tile__price-history-container del').outerHTML;
        // } .product-price--history
        /**
         * @desc Heart/Pin icon is ACTIVE
         * Add new product to Saved list
         */
        if (icon.classList.contains('active')) {
          document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('show');
          let savedProducts = null;
          
          if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
            savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
            if (!savedProducts[`${productUrl}`]) {
              savedProducts[`${productUrl}`] = {
                'title': `${productTitle}`,
                'img': `${productImg}`,
                'url': `${productUrl}`,
                'current-price': `${currentPrice}`,
                'old-price': `${oldPrice}`,
              };
              localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
            }

          } else {
            let productsToSave = {};
            if (!productsToSave[`${productUrl}`]) {
              productsToSave[`${productUrl}`] = {
                'title': `${productTitle}`,
                'img': `${productImg}`,
                'url': `${productUrl}`,
                'current-price': `${currentPrice}`,
                'old-price': `${oldPrice}`,
              };
              localStorage.setItem(`${ID}-saved-products`, JSON.stringify(productsToSave));
            }
            
          }
          // console.log('[092] (+) HERE:');
          // console.log(JSON.parse(localStorage.getItem(`${ID}-saved-products`)));
        /**
         * @desc Heart/Pin icon is INACTIVE
         * Remove product from Saved list
         */
        } else {
          // --- Checks localstorage if there are no more Saved Items
          // console.log('[096] (-) HERE:');
          // console.log(JSON.parse(localStorage.getItem(`${ID}-saved-products`)));
          if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
            let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
            delete savedProducts[`${productUrl}`];
            localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
            if (Object.keys(savedProducts).length === 0) {
              document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
            }

          } else {
            document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
          }
          
        }
      });
    }
    
  // }

  });
};
