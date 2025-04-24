import { fullStory, events } from '../../../../lib/utils';
import { observer, poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ015',
    VARIATION: '2',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    const isMobile = window.innerWidth < 767;
    const URL = window.location.pathname;

    if (settings.VARIATION === '1') {
      // if on mobile, check for voucher code, if it does not exist fire the lightbox
      if (isMobile) {
        components.mobilecheckCode();
        if (URL.indexOf('basket-confirmation.aspx') > -1) {
          if (!localStorage.getItem('PJ015-mobileCodeExists')) {
            if (!localStorage.getItem('PJ015-lightboxClose')) {
              setTimeout(() => {
                components.lightbox();
                document.querySelector('.PJ015-lightboxfade').classList.add('PJ015-lightbox-fade_active');
                document.querySelector('.PJ015-lightbox_wrapper').classList.add('PJ015-lightbox_active');
              }, 3000);
            }
          }
        }
      }
      // if on desktop check if code exists, show on lightbox on exit
      const desktop = () => {
        if (!isMobile) {
          components.desktopcheckCode();

          // check if something is in basket
          components.basketItem();
          if (sessionStorage.getItem('PJ015-basket') === 'true') {
            if (!localStorage.getItem('PJ15-codeAppliedDesktop')) {
              if (!localStorage.getItem('PJ015-lightboxClose')) {
                components.lightbox();
                const lightBoxWrap = document.querySelector('.PJ015-lightbox');
                lightBoxWrap.setAttribute('id', 'ouibounce-modal');
                components.exitIntentPlugin();
              }
            }
          }
        }
      };
      desktop();
      // observer to check if the page rebuilds
      observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
        desktop();
      }, {
        config: { attributes: true, childList: true, subtree: false },
        throttle: 1000,
      });
    }
    // V2 - on click of checkout button on basket or checkout page
    if (settings.VARIATION === '2') {
      const desktopv2 = () => {
        if (!isMobile) {
          if (URL.indexOf('/basket-confirmation.aspx') === -1) {
            components.desktopcheckCode();
            if (!localStorage.getItem('PJ15-codeAppliedDesktop')) {
              poller([
                '#ctl00__objHeader_BasketSection',
              ], () => {
                components.checkoutButtonBasket();
                const checkoutButtonNew = document.querySelector('.PJ015-checkout');
                const oldButton = document.getElementById('ctl00__objHeader_aCheckout');

                checkoutButtonNew.classList.remove('PJ015-newButton_hide');
                oldButton.classList.add('PJ015-basketHidden');

                checkoutButtonNew.addEventListener('click', () => {
                  components.lightbox();
                  document.querySelector('.PJ015-lightboxfade').classList.add('PJ015-lightbox-fade_active');
                  document.querySelector('.PJ015-lightbox_wrapper').classList.add('PJ015-lightbox_active');
                });
              });
            }
          } else { // if on checkout page
            const voucher = document.querySelector('#ctl00_cphBody_txtPromocode');
            if (!voucher || voucher.value !== 'NPJ30OFFP') {
              components.basketPageButton();
              const newCheckout = document.querySelector('.PJ015-checkout_basket');
              const oldButton = document.getElementById('ctl00_cphBody_lbProceed');

              newCheckout.addEventListener('click', () => {
                components.lightbox();

                document.querySelector('.PJ015-lightboxfade').classList.add('PJ015-lightbox-fade_active');
                document.querySelector('.PJ015-lightbox_wrapper').classList.add('PJ015-lightbox_active');
                newCheckout.classList.add('PJ015-newButton_hide');
                oldButton.classList.remove('PJ015-basketHidden');
              });
            }
          }
        }
      };
      if (!localStorage.getItem('PJ015-lightboxClose')) {
        desktopv2();
      }

      observer.connect(document.getElementById('ctl00__objHeader_upOmnibar'), () => {
        if (!localStorage.getItem('PJ015-lightboxClose')) {
          // desktopv2();
        }
      }, {
        config: { attributes: true, childList: true, subtree: false },
        throttle: 1000,
      });
    }
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Creates the lightbox
     */
    lightbox: function lightbox() {
      const { settings } = Experiment;

      const lightboxWrapper = document.createElement('div');
      lightboxWrapper.classList.add('PJ015-lightbox');
      lightboxWrapper.innerHTML = `<div class="PJ015-lightboxfade"></div>
      <div class="PJ015-lightbox_wrapper">
         <div class="PJ015-lightboxExit">&times;</div>
         <div class="PJ015-imagewrapper"</div>
         <div class="PJ015-lightbox-content">
            <div class="PJ015-bannerImage"></div>
            <a class="PJ015-voucher_button" href="/dealbuilder.aspx?promo=NPJ30OFFP"><span>Apply Deal</span></a>
            <p class="PJ015-smallPrint">* Not to be used in conjunction with other offers</p> 
         </div>
      </div>`;
      document.body.appendChild(lightboxWrapper);
      events.send(`PJ015 v${settings.VARIATION}`, 'lightbox shown', 'PJ015 lightbox fired', { sendOnce: true });

      const addDeal = document.querySelector('.PJ015-voucher_button');
      addDeal.addEventListener('click', () => {
        events.send(`PJ015 v${settings.VARIATION}`, 'deal clicked', 'PJ015 clicked add deal', { sendOnce: true });
      });

      const lightboxClose = () => {
        document.querySelector('.PJ015-lightboxfade').classList.remove('PJ015-lightbox-fade_active');
        document.querySelector('.PJ015-lightbox_wrapper').classList.remove('PJ015-lightbox_active');

        localStorage.setItem('PJ015-lightboxClose', 1);
        events.send(`PJ015 v${settings.VARIATION}`, 'Closed lightbox', 'PJ015 lightbox closed', { sendOnce: true });
      };

      const exit = document.querySelector('.PJ015-lightboxExit');
      const overlay = document.querySelector('.PJ015-lightboxfade');
      exit.addEventListener('click', () => {
        lightboxClose();

        const checkoutButtonNew = document.querySelector('.PJ015-checkout');
        const oldButton = document.getElementById('ctl00__objHeader_aCheckout');
        checkoutButtonNew.classList.add('PJ015-newButton_hide');
        oldButton.classList.remove('PJ015-basketHidden');
      });
      overlay.addEventListener('click', () => {
        lightboxClose();
      });
    },
    /**
    * @desc check if 33% is in mobile basket
    */
    mobilecheckCode: function mobileCode() {
      const basketMobile = document.getElementById('fancyBasketMobile');
      const basketDiscount = basketMobile.querySelectorAll('.item');
      for (let i = 0; i < basketDiscount.length; i += 1) {
        const element = basketDiscount[i];
        const itemText = element.textContent;
        if (itemText || itemText.indexOf('NPJ30OFFP') > -1) {
          localStorage.setItem('PJ015-mobileCodeExists', 1);
        } else {
          localStorage.removeItem('PJ015-mobileCodeExists');
        }
      }
    },
    /**
    * @desc ajax request to check if they have the code already
    */
    desktopcheckCode: function checkCode() {
      const request = new XMLHttpRequest();
      request.open('GET', '/basket-confirmation.aspx', true);

      request.onload = function ajaxCheck() {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          const voucher = temp.querySelector('.discountRow');
          if (voucher) {
            localStorage.setItem('PJ15-codeAppliedDesktop', 1);
          }
        }
      };
      request.send();
    },
    /**
    * @desc check if basket items
    */
    basketItem: function basketItem() {
      let basketItemTrue;
      const basketAmount = document.querySelector('.basketIcon');
      if (basketAmount.textContent.indexOf('0') > -1) {
        basketItemTrue = false;
      } else {
        basketItemTrue = true;
      }
      sessionStorage.setItem('PJ015-basket', basketItemTrue);
    },
    /**
    * @desc exit intent plugin
    */
    exitIntentPlugin: function exitIntentPlugin() {
    /* eslint-disable */
      const exitIntent = {
        // OuiBounce plugin
        ouiPlugin: function(){
          (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
              define(factory);
            } else if (typeof exports === 'object') {
              module.exports = factory(require, exports, module);
            } else {
              root.ouibounce = factory();
            }
          }(this, function (require, exports, module) {
  
            return function ouibounce(el, custom_config) {
              "use strict";
  
              var config = custom_config || {},
                aggressive = config.aggressive || false,
                sensitivity = setDefault(config.sensitivity, 20),
                timer = setDefault(config.timer, 1000),
                delay = setDefault(config.delay, 0),
                callback = config.callback || function () { },
                cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
                cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
                cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
                sitewide = config.sitewide === true ? ';path=/' : '',
                _delayTimer = null,
                _html = document.documentElement;
  
              function setDefault(_property, _default) {
                return typeof _property === 'undefined' ? _default : _property;
              }
  
              function setDefaultCookieExpire(days) {
                // transform days to milliseconds
                var ms = days * 24 * 60 * 60 * 1000;
  
                var date = new Date();
                date.setTime(date.getTime() + ms);
  
                return "; expires=" + date.toUTCString();
              }
  
              setTimeout(attachOuiBounce, timer);
              function attachOuiBounce() {
                if (isDisabled()) { return; }
  
                _html.addEventListener('mouseleave', handleMouseleave);
                _html.addEventListener('mouseenter', handleMouseenter);
                _html.addEventListener('keydown', handleKeydown);
              }
  
              function handleMouseleave(e) {
                if (e.clientY > sensitivity) { return; }
  
                _delayTimer = setTimeout(fire, delay);
              }
  
              function handleMouseenter() {
                if (_delayTimer) {
                  clearTimeout(_delayTimer);
                  _delayTimer = null;
                }
              }
  
              var disableKeydown = false;
              function handleKeydown(e) {
                if (disableKeydown) { return; }
                else if (!e.metaKey || e.keyCode !== 76) { return; }
  
                disableKeydown = true;
                _delayTimer = setTimeout(fire, delay);
              }
  
              function checkCookieValue(cookieName, value) {
                return parseCookies()[cookieName] === value;
              }
  
              function parseCookies() {
                // cookies are separated by '; '
                var cookies = document.cookie.split('; ');
  
                var ret = {};
                for (var i = cookies.length - 1; i >= 0; i--) {
                  var el = cookies[i].split('=');
                  ret[el[0]] = el[1];
                }
                return ret;
              }
  
              function isDisabled() {
                return checkCookieValue(cookieName, 'true') && !aggressive;
              }
  
              // You can use ouibounce without passing an element
              // https://github.com/carlsednaoui/ouibounce/issues/30
              function fire() {
                if (isDisabled()) { return; }
  
                if (el) { $(el).fadeIn(); }
  
                callback();
                disable();
              }
  
              function disable(custom_options) {
                var options = custom_options || {};
  
                // you can pass a specific cookie expiration when using the OuiBounce API
                // ex: _ouiBounce.disable({ cookieExpire: 5 });
                if (typeof options.cookieExpire !== 'undefined') {
                  cookieExpire = setDefaultCookieExpire(options.cookieExpire);
                }
  
                // you can pass use sitewide cookies too
                // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
                if (options.sitewide === true) {
                  sitewide = ';path=/';
                }
  
                // you can pass a domain string when the cookie should be read subdomain-wise
                // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
                if (typeof options.cookieDomain !== 'undefined') {
                  cookieDomain = ';domain=' + options.cookieDomain;
                }
  
                if (typeof options.cookieName !== 'undefined') {
                  cookieName = options.cookieName;
                }
  
                document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;
  
                // remove listeners
                _html.removeEventListener('mouseleave', handleMouseleave);
                _html.removeEventListener('mouseenter', handleMouseenter);
                _html.removeEventListener('keydown', handleKeydown);
              }
  
              return {
                fire: fire,
                disable: disable,
                isDisabled: isDisabled
              };
            };
          }));
        },
        // OUIBounce trigger
        exitTrigger: function () {
          this.ouibounce(document.getElementById('ouibounce-modal'), { 
            cookieName: 'PJ015exit', 
            cookieDomain: 'papajohns.co.uk',
            callback: function() { 
              document.querySelector('.PJ015-lightboxfade').classList.add('PJ015-lightbox-fade_active');
              document.querySelector('.PJ015-lightbox_wrapper').classList.add('PJ015-lightbox_active');
            } 
          });
        }
      }
      exitIntent.ouiPlugin();
      exitIntent.exitTrigger();
    },
    /* eslint-enable */
    /**
    * @desc fake checkout button on desktop basket
    */
    checkoutButtonBasket: function checkoutButtonBasket() {
      const basket = document.getElementById('ctl00__objHeader_divBasket');
      const total = basket.querySelector('.totalCont.payPalTotal.clearFix');
      const checkoutButton = document.getElementById('ctl00__objHeader_aCheckout');
      const newbasketButton = document.createElement('div');
      newbasketButton.classList.add('PJ015-checkout');
      newbasketButton.innerHTML = '<div class="PJ015-checkout-button">CHECKOUT</div>';
      basket.insertBefore(newbasketButton, total.nextElementSibling);
      checkoutButton.classList.add('PJ015-basketHidden');
    },
    /**
    * @desc fake checkout button on basket page
    */
    basketPageButton: function basketPageButton() {
      const basketWrap = document.querySelector('#ctl00_cphBody_trProceed td');
      const checkoutButton = document.querySelector('#ctl00_cphBody_lbProceed');
      const newbasketButton = document.createElement('div');
      newbasketButton.classList.add('PJ015-checkout_basket');
      newbasketButton.innerHTML = '<div class="PJ015-checkoutbasket-button">PROCEED TO CHECKOUT</div>';
      basketWrap.insertBefore(newbasketButton, checkoutButton.previousSibling);
      checkoutButton.classList.add('PJ015-basketHidden');
    },
  },
};

export default Experiment;

