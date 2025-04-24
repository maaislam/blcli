import { pollerLite, observer } from '../../../../lib/uc-lib';
import { fullStory, events, eventFire } from '../../../../lib/utils';
import brandData from './brandData';

/**
 * SD063 - Add to Bag cross sells
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'SD063',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    const { globals } = Experiment.cache;
    services.tracking();
    document.body.classList.add(settings.ID);
    const elements = services.cacheDOM();
    let populatedGlobals;

    function run() {
      const ajaxCart = document.querySelector('.ajaxcart').parentElement;
      setTimeout(() => {
        if (ajaxCart.style.display !== 'none') {
          // User has added to cart, waiting for success message
          pollerLite(['#ajax_crosssell > *'], () => {
            events.send('SD063', 'View', 'Experiment ran', { sendOnce: true });
            services.updateBasketValue();
            const crosssellItems = document.querySelector('#ajax_crosssell .block-content');
            if (crosssellItems) {
              components.CrossSell.init(crosssellItems);
            } else {
              components.CrossSell.init();
            }
            // Scroll to component
            const buffer = globals.isMobile ? 160 : 100;
            pollerLite([
              () => !!window.jQuery,
            ], () => {
              jQuery('html, body').animate({
                scrollTop: jQuery('.SD063_CrossSell').offset().top - buffer,
              }, 500);
            });
          }, { wait: 50, multiplier: 0 });
        }
      }, 200);
    }

    function checkConditions() {
      populatedGlobals = services.populateGlobals();
      if (!populatedGlobals) {
        events.send('SD063', 'Error', 'Experiment did not run', { sendOnce: true });
        elements.addToCartBtn.removeEventListener('click', checkConditions);
      } else {
        run();
      }
    }

    /*
     * On add to bag, create CrossSell component
     * Markup will be different depending on whether or not this product
     * has related product availible, so pass that as a param
     */
    elements.addToCartBtn.addEventListener('click', checkConditions);

    return true;
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },

    /**
     * @param {HTMLElement} rootElem The element to look for comments within
     * @returns {Array} Returns an array of all HTML comments
     */
    getAllComments(rootElem) {
      const filterNone = () => NodeFilter.FILTER_ACCEPT;
      const comments = [];
      // eslint-disable-next-line max-len
      const iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
      let curNode;
      // eslint-disable-next-line no-cond-assign
      while (curNode = iterator.nextNode()) {
        comments.push(curNode.nodeValue);
      }
      return comments;
    },

    /**
     * @desc Gets the brand for this product from a HTML comment
     * @returns {String} Brand name
     */
    getBrand() {
      let brand;
      try {
        const { elements } = Experiment.cache;
        const comments = this.getAllComments(elements.feefoReviews);
        const str = comments.join('');
        // eslint-disable-next-line prefer-destructuring
        brand = str.match(/itemprop="brand" content="([^"]+)"/)[1];
      } catch (e) {} // eslint-disable-line no-empty

      return brand;
    },

    /**
     * @desc Caches all required elements for this experiment
     */
    cacheDOM() {
      const { elements } = Experiment.cache;
      elements.feefoReviews = document.querySelector('#feefo-reviews');
      elements.main = document.querySelector('.col-main');
      elements.productForm = document.querySelector('#product_addtocart_form');
      elements.addToCartBtn = document.querySelector('#product_addtocart_form .add-to-cart-buttons > button');
      return elements;
    },

    /**
     * @desc Updates the basket value total in cache.globals
     */
    updateBasketValue() {
      const { globals } = Experiment.cache;
      globals.basketValue = (() => {
        const miniBasketPrice = document.querySelector('#header-cart .minicart-wrapper .subtotal .price');
        let toReturn;
        if (miniBasketPrice) {
          toReturn = Number(miniBasketPrice.innerText.replace(/[£,]/g, '')).toFixed(2);
        } else {
          toReturn = 0;
        }
        return toReturn;
      })();
    },

    /**
     * @desc Populates all global variables for use in this experiment
     */
    populateGlobals() {
      const { globals } = Experiment.cache;

      // brand
      globals.brand = this.getBrand();

      if (!globals.brand || !brandData[globals.brand.toLowerCase()]) {
        return false;
      }

      // freeDeliveryThreshold
      globals.freeDeliveryThreshold = 30;

      // basketValue
      this.updateBasketValue();

      // qualifiedForFreeDelivery
      globals.qualifiedForFreeDelivery = globals.basketValue >= globals.freeDeliveryThreshold;

      // valueRemainingForFreeDelivery
      globals.qualifiedForFreeDelivery = globals.freeDeliveryThreshold - globals.basketValue;

      // isMobile
      globals.isMobile = window.innerWidth < 768;

      return globals;
    },
  },

  components: {
    CrossSell: {
      /**
       * @param {String} relatedProducts HTML for related products
       */
      create(relatedProducts) {
        const { globals } = Experiment.cache;
        const component = document.createElement('div');
        component.classList.add('SD063_CrossSell');
        component.classList.add('SD063_CrossSell--open');

        if (relatedProducts) {
          const messages = {
            one: '',
            two: '',
          };
          if (globals.qualifiedForFreeDelivery) {
            messages.one = 'Don\'t forget our great prices across the site';
            messages.two = 'Other customers also bought:';
          } else {
            messages.one = `You're £${globals.valueRemainingForFreeDelivery} away from free delivery`;
            messages.two = 'Why not add another item and get everything delivered for free';
          }

          component.innerHTML = `
            <div class="SD063_CrossSell__head">
              <div class="SD063_CrossSell__successMsg">Added to Basket</div>
              <div class="SD063_CrossSell__msgOne">${messages.one}</div>
              <div class="SD063_CrossSell__toggle" data-status="open">Close</div>
            </div>
            <div class="SD063_CrossSell__body">
              <div class="ajax_cart_loader_layer" id="ajax_cart_loading" style="display: none;">
                <img class="ajax_loading" id="ajax_loading2" src="https://www.salonsdirect.com/skin/frontend/rwd/saloncustom/em/ajaxcart/images/loading.gif" alt="">
              </div>
              <div class="SD063_CrossSell__msgTwo">${messages.two}</div>
              <div class="SD063_CrossSell__relatedProducts mini-products-list"></div>
              <div id="addtocart-product-ajax-successmessage" class="cart-update-success" style="display: block; color: green;"></div>
            </div>
          `;

          component.querySelector('.SD063_CrossSell__relatedProducts').appendChild(relatedProducts);

          const body = component.querySelector('.SD063_CrossSell__body');

          // Create brand link
          const brandLink = document.createElement('div');
          const thisBrandData = brandData[globals.brand.toLowerCase()];
          brandLink.classList.add('SD063_CrossSell__brandLink');
          brandLink.innerHTML = `
            <div class="SD063_CrossSell__brandLink__img">
              <a href="${thisBrandData.link}">
                <img src="${thisBrandData.img}"/>
              </a>
            </div>
            <div class="SD063_CrossSell__brandLink__ctaWrap">
            <a href="${thisBrandData.link}" class="SD063_CrossSell__brandLink__cta">
              Shop all ${globals.brand}
            </a>
            </div>
          `;
          body.insertBefore(brandLink, body.querySelector('.SD063_CrossSell__relatedProducts'));
        } else {
          component.innerHTML = `
            <div class="SD063_CrossSell__head" style="cursor: pointer;">
              <div class="SD063_CrossSell__successMsg" style="cursor: pointer;">Added to Basket</div>
            </div>
          `;
        }

        return component;
      },

      bindEvents(component) {
        // Open/Close related products
        const head = component.querySelector('.SD063_CrossSell__head');
        const toggle = component.querySelector('.SD063_CrossSell__toggle');
        if (toggle) {
          head.addEventListener('click', () => {
            const status = toggle.getAttribute('data-status');
            if (status === 'open') {
              component.classList.remove('SD063_CrossSell--open');
              toggle.setAttribute('data-status', 'closed');
              toggle.innerText = 'Open';
            } else if (status === 'closed') {
              component.classList.add('SD063_CrossSell--open');
              toggle.setAttribute('data-status', 'open');
              toggle.innerText = 'Close';
            }
          });
        }

        // Tracking
        const brandLinks = component.querySelectorAll('.SD063_CrossSell__brandLink a');
        [].forEach.call(brandLinks, (link) => {
          link.addEventListener('click', () => {
            events.send('SD063', 'Click', 'Clicked Shop All Brand', { sendOnce: true });
          });
        });

        const productLinks = component.querySelectorAll('.SD063_CrossSell__relatedProducts a');
        [].forEach.call(productLinks, (link) => {
          link.addEventListener('click', () => {
            events.send('SD063', 'Click', 'Clicked a related product', { sendOnce: true });
          });
        });

        return component;
      },

      render(component) {
        const { elements, globals } = Experiment.cache;

        const insertOnPage = () => {
          elements.main.insertBefore(component, elements.main.firstChild);

          // Hide original lightbox
          eventFire(document.querySelector('#bg_fade'), 'click');
        };

        /*
         * If mobile, load in Slick slider then run
         * bxSlider and Owl Carousel already exist on the page but bxSlider doesn't support
         * touch and Owl Carousel has issues initialising correctly at the point of developing
         * this experiment
         */
        if (globals.isMobile) {
          const $ = window.jQuery;
          insertOnPage();
          $.ajax({
            type: 'GET',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js',
            success: () => {
              // Destroy Owl Carousel before initialising Slick
              pollerLite(['.owl-carousel'], () => {
                const $carousel = $('.SD063_CrossSell__relatedProducts .owl-carousel');
                $carousel.owlCarousel('destroy');
                $carousel.addClass('slider-wrapper');
                $carousel.slick({
                  infinite: false,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
                  prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
                });
              });
            },
          });
        } else {
          insertOnPage();
        }

        return component;
      },

      /**
       * @desc Checks conditions for messages and changes them if needed
       */
      updateMessages() {
        const { services } = Experiment;
        const { globals } = Experiment.cache;
        services.updateBasketValue();

        const messageOne = document.querySelector('.SD063_CrossSell__msgOne');
        const messageTwo = document.querySelector('.SD063_CrossSell__msgTwo');

        if (globals.basketValue >= globals.freeDeliveryThreshold) {
          messageOne.innerHTML = 'Don\'t forget our great prices across the site';
          messageTwo.innerHTML = 'Other customers also bought:';
        } else {
          messageOne.innerHTML = `You're £${(globals.freeDeliveryThreshold - globals.basketValue).toFixed(2)} away from free delivery`;
          messageTwo.innerHTML = 'Why not add another item and get everything delivered for free';
        }
      },

      /**
       * @param {String} relatedProducts HTML for related products
       */
      init(relatedProducts) {
        if (document.querySelector('.SD063_CrossSell')) {
          return false;
        }

        // Event tracking
        if (relatedProducts) {
          events.send('SD063', 'View', 'Has related products', { sendOnce: true });
        } else {
          events.send('SD063', 'View', 'Does not have related products', { sendOnce: true });
        }

        const component = this.create(relatedProducts);
        this.bindEvents(component);
        this.render(component);

        // Update basket messages on basket change
        const minicart = document.querySelector('.account-cart-wrapper .header-minicart');
        const { updateMessages } = this;
        updateMessages();
        observer.connect(minicart, () => {
          updateMessages();
        }, {
          config: {
            attributes: false,
            childList: true,
            subtree: true,
            characterData: true,
          },
        });

        return component;
      },
    },
  },

  cache: {
    elements: {},
    globals: {},
  },
};

export default Experiment;
