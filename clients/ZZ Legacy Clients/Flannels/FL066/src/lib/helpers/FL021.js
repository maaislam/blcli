const FL021 = () => {
  (function() {
    'use strict';
      
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    var createPollingElement = function createPollingElement(_ref) {
    var elm = _ref.elm,
        maxDuration = _ref.maxDuration;
    return {
      elm: elm,
      maxDuration: maxDuration,
  
      expressionValidator: function expressionValidator(expr) {
        if (!expr) {
          throw Error('Invalid poller expression');
        }
  
        var type = typeof expr === 'undefined' ? 'undefined' : _typeof(expr);
  
        switch (type) {
          case 'function':
            return !!expr.call();
          case 'string':
            return !!document.querySelector(expr);
        }
  
        return true;
      },
  
  
      destroy: function destroy() {
        if (this.winTimeout) {
          clearTimeout(this.winTimeout);
        }
      },
  
  
      poll: function poll(delay, multiplier, successCallback, timeoutCallback) {
        var _this = this;
  
        if (!this.startedAt) {
          this.startedAt = new Date().getTime();
        }
  
        var exceedsMaxDuration = this.maxDuration ? this.startedAt + this.maxDuration < new Date().getTime() : false;
  
        if (exceedsMaxDuration) {
          if (typeof timeoutCallback === 'function') {
            timeoutCallback(this.elm);
          }
          this.destroy();
  
          return false;
        }
  
        this.winTimeout = setTimeout(function () {
          if (_this.expressionValidator(_this.elm)) {
            return successCallback(_this);
          } else {
            _this.poll(delay * multiplier, multiplier, successCallback, timeoutCallback);
          }
        }, delay);
      }
    };
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
    }, { multiplier: 1.2, timeout: 0 });
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
          window[self.analyticsReference](tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
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
  
  
        // events.send(settings.ID, 'View', settings.ID + ' Variation ' + settings.VARIATION, { sendOnce: true });
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
  
          Exp.cache.cardWrap.insertAdjacentHTML('afterend', '\n          <h2 class="FL006_header">Payment Options <a href="/checkout/usevoucher" class="FL006_voucher">Apply Promotional Code ></a></h2>\n          <div class="FL006_accordian">\n            <a href="/checkout/usegiftcard" class="FL006_accordian-btn FL006_gift_card">Use Gift card / eVoucher</a>\n            <div class="FL066-voucher"><a href="/checkout/usevoucher" class="FL006_accordian-btn FL006_voucher">Use Voucher Code</a> <input type="text" name="FL066-voucherCode"/> <button class="FL066-applyVoucher">Apply</button> </div>\n            <a class="FL006_accordian-btn FL006_card">Pay with Card</a>\n          </div>\n          <div class="FL006_accordian-content">\n          </div>\n        ');
  
          var paymentOptions = Exp.cache.bodyVar.querySelector('.FL006_accordian');
          var accordianWrap = Exp.cache.bodyVar.querySelector('.FL006_accordian-content');
  
          accordianWrap.appendChild(Exp.cache.cardWrap);
          // accordianWrap.insertAdjacentHTML('beforeend', '<p>If your billing address is different than your delivery address you may be asked to provide your billing address after you’ve entered your card details</p>');
  
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
              events.send('FL066', 'FL066 Clicked', 'Paypal option', { sendOnce: true });
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
              events.send('FL066', 'FL066 Clicked', 'Apple Pay option', { sendOnce: true });
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
            events.send('FL066', 'FL066 Clicked', 'Promo code', { sendOnce: true });
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
          events.send('FL066', 'FL066 Clicked', 'Error in voucher code', { sendOnce: true });
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

export default FL021;
