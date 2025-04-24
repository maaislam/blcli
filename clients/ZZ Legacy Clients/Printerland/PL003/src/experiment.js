import { fullStory, events, setCookie } from '../../../../lib/utils';
import productsDetails from './lib/PL003-content';

/**
 * {{PL003}} - {{Price Match Exit Intent}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL003',
    VARIATION: '1',
    lightboxShown: false,
  },

  init() {
    if (document.cookie.indexOf('PL003_lightboxShown=') === -1) {
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      const productTitle = document.querySelector('h1#pageTitle').textContent;
      const productImage = document.querySelector('.preview.col > .app-figure > a#hlinkLargeImage').href;

      const lightboxContainer = `<div class='PL003-lightbox hidden'>
          <div class='PL003-wrapper'>
            <div class='PL003-container-top'>
              <div class='PL003-titleText'>
                <div class='PL003-title__top'>Did you know...</div>
                <div class='PL003-title'>We offer a price match promise?</div>
                <div class='PL003-subTitle'>We check our competitors every day.</div>
              </div>
            </div>
          <div class='PL003-container-bottom'>
            <div class='PL003-left'>
              <div class='PL003-imageContainer'><img src='${productImage}' height='260' width='240'></div>
              <div class='PL003-productTitle'>${productTitle}</div>
            </div>
            <div class='PL003-right'>
              <div class='PL003-offers'>Also included with this product:</div>
              <div class='PL003-offers__list'>
                <ul>
                </ul>
              </div>
              <a class='PL003-addToBasket button product_buy'>Add to Basket</a>
            </div>
          </div>
          <span id='PL003-close'></span>
        </div>
      </div>`;

      document.querySelector('div.content').insertAdjacentHTML('beforeend', lightboxContainer);
      productsDetails();

      /**
       * @desc Shows lightbox when mouse leaves document (after 10 seconds on the page)
       */
      const run = () => {
        setTimeout(() => {
          if (!Experiment.settings.lightboxShown) {
            services.exitIntentPlugin();
          }
        }, 10000);
      };
      if (document.readyState !== 'loading') {
        run();
      } else {
        document.addEventListener('DOMContentLoaded', run);
      }

      /**
       * @desc Closes lightbox when user clicks on X or when clicking outside the div container
       */
      document.querySelector('#PL003-close').addEventListener('click', () => {
        document.querySelector('.PL003-lightbox').classList.add('hidden');
      });

      window.addEventListener('click', (e) => {
        if (!document.querySelector('.PL003-wrapper').contains(e.target)) {
          // Clicked outside box
          document.querySelector('.PL003-lightbox').classList.add('hidden');
        }
      });

      // Add to Basket
      document.querySelector('.PL003-addToBasket').addEventListener('click', () => {
        document.querySelector('.price_container > .item > div > a').click();
        events.send('PL003', 'Lightbox - Basket Button', 'Added to Basket', { sendOnce: true });
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    showLightbox() {
      document.querySelector('.PL003-lightbox').classList.remove('hidden');
      events.send('PL003', 'Lightbox - Appear', 'Exit Intent', { sendOnce: true });
      Experiment.settings.lightboxShown = true;
    },
    exitIntentPlugin() {
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
                'use strict';
                var config = custom_config || {},
                  aggressive = config.aggressive || false,
                  sensitivity = setDefault(config.sensitivity, 200),
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
            this.ouibounce(null, { 
              cookieName: 'PL003_lightboxShown', 
              cookieDomain: 'https://www.printerland.co.uk/',
              callback: function() {
                if (!Experiment.settings.lightboxShown) {
                  setCookie('PL003_lightboxShown', 'true', null, 'printerland.co.uk');
                  Experiment.services.showLightbox();
                }
              } 
            });
          }
        }
        exitIntent.ouiPlugin();
        exitIntent.exitTrigger();
      },
      /* eslint-enable */
  },

  components: {},
};

export default Experiment;
