export const runFL090 = (VAR) => { // Copied from FL110
  
    (function() {
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
        
        var events = {
          trackerName: false,
          propertyId: false,
          analyticsReference: 'ga',
          eventCache: [],
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
        
          send: function send(evCategory, evAction, evLabel, userOptions) {
            var options = userOptions || {};
            var category = evCategory || this.category;
            var action = evAction;
            var label = evLabel;
        
            if (_typeof(options) === 'object' && options.sendOnce) {
              var eventID = "".concat(category).concat(action).concat(label); 
        
              if (this.eventCache.indexOf(eventID) > -1) {
                return false;
              } else {
                this.eventCache.push(eventID);
              }
            }
        
            var self = this;
        
            var fire = function fire(tracker) {
              if (self.analyticsReference === '_gaq') {
                window._gaq.push(['_trackEvent', category, action, label, null, typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true]);
              } else {
                window[self.analyticsReference]("".concat(tracker, ".send"), 'event', category, action, label, {
                  nonInteraction: options.nonInteraction ? options.nonInteraction : true
                });
              }
            };
        
            if (self.trackerName) {
              fire(self.trackerName);
            } else {
              pollerLite([function () {
                try {
                  var trackers = window[self.analyticsReference].getAll();
        
                  if (trackers && trackers.length) {
                    if (self.propertyId) {
                      for (var i = 0; i < trackers.length; i += 1) {
                        var tracker = trackers[i];
        
                        if (tracker.get('trackingId') === self.propertyId) {
                          self.trackerName = tracker.get('name');
                          return true;
                        }
                      }
                    } else {
                      self.trackerName = trackers[0].get('name');
                      return true;
                    }
                  }
                } catch (err) {}
              }], function () {
                fire(self.trackerName);
              }, {
                wait: 150
              });
            }
          }
        };
        
        var settings = {
          ID: 'FL090',
          VARIATION: '1'
        };
        
        
        var setup = function setup() {
          var ID = 'FL109',
              VARIATION = settings.VARIATION;
        
          fullStory(ID, "Variation ".concat(VARIATION));
        
          document.body.classList.add(ID);
        };
        
        var config = function config() {
          return [
          {
              "Gucci": {
                  "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/gucci-2.png",
                  "url": "https://www.flannels.com/gucci"
              }
          }, {
              "Valentino": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/valentino-1.png",
                "url": "https://www.flannels.com/Valentino"
              }
          }, {
              "Alexander McQueen": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/alexander-mcqueen-1.png",
                "url": "https://www.flannels.com/alexander-mcqueen"
              }
          }, {
              "Balenciaga": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/balenciaga.png",
                "url": "https://www.flannels.com/balenciaga"
              }
          }, {
              "Burberry": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/burberry-1.png",
                "url": "https://www.flannels.com/burberry"
              }
          }, {
              "Moncler": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/moncler-1.png",
                "url": "https://www.flannels.com/moncler"
              }
          }, {
              "Stone Island": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/stone-island-1.png",
                "url": "https://www.flannels.com/stone-island"
              }
          }, {
              "CP Company": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/cp-company-2.png",
                "url": "https://www.flannels.com/cp-company"
              }
          }, {
              "DSquared2": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/dsquared2-1.png",
                "url": "https://www.flannels.com/DSquared2"
              }
          },  {
              "Off White": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/off-white.png",
                "url": "https://www.flannels.com/off-white"
              }
          },  {
              "Kenzo": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/kenzo.png",
                "url": "https://www.flannels.com/kenzo"
              }
          }, {
              "Palm Angels": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/palm-angels.png",
                "url": "https://www.flannels.com/palm-angels"
              }
          }, {
              "Dolce and Gabbana": {
                "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/dolce.png",
                "url": "https://www.flannels.com/dolce-and-gabbana"
              }
          }, {
            "Balmain": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/balmain-1.png",
              "url": "https://www.flannels.com/Balmain"
            }
          }, {
            "Versace": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/versace-1.png",
              "url": "https://www.flannels.com/versace"
            }
          }, {
            "Jimmy Choo": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/jimmy-choo-1.png",
              "url": "https://www.flannels.com/jimmy-choo"
            }
          }, {
            "Saint Laurent": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/saint_laurent.png",
              "url": "https://www.flannels.com/saint-laurent"
            }
          }, {
            "Prada": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/prada.png",
              "url": "https://www.flannels.com/prada"
            }
          }, {
            "Tom Ford": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/tom-ford.png",
              "url": "https://www.flannels.com/tom-ford"
            }
          }, {
            "Comme des Garcons PLAY": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/comme.png",
              "url": "https://www.flannels.com/comme-des-garcons-play"
            }
          }, {
            "Givenchy": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/givenchy.png",
              "url": "https://www.flannels.com/givenchy"
            }
          }, {
            "Loewe": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/loewe.png",
              "url": "https://www.flannels.com/loewe"
            }
          }, {
            "49Winters": {
              "image": "",
              "url": "https://www.flannels.com/49Winters"
            }
          }, {
            "3 Moncler Grenoble": {
              "image": "",
              "url": "https://www.flannels.com/3-moncler-grenoble"
            }
          }, {
            "Agent Provocateur": {
              "image": "",
              "url": "https://www.flannels.com/agent-provocateur"
            }
          }, {
            "4 Moncler Simone Rocha": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Alanui": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Alexander Wang": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/alexander-wang-1.png",
              "url": "https://www.flannels.com/alexander-wang"
            }
          }, {
            "Alexander Vauthier": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Amouage": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "APC": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Axel Arigatto": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "1017 Alyx 9sm": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/alyx-1.png",
              "url": "https://www.flannels.com/1017-Alyx-9SM"
            }
          }, {
            "Aquazzura": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Boglioli": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Bottega Veneta": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Brioni": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Buscemi": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Canada Goose": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Canali": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Caruso": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Celine": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Chloe": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Christian Louboutin": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Churchs": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Comme des Garcons PLAY": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Dior": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Dior Homme": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Etro": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Ermenegildo Zegna": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Fendi": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Ganni": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/ganni-1.png",
              "url": "https://www.flannels.com/ganni"
            }
          }, {
            "Greg Lauren": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/greg-lauren-1.png",
              "url": "https://www.flannels.com/greg-lauren"
            }
          }, {
            "Gianvito Rossi": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Giuseppe Zanotti": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "GIVENCHY": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Golden Goose Deluxe Brand": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Helmut Lang": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Hermes": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Heron Preston": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Isabel Marant Etoile": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "JW Anderson": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Marni": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/marni-1.png",
              "url": "https://www.flannels.com/marni"
            }
          }, {
            "Mcm": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/mcm-1.png",
              "url": "https://www.flannels.com/mcm"
            }
          }, {
            "Lanvin": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }, {
            "Marcelo Burlon": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/marcelo-burlon-1.png",
              "url": "https://www.flannels.com/marcelo-burlon"
            }
          }, {
            "Rick Owens": {
              "image": "https://ucds.ams3.digitaloceanspaces.com/FL090/compressed/rick_owens_drkshdw-1.png",
              "url": "https://www.flannels.com/rick-owens-drkshdw"
            }
          }, {
            "Mackage": {
              "image": "",
              "url": "https://www.flannels.com/moncler"
            }
          }];
        };
        
        events.analyticsReference = '_gaUAT';
        var activate = (function () {
          setup();
          var ID = 'FL109';
        
          {
            // events.send(ID, 'FL090 Variation 1', 'FL090 Variation 1 is active');
          } 
        
        
          var configArr = config();
          let newConfigArr = [];


          console.log('configArr ', configArr);

          // If V1 Check BrandStorage and order from that
          
        //   if (VAR == 1) { // From FL110

        //     const { brandStorage } = window.localStorage;
        //     if (brandStorage) {

        //       let sortingArr = JSON.parse(brandStorage).brand;
              
        //       configArr.map((confItem, index) => {
        //         const confBrand = Object.keys(confItem)[0];

        //         sortingArr.forEach((el) => {

        //           if (confBrand.toLowerCase() == el.toLowerCase()) {
        //             newConfigArr.unshift(confItem);
        //           }
        //         });

                
        //         newConfigArr.push(confItem);
        //       })
        //     }
        //   }

          
          // Remove any dupes
          // newConfigArr = [...new Set(newConfigArr)];
          
          

          var hasImages = configArr.filter(function (obj) {
            var key = Object.keys(obj);
            
            if (obj[key].image) {
              return obj;
            }
          });

          

          if (hasImages.length == 0) return;
          var size = 'mobile';
        
          if (window.innerWidth > 1021) {
            size = 'desktop';
          }
        
          var ref = document.querySelector('.sdHero.SuperHome');
        
          var buildBanner = function buildBanner() {
            if (!ref) return;
            ref.insertAdjacentHTML(size == 'desktop' ? 'beforeend' : 'afterbegin', "\n      <div class=\"".concat(ID, "-brandsList\">\n        <h1>Shop By Brand</h1>\n        <ul>\n          ").concat(hasImages.map(function (obj) {
              var name = Object.keys(obj)[0];
              return "\n              <li>\n                <div class=\"".concat(ID, "-image\">\n                  <a href=\"").concat(obj[name].url, "\">\n                    <img src=\"").concat(obj[name].image, "\" alt=\"").concat(name, "\"/>\n                  </a>\n                </div>  \n                <div class=\"").concat(ID, "-name\">\n                  <p><a href=\"").concat(obj[name].url, "\">").concat(name, "</a></p>\n                </div>\n              </li>\n            ");
            }).join(' '), "\n          <li>\n            <div class=\"").concat(ID, "-more\">\n              <p><a href=\"https://www.flannels.com/designers\">View All Brands</a></p>\n            </div>\n          </li>\n        </ul>\n      </div>\n    "));
          };

          
        
          buildBanner(); 
        
          var links = document.querySelectorAll(".".concat(ID, "-brandsList li a"));

          const fetchCats = (link, brandName) => {
            
            return fetch(link).then((res) => {
              return res.text();
              
            }).then((data) => {
              let tempDiv = document.createElement('div');
              tempDiv.innerHTML = data;
              
              const brandCats = tempDiv.querySelectorAll('.FilterListItem.CATG');
              
              const sortedBrandCats = Array.from(brandCats).sort((a, b) => {
                const aCount = parseInt(a.querySelector('a .FilterValue').textContent, 10);
                const bCount = parseInt(b.querySelector('a .FilterValue').textContent, 10);

                if (aCount && bCount) {
                  return bCount - aCount;
                }
              });
              
              console.log('sorted brands = ', sortedBrandCats);
              return brandCats;

            }).catch(err => console.error(err));
          }
          
          if (links.length) {
            for (var i = 0; links.length > i; i += 1) {
              links[i].addEventListener('click', (e) => {
                const { currentTarget } = e;
                const parentEl = currentTarget.parentElement;
                const thisImg = currentTarget.querySelector('img');
                let brandName = '';
                if (thisImg) {
                  brandName = thisImg.getAttribute('alt');
                }

                // Remove added cats if any
                const prevCats = document.querySelector('.FL109-brandsList .FL109-catWrap');
                if (prevCats) {
                  const prevCatsTitle = prevCats.querySelector('h2');
                  prevCats.parentNode.removeChild(prevCats);
                  if (prevCatsTitle && prevCatsTitle.textContent === brandName) {
                    return false; // E.g. Remove and don't open the same one
                  }
                }

                if (VAR == 1) {
                    e.preventDefault();
                    const link = currentTarget.getAttribute('href');
                    fetchCats(link).then((theseCats) => {
                      
                      if (theseCats) {
                        const mappedCats = Array.from(theseCats);
                        
                        if (theseCats && parentEl) {
                          parentEl.insertAdjacentHTML('afterend', `<div class="FL109-catWrap">
                          ${brandName ? `<h2>${brandName}</h2>` : ''}
                          ${mappedCats.map((cat, key) => {
                              const thisLink = cat.querySelector('a.FilterAnchor');
                              thisLink ? thisLink.removeAttribute('onClick') : null;
                              return cat.outerHTML
                            }).join(' ')
                          }<a class="FL-link" href="${link}">View All</a></div>`);

                          // Add click events
                          const newLinks = document.querySelectorAll('.FL109-brandsList .FilterListItem.CATG');
                          if (newLinks) {
                            for (let i = 0; newLinks.length > i; i += 1) {
                              newLinks[i].addEventListener('click', (e) => {
                                e.preventDefault();
                                const { currentTarget } = e;
                                const catName = currentTarget.getAttribute('data-productname');
                                const brandImage = currentTarget.closest('li');
                                const brandLink = brandImage.querySelector('.FL109-image a');
                                
                                if (brandLink && catName) {
                                  events.send(ID, "".concat(ID, " Click"), "".concat(ID, " CLicked on category label ", catName));
                                  window.location.href = `${brandLink.getAttribute('href')}#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5E${encodeURIComponent(catName)}`;
                                }
                                
                              });
                            }
                          }
                        }
                      }
                    }).catch((err => {
                      events.send('FL109', 'FL109 Error', 'FL109 Couldn\'t fetch categories');
                      console.error(err);
                    }));
                }
                
                events.send(ID, "".concat(ID, " Click"), "".concat(ID, " CLicked on brand ", brandName));
              });
            }
          }
        });
        
        pollerLite(['body'], activate);
        
        })();
}