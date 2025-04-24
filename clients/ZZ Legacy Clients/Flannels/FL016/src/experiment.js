import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';

/**
 * {{FL016}} - {{Expose Basket in Checkout - Desktop}}
 */

const Run = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL016',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const bodyVar = document.body;
      const regexArray = [/(\/)(checkout)(\/)(deliverychoices)($|\?.*)/, /(\/)(checkout)(\/)(payment)($|\?.*)/, /(\/)(checkout)(\/)(carddetails)($|\?.*)/, /(\/)(checkout)(\/)(usevoucher)($|\?.*)/];
      let continueButton;
      let productList;
      let basketTotal;
      let FL016Container;
      let viewBag;
      let closeBag;
      let orderSummaryParent;
      let discountCheck;
      // Array maybe reassigned later as product array, if not empty array needed
      // eslint-disable-next-line
      let FL016Products = [];
      // basket data object reassigned when retrieving from session storage
      // eslint-disable-next-line
      let basketInfo = {
        prevDiscountPrice: 0,
        productCount: null,
      };
      // prevDiscountPrice set to 0; will be reassigned later if a discount is applied
      let numberOfProducts;
      return {
        bodyVar,
        regexArray,
        continueButton,
        productList,
        basketTotal,
        FL016Container,
        viewBag,
        closeBag,
        orderSummaryParent,
        FL016Products,
        numberOfProducts,
        basketInfo,
        discountCheck,
      };
    })(),
    init: () => {
      // control
      if (Exp.settings.VARIATION === '3') {
        if (window.location.pathname.indexOf('checkout') !== -1) {
          events.send(Exp.settings.ID, 'Control', 'Control is active');
        }
        return false;
      }
      // Setup
      const { services } = Exp;
      services.tracking();
      services.pageCheck();
      
      if (Exp.settings.VARIATION === '2') {
        document.body.classList.add('FL016-2');
        // Position below 'Continue Securely'
        // Display products as a slider
        let $ = null;
        poller(['.FL016-Wrap', () => {
          let run = false;
          if (window.jQuery) {
            $ = window.jQuery;
            run = true;
          }
          return run;
        }], () => {
          const addedBasket = document.querySelector('.FL016-Wrap');
          const links = document.querySelector('.ExitLinks');
          // Move the basket below checkout CTA
          services.moveBasket(addedBasket, links);
          // Turn into slider
          const productsToSlider = document.querySelector('.FL016-2-Wrap .FL016-Wrap');
          if (productsToSlider) {
            $(document).ready(() => {
              $(productsToSlider).bxSlider({
                mode: 'horizontal',
                auto: true,
                pause: 5000,
                shrinkItems: true,
              });
            });
          }
          // Change 'Close bag' to continue shopping
          const closeBagBtn = document.querySelector('.FL016-2-Wrap .ExitLinks .FL016-Close-Bag-Container');
          if (closeBagBtn) {
            closeBagBtn.innerHTML = '<a href="https://www.flannels.com">Continue Shopping</a>';
          }

          // Add tracking for clicking 'Edit Bag'
          const editBagCta = document.querySelector('.FL016-2-Wrap a#dnn_ctr102498_Delivery_ctl00_ctl01_lnkEditCart');
          if (editBagCta) {
            editBagCta.addEventListener('click', () => {
              events.send(Exp.settings.ID, 'Click', 'Edit Bag');
            });
          }
        });
      }
      // V2 Add tracking to 'View Bag'
      const viewBagCta = document.querySelector('.FL016-View-Bag-Container .FL016-View-Bag-Button');
      if (viewBagCta) {
        viewBagCta.addEventListener('click', () => {
          events.send(Exp.settings.ID, 'Click', 'View Bag');
        });
      }
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      pageCheck: () => {
        // Check page type
        const { components } = Exp;
        let buildBasket = false;
        // Loop through checkout regexes, if pathname matches break loop and setup basket
        for (let i = 0; i < Exp.cache.regexArray.length; i += 1) {
          if (window.location.pathname.match(Exp.cache.regexArray[i])) {
            buildBasket = true;
            Exp.components.setupBasket();
            break;
          }
        }// If not on basket page, collect data using basket page continue button
        if (!buildBasket && window.location.pathname.toUpperCase() === '/CART') {
          components.storeFromBasket();
          // If not in the checkout and not on the basket then store products from the minibag
        } else if (!buildBasket && window.location.pathname.toUpperCase() !== '/CART') {
          components.storeFromMiniBag();
        }
      },
      moveBasket: (basket, links) => {
        if (basket) {
          const ref = document.querySelector('.CheckoutLeft .ProgressButContain');
          if (ref) {
            ref.insertAdjacentHTML('afterend', `
              <div class="FL016-2-Wrap">
                <p>Here's what you have to look forward to...</p>
                ${basket.outerHTML}
                ${links.outerHTML}
              </div>
            `);
          }
        }
      },
    },
    components: {
      setupBasket() {
        // flicker();
        poller([
          '.col-xs-12.ExitLinks>.EditText>a',
          '.col-xs-12.OrderSumm',
          '#SubtotalRow',
          '.col-xs-12.ExitLinks',
          '.col-xs-12.col-md-4.CheckoutLeft',
          '.col-xs-12.ExitLinks>div>a',
          '#DiscountRow',
          // Poll for items in session storage
          () => {
            let checkProducts = false;
            if (sessionStorage.getItem('FL016-Products')) {
              checkProducts = true;
            }
            return checkProducts;
          },
          () => {
            let checkData = false;
            if (sessionStorage.getItem('FL016-Basket-Data')) {
              checkData = true;
            }
            return checkData;
          },
        ], () => {
          // Check basket data and page data match
          // Storing discount information
          Exp.cache.discountCheck = parseFloat(Exp.cache.bodyVar.querySelector('#DiscountRow').getAttribute('data-price'));
          Exp.cache.basketTotal = Exp.cache.bodyVar.querySelector('#SubtotalRow');
          Exp.cache.FL016Products = JSON.parse(sessionStorage.getItem('FL016-Products'));
          Exp.cache.basketInfo = JSON.parse(sessionStorage.getItem('FL016-Basket-Data'));
          Exp.cache.numberOfProducts = parseInt(Exp.cache.basketTotal.getAttribute('data-itemcount'), 10);
          // Comparing if stored product count and number of items on website basket match
          // Compares discount value in session storage object with current discount value
          // Next line exceeds length
          // eslint-disable-next-line
          if (Exp.cache.numberOfProducts !== Exp.cache.basketInfo.productCount || Exp.cache.discountCheck !== Exp.cache.basketInfo.prevDiscountPrice) {
            this.requestBasket();
          } else {
            this.buildTestMarkup();
          }
        });
      },
      requestBasket() {
        // Clear items from session storage
        if (sessionStorage.getItem('FL016-Products')) {
          sessionStorage.removeItem('FL016-Products');
        }
        // Make a request to the basket page for products
        const productRequest = new XMLHttpRequest();
        productRequest.open('GET', 'https://www.flannels.com/Cart', true);
        productRequest.onload = () => {
          if (productRequest.status >= 200 && productRequest.status < 400) {
            const resp = productRequest.responseText;
            const div = document.createElement('div');
            div.insertAdjacentHTML('afterbegin', resp);
            const basketProducts = div.querySelectorAll('table tbody tr');
            // Empty the array of products
            Exp.cache.FL016Products = [];
            for (let i = 0; i < basketProducts.length; i += 1) {
              const productImage = basketProducts[i].querySelector('.productimage img').src;
              const productTitle = basketProducts[i].querySelector('.productdesc .prodDescContainer .productTitle').textContent.trim();
              const productColor = basketProducts[i].querySelector('.productdesc .prodDescContainer .productcolour span + span').textContent.trim();
              const productSize = basketProducts[i].querySelector('.productdesc .prodDescContainer .productsize span + span').textContent.trim();
              const productPrice = basketProducts[i].querySelector('.itemprice .money').textContent.trim();
              const productQuantity = basketProducts[i].querySelector('.prdQuantity .qtybox').value;
              let discountedPrice = null;
              if (basketProducts[i].querySelector('.money.discount')) {
                discountedPrice = basketProducts[i].querySelector('.money.discount').textContent.trim();
              }
              // Push data to array
              // Next line exceeds length
              // eslint-disable-next-line
              this.buildProductArray(productImage, productTitle, productColor, productSize, productQuantity, productPrice, discountedPrice);
            }
            // Information is updated, reassign discount check session storage item
            Exp.cache.basketInfo.productCount = Exp.cache.numberOfProducts;
            Exp.cache.basketInfo.prevDiscountPrice = Exp.cache.discountCheck;
            sessionStorage.setItem('FL016-Basket-Data', JSON.stringify(Exp.cache.basketInfo));
            // Store requested basket
            this.storeProducts();
            // Reassign updated array
            Exp.cache.FL016Products = JSON.parse(sessionStorage.getItem('FL016-Products'));
            // Build markup
            this.buildTestMarkup();
          } // do not build test on unsuccesful request
        };
        productRequest.send();
      },
      storeFromMiniBag() {
        poller([
          '#divBagItems #divButtons #aCheckout',
          '#divBagItems #ulBag > li',
          '#divBagItems #ulBag > li > img',
          '#divBagItems #ulBag > li .BaskName',
          '#divBagItems #ulBag > li .BaskQuant',
          '#divBagItems #ulBag > li .BaskPrice',
          '#divBagItems #ulBag > li .BaskColr',
          '#divBagItems #ulBag > li .BaskSize',
          '#bagQuantity',
        ], () => {
          Exp.cache.continueButton = Exp.cache.bodyVar.querySelector('#divBagItems #divButtons #aCheckout');
          Exp.cache.continueButton.addEventListener('click', () => {
            Exp.cache.productList = Exp.cache.bodyVar.querySelectorAll('#divBagItems #ulBag > li');
            // Set up session storage to recieve data
            // Remove previous session storage if it exists
            if (sessionStorage.getItem('FL016-Products')) {
              sessionStorage.removeItem('FL016-Products');
            }
            // Resuse basket data if it exists
            if (sessionStorage.getItem('FL016-Basket-Data')) {
              Exp.cache.basketInfo = JSON.parse(sessionStorage.getItem('FL016-Basket-Data'));
            }
            // Update basket data
            Exp.cache.basketInfo.productCount = parseInt(Exp.cache.bodyVar.querySelector('#bagQuantity').textContent.trim(), 10);
            sessionStorage.setItem('FL016-Basket-Data', JSON.stringify(Exp.cache.basketInfo));
            // Loop through products and collect required information
            for (let i = 0; i < Exp.cache.productList.length; i += 1) {
              const currentProduct = Exp.cache.productList[i];
              const productImage = currentProduct.querySelector('img').getAttribute('src');
              const productTitle = currentProduct.querySelector('.BaskName').textContent.trim();
              const productColor = currentProduct.querySelector('.BaskColr').textContent.trim();
              const productSize = currentProduct.querySelector('.BaskSize').textContent.trim();
              const productQuantity = currentProduct.querySelector('.BaskQuant').textContent.trim();
              const productPrice = currentProduct.querySelector('.BaskPrice').textContent.trim();
              // Discounted price not in minibag
              const discountedPrice = null;
              // Push data to array
              // Next line exceeds length
              // eslint-disable-next-line
              this.buildProductArray(productImage, productTitle, productColor, productSize, productQuantity, productPrice, discountedPrice);
            }
            this.storeProducts();
          });
        });
      },
      storeFromBasket() {
        poller([
          '#dnn_ctr6973629_ViewBasket_lnkBtnContinueSecurely',
          '#dnn_ctr6973629_ViewBasket_BasketDetails_gvBasketDetails tbody > tr',
          '.productimage img',
          '.productdesc .productTitle',
          '.productcolour span:last-child',
          '.productsize span:last-child',
          '.prdQuantity input',
          'tbody > tr .itemprice .money',
          '#bagQuantity',
        ], () => {
          Exp.cache.continueButton = Exp.cache.bodyVar.querySelector('#dnn_ctr6973629_ViewBasket_lnkBtnContinueSecurely');
          // Continuing to checkout stores the product information
          Exp.cache.continueButton.addEventListener('click', () => {
            Exp.cache.productList = Exp.cache.bodyVar.querySelectorAll('#dnn_ctr6973629_ViewBasket_BasketDetails_gvBasketDetails tbody > tr');
            // Set up session storage to recieve data
            // Remove previous session storage if it exists
            if (sessionStorage.getItem('FL016-Products')) {
              sessionStorage.removeItem('FL016-Products');
            }
            // Resuse basket data if it exists
            if (sessionStorage.getItem('FL016-Basket-Data')) {
              Exp.cache.basketInfo = JSON.parse(sessionStorage.getItem('FL016-Basket-Data'));
            }
            // Update basket data
            Exp.cache.basketInfo.productCount = parseInt(Exp.cache.bodyVar.querySelector('#bagQuantity').textContent.trim(), 10);
            sessionStorage.setItem('FL016-Basket-Data', JSON.stringify(Exp.cache.basketInfo));
            // Loop through products and collect required information
            for (let i = 0; i < Exp.cache.productList.length; i += 1) {
              const currentProduct = Exp.cache.productList[i];
              const productImage = currentProduct.querySelector('.productimage img').getAttribute('src');
              const productTitle = currentProduct.querySelector('.productdesc .productTitle').textContent.trim();
              const productColor = currentProduct.querySelector('.productcolour span:last-child').textContent.trim();
              const productSize = currentProduct.querySelector('.productsize span:last-child').textContent.trim();
              const productQuantity = currentProduct.querySelector('.prdQuantity input').value;
              const productPrice = currentProduct.querySelector('.itemprice .money').textContent.trim();
              // Check for discounted price
              let discountedPrice = null;
              if (currentProduct.querySelector('.money.discount')) {
                discountedPrice = currentProduct.querySelector('.money.discount').textContent.trim();
              }
              // Push data to array
              // Next line exceeds length
              // eslint-disable-next-line
              this.buildProductArray(productImage, productTitle, productColor, productSize, productQuantity, productPrice, discountedPrice);
            }
            this.storeProducts();
          });
        });
      },
      storeProducts() {
        // Set the array to local storage
        Exp.cache.FL016Products = JSON.stringify(Exp.cache.FL016Products);
        sessionStorage.setItem('FL016-Products', Exp.cache.FL016Products);
      },

      buildProductArray(img, title, color, size, quantity, price, discountedPrice) {
        Exp.cache.FL016Products.push({
          img,
          title,
          color,
          size,
          quantity,
          price,
          discountedPrice,
        });
      },
      buildTestMarkup() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Add body class
        Exp.cache.bodyVar.classList.add(Exp.settings.ID);
        // Add markup
        Exp.cache.basketTotal.insertAdjacentHTML('afterend', `<div class="FL016-Wrap"> 
        </div>`);
        // Add view bag button and close bag button
        const basketButtonInsert = Exp.cache.bodyVar.querySelector('.col-xs-12.ExitLinks');
        const ViewBagMarkup = `
        <div class="FL016-View-Bag-Container">
          <p class="FL016-View-Bag-Button">View Bag</p>
        </div>
        `;
        const CloseBagMarkup = `
          <div class="FL016-Close-Bag-Container">
            <p class="FL016-Close-Bag-Button">Close Bag</p>
          </div>
        `;
        basketButtonInsert.insertAdjacentHTML('beforebegin', ViewBagMarkup);
        basketButtonInsert.insertAdjacentHTML('beforeend', CloseBagMarkup);
        // Assign selectors
        Exp.cache.closeBag = Exp.cache.bodyVar.querySelector('.FL016-Close-Bag-Button');
        Exp.cache.viewBag = Exp.cache.bodyVar.querySelector('.FL016-View-Bag-Button');
        Exp.cache.FL016Container = Exp.cache.bodyVar.querySelector('.FL016-Wrap');
        Exp.cache.orderSummaryParent = Exp.cache.bodyVar.querySelector('.col-xs-12.col-md-4.CheckoutLeft');
        // Loop through products array and add markup
        for (let i = 0; i < Exp.cache.FL016Products.length; i += 1) {
          // add markup depending if there is a discount
          if (Exp.cache.FL016Products[i].discountedPrice) {
            const FL016DiscountedMarkup = `
            <div class="FL016-Product-Container">
            <img class="FL016-Image" src="${Exp.cache.FL016Products[i].img}" alt="${Exp.cache.FL016Products[i].title.replace(/['|"]/gi, '')}"/>
            <div class="FL016-Product-Detail-Container">
              <p class="FL016-Product-Title">${Exp.cache.FL016Products[i].title}</p>
              <p class="FL016-Colour">${Exp.cache.FL016Products[i].color}</p>
              <p class="FL016-Size">${Exp.cache.FL016Products[i].size}</p>
            </div>
            <div class="FL016-Product-Quantity-Wrap">
              <span class="FL016-Quantity">${Exp.cache.FL016Products[i].quantity} ✕ ${Exp.cache.FL016Products[i].price}</span>
            </div>
            <p class="FL016-Discounted-Price">${Exp.cache.FL016Products[i].discountedPrice}</p>
          </div>
            `;
            Exp.cache.FL016Container.insertAdjacentHTML('beforeend', FL016DiscountedMarkup);
          } else {
            const FL016ProductMarkUp = `
            <div class="FL016-Product-Container">
              <img class="FL016-Image" src="${Exp.cache.FL016Products[i].img}" alt="${Exp.cache.FL016Products[i].title.replace(/['|"]/gi, '')}"/>
              <div class="FL016-Product-Detail-Container">
                <p class="FL016-Product-Title">${Exp.cache.FL016Products[i].title}</p>
                <p class="FL016-Colour">${Exp.cache.FL016Products[i].color}</p>
                <p class="FL016-Size">${Exp.cache.FL016Products[i].size}</p>
              </div>
              <div class="FL016-Product-Quantity-Wrap">
                <span class="FL016-Quantity">${Exp.cache.FL016Products[i].quantity} ✕ ${Exp.cache.FL016Products[i].price}</span>
              </div>
            </div>
          `;
            Exp.cache.FL016Container.insertAdjacentHTML('beforeend', FL016ProductMarkUp);
          }
        }
        // Add event handlers to view bag and close bag
        Exp.cache.closeBag.addEventListener('click', () => {
          // Toggle class to hide bag, close bag and reveal view bag
          Exp.cache.orderSummaryParent.classList.toggle('FL016-Show-Bag');
        });
        Exp.cache.viewBag.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'View Bag', { sendOnce: true });
          // Toggle class to hide bag, close bag and reveal view bag
          Exp.cache.orderSummaryParent.classList.toggle('FL016-Show-Bag');
        });
        // Add event to edit bag
        Exp.cache.bodyVar.querySelector('.col-xs-12.ExitLinks>div>a').addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'Edit Bag', { sendOnce: true });
        });
        // const hide = document.getElementById(`${Exp.settings.ID}_flickerPrevention`);
        // hide.parentElement.removeChild(hide);
      },
    },
  };
  Exp.init();
};

export default Run;
