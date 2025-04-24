/**
 * TP138m - Description
 * @author User Conversion
 */
import { setup, addCompareCta, compare, toggle, matchHeight } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { observer, pollerLite } from './../../../../../lib/uc-lib';

const activate = () => {
  if (document.body.classList.contains('TP138m')) {
    return false;
  }
  setup();

  const storedUrl = localStorage.getItem('TP138mUrl');
  if (window.location.href !== 'https://www.travisperkins.co.uk/cart') {
    // Store current URL. Clear localStorage if URL is different.
    const currentUrl = window.location.href;
    localStorage.setItem('TP138mUrl', currentUrl);

    if (storedUrl && currentUrl !== storedUrl) {
      localStorage.removeItem('TP138mProducts');
    } else {
      localStorage.setItem('TP138mUrl', currentUrl);
    }
  }

  // Experiment code
  const productParent = cacheDom.get('.tp_prod_listing .tp_prodViewWrapper .tp_prodView');
  const products = cacheDom.getAll('.tp_prod_listing .tp_prodViewWrapper .tp_prodView li.product_item');
  const containerRef = cacheDom.get('#wrapper');

  // Add container
  compare.buildContainer(containerRef);

  // Add maximum product message.
  if (!document.querySelector('.TP138m-error')) {
    containerRef.insertAdjacentHTML('beforeend', `
      <div class="TP138m-error">
        <div>
          <p>Sorry, only four products may be compared at once.</p>
        </div>
      </div>
    `);
  }

  const productCountEl = document.querySelector('.TP138m .TP138m-compare--container .TP138m-compare--title h2 > span');
  const errorMessage = document.querySelector('.TP138m-error');

  // Controls clicks in container
  const container = document.querySelector('.TP138m-compare--container');
  toggle(container);

  const compareClick = (product) => {
    const compareButton = product.querySelector('.TP138m-compare');

    const removeItem = () => {
      const productForm = product.querySelector('form');
      if (productForm) {
        const prodId = productForm.getAttribute('id');
        const productsWrapper = document.querySelector('.TP138m-products .TP138m-products--wrap');

        const addedProduct = document.querySelector(`.TP138m .TP138m-compare--container .TP138m-products .TP138m-prod[data-id="${prodId}"]`);
        if (addedProduct && addedProduct.getAttribute('data-id') === prodId) {
          const addedProductParent = addedProduct.parentElement;

          if (addedProductParent) {
            addedProductParent.removeChild(addedProduct);
            compare.decrement(productCountEl);
            compare.changeText(compareButton);
            productsWrapper.insertAdjacentHTML('beforeend', `
              <div class="TP138m-placeholder">
                <p>Selected products will appear here</p>
              </div>
            `);
          }
        }
      }
    };

    const compareItem = () => {
      if (!compareButton.classList.contains('active')) {
        // NOT ACTIVE
        const numOfProducts = document.querySelectorAll('.TP138m .TP138m-compare--container .TP138m-products .TP138m-prod');
        if (numOfProducts && numOfProducts.length < 4) {
          // Store product data
          const data = compare.getProductData(product);
          // Add product
          compare.addProduct(data);
          // Change text to 'Compared' and add active class
          compare.changeText(compareButton);
          // Remove placeholder title
          const placeholderTitle = document.querySelector('.TP138m .TP138m-compare--container .TP138m-products .TP138m-products--wrap > h2');
          if (placeholderTitle) {
            if (!placeholderTitle.classList.contains('hide')) {
              placeholderTitle.classList.add('hide');
            }
          }
          // Push all added products to localStorage
          const productContainer = document.querySelector('.TP138m .TP138m-compare--container .TP138m-products');
          if (productContainer) {
            compare.addProductsToStorage(productContainer);
          }
        } else {
          errorMessage.classList.add('TP-show');
          setTimeout(() => {
            errorMessage.classList.remove('TP-show');
          }, 3500);
        }
      } else if (compareButton.classList.contains('active')) {
        // ACTIVE
        const productForm = product.querySelector('form');
        if (productForm) {
          const prodId = productForm.getAttribute('data-id');
          const addedProduct = document.querySelector(`.TP138m .TP138m-compare--container .TP138m-products #${prodId}`);
          if (addedProduct) {
            addedProduct.parentElement.removeChild(addedProduct);
            compare.decrement(productCountEl);
            compare.changeText(compareButton);
          }
        }
      }
    };

    if (compareButton) {
      compareButton.addEventListener('click', () => {
        const productWithVariants = product.querySelector('.prod_qty_variant .variant_select');
        // Check if product has variant
        if (productWithVariants) {
          const variantSelectOptions = productWithVariants.querySelectorAll('select option:not(:first-of-type)');
          if (variantSelectOptions) {
            // Check if variant has selected option.
            const hasChoice = Array.from(variantSelectOptions).filter((option => option.selected));

            if (!compareButton.classList.contains('active')) {
              if (hasChoice.length) {
                compareItem();
              } else {
                product.insertAdjacentHTML('beforeend', `
                  <div class="TP138m-variant-error">
                    <p>Please select an option from the dropdown</p>
                  </div>
                `);
                setTimeout(() => {
                  const error = product.querySelector('.TP138m-variant-error');
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


  const productList = document.querySelector('.tp_prodView.list');
  observer.connect(productList, () => {
    setTimeout(() => {
      const productItems = productList.querySelectorAll('li.advanced_plp_product_item.product_item');

      for (let i = 0; productItems.length > i; i += 1) {
        if (!productItems[i].querySelector('.TP138m-compare')) {
          addCompareCta(productItems[i]);
          compareClick(productItems[i]);
        }
      }

      // Get current added products
      const addedProducts = document.querySelectorAll('.TP138m-products .TP138m-prod');
      for (let i = 0; addedProducts.length > i; i += 1) {
        const prodId = addedProducts[i].getAttribute('data-id');
        if (prodId) {
          const productListingForm = document.querySelector(`form#${prodId}`);
          if (productListingForm) {
            const compareBtn = productListingForm.parentElement.querySelector('.TP138m-compare');
            if (compareBtn) {
              compareBtn.classList.add('active');
              compareBtn.childNodes[4].textContent = 'Compared';
            }
          }
        }
      }
    }, 1000);
  }, {
    config: {
      attributes: false,
      childList: true,
      subtree: true,
    },
  });

  // Check for localStorage products first.
  const storedProducts = compare.getProductsFromStorage();
  const productContainerRef = document.querySelector('.TP138m .TP138m-compare--container .TP138m-products');
  if (storedProducts) {
    if (productContainerRef) {
      // Add content
      productContainerRef.innerHTML = storedProducts;
      // Show comparison bar
      if (productContainerRef.parentElement) {
        productContainerRef.parentElement.classList.add('TP138m-show');
      }
      // Increment counter
      const addedProducts = productContainerRef.querySelectorAll('.TP138m-prod');
      for (let i = 0; addedProducts.length > i; i += 1) {
        compare.increment(productCountEl);
        // Add tick to added products compare button.
        const prodId = addedProducts[i].getAttribute('data-id');
        const prodForm = document.getElementById(prodId);
        if (prodForm) {
          const prodBtn = prodForm.nextElementSibling;
          if (prodBtn && prodBtn.classList.contains('TP138m-compare')) {
            compare.changeText(prodBtn);
          }
        }
      }
    }
  }

  // Match height
  const priceRow = document.querySelectorAll('.TP138m .TP138m-compare--container .TP138m-products .price_section');
  const headerRow = document.querySelectorAll('.TP138m .TP138m-compare--container .TP138m-products .product_header');
  if (priceRow && headerRow) {
    matchHeight(priceRow);
    matchHeight(headerRow);
  }

  // Add observer to product container for match height purposes.
  const addedContainer = document.querySelector('.TP138m .TP138m-compare--container .TP138m-products .TP138m-products--wrap');
  observer.connect(addedContainer, () => {
    const newPriceRow = addedContainer.querySelectorAll('.TP138m .TP138m-compare--container .TP138m-products .price_section');
    const newHeaderRow = addedContainer.querySelectorAll('.TP138m .TP138m-compare--container .TP138m-products .product_header');
    matchHeight(newPriceRow);
    matchHeight(newHeaderRow);
    if (!addedContainer.querySelector('.TP138m-prod')) {
      const outerWrap = document.querySelector('.TP138m-compare--container');
      if (outerWrap) {
        outerWrap.classList.remove('TP138m-show');
      }
    }

    // Update local storage
    compare.addProductsToStorage(productContainerRef);
  });
};

export default activate;
