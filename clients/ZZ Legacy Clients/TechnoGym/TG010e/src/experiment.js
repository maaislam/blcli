import { fullStory, events } from '../../../../lib/utils';
import { TG010eform } from './lib/TG010e-form';
import { products } from './lib/TG010e-products';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TG010e',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    if (!localStorage.getItem('TG010e-exitForm')) {
      components.createLightbox();
      components.addProducts();
      components.getOtherFormValues();
      components.setType();
      components.continueValidation();
      components.submitValidation();
      components.closeLightbox();

      services.exitIntentPlugin();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
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
            cookieName: 'TG010eexit', 
            cookieDomain: 'https://www.technogym.com/gb/treadmill-myrun.html',
            callback: function() { 
              localStorage.setItem('TG010e-exitForm', 1);
              document.querySelector('.TG010e-overlay').classList.add('TG010e-overlay_active');
              document.querySelector('.TG010e_form').classList.add('TG010e-form_active');
            } 
          });
        }
      }
      exitIntent.ouiPlugin();
      exitIntent.exitTrigger();
    },
    /* eslint-enable */
  },

  components: {
    /**
     * @desc Create the lightbox
     */
    createLightbox: function createLightbox() {
      const exitLightbox = document.createElement('div');
      exitLightbox.classList.add('TG010e-exitBox');
      exitLightbox.innerHTML = TG010eform;
      document.body.appendChild(exitLightbox);
    },
    /**
     * @desc Pull in the form values
     */
    getOtherFormValues: function getOtherFormValues() {
      const ajaxURL = document.querySelector('figcaption a').getAttribute('href');
      const request = new XMLHttpRequest();
      request.open('GET', ajaxURL, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          // add values from form to new form
          document.querySelector('.TG010e-productVal').value = temp.querySelector('[name="product"]').value;
          document.querySelector('.TG010e-url').value = temp.querySelector('[name="catalog-url"]').value;
          document.querySelector('.TG010e-key').value = temp.querySelector('[name="form_key"]').value;
        }
      };
      request.send();
    },
    /**
     * @desc Loop through the products and add certain values
     */
    addProducts: function addProducts() {
      // add product image
      let smallImage;
      if (document.querySelector('#image')) {
        smallImage = document.querySelector('#image').getAttribute('src');
      } else {
        smallImage = document.querySelector('#gallery-links > a:first-of-type').getAttribute('href');
      }
      
      document.querySelector('.TG010e-product_image').style.backgroundImage = `url('${smallImage}')`;

      const productName = document.querySelector('.product-name h1').textContent.trim().replace(/\s/g, '');
      document.querySelector('.TG010e-downloadBox p span').textContent = document.querySelector('.product-name h1').textContent.trim();

      for (let i = 0; i < Object.keys(products).length; i += 1) {
        const data = Object.entries(products)[i];
        const key = data[0];
        const category = data[1];

        if (productName === key) {
          document.querySelector('.TG010e-block.TG010e-downloadBox .TG010e-strapline').textContent = category.line;
          document.querySelector('.TG010e_form #product-name').value = category.productLine;
          break;
        }
      }
    },
    /**
     * @desc Validation on continue
     */
    continueValidation: function continueValidation() {
      const continueButton = document.querySelector('.TG010e-next');
      const firstInputs = document.querySelectorAll('.TG010e-detailsBox .TG010e-input');

      const firstDot = document.querySelector('.TG010e-dot');
      const secondDot = document.querySelector('.TG010e-dot:last-child');
      const blockOne = document.querySelectorAll('.TG010e-block')[0];
      const blockTwo = document.querySelectorAll('.TG010e-block')[1];

      continueButton.addEventListener('click', () => {
        console.log('click');
        for (let index = 0; index < firstInputs.length; index += 1) {
          const element = firstInputs[index];
          const elementInputs = element.querySelector('input');
          if (elementInputs.value === '') {
            element.classList.add('TG010e-error');
          } else {
            element.classList.remove('TG010e-error');
          }
        }

        const errorExists = document.querySelector('.TG010e-error');
        if (!errorExists) {
          firstDot.classList.remove('TG010e-dot_active');
          secondDot.classList.add('TG010e-dot_active');
          blockTwo.classList.add('TG010e-block_active');
          blockOne.classList.remove('TG010e-block_active');
          events.send('TG010e', 'First name, Last name', 'First name and surname entered ', { sendOnce: true });
        }
      });
    },
    /**
     * @desc On click of the type divs click the hidden radios and set value
     */
    setType: function setType() {
      // set the default radio
      const personal = document.querySelector('.TG010e-private input');
      personal.checked = true;

      const business = document.querySelector('.TG010e-reason:last-child');
      const personalBox = document.querySelector('.TG010e-reason');
      business.addEventListener('click', () => {
        personalBox.classList.remove('TG010e-type_active');
        business.classList.add('TG010e-type_active');
        business.querySelector('input').click();
        document.querySelector('[name="need-business"]').value = 'community';
        document.querySelector('[name="need-private"]').value = '';
      });
      personalBox.addEventListener('click', () => {
        business.classList.remove('TG010e-type_active');
        personalBox.classList.add('TG010e-type_active');
        personalBox.querySelector('input').click();
        document.querySelector('[name="need-business"]').value = '';
        document.querySelector('[name="need-private"]').value = 'tone_body';
      });
    },
    /**
     * @desc To close the lightbox
     */
    closeLightbox: function closeLightbox() {
      const exitLightbox = document.querySelector('.TG010e-exit');
      const form = document.querySelector('.TG010e_form');
      const overlay = document.querySelector('.TG010e-overlay');
      exitLightbox.addEventListener('click', () => {
        overlay.classList.remove('TG010e-overlay_active');
        form.classList.remove('TG010e-form_active');
        localStorage.setItem('TG010e-close', 1);
        events.send('TG010e', 'Exit click', 'Closed lightbox', { sendOnce: true });
      });
      overlay.addEventListener('click', () => {
        overlay.classList.remove('TG010e-overlay_active');
        form.classList.remove('TG010e-form_active');
        localStorage.setItem('TG010e-close', 1);
      });
    },
    /**
     * @desc Validation on continue
     */
    submitValidation: function submitValidation() {
      const submit = document.querySelector('button.TG010e-submitButton');
      const nameBox = document.querySelector('.TG010e-block .TG010e-input input#name');
      const lastNameBox = document.querySelector('.TG010e-block .TG010e-input input#last-name');
      const fakeSubmit = document.querySelector('.TG010e-submit_fake span');
      fakeSubmit.addEventListener('click', () => {
        if (nameBox.value !== '' && lastNameBox.value !== '') {
          nameBox.classList.remove('TG010e-error');
          lastNameBox.classList.remove('TG010e-error');
          submit.click();
          const loader = document.querySelector('.TG010e-loading');
          if (loader) {
            loader.classList.add('TG010e-show-loading');
          }
          events.send('TG010e', 'Form submit', 'All fields filled and Request Brochure clicked', { sendOnce: true });
        } else {
          lastNameBox.classList.add('TG010e-error');
          nameBox.classList.add('TG010e-error');
        }
      });
    },
  },
};

export default Experiment;
