/* eslint-disable */
function Run(){
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
    var fullStory = function fullStory(experiment_str, variation_str) {
        poller([function () {
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
        setDefaultCategory: function setDefaultCategory(category) {
            this.category = category;

            return this;
        },
        setTrackerName: function setTrackerName(trackerName) {
            this.trackerName = trackerName;
        },
        eventCache: [],
        send: function send(category, action, label, options) {
            options = options || {};
            category = category || this.category;

            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.sendOnce) {
                var eventID = category + action + label;
                // Check eventCache to see if this has already been sent
                if (this.eventCache.indexOf(eventID) > -1) {
                    return false;
                } else {
                    // Store event in cache
                    this.eventCache.push(eventID);
                }
            }

            var self = this;
            var fire = function fire(tracker) {
                window.ga(tracker + '.send', 'event', category, action, label, { nonInteraction: options.nonInteraction ? options.nonInteraction : true });
            };

            if (self.trackerName) {
                fire(self.trackerName);
            } else {
                poller([function () {
                    try {
                        return !!window.ga.getAll();
                    } catch (err) {}
                }], function () {
                    self.trackerName = window.ga.getAll()[0].get('name');
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
    var getCookie = function(name) {
      // Get cookie helper
      var match = document.cookie.match(new RegExp('(^|;\\s?)' + name + '=([^;]*)'));
      return match && match[2] ? match[2] : undefined;
    };

    /**
     * {{WB069}} - {{Inline grid}}
     */
    var $ = window.jQuery;
    var Exp = {
      settings: {
        ID: 'WB069',
        VARIATION: '3'
      },
      cache: function () {
        var bodyVar = document.body;
        var saleBanner;
        var headerDesigners = document.querySelectorAll('#designersubmenu .span4.four-images .designer-box');
        var URL = window.location.pathname;

        return {
          bodyVar: bodyVar,
          saleBanner: saleBanner,
          URL: URL,
          headerDesigners: headerDesigners
        };
      }(),
      init: function init() {
        // Setup
        var services = Exp.services;
        var settings = Exp.settings;
        var components = Exp.components;

        Exp.cache.bodyVar.classList.add(settings.ID);
        services.tracking();

        if (settings.VARIATION === '1' && !!getCookie('WB069_email-signed-up')) {
          events.send(settings.ID, 'View', `${settings.ID} activated - Variation 1`);
          Exp.cache.saleBanner = `
          <div class="product-summary WB069_inline-email">
            <div>
              <h3>Stay in <br />the loop</h3>
              <p>Be the first to hear<br /> about new arrivals,<br /> exclusive events and<br /> early sale access</p>
              <input placeholder="Email" maxlength="74" type="email"/>
              <a class="WB069_register-inline">Sign me up</a>
              <div class="WB069_email-error">Please enter a valid email address</div>
            </div>
            <div class="WB069_thanks">
              Thank you for registering for our newsletter
            </div>
          <div/>`
          ;
          components.contentBuilder();
          components.signUpInline.inlineSignupValidation();
        } else if (settings.VARIATION === '2') {
          events.send(settings.ID, 'View', `${settings.ID} activated - Variation 2`);
          components.discoverInline.bannerMarkup();
          components.contentBuilder();
        } else if (settings.VARIATION === '3') {
          events.send(settings.ID, 'View', `${settings.ID} activated - Variation 3`);
          components.messageInline.markup();
          components.contentBuilder();
        }
      },
      services: {
        tracking: function tracking() {
          var settings = Exp.settings;
          fullStory(settings.ID, 'Variation ' + settings.VARIATION);
        },
        validateEmail: function validateEmail($email) {
          var emailReg = /^([\w-+\\/.]+@([\w-]+\.)+[\w-]{2,6})?$/;
          return $email.length > 0 && emailReg.test($email);
        },
        signUp: function signUp(email) {
          var cm = require('cookieman');
          var urlCountry = window.location.href.match(/wolfandbadger.com\/([\w]{2})\/(.*)\//)[1];
          var postURL = 'https://www.wolfandbadger.com/' + urlCountry + '/newsletter/subscribe/?next=https://www.wolfandbadger.com/' + urlCountry + '/';

          if (cm.get('csrftoken').length > 0) {
            $.ajax({
              type: 'POST',
              url: postURL,
              data: {
                csrfmiddlewaretoken: cm.get('csrftoken')[0].value,
                email: email
              }
            });
          }
        }
      },
      components: {
        contentBuilder: function contentBuilder() {
          var productsWrap = document.querySelectorAll('.product-list-container .products .product-summary')[0];
          productsWrap.insertAdjacentHTML('afterend', Exp.cache.saleBanner);
        },
        signUpInline: {
          inlineSignupValidation: function inlineSignupValidation() {
            var registerButton = $('.WB069_register-inline');
            var registerParent = registerButton.parent();
            var registerEmail = registerParent.find('input');
            var error = registerParent.find('.WB069_email-error');
            var complete = registerParent.next('.WB069_thanks');

            registerButton.on('click', function () {
              if (Exp.services.validateEmail(registerEmail.val()) === true) {
                error.hide();
                setCookie('WB069_email-signed-up', 'true', 20000000);
                registerParent.fadeOut(function () {
                  complete.fadeIn();
                });

                events.send('WB069', 'Submit Click', 'User signed up to newsletter ' + Exp.cache.URL, true);
                Exp.services.signUp(registerEmail.val());
              } else {
                error.show();
              }
            });
          }
        },
        discoverInline: {
          bannerMarkup: function contentBuilder() {
            var bannerItem = Exp.cache.headerDesigners[Math.floor(Math.random()*Exp.cache.headerDesigners.length)];
            var bannerBG = bannerItem.querySelector('a img').src;
            var bannerHref = bannerItem.querySelector('a').href;
            var bannerName = bannerItem.querySelector('.designer-name').innerText;

            Exp.cache.saleBanner = `
              <div class="product-summary WB069_inline-discover" style="background-image: url('${bannerBG}')">
                <div>
                  <div class="WB069_discover-inner">
                    <p>Introducing</p>
                    <h4>${bannerName}</h4>
                  </div>
                  <a href="${bannerHref}" class="WB069_discover-btn">Discover</a>
                </div>
              </div>`
            ;
          },
        },
        messageInline: {
          markup: function markup() {
            var contentArray = [
              'Present for my sister. They were lovely and she was over the moon. Well worth the price just to see her face alone',
              'My girlfriend loved it! She’d never seen anything like it before and it definitely made me seem cooler than I am for finding it.',
              'Material is even nicer than in picture. Gorgeous and can\'t wait to wear it',
              'Loved my first purchase from Wolf & Badger! I now have a very long list of things I would love to buy!',
              'The item is beautifully made, presented in a lovely gift box and the hand written note from the designer a wonderful touch.',
              'Super fast delivery and wonderful unique designs'
            ];

            var content = contentArray[Math.floor(Math.random()*contentArray.length)];

            Exp.cache.saleBanner = `
              <div class="product-summary WB069_inline-review">
                <span class="WB069_speech-mark WB069_left">
                  <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4068/d7b2ef72926ac5a3359fada8594da9b5_62_54.png" />
                </span>
                <p class="WB069_content">${content}</p>
                <p class="WB069_stars">
                  <span class="rating"><i class="icon icon-star rating-star"></i><i class="icon icon-star rating-star"></i><i class="icon icon-star rating-star"></i><i class="icon icon-star rating-star"></i><i class="icon icon-star rating-star"></i></span>
                  <a target="_blank" href="//www.feefo.com/en-GB/reviews/wolf-badger?withMedia=false&timeFrame=ALL&displayFeedbackType=PRODUCT&productScores=5">Review via <img src="/staticmedia/i/feefo.png" alt="Feefo Logo" /></a>
                </p>
                <span class="WB069_speech-mark WB069_right">
                  <img src="//dd6zx4ibq538k.cloudfront.net/static/images/4068/85b336ed27ed4ae1c43e5843f3417910_62_54.png" />
                </span>
              </div>`
            ;
          },
        },
      }
    };
    Exp.init();
  })();
}

export default Run;
