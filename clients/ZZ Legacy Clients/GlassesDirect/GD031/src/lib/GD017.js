/* eslint-disable */
export default () => {
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    var time = void 0;
    var pollForElement = function pollForElement(condition, time) {
      if (timeout && now() > timeout) {
        return false;
      }
      time = time || wait;

      var conditionIsTrue = function () {
        var type = typeof condition === 'undefined' ? 'undefined' : _typeof(condition);
        var toReturn = void 0;

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


  function offersNav(offersContent) {
    var content = '<li class="item-level-1 nav-2for1 full-width">\n    <a href="/help-me-choose/" class="no-pointer-events">2 For 1 & Offers</a>\n    <div class="list-container-level-2">\n      <div class="GD017_container">\n        <div class="GD017_offers-block">\n          <label>Offers for him</label>\n          <ul>\n            <li><a href="/gender/male/popular/2-for-1-from-49/">2 for 1 from \xA349</a></li>\n            <li><a href="/gender/male/is_boutique/true/">2 for 1 Designer Glasses</a></li>\n            <li><a href="/gender/male/price/19:59/">Free Home Trial</a></li>\n          </ul>\n        </div>\n        <div class="GD017_offers-block">\n          <label>Offers for her</label>\n          <ul>\n            <li><a href="/gender/female/popular/2-for-1-from-49/">2 for 1 from \xA349</a></li>\n            <li><a href="/gender/female/is_boutique/true/">2 for 1 Designer Glasses</a></li>\n            <li><a href="/gender/female/price/19:59/">Free Home Trial</a></li>\n          </ul>\n        </div>\n        <div class="GD017_hero-banner-wrap">\n          <a href="' + offersContent[0].href + '" style="background-image: url(\'' + offersContent[0].img + '\');" class="GD017_hero-banner"></a>\n        </div>\n        <div class="GD017_offer-banners">\n          <a href="' + offersContent[1].href + '" style="background-image: url(\'' + offersContent[1].img + '\');" class="GD017_banner"></a>\n          <a href="' + offersContent[2].href + '" style="background-image: url(\'' + offersContent[2].img + '\');" class="GD017_banner"></a>\n        </div>\n      </div>\n    </div>\n    </li>';

    return content;
  }

  var helpTab = '\n  <div class="GD017_container GD017_no-rel">\n    <div class="GD017_help-wrap">\n      <div class="GD017_help-item">\n        <a href="/help/face-shapes/">Face Shape Advice</a>\n      </div>\n      <div class="GD017_help-item">\n        <a href="/best-fit/">Best Fit Machine</a>\n      </div>\n      <div class="GD017_help-item">\n        <a href="/style-finder/">Style Finder</a>\n      </div>\n      <div class="GD017_help-item">\n        <a href="/ditto-how-to/">Virtual Try-On</a>\n      </div>\n      <div class="GD017_help-item">\n        <a href="/free-home-trial/">Free Home Trial</a>\n      </div>\n      <div class="GD017_help-item">\n        <a href="/freepair/">Free Second Pair</a>\n      </div>\n      <div class="GD017_help-item">\n        <a href="https://blog.glassesdirect.co.uk/">Blog</a>\n      </div>\n      <div class="GD017_help-item GD017_reveal-hover">\n        <a href="/help">FAQs</a>\n      </div>\n      <div class="GD017_reveal-ds">\n        <a href="/help/returns-policy/" class="GD017_help-item">Free returns</a>\n        <a href="/help/delivery-times/" class="GD017_help-item">Delivery</a>\n        <a href="/help/understanding-your-prescription/" class="GD017_help-item">About Prescription</a>\n        <a href="/seeing-clearly/about-eye-tests/" class="GD017_help-item">About Eye Tests</a>\n        <a href="/help/lens-options-and-coatings/" class="GD017_help-item">Lens Options</a>\n        <a href="/reglaze/" class="GD017_help-item">New Lenses in your Glasses</a>\n        <a href="/help" class="GD017_help-item">All FAQs</a>\n      </div>\n    </div>\n   </div>\n';

  var maleTab = '\n  <div class="GD017_container GD017_male-wrap">\n    <div class="GD017_img-wrap">\n      <div class="GD017_img-block">\n        <a href="/gender/male/popular/2-for-1-from-49/" class="GD017_img-link">\n          <img src="//dd6zx4ibq538k.cloudfront.net/static/images/3113/f8466ed7281339439ecdd8aefd26d7ea_500_500.jpeg" />\n          <label>Premium</label>\n        </a>\n        <span>Great quality! 2 for 1 frames from \xA349</span>\n      </div>\n      <div class="GD017_img-block">\n        <a href="/gender/male/is_boutique/true/" class="GD017_img-link">\n          <img src="//dd6zx4ibq538k.cloudfront.net/static/images/3113/444c29d7724c0c847da6d04fd144a091_500_500.jpeg" />\n          <label>Designer Boutique</label>\n        </a>\n        <span>Glasses from iconic brands from \xA369</span>\n      </div>\n      <div class="GD017_img-block">\n        <a href="/gender/male/price/19:59/" class="GD017_img-link">\n          <img src="//dd6zx4ibq538k.cloudfront.net/static/images/3113/7a67c67beaf16befd1a62ad87aed02b5_500_500.jpeg" />\n          <label>Value</label>\n        </a>\n        <span>Your everyday frame from \xA320</span>\n      </div>\n    </div>\n    <div class="GD017_link-wrap">\n      <div class="GD017_link-inner">\n        <div class="GD017_help-item GD017_reveal-hover">\n          <a href="#">Shop by Shape</a>\n        </div>\n        <div class="GD017_reveal-ds GD017_shape-wrap">\n          <a href="/gender/male/frameshape/rectangle/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>\n          <a href="/gender/male/frameshape/round/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-round"></span> Round</a>\n          <a href="/gender/male/frameshape/oval/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>\n          <a href="/gender/male/frameshape/wayfarer/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>\n          <a href="/gender/male/frameshape/aviator/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>\n          <a href="/gender/male/" class="GD017_shape-item"><span class="GD017_ellip"></span>All Shapes</a>\n        </div>\n        <div class="GD017_help-item GD017_reveal-hover">\n          <a href="#">Shop by Brand</a>\n        </div>\n        <div class="GD017_reveal-ds">\n          <a href="/gender/male/brand/ray-ban/" class="GD017_help-item">Ray-Ban</a>\n          <a href="/gender/male/brand/london-retro/" class="GD017_help-item">London Retro</a>\n          <a href="/gender/male/brand/oakley" class="GD017_help-item">Oakley</a>\n          <a href="/gender/male/brand/scout/" class="GD017_help-item">Scout</a>\n          <a href="/gender/male/brand/harrington/" class="GD017_help-item">Harrington</a>\n          <a href="/gender/male/brand/glasses-direct/" class="GD017_help-item">Glasses Direct Collection</a>\n          <a href="/gender/male/" class="GD017_help-item GD017_last-item">All Brands</a>\n        </div>\n        <div class="GD017_help-item GD017_reveal-hover">\n          <a href="#">Shop by Price</a>\n        </div>\n        <div class="GD017_reveal-ds">\n          <a href="/gender/male/price/20:59/" class="GD017_help-item">\xA320-\xA359</a>\n          <a href="/gender/male/price/59:89/" class="GD017_help-item">\xA359-\xA389</a>\n          <a href="/gender/male/price/89:119/" class="GD017_help-item">\xA389-\xA3119</a>\n          <a href="/gender/male/price/119:249/" class="GD017_help-item">\xA3119-249</a>\n        </div>\n        <div class="GD017_help-item">\n          <a href="/gender/male/">All men\'s frames</a>\n        </div>\n        <div class="GD017_help-item">\n          <a href="/gender/male/?aspect=sun">Sunglasses</a>\n        </div>\n        <div class="GD017_help-item">\n          <a href="/reglaze/">Reglaze your glasses</a>\n        </div>\n      </div>\n    </div>\n  </div>\n';

  var femaleTab = '\n  <div class="GD017_container GD017_male-wrap">\n    <div class="GD017_img-wrap">\n      <div class="GD017_img-block">\n        <a href="/gender/female/popular/2-for-1-from-49/" class="GD017_img-link">\n          <img src="//dd6zx4ibq538k.cloudfront.net/static/images/3113/f8466ed7281339439ecdd8aefd26d7ea_500_500.jpeg" />\n          <label>Premium</label>\n        </a>\n        <span>Great quality! 2 for 1 frames from \xA349</span>\n      </div>\n      <div class="GD017_img-block">\n        <a href="/gender/female/is_boutique/true/" class="GD017_img-link">\n          <img src="//dd6zx4ibq538k.cloudfront.net/static/images/3113/444c29d7724c0c847da6d04fd144a091_500_500.jpeg" />\n          <label>Designer Boutique</label>\n        </a>\n        <span>Glasses from iconic brands from \xA369</span>\n      </div>\n      <div class="GD017_img-block">\n        <a href="/gender/female/price/19:59/" class="GD017_img-link">\n          <img src="//dd6zx4ibq538k.cloudfront.net/static/images/3113/7a67c67beaf16befd1a62ad87aed02b5_500_500.jpeg" />\n          <label>Value</label>\n        </a>\n        <span>Your everyday frame from \xA320</span>\n      </div>\n    </div>\n    <div class="GD017_link-wrap">\n      <div class="GD017_link-inner">\n        <div class="GD017_help-item GD017_reveal-hover">\n          <a href="#">Shop by Shape</a>\n        </div>\n        <div class="GD017_reveal-ds GD017_shape-wrap">\n          <a href="/gender/female/frameshape/rectangle/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>\n          <a href="/gender/female/frameshape/round/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-round"></span> Round</a>\n          <a href="/gender/female/frameshape/oval/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>\n          <a href="/gender/female/frameshape/wayfarer/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>\n          <a href="/gender/female/frameshape/aviator/" class="GD017_shape-item"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>\n          <a href="/gender/female/" class="GD017_shape-item"><span class="GD017_ellip"></span>All Shapes</a>\n        </div>\n        <div class="GD017_help-item GD017_reveal-hover">\n          <a href="#">Shop by Brand</a>\n        </div>\n        <div class="GD017_reveal-ds">\n          <a href="/gender/female/brand/ray-ban/" class="GD017_help-item">Ray-Ban</a>\n          <a href="/gender/female/brand/london-retro/" class="GD017_help-item">London Retro</a>\n          <a href="/gender/female/brand/oakley" class="GD017_help-item">Oakley</a>\n          <a href="/gender/female/brand/scout/" class="GD017_help-item">Scout</a>\n          <a href="/gender/female/brand/harrington/" class="GD017_help-item">Harrington</a>\n          <a href="/gender/female/brand/glasses-direct/" class="GD017_help-item">Glasses Direct Collection</a>\n          <a href="/gender/female/" class="GD017_help-item GD017_last-item">All Brands</a>\n        </div>\n        <div class="GD017_help-item GD017_reveal-hover">\n          <a href="#">Shop by Price</a>\n        </div>\n        <div class="GD017_reveal-ds">\n          <a href="/gender/female/price/20:59/" class="GD017_help-item">\xA320-\xA359</a>\n          <a href="/gender/female/price/59:89/" class="GD017_help-item">\xA359-\xA389</a>\n          <a href="/gender/female/price/89:119/" class="GD017_help-item">\xA389-\xA3119</a>\n          <a href="/gender/female/price/119:249/" class="GD017_help-item">\xA3119-249</a>\n        </div>\n        <div class="GD017_help-item">\n          <a href="/gender/female/">All women\'s frames</a>\n        </div>\n        <div class="GD017_help-item">\n          <a href="/gender/female/?aspect=sun">Sunglasses</a>\n        </div>\n        <div class="GD017_help-item">\n          <a href="/reglaze/">Reglaze your glasses</a>\n        </div>\n      </div>\n    </div>\n  </div>\n';

  function offersNavMB(offersContent) {
    var content = '\n    <div class="GD017_nav-item GD017_male-tab">\n    <a class="GD017_nav-link GD017_reveal-more">Men</a>\n    <div class="GD017_reveal">\n      <a href="/gender/male/popular/2-for-1-from-49/" class="GD017_nav-link GD017_strapline">\n        <strong>Premium</strong>\n        <span class="GD017_strap">Great quality! 2 for 1 frames from \xA349</span>\n      </a>\n      <a href="/gender/male/is_boutique/true/" class="GD017_nav-link GD017_strapline">\n        <strong>Designer Boutique</strong>\n        <span class="GD017_strap">Glasses from iconic brands from \xA369</span>\n      </a>\n      <a href="/gender/male/price/19:59/" class="GD017_nav-link GD017_strapline">\n        <strong>Value</strong>\n        <span class="GD017_strap">Your everyday frame from \xA320</span>\n      </a>\n      <a class="GD017_nav-link GD017_dd-button">Shop by Shape</a>\n      <div class="GD017_dd-content GD017_shape-wrap">\n        <a href="/gender/male/frameshape/rectangle/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>\n        <a href="/gender/male/frameshape/round/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-round"></span> Round</a>\n        <a href="/gender/male/frameshape/oval/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>\n        <a href="/gender/male/frameshape/wayfarer/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>\n        <a href="/gender/male/frameshape/aviator/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>\n        <a href="/gender/male/" class="GD017_nav-link"><span class="GD017_ellip"></span>All Shapes</a>\n      </div>\n      <a class="GD017_nav-link GD017_dd-button">Shop by Brand</a>\n      <div class="GD017_dd-content">\n        <a href="/gender/male/brand/ray-ban/" class="GD017_nav-link">Ray-Ban</a>\n        <a href="/gender/male/brand/london-retro/" class="GD017_nav-link">London Retro</a>\n        <a href="/gender/male/brand/oakley" class="GD017_nav-link">Oakley</a>\n        <a href="/gender/male/brand/scout/" class="GD017_nav-link">Scout</a>\n        <a href="/gender/male/brand/harrington/" class="GD017_nav-link">Harrington</a>\n        <a href="/gender/male/brand/glasses-direct/" class="GD017_nav-link">Glasses Direct Collection</a>\n        <a href="/gender/male/" class="GD017_nav-link">All Brands</a>\n      </div>\n      <a class="GD017_nav-link GD017_dd-button">Shop by Price</a>\n      <div class="GD017_dd-content">\n        <a href="/gender/male/price/20:59/" class="GD017_nav-link">\xA320-\xA359</a>\n        <a href="/gender/male/price/59:89/" class="GD017_nav-link">\xA359-\xA389</a>\n        <a href="/gender/male/price/89:119/" class="GD017_nav-link">\xA389-\xA3119</a>\n        <a href="/gender/male/price/119:249/" class="GD017_nav-link">\xA3119-249</a>\n      </div>\n      <a href="/gender/male/" class="GD017_nav-link">All Men\'s Frames</a>\n      <a href="/reglaze/" class="GD017_nav-link">Reglaze Your Glasses</a>\n    </div>\n    </div>\n    <div class="GD017_nav-item GD017_female-tab">\n      <a class="GD017_nav-link GD017_reveal-more">Women</a>\n      <div class="GD017_reveal">\n        <a href="/gender/female/popular/2-for-1-from-49/" class="GD017_nav-link GD017_strapline">\n          <strong>Premium</strong>\n          <span class="GD017_strap">Great quality! 2 for 1 frames from \xA349</span>\n        </a>\n        <a href="/gender/female/is_boutique/true/" class="GD017_nav-link GD017_strapline">\n          <strong>Designer Boutique</strong>\n          <span class="GD017_strap">Glasses from iconic brands from \xA369</span>\n        </a>\n        <a href="/gender/female/price/19:59/" class="GD017_nav-link GD017_strapline">\n          <strong>Value</strong>\n          <span class="GD017_strap">Your everyday frame from \xA320</span>\n        </a>\n        <a class="GD017_nav-link GD017_dd-button">Shop by Shape</a>\n        <div class="GD017_dd-content GD017_shape-wrap">\n          <a href="/gender/female/frameshape/rectangle/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-rectangle"></span> Rectangular</a>\n          <a href="/gender/female/frameshape/round/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-round"></span> Round</a>\n          <a href="/gender/female/frameshape/oval/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-oval"></span> Oval</a>\n          <a href="/gender/female/frameshape/wayfarer/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-wayfarer"></span> Wayfarer</a>\n          <a href="/gender/female/frameshape/aviator/" class="GD017_nav-link"><span class="facet__icon icon icon-shape-aviator"></span> Aviator</a>\n          <a href="/gender/female/" class="GD017_nav-link"><span class="GD017_ellip"></span>All Shapes</a>\n        </div>\n        <a class="GD017_nav-link GD017_dd-button">Shop by Brand</a>\n        <div class="GD017_dd-content">\n          <a href="/gender/female/brand/ray-ban/" class="GD017_nav-link">Ray-Ban</a>\n          <a href="/gender/female/brand/london-retro/" class="GD017_nav-link">London Retro</a>\n          <a href="/gender/female/brand/oakley" class="GD017_nav-link">Oakley</a>\n          <a href="/gender/female/brand/scout/" class="GD017_nav-link">Scout</a>\n          <a href="/gender/female/brand/harrington/" class="GD017_nav-link">Harrington</a>\n          <a href="/gender/female/brand/glasses-direct/" class="GD017_nav-link">Glasses Direct Collection</a>\n          <a href="/gender/female/" class="GD017_nav-link">All Brands</a>\n        </div>\n        <a class="GD017_nav-link GD017_dd-button">Shop by Price</a>\n        <div class="GD017_dd-content">\n          <a href="/gender/female/price/20:59/" class="GD017_nav-link">\xA320-\xA359</a>\n          <a href="/gender/female/price/59:89/" class="GD017_nav-link">\xA359-\xA389</a>\n          <a href="/gender/female/price/89:119/" class="GD017_nav-link">\xA389-\xA3119</a>\n          <a href="/gender/female/price/119:249/" class="GD017_nav-link">\xA3119-249</a>\n        </div>\n        <a href="/gender/female/" class="GD017_nav-link">All Women\'s Frames</a>\n        <a href="/reglaze/" class="GD017_nav-link">Reglaze Your Glasses</a>\n      </div>\n    </div>\n    <div class="GD017_nav-item GD017_offers-tab">\n      <a class="GD017_nav-link GD017_reveal-more">2-for-1 & Offers</a>\n      <div class="GD017_reveal">\n        <a href="/popular/2-for-1-from-49/" class="GD017_nav-link">2-for-1 from \xA349</a>\n        <a href="/popular/2-for-1-designer/" class="GD017_nav-link">2-for-1 from \xA369</a>\n        <a href="/freepair/" class="GD017_nav-link">Free Home Trial</a>\n        <a href="' + offersContent[0].href + '" class="GD017_nav-link GD017_offer-link"><img src="' + offersContent[0].img + '" /></a>\n        <a href="' + offersContent[1].href + '" class="GD017_nav-link GD017_offer-link"><img src="' + offersContent[1].img + '" /></a>\n        <a href="' + offersContent[2].href + '" class="GD017_nav-link GD017_offer-link"><img src="' + offersContent[2].img + '" /></a>\n      </div>\n    </div>\n    <div class="GD017_nav-item GD017_helpme-tab">\n      <a class="GD017_nav-link GD017_reveal-more">Help Me Choose</a>\n      <div class="GD017_reveal">\n        <a href="/help/face-shapes/" class="GD017_nav-link">Face Shape Advice</a>\n        <a href="/best-fit/" class="GD017_nav-link">Best Fit Machine</a>\n        <a href="/style-finder/" class="GD017_nav-link">Style Finder</a>\n        <a href="/ditto-how-to/" class="GD017_nav-link">Virtual Try-On</a>\n        <a href="/free-home-trial/" class="GD017_nav-link">Free Home Trial</a>\n        <a href="/freepair/" class="GD017_nav-link">Free Second Pair</a>\n        <a href="https://blog.glassesdirect.co.uk/" class="GD017_nav-link">Blog</a>\n      </div>\n    </div>\n    <div class="GD017_nav-item GD017_FAQS">\n      <a class="GD017_nav-link GD017_reveal-more">FAQs</a>\n      <div class="GD017_reveal">\n        <a href="/help/returns-policy/" class="GD017_nav-link">Free Returns</a>\n        <a href="/help/delivery-times/" class="GD017_nav-link">Delivery</a>\n        <a href="/help/understanding-your-prescription/" class="GD017_nav-link">About Prescription</a>\n        <a href="/seeing-clearly/about-eye-tests/" class="GD017_nav-link">About Eye Tests</a>\n        <a href="/help/lens-options-and-coatings/" class="GD017_nav-link">Lens Options</a>\n        <a href="/reglaze/" class="GD017_nav-link">New Lenses in your Glasses</a>\n        <a href="/help/" class="GD017_nav-link">All FAQs</a>\n      </div>\n    </div>\n  ';

    return content;
  }


  var Run = function Run() {
    var $ = null;
    var slideQ = false;
    var Exp = {
      settings: {
        ID: 'GD017',
        VARIATION: '1'
      },
      cache: function () {
        var doc = document;
        var bodyVar = doc.body;
        var navList = doc.getElementById('nav-primary-inner');

        return {
          doc: doc,
          bodyVar: bodyVar,
          navList: navList
        };
      }(),
      init: function init() {
        var services = Exp.services,
            settings = Exp.settings,
            components = Exp.components;


        Exp.cache.bodyVar.classList.add(settings.ID);
        services.tracking();

        components.contentBuilder();

      },
      services: {
        tracking: function tracking() {
          var settings = Exp.settings;

          fullStory(settings.ID, 'Variation ' + settings.VARIATION);
          events.send(settings.ID, 'View', settings.ID + ' activated - Variation ' + settings.VARIATION);
        },
        findEl: function findEl(element, target) {
          var current = element;
          while (!current.classList.contains(target)) {
            current = current.parentNode;
            if (!current.parentNode) {
              return false;
            } else if (current.classList.contains(target)) {
              return current;
            }
          }
        }
      },
      components: {
        getOffers: function getOffers() {
          var sessionCheck = sessionStorage.getItem('GD017_offers');
          var UV = window.location.pathname;

          if (sessionCheck) {
            return JSON.parse(sessionCheck);
          } else if (UV == "/") {
            var banner1Href = Exp.cache.doc.getElementById('GD_1_banner_a');
            if (banner1Href) {
              banner1Href = banner1Href.href;
            }
            var banner1Img = Exp.cache.doc.getElementById('GD_1_banner_img');
            if (banner1Img) {
              banner1Img = banner1Img.src;
            }
            var banner2Href = Exp.cache.doc.getElementById('GD_2_banner_a');
            if (banner2Href) {
              banner2Href = banner2Href.href;
            }
            var banner2Img = Exp.cache.doc.getElementById('GD_2_banner_img');
            if (banner2Img) {
              banner2Img = banner2Img.src;
            }
            var banner3Href = Exp.cache.doc.getElementById('GD_3_banner_a');
            if (banner3Href) {
              banner3Href = banner3Href.href;
            }
            var banner3Img = Exp.cache.doc.getElementById('GD_3_banner_img');
            if (banner3Img) {
              banner3Img = banner3Img.src;
            }
            var offerArr = [{
              href: banner1Href,
              img: banner1Img
            }, {
              href: banner2Href,
              img: banner2Img
            }, {
              href: banner3Href,
              img: banner3Img
            }];

            sessionStorage.setItem('GD017_offers', JSON.stringify(offerArr));
            return offerArr;
          } else {
            var _offerArr = [{
              href: 'https://www.glassesdirect.co.uk/help/lens-options-and-coatings/',
              img: '//dd6zx4ibq538k.cloudfront.net/static/images/3113/f0a4159b413a68c3d0e819fea2d9e7e1_800_331.jpeg'
            }, {
              href: 'https://www.glassesdirect.co.uk/free-home-trial/',
              img: '//dd6zx4ibq538k.cloudfront.net/static/images/3113/3ff831a0e71819d556f5e287c126c2bd_800_331.jpeg'
            }, {
              href: 'https://www.glassesdirect.co.uk/popular/2-for-1-from-49/is_boutique/false/',
              img: '//dd6zx4ibq538k.cloudfront.net/static/images/3113/3e7d6e38705793b462dd72f532d4d9ab_698_399.jpeg'
            }];
            return _offerArr;
          }
        },
        contentBuilder: function contentBuilder() {
          var navItems = Exp.cache.navList.querySelectorAll('.list-container-level-2');
          var helpTabOld = Exp.cache.navList.querySelector('.nav-help.item-level-1');

          if (helpTabOld.classList.contains('expand-left')) {
            helpTabOld.classList.remove('expand-left');
          }
          helpTabOld.classList.add('expand-right');

          [].forEach.call(navItems, function (item) {
            if (item.parentNode.classList.contains('nav-help')) {
              item.innerHTML = helpTab;
            } else if (item.parentNode.classList.contains('nav-men')) {
              item.innerHTML = maleTab;
            } else if (item.parentNode.classList.contains('nav-women')) {
              item.innerHTML = femaleTab;
            } else {
              var oldMarkup = item.innerHTML;
              var newMarkup = '<div class="GD017_container">' + oldMarkup + '</div>';

              item.classList.add('GD017_container-table');
              item.innerHTML = newMarkup;
            }
          });
          
          if (!document.querySelector('.GD017_container')) {
            Exp.cache.bodyVar.querySelector('.item-level-1.nav-help').insertAdjacentHTML('beforebegin', offersNav(Exp.components.getOffers()));
          }
        },
        contentBuilderMB: function contentBuilderMB() {
          Exp.cache.bodyVar.classList.add('GD017_mobile');
          var navItems = Exp.cache.navList.querySelectorAll('.list-container-level-2');
          var teleItem = Exp.cache.bodyVar.querySelector('#nav-secondary .contact-phone.menu-item');

          [].forEach.call(navItems, function (item) {
            var oldMarkup = item.innerHTML;
            var newMarkup = '<div class="GD017_container">' + oldMarkup + '</div>';

            item.classList.add('GD017_container-table');
            item.innerHTML = newMarkup;
          });

          Exp.cache.navList.insertAdjacentHTML('afterend', offersNavMB(Exp.components.getOffers()));
          Exp.cache.doc.getElementById('nav-primary').insertAdjacentHTML('beforebegin', '<a class="GD017_close-nav"></a>');

          teleItem.insertAdjacentHTML('beforebegin', '\n          <li class="GD017_lower-nav-item menu-item GD017-no-border"><a href="/share">Invite a friend, Share \xA345</a></li>\n        ');
          teleItem.insertAdjacentHTML('afterend', '\n          <li class="GD017_lower-nav-item menu-item GD017_login-btn"><a href="/login">Login</a></li>\n        ');
        },
        mobileBindings: function mobileBindings() {
          $ = window.jQuery;
          var closeBtn = Exp.cache.doc.getElementById('nav-toggle');

          Exp.cache.doc.getElementById('nav-primary').addEventListener('click', function (e) {
            if (slideQ === false) {
              var elTarget = e.target;
              var contentReveal = $(elTarget.nextElementSibling);
              if (elTarget.classList.contains('GD017_reveal-more')) {
                slideQ = true;

                if (elTarget.classList.contains('GD017_active')) {
                  elTarget.classList.remove('GD017_active');
                  contentReveal.slideUp(function () {
                    slideQ = false;
                  });
                } else {
                  elTarget.classList.add('GD017_active');
                  contentReveal.slideDown(function () {
                    slideQ = false;
                  });
                }
              } else if (elTarget.classList.contains('GD017_dd-button')) {
                slideQ = true;

                if (elTarget.classList.contains('GD017_active')) {
                  elTarget.classList.remove('GD017_active');
                  contentReveal.slideUp(function () {
                    slideQ = false;
                  });
                } else {
                  elTarget.classList.add('GD017_active');
                  contentReveal.slideDown(function () {
                    slideQ = false;
                  });
                }
              }
            }
          });

          Exp.cache.bodyVar.querySelector('.GD017_close-nav').addEventListener('click', function (e) {
            closeBtn.click();
          });
        },
        navTracking: function navTracking() {
          var services = { Exp: Exp };
          Exp.cache.navList.addEventListener('click', function (e) {
            var target = e.target;
            var whichTab = services.findEl(target, 'item-level-1');
            var whichText = '';

            if (whichTab.classList.contains('nav-men')) {
              whichText = 'Male';
            } else if (whichTab.classList.contains('nav-women')) {
              whichText = 'Women';
            } else if (whichTab.classList.contains('nav-help')) {
              whichText = 'Help me choose';
            } else if (whichTab.classList.contains('nav-2for1')) {
              whichText = '2for1';
            }

            if (target.classList.contains('GD017_img-link') || target.parentNode.classList.contains('GD017_img-link')) {
              events.send(settings.ID, 'Click', target.querySelector('label').textContent + ' Label clicked in tab' + whichText);
            } else if (target.classList.contains('GD017_help-item')) {
              events.send(settings.ID, 'Click', target.textContent + ' link click in tab ' + whichText);
            } else if (target.classList.contains('GD017_shape-item')) {
              events.send(settings.ID, 'Click', target.textContent + ' shape type clicked in tab ' + whichText);
            } else if (target.classList.contains('GD017_hero-banner')) {
              events.send(settings.ID, 'Click', 'Large offer clicked in tab ' + whichText);
            } else if (target.classList.contains('GD017_banner')) {
              if (target.nextElementSibling) {
                events.send(settings.ID, 'Click', 'Small offer 1 clicked in tab ' + whichText);
              } else {
                events.send(settings.ID, 'Click', 'Small offer 2 clicked in tab ' + whichText);
              }
            } else if (target.parentNode.classList.contains('item-level-1')) {
              events.send(settings.ID, 'Click', 'Top level link clicked - ' + whichText);
            } else {
              events.send(settings.ID, 'Click', target.textContent + ' link clicked in ' + whichText);
            }
          });
        },
        navTrackingMB: function navTrackingMB() {
          var services = { Exp: Exp };
          Exp.cache.doc.getElementById('nav-primary').addEventListener('click', function (e) {
            var target = e.target;
            var whichTab = services.findEl(target, 'GD017_nav-item');

            if (whichTab.classList.contains('GD017_male-tab')) {
              whichTab = 'Male';
            } else if (whichTab.classList.contains('GD017_female-tab')) {
              whichTab = 'Women';
            } else if (whichTab.classList.contains('GD017_helpme-tab')) {
              whichTab = 'Help me choose';
            } else if (whichTab.classList.contains('GD017_offers-tab')) {
              whichTab = '2for1';
            } else if (whichTab.classList.contains('GD017_FAQS')) {
              whichTab = 'FAQS';
            }

            if (target.classList.contains('GD017_nav-link') && target.classList.contains('GD017_reveal-more')) {
              events.send(settings.ID, 'Click', target.textContent + ' tab clicked');
            } else if (target.classList.contains('GD017_strapline')) {
              events.send(settings.ID, 'Click', target.querySelector('strong').textContent + ' strapline click in tab ' + whichTab);
            } else if (target.parentNode.classList.contains('GD017_strapline')) {
              events.send(settings.ID, 'Click', target.parentNode.querySelector('strong').textContent + ' strapline click in tab ' + whichTab);
            } else if (target.parentNode.classList.contains('GD017_shape-wrap')) {
              events.send(settings.ID, 'Click', target.textContent + ' shape clicked in tab ' + whichTab);
            } else if (target.classList.contains('GD017_offer-link')) {
              events.send(settings.ID, 'Click', target.href + ' offer clicked in ' + whichTab);
            } else if (target.parentNode.classList.contains('GD017_offer-link')) {
              events.send(settings.ID, 'Click', target.parentNode.href + ' offer clicked in ' + whichTab);
            }
          });

          Exp.cache.doc.getElementById('nav-secondary').addEventListener('click', function (e) {
            var target = e.target;

            events.send(settings.ID, 'Click', target.textContent + ' clicked in secondary nav');
          });
        }
      }
    };

    Exp.init();
  };

  var URL = window.location.pathname;

  pollerLite(['#nav-primary-inner', function () {
    if (sessionStorage.getItem('GD017_offers')) {
      return true;
    } else if (URL === '/' && document.getElementById('GD_3_banner_img')) {
      return true;
    } else {
      return true;
    }
  }], Run);

};
