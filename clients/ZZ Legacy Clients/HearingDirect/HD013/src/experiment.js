/* eslint-disable no-underscore-dangle */
import { pollerLite, observer } from '../../../../lib/uc-lib';
import { fullStory, events, eventFire } from '../../../../lib/utils';
import exitIntentPopup from './lib/exitIntentPopup';

/**
 * HD013 - Enclose Checkout
 */
const Experiment = {
  settings: {
    ID: 'HD013',
    VARIATION: '1',
  },

  init() {
    /** Setup */
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    /** Change subtitle copy */
    const changeSubtitleCopy = () => {
      pollerLite(['#onestepcheckout-form p.onestepcheckout-description'], () => {
        const title = document.querySelector('#onestepcheckout-form p.onestepcheckout-description');
        title.textContent = 'Please complete the 4 steps below and you\'re done!';
      });
    };

    /** Set a default shipping option */
    const defaultShipping = () => {
      pollerLite(['.shipment-methods input'], () => {
        const shippingMethods = document.querySelectorAll('.shipment-methods input');
        const selectedShippingMethod = [].filter.call(shippingMethods, el => el.checked);
        if (!selectedShippingMethod.length) {
          shippingMethods[0].checked = true;
          eventFire(shippingMethods[0], 'click');
        }
      });
    };

    /** When an error message appears anchor the user to it */
    const anchorErrorMessaging = () => {
      const checkForValidationErrors = () => {
        pollerLite(['.validation-failed'], () => {
          const failedFields = document.querySelectorAll('.validation-failed');
          const $ = window.jQuery;
          $('html, body').animate({
            scrollTop: $(failedFields[0]).offset().top - 30,
          }, 300);
        });
      };

      const bindEvents = () => {
        // Checkout button
        pollerLite(['#onestepcheckout-place-order'], () => {
          const button = document.querySelector('#onestepcheckout-place-order');
          button.addEventListener('click', checkForValidationErrors);
        });

        // PayPal button
        const attachPaypalButton = () => {
          pollerLite(['#paypal-container button'], () => {
            const button = document.querySelector('#paypal-container button');
            button.addEventListener('click', checkForValidationErrors);
          });
        };

        pollerLite(['#p_method_gene_braintree_paypal'], () => {
          const paypalOption = document.querySelector('#p_method_gene_braintree_paypal');
          if (paypalOption.checked) {
            attachPaypalButton();
          } else {
            // Wait for the option to be selected before polling for paypal button
            const changeEvent = () => {
              if (paypalOption.checked) {
                paypalOption.removeEventListener('change', changeEvent);
                attachPaypalButton();
              }
            };
            paypalOption.addEventListener('change', changeEvent);
          }
        });
      };

      bindEvents();
    };

    /** Show more product/delivery info when review order is clicked */
    const moreInfoLightbox = () => {
      class Tabs {
        /**
         * Creates a horizontal tab structure
         * @param {Array<{name: String, content: String}>} data All tab data -
         *  expects a tab name and markup
         */
        constructor(data) {
          this._data = data;
          this._create();
          this._bindEvents();
          return {
            _component: this._component,
          };
        }

        _create() {
          const component = document.createElement('div');
          component.classList.add('HD013_Tabs');

          // Tabs
          const tabs = document.createElement('div');
          tabs.classList.add('HD013_Tabs__tabBlock');

          const content = document.createElement('div');
          content.classList.add('HD013_Tabs__contentBlock');

          /** Create tab markup */
          const createTab = (data) => {
            // Create tab element
            const tab = document.createElement('div');
            tab.classList.add('HD013_Tabs__tab');
            tab.setAttribute('data-HD013_tab', data.name);
            tab.innerText = data.name;

            // Create content element
            const tabContent = document.createElement('div');
            tabContent.classList.add('HD013_Tabs__content');
            tabContent.setAttribute('data-HD013_tab', data.name);
            tabContent.innerHTML = data.content;

            tabs.appendChild(tab);
            content.appendChild(tabContent);
          };

          this._data.forEach((tabData) => {
            createTab(tabData);
          });

          // Default to the first tab
          tabs.children[0].classList.add('HD013_Tabs__tab--active');
          content.children[0].classList.add('HD013_Tabs__content--active');

          component.appendChild(tabs);
          component.appendChild(content);

          this._component = component;
        }

        _bindEvents() {
          // Tab transitions
          const switchTab = (tabName) => {
            // Hide currently active tab
            const activeTab = this._component.querySelector('.HD013_Tabs__tab--active');
            const activeContent = this._component.querySelector('.HD013_Tabs__content--active');
            if (activeTab) activeTab.classList.remove('HD013_Tabs__tab--active');
            if (activeContent) activeContent.classList.remove('HD013_Tabs__content--active');

            // Show this tab
            const tab = this._component.querySelector(`.HD013_Tabs__tab[data-HD013_tab="${tabName}"]`);
            const content = this._component.querySelector(`.HD013_Tabs__content[data-HD013_tab="${tabName}"]`);
            tab.classList.add('HD013_Tabs__tab--active');
            content.classList.add('HD013_Tabs__content--active');
          };

          const tabs = this._component.querySelectorAll('.HD013_Tabs__tab');
          [].forEach.call(tabs, (tab) => {
            tab.addEventListener('click', (e) => {
              const tabName = e.target.getAttribute('data-HD013_tab');
              if (tabName) {
                switchTab(tabName);
              }
            });
          });
        }
      }

      class Lightbox {
        /**
         * Creates a lightbox
         * @param {HTMLElement} content Content to go inside the lightbox
         */
        constructor(content) {
          this._content = content;
          this._create();
          this._bindEvents();
          this._render();

          return {
            open: this.open,
            close: this.close,
            toggle: this.toggle,
            _component: this._component,
            _overlay: this._overlay,
          };
        }

        /** Create elements */
        _create() {
          // Overlay
          const overlay = document.createElement('div');
          overlay.classList.add('HD013_LightboxOverlay');

          // Component
          const component = document.createElement('div');
          component.classList.add('HD013_Lightbox');

          // Inner content
          const content = document.createElement('div');
          content.classList.add('HD013_LightboxContent');

          // Close
          const close = document.createElement('div');
          close.classList.add('HD013_Lightbox__close');

          if (this._content) content.appendChild(this._content);
          component.appendChild(close);
          component.appendChild(content);

          this._overlay = overlay;
          this._component = component;
        }

        /** Add event listeners */
        _bindEvents() {
          // Close events
          this._component.querySelector('.HD013_Lightbox__close').addEventListener('click', () => {
            this.close();
          });

          this._overlay.addEventListener('click', () => {
            this.close();
          });
        }

        /** Inject to DOM */
        _render() {
          const { body } = document;
          body.appendChild(this._overlay);
          body.appendChild(this._component);
        }

        /** Open lightbox */
        open() {
          this._overlay.style.display = 'block';
          this._component.style.display = 'block';
          document.documentElement.classList.add('HD013_noScroll');
          document.body.classList.add('HD013_noScroll');
          events.send('HD013', 'User opened review your order lightbox', 'User saw review your order lightbox');
        }

        /** Close lightbox */
        close() {
          this._overlay.style.display = 'none';
          this._component.style.display = 'none';
          document.documentElement.classList.remove('HD013_noScroll');
          document.body.classList.remove('HD013_noScroll');
          events.send('HD013', 'User closed review your order lightbox', 'User closed review your order lightbox');
        }

        /** Toggle lightbox open/close state */
        toggle() {
          if (this._overlay.style === 'block') {
            this.close();
          } else {
            this.open();
          }
        }
      }

      /**
       * Init components
       * @param {Object} productData
       */
      const createComponents = (productData) => {
        /** Create Tabs component */
        const tabs = new Tabs([
          {
            name: 'Your Order',
            content: (() => {
              let markup = '<div class="HD013_summary">';

              // Products start
              markup += '<div class="HD013_products">';
              productData.products.forEach((data) => {
                markup += `
                  <div class="HD013_product">
                    <div class="HD013_product__img"><img src="${data.img}"/></div>
                    <div class="HD013_product__detailsBlock">
                      <div class="HD013_product__name">${data.name}</div>
                      <div class="HD013_product__options">${data.options}</div>
                    </div>
                    <div class="HD013_product__priceBlock">
                      <div class="HD013_product__price">${data.price}</div>
                    </div>
                    <div class="HD013_product__qty">${data.qty}</div>
                    <div class="HD013_product__actions">
                      <a href="${data.edit}">${data.editIconSVG} Edit</a>
                    </div>
                  </div>
                `;
              });
              markup += '</div>';
              // Products end

              // Totals start
              markup += `
                <div class="HD013_totals">
                  <div class="HD013_totals__total">Subtotal: ${productData.totals.subtotal}</div>
                </div>  
              `;
              // Totals end

              markup += '</div>';
              return markup;
            })(),
          },
          {
            name: 'Contact Us',
            content: `
              <ul class="HD013_contactDetails">
                <li>
                  <span class="HD013_contactIcon HD013_contactIcon--phone"></span>
                  <div class="HD013_contact__content">
                    <ul class="HD013_contactDetails__phoneNumbers">
                      <li><span class="HD013_flagIcon HD013_flagIcon--uk"></span><p>0800 032 1301</p></li>
                      <li><span class="HD013_flagIcon HD013_flagIcon--us"></span><p>1800 216 2331</p></li>
                      <li><span class="HD013_flagIcon HD013_flagIcon--fr"></span><p>08 05 63 81 99</p></li>
                      <li><span class="HD013_flagIcon HD013_flagIcon--nd"></span><p>0800 664 88 86</p></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <span class="HD013_contactIcon HD013_contactIcon--email"></span>
                  <div class="HD013_contact__content">
                    <p><a href="mailto:customerservices@hearingdirect.com">customerservices@hearingdirect.com</a></p>
                  </div>
                </li>
              </ul>
            `,
          },
          {
            name: 'Returns Policy',
            content: `
              <div>
                <p>Our <strong>no quibble, 30-day, money back guarantee</strong> policy is exactly that - if you don't like, or you're unhappy with any item you have bought from HearingDirect.com, you can return it to us freepost (from within the UK), up to 30 days after it has been dispatched, for replacement or full product refund.</p>
                <p>If you wish to return goods after 30 days of shipping then you should first contact our customer service department to see whether a return is appropriate.</p>
                <p>To return goods you need to contact us to obtain a Return Authorisation Number (RAN). You can request one by emailing <a href="mailto:customerservices@hearingdirect.com">customerservices@hearingdirect.com</a> or calling us on 0800 032 1301. The RAN  should be quoted on an accompanying letter to explain the reason for return and ideally a copy of the original invoice. We recommend you obtain proof of postage from the post office when returning any item to us.</p>
                <p>You will be notified by email or in writing when your returned Goods have been received by us.</p>
                <p>For more details, see "Your right to cancel", in the <a https://www.hearingdirect.com/pages/Terms.html#righttocancel">terms and conditions</a>. Your statutory rights are not affected.</p>
                <p>
                  <strong>When does the 30 day period start?</strong>
                  <br />
                  We will stamp your receipt with a date when we put it in the post. The 30 day period will start from this date; returns must have a posting date no more than 30 days after this dispatch date.
                </p>
                <p>
                  <strong>Can I return it even if I simply don't like it?</strong>
                  <br/>
                  Yes, this truly is a money back, no quibble guarantee.
                </p>
              </div>
            `,
          },
        ]);

        /** Create Lightbox component */
        const lightbox = new Lightbox(tabs._component);

        /** Lightbox trigger */
        pollerLite(['.onestepcheckout-numbers-4'], () => {
          const reviewOrderTitle = document.querySelector('.onestepcheckout-numbers-4');
          if (reviewOrderTitle.getAttribute('data-HD013') !== 'modified') {
            reviewOrderTitle.addEventListener('click', () => {
              reviewOrderTitle.setAttribute('data-HD013', 'modified');
              lightbox.toggle();
            });
          }
        });
      };

      /**
       * Get all product data from minibasket or basket page (if more than 3 products)
       * Minibasket only shows the last 3 products so if there's more than that we need
       * to pull in the product data from the basket page
       */
      const productCount = document.querySelector('.controls__minicart-count').innerHTML;

      /**
       * Get data from the minibasket
       * @param {Function} cb Callback
       */
      const getDataFromMinibasket = (cb) => {
        const minibasket = document.querySelector('#cart-sidebar');

        // Products
        const productDataArr = [];
        const minibasketProducts = minibasket.querySelectorAll('.minicart__item');
        [].forEach.call(minibasketProducts, (element) => {
          const name = element.querySelector('.minicart__item-title');
          const price = element.querySelector('.minicart__item-price .price');
          const img = element.querySelector('.minicart__item-image img');
          const qty = element.querySelector('.minicart__item-qty');
          const edit = element.querySelector('.minicart__item-edit');
          const options = element.querySelector('.item-options');

          productDataArr.push({
            name: name ? name.innerText.trim() : '',
            price: price ? price.innerText.trim() : '',
            img: img ? img.src : '',
            qty: qty ? qty.innerText.trim() : '',
            edit: edit ? edit.href : '',
            editIconSVG: edit.querySelector('svg') ? edit.querySelector('svg').outerHTML : '',
            options: options ? options.innerHTML : '',
          });
        });

        // Totals
        const itemCount = document.querySelector('.minicart__items-count');
        const subtotal = document.querySelector('.minicart__subtotal .price');

        const productData = {
          products: productDataArr,
          totals: {
            itemCount: itemCount ? itemCount.innerHTML : '',
            subtotal: subtotal ? subtotal.innerHTML : '',
          },
        };

        /** Data has been retrieved, build components */
        cb(productData);
      };

      /**
       * Pull in data from the basket page as there's more than 3 products
       * @param {Function} cb Callback
       */
      const getDataFromBasketPage = (cb) => {
        /**
         * @param {HTMLElement} DOM Page DOM
         */
        const scrapeProductData = (DOM) => {
          // Products
          const productDataArr = [];
          const products = DOM.querySelectorAll('#shopping-cart-table > tbody > tr');
          [].forEach.call(products, (element) => {
            const name = element.querySelector('.title a');
            const price = element.querySelector('.cart-price .price');
            const img = element.querySelector('.product-image img');
            const qty = element.querySelector('.input-qty');
            const edit = element.querySelector('.link-edit');
            const options = element.querySelector('.item-options');

            productDataArr.push({
              name: name ? name.innerText.trim() : '',
              price: price ? price.innerText.trim() : '',
              img: img ? img.src : '',
              qty: qty ? `Qty: ${qty.innerText.trim()}` : '',
              edit: edit ? edit.href : '',
              editIconSVG: edit.querySelector('svg') ? edit.querySelector('svg').outerHTML : '',
              options: options ? options.innerHTML : '',
            });
          });

          // Totals
          const subtotal = DOM.querySelector('#shopping-cart-totals-table > tbody .price');

          const productData = {
            products: productDataArr,
            totals: {
              itemCount: productCount,
              subtotal: subtotal ? subtotal.innerHTML : '',
            },
          };

          /** Data has been retrieved, build components */
          cb(productData);
        };

        const request = new XMLHttpRequest();
        request.open('GET', '/checkout/cart/', true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('div');
            temp.innerHTML = request.responseText;
            scrapeProductData(temp);
          }
        };
        request.send();
      };

      if (productCount > 3) {
        getDataFromBasketPage(createComponents);
      } else {
        getDataFromMinibasket(createComponents);
      }
    };

    /** Update PayPal info copy */
    const changePaypalCopy = () => {
      pollerLite(['.paypal-info > p'], () => {
        const paypalCopy = document.querySelector('.paypal-info > p');
        if (paypalCopy.getAttribute('data-HD013') !== 'modified') {
          paypalCopy.innerText = 'Please click on PayPal button on the right below review order';
          paypalCopy.setAttribute('data-HD013', 'modified');
        }
      });
    };

    /** Apply all page changes */
    const applyAllChanges = () => {
      changeSubtitleCopy();
      defaultShipping();
      anchorErrorMessaging();
      moreInfoLightbox();
      changePaypalCopy();
      exitIntentPopup.init();
    };

    /** Initial call */
    applyAllChanges();

    /** Reapply step 3 changes when content refreshes */
    const middleCol = document.querySelector('.onestepcheckout-column-middle');
    observer.connect(middleCol, changePaypalCopy, {
      throttle: 300,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.useLegacyTracker();
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },
};

export default Experiment;
