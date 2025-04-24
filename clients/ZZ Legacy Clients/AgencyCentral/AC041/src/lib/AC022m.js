const AC022m = () => {    
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  var headerHTML = '\n    <div class="AC018_usp">\n        <h3>7,000 handpicked, curated specialists recruitment agencies across the UK</h3>\n    </div>\n    <div class="AC018_banner">\n        <div class="AC018_banner-container clearfix">\n            <div class="AC018_location"></div>\n            <div class="AC018_location-text">\n                <div class="AC018_location-text-inner">\n                    <p></p>\n                    <a class="AC018_read-more">Read more</a>\n                </div>\n                <div class="AC018_location-text-reveal">\n                    <a class="AC018_read-less">Read less</a>\n                </div>\n            </div>\n        </div>\n    </div>\n';
  
  var searchHTML = '\n    <div class="AC018_search-wrap clearfix">\n        <section class="AC018_search-refine">\n            <h2>Refine <a class="AC018_refine-close">\xD7</a></h2>\n            <div class="AC018_refine-wrap">\n                <h3 class="AC018_results-header"><span>32</span> Recruitment Agencies Found</h3>\n                <div class="AC018_location-check">\n                    <label><span></span> <a class="AC018_location-remove"></a></label>\n                </div>\n                <div class="AC018_refine-inner">\n                    <h3>1. What are you looking for?</h3>\n                    <div class="AC018_looking-for">\n                        <div class="AC018_refine_radio-wrap AC018_all-option AC018_active">\n                            <p>All</p>\n                        </div>\n                        <div class="AC018_refine_radio-wrap AC018_emp-option">\n                            <p>Looking to hire staff</p>\n                        </div>\n                        <div class="AC018_refine_radio-wrap AC018_cnd-option">\n                            <p>Looking for a job</p>\n                        </div>\n                    </div>\n                    <h3>2. Select an industry</h3>\n                    <div class="AC018_industry AC018_select">\n                        <span></span>\n                        <select>\n                            <option>Please select an Industry</option>\n                        </select>\n                    </div>\n                    <h3>3. Select an sub-industry</h3>\n                    <div class="AC018_sub-industry AC018_select">\n                        <span></span>\n                        <select>\n                            <option>Main Industry Only</option>\n                        </select>\n                    </div>\n                    <div class="AC018_order-by">\n                        <h3>4. Order results</h3>\n                        <div class="AC018_order_radio-wrap">\n                            <div class="AC018_order_radio AC018_special-option">\n                                <p>Specialists <span>(Location not important)</span></p>\n                            </div>\n                            <div class="AC018_order_radio AC018_cover-option AC018_active">\n                                <p>Location <span>(Agencies who cover this location)</span></p>\n                            </div>\n                        </div>\n                    </div>\n                    <a class="AC018_refine-cta">Refine</a>\n                    <div class="AC018_refine-error">Please select a main industry to refine</div>\n                </div>\n            </div>\n        </section>\n        <div class="AC018_refine-mb"><a>Refine Search Results</a></div>\n        <section class="AC018_search-results clearfix">\n             <div class="AC018_results-wrap">\n                <div class="AC018_pre-load">\n                    <div class="AC018_loader-wrapper">\n                        <div class="AC018_loader">\n                            <div class="AC018_roller"></div>\n                            <div class="AC018_roller"></div>\n                        </div>\n                        <div class="AC018_loader">\n                            <div class="AC018_roller"></div>\n                            <div class="AC018_roller"></div>\n                        </div>\n                        <div class="AC018_loader">\n                            <div class="AC018_roller"></div>\n                            <div class="AC018_roller"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    </div>\n    <div class="AC018_refine-sticky-btn"><a>Refine Search Results</a></div>\n';
  
  
  
  var AC018 = function () {
    var trackerName = void 0,
        slideQ = false,
        $ = void 0;
  
    var doc = document;
  
    var UCPoller = function () {
      poller(['#favourites-navbar-button', '.breadcrumb', '.search-title-h2', '#input-industry-selector', '.contact-option-container .agency-primary-link', '.search-bar-input-container', '#input-location', function () {
        var version = detectIE();
  
        if (version === false) {
          if (window.jQuery) {
            $ = window.jQuery;
            return true;
          }
        }
  
        document.getElementById('details').innerHTML = window.navigator.userAgent;
  
        function detectIE() {
          var ua = window.navigator.userAgent;
  
          var msie = ua.indexOf('MSIE ');
          if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
          }
  
          var trident = ua.indexOf('Trident/');
          if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
          }
  
          var edge = ua.indexOf('Edge/');
          if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
          }
  
          return false;
        }
      }], init);
    }();
  
    function init() {
      fullStory('AC018', 'Variation 1');
  
      var cacheDom = function () {
        var bodyVar = doc.querySelector('body');
        var URL = window.location.pathname;
  
        var breadcrumb = doc.querySelector('.breadcrumb');
        var headerWrap = doc.getElementById('content-panel');
        var searchWrap = doc.getElementById('search-bar-container');
        var mainContainer = doc.querySelector('.main-container');
  
        var prevOption = void 0;
        var firstLoad = true;
  
        var bannerWrap = void 0;
        var searchResultsWrap = void 0;
  
        var count = 0;
  
        var _subTimeout = void 0,
            timeout = null;
  
        _subTimeout = function subTimeout() {
          timeout = setTimeout(function () {
            var newSubSelect = $('.AC018_sub-industry select');
            var indSelect = $('.AC018_industry select');
            var subIndustrySelect = $('#input-skill-selector-dropdown');
  
            if (count == 40) {
              count = 0;
            } else if (cacheDom.firstLoad === true) {
              if ($('#input-skill-selector-dropdown .dropdown-option').length > 1) {
                subIndustrySelect.find('.dropdown-option').each(function () {
                  var el = $(this),
                      elText = el.text(),
                      elData = el.attr('data-value');
                  newSubSelect.append('<option value="' + elData + '">' + elText + '</option>');
                });
  
                if (window.location.search) {
                  var subStr = window.location.search.match("&skill=(.*)&location_id");
                  $('.AC018_sub-industry select option[value="' + subStr[1] + '"]').attr('selected', 'selected');
                } else {
                  $('.AC018_sub-industry select option:first-child').attr('selected', 'selected');
                }
                $('.AC018_sub-industry select').trigger('change');
                cacheDom.firstLoad = false;
              } else {
                _subTimeout();
                count++;
              }
            } else if (cacheDom.prevOption !== $('#input-skill-selector-dropdown .dropdown-option:first-child').text()) {
              cacheDom.prevOption = $('#input-skill-selector-dropdown .dropdown-option:first-child').text();
  
              if (newSubSelect.find('option').length > 1) {
                newSubSelect.empty();
                newSubSelect.append('<option>Main Industry Only</option>');
              }
  
              subIndustrySelect.find('.dropdown-option').each(function () {
                var el = $(this),
                    elText = el.text(),
                    elData = el.attr('data-value');
  
                newSubSelect.append('<option value="' + elData + '">' + elText + '</option>');
              });
  
              $('.AC018_sub-industry select option:first-child').attr('selected', 'selected');
              $('.AC018_sub-industry select').trigger('change');
              count = 0;
            } else {
              _subTimeout();
              count++;
            }
          }, 200);
        };
  
        bodyVar.classList.add('AC018');
  
        return {
          bodyVar: bodyVar,
          URL: URL,
          breadcrumb: breadcrumb,
          headerWrap: headerWrap,
          bannerWrap: bannerWrap,
          searchWrap: searchWrap,
          mainContainer: mainContainer,
          searchResultsWrap: searchResultsWrap,
          prevOption: prevOption,
          firstLoad: firstLoad,
          subTimeout: _subTimeout
        };
      }();
  
      var URLChecker = {
        run: function run() {
          if (cacheDom.URL.match(/.*(agencysearch).*(skills|countysearch|bytown|byregion).*|.*(agencysearch.htm).*/)) {
            cacheDom.bodyVar.classList.add('AC018_location-page');
            header.locationMarkup();
          }
        }
      };
  
      var header = {
        contentBuilder: function contentBuilder() {
          cacheDom.breadcrumb.insertAdjacentHTML('beforebegin', headerHTML);
  
          cacheDom.bannerWrap = doc.querySelector('.AC018_banner');
  
          cacheDom.breadcrumb.insertAdjacentHTML('afterend', '<div class="AC0018_title"></div>');
  
          doc.querySelector('.AC0018_title').appendChild(doc.querySelector('.search-title-h2'));
  
          var text = doc.querySelector('.AC0018_title h2').innerHTML;
          text = text.replace('Use the search box above to find your ideal list of agencies.', '');
  
          doc.querySelector('.AC0018_title h2').innerHTML = text;
        },
        locationMarkup: function locationMarkup() {
          cacheDom.bannerWrap.querySelector('.AC018_location').appendChild(cacheDom.headerWrap.querySelector('h1.page-title'));
          var locationText = cacheDom.headerWrap.querySelectorAll('.page-description p');
  
          for (var i = 0; locationText.length > i; i++) {
            cacheDom.bannerWrap.querySelector('.AC018_location-text-reveal').insertBefore(locationText[i], cacheDom.bannerWrap.querySelector('.AC018_location-text-reveal .AC018_read-less'));
          }
  
          if (doc.querySelector('.AC018_location-text-reveal p:first-child').innerText.length > 200) {
            var subText = doc.querySelector('.AC018_location-text-reveal p:first-child').innerHTML.substring(0, 200).trim();
            doc.querySelector('.AC018_location-text-inner p').innerHTML = subText + '...';
          } else {
            if (doc.querySelector('.AC018_location-text-reveal p:first-child + p')) {
              var _subText = doc.querySelector('.AC018_location-text-reveal p:first-child').innerHTML.trim();
  
              var stringTotal = 200 - _subText.length;
              var subText2 = doc.querySelector('.AC018_location-text-reveal p:first-child + p').innerHTML.trim();
  
              if (subText2.length > stringTotal) {
                doc.querySelector('.AC018_location-text-inner p').innerHTML = _subText + ' ' + subText2.substring(0, stringTotal) + '...';
              } else {
                doc.querySelector('.AC018_location-text-inner p').innerHTML = _subText + ' ' + subText2 + '...';
              }
            } else {
              var subTextNoDot = doc.querySelector('.AC018_location-text-reveal p:first-child').innerHTML.trim();
              doc.querySelector('.AC018_location-text-inner p').innerHTML = subTextNoDot;
            }
          }
        }
      };
  
      var search = {
        contentBuilder: function contentBuilder() {
          cacheDom.mainContainer.insertAdjacentHTML('beforebegin', searchHTML);
  
          doc.querySelector('.AC018_results-header span').textContent = $('.AC0018_title .search-title-h2 strong:first-child').text();
  
          cacheDom.searchResultsWrap = doc.querySelector('.AC018_results-wrap');
        },
        moveElements: function moveElements() {
          var resultsBody = doc.querySelectorAll('#search-results-container .agency-result');
          var locVal = '';
          var subVal = '';
  
          if (doc.getElementById('input-location').value) {
            locVal = $('#input-location').val();
          } else {
            cacheDom.bodyVar.classList.add('AC022_no-loc');
          }
  
          if (doc.getElementById('input-skill-value').value) {
            poller([function () {
              if ($('.AC018_sub-industry option[value=' + $('#input-skill-value').val() + ']').length > 0) {
                return true;
              }
            }], function () {
              subVal = $('.AC018_sub-industry option[value=' + $('#input-skill-value').val() + ']').text();
              $('.AC022_match-sub').text(subVal);
            });
          } else {
            cacheDom.bodyVar.classList.add('AC022_no-sub');
          }
  
          for (var i = resultsBody.length - 1; i > -1; i--) {
            var resultsCurrent = resultsBody[i];
            var resultContainer = resultsCurrent.querySelector('.agency-body-container');
            var resultJQ = $(resultContainer);
  
            resultJQ.addClass('clearfix');
  
            $(resultContainer).after('<div class="AC018_contact-options clearfix"></div>');
  
            var contactOptions = resultsCurrent.querySelector('.AC018_contact-options');
  
            if (resultJQ.find('.contact-option-container[data-action="website"] .agency-primary-link').length > 0) {
              resultContainer.querySelector('.contact-option-container[data-action="website"] .agency-primary-link').textContent = 'Website';
              $(contactOptions).append(resultJQ.find('.contact-option-container[data-action="website"]'));
            }
  
            if (resultJQ.find('.contact-option-container[data-action="telfax"] .agency-primary-link').length > 0) {
              resultContainer.querySelector('.contact-option-container[data-action="telfax"] .agency-primary-link').textContent = 'Phone number';
              $(contactOptions).append(resultJQ.find('.contact-option-container[data-action="telfax"]'));
            }
  
            if (resultJQ.find('.contact-option-container[data-action="email"]').length > 0) {
              $(contactOptions).append(resultJQ.find('.contact-option-container[data-action="email"]'));
            }
  
  
            if (resultContainer.querySelector('.add-to-favourites-link')) {
              resultJQ.find('.agency-title').parent().append(resultJQ.find('.extra-contact-action[data-action="favourite"]'));
            }
  
            if (resultJQ.find('.agency-address-line').length > 0) {
              resultJQ.find('.contact-options-container').parent().append(resultJQ.find('.agency-address-line')).prepend('\n              <div class="AC022_match_wrap">\n                <div class="AC022_match-closest">Closest Match</div>\n                <div class="AC022_match-recruits">\n                  <p>Recruits in your Industry\n                    <span class="AC022_match-sub">' + subVal + '</span>\n                  </p>\n                </div>\n                <div class="AC022_match-recruits AC022_fail">\n                  <p>Recruits in your Industry? <br />\n                    <a class="AC022_add-role">Add your Job Role</a>\n                  </p>\n                </div>\n                <div class="AC022_match-area">\n                  <p>Recruits in your area\n                    <span class="AC022_match-loc">' + locVal + '</span>\n                  </p>\n                </div>\n                <div class="AC022_match-area AC022_fail">\n                  <p>Recruits in your area? <br />\n                    <a class="AC022_add-loc">Add your Location</a>\n                  </p>\n                </div>\n                <div class="AC022_view-wrap">\n                  <a><span>View office locations</span><span>Hide office locations</span></a>\n                </div>\n              </div>\n            ');
            }
  
            if (resultContainer.querySelector('.agency-info-container + .col-md-4')) {
              resultContainer.insertBefore(resultContainer.querySelector('.agency-info-container + .col-md-4'), resultContainer.querySelector('.agency-info-container'));
            }
          }
  
          $('.expand-addresses').off('click').on('click', function () {
            var $this = $(this);
            var $otherAddresses = $this.closest('.agency-address-line').find('.other-addresses');
            if ($otherAddresses.is(':visible')) {
              $otherAddresses.slideUp();
              $otherAddresses.next('.expand-addresses').find('span').html('Show more offices <i class="fa fa-chevron-down"></i>');
            } else {
              $otherAddresses.slideDown();
              $otherAddresses.next('.expand-addresses').find('span').html('Show less offices <i class="fa fa-chevron-up"></i>');
            }
          });
  
          var locationShowMore = doc.querySelectorAll('.expand-addresses span');
          for (var _i = locationShowMore.length - 1; _i > -1; _i--) {
            locationShowMore[_i].innerHTML = 'Show more offices <i class="fa fa-chevron-down"></i>';
          }
  
          doc.querySelector('.AC018_search-results').insertBefore(doc.getElementById('search-results-container'), null);
        },
        bindClick: function bindClick() {
          var searchBtn = $('#search-bar-expose-button'),
              navWrap = $('.AC018_search-refine');
  
          searchBtn.off('click');
  
          $('#search-bar-expose-button, .AC018_refine-close, .AC018_refine-mb').on('click', function () {
            if (slideQ === false) {
              slideQ = true;
              cacheDom.bodyVar.classList.toggle('AC018_refine-reveal');
              setTimeout(function () {
                slideQ = false;
              }, 600);
            }
          });
        }
      };
  
      var readMore = {
        clickBinding: function clickBinding() {
          doc.querySelector('.AC018_read-more').addEventListener('click', function () {
            cacheDom.bodyVar.classList.add('AC018_read-more');
          });
        }
      };
  
      var readLess = {
        clickBinding: function clickBinding() {
          doc.querySelector('.AC018_read-less').addEventListener('click', function () {
            cacheDom.bodyVar.classList.remove('AC018_read-more');
          });
        }
      };
  
      var selectBox = {
        run: function run() {
          $.each($('.AC018_select'), function () {
            var el = $(this),
                span = el.find('span'),
                sel = el.find('select');
            span.html(sel.find('option:selected').text());
  
            sel.change(function () {
              span.html(sel.find('option:selected').text());
            });
          });
        }
      };
  
      var favourite = {
        clickBinding: function clickBinding() {
          var favElement = doc.querySelectorAll('.add-to-favourites-link');
  
          for (var i = favElement.length - 1; i > -1; i--) {
            if (favElement[i].querySelector('a').textContent.indexOf('Remove') > -1) {
              favElement[i].classList.add('AC018_active');
            }
            favElement[i].addEventListener('click', function () {
              this.classList.toggle('AC018_active');
            });
          }
        }
      };
  
      var searchBuilder = {
        getLocation: function getLocation() {
          var locationWrap = $('#input-location').closest('.search-bar-input-container');
          var currentLocation = $('.AC018_location-check');
          var locationLabel = currentLocation.find('label');
  
          locationWrap.appendTo(currentLocation);
  
          locationWrap = currentLocation.find('.search-bar-input-container');
  
          locationLabel.on('click', function () {
            locationLabel.fadeOut(300);
            locationWrap.fadeIn(300);
            locationWrap.find('input').val("").focus();
          });
  
          if (currentLocation.find('#input-location').val() == '') {
            locationLabel.click();
          } else {
            locationLabel.find('span').text(currentLocation.find('#input-location').val());
          }
        },
        getIndustry: function getIndustry() {
          var industrySelect = $('#input-industry-selector');
          var compactSelect = $('.AC018_industry select');
          var subIndSelect = $('.AC018_sub-industry select');
          var industryModal = void 0;
  
          poller([function () {
            industrySelect.click();
            if ($('#industry-modal-container .col-lg-3 .category-container').length > 0) {
              return true;
            }
          }], function () {
            poller(['#industry-modal-container', '#industry-modal-container .col-lg-3 .category-heading', '#industry-modal-container .col-lg-3 .category-container'], function () {
              industryModal = $('#industry-modal-container');
              industryModal.find('.col-lg-3 .category-heading').each(function () {
                var el = $(this),
                    elText = el.text(),
                    optionWrap = el.next('.category-container');
  
                compactSelect.append('<optgroup label="' + elText + '"></optgroup>');
  
                var compactOptgroup = compactSelect.find('optgroup:last-child');
  
                optionWrap.find('.industry-choice').each(function () {
                  var el = $(this),
                      elData = el.attr('data-value'),
                      elText = el.text();
  
                  compactOptgroup.append('<option value="' + elData + '">' + elText + '</option>');
                });
  
                cacheDom.prevOption = $('#input-skill-selector-dropdown .dropdown-option:first-child').text();
              });
  
              var sub = window.location.search;
              var subStr = sub.match("&industry=(.*)&skill");
  
              if (subStr == null) {
                if (industrySelect.find('.option-text').length > 0) {
                  var indText = $.trim(industrySelect.find('> .dropdown-icon-container').text());
  
                  compactSelect.find("option:contains('" + indText + "')").attr('selected', 'selected');
                } else {
                  $('.AC018_industry select > option:first-child').attr('selected', 'selected');
                }
              } else {
                $('.AC018_industry select option[value="' + subStr[1] + '"]').attr('selected', 'selected');
              }
              $('.AC018_industry select').trigger('change');
            });
          }, {
            wait: 200
          });
  
          compactSelect.on('change', function () {
            var el = $(this),
                elOption = el.find('option:selected'),
                elData = elOption.val();
  
            if (elOption.is(el.find('> option'))) {
              subIndSelect.empty();
              subIndSelect.append('<option>Main Industry Only</option>');
              subIndSelect.find('option').attr('selected', 'selected');
              subIndSelect.trigger('change');
            } else {
              if (industryModal) {
                industryModal.find('.col-lg-3 .industry-choice[data-value="' + elData + '"]').click();
                clearTimeout(cacheDom.subTimeout);
                searchBuilder.getSubIndustry();
              }
            }
          });
        },
        getSubIndustry: function getSubIndustry() {
          function checkOptions() {
            cacheDom.subTimeout();
          }
          checkOptions();
        },
        subIndustryClick: function subIndustryClick() {
          var newSubSelect = $('.AC018_sub-industry select');
  
          newSubSelect.on('change', function () {
            var el = $(this),
                elOption = el.find('option:selected'),
                elData = elOption.val();
  
            if (elOption.text() == 'Please select an Industry') {} else {
              $('#input-skill-selector-dropdown .dropdown-option[data-value="' + elData + '"]').click();
            }
          });
        },
        getOrderBy: function getOrderBy() {
          var orderSelect = $('#input-order-selector-dropdown');
          var orderSpecialist = orderSelect.find('.dropdown-option[data-value="standard"]');
          var orderCover = orderSelect.find('.dropdown-option[data-value="covers"]');
  
          var orderOptionsWrap = $('.AC018_order_radio-wrap');
          var orderOptions = orderOptionsWrap.find('.AC018_order_radio');
  
          orderCover.click();
  
          orderOptions.on('click', function () {
            var el = $(this);
            if (el.hasClass('AC018_active')) {
            } else {
              if (el.hasClass('AC018_special-option')) {
                orderSpecialist.click();
              } else if (el.hasClass('AC018_cover-option')) {
                orderCover.click();
              }
  
              orderOptions.removeClass('AC018_active');
              el.addClass('AC018_active');
            }
          });
        },
        getUserType: function getUserType() {
          var userType = $('#input-user-type-selector');
          var candOption = userType.find('.dropdown-option[data-value="cnd"]');
          var empOption = userType.find('.dropdown-option[data-value="emp"]');
          var neitherOption = userType.find('.dropdown-option[data-value="neither"]');
  
          var userRadioWrap = $('.AC018_looking-for');
          var newOptions = userRadioWrap.find('.AC018_refine_radio-wrap');
          var newAllOption = userRadioWrap.find('.AC018_all-option');
  
          neitherOption.click();
  
          newOptions.on('click', function () {
            var el = $(this);
            if (el.hasClass('AC018_active')) {
            } else {
              if (el.hasClass('AC018_all-option')) {
                neitherOption.click();
              } else if (el.hasClass('AC018_emp-option')) {
                empOption.click();
              } else if (el.hasClass('AC018_cnd-option')) {
                candOption.click();
              }
  
              newOptions.removeClass('AC018_active');
              el.addClass('AC018_active');
            }
          });
        },
        submitButton: function submitButton() {
          var submitBtn = $('.search-bar-button-inline');
          var indSelect = $('.AC018_industry select');
  
          $('.AC018_refine-cta').on('click', function () {
            if (indSelect.val().toLowerCase().indexOf('please select an industry') > -1) {
              indSelect.parent().addClass('AC018_error');
              $('.AC018_refine-error').show();
            } else {
              submitBtn.click();
            }
          });
        }
      };
  
      var defaultSearchOptions = {
        url: function url() {
          var URLQuery = window.location.search;
  
          if (URLQuery.indexOf('&emp_cand=emp') > -1) {
            $('.AC018_emp-option').click();
          } else if (URLQuery.indexOf('&emp_cand=cnd') > -1) {
            $('.AC018_cnd-option').click();
          }
          if (URLQuery.indexOf('&order=standard') > -1) {
            $('.AC018_special-option').click();
          } else {
            $('.AC018_all-option').click();
          }
        }
      };
  
      var load = {
        itemFade: function itemFade() {
          setTimeout(function () {
            $('#search-results-container').fadeIn(function () {
              $(this).addClass('AC018_active');
            });
          }, 500);
        }
      };
  
      function hideAgencies() {
        var allAgencies = doc.querySelectorAll('#search-results-container .agency-result');
  
        allAgencies[2].insertAdjacentHTML('afterend', '<div class="AC022_exra-agencies"></div><div class="AC022_refine-btn-wrap"><a class="AC022_reveal-agencies">Load More<br /> Recruitment Agencies</a><a class="AC022_page-top">Narrow your search</a><div>');
        allAgencies.forEach(function (el, index) {
          if (index > 2) {
            doc.querySelector('.AC022_exra-agencies').appendChild(el);
          }
        });
  
        $('.AC022_reveal-agencies').on('click', function () {
          $('.AC022_refine-btn-wrap').slideUp().off('click');
          $('.AC022_exra-agencies').slideDown();
        });
  
        $('.AC022_page-top').on('click', function () {
          $('.AC018_refine-mb').click();
        });
      }
  
      function revealOffices() {
        $('.AC022_view-wrap a').on('click', function () {
          var el = $(this);
          var elWrap = el.closest('.col-md-4');
          var offices = elWrap.find('.agency-address-line');
  
          el.toggleClass('AC022_hide-offices');
          offices.slideToggle();
        });
      }
  
      function addJobRole() {
        var jobBtn = $('.AC022_add-role');
        var subInd = $('.AC018_sub-industry');
  
        if (jobBtn.length > 0) {
          jobBtn.on('click', function () {
            subInd.addClass('AC022_glow');
            cacheDom.bodyVar.classList.add('AC018_refine-reveal');
          });
  
          subInd.on('click', function () {
            subInd.removeClass('AC022_glow');
          });
        }
      }
  
      function addLocation() {
        var locBtn = $('.AC022_add-loc');
        var locInput = $('.AC018_location-check .search-bar-input-container');
  
        if (locBtn.length > 0) {
          locBtn.on('click', function () {
            locInput.addClass('AC022_glow');
            cacheDom.bodyVar.classList.add('AC018_refine-reveal');
          });
  
          locInput.find('input').on('focus', function () {
            locInput.removeClass('AC022_glow');
          });
        }
      }
  
      function stickyRefine() {
        $('.AC018_refine-sticky-btn').on('click', function () {
          $('.AC018_refine-mb').click();
        });
        $(window).on('scroll', function () {
          var top = $(window).scrollTop(),
              divBottom = $('.AC018_refine-mb').offset().top + $('.AC018_refine-mb').outerHeight();
          if (divBottom > top) {
            cacheDom.bodyVar.classList.remove('AC018_refine-sticky');
          } else {
            cacheDom.bodyVar.classList.add('AC018_refine-sticky');
          }
        });
      }
  
      header.contentBuilder();
      URLChecker.run();
      search.contentBuilder();
  
      readMore.clickBinding();
      readLess.clickBinding();
  
      selectBox.run();
  
      search.moveElements();
  
      favourite.clickBinding();
  
      searchBuilder.getLocation();
  
      searchBuilder.getUserType();
  
      searchBuilder.getOrderBy();
  
      searchBuilder.getIndustry();
  
      searchBuilder.subIndustryClick();
  
      searchBuilder.submitButton();
  
      defaultSearchOptions.url();
  
      load.itemFade();
  
      search.bindClick();
  
      hideAgencies();
      revealOffices();
      addJobRole();
      addLocation();
      stickyRefine();
    }
  }();
};
export default AC022m;
