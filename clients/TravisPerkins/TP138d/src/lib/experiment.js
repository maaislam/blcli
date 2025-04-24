/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup, addCompareCta, compare, toggle,
} from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  if (document.body.classList.contains('TP138d')) {
    return false;
  }
  setup();

  const storedUrl = localStorage.getItem('TP138dUrl');
  if (window.location.href !== 'https://www.travisperkins.co.uk/cart') {
    // Store current URL. Clear localStorage if URL is different.
    const currentUrl = window.location.href;
    localStorage.setItem('TP138dUrl', currentUrl);

    if (storedUrl && currentUrl !== storedUrl) {
      localStorage.removeItem('TP138dProducts');
    } else {
      localStorage.setItem('TP138dUrl', currentUrl);
    }
  }

  // Experiment code
  const products = cacheDom.getAll('.page-productGrid.feature-design .list_view #products .row .prod');
  const containerRef = cacheDom.get('#wrapper');
  const productsContainer = cacheDom.get('.page-productGrid.feature-design .list_view #products');

  // Add container
  compare.buildContainer(containerRef);

  // Add maximum product message.
  if (!document.querySelector('.TP138d-error')) {
    containerRef.insertAdjacentHTML('beforeend', `
      <div class="TP138d-error">
        <div>
          <p>Sorry, only four products may be compared at once.</p>
        </div>
      </div>
    `);
  }

  const productCountEl = document.querySelector('.TP138d .TP138d-compare--container .TP138d-compare--title h2 > span');
  const errorMessage = document.querySelector('.TP138d-error');

  // Activates / deactivates the comparison function for this product.
  const compareClick = (product) => {
    const compareButton = product.querySelector('.TP138d-compare');

    const removeItem = () => {
      const productForm = product.querySelector('form');
      if (productForm) {
        const prodId = productForm.getAttribute('id');
        const productsWrapper = document.querySelector('.TP138d-products .TP138d-products--wrap');

        const addedProduct = document.querySelector(`.TP138d .TP138d-compare--container .TP138d-products .TP138d-prod[data-id="${prodId}"]`);
        if (addedProduct && addedProduct.getAttribute('data-id') === prodId) {
          const addedProductParent = addedProduct.parentElement;

          if (addedProductParent) {
            addedProductParent.removeChild(addedProduct);
            compare.decrement(productCountEl);
            compare.changeText(compareButton);
            productsWrapper.insertAdjacentHTML('beforeend', `
              <div class="TP138d-placeholder">
                <p>Selected products will appear here</p>
              </div>
            `);
          }
        }
      }
    };
    const compareItem = () => {
      const numOfProducts = document.querySelectorAll('.TP138d .TP138d-compare--container .TP138d-products .TP138d-prod');
      if (numOfProducts && numOfProducts.length < 4) {
        // Store product data
        const data = compare.getProductData(product);
        // Add product
        compare.addProduct(data); // Add product info
        const { link } = data;
        if (link && link.getAttribute('href')) {
          const productRef = document.querySelector('.TP138d-products--wrap .TP138d-prod');
          compare.addProductInfo(link.getAttribute('href'), productRef);
        }
        // Change text to 'Compared' and add active class
        compare.changeText(compareButton);
        // Remove placeholder title
        const placeholderTitle = document.querySelector('.TP138d .TP138d-compare--container .TP138d-products .TP138d-products--wrap > h2');
        if (placeholderTitle) {
          if (!placeholderTitle.classList.contains('hide')) {
            placeholderTitle.classList.add('hide');
          }
        }
        // Push all added products to localStorage
        setTimeout(() => {
          const productContainer = document.querySelector('.TP138d .TP138d-compare--container .TP138d-products');
          if (productContainer) {
            compare.addProductsToStorage(productContainer);
          }
        }, 1500);
      } else {
        errorMessage.classList.add('TP-show');
        setTimeout(() => {
          errorMessage.classList.remove('TP-show');
        }, 3500);
      }
    };

    if (compareButton) {
      // Assign compare button controls.
      compareButton.addEventListener('click', () => {
        const productWithVariants = product.querySelector('.prod_qty_variant .variant_select');
        // Products with Variants
        if (productWithVariants) {
          const variantSelectOptions = productWithVariants.querySelectorAll('select.processed option:not(:first-of-type)');
          if (variantSelectOptions) {
            // Check if variant has selected option.
            const hasChoice = Array.from(variantSelectOptions).filter((option => option.selected));

            if (!compareButton.classList.contains('active')) {
              if (hasChoice.length) {
                compareItem();
              } else {
                product.insertAdjacentHTML('beforeend', `
                  <div class="TP138d-variant-error">
                    <p>Please select an option from the dropdown</p>
                  </div>
                `);
                setTimeout(() => {
                  const error = product.querySelector('.TP138d-variant-error');
                  if (error) {
                    error.parentElement.removeChild(error);
                  }
                }, 2500);
              }
            } else {
              removeItem();
            }
          }
        }

        // No Variants
        if (!productWithVariants) {
          if (!compareButton.classList.contains('active')) {
            compareItem();
          } else {
            removeItem();
          }
        }
      });
    }
  };

  // Add
  Array.from(products).forEach((product) => {
    addCompareCta(product);
    compareClick(product);
  });

  // Controls clicks in container
  const container = document.querySelector('.TP138d-compare--container');
  toggle(container);


  const productRows = document.querySelectorAll('#products .row');
  observer.connect(productRows, () => {
    // // Remove event listener
    setTimeout(() => {
      for (let i = 0; products.length > i; i += 1) {
        if (!products[i].querySelector('.TP138d-compare')) {
          addCompareCta(products[i]);
          compareClick(products[i]);
        }
      }

      // Get current added products
      const addedProducts = document.querySelectorAll('.TP138d-products .TP138d-prod');
      for (let i = 0; addedProducts.length > i; i += 1) {
        const prodId = addedProducts[i].getAttribute('data-id');
        if (prodId) {
          const productListingForm = document.querySelector(`form#${prodId}`);
          if (productListingForm) {
            const compareBtn = productListingForm.parentElement.querySelector('.TP138d-compare');
            if (compareBtn) {
              compareBtn.classList.add('active');
              compareBtn.childNodes[4].textContent = 'Compared';
            }
          }
        }
      }
    }, 1500);
  }, {
    config: {
      attributes: false,
      childList: true,
      subtree: true,
    },
  });


  // Check for localStorage products first.
  const storedProducts = compare.getProductsFromStorage();
  const productContainerRef = document.querySelector('.TP138d .TP138d-compare--container .TP138d-products');
  if (storedProducts) {
    if (productContainerRef) {
      // Add content
      productContainerRef.innerHTML = storedProducts;
      // Show comparison bar
      if (productContainerRef.parentElement) {
        productContainerRef.parentElement.classList.add('TP138d-show');
      }
      // Increment counter
      const addedProducts = productContainerRef.querySelectorAll('.TP138d-prod');
      for (let i = 0; addedProducts.length > i; i += 1) {
        // Add tick to added products compare button.
        const prodId = addedProducts[i].getAttribute('data-id');
        const prodForm = document.querySelector(`#products #${prodId}`);
        if (prodForm) {
          const prodBtn = prodForm.nextElementSibling;
          if (prodBtn && prodBtn.classList.contains('TP138d-compare')) {
            compare.changeText(prodBtn);
          }
        }
      }
    }
  }

  let numberIndicator = document.querySelector('.TP138d-compare--title h2 span');
  let comparedProducts = document.querySelectorAll('.TP138d-compare--container .TP138d-prod');
  numberIndicator.textContent = comparedProducts.length;
  // Observe compare container and increment / decrement as needed. Hide if 0.
  const containerWrap = document.querySelector('.TP138d-compare--container .TP138d-products--wrap');
  observer.connect(containerWrap, () => {
    numberIndicator = document.querySelector('.TP138d-compare--title h2 span');
    comparedProducts = containerWrap.querySelectorAll('.TP138d-prod');
    numberIndicator.textContent = comparedProducts.length;

    // Close if 0.
    if (!comparedProducts) {
      containerWrap.parentElement.classList.remove('open');
    }

    // Remove button ID's
    const deliveryBtns = document.querySelectorAll('.TP138d-products--wrap .tpQ_button input');
    const collectBtns = document.querySelectorAll('.TP138d-products--wrap .ccButton input');
    for (let i = 0; deliveryBtns.length > i; i += 1) {
      if (deliveryBtns[i].getAttribute('id')) {
        deliveryBtns[i].setAttribute('id', 'TP138-deliver');
      }
    }
    for (let i = 0; collectBtns.length > i; i += 1) {
      if (collectBtns[i].getAttribute('id')) {
        collectBtns[i].setAttribute('id', 'TP138-collect');
      }
    }

    // Update local storage
    compare.addProductsToStorage(productContainerRef);
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    },
  });


  // Observe the entire page for postcode collection as this removes all product compare buttons.
  // Requires a page refresh
  const basketCart = document.querySelector('#products');
  observer.connect(basketCart, () => {
    // // Remove event listener
    setTimeout(() => {
      const compareButtons = document.querySelectorAll('button.TP138d-compare');
      if (compareButtons.length === 0) {
        window.location.reload(true);
      }
    }, 1500);
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    },
  });


  // If on grid view, trigger match height on products info.
  observer.connect([document.querySelector('#r_content')], () => {
    if (document.querySelector('.grid_view')) {
      (function matchHeight() {
        // Grab divs with the class name 'match-height'
        const getDivs = document.getElementsByClassName('prod_info');

        // Find out how my divs there are with the class 'match-height'
        const arrayLength = getDivs.length;
        const heights = [];

        // Create a loop that iterates through the getDivs variable and pushes the heights of the divs into an empty array
        for (var i = 0; i < arrayLength; i++) {
          heights.push(getDivs[i].offsetHeight);
        }

        // Find the largest of the divs
        function getHighest() {
          return Math.max(...heights);
        }

        // Set a variable equal to the tallest div
        const tallest = getHighest();

        // Iterate through getDivs and set all their height style equal to the tallest variable
        for (var i = 0; i < getDivs.length; i++) {
          getDivs[i].style.height = `${tallest}px`;
        }
      }());
    } else {
      const addedHeightEls = document.querySelectorAll('.prod_info');
      for (let i = 0; addedHeightEls.length > i; i += 1) {
        addedHeightEls[i].removeAttribute('style');
      }
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    },
  });
};

export default activate;
