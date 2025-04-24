import settings from './settings';

const { VARIATION } = settings;

export const FL066OG = (VARIATION) => {
  (function() {
    'use strict';
    
    
    function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }
    
    var pollerLite = function pollerLite(elements, cb, options) {
      var settings = {
        wait: 50,
        multiplier: 1.1,
        timeout: 0
      }; 
    
      if (options) {
        Object.keys(options).forEach(function (key) {
          settings[key] = options[key];
        });
      }
    
    
      var now = Date.now || function getNow() {
        return new Date().getTime();
      };
    
      var timeout = settings.timeout ? new Date(now() + settings.timeout) : false; 
    
      var successful = [];
    
      var conditionPassed = function conditionPassed(condition) {
        var toReturn;
    
        switch (_typeof2(condition)) {
          case 'function':
            toReturn = condition();
            break;
    
          case 'string':
            toReturn = !!document.querySelector(condition);
            break;
    
          default:
            toReturn = true;
            break;
        }
    
        return toReturn;
      };
    
    
      var pollForCondition = function pollForCondition(condition, wait) {
        if (timeout && now() > timeout) {
          return false;
        }
    
        settings.wait = wait || settings.wait;
    
        if (conditionPassed(condition)) {
          successful.push(true);
          if (successful.length === elements.length) cb();
        } else {
          setTimeout(function () {
            pollForCondition(condition, settings.wait * settings.multiplier);
          }, settings.wait);
        }
      };
    
      for (var i = 0; i < elements.length; i += 1) {
        pollForCondition(elements[i]);
      }
    };
    
    
        
    var events = {
      trackerName: false,
      propertyId: false,
      analyticsReference: 'ga',
      setDefaultCategory: function setDefaultCategory(category) {
        this.category = category;
        return this;
      },
      setPropertyId: function setPropertyId(propertyId) {
        this.propertyId = propertyId;
      },
      setTrackerName: function setTrackerName(trackerName) {
        this.trackerName = trackerName;
      },
      useLegacyTracker: function useLegacyTracker() {
        this.analyticsReference = '_gaq';
      },
      eventCache: [],
      send: function send(category, action, label, options) {
        options = options || {};
        category = category || this.category;

        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
          var eventID = category + action + label;

          if (this.eventCache.indexOf(eventID) > -1) {
            return false;
          } else {
            this.eventCache.push(eventID);
          }
        }

        var self = this;

        var fire = function fire(tracker) {
          if (self.analyticsReference == '_gaq') {
            _gaq.push(['_trackEvent', category, action, label, null, typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true]);
          } else {
            window[self.analyticsReference](tracker + '.send', 'event', category, action, label, {
              nonInteraction: options.nonInteraction ? options.nonInteraction : true
            });
          }
        };

        if (self.trackerName) {
          fire(self.trackerName);
        } else {
          pollerLite([function () {
            try {
              if (self.analyticsReference == '_gaq') {
                return !!window._gaq;
              } else {
                var trackers = window[self.analyticsReference].getAll();

                if (trackers && trackers.length) {
                  return true;
                } else {
                  return false;
                }
              }
            } catch (err) {}
          }], function () {
            if (window[self.analyticsReference].getAll) {
              var trackers = window[self.analyticsReference].getAll();

              if (self.propertyId) {
                for (var i = 0; i < trackers.length; i++) {
                  var tracker = trackers[i];

                  if (tracker.get('trackingId') == self.propertyId) {
                    self.trackerName = tracker.get('name');
                    break;
                  }
                }
              } else {
                self.trackerName = trackers[0].get('name');
              }

              fire(self.trackerName);
            }
          });
        }
      }
    };
    
    var fullStory = function fullStory(experiment_str, variation_str) {
      pollerLite([function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }], function () {
        window.FS.setUserVars({
          experiment_str: experiment_str,
          variation_str: variation_str
        });
      }, {
        multiplier: 1.2,
        timeout: 0
      });
    };
    
    
    
    var setCookie = function setCookie(c_name, value, exdays, c_domain, exms) {
      c_domain = !c_domain ? "" : "domain=" + c_domain + ";";
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var exp = exms ? new Date(exdate.getTime() + exms) : exdays ? exdate : null;
      var c_value = escape(value) + (exp == null ? "" : "; expires=" + exp.toUTCString());
      document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
    };
    
    
    var getCookie = function getCookie(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s?)' + name + '=([^;]*)'));
      return match && match[2] ? unescape(match[2]) : undefined;
    };
    
    
    var deleteCookie = function deleteCookie(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    
    var settings = {
      ID: 'FL066',
      VARIATION: '1'
    };
    var ID = settings.ID,
        VARIATION = settings.VARIATION;
    
    function setup() {
      fullStory(ID, "Variation ".concat(VARIATION));
      document.body.classList.add(ID);
      if (VARIATION > 1) document.body.classList.add("".concat(ID, "-").concat(VARIATION));
    }
    
    var getUserStatus = function getUserStatus() {
      if (window.dataLayer[1] && window.dataLayer[1].visitorLoginState) {
        return window.dataLayer[1].visitorLoginState;
      }
    };
    
    var getSavedCards = function getSavedCards() {
      var savedCardsEl = document.querySelector('.PaymentMethodList .savedcard');
    
      if (savedCardsEl) {
        return true;
      } else {
        return false;
      }
    };
    
    var FL021 = function FL021() {
      (function () {
        var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
          return _typeof2(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
    
        var pollerLite = function pollerLite(elements, cb, options) {
          var settings = {
            wait: 50,
            multiplier: 1.1,
            timeout: 0
          };
    
          if (options) {
            Object.keys(options).forEach(function (key) {
              settings[key] = options[key];
            });
          }
    
          var now = Date.now || function getNow() {
            return new Date().getTime();
          };
    
          var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
          var successful = [];
    
          var conditionPassed = function conditionPassed(condition) {
            var toReturn = void 0;
    
            switch (typeof condition === 'undefined' ? 'undefined' : _typeof(condition)) {
              case 'function':
                toReturn = condition();
                break;
    
              case 'string':
                toReturn = !!document.querySelector(condition);
                break;
    
              default:
                toReturn = true;
                break;
            }
    
            return toReturn;
          };
    
          var pollForCondition = function pollForCondition(condition, wait) {
            if (timeout && now() > timeout) {
              return false;
            }
    
            settings.wait = wait || settings.wait;
    
            if (conditionPassed(condition)) {
              successful.push(true);
              if (successful.length === elements.length) cb();
            } else {
              setTimeout(function () {
                pollForCondition(condition, settings.wait * settings.multiplier);
              }, settings.wait);
            }
          };
    
          for (var i = 0; i < elements.length; i += 1) {
            pollForCondition(elements[i]);
          }
        };
    
        var fullStory = function fullStory(experiment_str, variation_str) {
          pollerLite([function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
          }], function () {
            window.FS.setUserVars({
              experiment_str: experiment_str,
              variation_str: variation_str
            });
          }, {
            multiplier: 1.2,
            timeout: 0
          });
        };

    
        var setCookie = function setCookie(c_name, value, exdays, c_domain, exms) {
          c_domain = !c_domain ? "" : "domain=" + c_domain + ";";
          var exdate = new Date();
          exdate.setDate(exdate.getDate() + exdays);
          var exp = exms ? new Date(exdate.getTime() + exms) : exdays ? exdate : null;
          var c_value = escape(value) + (exp == null ? "" : "; expires=" + exp.toUTCString());
          document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
        };
    
        var getCookie = function getCookie(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s?)' + name + '=([^;]*)'));
          return match && match[2] ? unescape(match[2]) : undefined;
        };
    
        var deleteCookie = function deleteCookie(name) {
          document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };
    
        var cardDetails = function cardDetails() {
          events.analyticsReference = '_gaUAT';
          var slideQ = false;
          var Exp = {
            settings: {
              ID: 'FL021V2',
              VARIATION: '2'
            },
            cache: function () {
              var bodyVar = document.body;
              var cardWrap = bodyVar.querySelector('iframe[id*="_CardCaptureFrame"]');
              return {
                bodyVar: bodyVar,
                cardWrap: cardWrap
              };
            }(),
            init: function init() {
              var services = Exp.services;
              var settings = Exp.settings;
              var components = Exp.components; 
    
              Exp.cache.bodyVar.classList.add(settings.ID, 'FL006_card-page');
              services.tracking();
              components.contentBuilder();
              components.clickBindings();
            },
            services: {
              tracking: function tracking() {
                var settings = Exp.settings;
                fullStory(settings.ID, 'Variation ' + settings.VARIATION);
              },
              hideFlicker: function hideFlicker() {
                var hide = document.getElementById('GDXXX_flickerPrevention');
                hide.parentElement.removeChild(hide);
              }
            },
            components: {
              contentBuilder: function contentBuilder() {
                var formStored = JSON.parse(localStorage.getItem('FL021_form'));
                var paypalCheck = getCookie('FL021_paypal');
                var appleCheck = getCookie('FL021_apple');
                var savedCards = localStorage.getItem('FL021_saved');
                Exp.cache.bodyVar.insertAdjacentHTML('afterbegin', '<form style="display: none;" method="post" action="/checkout/payment" id="FL021_form" enctype="multipart/form-data"></form>');
                Exp.cache.bodyVar.querySelector('#FL021_form').insertAdjacentHTML('afterbegin', formStored);
                Exp.cache.cardWrap.insertAdjacentHTML('afterend', '\n          <h2 class="FL006_header">Payment Options <a href="/checkout/usevoucher" class="FL006_voucher">Apply Promotional Code ></a></h2>\n          <div class="FL006_accordian">\n            <a href="/checkout/usegiftcard" class="FL006_accordian-btn FL006_gift_card"><a href="https://www.flannels.com/checkout/usegiftcard">Use Gift card</a></a>\n            <div class="FL066-voucher"><a href="/checkout/usevoucher" class="FL006_accordian-btn FL006_voucher">Use Voucher Code</a> <input type="text" name="FL066-voucherCode"/> <button class="FL066-applyVoucher">Apply</button> </div>\n            <a class="FL006_accordian-btn FL006_card">Pay with Card</a>\n          </div>\n          <div class="FL006_accordian-content">\n          </div>\n        ');
                var paymentOptions = Exp.cache.bodyVar.querySelector('.FL006_accordian');
                var accordianWrap = Exp.cache.bodyVar.querySelector('.FL006_accordian-content');
                accordianWrap.appendChild(Exp.cache.cardWrap); 
    
                if (savedCards) {
                  savedCards = JSON.parse(savedCards);
                  savedCards.forEach(function (item) {
                    var img = item.img.replace(/"/g, "'");
                    var posLeft = item.left;
                    var posTop = item.top;
                    var string = item.href;
                    string = string.replace("javascript:__doPostBack('", '');
                    string = string.replace("','')", '');
                    paymentOptions.querySelector('.FL006_gift_card').insertAdjacentHTML('beforebegin', '<a class="FL006_accordian-btn FL006_savedCard" data-post="' + string + '"><div class="FL021_saved-img" style="background-image: ' + img + '; background-position: ' + posTop + ' ' + posLeft + ';"></div>Ending in: <span>' + item.num + '</span></a>');
                  });
                  var savedBtns = document.querySelectorAll('.FL006_savedCard');
                  [].forEach.call(savedBtns, function (item) {
                    item.addEventListener('click', function () {
                      var postInfo = item.dataset.post;
                      Exp.cache.bodyVar.querySelector('#FL021_form #__EVENTTARGET').value = postInfo;
                      Exp.cache.bodyVar.querySelector('#FL021_form').submit();
                    });
                  });
                }
    
                if (paypalCheck === 'PayPalExists') {
                  var string = localStorage.getItem('FL021_paypal-post');
                  string = string.replace("javascript:__doPostBack('", '');
                  string = string.replace("','')", '');
                  paymentOptions.querySelector('.FL006_gift_card').insertAdjacentHTML('beforebegin', '<div class="FL066-or"><p>- or -</p><a class="FL006_accordian-btn FL006_paypal">Pay with <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAASCAYAAADrL9giAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjg4NDZGN0Q2QTkxMTFFOTkxMzdENENDODlDQjQ3QTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg4NDZGN0U2QTkxMTFFOTkxMzdENENDODlDQjQ3QTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCODg0NkY3QjZBOTExMUU5OTEzN0Q0Q0M4OUNCNDdBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCODg0NkY3QzZBOTExMUU5OTEzN0Q0Q0M4OUNCNDdBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp0PhrAAAAOqSURBVHja5FdbSFRhEN4VWSKWkEWW7YKISJAsUSKmIeGDSFiIRFRIhA/Rg4REQj0EQkhIDz2ED1EP9RAa3amIQqKy3BS7SNFFNEMMI0qSErOLtn1T34lx2j27BhuCAx//2Tkz88+Zf2b+Wa+HFI1G52Ep8PxNP4DPwCuv1/vJk0KCDzlYQoAPSCNk/0lgEPsP/YNNsVEJ+Ml6SvsjwDctWBZ1pwmgLsUBGE7gwylg/gxtLjU2qsirBhq0YEM0MU0BhSn6+OxocnRghna3Gf2QZIVkPBBIV7Kr1LOk/Gam3zqglnxJp3Io9mItA4qBLKaUlEc/cAap2ucEFcti2rkIfptyrAlLgD/bKaNpL/Cc9g+qFF4P7IP+CqylwEoggz5LWkeAc9hrkvLFyuZL8N/y+Qvxu06A9ypKt5SjPmBcvdsP1CYolXLqXlP8o8rmBsX/DuQBh02mhZT8afXuMX0ac/HhKmtfdHsUv8VmSBrXXCBT8TvU82pA1919YCFPvAu4ALSpE5RmWs/nV0ov5AQUS5PiH8OpyEnr0hpyToo1r5vzIyDIfXq592XRUTIV4jd0JWvyFD+SbJ3IaWwB9pjMeMHoB4F05/ZgXUWU3CW+26V4neTVKd4okEkbE+aUtwI7jF3JjCLKB1X2+k1WCRUAawwvP14AjiTRfEYdA1hLgZPAgHH8T5lQrlLx+qXpmIDuplxhkg2wkfJBlmIn/Zoycl8lc3iADo0x+2IG4KHLpqJ4Vq4OyjYm4WgVZfOMnWYTEB/ldia4eXqUzXwTxFjUQ9nzitce7+P9bEQOiVKYyNJRw/NyE+1mpmSNcSDLqV9jW+tuVHZbFH+c+4R5XweMv7oknjH18/k8reGauaIpXgBsndS63KnVSu4ja1Fq8ITiDzsdmDqvY5zQXWN3QL2LuOzvMyW3XR2MDnQND08HvDKWzXTTfYUeuMwVk+p5AW8EobDu0ujg+k6Xm2CJGa3r1UdJM8tR7+8lmG20D4egL/NKCb/FoW5+V5raszuWsTQzAMls/MRl85syk6vfYTVUxLtq7PzeigBpZ4rM+7gZAD3x77g5hBJehw59APrMdw2qAWi6TfkPQEO/JkAIXk8wWgY4jWVwUpOZYa3649IBGyNK/grlnQlzmf5TIyMwFn093XD708XyqmDWvANucy7IpcgI9O/wxsom7w14XZ7/TWxOU/YamxPE5thumqN/LgVgk+n8NbPRT28KAyB/iBapzt1qbodZQT8FGADgHSbTj8eMOQAAAABJRU5ErkJggg==" alt="PayPal"/></a></div>');
                  Exp.cache.bodyVar.querySelector('.FL006_paypal').addEventListener('click', function () {
                    Exp.cache.bodyVar.querySelector('#FL021_form #__EVENTTARGET').value = string;
                    Exp.cache.bodyVar.querySelector('#FL021_form').submit();
                    // events.send('FL066', 'FL066 Clicked', 'Paypal option', {
                    //   sendOnce: true
                    // });
                  });
                }
    
                if (appleCheck === 'ApplePayExists') {
                  var _string = localStorage.getItem('FL021_apple-post');
    
                  _string = _string.replace("javascript:__doPostBack('", '');
                  _string = _string.replace("','')", '');
                  paymentOptions.querySelector('.FL006_gift_card').insertAdjacentHTML('beforebegin', '<a class="FL006_accordian-btn FL006_apple">Pay with Apple Pay</a>');
                  Exp.cache.bodyVar.querySelector('.FL006_apple').addEventListener('click', function () {
                    Exp.cache.bodyVar.querySelector('#FL021_form #__EVENTTARGET').value = _string;
                    Exp.cache.bodyVar.querySelector('#FL021_form').submit();
                    // events.send('FL066', 'FL066 Clicked', 'Apple Pay option', {
                    //   sendOnce: true
                    // });
                  });
                }
    
                setTimeout(function () {
                  Exp.services.hideFlicker();
                }, 200);
              },
              clickBindings: function clickBindings() {
                pollerLite([function () {
                  var trigger = false;
    
                  if (window.jQuery) {
                    trigger = true;
                  }
    
                  return trigger;
                }], function () {
                  var cardBtn = $('.FL006_accordian-btn.FL006_card');
                  var cardContent = $('.FL006_accordian-content');
                  cardBtn.on('click', function () {
                    if (slideQ === false) {
                      slideQ = true;
                      cardBtn.toggleClass('FL006_active');
                      cardContent.slideToggle(function () {
                        slideQ = false;
                      });
                    }
                  });
                });
                Exp.cache.bodyVar.querySelector('.FL006_gift_card').addEventListener('click', function () {
                  // events.send('FL066', 'FL066 Clicked', 'Promo code', {
                  //   sendOnce: true
                  // });
                });
              }
            }
          };
          Exp.init();
        };
    
        var redirectToCardDetails = function redirectToCardDetails() {
          document.querySelector('.CardsIcons.PaymentMethodSelectionLink').click();
        };
    
        var eventVoucher = function eventVoucher() {
          events.analyticsReference = '_gaUAT';
          var hide = document.getElementById('GDXXX_flickerPrevention');
          hide.parentElement.removeChild(hide);
          document.getElementById('FindGiftCardButton').addEventListener('click', function () {
            setTimeout(function () {
              if (document.getElementById('CardDetailsNotEnteredAlert').style.display !== 'none') {
                // events.send('FL066', 'FL066 Clicked', 'Error in voucher code', {
                //   sendOnce: true
                // });
              }
            }, 200);
          });
        };
    
        var flicker = function flicker() {
          var hide = document.createElement('style');
          hide.type = 'text/css';
          hide.setAttribute('id', 'GDXXX_flickerPrevention');
          hide.appendChild(document.createTextNode('body {display:none!important}'));
          document.head.appendChild(hide);
          setTimeout(function () {
            if (document.getElementById('GDXXX_flickerPrevention')) {
              hide.parentElement.removeChild(hide);
            }
          }, 2000);
        };
    
        flicker();
        var pathname = window.location.pathname;
        var cookie = getCookie('FL006_paypal');
        var cookieApple = getCookie('FL006_apple');
        var savedCards = document.querySelectorAll('.savedcard');
        pollerLite([function () {
          var trigger = false;
    
          if (pathname.indexOf('/checkout/payment') > -1) {
            trigger = true;
            var form = JSON.stringify(document.querySelector('#__EVENTTARGET').parentNode.outerHTML);
            localStorage.setItem('FL021_form', form);
    
            if (document.querySelector('li[id*="divPaypalCheckoutButton"]') && !document.querySelector('li[id*="divPaypalCheckoutButton"]').classList.contains('hidden')) {
              setCookie('FL021_paypal', 'PayPalExists', 20000000000);
              localStorage.setItem('FL021_paypal-post', document.querySelector('li[id*="PaypalCheckoutButton"] .PaymentMethodSelectionLink').href);
            } else {
              deleteCookie('FL021_paypal');
            }
    
            if (document.getElementById('divApplePayCheckoutButton') && !document.getElementById('divApplePayCheckoutButton').classList.contains('hidden')) {
              setCookie('FL021_apple', 'ApplePayExists', 20000000000);
              localStorage.setItem('FL021_apple-post', document.querySelector('#divApplePayCheckoutButton .PaymentMethodSelectionLink').href);
            } else {
              deleteCookie('FL021_apple');
            }
    
            if (savedCards.length > 0) {
              var JObj = [];
              [].forEach.call(savedCards, function (item) {
                var cardEnd = item.querySelector('.CardNumber').innerText;
                var backgroundPos = window.getComputedStyle(item.querySelector('.PayImage'), null).backgroundPosition.trim().split(/\s+/);
                var backgroundImg = window.getComputedStyle(document.querySelector('.PaymentType_mastercard'), null).backgroundImage;
                JObj.push({
                  num: cardEnd,
                  img: backgroundImg,
                  top: backgroundPos[0],
                  left: backgroundPos[1],
                  href: item.href
                });
              });
              localStorage.setItem('FL021_saved', JSON.stringify(JObj));
            }
          }
    
          return trigger;
        }], redirectToCardDetails);
        pollerLite(['iframe[id*="_CardCaptureFrame"]'], cardDetails);
        pollerLite(['#FindGiftCardButton', function () {
          var trigger = false;
    
          if (pathname.indexOf('/checkout/usegiftcard') > -1) {
            trigger = true;
          }
    
          return trigger;
        }], eventVoucher);
      })();
    };
    
    var formData = null;
    var formRequest = false;
    var FL022 = {
      submitForm: function submitForm() {
        var _this = this;
    
        var submitBtn = document.querySelector('.FL066-applyVoucher');
        var input = document.querySelector('input[name="FL066-voucherCode"]');
    
        if (submitBtn && input) {
          submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var val = input.value;
    
            if (val) {
              _this.postVoucher(val);
            }
          });
        }
      },
      ajaxForm: function ajaxForm() {
        if (formRequest === false) {
          var URL = 'https://www.flannels.com/checkout/usevoucher';
          formRequest = true;
          $.ajax({
            type: 'GET',
            url: URL,
            success: function success(data) {
              var div = document.createElement('div');
              div.insertAdjacentHTML('afterbegin', data);
              var formRef = div.querySelector('#Form');
              var action = formRef.getAttribute('action');
              var enctype = formRef.getAttribute('enctype');
              var aspNet = formRef.querySelector('.aspNetHidden:first-child').cloneNode(true);
              var inputHidden = formRef.querySelector('input[id*="PromoCodeApplication_txtCode"]').cloneNode(true);
              var inputHidden2 = formRef.querySelector('input[name*="PromoCodeApplication$btnApply"]').cloneNode(true);
              document.body.insertAdjacentHTML('beforeend', "\n            <form class=\"FL022_form\" method=\"post\" action=\"".concat(action, "\" enctype=\"").concat(enctype, "\">\n            </form>\n          "));
              formData = document.querySelector('.FL022_form');
              formData.appendChild(aspNet);
              formData.appendChild(inputHidden);
              formData.appendChild(inputHidden2);
            }
          });
        }
      },
      postVoucher: function postVoucher(val) {
        var hiddenVal = document.querySelector('input[id*="PromoCodeApplication_txtCode"]');
        var addedSubmit = document.querySelector('input[name*="PromoCodeApplication$btnApply"]');
        var formPost = new FormData(formData);
        hiddenVal.value = val;
        $.ajax({
          type: 'post',
          data: formPost,
          success: function success(data) {
            var div = document.createElement('div');
            div.innerHTML = data;
            addedSubmit.click();
          },
          cache: false,
          contentType: false,
          processData: false,
          url: '/checkout/usevoucher'
        });
      },
      init: function init() {
        this.ajaxForm();
        this.submitForm();
      }
    };
    
    var goBack = function goBack() {
      var ref = document.querySelector('.ContentWrap .CheckWrap');
    
      if (ref) {
        ref.insertAdjacentHTML('beforeend', "\n      <a href=\"https://www.flannels.com/checkout/deliverychoices\" class=\"FL066-back\">Back</a>\n    ");
      }
    };
    
    
    events.analyticsReference = '_gaUAT';
    
    var activate = function activate() {
      setup();
      // events.send(settings.ID, "FL066 V".concat(settings.VARIATION, " is Active"), 'Test is active');
      var userStatus = getUserStatus();
      var hasSavedCards = getSavedCards();
      var basket = document.querySelector('.CheckoutLeft .OrderSumm');
      var voucherLink;
      
      
      /**
       * VAR 1 = Just the voucher code designs, e.g. Design 1+2
       * VAR 2 = The entire checkout styling + go back message
       */

    
      if (userStatus === 'logged+in') {
        (function () {
          
          if (VARIATION == '2') {
            document.body.classList.add('FL066-hasCards'); 

            var savedCards = document.querySelectorAll('.PaymentMethodList .savedcard');
      
            if (savedCards.length > 0) {
              var _loop = function _loop(i) {
                if (savedCards[i]) {
                  savedCards[i].insertAdjacentHTML('afterbegin', "\n            <p>Previous payment card</p>\n          "); 
      
                  var parentLi = savedCards[i].parentElement;
      
                  if (parentLi && parentLi.nodeName === 'LI') {
                    parentLi.classList.add('FL066-savedCardLi');
      
                    if (i === 0) {
                      parentLi.classList.add('FL066-activeCard');
                    }
                  }
      
                  savedCards[i].addEventListener('click', function (e) {
                    if (!savedCards[i].parentElement.classList.contains('FL066-activeCard')) {
                      e.preventDefault(); 
      
                      var currentActive = document.querySelector('.FL066-activeCard');
      
                      if (currentActive) {
                        currentActive.classList.remove('FL066-activeCard');
                      }
      
                      savedCards[i].parentElement.classList.add('FL066-activeCard');
                    }
                  });
                }
              };
      
              for (var i = 0; savedCards.length > i; i += 1) {
                _loop(i);
              }
            } else {
              document.body.classList.add('FL066-noCards');
            } 
      
      
            var addNewCard = document.querySelector('a.CardsIcons.PaymentMethodSelectionLink');
      
            if (addNewCard && addNewCard.parentElement && addNewCard.parentElement.nodeName === 'LI') {
              addNewCard.parentElement.classList.add('FL066-addCard');
            }
          }
    
    
          voucherLink = document.querySelector('a.Voucher.PaymentMethodSelectionLink');
          var voucherRef = document.querySelector('.CheckoutMobileSecurityNote');
    
          if (voucherLink) {
            voucherRef ? voucherRef.insertAdjacentHTML('afterend', '<div class="FL066-voucherWrap"><a href="" class="FL006_accordian-btn FL006_voucher">Use Voucher Code</a> <input type="text" name="FL066-voucherCode"/> <button class="FL066-applyVoucher">Apply</button></div>') : null;
            voucherLink = document.querySelector('a.FL006_voucher');
          } 
    
          if (VARIATION == '2') {
            var payPalRef = document.querySelector('li[data-paymenttype="PayPal"]');
      
            if (payPalRef) {
              payPalRef.insertAdjacentHTML('beforebegin', "\n        <li class=\"FL066-payCard\">\n        <button class=\"FL066-payCardBtn\">\n          Pay By Card\n          </button>\n        </li>\n        <li class=\"FL066-or\">\n          <p>- or -</p>\n        </li>\n      "); 
      
              var PayPalLogoRef = payPalRef.querySelector('span.PayText span.bold');
      
              if (PayPalLogoRef) {
                PayPalLogoRef.textContent = '';
                PayPalLogoRef.insertAdjacentHTML('beforeend', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAASCAYAAADrL9giAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjg4NDZGN0Q2QTkxMTFFOTkxMzdENENDODlDQjQ3QTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg4NDZGN0U2QTkxMTFFOTkxMzdENENDODlDQjQ3QTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCODg0NkY3QjZBOTExMUU5OTEzN0Q0Q0M4OUNCNDdBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCODg0NkY3QzZBOTExMUU5OTEzN0Q0Q0M4OUNCNDdBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp0PhrAAAAOqSURBVHja5FdbSFRhEN4VWSKWkEWW7YKISJAsUSKmIeGDSFiIRFRIhA/Rg4REQj0EQkhIDz2ED1EP9RAa3amIQqKy3BS7SNFFNEMMI0qSErOLtn1T34lx2j27BhuCAx//2Tkz88+Zf2b+Wa+HFI1G52Ep8PxNP4DPwCuv1/vJk0KCDzlYQoAPSCNk/0lgEPsP/YNNsVEJ+Ml6SvsjwDctWBZ1pwmgLsUBGE7gwylg/gxtLjU2qsirBhq0YEM0MU0BhSn6+OxocnRghna3Gf2QZIVkPBBIV7Kr1LOk/Gam3zqglnxJp3Io9mItA4qBLKaUlEc/cAap2ucEFcti2rkIfptyrAlLgD/bKaNpL/Cc9g+qFF4P7IP+CqylwEoggz5LWkeAc9hrkvLFyuZL8N/y+Qvxu06A9ypKt5SjPmBcvdsP1CYolXLqXlP8o8rmBsX/DuQBh02mhZT8afXuMX0ac/HhKmtfdHsUv8VmSBrXXCBT8TvU82pA1919YCFPvAu4ALSpE5RmWs/nV0ov5AQUS5PiH8OpyEnr0hpyToo1r5vzIyDIfXq592XRUTIV4jd0JWvyFD+SbJ3IaWwB9pjMeMHoB4F05/ZgXUWU3CW+26V4neTVKd4okEkbE+aUtwI7jF3JjCLKB1X2+k1WCRUAawwvP14AjiTRfEYdA1hLgZPAgHH8T5lQrlLx+qXpmIDuplxhkg2wkfJBlmIn/Zoycl8lc3iADo0x+2IG4KHLpqJ4Vq4OyjYm4WgVZfOMnWYTEB/ldia4eXqUzXwTxFjUQ9nzitce7+P9bEQOiVKYyNJRw/NyE+1mpmSNcSDLqV9jW+tuVHZbFH+c+4R5XweMv7oknjH18/k8reGauaIpXgBsndS63KnVSu4ja1Fq8ITiDzsdmDqvY5zQXWN3QL2LuOzvMyW3XR2MDnQND08HvDKWzXTTfYUeuMwVk+p5AW8EobDu0ujg+k6Xm2CJGa3r1UdJM8tR7+8lmG20D4egL/NKCb/FoW5+V5raszuWsTQzAMls/MRl85syk6vfYTVUxLtq7PzeigBpZ4rM+7gZAD3x77g5hBJehw59APrMdw2qAWi6TfkPQEO/JkAIXk8wWgY4jWVwUpOZYa3649IBGyNK/grlnQlzmf5TIyMwFn093XD708XyqmDWvANucy7IpcgI9O/wxsom7w14XZ7/TWxOU/YamxPE5thumqN/LgVgk+n8NbPRT28KAyB/iBapzt1qbodZQT8FGADgHSbTj8eMOQAAAABJRU5ErkJggg==" alt="PayPal"/>');
              }
            }
      
            var payCardBtn = document.querySelector('.FL066-payCardBtn');
      
            if (payCardBtn) {
              payCardBtn.addEventListener('click', function (e) {
                e.preventDefault();
                // events.send(settings.ID, 'FL066 Click', 'User clicked pay by card');
                var ogBtn = document.querySelector('li.FL066-activeCard a.PaymentMethodSelectionLink');
      
                if (ogBtn) {
                  ogBtn.click();
                }
              });
            }
          }
        })();
      } else if (userStatus !== 'logged+in') {
        if (!document.querySelector('.FL021V2')) {
          FL021();
          // if (VARIATION == '2') {
          // }
        }
    
        var addedTestFrame = document.querySelector('.FL006_accordian-content'); 
    
        var removeVoucherLink = document.querySelector('a#dnn_ctr88156_PaymentMethod_lbtnRemovePromoCode'); 
    
        voucherLink = document.querySelector('.FL006_accordian-btn.FL006_voucher'); 
    
        var addedAccordian = document.querySelector('.FL006_accordian');
    
        if (addedAccordian && addedTestFrame) {
          addedTestFrame.insertAdjacentElement('afterend', addedAccordian);
        }
    
        if (window.location.href.indexOf('/carddetails') > -1) {
          goBack(); 
    
          var billingMessage = document.querySelector('.FL066 .FL066-or');
    
          if (billingMessage) {
            billingMessage.insertAdjacentHTML('beforeend', "\n          <p class=\"FL066-billingMessage\">If you have selected a different billing address to your delivery address, you can add a new billing address on the next page, after payment.</p>\n        ");
          }
        }
      } 
    
    
      if (voucherLink && voucherLink.parentElement) {
        var voucher = voucherLink.parentElement;
        voucherLink.addEventListener('click', function (e) {
          e.preventDefault();
          // events.send(settings.ID, 'FL066 Click', 'User clicked toggle voucher');
    
          if (!voucher.classList.contains('FL066-showVoucher')) {
            voucher.classList.add('FL066-showVoucher');
          }
        });
      }

    
      FL022.init();
      
    
      var showMessages = function showMessages() {
        if (getCookie('FL066-addedDiscount') && !getCookie('FL066-messageShown')) {
          document.body.insertAdjacentHTML('afterbegin', "\n        <div class=\"FL066-discountMessage\">\n          <p>Discount has been applied.</p>\n        </div>\n      ");
          document.body.classList.add('FL066-discountAdded');
          // events.send(settings.ID, 'FL066 Discount Added', 'Discount code applied');
          setTimeout(function () {
            var el = document.querySelector('.FL066-discountMessage');
    
            if (el) {
              el.parentNode.removeChild(el);
            }
    
            deleteCookie('FL066-messageShown');
            deleteCookie('FL066-addedDiscount'); 
    
            setCookie('FL066-messageShown', 'true', 2);
          }, 3500);
        } 
    
    
        if (getCookie('FL066-voucherError') && !getCookie('FL066-messageShown')) {
          document.body.insertAdjacentHTML('afterbegin', "\n        <div class=\"FL066-discountMessage FL066-discountError\">\n          <p>This discount code is not valid.</p>\n        </div>\n      ");
          document.body.classList.remove('FL066-discountAdded');
          // events.send(settings.ID, 'FL066 Invalid Code', 'Discount code invalid'); 
    
          setTimeout(function () {
            var el = document.querySelector('.FL066-discountMessage');
    
            if (el) {
              el.parentNode.removeChild(el);
            }
    
            deleteCookie('FL066-messageShown');
            deleteCookie('FL066-voucherError');
            setCookie('FL066-messageShown', 'true', 2);
          }, 3500); 
        } 
    
    
        if (getCookie('FL066-cardError') && !getCookie('FL066-messageShown') && window.location.href.indexOf('/carddetails') > -1) {
          document.body.insertAdjacentHTML('afterbegin', "\n        <div class=\"FL066-discountMessage FL066-discountError\">\n          <p>There was a problem with your card details, please try again.</p>\n        </div>\n      ");
          // events.send(settings.ID, 'FL066 Invalid Card', 'Card details invalid'); 
    
          setTimeout(function () {
            var el = document.querySelector('.FL066-discountMessage');
    
            if (el) {
              el.parentNode.removeChild(el);
            }
    
            deleteCookie('FL066-messageShown');
            deleteCookie('FL066-cardError');
          }, 3500); 
    
          setCookie('FL066-messageShown', 'true', 2);
        } 
    
    
        if (getCookie('FL066-payError') && !getCookie('FL066-messageShown')) {
          document.body.insertAdjacentHTML('afterbegin', "\n        <div class=\"FL066-discountMessage FL066-discountError\">\n          <p>Your card issuer has declined the payment. Please ensure that you enter all card details correctly and you have sufficient funds available to make the payment. If this problem persists, please contact your card issuer.</p>\n        </div>\n      ");
          // events.send(settings.ID, 'FL066 Payment Failed', 'Payment failed on confirmation page'); 
    
          setTimeout(function () {
            var el = document.querySelector('.FL066-discountMessage');
    
            if (el) {
              el.parentNode.removeChild(el);
            }
    
            deleteCookie('FL066-messageShown');
            deleteCookie('FL066-payError');
          }, 3500); 
    
          setCookie('FL066-messageShown', 'true', 2);
        }
      };
    
      showMessages(); 
    
      basket.insertAdjacentHTML('afterbegin', "\n    <div class=\"FL066-message\">\n      <p>You can still review your order before purchasing on the next page</p>\n    </div>\n  ");
    
      if (window.location.href.indexOf('/carddetails') > -1) {
        setTimeout(function () {
          var iframeEl = document.querySelector('iframe#dnn_ctr88159_CardCapture_CardCaptureFrame');
    
          if (iframeEl) {
            iframeEl.src = iframeEl.src;
          }
        }, 800);
      } 
    
    
      if (window.location.href.indexOf('/usevoucher') > -1) {
        pollerLite(['.ProValue', '.AddressContainBut input[type="submit"]'], function () {
          deleteCookie('FL066-addedDiscount');
          deleteCookie('FL066-messageShown'); 

          console.log('here');
    
          setCookie('FL066-addedDiscount', 'true', 2); 
    
          var continueBtn = document.querySelector('.AddressContainBut input[type="submit"]');
    
          if (continueBtn) {
            continueBtn.click();
          }
        }); 
    
        pollerLite(['#dnn_ctr88158_PromoCodeApplication_divVoucherError'], function () {
          deleteCookie('FL066-addedDiscount');
          deleteCookie('FL066-messageShown'); 
    
          setCookie('FL066-voucherError', 'true', 2); 
    
          if (document.referrer === 'https://www.flannels.com/checkout/payment') {
            window.location.href = 'https://www.flannels.com/checkout/payment';
          } else {
            window.location.href = 'https://www.flannels.com/checkout/carddetails';
          }
        });
      } 
    
    
      pollerLite(['#DiscountRow'], function () {
        var discountEl = document.querySelector('#DiscountRow');
    
        if (discountEl && discountEl.style.display == 'block') {
          document.body.classList.add('FL066-discountAdded');
        }
      }); 
    
      if (window.location.href === 'https://www.flannels.com/checkout/payment?errorcode=100') {
        pollerLite(['.PaymentStage #dnn_ctr88156_PaymentMethod_ProcessingErrorMessage_ErrorPaymentMessage'], function () {
          deleteCookie('FL066-messageShown'); 
    
          setCookie('FL066-cardError', 'true', 2); 
    
          window.location.href = 'https://www.flannels.com/checkout/payment'; 
        });
      } 
    
    
      if (window.location.href.indexOf('payment?errorcode=101&ct=2')) {
        pollerLite(['.PaymentStage #dnn_ctr88156_PaymentMethod_ProcessingErrorMessage_ErrorPaymentMessage'], function () {
          deleteCookie('FL066-messageShown'); 
    
          setCookie('FL066-payError', 'true', 2);
        });
      }
    };
    
    pollerLite(['body', '.CheckoutLeft .OrderSumm'], activate);
    })();
}