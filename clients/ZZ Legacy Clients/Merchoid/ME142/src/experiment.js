import { fullStory, scrollTo, events } from '../../../../lib/utils';

/**
 * {{ME142}} - {{Clearance page optimisation}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME142',
    VARIATION: '2',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const productsInfo = document.querySelectorAll('.info');
    let oldPrice;
    let newPrice;
    // let discount;
    let saveAmount;
    /*eslint-disable */
    [].forEach.call(productsInfo, (value) => {
      if (value.querySelector('.price > del > .amount')) {
        if (value.querySelector('.price > del > .woocommerce-Price-amount')) {
          oldPrice = services.getFloat(value.querySelector('.price > del > .woocommerce-Price-amount').innerHTML);
        } else {
          oldPrice = value.querySelector('.price > del > .amount').innerHTML;
          oldPrice = services.getFloat(oldPrice);
        }
        if (isNaN(oldPrice)) {
          oldPrice = oldPrice.substr(1);
        }
        if (value.querySelector('.price > ins > .woocommerce-Price-amount')) {
          newPrice = services.getFloat(value.querySelector('.price > ins > .woocommerce-Price-amount').innerHTML);
        } else {
          newPrice = value.querySelector('.price > ins > .amount').innerHTML;
          newPrice = services.getFloat(newPrice);
        }
        if (isNaN(newPrice)) {
          newPrice = newPrice.substr(1);
        }
        // Calculates discount percentage/saving amount and replaces the text
        // discount = 'Save ' + Math.floor(( oldPrice - newPrice ) / oldPrice * 100) + '%';
        let currency;
        if (window.merchoidDetectedCountry === 'GB') {
          currency = '£';
        } else if (window.merchoidDetectedCountry === 'US') {
          currency = '$';
        }
        if ((oldPrice - newPrice) % 1 === 0) {
          saveAmount = 'Save ' + currency + (oldPrice - newPrice);
        } else {
          saveAmount = 'Save ' + currency + (oldPrice - newPrice).toFixed(2).replace('.00', '');
        }
        // value.querySelector('.inner-text').innerHTML = discount;
        value.querySelector('.inner-text').innerHTML = saveAmount;
      }
    });
    /* eslint-enable */

    /**
     * @desc Creates anchors IDs on category titles
     */
    const categoriesTitles = document.querySelectorAll('h3');
    const titles = [];
    /*eslint-disable */
    [].forEach.call(categoriesTitles, (value) => {
      if (!value.classList.contains('widget-title')) {
        const title = value.innerHTML;
        titles.push(title);
        value.setAttribute('id', services.camelize(title).replace(/,/g, ''));
      }
    });
    /* eslint-enable */

    /**
     * @desc Creates container for anchor links
     */
    /*eslint-disable */
    const pageTitle = document.querySelector('.entry-content > h1');
    const anchorContainer = `<div class='ME142-anchorList__mobile'>
    <div class='brand-mobile-bar-nav-wrap'>
    <span>Jump to</span>
    <select id='ME142-select' class='brand-mobile-bar-nav'><option id='ME142-default-option__mobile' selected disabled>Select a category</option></select>
    </div></div>
    <div class='ME142-row brand-anchor-links'><ul class='ME142-anchorList'></ul></div>`;
    pageTitle.insertAdjacentHTML('afterend', anchorContainer);

    const anchorWrapper = document.querySelector('.ME142-anchorList');
    const optionListMobile = document.getElementById('ME142-default-option__mobile');

    let link;
    let option;
    let heading;
    let headingVal;
    titles.reverse().forEach((title) => {
      const anchor = '#' + services.camelize(title).replace(/,/g, '');// eslint-disable-line prefer-template
      link = `<li><a href='' value='${anchor}'>${title}<a></li>`;// eslint-disable-line prefer-template
      anchorWrapper.insertAdjacentHTML('afterbegin', link);
      option = `<a href='${anchor}'><option value='${anchor}'>${title}</option></a>`;
      heading = document.querySelector(anchor);
      optionListMobile.insertAdjacentHTML('afterend', option);
    });

    /**
     * @desc Mobile Nav EventListener
     */
    const select = document.querySelector('select');
    select.addEventListener('change', (e) => {
      const selectedVal = document.querySelector('#ME142-select').value;
      heading = document.querySelector(selectedVal);
      headingVal = heading.getBoundingClientRect().y + window.scrollY;
      if (headingVal > 0) {
        e.preventDefault();
        let offsetHeight = document.querySelector('.ME142-anchorList__mobile').offsetHeight * 2;
        if (document.querySelector('.ME142-sticky-nav')) {
          offsetHeight = document.querySelector('.ME142-sticky-nav').offsetHeight;
          scrollTo(headingVal - offsetHeight);
        } else {
          scrollTo(headingVal - offsetHeight);
        }
      }
      // GA Event
      events.send('ME142', 'Mobile - Clicked on Nav Option', selectedVal);
    });

    /**
     * @desc Desktop Nav EventListener
     */
    document.querySelector('ul.ME142-anchorList').addEventListener('click', (e) => {
      const linkId = e.target.getAttribute('value');
      if (linkId) {
        heading = document.querySelector(linkId);
        headingVal = heading.getBoundingClientRect().y + window.scrollY;
        if (headingVal > 0) {
          e.preventDefault();
          const scrollAmount = window.pageYOffset || document.documentElement.scrollTop;
          let offsetHeight = document.querySelector('.ME142-anchorList').offsetHeight + 180;
          if (document.querySelector('.ME142-sticky-nav')) {
            offsetHeight = document.querySelector('.ME142-sticky-nav').offsetHeight + 10;
            scrollTo(headingVal - offsetHeight);
          } else {
            scrollTo(headingVal - offsetHeight);
          }
        }
        // GA Event
        events.send('ME142', 'Desktop - Clicked on Nav Anchor Link', linkId);
      }
    });
    /* eslint-enable */

    if (window.innerWidth > 784) {
      // Desktop sticky nav
      const anchorListDesktop = document.querySelector('.ME142-row.brand-anchor-links');
      services.detectScroll(anchorListDesktop);
    } else {
      // Mobile sticky nav
      const anchorListMobile = document.querySelector('.ME142-anchorList__mobile');
      services.detectScroll(anchorListMobile);
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Gets float number from string
     */
    /*eslint-disable */
    getFloat: function getFloat(str) {
      const regex = /[+-]?\d+(\.\d+)?/g;
      const floats = str.match(regex).map(function(v) { return parseFloat(v); });
      return floats[0];
    },
    /**
     * @desc Transforms element IDs to camelCase
     */
    camelize: function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    },
    detectScroll: function detectScroll(listNav) {
      let lastScrollTop = document.querySelector('h3').offsetTop; 
      window.addEventListener("scroll", function(){ //detect the scroll
        var scrollAmount = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollAmount > lastScrollTop){
          //  add class here
          listNav.classList.add('ME142-sticky-nav');
        } else if (scrollAmount < lastScrollTop) {
          // remove class here
          listNav.classList.remove('ME142-sticky-nav');
        }
      }, false);
    },
    /* eslint-enable */
  },

  components: {},
};

export default Experiment;
