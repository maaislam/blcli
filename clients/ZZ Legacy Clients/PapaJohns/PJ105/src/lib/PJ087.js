import PJ105shared from './shared';

const PJ087 = (function() {
  'use strict';
  
  function _typeof(obj) {
    "@babel/helpers - typeof";
  
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
  
    return _typeof(obj);
  }
  
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  
  
  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;
  
  
  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  
  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;
  
  
  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;
  
  
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  
  
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  
  
  var getNow = Date.now || function getNow() {
    return new Date().getTime();
  };
  
  var mergeObjects = function mergeObjects(target, source) {
    var merged = target;
    Object.keys(source).forEach(function (key) {
      var sourceValue = source[key];
      var targetValue = merged[key];
      var isObject = targetValue && _typeof(targetValue) === 'object' && !(targetValue instanceof Array);
  
      if (isObject) {
        merged[key] = mergeObjects(targetValue, sourceValue);
      } else {
        merged[key] = sourceValue;
      }
    });
    return merged;
  };
  
  var pollerLite = function pollerLite(conditions, callback, userOptions) {
    var options = {
      wait: 50,
      multiplier: 1.1,
      timeout: 0
    }; 
  
    if (userOptions) {
      options = mergeObjects(options, userOptions);
    }
  
    var _options = options,
        multiplier = _options.multiplier,
        wait = _options.wait;
  
    var timeout = options.timeout ? new Date(getNow() + options.timeout) : null;
  
    var isTimedOut = function isTimedOut() {
      return timeout && getNow() > timeout;
    };
  
  
    var successfulConditions = [];
  
    var evaluateCondition = function evaluateCondition(condition) {
      if (!condition) {
        return false;
      }
  
      var types = {
        "function": function _function() {
          return condition();
        },
        string: function string() {
          return document.querySelector(condition);
        }
      };
  
      var evaluate = types[_typeof(condition)];
  
      return evaluate ? evaluate() : true;
    };
  
  
    var allConditionsPassed = function allConditionsPassed() {
      return successfulConditions.length === conditions.length;
    };
  
  
    var pollForCondition = function pollForCondition(condition, waitTime, skipWait) {
      if (timeout && isTimedOut()) {
        return false;
      }
  
      var result = evaluateCondition(condition);
  
      if (result) {
        successfulConditions.push(result);
  
        if (allConditionsPassed()) {
          callback(successfulConditions);
        }
      } else {
        setTimeout(function () {
          pollForCondition(condition, waitTime * multiplier);
        }, skipWait ? 0 : waitTime);
      }
    }; 
  
  
    for (var i = 0; i < conditions.length; i += 1) {
      if (typeof conditions[i] != 'string' && typeof conditions[i] != 'function') {
        throw "Every item in the poller array should be a function or a string";
      }
  
      pollForCondition(conditions[i], wait, true);
    }
  };
  
  var fullStory = function fullStory(experimentStr, variationStr) {
    pollerLite([function () {
      var fs = window.FS;
      if (fs && fs.setUserVars) return true;
    }], function () {
      window.FS.setUserVars({
        experiment_str: experimentStr,
        variation_str: variationStr
      });
    }, {
      multiplier: 1.2,
      timeout: 0
    });
  };
  
  var shared = {
    ID: 'PJ087',
    VARIATION: '1'
  };
  
  
  var PJ087_setup = function PJ087_setup() {
    var ID = 'PJ087',
        VARIATION = '1';
  
    fullStory(ID, "Variation ".concat(VARIATION));
    
    document.body.classList.add(ID);
    document.body.classList.add(`${ID}-via-PJ105`);
  }; 
  
  var camelize = function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; 
  
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };
  var generateLightbox = function generateLightbox(currentStore, dipsObj) {
    var listOfDips = '';
    var lightboxDips = ['BBQ', 'Special Garlic', 'Garlic and Herb', 'Hot Buffalo', 'Pizza Sauce'];
  
    for (var i = 0; i < Object.keys(dipsObj).length; i += 1) {
      var dip = dipsObj[i]; 
  
      if (lightboxDips.includes(dip["name"])) {
        var dipID = void 0;
  
        if (dip["name"] !== "BBQ") {
          dipID = camelize(dip["name"]);
        } else {
          dipID = "bbq";
        }
  
        listOfDips += "<li class=\"".concat(shared.ID, "-dip\" id=\"").concat(shared.ID, "-").concat(dipID, "\">\n        <div class=\"").concat(shared.ID, "-dip__img\">\n          <div id=\"").concat(shared.ID, "-").concat(dipID, "__img\"></div>\n        </div>\n        <div class=\"").concat(shared.ID, "-dip__title\">").concat(dip.name, "</div>\n        <div class=\"").concat(shared.ID, "-dip__input\">\n          <form>\n            <div class=\"value-button decrease\" value=\"Decrease Value\">-</div>\n            <input type=\"number\" class=\"number\" data-input=\"").concat(shared.ID, "-").concat(dipID, "\" value=\"1\" />\n            <div class=\"value-button increase\" value=\"Increase Value\">+</div>\n          </form>\n        </div>\n        <div class=\"").concat(shared.ID, "-dip__cta\">\n          <div class=\"").concat(shared.ID, "-cta__btn\" data-to-add=\"").concat(dipID, "\" data-option=\"").concat(dip.id, "\">ADD TO BAG (+45p)</div>\n        </div>\n      </li>");
      }
    }
  
    var mainContainer = document.querySelector('.main');
    var lightboxContainer = "<div class=\"".concat(shared.ID, "-lightbox__wrapper hide\">\n    <div class=\"").concat(shared.ID, "-lightbox__container\">\n      <div  class=\"").concat(shared.ID, "-lightbox__header\">\n        <div  class=\"").concat(shared.ID, "-lightbox__title\">Why not add an extra dip to complete your meal?</div>\n        <span class=\"").concat(shared.ID, "-lightbox__close\"></span>\n      </div>\n      <div class=\"").concat(shared.ID, "-lightbox__content\">\n        <ul class=\"").concat(shared.ID, "-dips\">\n          <li class=\"").concat(shared.ID, "-dip\">\n            <div class=\"").concat(shared.ID, "-dip__img\">\n              <div></div>\n            </div>\n            <div class=\"").concat(shared.ID, "-dip__title\"></div>\n            <div class=\"").concat(shared.ID, "-dip__input\">\n              <form>\n                <div class=\"value-button\" class=\"decrease\" value=\"Decrease Value\">-</div>\n                <input type=\"number\" class=\"number\" value=\"1\" />\n                <div class=\"value-button\" class=\"increase\" value=\"Increase Value\">+</div>\n              </form>\n            </div>\n            <div class=\"").concat(shared.ID, "-dip__cta\">\n              <div class=\"").concat(shared.ID, "-cta__btn\">ADD TO BAG (+45p)</div>\n            </div>\n          </li>\n          ").concat(listOfDips, "\n        </ul>\n\n        <div class=\"").concat(shared.ID, "-skip-step\"><a href=\"/stores/").concat(currentStore, "/basket-confirmation.aspx\">No, thanks</a></div>\n      </div>\n    </div>\n  </div>");
    mainContainer.insertAdjacentHTML('afterbegin', lightboxContainer); 
  
    var lightboxEl = document.querySelector(".".concat(shared.ID, "-lightbox__wrapper"));
    closeLightbox(lightboxEl, currentStore);
  };
  var closeLightbox = function closeLightbox(lightboxEl, currentStore) {
  
    var closeIcon = document.querySelector(".".concat(shared.ID, "-lightbox__close"));
    closeIcon.addEventListener('click', function () {
      lightboxEl.classList.add('hide'); 
  
      window.location.pathname = "/stores/".concat(currentStore, "/basket-confirmation.aspx");
    }); 
  
    document.querySelector(".".concat(shared.ID, "-lightbox__wrapper")).addEventListener('click', function (e) {
      if (document.querySelector(".".concat(shared.ID, "-lightbox__container")) && !document.querySelector(".".concat(shared.ID, "-lightbox__container")).classList.contains('hide')) {
        if (!document.querySelector(".".concat(shared.ID, "-lightbox__container")).contains(e.target)) {
          lightboxEl.classList.add('hide');
          window.location.pathname = "/stores/".concat(currentStore, "/basket-confirmation.aspx"); 
        }
      }
    });
  }; 
  
  
  var PJ087_activate = function PJ087_activate() {
    if (PJ105shared.VARIATION == '1') {
      console.log(shared);
      if (sessionStorage.getItem("".concat(shared.ID, "-dipsLightbox")) == null) {
        PJ087_setup(); 
        var dipsObj = document.querySelector('#hdnDipData').value; 
    
        dipsObj = JSON.parse(dipsObj); 
    
        var device = '';
    
        if (window.innerWidth <= 433) {
          device = 'mobile';
        } else {
          device = 'desktop';
        }
    
        var pathname = window.location.pathname;
        var currentStore = pathname.split('/')[2];
        generateLightbox(currentStore, dipsObj);
    
        var basketContent = parseInt(document.querySelector('.basketIcon').innerText);
    
        if (basketContent > 0) {
          var basketBtn = document.querySelector('.topInner.logoPadding table td.basket');
          var basketBtnLink = basketBtn.querySelector('a');
          basketBtnLink.setAttribute('href', 'javascript:void(0)');
          basketBtn.addEventListener('click', function (e) {
            document.querySelector(".".concat(shared.ID, "-lightbox__wrapper")).classList.remove('hide'); 
    
            sessionStorage.setItem("".concat(shared.ID, "-dipsLightbox"), true);
          }); 
    
          if (device == 'desktop') {
            pollerLite(['.basketNotification .buttons'], function () {
              var hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
              var hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
              hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');
              hiddenBasketBtn.addEventListener('click', function (e) {
                document.querySelector(".".concat(shared.ID, "-lightbox__wrapper")).classList.remove('hide'); 
    
                sessionStorage.setItem("".concat(shared.ID, "-dipsLightbox"), true);
              });
            });
          }
        } else {
          if (device == 'desktop') {
            pollerLite(['.basketNotification .buttons'], function () {
              var hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
              var hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
              hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');
              hiddenBasketBtn.addEventListener('click', function (e) {
                document.querySelector(".".concat(shared.ID, "-lightbox__wrapper")).classList.remove('hide'); 
    
                sessionStorage.setItem("".concat(shared.ID, "-dipsLightbox"), true);
              });
            });
          }
        } 
    
    
        var allDips = document.querySelectorAll(".".concat(shared.ID, "-dip"));
        [].forEach.call(allDips, function (dip) {
          var addToBasketCta = dip.querySelector(".".concat(shared.ID, "-cta__btn"));
          var dipID = dip.getAttribute('id');
    
          if (addToBasketCta) {
            addToBasketCta.addEventListener('click', function (e) {
              var variationId = addToBasketCta.getAttribute('data-option');
              var quantity = dip.querySelector('.number').value; 
    
              window.location.href = "https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=".concat(variationId, "&quantity=").concat(quantity);
              setTimeout(function () {
                document.querySelector(".".concat(shared.ID, "-lightbox__container")).innerHTML = 'One moment...';
                document.querySelector(".".concat(shared.ID, "-lightbox__container")).setAttribute('style', 'padding: 3vw; text-align: center;');
                document.querySelector(".".concat(shared.ID, "-lightbox__wrapper")).setAttribute('style', 'display: block !important;');
              }, 500);
            });
          }
    
          var increaseClick = dip.querySelector('.increase');
          var decreaseClick = dip.querySelector('.decrease');
    
          if (increaseClick) {
            increaseClick.addEventListener('click', function (e) {
              var value = parseInt(dip.querySelector('.number').value, 10);
              value = isNaN(value) ? 0 : value;
    
              if (value < 10) {
                value++;
                dip.querySelector('.number').value = value;
                dip.querySelector('.number').setAttribute('value', value);
              } 
            });
          }
    
          if (decreaseClick) {
            decreaseClick.addEventListener('click', function (e) {
              var value = parseInt(dip.querySelector('.number').value, 10);
              value = isNaN(value) ? 0 : value;
    
              if (value > 1) {
                value--;
                dip.querySelector('.number').value = value;
                dip.querySelector('.number').setAttribute('value', value); 
              }
            });
          }
        }); 
    
        window.prm.add_endRequest(function (sender, error) {
          try {
            if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbProceedMobile" || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbReturnToSignInMobile" || sender['_postBackSettings'].asyncTarget.indexOf("$_objMenuProduct$lbAddToBasket") > -1) {
              PJ087_activate(); 
    
              pollerLite(['#ctl00__objHeader_upBasketNotification', '.basketNotification .buttons'], function () {
                if (device == 'desktop') {
                  var hiddenBasketBtn = document.querySelector('.basketNotification .buttons');
                  var hiddenBasketBtnLink = hiddenBasketBtn.querySelector('a.blackButton');
                  hiddenBasketBtnLink.setAttribute('href', 'javascript:void(0)');
                  hiddenBasketBtn.addEventListener('click', function (e) {
                    document.querySelector(".".concat(shared.ID, "-lightbox__wrapper")).classList.remove('hide'); 
    
                    sessionStorage.setItem("".concat(shared.ID, "-dipsLightbox"), true);
                  });
                }
              });
            }
          } catch (e) {}
        });
      }
    }
  };
  
  pollerLite(['body', 
  '.basketIcon', function () {
    var poller = false;
  
    if (window.location.pathname.indexOf("/sides.aspx") > -1 || window.location.pathname.indexOf("/pizzas.aspx") > -1 || window.location.pathname.indexOf("/vegan.aspx") > -1 || window.location.pathname.indexOf("/drinks.aspx") > -1 || window.location.pathname.indexOf("/desserts.aspx") > -1) {
      poller = true;
    }
  
    return poller;
  }], PJ087_activate);
  
  })();

  export default PJ087;