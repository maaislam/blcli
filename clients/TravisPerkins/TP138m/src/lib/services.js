import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * @desc Adds the compare CTA to a product
 * @param {Element} product
 */
function addCompareCta(product) {
  if (product) {
    const form = product.querySelector('form');
    if (form) {
      if (!product.querySelector('.TP138m-compare')) {
        form.insertAdjacentHTML('afterend', `
          <button class="TP138m-compare">
            <span class="tick"></span>
            <span class="img"></span> Compare
          </button>
        `);
      }
    }
  }
}

const compare = {
  getProductData(product) { 
    const thisProduct = product;
    const productData = {
      id: thisProduct.querySelector('form').getAttribute('id'),
      image: thisProduct.querySelector('.product_item_header img'),
      title: thisProduct.querySelector('.product_header'),
      collect: thisProduct.querySelector('.ccButton'),
      delivery: thisProduct.querySelector('.tpQ_button'),
      price: thisProduct.querySelector('.advanced_plp_product_price .price_section'),
    };

    return productData;
  },
  buildContainer(ref) {
    if (ref) {
      if (!document.querySelector('.TP138m-compare--container')) {
        ref.insertAdjacentHTML('beforeend', `
          <div class="TP138m-compare--container">
            <div class="TP138m-compare--title">
              <h2>Compare Products (<span>0</span>)</h2>

              <span class="TP138m-toggle"></span>
            </div>

            <div class="TP138m-products">
              <div class="TP138m-products--wrap">
                <div class="TP138m-placeholder">
                  <p>Selected products will appear here</p>
                </div>
                <div class="TP138m-placeholder">
                  <p>Selected products will appear here</p>
                </div>
                <div class="TP138m-placeholder">
                  <p>Selected products will appear here</p>
                </div>
                <div class="TP138m-placeholder">
                  <p>Selected products will appear here</p>
                </div>
              </div>
            </div>
          </div>
        `);
      }
    }
  },
  addProduct(productData) {
    if (productData) {
      const container = document.querySelector('.TP138m-compare--container .TP138m-products');
      const numEL = document.querySelector('.TP138m-compare--title h2 span');
      const products = container.querySelectorAll('.TP138m-prod');
      const placeholders = document.querySelectorAll('.TP138m-placeholder');

      if (container) {
        // If not already being compared
        if (!container.querySelector(`#${productData.id}`)) {
          // If less than 4
          if (products.length <= 4) {
            // Shift one placeholder container
            if (placeholders[0]) {
              placeholders[0].parentElement.removeChild(placeholders[0]);
            }
            const productContainer = container.querySelector('.TP138m-products--wrap');
            productContainer.insertAdjacentHTML('afterbegin', `
              <div class="TP138m-prod" data-id="${productData.id}">
                <span class="close">+</span>
  
                ${productData.image.outerHTML}
  
                ${productData.price.outerHTML}

                ${productData.title.outerHTML}
                
                ${productData.delivery ? productData.delivery.outerHTML : ''}
  
                ${productData.collect.outerHTML}
  
              </div>
            `);
            this.increment(numEL);
            events.send(settings.ID, 'Click', 'Product added to comparison bar');
            // Show comparison bar when it contains at least 1 product.
            if (!container.parentElement.classList.contains('TP138m-show')) {
              container.parentElement.classList.add('TP138m-show');
            }
          }
        }
      }
    }
  },
  increment(el) {
    if (el) {
      let current = parseInt(el.textContent, 10);
      el.textContent = current += 1;
    }
  },
  decrement(el) {
    if (el) {
      let current = parseInt(el.textContent, 10);
      el.textContent = current -= 1;
    }
  },
  changeText(btn) {
    if (btn.classList.contains('active')) {
      btn.childNodes[4].textContent = 'Compare';
      btn.classList.remove('active');
    } else {
      btn.childNodes[4].textContent = 'Compared';
      btn.classList.add('active');
    }
  },
  addProductsToStorage(html) {
    if (html) {
      localStorage.setItem('TP138mProducts', html.innerHTML);
    }
  },
  getProductsFromStorage() {
    let returnedHTML;
    if (localStorage.getItem('TP138mProducts')) {
      returnedHTML = localStorage.getItem('TP138mProducts');
    }
    return returnedHTML;
  },
};

function matchHeight(productArr) {
  // Grab divs with the class name 'match-height'
  const getDivs = productArr;

  // Find out how my divs there are with the class 'match-height'
  const arrayLength = getDivs.length;
  const heights = [];

  // Create a loop that iterates through the getDivs variable and pushes the heights of the divs into an empty array
  for (let i = 0; i < arrayLength; i += 1) {
    heights.push(getDivs[i].offsetHeight);
  }

  // Find the largest of the divs
  function getHighest() {
    return Math.max(...heights);
  }

  // Set a variable equal to the tallest div
  const tallest = getHighest();

  // Iterate through getDivs and set all their height style equal to the tallest variable
  for (let i = 0; i < getDivs.length; i += 1) {
    getDivs[i].style.height = `${tallest}px`;
  }
}


