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
 import { events, logMessage, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const getScrollPercent = () => {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  let answer = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  return answer.toFixed(2);
}

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
  let twentyFiveSeen = false;
  let fiftySeen = false;
  let seventyFiveSeen = false;
  let footerSeen = false;
  window.addEventListener('scroll', debounce(() => {
        
    scrolled = true;

    let scrollPercent = getScrollPercent();

    if(scrollPercent > 25 && twentyFiveSeen == false) {
      fireEvent('Visible - user has scrolled past 25%', true);
      twentyFiveSeen = true;
    } else if(scrollPercent > 50 && fiftySeen == false) {
      fireEvent('Visible - user has scrolled past 50%', true);
      fiftySeen = true;
    } else if(scrollPercent > 75 && seventyFiveSeen == false) {
      fireEvent('Visible - user has scrolled past 75%', true);
      seventyFiveSeen = true;
    } else if(scrollPercent > 90 && footerSeen == false) {
      fireEvent('Visible - user has scrolled to the footer', true);
      footerSeen = true;
    }

  }, 100));

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
