const AC024 = () => {
    
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
  
  var poller = function poller(elements, cb, options) {
    var settings = {
      wait: 50,
      multiplier: 1.1,
      timeout: 0,
      timeoutCallback: function timeoutCallback() {}
    };
  
    if (options) {
      for (var option in options) {
        settings[option] = options[option];
      }
    }
  
    var pollingElements = [],
        successfullyPolledElements = [];
  
    for (var i = 0; i < elements.length; i++) {
      var pollingElement = createPollingElement({
        elm: elements[i],
        maxDuration: settings.timeout
      });
  
      pollingElements.push(pollingElement);
  
      pollingElement.poll(settings.wait, settings.multiplier, function (pollingElement) {
        successfullyPolledElements.push(pollingElement);
  
        if (successfullyPolledElements.length === elements.length) {
          cb();
        }
      }, settings.timeoutCallback);
    }
  
    return {
      destroy: function destroy() {
        pollingElements.forEach(function (item) {
          return item.destroy();
        });
      }
    };
  };
  
  var pollerLite = function pollerLite(elements, cb, options) {
    var settings = {
      wait: 50,
      multiplier: 1.1,
      timeout: 0
    };
  
    var now = Date.now || function () {
      return new Date().getTime();
    };
  
    if (options) {
      for (var option in options) {
        settings[option] = options[option];
      }
    } else {
      options = settings;
    }
  
    var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
    var wait = settings.wait;
    var multiplier = settings.multiplier;
  
    var successful = [];
    var time;
    var pollForElement = function pollForElement(condition, time) {
      if (timeout && now() > timeout) {
        return false;
      }
      time = time || wait;
  
      var conditionIsTrue = function () {
        var type = typeof condition === 'undefined' ? 'undefined' : _typeof(condition);
        var toReturn;
  
        if (type === 'function') {
          toReturn = condition();
        } else if (type === 'string') {
          toReturn = document.querySelector(condition);
        } else {
          toReturn = true;
        }
  
        return toReturn;
      }();
  
      if (conditionIsTrue) {
        successful.push(true);
        if (successful.length === elements.length) cb();
      } else {
        setTimeout(function () {
          pollForElement(condition, time * multiplier);
        }, time);
      }
    };
  
    for (var i = 0; i < elements.length; i++) {
      pollForElement(elements[i]);
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
    analyticsReference: 'ga',
    setDefaultCategory: function setDefaultCategory(category) {
      this.category = category;
  
      return this;
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
            self.trackerName = window[self.analyticsReference].getAll()[0].get('name');
          }
          fire(self.trackerName);
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
    return match && match[2] ? match[2] : undefined;
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var searchFooterHTML = '\n  <section class="AC024_search_block">\n    <h2>Still looking for the right recruitment agency?</h2>\n    <p>As an employer, you have access to our assisted search phoneline.</p>\n    <p>Call <a class="AC024_tel-link" href="tel:+0330-380-0647">0330 380 0647</a> and let our team help you find the perfect agency for you.</p>\n  </section>\n';
  
  var searchModalHTML = '\n  <div class="pop-up_modal">\n    <div class="body_click"></div>\n    <div class="inner_div">\n    <a href="#" class="close_btn">\u2715</a>\n      <div class="overflow_fix">\n        <h2>Still Searching?</h2>\n        <p>As an employer, you have access to our assisted search phoneline.</p>\n        <p>Call <a class="AC024_tel-link" href="tel:+0330-380-0647">0330 380 0647</a> and let our team help you find the perfect agency for you.</p>\n      </div>\n    </div>\n  </div>\n';
  
  var Run = function Run() {
    var Exp = {
      settings: {
        ID: 'AC024',
        VARIATION: '1'
      },
      cache: function () {
        var bodyVar = document.body;
        var URLQ = window.location.search;
        var userBar = document.getElementById('user-bar');
        var userBarText = userBar.querySelector('.user-bar-text');
        var userBarClose = userBar.querySelector('.user-option-close');
        var favBtn = bodyVar.querySelector('#favourites-navbar-button');
  
        return {
          bodyVar: bodyVar,
          userBar: userBar,
          userBarText: userBarText,
          userBarClose: userBarClose,
          favBtn: favBtn,
          URLQ: URLQ
        };
      }(),
      init: function init() {
        var services = Exp.services;
        var settings = Exp.settings;
        var components = Exp.components;
  
  
        if (!document.body.classList.contains('AC024')) {
          Exp.cache.bodyVar.classList.add(settings.ID);
          services.tracking();
  
          components.userOptionClick();
          components.identifyUser();
          components.searchPage.urlCheck();
          components.stillSearchingModal.urlCheck();
        }
      },
      services: {
        tracking: function tracking() {
          var settings = Exp.settings;
  
          fullStory(settings.ID, 'Variation ' + settings.VARIATION);
        },
        fadeOut: function fadeOut(el) {
          var elem = el;
          var op = 1;
          var timer = setInterval(function () {
            if (op <= 0.1) {
              clearInterval(timer);
              elem.style.display = 'none';
            }
            elem.style.opacity = op;
            op -= op * 0.1;
          }, 10);
        },
        fadeIn: function fadeIn(el) {
          var elem = el;
          var op = 0;
          elem.style.opacity = op;
          elem.style.display = 'inline-block';
  
          var timer = setInterval(function () {
            if (op >= 1.0) {
              clearInterval(timer);
            }
            elem.style.opacity = op;
            op += 0.1;
          }, 10);
        }
      },
      components: {
        userOptionClick: function userOptionClick() {
          var empUserOption = Exp.cache.userBar.querySelector('.user-option[data-value="emp"]');
  
          empUserOption.addEventListener('click', function () {
            Exp.cache.bodyVar.classList.add('AC024_emp-msg');
            Exp.cache.userBarText.innerHTML = 'As an employer, you have access to our assisted search phoneline.<br /> Call 0330 380 0647 and let our team help you find the perfect agency for you.';
  
            Exp.cache.userBarClose.addEventListener('click', function () {
              Exp.cache.bodyVar.classList.add('AC024_hide');
            });
          });
        },
        identifyUser: function identifyUser() {
          var empOrCandCookie = getCookie('empOrCand');
  
          if (empOrCandCookie && empOrCandCookie.toString().toLowerCase() === 'emp') {
            Exp.cache.favBtn.insertAdjacentHTML('afterend', '<div class="AC024_call-wrap"><a class="AC024_call-btn"><i class="fa fa-phone"></i></a><div class="AC024_phone_modal-wrap"><div class="AC024_phone-modal"><span>▲</span><div>You are eligible for our assisted search!<br /> Call 0330 380 0647</div></div></div></div>');
            Exp.components.callBtnClick();
          }
        },
        callBtnClick: function callBtnClick() {
          var callBtn = document.querySelector('.AC024_call-btn');
  
          callBtn.addEventListener('click', function () {
            events.send('AC024', 'Header Phone button clicked', 'User clicked the employer only button in the header', { sendOnce: true });
            callBtn.parentNode.classList.toggle('AC024_show-msg');
          });
        },
        searchPage: {
          urlCheck: function urlCheck() {
            if (Exp.cache.URLQ.indexOf('&emp_cand=emp') > -1) {
              poller(['#search-results-container'], Exp.components.searchPage.render);
            }
          },
          render: function render() {
            document.getElementById('search-results-container').insertAdjacentHTML('afterend', searchFooterHTML);
            document.querySelector('.AC024_search_block .AC024_tel-link').addEventListener('click', function () {
              events.send('AC024', 'Footer Telephone link clicked', 'User clicked the telephone number in the footer module', { sendOnce: true });
            });
          }
        },
        stillSearchingModal: {
          urlCheck: function urlCheck() {
            if (Exp.cache.URLQ.indexOf('&page=') > -1 && Exp.cache.URLQ.indexOf('&page=2') === -1 && Exp.cache.URLQ.indexOf('&page=1') === -1 && getCookie('AC024_modal') !== 'true') {
              events.send('AC024', 'Modal Displayed', 'User shown modal', { sendOnce: true });
              Exp.components.stillSearchingModal.render();
            }
          },
          render: function render() {
            Exp.cache.bodyVar.insertAdjacentHTML('beforeend', searchModalHTML);
            document.querySelector('.pop-up_modal .AC024_tel-link').addEventListener('click', function () {
              events.send('AC024', 'Footer Telephone link clicked', 'User clicked the telephone number in the modal', { sendOnce: true });
            });
            setCookie('AC024_modal', 'true', 200000000);
  
            var slideQ = false;
            var modal = document.querySelector('.pop-up_modal');
            var modalBG = modal.querySelector('.body_click');
  
            slideQ = true;
            Exp.services.fadeIn(modal);
            setTimeout(function () {
              modal.classList.add('active');
              slideQ = false;
            }, 1000);
  
            modal.querySelector('.pop-up_modal .close_btn').addEventListener('click', function () {
              if (slideQ === false) {
                slideQ = true;
                Exp.services.fadeOut(modal);
                setTimeout(function () {
                  modal.classList.remove('active');
                  slideQ = false;
                }, 1000);
              }
            });
            modalBG.addEventListener('mousedown', function () {
              if (modal.classList.contains('active') && slideQ === false) {
                Exp.services.fadeOut(modal);
                setTimeout(function () {
                  modal.classList.remove('active');
                  slideQ = false;
                }, 1000);
              }
            });
          }
        }
      }
    };
  
    Exp.init();
  };
    
  poller(['body'], Run);
};

export default AC024;

