/**
 * DS003
 * @author User Conversion
 */
import {
  setup,
  appendStyleSheet,
  getUserData,
} from './services';
import Search from '../components/Search/Search';
import settings from '../lib/settings';
import USP from '../components/USP/USP';
import TopCategories from '../components/Top-Categories/top-categories';
import ImportTools from '../components/Import-Tool/import-tool';
import SliderBanner from '../components/Slider-Banner/slider-banner';
import HeroBannerAccount from '../components/HeroBannerAccount/HeroBannerAccount';
import CartPreview from '../components/CartPreview/CartPreview';
import USPV2 from '../components/USPV2/USPV2';
import CampaignBanner from '../components/CampaignBanner/CampaignBanner';
import {
  events
} from '../../../../../lib/utils';
import {
  observer,
  poller
} from '../../../../../lib/uc-lib';
const {
  ID,
  VARIATION
} = settings;

const activate = () => {
  setup();

  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
  
      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;
  
        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);
  
        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
  
        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
  
          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
  
        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);
  
        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  
        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if(isIE11){
    document.body.classList.add('ie11');
  }
  const IS_LOGGED_IN = window.digitalData.user[0].userID !== 'anonymous';
  const PRODUCTS_IN_BASKET = !!(window.digitalData.cart && window.digitalData.cart.item.length);
  const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
  document.body.classList.add(`CC-${countryCode}`);
  document.body.classList.add(`${ID}-var${VARIATION}`);
  let search;
  let usp;
  let topCategories;
  let importTools;
  let sliderBanner;
  let campaignBanner;
  let heroBannerAccount;
  let uspV2;
  let cartPreview;

  const variations = {
    1: () => {
      search = new Search({
        render: (component) => {
          if (!document.querySelector(`.${ID}_Search`)) {
            document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', component);
          }

          /*
           * Create an element in the sticky header to hold the search bar
           */
          const listitem = document.createElement('li');
          listitem.classList.add('mod');
          listitem.classList.add('mod-metahd-item');
          listitem.classList.add('skin-metahd-item');
          listitem.classList.add('stickySearch');
          document.querySelector('.skin-metahd-item-cart').insertAdjacentElement('afterend', listitem);
        },
      });

      usp = new USP({
        render: (component) => {
          if (!document.querySelector(`.${ID}_USP`)) {
            search.component.insertAdjacentElement('afterend', component);
          }
        },
      });
      if(IS_LOGGED_IN){
        getUserData();
      }
      document.querySelector('.skin-metahd-item-search').classList.add('stickySearch');
      topCategories = new TopCategories({
        render: (component) => {
          if (!document.querySelector(`.${ID}_topCategories`)) {
            usp.component.insertAdjacentElement('afterend', component);
          }
        },
      });

      campaignBanner = new CampaignBanner({
        bannerImg: 'https://cdn.dynamicyield.com/api/8770250/images/1f1ff4b66cbc5__DS003-campaign-banner-new.png',
        bannerLink: '#',
        render: (component) => {
          if (topCategories) {
            topCategories.component.insertAdjacentElement('afterend', component);
          } else if (usp) {
            usp.component.insertAdjacentElement('afterend', component);
          }
        },
      });

      importTools = new ImportTools({
        render: (component) => {
          if (!document.querySelector(`.${ID}_importToolWrap`)) {
            document.querySelector('.home-quickorder').insertAdjacentElement('afterend', component);
          }
        },
      });
      if(document.querySelector('.container .mod.mod-global-messages')){
        const loggedInBlock = document.querySelector('.container .mod.mod-global-messages').innerHTML;
        if(isIE11){
          const globalMessages = document.querySelector('.mod.mod-global-messages');
          globalMessages.parentNode.removeChild(globalMessages);
        } else {
          document.querySelector('.container .mod.mod-global-messages').remove();
        }
        const element = document.createElement('div');
        element.classList.add('mod');
        element.classList.add('mod-global-messages');
        element.classList.add('mod--alt');
        element.innerHTML = loggedInBlock;
        document.querySelector(`.${ID}_USP`).insertAdjacentElement('afterend', element);
      };
    },

    2: () => {
      if (!IS_LOGGED_IN) {
        heroBannerAccount = new HeroBannerAccount({
          render: (component) => {
            document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', component);
          },
        });
      }

      if (PRODUCTS_IN_BASKET > 0) {
        cartPreview = new CartPreview({
          render: (component) => {
            if (document.querySelector(`.${ID}_HeroBanner--acc`)) {
              heroBannerAccount.component.insertAdjacentElement('afterend', component);
            } else {
              document.querySelector('.page-wrapper .container').insertAdjacentElement('afterbegin', component);
            }
          },
        });
      }

      uspV2 = new USPV2({
        render: (component) => {
          if (cartPreview) {
            cartPreview.component.insertAdjacentElement('afterend', component);
          } else if (heroBannerAccount) {
            heroBannerAccount.component.insertAdjacentElement('afterend', component);
          } else {
            document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', component);
          }
        },
      });
      if(IS_LOGGED_IN){
        getUserData();
      }
      document.querySelector('.skin-metahd-item-search').classList.add('stickySearch');
      topCategories = new TopCategories({
        render: (component) => {
          uspV2.component.insertAdjacentElement('afterend', component);
        },
      });

      campaignBanner = new CampaignBanner({
        bannerImg: 'https://cdn.dynamicyield.com/api/8770250/images/1f1ff4b66cbc5__DS003-campaign-banner-new.png',
        bannerLink: '#',
        render: (component) => {
          topCategories.component.insertAdjacentElement('afterend', component);
        },
      });

      importTools = new ImportTools({
        render: (component) => {
          if (!document.querySelector(`.${ID}_importToolWrap`)) {
            document.querySelector('.home-quickorder').insertAdjacentElement('afterend', component);
          }
        },
      });
      if(document.querySelector('.container .mod.mod-global-messages')){
        const loggedInBlock = document.querySelector('.container .mod.mod-global-messages').innerHTML;
        if(isIE11){
          const globalMessages = document.querySelector('.mod.mod-global-messages');
          globalMessages.parentNode.removeChild(globalMessages);
        } else {
          document.querySelector('.container .mod.mod-global-messages').remove();
        }
        const element = document.createElement('div');
        element.classList.add('mod');
        element.classList.add('mod-global-messages');
        element.classList.add('mod--alt');
        element.innerHTML = loggedInBlock;
        if(IS_LOGGED_IN){
          document.querySelector(`.${ID}_CartPreview`).insertAdjacentElement('beforebegin', element);
        } else {
          document.querySelector(`.${ID}_HeroBanner--acc`).insertAdjacentElement('afterend', element);
        }
      };
    },

    3: () => {
      if(IS_LOGGED_IN){
        getUserData();
      }
      document.querySelector('.skin-metahd-item-search').classList.add('stickySearch');
      topCategories = new TopCategories({
        render: (component) => {
          if (!document.querySelector(`.${ID}_topCategories`)) {
            document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', component);
          }
        },
      });

      sliderBanner = new SliderBanner({
        render: (component) => {
          if (!document.querySelector(`.${ID}_sliderWrap`)) {
            document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', component);
          }
          /* Set the initial attribute for New in: {data-categoryName} */
          const category = document.querySelector(`.${ID}_slider__tabHeader--listItem`).getAttribute('data-categoryName');
          document.querySelector(`.${ID}_slider__category span`).setAttribute('data-category', category);
          /* Set the initial color */
          document.querySelector(`.${ID}_slider__tabHeader--listItem`).classList.add('active');
          /* Set Up Slick */
          appendStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css');
          appendStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css');
          const initSlickSlider = () => {
            jQuery(`.${ID}_slider__tabBody--list`).slick({
              dots: true,
              arrows: false,
              infinite: true,
              speed: 1000,
              slidesToShow: 4,
              slidesToScroll: 4,
              autoplay: true,
              autoplaySpeed: 5000,
            });
          };
          jQuery.ajax({
            url: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js',
            type: 'GET',
            success: initSlickSlider,
          });
          poller([
            '.slick-dots',
          ], () => {
            observer.connect(document.querySelector('.slick-dots'), function () {
              var elements = document.querySelectorAll('.slick-dots li');
              [].forEach.call(elements, function (element, i) {
                var hasClass = element.classList.contains('slick-active');
                if (hasClass) {
                  var categoryName = document.querySelector(`.${ID}_slider__tabHeader--listItem:nth-child(${i + 1})`).getAttribute('data-categoryname');
                  document.querySelector(`.${ID}_slider__category span`).setAttribute('data-category', categoryName);
                  document.querySelector(`.${ID}_slider__tabHeader--listItem:nth-child(${i + 1})`).classList.add('active');
                } else {
                  document.querySelector(`.${ID}_slider__tabHeader--listItem:nth-child(${i + 1})`).classList.remove('active');
                }
              });
            }, {
              // Options
              config: {
                attributes: true,
                childList: true,
                subtree: true
              },
            });
          });
          const buttons = document.querySelectorAll(`.${ID}_slider__tabHeader--listItem`);
          [].forEach.call(buttons, function(button){
            button.addEventListener('click', function(e){
              const slicktarget = parseInt(e.target.getAttribute('data-sliderindex'));
              document.querySelector(`.slick-dots li:nth-child(${slicktarget}) button`).click();
            });
          });
        },
      });

      campaignBanner = new CampaignBanner({
        bannerImg: 'https://cdn.dynamicyield.com/api/8770250/images/1f1ff4b66cbc5__DS003-campaign-banner-new.png',
        bannerLink: '#',
        render: (component) => {
          if (!document.querySelector(`.${ID}_campaignBannerWrap`)) {
            sliderBanner.component.insertAdjacentElement('afterend', component);
          }
        },
      });

      usp = new USP({
        render: (component) => {
          if (!document.querySelector(`.${ID}_USP__content`)) {
            document.querySelector('.page-wrapper').insertAdjacentElement('afterbegin', component);
          }
        },
      });
      
      importTools = new ImportTools({
        render: (component) => {
          if (!document.querySelector(`.${ID}_importToolWrap`)) {
            document.querySelector('.home-quickorder').insertAdjacentElement('afterend', component);
          }
        },
      });
      if(document.querySelector('.container .mod.mod-global-messages')){
        const loggedInBlock = document.querySelector('.container .mod.mod-global-messages').innerHTML;
        if(isIE11){
          const globalMessages = document.querySelector('.mod.mod-global-messages');
          globalMessages.parentNode.removeChild(globalMessages);
        } else {
          document.querySelector('.container .mod.mod-global-messages').remove();
        }
        const element = document.createElement('div');
        element.classList.add('mod');
        element.classList.add('mod-global-messages');
        element.classList.add('mod--alt');
        element.innerHTML = loggedInBlock;
        document.querySelector(`.${ID}_sliderWrap`).insertAdjacentElement('afterend', element);
      };
    },
  };
  variations[VARIATION](); // Init
  /*
   * Create a wrap for the quickorder block
   */
  const quickOrder = document.querySelector('.home-quickorder');
  const quickOrderWrap = document.createElement('div');
  quickOrderWrap.classList.add('home-quickorderWrap');
  quickOrderWrap.appendChild(quickOrder);
  document.querySelector('.what-looking-today').insertAdjacentElement('afterend', quickOrderWrap);

  /*
   * Wrap quick-order buttons in a div to avoid unnecessary absolute positioning
   */
  const cartButton = document.querySelector('.quickorder__cta--floating-add-to-cart');
  const addButton = document.querySelector('.quickorder__cta--add-product');
  const block = document.createElement('div');
  let blockContent = '';
  block.classList.add('quickorder__block');
  block.appendChild(cartButton);
  block.appendChild(addButton);
  document.querySelector('.quickorder__fieldWrapper').insertAdjacentElement('afterend', block);

  // ----------------------------
  // QUICK ORDER CHANGES
  // ----------------------------
    /*
    Add a class to the body that change z-index for certain elements
    to let quick order panel show properly
    */
  document.querySelector('.home-quickorderWrap').addEventListener('keydown', () => {
    const quickOrderEl = document.querySelectorAll('.quickorder__aticle-number');
    [].forEach.call(quickOrderEl, function(element){
      element.addEventListener('keydown', () => {
        document.querySelector('body').classList.add('quickOrdering');
      });
    });
    setTimeout(() => {
      document.querySelector('body').classList.remove('quickOrdering');
    }, 15000);
  });
  document.querySelector('.quickorder__cta--add-product').addEventListener('click', () => {
    document.querySelector('body').classList.remove('quickOrdering');
  });
  document.querySelector('#metahd-search').addEventListener('click', () => {
    events.send(ID, 'User clicked', `search - Variation ${VARIATION}`);
  });
  document.querySelector('.quickorder__cta--add-to-cart').addEventListener('click', () => {
    events.send(ID, 'User clicked', `quick-order - Variation ${VARIATION}`);
  });
};

/**
 * {"type":"b2b","jobRole":"student","areaofuse":"Education (incl. research)"}
 */

export default activate;
