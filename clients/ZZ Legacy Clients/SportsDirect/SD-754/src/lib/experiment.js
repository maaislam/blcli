/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';
 import debounce from 'lodash/debounce';

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

  // PRODUCTION PARAMETERS
  let currURL = '${currURL}';
  let redirectURL = '${redirectURL}';
  let experimentID = '${experimentID}';

  // TESTING PARAMETERS
  // let currURL = 'https://www.sportsdirect.com/adidas';
  // let redirectURL = 'https://www.sportsdirect.com/adidas/elevation';
  // let experimentID = 'SD-TEST-001';

  fireEvent(`Conditions Met - expID: ${experimentID}, currURL: ${currURL}, redirURL: ${redirectURL}`);

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

  if(window.location.href.indexOf(currURL) > -1 && window.location.href.indexOf(redirectURL) <= -1) {

    logMessage("Original URL Page");

    if(document.referrer !== "") {
      fireEvent(`experimentID: ${experimentID} - Interaction - user has arrived at the ${currURL} page from: ${document.referrer}`, true);
    }
  
    setTimeout(() => {
      if(window.location.href.indexOf('elevation') == -1) {
        fireEvent(`experimentID: ${experimentID} - Interaction - user has arrived at the ${currURL} page and is redirected to ${redirectURL}`, true);
        window.location.href = redirectURL;
      }
    }, 500);
  } else if(window.location.href.indexOf(redirectURL) > -1) {

    logMessage("Redirected URL Page");

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
        fireEvent(`experimentID: ${experimentID} - Visible - user has scrolled past 25%`, true);
        twentyFiveSeen = true;
      } else if(scrollPercent > 50 && fiftySeen == false) {
        fireEvent(`experimentID: ${experimentID} - Visible - user has scrolled past 50%`, true);
        fiftySeen = true;
      } else if(scrollPercent > 75 && seventyFiveSeen == false) {
        fireEvent(`experimentID: ${experimentID} - Visible - user has scrolled past 75%`, true);
        seventyFiveSeen = true;
      } else if(scrollPercent > 90 && footerSeen == false) {
        fireEvent(`experimentID: ${experimentID} - Visible - user has scrolled to the footer`, true);
        footerSeen = true;
      }

    }, 100));

    // Top Nav / Search Events

    if(window.outerWidth > 767) {

      pollerLite(['#txtSearch', '#topMenuWrapper'], () => {
        let searchBox = document.querySelector('#txtSearch');
        let searchBoxClickFired = false;
        searchBox.addEventListener('click', (e) => {
          if(searchBoxClickFired == false) {
            fireEvent(`experimentID: ${experimentID} - Click - user has clicked to use the search box, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they clicked`, true);
            searchBoxClickFired = true;
          }
          
        });
  
        let menuWrapper = document.querySelector('#topMenuWrapper');
        let topMenuWrapperEvent = false;
        observer.connect(menuWrapper, () => {
          if(menuWrapper.classList.contains('menu-interaction') && topMenuWrapperEvent == false) {
            fireEvent(`experimentID: ${experimentID} - Click - user has opened the top nav, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they did so`, true);
            topMenuWrapperEvent = true;
          }
          
  
        }, {
          config: {
            attributes: true,
            childList: true,
            subtree: false,
          }
        })
      });
      
    } else {

      pollerLite(['#MobtxtSearch', '#mobMenuContainer #trigger'], () => {
        let searchBox = document.querySelector('#MobtxtSearch');
        let searchBoxClick = false;
        searchBox.addEventListener('click', (e) => {
          if(searchBoxClick == false) {
            fireEvent(`experimentID: ${experimentID} - Click - ${experimentID} user has clicked to use the mobile search box, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they clicked`, true);
            searchBoxClick = true;
          }
          
        });
  
        let mobMenuIcon = document.querySelector('#mobMenuContainer #trigger');
        let menuBoxClick = false;
        mobMenuIcon.addEventListener('click', (e) => {
          if(menuBoxClick == false) {
            fireEvent(`experimentID: ${experimentID} - Click - user has clicked to use the mobile menu, and ${scrolled == true ? 'have scrolled the page' : 'have not scrolled the page'} before they clicked`, true);
            menuBoxClick = true;
          }
          
        });
      })

      
    }

    // All elements click
    pollerLite(['.ContentWrapper a'], () => {
      let allALinks = document.querySelectorAll('.ContentWrapper a');
      [].slice.call(allALinks).forEach((link) => {
        link.addEventListener('click', (e) => {
          fireEvent(`experimentID: ${experimentID} - Click - link clicked on page from element with href: ${e.currentTarget.href}`, true);
        });
      });
    });
    



  }

  

};
