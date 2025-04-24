const AC004 = () => {
  /* eslint-disable */
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
    
    
    
    var getCookie = function getCookie(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s?)' + name + '=([^;]*)'));
      return match && match[2] ? match[2] : undefined;
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var searchMarkup = '\n    <section class="AC004_search_wrap">\n        <h2 class="AC004_header">Recruitment Agency Search <span>- Improve your results by refining your search</span> <i class="fa fa-search"></i></h2>\n        <div class="AC004_col-wrap clearfix">\n            <div class="AC004_inner-col">\n                <div class="AC004_user-type clearfix">\n                    <h3>I am:</h3>\n                    <div class="AC004_cand-user" data-option="cnd">\n                        <span>\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 27" version="1.1">\n                                <g id="Search-Bar-Update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                    <g id="1.1-Search-Bar-Update---Portrait-Tablet-(970-or-below)" transform="translate(-66.000000, -1119.000000)" fill="#136CAA">\n                                        <g id="Group-Copy-3" transform="translate(29.000000, 986.000000)">\n                                            <g id="Input-Background-Copy-5-+-profile-icon-+-arrow-icon" transform="translate(17.000000, 119.000000)">\n                                                <path d="M29.2681605,14 C26.3668413,14 23.8471606,16.3739176 23.8471606,19.1073959 C23.8471606,21.8408742 26.3668413,24.2147918 29.2681605,24.2147918 C32.1694796,24.2147918 34.6891604,21.8408742 34.6891604,19.1073959 C34.6891604,16.3739176 32.1694796,14 29.2681605,14 Z M26.4770047,25.798871 C22.9622926,26.9805868 20.2331606,30.4943743 20.2331606,36.3402336 C20.2331606,41.3592126 38.3031603,41.3592126 38.3031603,36.3402336 C38.3031603,30.6112753 35.6820871,27.1220514 32.2692118,25.8725619 C32.0340916,26.1957456 31.6584976,26.5241926 31.2545669,26.8161213 C30.4830507,27.3737113 29.6081568,28.4196107 29.4112674,28.4196107 C29.0992795,28.4196107 27.0848861,26.9078499 26.4770047,25.798871 Z" id="candidate-icon"/>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </svg>            \n                        </span>\n                        <p>Looking<br /> for a job</p>\n                    </div>\n                    <div class="AC004_emp-user" data-option="emp">\n                        <span>\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 46" version="1.1">\n                                <g id="Search-Bar-Update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                    <g id="1.1-Search-Bar-Update---Portrait-Tablet-(970-or-below)" transform="translate(-93.000000, -2530.000000)" fill="#136CAA">\n                                        <g id="Rectangle-185-Copy-+-I\u2019m-an-employer-+-profile-icon-+-Rectangle-185-Copy-+-I\u2019m-an-employer-+-profile-icon-Copy-+-Rectangle-185-Copy-+-I\u2019m-an-employer-+-profile-icon-Copy-Copy" transform="translate(46.000000, 2510.000000)">\n                                            <g id="Rectangle-185-Copy-+-I\u2019m-an-employer-+-profile-icon">\n                                                <path d="M61.2500195,39.9500273 C57.1745139,39.9329273 48.1243265,41.2311041 48.1243265,41.2311041 C48.1243265,41.2311041 47,51.5908683 47,58.0703522 C47,68.1109159 75.5000391,68.1109159 75.5000391,58.0703522 C75.5000391,51.4298431 73.971012,41.0871789 73.971012,41.0871789 C73.971012,41.0871789 64.7939994,39.9657024 61.2500195,39.9500273 M69.8000312,28.5500117 C69.8000312,23.9729054 65.8271258,20 61.2500195,20 C56.6729133,20 52.7000078,23.9729054 52.7000078,28.5500117 C52.7000078,33.127118 56.6729133,37.1000234 61.2500195,37.1000234 C65.8271258,37.1000234 69.8000312,33.127118 69.8000312,28.5500117 M61.6526019,38.3701953 C60.0231656,38.3701953 56.9750137,38.5809158 56.9750137,38.5809158 L60.4385189,42.6159617 L62.7745162,42.6159617 L65.9623738,38.5809158 C65.9623738,38.5809158 63.0189524,38.3701953 61.6526019,38.3701953 Z M60.3893073,43.2900459 L57.5783239,61.1355077 L61.5666499,64.5974556 L65.5549759,61.2678809 L62.8218591,43.2900459 L60.3893073,43.2900459 Z" id="employer-icon"/>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </svg>\n                        </span>\n                        <p>Looking to<br /> hire staff</p>\n                    </div>\n                    <span class="AC004_error-text">Please select a user type.</span>\n                </div>\n                <div class="AC004_ind-wrap">\n                    <h3>In Industry:</h3>\n                    <span><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/328729/images/a29ecd082b32e2a384bf9226bcb799bc_noun_1073288_cc_copy.png" /></span>\n                    <span class="AC004_pre_selected_ind">Please select an industry</span> \n                    <span class="AC004_error-text">Please select a industry.</span>\n                </div>\n                <div class="AC004_location-wrap"> \n                    <h3>Location:</h3>\n                </div>\n            </div>\n            <div class="AC004_inner-col">\n                <div class="AC004_order-wrap">\n                    <h3>Order Results By:</h3>\n                    <div class="AC004_cover_location AC004_active" data-option="covers">Agencies who cover this location</div>\n                    <div class="AC004_specialist" data-option="standard">Specialists (Location not important)</div>\n                    <div class="AC004_cover-other_location" data-option="distance">Agencies nearest to your location</div>\n                </div>\n                <a class="AC004_search-btn">Search Agencies</a>\n            </div>\n        </div>\n    </section>\n';
    
    var indModal = '\n    <section class="AC004_industry_modal">\n        <div class="AC004_bg"></div>\n        <div class="AC004_inner-wrap">  \n            <a href="#" class="AC004_close_btn">\xD7</a>\n            <h2 class="AC004_modal-header">Select a sector</h2>\n            <div class="AC004_overflow_fix">\n                <div class="AC004_main-industries clearfix">\n                </div>\n                <div class="AC004_sub-industries clearfix">\n                    <a class="AC004_sub-back">Back</a>\n                    <h2 class="AC004_modal-header">Select a Sub-Sector</h2>\n                </div>\n            </div>\n        </div>\n    </section>\n';
    
    
    
    var AC004 = function () {
      var slideQ = false,
          $ = void 0;
    
      var UCPoller = function () {
        poller(['#search-bar-container', '#search-bar-container #search-bar-body', function () {
          if (window.jQuery) {
            $ = window.jQuery;
            return true;
          }
        }], init);
      }();
    
      function init() {
        fullStory('AC004', 'Variation 1');
    
        var cacheDom = function () {
          var bodyVar = document.body;
    
          var empOrCandCookie = getCookie('empOrCand');
    
          var searchBar = $('#search-bar-container');
          var mainIndInput = $('#input-industry-value');
          var subIndInput = $('#input-skill-value');
          var orderInput = $('#input-order-value');
          var empOrCandInput = $('#input-emp-cand-value');
    
          var searchWrap = void 0,
              mainIndWrap = void 0,
              modalWrap = void 0,
              subIndWrap = void 0;
    
          bodyVar.classList.add('AC004');
    
          return {
            bodyVar: bodyVar,
            empOrCandCookie: empOrCandCookie,
            searchBar: searchBar,
            searchWrap: searchWrap,
            mainIndWrap: mainIndWrap,
            modalWrap: modalWrap,
            subIndWrap: subIndWrap,
            mainIndInput: mainIndInput,
            subIndInput: subIndInput,
            orderInput: orderInput,
            empOrCandInput: empOrCandInput
          };
        }();
    
        var searchBuilder = {
          buildBase: function buildBase() {
            cacheDom.searchBar.after(searchMarkup);
            cacheDom.bodyVar.insertAdjacentHTML('beforeend', indModal);
    
            cacheDom.searchWrap = $('.AC004_search_wrap');
            cacheDom.modalWrap = $('.AC004_industry_modal');
            cacheDom.mainIndWrap = cacheDom.modalWrap.find('.AC004_main-industries');
            cacheDom.subIndWrap = cacheDom.modalWrap.find('.AC004_sub-industries');
    
            $('#input-location').parent('.search-bar-input-container').appendTo(cacheDom.searchWrap.find('.AC004_location-wrap'));
            cacheDom.searchWrap.find('.AC004_location-wrap').append('<span class="AC004_error-text">Please select a location.</span>');
          }
        };
    
        var industry = {
          getIndustry: function getIndustry() {
            $.ajax('/ajax/industry_modal').done(function (response) {
              $(response).find('#industries-categorical .col-lg-3.visible-lg.col-resp').each(function () {
                var el = $(this),
                    headerEl = el.find('h4.category-heading');
    
                cacheDom.mainIndWrap.append('\n\t\t\t\t\t\t\t\t<div class="AC004_ind-wrap-inner"></div>\n\t\t\t\t\t\t\t');
    
                headerEl.each(function () {
                  var el = $(this),
                      elText = el.text();
    
                  cacheDom.mainIndWrap.find('.AC004_ind-wrap-inner:last-child').append('<h3>' + elText + '</h3>');
    
                  el.next('.category-container').find('> span').each(function () {
                    var el = $(this),
                        elText = el.text(),
                        elData = el.attr('data-value');
    
                    cacheDom.mainIndWrap.find('.AC004_ind-wrap-inner:last-child').append('\n\t\t\t\t\t\t\t\t\t\t<a data-ind="' + elData + '" class="AC004_ind-link">' + elText + '</a>\n\t\t\t\t\t\t\t\t\t');
                  });
                });
              });
    
              mainIndClick.bind();
              indLoad.run();
            });
    
    
    
    
          },
          getSubInd: function getSubInd(subInd, subTitle) {
            var subIndString = 'https://www.agencycentral.co.uk/ajax/jobroles?industry=' + subInd;
    
            $.ajax(subIndString).done(function (response) {
              var data = response.data;
    
              cacheDom.subIndWrap.append('\n\t\t\t\t\t<div class="AC004_inner_sub AC004_active" data-sub-ind="' + subInd + '">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<h2>' + subTitle + ' Sub-Sectors</h2>\n\t\t\t\t\t\t\t<div class="AC004_link-wrap">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t');
    
              for (var i = 0; i < data.length; i++) {
                data[i].skill_id;
                cacheDom.subIndWrap.find('.AC004_inner_sub:last-child .AC004_link-wrap').append('\n\t\t\t\t\t\t<a class="AC004_sub-button" data-sub-link="' + data[i].skill_id + '">' + data[i].skill_name + '</a>\n\t\t\t\t\t');
              }
    
              cacheDom.subIndWrap.addClass('AC004_active');
              subIndClick.bind();
    
              setTimeout(function () {
                slideQ = false;
              }, 600);
            });
          }
        };
    
        var userTypeClick = {
          bind: function bind() {
            var userBtns = cacheDom.searchWrap.find('.AC004_user-type > div');
    
            userBtns.on('click', function () {
              var el = $(this);
    
              events.send('AC032', 'Form Field', 'User clicked on ' + el.text(), true, { sendOnce: true });
    
              $('.AC004_user-type').removeClass('AC004_error');
    
              if (userBtns.hasClass('AC004_active')) {
                userBtns.removeClass('AC004_active');
              }
              el.addClass('AC004_active');
              cacheDom.empOrCandInput[0].value = el.data('option');
            });
          },
          detectUser: function detectUser() {
            if (cacheDom.empOrCandCookie != undefined || cacheDom.empOrCandCookie != null) {
              if (cacheDom.empOrCandCookie.toString().toLowerCase() == 'emp') {
                $('.AC004_emp-user').addClass('AC004_active');
                cacheDom.empOrCandInput[0].value = 'emp';
              } else if (cacheDom.empOrCandCookie.toString().toLowerCase() == 'cnd') {
                $('.AC004_cand-user').addClass('AC004_active');
                cacheDom.empOrCandInput[0].value = 'cnd';
              }
            }
          }
        };
    
        var mainIndClick = {
          bind: function bind() {
            $('.AC004_ind-link').on('click', function () {
              if (slideQ === false) {
                slideQ = true;
    
                var el = $(this),
                    elSubIndData = el.data('ind');
    
                cacheDom.subIndWrap.find('.AC004_inner_sub.AC004_active').removeClass('AC004_active');
    
                if (cacheDom.subIndWrap.find('.AC004_inner_sub[data-sub-ind="' + elSubIndData + '"]').length > 0) {
                  var currSub = cacheDom.subIndWrap.find('.AC004_inner_sub[data-sub-ind="' + elSubIndData + '"]');
    
                  currSub.addClass('AC004_active');
                  cacheDom.subIndWrap.addClass('AC004_active');
    
                  setTimeout(function () {
                    slideQ = false;
                  }, 600);
                } else {
                  industry.getSubInd(elSubIndData, el.text());
                }
    
                cacheDom.mainIndInput[0].value = elSubIndData;
                $('.AC004_pre_selected_ind').text(el.text());
                $('.AC004_ind-wrap').removeClass('AC004_error');
                events.send('AC032', 'Form Field', 'Main Industry - User clicked on ' + el.text(), true, { sendOnce: true });
              }
            });
          }
        };
    
        var subIndClick = {
          bind: function bind() {
            var subBtn = $('.AC004_sub-button:not(.AC004_binded)');
    
            subBtn.each(function () {
              var el = $(this);
              el.addClass('AC004_binded');
              el.on('click', function () {
                var subLnk = el.data('sub-link');
                var mainLnk = el.closest('.AC004_inner_sub').data('sub-ind');
    
                cacheDom.subIndInput[0].value = subLnk;
                $('.AC004_close_btn').click();
                $('.AC004_pre_selected_ind').text($('.AC004_pre_selected_ind').text() + ' - ' + el.text());
                events.send('AC004', 'Form Field', 'Sub Industry - User clicked on ' + el.text(), true, { sendOnce: true });
    
                if (subLnk == 'administration' && mainLnk == 'admin' || subLnk == 'alladminsecretarialskills' && mainLnk == 'admin' || subLnk == 'bilingual' && mainLnk == 'admin' || subLnk == 'pa' && mainLnk == 'admin' || subLnk == 'receiptionisttelephonist' && mainLnk == 'admin' || subLnk == 'secretarial' && mainLnk == 'admin' || subLnk == 'switchboard' && mainLnk == 'admin' || subLnk == 'typist' && mainLnk == 'admin' || subLnk == 'allagriculturalskills' && mainLnk == 'agriculture' || subLnk == 'arboricultureforestry' && mainLnk == 'agriculture' || subLnk == 'drivers' && mainLnk == 'agriculture' || subLnk == 'farmlabour' && mainLnk == 'agriculture' || subLnk == 'gisgeographicinformationsystems' && mainLnk == 'agriculture' || subLnk == 'horticulture' && mainLnk == 'agriculture' || subLnk == 'seasonalworkers' && mainLnk == 'agriculture' || subLnk == 'all' && mainLnk == 'catering' || subLnk == 'bars' && mainLnk == 'catering' || subLnk == 'confbanq' && mainLnk == 'catering' || subLnk == 'frontoffice' && mainLnk == 'catering' || subLnk == 'hotel-staff' && mainLnk == 'catering' || subLnk == 'housekeeping' && mainLnk == 'catering' || subLnk == 'kitchen' && mainLnk == 'catering' || subLnk == 'restaurant' && mainLnk == 'catering' || subLnk == 'sales' && mainLnk == 'catering' || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'catering' || subLnk == 'allconstructionskills' && mainLnk == 'construction' || subLnk == 'buildingandcivilstrades' && mainLnk == 'construction' || subLnk == 'buildingservicesmecontracting' && mainLnk == 'construction' || subLnk == 'civilstradesandlabour' && mainLnk == 'construction' || subLnk == 'commercialinteriors' && mainLnk == 'construction' || subLnk == 'contracting' && mainLnk == 'construction' || subLnk == 'mechanicalelectricaltradeslabour' && mainLnk == 'construction' || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'construction' || subLnk == 'allcustomerservicecallcentreskills' && mainLnk == 'custservcallcentre' || subLnk == 'businessservices' && mainLnk == 'custservcallcentre' || subLnk == 'customer' && mainLnk == 'custservcallcentre' || subLnk == 'languages' && mainLnk == 'custservcallcentre' || subLnk == 'operational' && mainLnk == 'custservcallcentre' || subLnk == 'technology' && mainLnk == 'custservcallcentre' || subLnk == 'training' && mainLnk == 'custservcallcentre' || subLnk == '75tonne' && mainLnk == 'driving' || subLnk == 'agriculture' && mainLnk == 'driving' || subLnk == 'alldrivingskills' && mainLnk == 'driving' || subLnk == 'commercial' && mainLnk == 'driving' || subLnk == 'courier' && mainLnk == 'driving' || subLnk == 'distribution' && mainLnk == 'driving' || subLnk == 'forklift' && mainLnk == 'driving' || subLnk == 'instructors' && mainLnk == 'driving' || subLnk == 'lgv' && mainLnk == 'driving' || subLnk == 'plant' && mainLnk == 'driving' || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'driving' || subLnk == 'inhousehardservices' && mainLnk == 'facilitiesmanagement' || subLnk == 'inhousesoftservices' && mainLnk == 'facilitiesmanagement' || subLnk == 'administration' && mainLnk == 'fashion' || subLnk == 'retail' && mainLnk == 'fashion' || subLnk == 'administration' && mainLnk == 'financialservices' || subLnk == 'ancillaryhospitalstaff' && mainLnk == 'health' || subLnk == 'generalpracticenonclinical' && mainLnk == 'health' || subLnk == 'allindustrialskills' && mainLnk == 'industrial' || subLnk == 'assemblers' && mainLnk == 'industrial' || subLnk == 'cleaning' && mainLnk == 'industrial' || subLnk == 'domestic' && mainLnk == 'industrial' || subLnk == 'drilling' && mainLnk == 'industrial' || subLnk == 'drivers' && mainLnk == 'industrial' || subLnk == 'foodprocessing' && mainLnk == 'industrial' || subLnk == 'forklift' && mainLnk == 'industrial' || subLnk == 'gardening' && mainLnk == 'industrial' || subLnk == 'injectionmoulding' && mainLnk == 'industrial' || subLnk == 'jigging' && mainLnk == 'industrial' || subLnk == 'loaders' && mainLnk == 'industrial' || subLnk == 'lobouring' && mainLnk == 'industrial' || subLnk == 'machineoperating' && mainLnk == 'industrial' || subLnk == 'orderpickers' && mainLnk == 'industrial' || subLnk == 'packers' && mainLnk == 'industrial' || subLnk == 'painting' && mainLnk == 'industrial' || subLnk == 'parcelsorters' && mainLnk == 'industrial' || subLnk == 'portering' && mainLnk == 'industrial' || subLnk == 'powdercoating' && mainLnk == 'industrial' || subLnk == 'pressingproduction' && mainLnk == 'industrial' || subLnk == 'productionline' && mainLnk == 'industrial' || subLnk == 'refusecollection' && mainLnk == 'industrial' || subLnk == 'soldering' && mainLnk == 'industrial' || subLnk == 'tapping' && mainLnk == 'industrial' || subLnk == 'typefitting' && mainLnk == 'industrial' || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'industrial' || subLnk == 'warehouseoperatives' && mainLnk == 'industrial' || subLnk == 'administration' && mainLnk == 'industrial' || subLnk == 'all' && mainLnk == 'retail' || subLnk == 'security' && mainLnk == 'retail' || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'retail') {
                  $('.AC004_order-wrap').addClass('AC004_hide-special').removeClass('AC004_hide-distance');
                  $('.AC004_specialist').removeClass('AC004_active');
                } else {
                  $('.AC004_order-wrap').addClass('AC004_hide-distance').removeClass('AC004_hide-special');
                  $('.AC004_cover-other_location').removeClass('AC004_active');
                }
              });
            });
          }
        };
    
        var modalBack = {
          bind: function bind() {
            $('.AC004_sub-back').on('click', function () {
              if (slideQ === false) {
                cacheDom.subIndWrap.removeClass('AC004_active');
              }
              events.send('AC032', 'Modal', 'User clicked on back button', true, { sendOnce: true });
            });
          }
        };
    
        var modalOpen = {
          bind: function bind() {
            var modal = $('.AC004_industry_modal'),
                modalBG = modal.find('.AC004_bg');
    
            $(".AC004_pre_selected_ind, .AC004_industry_modal .AC004_close_btn").on("click", function (e) {
              if (slideQ === false) {
                slideQ = true;
                e.preventDefault();
    
                if (modal.hasClass("active")) {
                  modal.fadeOut("slow", function () {
                    modal.removeClass("active");
                    cacheDom.bodyVar.classList.remove('AC004_overflow-body');
                    cacheDom.subIndWrap.removeClass('AC004_active');
                    events.send('AC004', 'modal', 'User closed modal', true, { sendOnce: true });
                    slideQ = false;
                  });
                } else {
    
                  modal.fadeIn("slow", function () {
                    cacheDom.bodyVar.classList.add('AC004_overflow-body');
                    events.send('AC032', 'modal', 'User opened modal', true, { sendOnce: true });
                    modal.addClass("active");
                    slideQ = false;
                  });
    
                  modalBG.on("mousedown touchstart", function () {
                    if (modal.hasClass("active")) {
                      modal.fadeOut("slow", function () {
                        cacheDom.bodyVar.classList.remove('AC004_overflow-body');
                        modal.removeClass("active");
                        cacheDom.subIndWrap.removeClass('AC004_active');
                      });
                    }
                  });
                }
              }
            });
          }
        };
    
        var orderBy = {
          optionClick: function optionClick() {
            var orderWrap = cacheDom.searchWrap.find('.AC004_order-wrap'),
                orderOptions = orderWrap.find('> div');
    
            orderOptions.on('click', function () {
              var el = $(this),
                  elData = el.data('option');
    
              // events.send('AC032', 'Form Field', 'User clicked on ' + el.text(), true, { sendOnce: true });
    
              orderWrap.removeClass('AC004_error');
    
              if (!el.hasClass('AC004_active')) {
                if (orderOptions.hasClass('AC004_active')) {
                  orderOptions.removeClass('AC004_active');
                }
                el.addClass('AC004_active');
                cacheDom.orderInput[0].value = elData;
              }
            });
          }
        };
    
        var agencySearch = {
          submitClick: function submitClick() {
            $('.AC004_search-btn').on('click', function () {
              var validationCheck = true;
    
              if (!$('.AC004_user-type > div').hasClass('AC004_active')) {
                validationCheck = false;
                $('.AC004_user-type').addClass('AC004_error');
              }
              if ($('.AC004_pre_selected_ind').text().indexOf('Please select an industry') > -1) {
                validationCheck = false;
                $('.AC004_ind-wrap').addClass('AC004_error');
              }
              if ($('#input-location-id-value').val() == '' || !$('#input-location-id-value').val()) {
                validationCheck = false;
                $('.AC004_location-wrap').addClass('AC004_error');
              }
              if (!$('.AC004_order-wrap > div').hasClass('AC004_active')) {
                validationCheck = false;
                $('.AC004_order-wrap').addClass('AC004_error');
              }
    
              if (validationCheck === true) {
                events.send('AC032', 'Form Field', 'User clicked on submit', true, { sendOnce: true });
                $('.search-bar-input-container button.search-bar-button-inline').click();
              }
            });
    
            $('#input-location').on('keyup', function () {
              $('.AC004_location-wrap').removeClass('AC004_error');
              events.send('AC032', 'Form Field', 'User typed in location', true, { sendOnce: true });
            });
          }
        };
    
        var indLoad = {
          run: function run() {
            if (window.location.pathname.indexOf('/agencysearch/') > -1) {
              var indString = $('#input-industry-selector .option-text').text() + ' - ' + $('#input-skill-selector .option-text').text();
              $('.AC004_pre_selected_ind').text(indString);
    
              if (window.location.search.indexOf('&order=covers') > -1) {
                $('.AC004_cover_location').click();
              } else if (window.location.search.indexOf('&order=standard') > -1) {
                $('.AC004_specialist').click();
              }
            }
          }
        };
    
        var searchReveal = {
          bind: function bind() {
            $('.AC004_header').on('click', function () {
              if ($(window).width() < 768) {
                $('.AC004_col-wrap').slideToggle();
                events.send('AC032', 'Form Field', 'Mobile user opened search', true, { sendOnce: true });
              }
            });
          }
        };
    
        searchBuilder.buildBase();
    
        userTypeClick.bind();
        modalBack.bind();
        modalOpen.bind();
        orderBy.optionClick();
        userTypeClick.detectUser();
        agencySearch.submitClick();
        searchReveal.bind();
    
        industry.getIndustry();
      }
    }();
  })();
};
export default AC004;
