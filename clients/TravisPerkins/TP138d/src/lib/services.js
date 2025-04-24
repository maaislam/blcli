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
    const addedButtons = product.querySelectorAll('.TP138d-compare');
    if (addedButtons.length) {
      for (let i = 0; addedButtons.length > i; i += 1) {
        addedButtons[i].parentElement.removeChild(addedButtons[i]);
      }
    }
    if (form) {
      form.insertAdjacentHTML('afterend', `
        <button class="TP138d-compare">
          <span class="tick"></span>
          <span class="img"></span> Compare
        </button>
      `);
    }
  }
}

const compare = {
  getProductData(product) {
    const thisProduct = product;
    const deliveryBtn = thisProduct.querySelector('.tpQ_button');
    const deliveryInput = deliveryBtn.querySelector('input');
    let deliveryElement;
    if (deliveryInput.getAttribute('disabled') === 'disabled') {
      deliveryElement = '';
    } else {
      deliveryElement = deliveryBtn;
    }
    const productData = {
      id: thisProduct.querySelector('form').getAttribute('id'),
      image: thisProduct.querySelector('.prod_img'),
      title: thisProduct.querySelector('.prod_info h4'),
      collect: thisProduct.querySelector('.ccButton'),
      delivery: deliveryElement,
      price: thisProduct.querySelector('.product_price_holder'),
      form: thisProduct.querySelector('form.plp_add_to_cart_form'),
      link: thisProduct.querySelector('h4.prod_name > a'),
    };
    return productData;
  },
  buildContainer(ref) {
    if (ref) {
      if (!document.querySelector('.TP138d-compare--container')) {
        ref.insertAdjacentHTML('afterbegin', `
          <div class="TP138d-compare--container">
            <span id="open-compare"></span>
            <div class="TP138d-compare--title">
              <h2>Compare Products (<span>0</span>)</h2>

              <span class="TP138d-toggle"></span>
            </div>

            <div class="TP138d-products">
              <div class="TP138d-products--wrap">
                <div class="TP138d-placeholder">
                  <p>Selected products will appear here</p>
                </div>
                <div class="TP138d-placeholder">
                  <p>Selected products will appear here</p>
                </div>
                <div class="TP138d-placeholder">
                  <p>Selected products will appear here</p>
                </div>
                <div class="TP138d-placeholder">
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
      const container = document.querySelector('.TP138d-compare--container .TP138d-products');
      const numEL = document.querySelector('.TP138d-compare--title h2 span');
      const products = container.querySelectorAll('.TP138d-prod');
      const placeholders = container.querySelectorAll('.TP138d-placeholder');


      if (container) {
        // If not already being compared
        if (!container.querySelector(`#products #${productData.id}`)) {
          // If less than 4
          if (products.length < 4) {
            // Shift one placeholder container
            if (placeholders && placeholders[placeholders.length - 1]) {
              placeholders[0].parentElement.removeChild(placeholders[placeholders.length - 1]);
            }
            const productContainer = container.querySelector('.TP138d-products--wrap');
            productContainer.insertAdjacentHTML('afterbegin', `
              <div class="TP138d-prod" data-id="${productData.id}">
                <span class="close">+</span>
  
                ${productData.image.outerHTML}
  
                ${productData.delivery ? productData.delivery.outerHTML : ''}
  
                ${productData.collect.outerHTML}
  
                ${productData.price.outerHTML}

                ${productData.title.outerHTML}
              </div>
            `);
            this.increment(numEL);
            events.send(settings.ID, 'Click', 'Product added to comparison bar');
            // Show comparison bar when it contains at least 1 product.
            if (!container.parentElement.classList.contains('TP138d-show')) {
              container.parentElement.classList.add('TP138d-show');
            }
          }
        }
      }
    }
  },
  addProductInfo(link, ref) {
    // Get product data
    
    const href = link;
    let productDetails = document.createElement('table');
    productDetails.classList.add('TP138d-specTable');
    if (href) {
      var request = new XMLHttpRequest();
      request.open('GET', href, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const resp = request.responseText;
          const div = document.createElement('div');
          div.innerHTML = resp;
          
          const specRows = div.querySelectorAll('#tab-techspecs table tr');
          console.log(specRows);
          // Get top 5 product spec table rows.
          for (let i = 0; specRows.length > i; i += 1) {
            if (i === 6) { break }
            productDetails.insertAdjacentHTML('beforeend', specRows[i].outerHTML);
          }
          console.log('product details ', productDetails);
          ref.insertAdjacentHTML('beforeend', productDetails.outerHTML);
        } else {
          // We reached our target server, but it returned an error

        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();  
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
      localStorage.setItem('TP138dProducts', html.innerHTML);
    }
  },
  getProductsFromStorage() {
    let returnedHTML;
    if (localStorage.getItem('TP138dProducts')) {
      returnedHTML = localStorage.getItem('TP138dProducts');
    }
    return returnedHTML;
  },
};


function toggle(container) {
  if (container) {
    const numEL = container.querySelector('.TP138d-compare--title h2 span');
    container.addEventListener('click', (e) => {
      if (e.target.getAttribute('id') === 'open-compare') {
        // console.log('clicked!');
        container.classList.toggle('open');
        events.send(settings.ID, 'Click', 'Comparison bar');
      }
      // if (e.target.classList.contains('TP138d-compare--title') || e.target.nodeName === 'h2') {
      //   console.log('clicked here');
      //   container.classList.toggle('open');
      //   events.send(settings.ID, 'Click', 'Comparison bar');
      // }

      // Close / Remove product
      if (e.target.classList.contains('close')) {
        const thisProduct = e.target.parentElement;
        // Add placeholder back
        if (thisProduct) {
          thisProduct.insertAdjacentHTML('afterend', `
            <div class="TP138d-placeholder">
              <p>Selected products will appear here</p>
            </div>
          `);
        }
        // Remove product
        thisProduct.parentElement.removeChild(thisProduct);
        // Decrement number
        compare.decrement(numEL);
        // Remove tick
        const prodId = thisProduct.getAttribute('data-id');
        const thisProdForm = document.querySelector(`form#${prodId}`);
        let thisProdBtn;
        if (thisProdForm) {
          const prodFormParent = thisProdForm.parentElement;
          if (prodFormParent) {
            thisProdBtn = prodFormParent.querySelector('.TP138d-compare.active');
          }
        }

        if (thisProdBtn) {
          // Change text back to 'Compare'
          compare.changeText(thisProdBtn);
        }
        // If 0 products, show placeholder title.
        // const addedProducts = container.querySelectorAll('.TP138d-products .TP138d-prod');
        // if (addedProducts && addedProducts.length === 0) {
        //   setTimeout(() => {
        //     if (container.classList.contains('open')) {
        //       container.classList.remove('open');
        //     }
        //     if (container.classList.contains('TP138d-show')) {
        //       container.classList.remove('TP138d-show');
        //     }
        //   }, 2000);
        // }
      }

      // Add for delivery
      if (e.target.getAttribute('id') === 'TP138-deliver') {
        const product = e.target.parentElement.parentElement;
        let productID;
        if (product.classList.contains('TP138d-prod')) {
          productID = product.getAttribute('data-id');
          const existingBtn = document.querySelector(`#products .prod .tpPlpProductPanelComponent #${productID} .tpQ_button input[type="submit"]`);
          if (existingBtn) {
            existingBtn.click();
            container.classList.remove('open');
            events.send(settings.ID, 'Click', 'Add for delivery');
          }
        }
      }

      // Add for collection
      if (e.target.getAttribute('id') === 'TP138-collect') {
        const product = e.target.parentElement.parentElement;
        let productID;
        if (product.classList.contains('TP138d-prod')) {
          productID = product.getAttribute('data-id');
          const existingBtn = document.querySelector(`#products #${productID} input#addForCollectButton`);
          if (existingBtn) {
            existingBtn.click();
            container.classList.remove('open');
            events.send(settings.ID, 'Click', 'Check stock at local branch');
          }
        }
      }
    });
  }
}

export { setup, addCompareCta, compare, toggle }; // eslint-disable-line
