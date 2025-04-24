/*

  -----------------------------------------------

  THIS IS FURTHER AHEAD THAN GIT DUE TO QUBIT ONLY FUNCTIONALITY

  -----------------------------------------------

*/

/* eslint-disable */

function execution (options) {

(function() {
'use strict';

/**
 * UC Library
 * @version 0.3.5
 * @author User Conversion
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var poller = function poller(elements, cb, options) {
  var settings = {
    wait: 50,
    multiplier: 1.1,
    timeout: 0
  };

  var now = Date.now || function () {
    return new Date().getTime();
  };

  if (options) {
    // Overwrite defaults with values from options
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

/*
    GA Events helper
 */
var events = {
  trackerName: false,
  setDefaultCategory: function setDefaultCategory(category) {
    this.category = category;

    return this;
  },
  send: function send(category, action, label) {
    category = category || this.category;

    var self = this;
    var fire = function fire(tracker) {
      window.ga(tracker + '.send', 'event', category, action, label, { nonInteraction: true });
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

var modalData = {
    content: {
      uk: {
      image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/a3eefb02206fa3c42a4c6412c824c128_543_930.jpeg',
      html_right: [
        '<div class="uc9_centre uc9_top-content">',
          '<div class="uc9_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f8ee18e51f8c16e6cb421a3fc35ab3af_100_100.png" /></div>',
          '<div class="uc9_lightbox_heading">',
            'Welcome to our UK site',
          '</div>',
          '<p>Fashion this beautiful is rare,<br class="WB052_tb_hide" /> you won\'t see our designers\'<br class="WB052_tb_show" /> collections<br class="WB052_tb_hide" /> on the high street</p>',
          '<p>We\'ve curated every piece for you.</p>',
          '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn"></a></div>',
        '</div>',
        '<div class="uc9_email-wrapper">',
          '<span class="uc9_heading">Sign up to the newsletter or risk missing out on<br /> offers and product updates.</span>',
          '<div class="uc9_input-wrap uc9_centre">',
            '<input type="text" placeholder="Enter your email address" class="uc9_input uc9_small"/>',
            '<div class="uc9_send">Register</div>',
          '</div>',
        '</div>',
        '<div class="uc9_email-success">',
          'Thank you for signing up to our newsletter',
        '</div>'
      ].join(''),
      html_bottom: [
        '<hr>',
        '<div class="uc9_email-wrapper">',
          '<p>Join our gang and be the first to know about brand new designers, trends and promotions</p>',
          '<div class="uc9_input-wrap">',
            '<input type="text" placeholder="Enter your email address" class="uc9_input"/>',
            '<div class="uc9_send">Register</div>',
          '</div>',
        '</div>',
        '<div class="uc9_email-success">',
          'Thank you for signing up to our newsletter',
        '</div>'
      ].join('')
    },
      us: {
        image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/069aa86a8dd950f8dfc79e9e6196bc27_366_562.jpeg',
        html_right: [
          '<div class="uc9_centre uc9_top-content">',
              '<div class="uc9_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/b302c4e8c36d9de8fb08f1de23728e20_100_100.png" /></div>',
            '<div class="uc9_lightbox_heading">',
              'Welcome to our US site',
            '</div>',
            '<p>Fashion this beautiful is rare,<br class="WB052_tb_hide" /> you won\'t see our designers\'<br class="WB052_tb_show" /> collections<br class="WB052_tb_hide" /> on the high street</p>',
            '<p>We\'ve curated every piece for you.</p>',
            '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn"></a></div>',
          '</div>',
          '<div class="uc9_email-wrapper">',
            '<span class="uc9_heading">Sign up to the newsletter or risk missing out on<br /> offers and product updates.</span>',
            '<div class="uc9_input-wrap uc9_centre">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input uc9_small"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join(''),
        html_bottom: [
          '<hr>',
          '<div class="uc9_email-wrapper">',
            '<p>Be the first to know about new designers, trends and events</p>',
            '<div class="uc9_input-wrap">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join('')
      },
      au: {
        image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/069aa86a8dd950f8dfc79e9e6196bc27_366_562.jpeg',
        html_right: [
          '<div class="uc9_centre uc9_top-content">',
              '<div class="uc9_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/fb0a8994ab8c865f6affefde48ac5fb2_100_100.png" /></div>',
            '<div class="uc9_lightbox_heading">',
              'Welcome to our AUS site',
            '</div>',
            '<p>Fashion this beautiful is rare,<br class="WB052_tb_hide" /> you won\'t see our designers\'<br class="WB052_tb_show" /> collections<br class="WB052_tb_hide" /> on the high street</p>',
            '<p>We\'ve curated every piece for you.</p>',
            '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn"></a></div>',
          '</div>',
          '<div class="uc9_email-wrapper">',
            '<span class="uc9_heading">Sign up to the newsletter or risk missing out on<br /> offers and product updates.</span>',
            '<div class="uc9_input-wrap uc9_centre">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input uc9_small"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join(''),
        html_bottom: [
          '<hr>',
          '<div class="uc9_email-wrapper">',
            '<p>Be the first to know about new designers, trends and events</p>',
            '<div class="uc9_input-wrap">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join('')
      },
      eu: {
        image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/069aa86a8dd950f8dfc79e9e6196bc27_366_562.jpeg',
        html_right: [
          '<div class="uc9_centre uc9_top-content">',
              '<div class="uc9_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/946daef15041d8d7e288e4aedf5c648c_100_100.png" /></div>',
            '<div class="uc9_lightbox_heading">',
              'Welcome to our EU site',
            '</div>',
            '<p>Fashion this beautiful is rare,<br class="WB052_tb_hide" /> you won\'t see our designers\'<br class="WB052_tb_show" /> collections<br class="WB052_tb_hide" /> on the high street</p>',
            '<p>We\'ve curated every piece for you.</p>',
            '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn"></a></div>',
          '</div>',
          '<div class="uc9_email-wrapper">',
            '<span class="uc9_heading">Sign up to the newsletter or risk missing out on<br /> offers and product updates.</span>',
            '<div class="uc9_input-wrap uc9_centre">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input uc9_small"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join(''),
        html_bottom: [
          '<hr>',
          '<div class="uc9_email-wrapper">',
            '<p>Be the first to know about new designers, trends and events</p>',
            '<div class="uc9_input-wrap">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join('')
      },
      de: {
        image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/069aa86a8dd950f8dfc79e9e6196bc27_366_562.jpeg',
        html_right: [
          '<div class="uc9_top-bar">',
              '<div class="uc9_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/71a6c6d2ff3fea148df07a382e713b5d_100_100.png" /></div>',
              '<div class="uc9_lightbox_heading">',
                'Willkommen auf unserer Website!',
              '</div>',
              '<div id="uc9_lightbox-exit"></div>',
          '</div>',
          '<div class="uc9_centre uc9_top-content">',
            '<div class="uc9_logo-wrap"><div class="uc9_logo"></div><div class="uc9_tagline">The world\'s best independent brands</div></div>',
            '<ul>',
              //'<li>Free delivery over €210</li>',
              '<li>Über 750 kuratierte aufstrebende Designer</li>',
              '<li>Kostenlose Lieferung aller deutschen Marken</li>',
              '<li>Kostenlose Rücksendung und Umtausch</li>',
              '<li>Keine Zölle oder weitere Steuern</li>',
              '<li>Höchste Sicherheit & Datenschutz</li>',
            '</ul>',
            '<p>Ethisch. Einzigartig. Jeden Tag neue Arrivals!</p>',
            '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn">JETZT SHOPPEN </a></div>',
          '</div>',
          '<div class="uc9_email-wrapper">',
            '<span class="uc9_heading">WERDE TEIL DER WOLF & BADGER COMMUNITY</span>',
            '<p>Sign-up hier für unseren Newsletter über neue Designer, Trends, Angebote und mehr</p>',
            '<div class="uc9_input-wrap uc9_centre">',
              '<input type="text" placeholder="Email Adresse hier eingeben" class="uc9_input uc9_small"/>',
              '<div class="uc9_send">SIGN-UP</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Vielen Dank fuer Deine Newsletter Registrierung!',
          '</div>'
        ].join(''),
        html_bottom: [
          '<hr>',
          '<div class="uc9_email-wrapper">',
            '<p>Sign-up hier für unseren Newsletter über neue Designer, Trends, Angebote und mehr</p>',
            '<div class="uc9_input-wrap">',
              '<input type="text" placeholder="Email Adresse hier eingeben" class="uc9_input"/>',
              '<div class="uc9_send">SIGN-UP</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Vielen Dank fuer Deine Newsletter Registrierung!',
          '</div>'
        ].join('')
      },
      fr: {
        image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/069aa86a8dd950f8dfc79e9e6196bc27_366_562.jpeg',
        html_right: [
          '<div class="uc9_top-bar">',
              '<div class="uc9_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/b2a1d76a8e903a12fbe946d0db0d02ac_100_100.png" /></div>',
              '<div class="uc9_lightbox_heading">',
                'Bienvenue sur notre site!',
              '</div>',
              '<div id="uc9_lightbox-exit"></div>',
          '</div>',
          '<div class="uc9_centre uc9_top-content">',
            '<div class="uc9_logo-wrap"><div class="uc9_logo"></div><div class="uc9_tagline">The world\'s best independent brands</div></div>',
            '<ul>',
              //'<li>Free delivery over €210</li>',
              '<li>Plus de 750 designers sélectionnés & emergés</li>',
              '<li>Livraison gratuite de toutes les marques françaises</li>',
              '<li>Retour gratuit sur tout</li>',
              '<li>Pas de droits de douane ni taxes</li>',
            '</ul>',
            '<p>Ethique, unique. Nouvelles arrivées chaque jour!</p>',
            '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn">Commencer le SHOPPING</a></div>',
          '</div>',
          '<div class="uc9_email-wrapper">',
            '<span class="uc9_heading">INSCRIPTION A LA NEWSLETTER WOLF & BADGER!</span>',
            '<p>Sign-up ici pour de nouveautés à ne pas manquer</p>',
            '<div class="uc9_input-wrap uc9_centre">',
              '<input type="text" placeholder="Entrez votre adresse email svp" class="uc9_input uc9_small"/>',
              '<div class="uc9_send">JE M’INSCRIS</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Merci pour l\'inscription à notre newsletter',
          '</div>'
        ].join(''),
        html_bottom: [
          '<hr>',
          '<div class="uc9_email-wrapper">',
            '<p>Sign-up ici pour de nouveautés à ne pas manquer</p>',
            '<div class="uc9_input-wrap">',
              '<input type="text" placeholder="Entrez votre adresse email svp" class="uc9_input"/>',
              '<div class="uc9_send">JE M’INSCRIS</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Merci pour l\'inscription à notre newsletter',
          '</div>'
        ].join('')
      },
      row: {
        image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/069aa86a8dd950f8dfc79e9e6196bc27_366_562.jpeg',
        html_right: [
          '<div class="uc9_top-bar">',
              '<div id="uc9_lightbox-exit"></div>',
              '<div class="uc9_lightbox_heading">',
                'Welcome to Wolf & Badger',
              '</div>',
          '</div>',
          '<div class="uc9_centre uc9_top-content">',
            '<div class="uc9_logo-wrap"><div class="uc9_logo"></div><div class="uc9_tagline">The world\'s best independent brands</div></div>',
            '<ul>',
              //'<li>Free delivery over £150</li>',
              '<li>Over 500 curated emerging designers</li>',
              '<li>Free worldwide returns</li>',
              '<li>No customs duties or taxes<span class="uc9_subtext">*some exclusions apply</span></li>',
            '</ul>',
            '<div class="uc9_centre"><a class="uc9_closeLightbox uc9_btn">Start shopping</a></div>',
          '</div>',
          '<div class="uc9_email-wrapper">',
            '<span class="uc9_heading">Sign up for our newsletter</span>',
            '<p>Be the first to know about new designer, trends and offers</p>',
            '<div class="uc9_input-wrap uc9_centre">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input uc9_small"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join(''),
        html_bottom: [
          '<hr>',
          '<div class="uc9_email-wrapper">',
            '<p>Be the first to know about new designers, trends and events</p>',
            '<div class="uc9_input-wrap">',
              '<input type="text" placeholder="Enter your email address" class="uc9_input"/>',
              '<div class="uc9_send">Register</div>',
            '</div>',
          '</div>',
          '<div class="uc9_email-success">',
            'Thank you for signing up to our newsletter',
          '</div>'
        ].join('')
      },
    }
  };

// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

var WB052 = function () {
  var trackerName,
      slideQ = false,
      $;

  var UCPoller = function () {
    // Load Poller in seperate to other plugins to save on processing 
    // and only load libraries in when they are needed
    require('@qubit/poller')([
       '#header'
     ], function () {
       if (window.jQuery) {
          $ = require('jquery')
          init();
          return true;
        }
     });
  }();

  function init() {
    fullStory('WB052', 'Variation 2');

    var cm = require('cookieman'),
        sendEvent = require('@qubit/send-uv-event'),
        urlCountry = window.location.href.match(/wolfandbadger.com\/([\w]{2})\/(.*)\//)[1],
        POST_url = 'https://www.wolfandbadger.com/' + urlCountry + '/newsletter/subscribe/?next=https://www.wolfandbadger.com/' + urlCountry + '/',
        URL = window.location.pathname;

    function setCookie$$1(c_name, value, exdays, c_domain) {
      c_domain = typeof c_domain === "undefined" ? "" : "domain=" + c_domain + ";";
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var c_value = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
      document.cookie = c_name + "=" + c_value + ";" + c_domain + "path=/";
    }

    function getCookie$$1(name) {
      var match = document.cookie.match(name + '=([^;]*)');
      return match ? match[1] : undefined;
    }

    var cacheDom = function () {
      //Cache useful selectors for later use
      var bodyVar = $('body');

      var header = $('#header'),
          saleBanner;

      bodyVar.addClass('WB052');

      var emailCookie = getCookie$$1('WB052_email'),
          alreadySignedUp = getCookie$$1('WB052_email-signed-up'),
          popupSeen = getCookie$$1('WB052-popup');

      //Retun the selectors we want to reference in other parts of the test
      return {
        bodyVar: bodyVar,
        header: header,
        emailCookie: emailCookie,
        alreadySignedUp: alreadySignedUp,
        popupSeen: popupSeen
      };
    }();

    function signUp(email) {
      if (cm.get('csrftoken').length > 0) {
        window.jQuery.ajax({
          type: 'POST',
          url: POST_url,
          data: {
            csrfmiddlewaretoken: cm.get('csrftoken')[0].value,
            email: email
          }
        });
      }
    }

    function validateEmail($email) {
      var emailReg = /^([\w-\+\\\/\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
      return $email.length > 0 && emailReg.test($email);
    }

    var pageURLCheck = {
      URLChecker: function URLChecker() {
        var uniVar = universal_variable;
        
        // If you comment out this line below, and move the first else if to a if statement instead the code executes further for some reason
        if(uniVar.page.type == 'home'){
         return false; 
        }
        else if (window.location.search.indexOf('?onsale=true') > -1) {
          cacheDom.saleBanner = $('\n\t\t\t\t\t\t<div class="WB052_sale-banner clearfix">\n\t\t\t\t\t\t\t<div class="WB052_container"><a class="WB052_sale-close">×</a>\n\t\t\t\t\t\t\t\t<div class="WB052_text-wrap">\n\t\t\t\t\t\t\t\t\t<h3>Don\'t miss out on a rare opportunity to bag a bargain designer creation in our sale.</h3>\n\t\t\t\t\t\t\t\t\t<p>Sign up to hear about further reductions and future sales.</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="WB052_input-wrap">\n\t\t\t\t\t\t\t\t\t<input type="email" placeholder="Email" maxlength="74" />\n\t\t\t\t\t\t\t\t\t<a class="WB052_register-header">Register</a>\n\t\t\t\t\t\t\t\t\t<div class="WB052_email-error">Please enter a valid email address</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="WB052_thanks">\n\t\t\t\t\t\t\t\t\tThank you for regisetering for our newsletter\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t');
          salePage.contentBuilder();
          salePage.signupValidation();
        } else if (URL.indexOf('/designers/') > -1 || URL.indexOf('/designers/new') > -1) {
          cacheDom.saleBanner = $('\n\t\t\t\t\t\t<div class="WB052_sale-banner clearfix">\n\t\t\t\t\t\t\t<div class="WB052_container"><a class="WB052_sale-close">×</a>\n\t\t\t\t\t\t\t\t<div class="WB052_text-wrap">\n\t\t\t\t\t\t\t\t\t<h3>Love discovering new designers?</h3>\n\t\t\t\t\t\t\t\t\t<p>Sign up to our newsletter for weekly alerts about new designers, plus events where you can meet the makers behind the brands.</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="WB052_input-wrap">\n\t\t\t\t\t\t\t\t\t<input type="email" maxlength="74" placeholder="Email" />\n\t\t\t\t\t\t\t\t\t<a class="WB052_register-header">Register</a>\n\t\t\t\t\t\t\t\t\t<div class="WB052_email-error">Please enter a valid email address</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="WB052_thanks">\n\t\t\t\t\t\t\t\t\tThank you for regisetering for our newsletter\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t');

          salePage.contentBuilder();
          salePage.signupValidation();
        } else if (URL.indexOf('/category/') > -1) {
          cacheDom.saleBanner = $('\n\t\t\t\t\t\t<div class="product-summary WB052_inline-email">\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<h3>Stay ahead of <br />the curve</h3>\n\t\t\t\t\t\t\t\t<p>Get updates on new<br /> products, sales and hot<br /> content from the blog.</p>\n\t\t\t\t\t\t\t\t<input placeholder="Email" maxlength="74" type="email"/>\n\t\t\t\t\t\t\t\t<a class="WB052_register-inline">Register</a>\n\t\t\t\t\t\t\t\t<div class="WB052_email-error">Please enter a valid email address</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="WB052_thanks">\n\t\t\t\t\t\t\t\tThank you for regisetering for our newsletter\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div/>\n\t\t\t\t\t');
          categoryPage.contentBuilder();
          salePage.inlineSignupValidation();
        } else if (URL.indexOf('checkout/success/') > -1) {
          cacheDom.saleBanner = $('\n\t\t\t\t\t\t<div class="WB052_chkbox">\n\t\t\t\t\t\t\t<input type="checkbox" />\n\t\t\t\t\t\t\t<label>Join our mailing list for special offers, new collections and exclusive events</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t');
          if (cacheDom.emailCookie) {
            orderConfirm.contentBuilder();
          }
        } else if (URL.indexOf('checkout/welcome/') > -1) {
          require('@qubit/poller')([
             '#WB038a_email--register', '#WB038a_email--signIn'
           ], function () {
             var signInEmail = $('#WB038a_email--signIn'),
              registerEmail = $('#WB038a_email--register');

            if (signInEmail.length > 0 && registerEmail.length > 0) {
              $('#WB038a_btn--checkout').on('click', function () {
                setCookie$$1('WB052_email', registerEmail.val(), 20000000, 'www.wolfandbadger.com');
              });
              $('#WB038a_btn--signIn').on('click', function () {
                setCookie$$1('WB052_email', signInEmail.val(), 20000000, 'www.wolfandbadger.com');
              });
            } else {
              $('.checkout-welcome .block.wide-form button').on('click', function () {
                setCookie$$1('WB052_email', $('#id_email').val(), 20000000, 'www.wolfandbadger.com');
              });
            }
           });
        }
      }
    };

    var salePage = {
      contentBuilder: function contentBuilder() {
        cacheDom.header.after(cacheDom.saleBanner);
        cacheDom.saleBanner = $('.WB052_sale-banner');
        $('.WB052_sale-close').on('click', function(){
            $('.WB052_sale-banner').slideUp();
            setCookie$$1('WB052_email-signed-up', 'true', 20000000, 'www.wolfandbadger.com');
        });
      },
      signupValidation: function signupValidation() {
        var registerButton = $('.WB052_register-header'),
            registerParent = registerButton.parent(),
            registerEmail = registerParent.find('input'),
            error = registerParent.find('.WB052_email-error'),
            complete = registerParent.next('.WB052_thanks');

        registerButton.on('click', function () {
          if (validateEmail(registerEmail.val()) === true) {
            error.hide();
            setCookie$$1('WB052_email-signed-up', 'true', 20000000, 'www.wolfandbadger.com');
            registerParent.fadeOut(function () {
              complete.fadeIn();
            });
            events.send('WB052', 'Submit Click', 'User signed up to newsletter ' + URL, true);
            signUp(registerEmail.val());
          } else {
            error.show();
          }
        });
      },
      inlineSignupValidation: function inlineSignupValidation() {
        var registerButton = $('.WB052_register-inline'),
            registerParent = registerButton.parent(),
            registerEmail = registerParent.find('input'),
            error = registerParent.find('.WB052_email-error'),
            complete = registerParent.next('.WB052_thanks');

        registerButton.on('click', function () {
          if (validateEmail(registerEmail.val()) === true) {
            error.hide();
            setCookie$$1('WB052_email-signed-up', 'true', 20000000, 'www.wolfandbadger.com');
            registerParent.fadeOut(function () {
              complete.fadeIn();
            });
            events.send('WB052', 'Submit Click', 'User signed up to newsletter ' + URL, true);
            signUp(registerEmail.val());
          } else {
            error.show();
          }
        });
      }
    };

    var categoryPage = {
      contentBuilder: function contentBuilder() {
        var productsWrap = $('.product-list-container .products'),
            product2 = productsWrap.find('.product-summary').eq(2);

        product2.before(cacheDom.saleBanner);
      }
    };

    var orderConfirm = {
      contentBuilder: function contentBuilder() {
        poller([], function () {
          
        });
        require('@qubit/poller')([
             '#join-as-guest', '#ordersuccess .order-confirmation-wrapper h2'
           ], function () {
            $('#join-as-guest').insertAfter($('#ordersuccess .order-confirmation-wrapper h2'));
            cacheDom.saleBanner.insertAfter($('#join-as-guest form'));
            $('#id_password').attr("placeholder", "Password");
            inputBinding.checkBox();
         });
      },
      orderEmailSignup: function orderEmailSignup() {
        $('#join-as-guest forn input[type="submit"]').on('click', function () {
          if ($('.WB052_chkbox').hasClass('checked')) {
            signUp(cacheDom.emailCookie);
          }
        });
      }
    };

    var inputBinding = {
      checkBox: function checkBox() {
        var checkboxEvent = false;

        cacheDom.saleBanner.each(function () {
          var el = $(this),
              label = $(this),
              input = el.find('input');

          input.on('change', function () {
            var chk = $(this);
            if (chk.is(':checked')) {
              if (chk.attr('type') == "radio") {
                var radioOther = $('input[name="' + chk.attr('name') + '"]');
                radioOther.closest('.WB052_chkbox').removeClass('checked');
              }
              el.addClass('checked');
            } else {
              el.removeClass('checked');
            }
          }).change();
        });

        cacheDom.saleBanner.click(function () {
          this.blur();
          this.focus();
          if (checkboxEvent === false) {
            checkboxEvent = true;
            events.send('WB052', 'Click', 'User clicked checkbox to add to mailing list ' + URL, true);
          }
          var el = $(this),
              input = el.find('input');
          if (input.is('[type=radio]')) {
            var radioOther = $('input[name="' + input.attr('name') + '"]').not(input);
            radioOther.prop('checked', false);
            input.prop('checked', true);
          } else {
            input.prop('checked', el.is('.checked') ? false : true);
          }
          input.change();
        });
      }
    };

    var welcomePopup = {
      init: function init() {
    		var lightboxContent_right = modalData.content[WB052Pop.popup].html_right,
    			lightboxContent_bottom = modalData.content[WB052Pop.popup].html_bottom,
    			image = modalData.content[WB052Pop.popup].image;
			
        var $lightboxHTML = $(['<div id="uc9_lightbox-overlay"></div>', '<div class="uc9_lightbox">', '<div class="uc9_lightbox__dialog">', '<div class="uc9_lightbox__dialog__content">', '<div class="uc9_lightbox_left"><img src="' + image + '" /></div>', '<div class="uc9_lightbox_right">', lightboxContent_right, '</div>', '<div class="uc9_clearfix"></div>', '</div>', '</div>'].join(''));

        $lightboxHTML.prependTo(cacheDom.bodyVar);
        cacheDom.bodyVar.addClass('uc9_no-overflow');

        var $lightbox = $lightboxHTML.filter('#uc9_lightbox-overlay, .uc9_lightbox'),
            $exitPoints;

        if ($lightboxHTML.find('.uc9_closeLightbox').length > 0) {
          $exitPoints = $lightboxHTML.find("#uc9_lightbox-exit").add($lightboxHTML.filter('#uc9_lightbox-overlay')).add($lightboxHTML.find('.uc9_closeLightbox'));
        } else {
          $exitPoints = $lightboxHTML.find("#uc9_lightbox-exit").add($lightboxHTML.filter('#uc9_lightbox-overlay'));
        }

        $exitPoints.click(function () {
          $lightbox.fadeOut(500);
          cacheDom.bodyVar.removeClass('uc9_no-overflow');
          cm.set('uc9-shown', WB052Pop.popup, {
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
            path: '/',
            domain: '.wolfandbadger.com'
          });
          setCookie$$1('WB052-popup', 'true', 20000000, 'www.wolfandbadger.com');
        });

        var error_msg_shown, validating_on_keyup;

        $lightboxHTML.find('.uc9_send').on('click', function () {
          var email = $lightboxHTML.find('input').val();

          if (validateEmail(email)) {
            // Email successfully submitted

            signUp(email);
            $lightboxHTML.find('.uc9_email-wrapper').hide();
            $lightboxHTML.find('.uc9_email-success').css({ 'display': 'block' });
            cm.set('uc9-shown', WB052Pop.popup, {
              expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
              path: '/',
              domain: '.wolfandbadger.com'
            });
            events.send('WB052', 'Submit Click', 'User signed up to newsletter through modal', true);
            setTimeout(function () {
            cacheDom.bodyVar.removeClass('uc9_no-overflow');
            setCookie$$1('WB052-popup', 'true', 20000000, 'www.wolfandbadger.com');
              $lightboxHTML.fadeOut(800);
            }, 5000);
          } else {
            // else show error message and start checking email validation on keyup
            if (!error_msg_shown) {
              var $error_msg = $('<div class="uc9_error-msg">Oops, we\'ve encountered an error. Please check that your email is correct.</div>');
              $error_msg.hide().prependTo($lightboxHTML.find('.uc9_input-wrap'));
              $error_msg.fadeIn();
              error_msg_shown = true;
            }

            if (!validating_on_keyup) {
              $lightboxHTML.find('input').on('keyup', function () {
                var $input = $lightboxHTML.find('input'),
                    email = $lightboxHTML.find('input').val(),
                    $error_msg = $('.uc9_error-msg');

                if (validateEmail(email)) {
                  $error_msg.addClass('hide-validation-error');
                  $input.addClass('validated');
                } else {

                  if ($input.hasClass('validated')) {
                    $input.removeClass('validated');
                  }

                  if ($error_msg.hasClass('hide-validation-error')) {
                    $error_msg.removeClass('hide-validation-error');
                  }
                }
              });

              validating_on_keyup = true;
            }
          }
        });
      }
    };
    
    if (cacheDom.popupSeen !== 'true') {
        //welcomePopup.init();
    }
    if (cacheDom.alreadySignedUp !== 'true') {
        pageURLCheck.URLChecker();
    }
  }
}();
})();
}