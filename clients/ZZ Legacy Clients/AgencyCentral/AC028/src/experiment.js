import { fullStory, events } from '../../../../lib/utils';


/**
 * {{AC028}} - {{Exit Intent - call, don't leave}}
 */

const Run = () => {
  const $ = window.jQuery;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC028',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const AC028Markup = `
      <div class="AC028_pop-up_modal">
        <div class="AC028-body_click"></div>
        <div class="AC028-inner_div">
        <a href="#" class="AC028-close_btn">✕</a>
          <div class="AC028-overflow_fix">
            <div class="AC028-Modal-Header-Wrapper">
              <p class="AC028-Modal-Header-Text">Can't find what you're looking for?</p>
            </div>
          <div class="AC028-Modal-Content-Wrap">
            <p class="AC028-Modal-Sub-Header">Our team is ready and waiting to help you find your perfect Recruitment Agency.<br />If you need answers, here’s what you can do:</p>
            <div class="AC028-Content-Block AC028-Call-Us-Block">
              <div class="AC028-Header-Wrap">
                <span class="AC028-Header">1. Call us</span>
                <img class="AC028-Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/24c2f0af4c1e74bdc93b623a4bd3117d_call_us.png" alt="Call us"/>
              </div>
              <p class="AC028-Text-Content AC028-Call-Us-Text">Let us find your perfect recruitment agency by calling us on <span class="AC028-Phone-Number">0330 380 0649</span></p>
            </div>
            <div class="AC028-Content-Block AC028-Message-Us-Block">
              <div class="AC028-Header-Wrap">
                <span class="AC028-Header">2. Message us</span>
                <img class="AC028-Image" src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/885dcf517d1f516720dfcf2e640637bf_message.png" alt="Message us"/>
              </div>
              <p class="AC028-Text-Content AC028-Message-Us-Text">Any questions? Talk to a real person using our live chat. You can find our live chat at the bottom of the page!</p>
            </div>
          </div>
          </div>
        </div>
      </div>
      `;

      let modal;
      let modalBG;

      return {
        docVar,
        bodyVar,
        AC028Markup,
        modal,
        modalBG,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Add markup
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', Exp.cache.AC028Markup);
        // Assign selectors
        Exp.cache.modal = $('.AC028_pop-up_modal');
        Exp.cache.modalBG = Exp.cache.modal.find('.AC028_body_click');
        this.modalClickOn();
        this.exitIntent.ouiPlugin();
        this.exitIntent.exitTrigger();
      },
      modalClickOn() {
        Exp.cache.modal.find('.AC028-close_btn, .AC028-body_click').on('click', () => {
          if (slideQ === false) {
            slideQ = true;
            if (Exp.cache.modal.hasClass('active')) {
              Exp.cache.modal.fadeOut('slow', () => {
                Exp.cache.modal.removeClass('active');
                Exp.cache.bodyVar.classList.remove('AC028_scroll-off');
                slideQ = false;
              });
            } else {
              Exp.cache.modal.fadeIn('slow', () => {
                Exp.cache.modal.addClass('active');
                slideQ = false;
              });
              Exp.cache.modalBG.on(Exp.cache.modalClick, () => {
                if (Exp.cache.modal.hasClass('active')) {
                  Exp.cache.modal.fadeOut('slow', () => {
                    Exp.cache.modal.removeClass('active');
                    Exp.cache.bodyVar.classList.remove('AC028_scroll-off');
                  });
                }
              });
            }
          }
        });
      },
      exitIntent: {
        // OuiBounce plugin
        /* eslint-disable */
          ouiPlugin() {
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
                  if (sessionStorage.getItem('AC028-Modal-Shown')) { return; }
    
                  if (el) { $(el).fadeIn();
                  events.send(`${Exp.settings.ID}`, 'View', 'Modal Shown', { sendOnce: true });  
                  sessionStorage.setItem('AC028-Modal-Shown', 'Shown');
                  }
    
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
          /* eslint-enable */
        // OUIBounce trigger
        exitTrigger() {
          this.ouibounce(Exp.cache.modal[0], {
            cookieName: 'AC028Exit',
            cookieDomain: 'agencycentral.co.uk',
            aggressive: true,
            // eslint-disable-next-line
            /*aggressive: true, Testing property, if the cookie exists ignore it and show it everytime on exit */
            callback() {
              Exp.cache.modal.fadeIn().addClass('active');
              Exp.cache.bodyVar.classList.add('AC028_scroll-off');
            },
          });
        },
      },
    },
  };

  Exp.init();
};

export default Run;
