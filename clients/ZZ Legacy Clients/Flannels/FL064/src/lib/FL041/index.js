export const FL041 = (varTwo) => {
  (function() {
    'use strict';
    
    
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
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
    
    
    
    
    
    
    var observer = {
      active: [],
    
      connect: function connectMethod(elements, cb, options) {
        var settings = {
          throttle: 1000,
          config: {
            attributes: true,
            childList: true,
            subtree: false
          }
        };
    
        if (options) {
          Object.keys(options).forEach(function (key) {
            settings[key] = options[key];
          });
        }
    
        var blockCb = void 0;
        var mutationObserver = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (!blockCb) {
              blockCb = true;
              cb(elements, mutation);
              setTimeout(function () {
                blockCb = false;
              }, settings.throttle);
            }
          });
        });
    
        if (elements.length) {
          for (var i = 0; i < elements.length; i += 1) {
            mutationObserver.observe(elements[i], settings.config);
            this.active.push([elements[i], mutationObserver]);
          }
        } else {
          mutationObserver.observe(elements, settings.config);
          this.active.push([elements, mutationObserver]);
        }
    
        return mutationObserver;
      },
    
      disconnect: function disconnectMethod(elements) {
        var active = this.active;
    
    
        function removeObservers(element) {
          for (var i = 0; i < active.length; i += 1) {
            if (element === active[i][0]) {
              active[i][1].disconnect();
            }
          }
        }
    
        if (elements.length) {
          for (var i = 0; i < elements.length; i += 1) {
            removeObservers(elements[i]);
          }
        } else {
          removeObservers(elements);
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
    
  
    
    
    
    var settings = {
      ID: 'FL064',
      VARIATION: '1'
    };
    
    var ID = settings.ID,
        VARIATION = settings.VARIATION;
    
    var $$1 = null;
    var productVars = void 0;
    function setup() {
      fullStory(ID, 'Variation ' + VARIATION);
      document.body.classList.add(ID);
      if (VARIATION > 1) document.body.classList.add(ID + '-' + VARIATION);
    }
    
    function showErrorMessage(messageToShow, ref) {
      if (messageToShow && ref) {
        ref.insertAdjacentHTML('beforeend', '\n      <div class="FL064-error SelectSizePopover popover bottom in">\n        <div class="arrow"></div>\n        <span class="glyphicon glyphicon-warning-sign"></span>\n        <p>' + messageToShow + '</p>\n      </div>\n    ');
      }
    }
    
    function showSuccessMessage(messageToShow, ref) {
      if (messageToShow && ref) {
        ref.insertAdjacentHTML('beforeend', '\n      <div class="FL064-success">\n        <p>' + messageToShow + '</p>\n      </div>\n    ');
      }
    }
    
    function addQuickView(products) {
      if (products.length) {
        Array.from(products).map(function (product) {
          var productRef = product.querySelector('.productimage.s-productthumbimage');
          var link = product.querySelector('.ProductImageList').getAttribute('href');
          if (productRef && link) {
            productRef.insertAdjacentHTML('afterend', '\n          <div class="FL064-quickview">\n            <a href="' + link + '"><span class="FL064-qv-icon"></span> QUICK VIEW</a>\n          </div>\n        ');
          }
        });
      }
    }
    
    function fetchProductDetails(link, cb) {
      if (link) {
        var request = new XMLHttpRequest();
        request.open('GET', link, true);
    
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            var data = request.responseText;
            if (data) {
              var html = document.createElement('div');
              html.innerHTML = data;
              var productObj = {
                title: html.querySelector('#productDetails .title h1'),
                price: html.querySelector('.pdpPriceRating .pdpPrice span'),
                code: html.querySelector('.headerProductCode .productCode'),
                info: html.querySelector('.infoTabPage p:first-of-type'),
                options: html.querySelector('.productVariantContainer .ColnSize'),
                atb: html.querySelector('.BasketWishContainer .addToBasketContainer'),
                images: html.querySelectorAll('#piThumbList li a'),
                sizeVariantId: html.querySelectorAll('.productVariantContainer .ProductDetailsVariants'),
                variants: html.querySelectorAll('.productVariantContainer .ProductDetailsVariants'),
                link: link
              };
              cb(productObj);
            }
          } else {
    
          }
        };
    
        request.onerror = function () {
        };
    
        request.send();
      }
    }
    
    function popup(elObj, product) {
      if (elObj && product) {
        var ref = product.parentElement.parentElement.parentElement;
    
        var slider = document.createElement('div');
        slider.classList.add('FL064-slider');

        for (var i = 0; elObj.images.length > i; i += 1) {
          var src = elObj.images[i].getAttribute('href');
          var imgEl = document.createElement('div');
          imgEl.innerHTML = '\n        <img src="' + src + '" alt="product image"/>\n      ';
          slider.insertAdjacentElement('beforeend', imgEl);
        }
    
        var variantData = elObj.sizeVariantId;
        productVars = JSON.parse(variantData[0].dataset.variants);
    
        var vsID = void 0;
        var allVariants = void 0;
    
        if (variantData) {
          allVariants = JSON.parse(variantData[0].dataset.variants);
          vsID = allVariants[0].SizeVariants[0].SizeVarId;
        }
    
        var string = elObj.info.innerHTML;
        var excerpt = string.substr(0, 235);
        excerpt = excerpt.substr(0, Math.min(excerpt.length, excerpt.lastIndexOf(' ')));
        if (ref) {
          ref.insertAdjacentHTML('beforebegin', '\n        <div data-svid="' + vsID + '" class="FL064-popup">\n   <div class="FL064-hidden"><a class="FL064-popup--link" href="' + elObj.link + '"></a></div> \n       <div class="FL064-popup--close">\n            <div>\n              <span></span>\n              <span></span>\n            </div>\n          </div>\n          <div class="FL064-popup--title">\n     ' + elObj.title.outerHTML + '\n            <p class="price">' + elObj.price.outerHTML + '</p>\n\n          </div>\n\n          <div class="FL064-img--slider">\n            <div class="FL064-prev"><span></span></div>\n            ' + slider.outerHTML + ' \n            <div class="FL064-next"><span></span></div>\n          </div>\n\n          <div class="FL064-info">\n            \n\n            <div class="FL064-options" id="productDetail">\n              ' + elObj.options.outerHTML + '\n\n              ' + elObj.atb.outerHTML + '\n            </div>\n\n     <h2>Description</h2> \n       <h3>' + elObj.code.outerHTML + '</h3>\n            <p>' + string + '</p>\n    <div class="FL064-mobPrice"> \n    <p class="price">' + elObj.price.outerHTML + '</p>\n   </div>\n    </div>\n        </div>\n      ');
        }

        // Add Zoom Icon
        const sliderWrap = document.querySelector('.FL064-img--slider');
        sliderWrap.insertAdjacentHTML('afterbegin', `
          <span class="FL064-zoomIcon zoomButton">
              <span class="glyphicon glyphicon-fullscreen"></span>
              <span id="dnn_ctr176031_ViewTemplate_ctl00_ctl01_mainImageButtonZoom">Zoom</span>
          </span>
        `);
    
        pollerLite([function () {
          var run = false;
          if (window.jQuery) {
            $$1 = window.jQuery;
            run = true;
          }
          return run;
        }], function () {
          $$1.loadScript = function (url, callback) {
            $$1.ajax({
              url: url,
              dataType: 'script',
              success: callback,
              async: true
            });
          };
          var $slider = $$1('.FL064-popup .FL064-slider');
          if ($slider) {
            $$1.loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', function () {
              $$1($slider).slick({
                dots: true,
                arrows: true,
                prevArrow: $$1('.FL064-prev'),
                nextArrow: $$1('.FL064-next')
              });
            });
          }
          var sliderWrap = document.querySelector('.FL064-popup .FL064-img--slider');
          sliderWrap.addEventListener('click', function (e) {
            if (e.target.classList.contains('FL064-prev') || e.target.classList.contains('FL064-next')) {
              events.send(settings.ID, 'Click', 'Navigated through images');
            }
          });
    
          var popupSelect = document.querySelector('.FL064-popup select.SizeDropDown');
          if (popupSelect.classList.contains('aspNetDisabled')) {
            popupSelect.classList.remove('aspNetDisabled');
          }
          if (popupSelect.getAttribute('disabled')) {
            popupSelect.removeAttribute('disabled');
          }

          var addedPopup = document.querySelector('.FL064-popup');
          if (addedPopup) {
            setTimeout(() => {
              addedPopup.classList.add('show');
            }, 200);
          }
        });
      }
    }
    
    function closePopup(event, thisPopup) {
      if (event.currentTarget) {
        var popupPoppa = thisPopup.parentElement;
        if (thisPopup && popupPoppa) {
          
          popupPoppa.removeChild(thisPopup);
          thisPopup.classList.remove('show');
        }
      }

      // addition for size guide
      const sg = document.querySelector('.FL064-oldSizeGuide');
      if (sg) {
        sg.parentNode.removeChild(sg);
      }
    }
    
    function addToBag(sizeVariantId, cb) {
      $$1.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: 'https://www.flannels.com/DesktopModules/BasketBag/API/BasketService/Add',
        data: {
          bagItems: '[{"sizeVariantId":"' + sizeVariantId + '","quantity":"1","personalisation":{},"isProductRec":false}]'
        }
      }).done(function (result) {
        cb(result);
      });
    }
    
    function getProduct() {
      var reuturnedID = void 0;
      var currentID = document.querySelector('.FL064-popup').parentElement.getAttribute('li-productid');
      for (var i = 0; productVars.length > i; i += 1) {
        if (productVars[i].ColVarId === currentID) {
          reuturnedID = productVars[i];
        }
      }
      return reuturnedID;
    }
    
    function changeSize(e) {
      if (e.target.classList.contains('greyOut')) {
        return false;
      }
      var currentSize = e.currentTarget.value;
      var productObj = getProduct();
      var newSizeId = void 0;
      for (var i = 0; productObj.SizeVariants.length > i; i += 1) {
        if (productObj.SizeVariants[i].SizeName === currentSize) {
          newSizeId = productObj.SizeVariants[i].SizeVarId;
        }
      }
      var thisPopup = document.querySelector('.FL064-Popup');
      if (thisPopup) {
        thisPopup.setAttribute('data-svid', newSizeId);
      }
      return newSizeId;
    }
    
    function changeVariation(e) {
      e.preventDefault();
      var chosenVar = e.target.value;
      var newProductObj = void 0;
      var thisPopup = document.querySelector('.FL064-popup');
      if (thisPopup) {
        thisPopup.setAttribute('data-colid', chosenVar);
      }
      if (chosenVar) {
        for (var i = 0; productVars.length > i; i += 1) {
          if (productVars[i].ColVarId === chosenVar) {
            newProductObj = productVars[i];
          }
        }
      }
      var sizeSelect = document.querySelector('.FL064-popup .swapSize select.SizeDropDown');
      if (sizeSelect) {
        sizeSelect.innerHTML = '\n      <option selected="selected" value="">Select Size</option>\n    ';
        newProductObj.SizeVariants.map(function (sizeVar) {
          sizeSelect.insertAdjacentHTML('beforeend', '\n        <option value="' + sizeVar.SizeName + '" title="' + sizeVar.SizeName + '">' + sizeVar.SizeName + '</option>\n      ');
        });
      }
    
      var noOfImgs = newProductObj.ProdImages.AlternateImages.length;
      if (noOfImgs > 0) {
        var $slider = $$1('.FL064-popup .FL064-slider');
        if ($slider) {
          $slider.slick('unslick');
        }
      }
      var imageSlider = document.querySelector('.FL064-popup .FL064-img--slider .FL064-slider');
      imageSlider.innerHTML = '';
    
      for (var _i = 0; noOfImgs > _i; _i += 1) {
        imageSlider.insertAdjacentHTML('beforeend', '\n      <div>\n        <img src="' + newProductObj.ProdImages.AlternateImages[_i].ImgUrlLarge + '" alt="' + newProductObj.APopupZoomTitle + '"/>\n      </div>\n    ');
      }
      $$1.loadScript = function (url, callback) {
        $$1.ajax({
          url: url,
          dataType: 'script',
          success: callback,
          async: false
        });
      };
      var $newSlider = $$1('.FL064-popup .FL064-slider');
      if ($newSlider) {
        $$1.loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', function () {
          $newSlider.slick({
            dots: true,
            arrows: true,
            prevArrow: $$1('.FL064-prev'),
            nextArrow: $$1('.FL064-next')
          });
        });
      }
      return newProductObj;
    }
    
    function showBag(result) {
      if (result.IsValidBasket === true) {
        var addedProduct = result.BasketProductDetails[0];
        var basket = document.querySelector('#ulBag');
        var bagItems = document.querySelector('#divBagItems');
        var bagQty = document.querySelector('#bagQuantity');
        if (basket) {
          basket.insertAdjacentHTML('afterbegin', '\n        <li id="li' + addedProduct.VariantId + '" class="liPrdLnk" data-prdurl="' + addedProduct.ProductUrl + '">\n          <img src="' + addedProduct.ProductImageUrl + '" alt="Image of Product ' + addedProduct.ProductName + '" class="Baskimg">\n          <div class="bagContentItemWrap">\n            <div class="PriceandCross">\n              <img src="/images/core/help-icn.jpg" alt="Help icon" title="Contains personalised items" style="display:none">\n              <a id="removeItem" class="removeClass" productvariantitem="' + addedProduct.VariantId + '" removequantity="Qty: 1">X</a>\n            </div>\n            <span class="BaskName">' + addedProduct.ProductName + '</span>\n            <div class="ColrandSize">\n              <span class="BaskColr">' + addedProduct.ProductColour + '</span>\n              <span class="BaskSize">' + addedProduct.ProductSize + '</span>\n            </div>\n              <span class="BaskQuant">Qty: 1</span>\n              <span class="maxText"></span>\n              <span class="BaskPrice">' + addedProduct.ProductSellingPriceText + '</span>\n            <div class="lineProblems">\n              <span class="outofstock"></span>\n            </div>\n          </div>\n        </li>\n      ');
          bagItems.classList.add('open');
          bagItems.style.display = 'block';
          if (bagQty) {
            if (bagQty.textContent && bagQty.classList.contains('empty')) {
              bagQty.classList.remove('empty');
            }
            var qtyNumber = parseInt(bagQty.textContent, 10);
            qtyNumber += 1;
            bagQty.textContent = qtyNumber;
          }
          setTimeout(function () {
            bagItems.classList.remove('open');
            bagItems.style.display = 'none';
          }, 4500);
        }
      }
    }
    
    function fadeOutEl(el) {
      if (el) {
        $$1(el).fadeOut('slow', function () {
          var parent = el.parentElement;
          if (parent) {
            parent.removeChild(el);
          }
        });
      }
    }
    
    function addFunctionality(cachedLinks) {
      if (cachedLinks.length) {
        var _loop = function _loop(i) {
          var thisLink = cachedLinks[i].href;
          cachedLinks[i].addEventListener('click', function (e) {
            if(document.querySelector('.FL064-popup')) {
              e.preventDefault();
            } else {
              events.send(settings.ID, 'Click', 'Quickview link was clicked');
              e.preventDefault();
              fetchProductDetails(thisLink, function (obj) {
                var productVariations = JSON.parse(obj.variants[0].dataset.variants);
      
                popup(obj, cachedLinks[i]);
                events.send(settings.ID, 'Active', 'Quickview popup has been shown');
      
                var thisPopup = document.querySelector('.FL064-popup');
  
                // Change title links to actual product
                const titleLink = document.querySelector('.FL064-popup .brandTitle a');
                if (titleLink) {
                  titleLink.setAttribute('href', thisLink);
                }
      
                document.body.classList.add('FL064-noscroll');
      
                var close = document.querySelector('.FL064-popup .FL064-popup--close');
                if (close) {
                  close.addEventListener('click', function (e) {
                    closePopup(e, thisPopup);
                    document.body.classList.remove('FL064-noscroll');
                    events.send(settings.ID, 'Click', 'Closed quick view popup');
                  });
                }
      
                var bodyWrap = document.body;
                if (bodyWrap && thisPopup) {
                  bodyWrap.addEventListener('click', function (e) {
                    if (event.target.closest('.FL064-popup')) return;
                    var isClickInside = thisPopup.contains(e.target);
                    if (thisPopup) {
                      if (!isClickInside) {
                        thisPopup.classList.remove('show');
                        document.body.classList.remove('FL064-noscroll');
                        setTimeout(() => {
                          var poppa = thisPopup.parentElement;
                          if (poppa) {
                            poppa.removeChild(thisPopup);
                          }
                        }, 1000);
                      }
                    }
                  });
                }
  
                var moreInfoLink = document.querySelector('.FL064 .FL064-popup .FL064-popup--link');
                if (moreInfoLink) {
                  moreInfoLink.addEventListener('click', function () {
                    events.send(settings.ID, 'Click', 'View full details link');
                  });
                }
      
                var atbCta = document.querySelector('.FL064-popup .ImgButWrap a');
                if (atbCta) {
  
                  // If Var 2, change to 'View Product'
                  if (varTwo) {
                    atbCta.textContent = 'View Product';
                    atbCta.setAttribute('href', moreInfoLink.getAttribute('href'));
                  }
  
                  atbCta.addEventListener('click', function (atbEvent) {
                    events.send(settings.ID, 'Click', 'Add to bag');
                    var sizeSelect = document.querySelector('.FL064-popup #productVariantAndPrice select.SizeDropDown');
                    var chosenSize = sizeSelect.options[sizeSelect.selectedIndex].value;
      
                    if (!chosenSize) {
                      showErrorMessage('Please select a size', atbCta);
                      var errorMessage = thisPopup.querySelector('.FL064-error');
                      if (errorMessage) {
                        setTimeout(function () {
                          fadeOutEl(errorMessage);
                        }, 3000);
                      }
                      return;
                    }
      
                    var colSelect = document.querySelector('.FL064-popup #divColour select');
                    var chosenCol = colSelect.options[colSelect.selectedIndex].value;
                    var chosenColourVariation = productVariations.filter(function (colVar) {
                      return colVar.ColVarId === chosenCol;
                    });
      
                    var chosenProductId = chosenColourVariation[0].SizeVariants.filter(function (sizeVar) {
                      return sizeVar.SizeName === chosenSize;
                    });
      
                    var thisChosenProductId = chosenProductId[0].SizeVarId;
                    addToBag(thisChosenProductId, function (result) {
                      showBag(result);
                      showSuccessMessage('Product added to bag.', bodyWrap);
                      var successMessage = document.querySelector('.FL064-success');
                      if (successMessage) {
                        document.body.classList.remove('FL064-noscroll');
                        setTimeout(function () {
                          fadeOutEl(successMessage);
                        }, 3000);
                      }
                    });
      
                    closePopup(atbEvent, thisPopup);
      
                    // document.body.classList.remove('FL064-noscroll');
                  });
                }
      
                var changeSizeSelect = document.querySelector('#productVariantAndPrice select.SizeDropDown');
                if (changeSizeSelect) {
                  var noSizeOptions = changeSizeSelect.querySelectorAll('option.greyOut');
                  if (noSizeOptions.length) {
                    for (var j = 0; noSizeOptions.length > j; j += 1) {
                      noSizeOptions[j].parentElement.removeChild(noSizeOptions[j]);
                    }
                  }
                  changeSizeSelect.addEventListener('change', function (event) {
                    changeSize(event);
                    events.send(settings.ID, 'Clicked', 'Size selection');
                  });
                }
      
                var changeVariationSelect = document.querySelector('#divColour > select');
                if (changeVariationSelect) {
                  changeVariationSelect.addEventListener('change', function (ee) {
                    ee.preventDefault();
                    changeVariation(ee);
                    events.send(settings.ID, 'Click', 'Colour selection');
                  });
                }
  
  
      
              });
            }
          });
        };
    
        for (var i = 0; cachedLinks.length > i; i += 1) {
          _loop(i);
        }
      }
    }
    
    
    var CacheDom = function () {
      function CacheDom() {
        _classCallCheck(this, CacheDom);
    
        this.cache = {};
      }
    
    
    
      _createClass(CacheDom, [{
        key: 'clearCache',
        value: function clearCache() {
          this.cache = {};
        }
    
    
      }, {
        key: 'get',
        value: function get(selector) {
          var bypassCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    
          return this.query(selector, bypassCache, 'querySelector');
        }
    
    
      }, {
        key: 'getAll',
        value: function getAll(selector) {
          var bypassCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    
          return this.query(selector, bypassCache, 'querySelectorAll');
        }
    
    
      }, {
        key: 'query',
        value: function query(selector, bypassCache, type) {
          var result = null;
    
          if (bypassCache) {
            result = document[type](selector);
          } else {
            var cachedResult = this.cache[selector];
            if (cachedResult) {
              result = cachedResult;
            } else {
              result = document[type](selector);
              if (result) {
                this.cache[selector] = result;
              }
            }
          }
    
          return result;
        }
      }]);
    
      return CacheDom;
    }();
    
    
    
    var cacheDom = new CacheDom(); 
    
    events.analyticsReference = '_gaUAT';
    
    var activate = function activate() {
      setup();
      if (settings.VARIATION === '2') {
        return false;
      }
    
      if (settings.VARIATION === '3') {
        document.body.classList.add('FL064-v3');
      }

    
      var products = cacheDom.getAll('#productlistcontainer ul.s-productscontainer2 li');
    
      addQuickView(products);
    
      var quickViewLinks = cacheDom.getAll('.FL064-quickview a');
      addFunctionality(quickViewLinks);
    
      var productContainer = document.querySelector('#productlistcontainer ul#navlist');
      observer.connect(productContainer, function () {
        products = document.querySelectorAll('#productlistcontainer ul.s-productscontainer2 li');
        addQuickView(products);
        quickViewLinks = document.querySelectorAll('.FL064-quickview a');
        addFunctionality(quickViewLinks);
      });
    };
    
    pollerLite(['body', '#productlistcontainer ul.s-productscontainer2 li', '.flanProdList'], activate);
    })();
}