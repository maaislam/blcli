/* sg_no_proxy */
/* no_doc_ready */
(function () {
  'use strict';

  function _typeof(obj) {
    '@babel/helpers - typeof';

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var commonjsGlobal =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {};

  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;

  var freeSelf =
    (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;

  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;

  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  var getNow =
    Date.now ||
    function getNow() {
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
      timeout: 0,
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
        function: function _function() {
          return condition();
        },
        string: function string() {
          return document.querySelector(condition);
        },
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
        setTimeout(
          function () {
            pollForCondition(condition, waitTime * multiplier);
          },
          skipWait ? 0 : waitTime
        );
      }
    };

    for (var i = 0; i < conditions.length; i += 1) {
      if (typeof conditions[i] != 'string' && typeof conditions[i] != 'function') {
        throw 'Every item in the poller array should be a function or a string';
      }

      pollForCondition(conditions[i], wait, true);
    }
  };

  var events = {
    trackerName: false,
    propertyId: false,
    analyticsReference: 'ga',
    eventCache: [],
    sendEvents: true,
    setDefaultCategory: function setDefaultCategory(category) {
      this.category = category;
      return this;
    },
    setDefaultAction: function setDefaultAction(action) {
      this.action = action;
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

    sendAuto: function sendAuto(evVariation, evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions, evVariation);
    },
    sendNormalised: function sendNormalised(evLabel, userOptions) {
      this.send(null, null, evLabel, userOptions);
    },

    send: function send(evCategory, evAction, evLabel, userOptions) {
      var _this2 = this;

      var evVariation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var options = userOptions || {};
      var label = evLabel;
      var category = evCategory || this.category;
      var action = evAction || this.action;
      var variation = evVariation;

      if (variation != null) {
        if (variation == 0) {
          variation = 'Control';
        }

        label = 'Variation: ' + variation + ' - ' + evLabel;
      }

      if (_typeof(options) === 'object' && options.sendOnce) {
        var eventID = ''.concat(category).concat(action).concat(label);

        if (this.eventCache.indexOf(eventID) > -1) {
          return false;
        } else {
          this.eventCache.push(eventID);
        }
      }

      var self = this;

      var fire = function fire(tracker) {
        if (self.analyticsReference === '_gaq') {
          window._gaq.push([
            '_trackEvent',
            category,
            action,
            label,
            null,
            typeof options.nonInteraction !== 'undefined' ? options.nonInteraction : true,
          ]);
        } else {
          window[self.analyticsReference](''.concat(tracker, '.send'), 'event', category, action, label, {
            nonInteraction: options.nonInteraction ? options.nonInteraction : true,
          });
        }
      };

      if (self.trackerName) {
        if (this.sendEvents == true) {
          fire(self.trackerName);
        }
      } else {
        pollerLite(
          [
            function () {
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
            },
          ],
          function () {
            if (_this2.sendEvents == true) {
              fire(self.trackerName);
            }
          },
          {
            wait: 150,
          }
        );
      }
    },
  };

  var shared = {
    ID: 'HH067',
    VARIATION: '1',
    CLIENT: 'HelpingHands',
    LIVECODE: '',
  };

  var setup = function setup() {
    var ID = shared.ID,
      VARIATION = shared.VARIATION,
      CLIENT = shared.CLIENT;

    events.setDefaultCategory('Experimentation');
    events.setDefaultAction(CLIENT + ' - ' + ID);

    {
      events.sendEvents = true;
    }

    document.documentElement.classList.add(ID);
    document.documentElement.classList.add(''.concat(ID, '-').concat(VARIATION));
  };
  var fireEvent = function fireEvent(label) {
    var VARIATION = shared.VARIATION;
    events.sendAuto(VARIATION, label);
  };

  var fallbackLinks = [
    {
      label: 'Home Care in branch_name',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/',
    },
    {
      label: 'Dementia Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/dementia-care/',
    },
    {
      label: 'Domiciliary Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/domiciliary-care/',
    },
    {
      label: 'Elderly Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/elderly-care/',
    },
    {
      label: 'Respite Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/respite-care/',
    },
  ];
  var activate = function () {
    setup();
    var ID = shared.ID;

    var isBranchPage = function isBranchPage() {
      return window.location.pathname.indexOf('/our-locations/') !== -1 && document.body.classList.contains('single');
    };

    var isOutOfHours = function isOutOfHours() {
      return !!document.querySelector('.inactive-care');
    };

    var updateBranchData = function updateBranchData() {
      var branchUrl = window.location.pathname;
      var phone = document.querySelector('.branch-call-num .InfinityNumber');

      if (!phone) {
        phone = document.querySelector('.branch-details .InfinityNumber');
      }

      if (phone) phone = phone.textContent.trim();
      else {
        phone = '0333 060 5358';
      }

      var reviewsData = null;
      var branchPanel = document.querySelector('.reviews-box');

      if (branchPanel) {
        var starsList = branchPanel.querySelector('.branch-star-list');
        var branchReviews = branchPanel.querySelector('.branch-review-average');
        var viewAll = branchPanel.querySelector('.viewall');
        reviewsData = {
          stars: starsList ? starsList.outerHTML : null,
          rating: branchReviews ? branchReviews.childNodes[0].nodeValue.trim().replace('stars,', '') : null,
          total: branchReviews ? branchReviews.childNodes[1].textContent.trim() : null,
          reviewsUrl: viewAll ? viewAll.href : null,
        };
      }

      var additional = document.querySelector('.branch-subpage-care');
      var additionalList = additional ? additional.querySelectorAll('.row a') : false;
      var additionalLinks = fallbackLinks;

      var branchTitle = document.querySelector('h1');
      if (branchTitle) branchTitle = branchTitle.textContent;

      if (additional && additionalList && additionalList.length > 4) {
        additionalLinks = [];
        additionalList.forEach(function (anchor) {
          additionalLinks.push({
            label: anchor.textContent.trim(),
            url: anchor.href,
          });
        });
      } else if (branchTitle) {
        var newLabel = additionalLinks[0].label.replace('branch_name', branchTitle);
        additionalLinks[0].label = newLabel;
      }

      localStorage.setItem(
        ''.concat(ID, '_branch'),
        JSON.stringify({
          branchUrl: branchUrl,
          phone: phone,
          branchTitle: branchTitle,
          reviewsData: reviewsData,
          additionalLinks: additionalLinks,
        })
      );
    };
    n;

    var getBranchData = function getBranchData() {
      return localStorage.getItem(''.concat(ID, '_branch'));
    };

    var makeInfinityNumber = function makeInfinityNumber() {
      var infinityTrackingAdded = false;
      var infinityCheckInterval = setInterval(function () {
        if (window._ictt && !infinityTrackingAdded) {
          window._ictt.push(['_setAutoDiscoveryClasses', ['InfinityNumber']]);

          window._ictt.push(['_allocate']);

          infinityTrackingAdded = true;
          clearInterval(infinityCheckInterval);
        }
      }, 1000);
    };

    var makePanelMarkup = function makePanelMarkup(data) {
      if (data.reviewsData) {
        return '\n        <div class="'
          .concat(
            ID,
            '_location">\n          <p>\n            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path d="M19.2903 9.48905C19.2903 14.7297 9.64516 26 9.64516 26C9.64516 26 0 14.7297 0 9.48905C0 4.24839 4.31829 0 9.64516 0C14.972 0 19.2903 4.24839 19.2903 9.48905Z" fill="white"/>\n              <circle cx="9.64504" cy="8.80645" r="3.77419" fill="#3C185B"/>\n            </svg>\n            Your local branch is <a class="'
          )
          .concat(ID, '_track-branch-link" href="')
          .concat(data.branchUrl, '"><strong>')
          .concat(data.branchTitle, '</strong></a> <a class="')
          .concat(ID, '_underline ')
          .concat(ID, '_track-change" href="/our-locations/">(change)</a>\n          </p>\n        </div>\n        <div class="')
          .concat(ID, '_flex">\n          <div class="')
          .concat(ID, '_flex ')
          .concat(ID, '_wrap ')
          .concat(ID, '_center">\n            ')
          .concat(data.reviewsData.stars, '\n            <p class="')
          .concat(ID, '_rating"><strong>')
          .concat(data.reviewsData.rating, '</strong></p>\n            <a class="')
          .concat(ID, '_underline ')
          .concat(ID, '_track-total" href="')
          .concat(data.reviewsData.reviewsUrl, '">')
          .concat(
            data.reviewsData.total,
            '</a>\n          </div>\n          <div class="cta-button">\n            <span class="cta-button-icon">\n              <i class="fa fa-phone"></i>\n            </span>\n            <a class="InfinityNumber" href="tel:'
          )
          .concat(data.phone, '">')
          .concat(
            data.phone,
            '</a>\n          </div>\n          <i class="fa fa-info cta-button-info">\n            <div class="cta-button-tooltip">\n              Open Mon \u2013 Fri: 8am\u20137pm <br>\n              Sat &amp; Sun: 9am\u20136pm\n            </div>\n          </i>\n        </div>\n      '
          );
      }

      return '\n      <div class="'
        .concat(ID, '_flex">\n        <div class="')
        .concat(ID, '_location ')
        .concat(ID, '_marginRight">\n          <div class="')
        .concat(
          ID,
          '_flex">\n            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path d="M19.2903 9.48905C19.2903 14.7297 9.64516 26 9.64516 26C9.64516 26 0 14.7297 0 9.48905C0 4.24839 4.31829 0 9.64516 0C14.972 0 19.2903 4.24839 19.2903 9.48905Z" fill="white"/>\n              <circle cx="9.64504" cy="8.80645" r="3.77419" fill="#3C185B"/>\n            </svg>\n            <div>\n              <p>\n                Your local branch is\n              </p>\n              <a class="'
        )
        .concat(ID, '_track-branch-link" href="')
        .concat(data.branchUrl, '"><strong>')
        .concat(data.branchTitle, '</strong></a> <a class="')
        .concat(ID, '_underline ')
        .concat(
          ID,
          '_track-change" href="/our-locations/">(change)</a>\n            </div>\n          </div>\n        </div>\n        <div class="cta-button">\n          <span class="cta-button-icon">\n            <i class="fa fa-phone"></i>\n          </span>\n          <a class="InfinityNumber" href="tel:'
        )
        .concat(data.phone, '">')
        .concat(
          data.phone,
          '</a>\n        </div>\n        <i class="fa fa-info cta-button-info">\n          <div class="cta-button-tooltip">\n            Open Mon \u2013 Fri: 8am\u20137pm <br>\n            Sat &amp; Sun: 9am\u20136pm\n          </div>\n        </i>\n      </div>\n    '
        );
    };
    var addMenuDropdown = function addMenuDropdown(data) {
      var menu = document.getElementById('menu-main-nav-1');
      menu &&
        menu.insertAdjacentHTML(
          'afterbegin',
          '\n        <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children dropdown '
            .concat(ID, '_menu-item"><a title="Your branch" href="')
            .concat(
              data.additionalLinks[0].url,
              '" class="dropdown-toggle" aria-haspopup="true">Your branch <span class="caret"></span></a>\n          <ul role="menu" class=" dropdown-menu">\n            <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page">\n              <a class="'
            )
            .concat(ID, '_track-branch-nav" title="Visit ')
            .concat(data.branchTitle, ' branch page" href="')
            .concat(data.branchUrl, '">Visit <strong>')
            .concat(data.branchTitle, '</strong> branch page</a>\n            </li>\n            ')
            .concat(
              data.additionalLinks
                .map(function (link) {
                  return '\n                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page">\n                  <a class="'
                    .concat(ID, '_track-additional" title="')
                    .concat(link.label, '" href="')
                    .concat(link.url, '">')
                    .concat(link.label, '</a>\n                </li>\n              ');
                })
                .join(''),
              '\n          </ul>\n        </li>\n      '
            )
        );
    };
    var updateDefaultNumber = function updateDefaultNumber(phone) {
      if (!phone) return;

      var defaultCta = document.querySelector('.menu-item-care .InfinityNumber');

      if (defaultCta) {
        defaultCta.insertAdjacentHTML(
          'afterend',
          '\n          <a class="InfinityNumber" href="tel:'.concat(phone, '">').concat(phone, '</a>\n        ')
        );
        defaultCta.remove();
      }
    };
    var addMobileBranchSlideout = function addMobileBranchSlideout(data) {
      var slideout = document.createElement('div');
      document.body.insertAdjacentElement('beforeend', slideout);
      slideout.classList.add(''.concat(ID, '_slideout'));
      slideout &&
        slideout.insertAdjacentHTML(
          'afterbegin',
          '\n      <div class="'
            .concat(ID, '_slideout-overlay"></div>\n      <div class="')
            .concat(ID, '_slideout-content">\n        <div class="')
            .concat(
              ID,
              '_slideout-close">\n          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M1 1L5.66071 5.5M10.3214 10L5.66071 5.5M5.66071 5.5L10.3214 1L1 10" stroke="white"/>\n          </svg>\n        </div>\n        <div class="'
            )
            .concat(ID, '_slideout-top">\n          <p>Your local branch is <a class="')
            .concat(ID, '_slideout-branch" href="')
            .concat(data.branchUrl, '">\n          <strong>')
            .concat(data.branchTitle, '</strong>\n          </a> <a class="')
            .concat(ID, '_underline ')
            .concat(ID, '_track-change" href="/our-locations/">(change)</a></p>\n          ')
            .concat(
              data.reviewsData
                ? '\n                <div class="'
                    .concat(ID, '_flex ')
                    .concat(ID, '_center">\n                  ')
                    .concat(data.reviewsData.stars, '\n                  <p class="')
                    .concat(ID, '_rating"><strong>')
                    .concat(data.reviewsData.rating, '</strong></p>\n                  <a class="')
                    .concat(ID, '_underline ')
                    .concat(ID, '_track-total" href="')
                    .concat(data.reviewsData.reviewsUrl, '">')
                    .concat(data.reviewsData.total, '</a>\n                </div>\n                ')
                : '',
              '\n          '
            )
            .concat(
              isOutOfHours()
                ? '\n              <div class="'.concat(
                    ID,
                    '_slideout-outofhours">\n                <img src="https://cdn-sitegainer.com/1kt8zdrpqymsmob.png" />\n                <p>Our phone lines are currently closed but if you request a callback, we will get back to you.</p>\n              </div>\n              <div class="cta-button">\n                <a class="InfinityNumber" href="/about-us/contact-us/request-a-callback/">\n                  Request a callback\n                </a>\n              </div>\n              '
                  )
                : '\n              <div class="cta-button">\n                <span class="cta-button-icon">\n                  <i class="fa fa-phone"></i>\n                </span>\n                <a class="InfinityNumber" href="tel:'
                    .concat(data.phone, '">')
                    .concat(data.phone, '</a>\n              </div>\n            '),
              '\n          <a class="'
            )
            .concat(ID, '_slideout-btn-white ')
            .concat(ID, '_track-mobile-branch-cta" href="')
            .concat(data.branchUrl, '">\n            View branch page\n          </a>\n        </div>\n        <div class="')
            .concat(ID, '_slideout-bottom">\n          <p>Looking for more specific information?</p>\n          <div class="')
            .concat(ID, '_slideout-links">\n            ')
            .concat(
              data.additionalLinks
                .map(function (link) {
                  return '\n                  <a class="'
                    .concat(ID, '_track-additional" title="')
                    .concat(link.label, '" href="')
                    .concat(link.url, '">\n                    <span>')
                    .concat(
                      link.label,
                      '</span>\n                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n                      <path d="M1 1L5.16667 5.81481L1 11" stroke="#3C185B" stroke-width="2"/>\n                    </svg>\n                  </a>\n              '
                    );
                })
                .join(''),
              '\n          </div>\n        </div>\n      </div>\n    '
            )
        );
      var menuItem = document.querySelector('.find-local a');
      if (menuItem) {
        menuItem.removeAttribute('href');
        menuItem.addEventListener('click', function (e) {
          e.preventDefault();
          slideout.classList.add(''.concat(ID, '_slideout-open'));
          document.body.classList.add(''.concat(ID, '_noscroll'));
          fireEvent('Open - side panel mobile');
          return false;
        });
      }
      var closeBtn = document.querySelector('.'.concat(ID, '_slideout-close'));
      var overlay = slideout.querySelector('.'.concat(ID, '_slideout-overlay'));
      var closeSlideout = function closeSlideout() {
        slideout.classList.remove(''.concat(ID, '_slideout-open'));
        document.body.classList.remove(''.concat(ID, '_noscroll'));
        fireEvent('Close - side panel mobile');
      };
      if (closeBtn) {
        closeBtn.addEventListener('click', closeSlideout);
      }
      if (overlay) {
        overlay.addEventListener('click', closeSlideout);
      }
    };
    var addTracking = function addTracking() {
      var trackChange = document.querySelector(''.concat(ID, '_track-change'));
      if (trackChange) {
        trackChange.addEventListener('click', function () {
          fireEvent('Click - change branch');
        });
      }
      var trackTotal = document.querySelector(''.concat(ID, '_track-total'));
      if (trackTotal) {
        trackTotal.addEventListener('click', function () {
          fireEvent('Click - reviews page');
        });
      }
      var trackBranchCta = document.querySelector(''.concat(ID, '_track-mobile-branch-cta'));
      if (trackBranchCta) {
        trackBranchCta.addEventListener('click', function () {
          fireEvent('Click - branch page mobile cta');
        });
      }
      var trackBranchLink = document.querySelector(''.concat(ID, '_track-branch-link'));
      if (trackBranchLink) {
        trackBranchLink.addEventListener('click', function () {
          fireEvent('Click - branch page desktop link');
        });
      }
      var trackBranchNav = document.querySelector(''.concat(ID, '_track-branch-nav'));
      if (trackBranchNav) {
        trackBranchNav.addEventListener('click', function () {
          fireEvent('Click - branch page nav link');
        });
      }
      var trackAdditional = document.querySelector(''.concat(ID, '_track-additional'));
      if (trackAdditional) {
        trackAdditional.addEventListener('click', function () {
          fireEvent('Click - additional subpage');
        });
      }
    };
    var updateHeader = function updateHeader() {
      var data = getBranchData();
      if (!data) return;
      data = JSON.parse(data);
      if (document.querySelector('.'.concat(ID, '_wrapper'))) return;
      var menu = document.querySelector('.menu-top');
      var menuNumber = menu.querySelector('.menu-item-care');
      document.body.classList.add(''.concat(ID, '-active'));
      var wrapper = document.createElement('div');
      wrapper.classList.add(''.concat(ID, '_wrapper'));
      if (isOutOfHours()) wrapper.classList.add(''.concat(ID, '_afterHours'));
      if (!isOutOfHours()) {
        document.querySelector('#menu-item-1097').style.display = 'none';
      }
      menuNumber && menuNumber.insertAdjacentElement('afterend', wrapper);
      wrapper && wrapper.insertAdjacentHTML('afterbegin', makePanelMarkup(data));
      addMenuDropdown(data);
      updateDefaultNumber(data.phone);
      addMobileBranchSlideout(data);
      makeInfinityNumber();
      addTracking();
    };
    var init = function init() {
      const date = new Date();
      const day = date.getDay();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      if (day !== 0 || day !== 6) {
        console.log(day);
        if ((hours >= 8 && hours < 19 && minutes >= 0) || (hours == 19 && minutes === 0)) {
          console.log('1 test');
          document.querySelector('#menu-item-1097 ').style.display = 'none';
        }
      }

      if (day === 0 || day === 6) {
        if ((hours >= 9 && hours < 18 && minutes >= 0) || (hours == 18 && minutes === 0)) {
          document.querySelector('#menu-item-1097 ').style.display = 'none';
        }
      }
      if (isBranchPage()) {
        updateBranchData();
      }

      updateHeader();
    };

    init();
  };

  var ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

  if (!ieChecks) {
    pollerLite(['body'], activate);
  }
})();
