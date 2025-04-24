/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import debounce from 'lodash/debounce';
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  // Percentage Scroll

  let scrolled = false;
  window.addEventListener('scroll', debounce(() => {
        
    scrolled = true;

  }, 100));

  // Intersection Observer #1 - 25%

  let trendingNow = document.querySelector('.SD_Mens_Elevation9');
  var trendingNowScrollWatch = new window.IntersectionObserver(function (entries1) {
    entries1.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        fireEvent("Visible - user has scrolled to the brand logo section on the elevation page, around 25% down", true);
        trendingNowScrollWatch.unobserve(trendingNow);
      }
    });
  }, {
    root: null
  });
  trendingNowScrollWatch.observe(trendingNow);

  // Intersection Observer #2 - 50%

  let featuredSection = document.querySelector('.SD_Mens_Elevation7');
  var featuredSectionScrollWatch = new window.IntersectionObserver(function (entries2) {
    entries2.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        fireEvent("Visible - user has scrolled to the new releases section section on the elevation page, around 50% down", true);
        featuredSectionScrollWatch.unobserve(featuredSection);
      }
    });
  }, {
    root: null
  });
  featuredSectionScrollWatch.observe(featuredSection);

  // Intersection Observer #3 - 75%

  let categorySection = document.querySelector('.SD_Mens_Elevation6b');
  var categorySectionScrollWatch = new window.IntersectionObserver(function (entries3) {
    entries3.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        fireEvent("Visible - user has scrolled to the popular picks section on the elevation page, around 75% down", true);
        categorySectionScrollWatch.unobserve(categorySection);
      }
    });
  }, {
    root: null
  });
  categorySectionScrollWatch.observe(categorySection);

  // Intersection Observer #4 - 100%

  let footerSection = document.querySelector('.FooterWrap');
  var footerSectionScrollWatch = new window.IntersectionObserver(function (entries4) {
    entries4.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        fireEvent("Visible - user has scrolled to the footer on the elevation page, 100% down", true);
        footerSectionScrollWatch.unobserve(footerSection);
      }
    });
  }, {
    root: null
  });
  footerSectionScrollWatch.observe(footerSection);

  // Top Nav / Search Events

  if(window.outerWidth > 767) {
    let searchBox = document.querySelector('#txtSearch');
    let searchBoxClickFired = false;
    searchBox.addEventListener('click', (e) => {
      if(searchBoxClickFired == false) {
        fireEvent(`Click - user has clicked to use the search box, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they clicked`, true);
        searchBoxClickFired = true;
      }
      
    });
  
    let menuWrapper = document.querySelector('#topMenuWrapper');
    let topMenuWrapperEvent = false;
    observer.connect(menuWrapper, () => {
      if(menuWrapper.classList.contains('menu-interaction') && topMenuWrapperEvent == false) {
        fireEvent(`Click - user has opened the top nav, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they did so`, true);
        topMenuWrapperEvent = true;
      }
      

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    })
      
    
  } else {
    let searchBox = document.querySelector('#MobtxtSearch');
    let searchBoxClick = false;
    searchBox.addEventListener('click', (e) => {
      if(searchBoxClick == false) {
        fireEvent(`Click - user has clicked to use the mobile search box, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they clicked`, true);
        searchBoxClick = true;
      }
      
    });
  
    let mobMenuIcon = document.querySelector('#mobMenuContainer #trigger');
    let menuBoxClick = false;
    mobMenuIcon.addEventListener('click', (e) => {
      if(menuBoxClick == false) {
        fireEvent(`Click - user has clicked to use the mobile menu, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they clicked`, true);
        menuBoxClick = true;
      }
      
    });
  }

  // All elements click

  let allALinks = document.querySelectorAll('.ContentWrapper a');
  [].slice.call(allALinks).forEach((link) => {
    link.addEventListener('click', (e) => {
      fireEvent('Click - link clicked on page from element with href: '+e.currentTarget.href);
    });
  });

  

};
