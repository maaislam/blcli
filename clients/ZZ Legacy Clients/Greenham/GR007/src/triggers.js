import { ActivateProductPage, ActivateCategoryPage, ActivateHomePage } from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Product Page Poller
if (/((\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+($|\?.*)|.*(gallery).*|^(\/)(Safety-Signs)(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+.*|(\/)[\w\d\s-+_=~]+(\/)[\w\d\s-+_=~]+(\/).*(~p~).*)/.test(window.location.pathname)) {
  pollerLite([
    'body',
    '.secLinePrice', // In VAT price container
    () => {
      let checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    },
    // Check for logged in B2C or logged out
    () => {
      let profileCheck = false;
      // Check for either login class or logged in class without a "my company class"
      if (document.querySelector('.login') || (document.querySelector('.logged_in') && !document.querySelector('a[href="/my-company"]'))) {
        profileCheck = true;
      }
      return profileCheck;
    },
    // Check for logged in B2C or logged out
    () => {
      // Try to find logged out class, if not then use navitagion links
      const loggedOut = document.querySelector('.login');
      if (loggedOut) {
        return true;
      }
      const allNavItems = document.querySelectorAll('.PD005_link');
      // Make sure at least one item exists
      if (allNavItems.length !== 0) {
        let notB2B = true;
        // Iterate over tabs, check for text: 'Contract Products'
        for (let i = 0; i < allNavItems.length; i += 1) {
          const currentText = allNavItems[i].textContent.toUpperCase();
          if (currentText === 'CONTRACT PRODUCTS') {
            notB2B = false;
            break;
          }
        }
        return notB2B;
      }
      return false;
    },
  ], ActivateProductPage);
  // Category PagePoller
} else if (window.location.pathname.indexOf('~c~') !== -1) {
  pollerLite([
    'body',
    '.pd3-addto', // Area after prices
    '.prod_cols', // Product Area
    () => {
      let checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    },
    // Check for logged in B2C or logged out
    () => {
      // Try to find logged out class, if not then use navitagion links
      const loggedOut = document.querySelector('.login');
      if (loggedOut) {
        return true;
      }
      const allNavItems = document.querySelectorAll('.PD005_link');
      // Make sure at least one item exists
      if (allNavItems.length !== 0) {
        let notB2B = true;
        // Iterate over tabs, check for text: 'Contract Products'
        for (let i = 0; i < allNavItems.length; i += 1) {
          const currentText = allNavItems[i].textContent.toUpperCase();
          if (currentText === 'CONTRACT PRODUCTS') {
            notB2B = false;
            break;
          }
        }
        return notB2B;
      }
      return false;
    },
  ], ActivateCategoryPage);
  // Activate Home page
} else {
  pollerLite([
    '.jcarousel.jcarousel-clip.jcarousel-clip-horizontal', // Carousel product container
    // Check for logged in B2C or logged out
    () => {
      // Try to find logged out class, if not then use navitagion links
      const loggedOut = document.querySelector('.login');
      if (loggedOut) {
        return true;
      }
      const allNavItems = document.querySelectorAll('.PD005_link');
      // Make sure at least one item exists
      if (allNavItems.length !== 0) {
        let notB2B = true;
        // Iterate over tabs, check for text: 'Contract Products'
        for (let i = 0; i < allNavItems.length; i += 1) {
          const currentText = allNavItems[i].textContent.toUpperCase();
          if (currentText === 'CONTRACT PRODUCTS') {
            notB2B = false;
            break;
          }
        }
        return notB2B;
      }
      return false;
    },
  ], ActivateHomePage);
}
