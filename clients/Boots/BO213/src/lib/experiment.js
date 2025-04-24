/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  const href = window.location.href;
  let type = "Unknown";
  const searchRE = `/sitesearch`;
  const PDPRE =
    /.*(www.boots.com).*(-)[\d]{7,8}(p)$|.*(www.boots.com).*(-)[\d]{7,8}$|.*(www.boots.com).*(-)[\d]{7,8}(p)(\?).*|.*(test1.boots.com).*(-)[\d]{7,8}(\?).*/gim;

  if (href.indexOf(searchRE) > 0) {
    type = `Search`;
  } else if (href.match(PDPRE)) {
    type = `PDP`;
  } else {
    type = `PLP`;
  }

  fireEvent("Conditions Met | Page: " + type);
  fireEvent("Conditions Met");

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  window.FI_Config = {
    version: 'Boots v1.9.12',
    requestTimeout: 5000,
    foundItApiProgramCode: 'e4fa636a',
    currencySymbol: '&pound;',
    abortOnUnknownPageType: true,
  
    categoryPageItemsInCarousel: 7,
  
    productTabs: false,
    productTabsMinTabs: 1,
    productTabsMaxTabs: 5,
    productTabsMinProducts: 3,
    productTabsItemsInCarousel: 6,
  
    gaClientTrackingTrackerName: null,
    gaClientTrackingEventCategory: 'FoundIt',
    gaClientTrackingCustomDimensionIndex: null,
    disableTrackingUrlParameter: false,
    disableTrackingEntirely: false,
    trackingEnabledEvents: ['links-click'],
  
    thisPageType: null,
    thisPageUrl: null,
  
    gaClientTrackingFunction: function() {
      return (typeof window.ga === 'function') ? window.ga : null;
    },
  
    slots: [
      {
        id: 'plp-main',
        key: 'Main Links',
        title: '',
        attach: 'prepend',
        target: 'div#tab1Widget',
        template: 'main-links',
        pageTypes: ['Category']
      }
      ,{
        id: 'plp-main-bottom',
        key: 'Main Links',
        title: '',
        attach: 'before',
        target: 'div#catalog_search_result_information',
        template: 'main-links',
        pageTypes: ['Category']
      }
      ,{
        id: 'plp-main',
        key: 'Main Links',
        title: '',
        attach: 'before',
        target: 'div.product_listing_container',
        template: 'main-links',
        pageTypes: ['Search']
      }
      ,{
        id: 'plp-main-bottom',
        key: 'Main Links',
        title: '',
        attach: 'after',
        target: 'div.product_listing_container',
        template: 'main-links',
        pageTypes: ['Search']
      }
      ,{
        id: 'product-page-links',
        key: 'Product Page Links',
        title: '',
        attach: 'before',
        target: 'div#estore_productpage_template_container div.row.template_row_spacer + .row',
        template: 'product-page-links',
        pageTypes: ['Product']
      }
    ],
    templates: {
      'main-links': {
        html: {
          wrapStart: '<nav class="fi-plp-main__nav">',
          listStart: '<div class="fi-plp-main__arrow fi-arrow fi-arrow-left" fi-arrow-direction="left"></div><div class="fi-plp-main__arrow fi-arrow fi-arrow-right" fi-arrow-direction="right"></div><ul class="fi-plp-main__list fi-list-scrollable">',
          item: '<li class="fi-plp-main__item"><a class="fi-link fi-plp-main__link" href="#{url}" data-tracking="#{trackLinkClickString}" data-page-type="#{pageTypeString}" rel="nofollow" draggable="false"><div class="fi-plp-main__image-crop"><img class="fi-image fi-plp-main__image" src="#{imageurl}?wid=200&hei=200&op_sharpen=1" draggable="false"/></div><div class="fi-plp-main__text"><span class="fi-plp-main-inner-text">#{text}</span></div></a></li>',
          dummyItem: '<li class="fi-plp-main__item fi-plp-main__item-dummy"></li>',
          listEnd: '</ul>',
          wrapEnd: '</nav>'
        }
      }
      ,'product-page-links': {
        html: {
          wrapStart: '<nav class="fi-plp-main__nav">',
          listStart: '<div class="fi-plp-main__arrow fi-arrow fi-arrow-left" fi-arrow-direction="left"></div><div class="fi-plp-main__arrow fi-arrow fi-arrow-right" fi-arrow-direction="right"></div><ul class="fi-plp-main__list fi-list-scrollable">',
          item: '<li class="fi-plp-main__item"><a class="fi-link fi-plp-main__link" href="#{url}" data-tracking="#{trackLinkClickString}" data-page-type="#{pageTypeString}" rel="nofollow" draggable="false"><div class="fi-plp-main__image-crop"><img class="fi-image fi-plp-main__image" src="#{imageurl}?wid=200&hei=200&op_sharpen=1" draggable="false"/></div><div class="fi-plp-main__text"><span class="fi-plp-main-inner-text">#{text}</span></div></a></li>',
          dummyItem: '<li class="fi-plp-main__item fi-plp-main__item-dummy"></li>',
          listEnd: '</ul>',
          wrapEnd: '</nav>'
        }
      }
    },
  
    styles: [
      '',
      '.fi-slot * { margin: 0; padding: 0; }',
      '#cu_circleCarousel_2021 { display: none; }',
      '.fi-slot--plp-main { margin: 20px auto 0 auto; }',
      '#estore_lister_template_container.algolia-search .fi-slot--plp-main-bottom { margin: 40px auto 20px auto !important; }',
      '.fi-plp-main__nav { position: relative; padding: 0 50px; overflow: hidden; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }',
      '.fi-plp-main__list { display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; overflow: hidden; -ms-overflow-style: none; padding-bottom: 50px !important; margin-bottom: -50px !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }',
      '.fi-plp-main__list::-webkit-scrollbar { display: none; background: transparent; width: 0; height: 0; }',
      '.fi-plp-main__item { display: inline-block; text-align: center; box-sizing: border-box; min-width: calc(100% / 7); max-width: calc(100% / 7); padding: 0 15px; }',
      '.fi-plp-main__item-dummy { display: none; }',
      '.fi-slot a.fi-plp-main__link { display: block; position: relative; -webkit-user-drag: none; }',
      '.fi-plp-main__image-crop { display: inline-block; box-sizing: border-box; border-radius: 50%; border: 1px solid #e8e8e8; margin-top: 10px; overflow: hidden; width: 92px; }',
      'a.fi-plp-main__link:hover .fi-plp-main__image-crop { transform: scale(1.1); transition: 0.5s ease-in-out; }',
      '.fi-plp-main__image { display: block; margin: auto; width: 100%; transform: scale(0.8); -webkit-user-drag: none; }',
      '.fi-plp-main__text { display: block; padding-top: 7px; max-height: 60px; overflow: hidden; width: 100%; }',
      '.fi-plp-main-inner-text { display: block; color: #333; font-family: "Boots Sharp", Arial, sans-serif; font-size: 16px; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; }',
      'a.fi-plp-main__link:hover .fi-plp-main-inner-text { text-decoration: underline; }',
      'a.fi-plp-main__link:focus { outline: none; }',
      '.fi-arrow { display: inline-block; font-size: 40px; position: absolute; top: 50%; transform: translate(0, -50%); cursor: pointer; width: 40px; height: 40px; -webkit-box-shadow: 0 0 6px 1px rgb(0 0 0 / 19%); -moz-box-shadow: 0 0 6px 1px rgb(0 0 0 / 19%); box-shadow: 0 0 6px 1px rgb(0 0 0 / 19%); -webkit-border-radius: 50px; -moz-border-radius: 50px; border-radius: 50px; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; }',
      '.fi-arrow::before { display: inline-block; content: ""; border: solid #e8e8e8; transform: rotate(45deg); margin-top: 15px; width: 8px; height: 8px; }',
      '.fi-arrow-left { left: 5px; }',
      '.fi-arrow-right { right: 2px; }',
      '.fi-arrow-left::before { border-width: 0 0 2px 2px; margin-left: 16px; }',
      '.fi-arrow-right::before { border-width: 2px 2px 0 0; margin-left: 14px; }',
      '.fi-arrow-active { cursor: pointer; }',
      '.fi-arrow-active::before { border-color: black; }',
      '@media only screen and (max-width: 1280px) {',
      '	.fi-plp-main__item { min-width: calc(100% / 5); max-width: calc(100% / 5); }',
      '	.fi-plp-main__image-crop { box-sizing: border-box; }',
      '}',
      '@media only screen and (max-width: 1024px) {',
      '	.fi-slot--plp-main { margin: 0; padding: 0; }',
      '	.fi-plp-main__list { overflow-x: scroll; }',
      '	.fi-plp-main__item { min-width: calc(100% / 4); max-width: calc(100% / 4); padding: 0 12px; }',
      '	.fi-plp-main__item-dummy { display: none; }',
      '	.fi-plp-main__text { padding-top: 8px; }',
      '}',
      '@media only screen and (max-width: 768px) {',
      '	.fi-slot--plp-main { width: 100%; }',
      '	.fi-plp-main__nav { padding: 0; }',
      '	.fi-arrow { display: none; }',
      '	.fi-plp-main__item { min-width: calc(100% / 4.5); max-width: calc(100% / 4.5); }',
      '	.fi-plp-main__item:first-child { margin-left: -12px; }',
      '	.fi-plp-main__item-dummy { width: 12px !important; min-width: auto !important; display: block !important; }',
      '	.fi-plp-main__item-dummy ~ .fi-plp-main__item-dummy { display: none !important; }',
      '}',
      '@media only screen and (max-width: 540px) {',
      '	.fi-plp-main__item { min-width: calc(100% / 3.5); max-width: calc(100% / 3.5); padding: 0 6px; }',
      '	.fi-plp-main__item:first-child { margin-left: 0; }',
      '	.fi-plp-main-inner-text { font-size: 14px; }',
      '}',
      '@media only screen and (max-width: 375px) {',
      '	.fi-plp-main__item { min-width: calc(100% / 2.6); max-width: calc(100% / 2.6); }',
      '}',
      '@media only screen and (max-width: 290px) {',
      '	.fi-plp-main__item { min-width: calc(100% / 2.3); max-width: calc(100% / 2.3); }',
      '}',
      '#fi-product-page-links { width: 100%; }',
      '@media only screen and (max-width: 767px) {',
      '	#fi-product-page-links { margin-bottom: 36px; }',
      '}',
      ''
    ]
  
  };
  
  
  window.FI_Scripts = {
    noRunFlag: function() {
      return false;
    },
  
    initScripts: function() {
      FI_Scripts.setAjaxObserver();
    },
  
    extractPageType: function(url) {
      var pathName = url.replace(/[?#]{1}.*/, '');
      if (pathName == '/') return null;
      else if ( pathName.indexOf('/sitesearch') === 0 ) return 'Search';
      else if ( pathName.match(/[0-9]{6,}p?([?#].*)*$/) ) return 'Product';
      else if ( pathName.match(/(\/online|\/search|ADC|Display|OrderDetail|AjaxLogonForm|ADCAccountSummary|webapp|StoreLookupView|UserRegistrationForm|AdvantageCardApply|AddressBookForm|store|terms|wishlist|boots-shopping|DigitalOffersShopNowCmd|OrderShippingBillingView|PHExtendedRegistrationView|EStoreStoreDetailNonAjaxView|UserRegistrationUpdate|TrackOrderStatus|shop-online|opticians-advice|OrderChangeServiceItemUpdate|advantage-card|DigitalMyOffersView|Logoff|contact-us|ClickInfo|ClinicStatusView|[0-9]{6,}-$|[0-9]{6,}p$)/i) ) return null;
          else return 'Category';
    },
  
    cleanUpSearchTerm: function(searchTerm) {
      searchTerm = searchTerm.replace(/[-_]/g, ' ');
      searchTerm = searchTerm.replace(/[^A-Z0-9&: ]/gi, '');
      searchTerm = searchTerm.replace(/[ ]{2,}/g, ' ');
      searchTerm = searchTerm.trim();
      searchTerm = searchTerm.replace(/^[0-9]*$/, '');
      searchTerm = searchTerm.toLowerCase();
  
      return searchTerm;
    },
  
    cleanUpUrl: function(url) {
      url = url.replace(/^http(s){0,1}:\/\/[^\/]+/, '');
      var pathName = url.replace(/[?#]{1}.*/, '');
      var queryString = (url.indexOf('?') > -1) ? url.replace(/(.*?)(\?[^#]*)(.*)/, '$2') : '';
      var hash = (url.indexOf('#') > -1) ? url.replace(/(.*?)(#.*)/, '$2') : '';
      var thisPageType = FI_Scripts.extractPageType(url);
  
      pathName = pathName.replace(/\/$/, '');
      pathName = pathName.replace(/\/&.*/, '/');
  
      queryString = queryString.replace(/[?&]fi=[^&]+/,'');
      queryString = queryString.replace(/[?&](utm_source|utm_medium|utm_campaign|cm_mmc|gclid|gclsrc|pp|epik|CAWELAID|queueittoken|dclid|catalogid|fbclid|cstrackid|affwin|price)=[^$]*/gi,'');
      queryString = queryString.replace(/[?&](page|pageNo)=[^&]+/gi,'');
  
      if (thisPageType == 'Category') {
        pathName = pathName.replace(/\/\//,'/');
        queryString = '';
        hash = hash.replace(/(#[^&]*)&.*/, '$1');
        hash = hash.replace(/#(?!facet).*/, '');
        hash = hash.replace(/ /, ',');
        var facetsToRemove = [
          '-7000000000000135620'
          ,'3074457345616676860'
                  ,'-7000000000000135607'
                  ,'-7000000000000135603'
                  ,'-7000000000000135612'
                  ,'-7000000000000135604'
                  ,'-1046'
                  ,'-1050494951535058'
                  ,'11211410599101957166805840123'
        ];
        var regEx = new RegExp( '(' + facetsToRemove.join('|') + ')[0-9]+[,]?' , 'g' );
        hash = hash.replace(regEx, '');
        hash = hash.replace(/(#facet:|,)$/, '');
      }
  
      else if (thisPageType == 'Search') {
        var searchString = '', facets = '';
        var searchStringMatches = queryString.match(/searchTerm=(.*?)([&:][^ +]+|$)/i);
        if (searchStringMatches && searchStringMatches.length > 1) {
          searchString = searchStringMatches[1];
          searchString = searchString.replace(/[+]/g, ' ');
          searchString = searchString.replace(/%20/g, ' ');
          searchString = FI_Scripts.cleanUpSearchTerm(searchString);
          searchString = searchString.replace(/[ ]/g, '+');
          if (queryString.indexOf('&') !== -1) {
            facets = queryString.substring(queryString.indexOf('&'), queryString.length);
            facets = facets.replace(/&(promotionalText|productSizes|roundedReviewScore|sortBy|orderBy)[^&]*/gi, '');
          }
          queryString = '?searchTerm=' + searchString.toLowerCase() + facets;
        }
        hash = '';
      }
  
      else if (thisPageType == 'Product') {
        var productUrlMatch = pathName.match(/\/[^/]+-[\d]+p?(?=\?|$)/);
        if (productUrlMatch) {
          pathName = productUrlMatch[0];
        }
        pathName = pathName.toLowerCase();
        queryString = '';
        hash = '';
      }
  
      else {
        pathName = '';
        queryString = '';
        hash ='';
      }
  
      return pathName + queryString + hash;
    },
  
    getThisPageType: function() {
      return FI_Scripts.extractPageType(window.location.pathname);
    },
  
    getThisPageUrl: function() {
      var baseUrl = window.location.protocol + '//' + window.location.hostname;
      var pathName = unescape(window.location.pathname);
      var queryString = unescape(window.location.search);
      var hash = unescape(window.location.hash);
      var url = baseUrl + FI_Scripts.cleanUpUrl(pathName + queryString + hash);
      return url;
    },
  
    postRenderScripts: function() {
      var i;
      var linkElems = document.getElementsByClassName('fi-link');
      for (i = 0; i < linkElems.length; i++) {
        var linkElem = linkElems[i];
        linkElem.addEventListener('click', function(e) {
          if (this.hasAttribute('data-stop')) {
            e.stopPropagation();
          }
          FI_Core.gaTrackLinkClick(this.getAttribute('data-tracking'), this.getAttribute('data-page-type'));
        });
      }
  
      var arrowElements = document.querySelectorAll('.fi-arrow');
      for (i = 0; i < arrowElements.length; i++) {
        arrowElements[i].addEventListener('click', FI_Core.onArrowClick);
      }
  
      var listElements = document.querySelectorAll('.fi-list-scrollable');
      for (i = 0; i < listElements.length ; i++) {
        listElements[i].addEventListener('scroll', function() {
          FI_Core.renderArrows(this);
        });
        FI_Core.renderArrows(listElements[i]);
      }
  
      var scrollableElements = document.querySelectorAll('ul.fi-list-scrollable li.fi-plp-main__item:not(.fi-plp-main__item-dummy)');
      if (scrollableElements.length <= FI_Config.categoryPageItemsInCarousel) {
        var dummyScrollableElements = document.querySelectorAll('ul.fi-list-scrollable li.fi-plp-main__item-dummy');
        for (i = 0; i < dummyScrollableElements.length ; i++) {
          dummyScrollableElements[i].outerHTML = '';
        }
        var navElements = document.querySelectorAll('.fi-plp-main__nav');
        for (i = 0; i < navElements.length ; i++) {
          navElements[i].classList.add('min-links-or-less');
        }
      }
  
      if (FI_Config.productTabs) {
        var tabHeader = document.querySelector('.fi-pdp-pw__tab-headers');
        FI_Core.attachDrawScroll(tabHeader);
  
        var tabHeadingElements = document.querySelectorAll('.fi-pdp-pw__tab-heading');
        for (i = 0; i < tabHeadingElements.length; i++) {
          tabHeadingElements[i].addEventListener('click', FI_Core.openTab);
        }
  
        var j;
        var tabContainerElements = document.querySelectorAll('.fi-pdp-pw__tab-content-container');
        for (i = 0; i < tabContainerElements.length ; i++) {
          scrollableElements = tabContainerElements[i].querySelectorAll('.fi-pdp-pw__product_card-ext:not(.fi-pdp-pw__product_card-ext-dummy)');
          if (scrollableElements.length <= FI_Config.productTabsItemsInCarousel) {
            dummyScrollableElements = tabContainerElements[i].querySelectorAll('.fi-pdp-pw__product_card-ext-dummy');
            for (j = 0; j < dummyScrollableElements.length ; j++) {
              dummyScrollableElements[j].outerHTML = '';
            }
            tabContainerElements[i].classList.add('min-links-or-less');
          }
        }
  
        FI_Core.activateTab(1);
      }
  
      var pdpCarousel = document.querySelector('.fi-plp-main__list');
      FI_Core.attachDrawScroll(pdpCarousel);
      var rr = document.querySelector('#richRelevanceContainer');
      var slot = document.querySelector('.fi-slot');
  
      if (rr && slot && slot.offsetTop > rr.offsetTop)
        rr.parentNode.parentNode.insertBefore(slot, rr.parentNode);
  
    },
  
    ellipsizeDescriptions: function() {
      var tabContentElements = document.querySelectorAll('.fi-pdp-pw__tab-content');
      for (var i = 0; i < tabContentElements.length; i++) {
        var tabContentElem = tabContentElements[i];
        tabContentElem.style.display = 'block';
        var descriptionElements = tabContentElem.querySelectorAll('.fi-pdp-pw__product_description');
        for (var j = 0; j < descriptionElements.length; j++) {
          FI_Scripts.ellipsizeContent(descriptionElements[j]);
        }
        tabContentElem.style.display = '';
      }
    },
  
    ellipsizeContent: function(element) {
      var wordArray = element.innerHTML.split(' ');
      while (element.scrollHeight > element.offsetHeight) {
        wordArray.pop();
        element.innerHTML = wordArray.join(' ') + '...';
      }
    },
  
    cleanup: function() {
      var elements = document.querySelectorAll('[class^="fi-"], [data-id="fi-style"]');
      for (var i = 0; i < elements.length; i++) {
        elements[i].parentElement.removeChild(elements[i]);
      }
      var slots = FI_Config.slots, slot, s;
      if (slots) {
        for (s = 0; s < slots.length; s++) {
          slot = slots[s];
          if (slot.element) {
            slot.element = null;
          }
        }
      }
    },
  
    setAjaxObserver: function() {
      var target;
      var config = { attributes: false, childList: true, characterData: false, subtree: true };
      if (FI_Config.thisPageType == 'Category') { target = document.querySelector('#tab1Widget'); }
      else if (FI_Config.thisPageType == 'Search') {
        target = document.querySelector('.product_listing_container');
        FI_Scripts.delayedAjaxHandlerTimeout = 500;
      }
      if (target) {
        FI_Scripts.ajaxObserver = new MutationObserver(FI_Scripts.delayedAjaxHandler);
        FI_Scripts.ajaxObserver.observe(target, config);
      }
    },
  
    delayedAjaxHandler: function() {
      setTimeout( FI_Scripts.ajaxHandler, FI_Scripts.delayedAjaxHandlerTimeout );
    },
  
    delayedAjaxHandlerTimeout: 0,
  
    ajaxHandler: function() {
      var currentPageUrl = FI_Scripts.getThisPageUrl();
      if (currentPageUrl !== FI_Config.thisPageUrl) {
        FI_Config.thisPageUrl = currentPageUrl;
        FI_Config.thisPageType = FI_Scripts.getThisPageType();
        FI_Scripts.cleanup();
        FI_Core.init();
      }
    },
  
    ajaxObserver: null
  
  };
  
  
  window.FI_Core = {
    version: '1.2.1',
  
    api: {
      url: 'https://rtapi.foundit.com',
      page: '/page/',
      product: '/product',
    },
  
    load: function() {
      if (document.readyState === "interactive" || document.readyState === "complete" || document.readyState === "loaded") {
        FI_Core.init();
      }
      else {
        document.addEventListener('DOMContentLoaded', FI_Core.init, true);
      }
    },
  
    init: function() {
      if (FI_Scripts.noRunFlag()) return;
      if (!FI_Config.thisPageType) FI_Config.thisPageType = FI_Scripts.getThisPageType();
      if (FI_Config.abortOnUnknownPageType && !FI_Config.thisPageType) return;
      if (!FI_Config.thisPageUrl) FI_Config.thisPageUrl = FI_Scripts.getThisPageUrl();
      if (FI_Scripts.initScripts) FI_Scripts.initScripts();
      var xhr = FI_Core.request('GET', FI_Core.api.url + FI_Core.api.page + FI_Config.foundItApiProgramCode + '/' + FI_Core.urlEncode(FI_Config.thisPageUrl));
      if (!xhr) {
        FI_Core.gaTrackEvent('api-error-noxhr', FI_Config.thisPageUrl, true);
        return;
      }
      if (FI_Config.requestTimeout) xhr.timeout = FI_Config.requestTimeout;
      xhr.onloadstart = function() {
        FI_Core.gaTrackEvent('api-request', FI_Config.thisPageUrl, true);
      };
      xhr.onabort = function() {
        FI_Core.gaTrackEvent('api-abort', FI_Config.thisPageUrl, true);
      };
      xhr.onerror = function() {
        FI_Core.gaTrackEvent('api-error-xhr', FI_Config.thisPageUrl, true);
      };
      xhr.ontimeout = function() {
        FI_Core.gaTrackEvent('api-timeout', FI_Config.thisPageUrl, true);
      };
      xhr.onload = function(e) {
        if (e.currentTarget.status == 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            FI_Core.gaTrackEvent('api-success', FI_Config.thisPageUrl, true);
          }
          catch (ex) {
            FI_Core.gaTrackEvent('api-error-json', FI_Config.thisPageUrl, true);
          }
          if (data) {
            FI_Core.render(data);
          }
        }
        else {
          FI_Core.gaTrackEvent('api-error-http-' + e.currentTarget.status, FI_Config.thisPageUrl, true);
        }
      };
      xhr.send();
    },
  
    gaEventsQueue: [],
  
    gaTrackLinkClick: function(trackLinkClickString, pageTypeString) {
      trackLinkClickString = typeof trackLinkClickString !== 'undefined' ? trackLinkClickString : 'noTrackingString';
      FI_Core.gaTrackEvent('links-click', trackLinkClickString, false, pageTypeString);
    },
  
    gaTrackEvent: function(eventAction, eventLabel, nonInteractionFlagValue, customDimensionValue) {
      if (FI_Config.disableTrackingEntirely) return;
      if (typeof FI_Config.trackingEnabledEvents !== 'undefined' && FI_Config.trackingEnabledEvents.indexOf(eventAction) === -1) return;
      var fieldsObject = {};
      fieldsObject['transport'] = 'beacon';
      fieldsObject['nonInteraction'] = typeof nonInteractionFlagValue !== 'undefined' ? nonInteractionFlagValue : true;
      if (FI_Config.gaClientTrackingCustomDimensionIndex && customDimensionValue !== 'undefined') {
        fieldsObject['dimension' + FI_Config.gaClientTrackingCustomDimensionIndex] = customDimensionValue;
      }
      FI_Core.gaEventsQueue.push({eventAction: eventAction, eventLabel: eventLabel, fieldsObject: fieldsObject});
      FI_Core.gaEventsQueueSend();
    },
  
    gaEventsQueueSend: function() {
      var gaTrackerName = (FI_Config.gaClientTrackingTrackerName) ? FI_Config.gaClientTrackingTrackerName : FI_Core.gaGetTrackerName();
      if (FI_Config.gaClientTrackingFunction() && gaTrackerName) {
        for (var i = 0; i < FI_Core.gaEventsQueue.length; i++) {
          FI_Config.gaClientTrackingFunction()(
            gaTrackerName + '.' + 'send'
            ,'event'
            ,FI_Config.gaClientTrackingEventCategory
            ,FI_Core.gaEventsQueue[i]['eventAction']
            ,FI_Core.gaEventsQueue[i]['eventLabel']
            ,1
            ,FI_Core.gaEventsQueue[i]['fieldsObject']
          );
        }
        FI_Core.gaEventsQueue.length = 0;
      }
      else {
        if (FI_Core.gaQueueSendTimeout) clearTimeout(FI_Core.gaQueueSendTimeout);
        FI_Core.gaQueueSendTimeout = setTimeout(FI_Core.gaEventsQueueSend, 500);
      }
    },
  
    gaGetTrackerName: function() {
      try {
        if (FI_Config.gaClientTrackingFunction() && FI_Config.gaClientTrackingFunction().getAll().length > 0) {
          return FI_Config.gaClientTrackingFunction().getAll()[0].get('name');
        }
        return null;
      }
      catch (ex) {
        return null;
      }
    },
  
    urlEncode: function(url) {
      return encodeURIComponent(encodeURIComponent(url));
    },
  
    request: function(method, url) {
      var xhr = new XMLHttpRequest();
      if ('withCredentials' in xhr) {
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        xhr = null;
      }
      return xhr;
    },
  
    attachElementTo: function(elem, target, attach) {
      switch (attach) {
        case 'before':
          target.parentNode.insertBefore(elem, target);
          break;
        case 'after':
          target.parentNode.insertBefore(elem, target.nextSibling);
          break;
        case 'prepend':
          target.insertBefore(elem, target.childNodes[0]);
          break;
        default:
          target.appendChild(elem);
      }
      return elem;
    },
  
    createSlot: function(slot) {
      var target = document.querySelector(slot.target),
        elem;
      if (!target) return;
      elem = document.createElement('div');
      elem.className = 'fi-slot fi-slot--' + slot.id;
      elem.setAttribute('id', 'fi-' + slot.id);
      return FI_Core.attachElementTo(elem, target, slot.attach);
    },
  
    isMobileSlot: function(slot) {
      return slot && /-mobile$/.test(slot.id);
    },
  
    addTrackingUrlParameter: function( destinationUrl, trackingParameter ) {
      var destinationUrlWithTracking;
      var separator = (destinationUrl.indexOf('?') === -1) ? '?' : '&';
      if (destinationUrl.indexOf('#') === -1) {
        destinationUrlWithTracking = destinationUrl + separator + trackingParameter;
      }
      else {
        destinationUrlWithTracking = destinationUrl.substring(0, destinationUrl.indexOf('#'))
          + separator
          + trackingParameter
          + destinationUrl.substring(destinationUrl.indexOf('#'), destinationUrl.length);
      }
      return destinationUrlWithTracking;
    },
  
    templateLinks: function(slot, links) {
      var html = '',
        template = FI_Config.templates[slot.template].html,
        l,
        link,
        trackingParameter = '',
        destinationUrl,
        trackLinkClickString,
        linksContainerName;
  
      var numberOfItemsInCarousel = FI_Config.categoryPageItemsInCarousel;
      var linksOrigLength = links.length;
  
      html += template.wrapStart || '';
      if (slot.title && template.heading) {
        html += template.heading.replace('#{title}', slot.title);
      }
      html += template.listStart || '';
  
      if (!FI_Core.isMobileSlot(slot) && (linksOrigLength % numberOfItemsInCarousel !== 0)) {
        links = links.concat(
          FI_Core.newFilledArray(
            numberOfItemsInCarousel - (linksOrigLength % numberOfItemsInCarousel),
            { isDummy: true }));
      }
  
      for (l = 0; l < links.length; l++) {
        link = links[l];
        if (link.isDummy) {
          html += template.dummyItem;
        }
        else {
          if (!FI_Config.disableTrackingUrlParameter) {
            trackingParameter = 'fi=' + FI_Config.thisPageType.substr(0, 1).toLowerCase();
            destinationUrl = FI_Core.addTrackingUrlParameter( link.DestinationUrl, trackingParameter );
          }
  
          linksContainerName = slot.key.split(' ').join('-');
          trackLinkClickString = FI_Config.thisPageUrl + '|' + FI_Config.thisPageType + '|' + linksContainerName + '|' + link.Order + '|' + links.length + '|' + link.AnchorText.replace(/"/g, '&quot;') + '|' + link.DestinationUrl;
          html += template.item
            .replace('#{url}', destinationUrl)
            .replace('#{text}', link.AnchorText)
            .replace('#{imageurl}', link.ImageUrl.replace(/\?.*/,''))
            .replace('#{trackLinkClickString}', trackLinkClickString)
            .replace('#{pageTypeString}', FI_Config.thisPageType);
        }
      }
      html += template.listEnd || '';
      html += template.wrapEnd || '';
      return html;
    },
  
    formatPrice: function(price) {
      return FI_Config.currencySymbol + ('' + price).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    },
  
    templateProducts: function(slot, json) {
      var html = '',
      currentTab,
      tabProducts,
      currentProduct,
      tabHeaders = '',
      tabContents = '',
      template = FI_Config.templates[slot.template].html;
  
      html += template.wrapStart || '';
      html += template.headingStart || '';
  
      if (slot.title) {
        html = html.replace('#{widgetTitle}', slot.title);
      }
  
      var maxTabs = Math.min(FI_Config.productTabsMaxTabs, json.length);
      var numberOfItemsInCarousel = FI_Config.productTabsItemsInCarousel;
  
      for (var i=0, tabId=1; i<maxTabs; i++) {
        currentTab = json[i];
        tabProducts = currentTab.products;
        var productsCountOrig = tabProducts.length;
        if (productsCountOrig >= FI_Config.productTabsMinProducts) {
          if ((productsCountOrig % numberOfItemsInCarousel) !== 0) {
            tabProducts = tabProducts.concat(
              FI_Core.newFilledArray(
                numberOfItemsInCarousel - (productsCountOrig % numberOfItemsInCarousel),
                { isDummy: true }));
          }
  
          currentTab.tabTitle = currentTab.tabTitle.replace(/"/g, '&quot;');
  
          tabHeaders += template.heading.replace('#{id}', tabId)
            .split('#{tabTitle}')
            .join(currentTab.tabTitle);
  
          tabContents += template.listStart.replace('#{id}', tabId);
  
          for (var j=0; j<tabProducts.length; j++) {
            currentProduct = tabProducts[j];
            if (currentProduct.isDummy) {
              tabContents += template.dummyItem;
            }
            else {
              currentProduct.title = currentProduct.title.replace(/"/g, '&quot;');
              currentProduct.imageUrl = currentProduct.imageUrl.replace(/\?.*/,'');
  
              var productTrackLinkClickString = FI_Config.thisPageUrl + '|' + FI_Config.thisPageType + '|' + 'ProductWidget-Product|' + (j+1) + '|' + productsCountOrig + '|' + currentProduct.title + '|' + currentProduct.destinationUrl;
  
              if (!FI_Config.disableTrackingUrlParameter) {
                currentProduct.destinationUrl = FI_Core.addTrackingUrlParameter( currentProduct.destinationUrl, 'fi=wp' );
              }
  
              var isOnSale = false, salePriceWas = '', salePriceSave = '';
              var price = currentProduct.price;
              if (currentProduct.salePrice > 0 && price > currentProduct.salePrice) {
                isOnSale = true;
                price = currentProduct.salePrice;
                salePriceSave = FI_Core.formatPrice( (currentProduct.price - currentProduct.salePrice).toFixed(2) );
                salePriceWas = FI_Core.formatPrice(currentProduct.price.toFixed(2));
              }
              price = FI_Core.formatPrice( price.toFixed(2) );
  
              var ratingStars = '';
              if (currentProduct.rating > 0) {
                var roundedRating = Math.round(currentProduct.rating*2)/2;
                var count = Math.floor(roundedRating);
                while (count) {
                  ratingStars += '&#xe033';
                  count--;
                }
                if ( roundedRating % 1 >= 0.5 ) {
                  ratingStars += '&#xe034';
                }
              }
  
              tabContents += template.item
                .split('#{title}').join( currentProduct.title )
                .split('#{destinationUrl}').join( currentProduct.destinationUrl )
                .replace('#{imageUrl}', currentProduct.imageUrl )
                .replace('#{price}', price )
                .replace('#{productTrackLinkClickString}', productTrackLinkClickString )
                .replace('#{pageTypeString}', FI_Config.thisPageType )
                .replace('#{ratingStars}', ratingStars )
                .replace('#{ratingCount}', currentProduct.ratingsCount )
                .split('#{offerText}').join( currentProduct.offerText )
                .replace('#{salePriceSave}', salePriceSave )
                .replace('#{salePriceWas}', salePriceWas )
                .replace('fi-pdp-pw__no-offer', (currentProduct.onOffer || isOnSale) ? 'fi-pdp-pw__on-offer' : 'fi-pdp-pw__no-offer')
                .replace('fi-pdp-pw__no-sale', isOnSale ? 'fi-pdp-pw__on-sale' : 'fi-pdp-pw__no-sale');
            }
          }
  
          var tabTrackLinkClickString = FI_Config.thisPageUrl + '|' + FI_Config.thisPageType + '|' + 'ProductWidget-ShopAll|' + tabId + '|' + maxTabs + '|' + currentTab.tabTitle + '|' + currentTab.tabDestinationUrl;
  
          if (!FI_Config.disableTrackingUrlParameter && currentTab.tabDestinationUrl > '') {
            currentTab.tabDestinationUrl = FI_Core.addTrackingUrlParameter( currentTab.tabDestinationUrl, 'fi=wc' );
          }
  
          tabContents += template.listEnd
            .replace('#{tabTitle}', currentTab.tabTitle )
            .replace('#{tabDestinationUrl}', currentTab.tabDestinationUrl )
            .replace('#{tabTrackLinkClickString}', tabTrackLinkClickString )
            .replace('#{pageTypeString}', FI_Config.thisPageType );
  
          tabId++;
        }
      }
  
      html += tabHeaders;
  
      html += template.headingEnd;
  
      html += tabContents;
  
      html += template.wrapEnd || '';
  
      if (tabId > FI_Config.productTabsMinTabs) { return html; }
      else { return null; }
    },
  
    render: function(data) {
      var slots = FI_Config.slots,
        linkList, slot, s, rendered;
      var linkLists = ( data.links || data.Links );
      if (linkLists && slots) {
        for (s = 0; s < slots.length; s++) {
          slot = slots[s];
          if (!slot.pageTypes.includes(FI_Config.thisPageType)) continue;
          linkList = linkLists[slot.key];
          if (linkList) {
            if (!slot.element) {
              slot.element = FI_Core.createSlot(slot);
              if (!slot.element) continue;
            }
            if (FI_Config.thisPageType == 'Product' && FI_Config.productTabs) {
              var templateProductsContent = FI_Core.templateProducts(slot, linkList);
              if (templateProductsContent) {
                slot.element.innerHTML = templateProductsContent;
              }
              else {
                slot.element.parentNode.removeChild(slot.element);
              }
            }
            else {
              slot.element.innerHTML = FI_Core.templateLinks(slot, linkList);
            }
            rendered = true;
          }
        }
      }
      else {
        FI_Core.gaTrackEvent('links-no-links', FI_Config.thisPageUrl, true);
      }
      if (rendered) {
        FI_Core.gaTrackEvent('links-rendered', FI_Config.thisPageUrl, true);
        if (document.querySelector('style[data-id="fi-style"]') === null) {
          var elem = document.createElement('style');
          elem.setAttribute('data-id', 'fi-style');
          elem.innerHTML = FI_Config.styles.join(' ');
          FI_Core.attachElementTo(elem, document.body);
        }
        FI_Scripts.postRenderScripts();
      }
      else {
        FI_Core.gaTrackEvent('links-not-rendered', FI_Config.thisPageUrl, true);
      }
    },
  
    openTab: function(evt) {
      var tabId = evt.currentTarget.getAttribute('fi-pw-tab-id');
      FI_Core.activateTab(tabId);
      FI_Core.gaTrackEvent('open-tab', evt.currentTarget.innerText, false);
    },
  
    activateTab: function(tabId) {
      var i, tabHeadingElements, tabContentElements, tabIdElements;
  
      tabHeadingElements = document.querySelectorAll('.fi-pdp-pw__tab-heading');
      for (i = 0; i < tabHeadingElements.length; i++) {
        tabHeadingElements[i].classList.remove('fi-pw-tab-active');
      }
  
      tabContentElements = document.querySelectorAll('.fi-pdp-pw__tab-content');
      for (i = 0; i < tabContentElements.length; i++) {
        tabContentElements[i].classList.remove('fi-pw-tab-active');
      }
  
      tabIdElements = document.querySelectorAll('div[fi-pw-tab-id="' + tabId + '"]');
      for (i = 0; i < tabIdElements.length; i++) {
        tabIdElements[i].classList.add('fi-pw-tab-active');
        if (tabIdElements[i].classList.contains('fi-pdp-pw__tab-content')) {
          FI_Core.renderArrows(tabIdElements[i].querySelector('.fi-pdp-pw__content'));
        }
      }
  
      var scrollableElement = document.querySelector(".fi-pdp-pw__tab-content.fi-pw-tab-active .fi-list-scrollable");
      FI_Core.attachDrawScroll(scrollableElement);
    },
  
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t; },
  
    scrollInProgress: false,
  
    sideScroll: function(element, distance, duration) {
      if (FI_Core.scrollInProgress) return;
  
      FI_Core.scrollInProgress = true;
  
      var stop = false;
  
      var startx = Math.ceil(element.scrollLeft);
      var distanceSign = distance && distance / Math.abs(distance);
      var distanceCeil = distanceSign * Math.ceil(Math.abs(distance));
      var destx = startx + distance;
  
      var start = null;
  
      function draw(now) {
        if (stop) {
          FI_Core.scrollInProgress = false;
          return;
        }
  
        if (now - start >= duration) stop = true;
  
        var p = (now - start) / duration;
        var val = FI_Core.easeInOutQuad(p);
        var shiftDistance = stop ? distanceCeil : (destx - startx) * val;
  
        element.scrollLeft = startx + shiftDistance;
        requestAnimationFrame(draw);
      }
  
      function startAnim(timeStamp) {
        start = timeStamp;
        draw(timeStamp);
      }
  
      requestAnimationFrame(startAnim);
    },
  
    onArrowClick: function(e) {
      if (this.classList.contains('fi-arrow-active')) {
        var container = this.parentNode.querySelector('.fi-list-scrollable');
        if (!container) return;
        var direction = this.getAttribute('fi-arrow-direction');
        var distanceToRightBorder = container.scrollWidth - container.clientWidth - container.scrollLeft;
        var distanceToLeftBorder = container.scrollLeft;
        var remaingDistance = direction === 'left' ? distanceToLeftBorder : distanceToRightBorder;
        var directionSign = direction === 'left' ? -1 : 1;
        var scrollDistance = container.clientWidth;
        var adjustedDistance = Math.abs(scrollDistance - remaingDistance);
        if (adjustedDistance < 10) scrollDistance = Math.max(scrollDistance, remaingDistance);
        FI_Core.sideScroll(container, directionSign * (scrollDistance), 1000);
      }
      e.stopPropagation();
    },
  
    renderArrows: function(scrollElement) {
      var arrowActiveClassName = 'fi-arrow-active';
      var scrollElementParent = scrollElement.parentNode;
      var leftArrow = scrollElementParent.querySelector('.fi-arrow-left');
      var rightArrow = scrollElementParent.querySelector('.fi-arrow-right');
  
      if (scrollElement.scrollLeft == 0) {
        leftArrow.classList.remove(arrowActiveClassName);
      }
      else if (scrollElement.scrollLeft > 0) {
          leftArrow.classList.add(arrowActiveClassName);
      }
  
      if (Math.ceil(scrollElement.scrollLeft + scrollElement.clientWidth) >= scrollElement.scrollWidth - 2) {
        rightArrow.classList.remove(arrowActiveClassName);
      }
      else {
        rightArrow.classList.add(arrowActiveClassName);
      }
    },
  
    drawScrollDisposable: {},
  
    attachDrawScroll: function(el) {
      var initPageX = 0, lastPosX = 0, mouseDownTimestamp = 0, drag = false;
  
      if (!el || !el.className) return;
  
      if (FI_Core.drawScrollDisposable[el.className]) {
        FI_Core.drawScrollDisposable[el.className]();
        FI_Core.drawScrollDisposable[el.className] = null;
      }
  
      var dragScrollMouseDown = function(e) {
        initPageX = lastPosX = e.pageX;
        drag = true;
        mouseDownTimestamp = Date.now();
      };
      var dragScrollMouseUp = function() { drag = false; };
      var dragScrollMouseLeave = function(e) {
        if (e.target.className.indexOf(el.className) !== -1) {
          drag = false;
        }
      };
      var dragScrollMouseMove = function(e) {
        if (!drag) return;
        var diffX = e.pageX - lastPosX;
        lastPosX = e.pageX;
        el.scrollLeft -= diffX * 2;
      };
      var dragScrollClick = function(e) {
        if ((Date.now() - mouseDownTimestamp > 350) || Math.abs(initPageX - e.pageX) > 5) {
          e.stopPropagation();
          e.preventDefault();
        }
      };
  
      el.addEventListener('mousedown', dragScrollMouseDown, true);
      el.addEventListener('mouseup', dragScrollMouseUp, true);
      el.addEventListener('mouseleave', dragScrollMouseLeave, true);
      el.addEventListener('mousemove', dragScrollMouseMove, true);
      el.addEventListener('click', dragScrollClick, true);
  
      FI_Core.drawScrollDisposable[el.className] = function () {
        el.removeEventListener('mousedown', dragScrollMouseDown, true);
        el.removeEventListener('mouseup', dragScrollMouseUp, true);
        el.removeEventListener('mouseleave', dragScrollMouseLeave, true);
        el.removeEventListener('mousemove', dragScrollMouseMove, true);
        el.removeEventListener('click', dragScrollClick, true);
      };
    },
  
    newFilledArray: function(len, val) {
      var rv = new Array(len);
      while (--len >= 0) {
        rv[len] = val;
      }
      return rv;
    }
  };
  
  FI_Core.load();
  
  //Tracking

  pollerLite([".fi-link"], () => {
    const fiLinks = document.querySelectorAll(".fi-link");
    const fiLinksBottom = document.querySelectorAll(".fi-slot--plp-main-bottom .fi-link");

    for (let index = 0; index < fiLinks.length; index++) {
      const element = fiLinks[index];
      element.addEventListener("click", function () {
        fireEvent("Clicked FoundIt Link");
        fireEvent("Clicked FoundIt Link | Page: " + type);
      });
    }

    for (let index = 0; index < fiLinksBottom.length; index++) {
      const element = fiLinksBottom[index];
      element.addEventListener("click", function () {
        fireEvent("Clicked FoundIt Link Bottom");
        fireEvent("Clicked FoundIt Link Bottom | Page: " + type);
      });
    }

    //In Viewport

    function inViewport(element) {
      if (!element) return false;
      if (1 !== element.nodeType) return false;

      var html = document.documentElement;
      var rect = element.getBoundingClientRect();

      return (
        !!rect &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.left <= html.clientWidth &&
        rect.top <= html.clientHeight
      );
    }

    if (inViewport(document.querySelector(".fi-link"))) {
      //send event once
      fireEvent("Viewed FoundIt", true);
      fireEvent("Viewed FoundIt | Page: " + type, true);
    } else
      window.addEventListener("scroll", () => {
        if (inViewport(document.querySelector(".fi-link"))) {
          //send event once
          fireEvent("Viewed FoundIt", true);
          fireEvent("Viewed FoundIt | Page: " + type, true);
        }
      });

    if (
      inViewport(document.querySelector(".fi-slot--plp-main-bottom .fi-link"))
    ) {
      //send event once
      fireEvent("Viewed FoundIt", true);
      fireEvent("Viewed FoundIt | Page: " + type, true);
    } else
      window.addEventListener("scroll", () => {
        if (
          inViewport(
            document.querySelector(".fi-slot--plp-main-bottom .fi-link")
          )
        ) {
          //send event once
          fireEvent("Viewed FoundIt Bottom", true);
          fireEvent("Viewed FoundIt Bottom | Page: " + type, true);
        }
      });
  });
};