function toggle(container) {
  if (container) {
    const numEL = container.querySelector('.TP138m-compare--title h2 span');
    container.addEventListener('click', (e) => {
      
      // Open / Close container
      if (e.target.classList.contains('TP138d-compare--title') || e.target.tagName === 'H2') {
        container.classList.toggle('open');
        events.send(settings.ID, 'Click', 'Comparison bar');
      }
      // if (e.target.tagName === 'H2') {
      //   const addedProducts = container.querySelectorAll('.TP138m-products .TP138m-prod');
      //   container.classList.toggle('open');
      //   if (addedProducts && addedProducts.length === 0) {
      //     setTimeout(() => {
      //       container.classList.toggle('open');
      //     }, 2000);
      //   }
      //   events.send(settings.ID, 'Click', 'Comparison bar');
      // }
      // Close / Remove product
      if (e.target.classList.contains('close')) {
        const thisProduct = e.target.parentElement;
        // Add placeholder back
        thisProduct.parentElement.insertAdjacentHTML('beforeend', `
          <div class="TP138m-placeholder">
            <p>Selected products will appear here</p>
          </div>
        `);
        // Remove product
        thisProduct.parentElement.removeChild(thisProduct);
        // Decrement number
        compare.decrement(numEL);
        // Remove tick
        const prodId = thisProduct.getAttribute('data-id');
        const thisProdBtn = document.querySelector(`form#${prodId}`).parentElement.querySelector('.TP138m-compare.active');

        if (thisProdBtn) {
          // Change text back to 'Compare'
          compare.changeText(thisProdBtn);
        }
        // If 0 products, show placeholder title.
        const addedProducts = container.querySelectorAll('.TP138m-products .TP138m-prod');
        if (addedProducts && addedProducts.length === 0) {
          setTimeout(() => {
            if (container.classList.contains('open')) {
              container.classList.remove('open');
            }
            if (container.classList.contains('TP138m-show')) {
              container.classList.remove('TP138m-show');
            }
          }, 2000);
        }
      }
      // Add for delivery
      if (e.target.getAttribute('id') === 'addToCartButton') {
        const product = e.target.parentElement.parentElement;
        let productID;
        if (product.classList.contains('TP138m-prod')) {
          productID = product.getAttribute('data-id');
          const existingBtn = document.querySelector(`form#${productID} a#addToCartButton`);
          if (existingBtn) {
            existingBtn.click();
            container.classList.remove('open');
            events.send(settings.ID, 'Click', 'Add for delivery');
          }
        }
      }
      // Add for collection
      if (e.target.getAttribute('id') === 'addForCollection') {
        const product = e.target.parentElement.parentElement.parentElement;
        let productID;
        if (product.classList.contains('TP138m-prod')) {
          productID = product.getAttribute('data-id');
          const existingBtn = document.querySelector(`form#${productID} #addForCollection`);
          if (existingBtn) {
            existingBtn.click();
            container.classList.remove('open');
            events.send(settings.ID, 'Click', 'Check stock at local branch');
          }
        }
      }
      // If click on button text directly
      if (e.target.tagName === 'B') {
        // Add for delivery
        if (e.target.parentElement && e.target.parentElement.getAttribute('id') === 'addToCartButton') {
          const product = e.target.parentElement.parentElement.parentElement;
          let productID;
          if (product.classList.contains('TP138m-prod')) {
            productID = product.getAttribute('data-id');
            const existingBtn = document.querySelector(`form#${productID} a#addToCartButton`);
            if (existingBtn) {
              existingBtn.click();
              container.classList.remove('open');
              events.send(settings.ID, 'Click', 'Add for delivery');
            }
          }
        }
        // Add for collection
        if (e.target.parentElement && e.target.parentElement.getAttribute('id') === 'addForCollection') {
          const product = e.target.parentElement.parentElement.parentElement.parentElement;
          let productID;
          if (product.classList.contains('TP138m-prod')) {
            productID = product.getAttribute('data-id');
            const existingBtn = document.querySelector(`form#${productID} #addForCollection`);
            if (existingBtn) {
              existingBtn.click();
              container.classList.remove('open');
              events.send(settings.ID, 'Click', 'Check stock at local branch');
            }
          }
        }
      }
    });
  }
}

export { setup, addCompareCta, compare, toggle, matchHeight }; // eslint-disable-line
