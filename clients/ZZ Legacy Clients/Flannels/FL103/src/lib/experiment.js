/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events, setCookie, deleteCookie, getCookie } from '../../../../../lib/utils';
import { nav } from './nav';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send('FL103', 'FL103 Control', 'Control is active');
    
  } else {
    events.send('FL103', `FL103 Variation ${VARIATION}`, 'FL103 Variation is active');
  }

  if (VARIATION == 1) {
    /**
     * We'll keep the old nav as is, so we can use functions from that such as newsletter sign up etc
     * 
     */
    //  MenuCloseActive
    const closeOldMenu = document.querySelector('.MenuCloseActive');

    const closeTheOldMenu = () => closeOldMenu ? closeOldMenu.click() : null;

    // Add new nav
    const bodyWrap = document.querySelector('#BodyWrap');
    bodyWrap.insertAdjacentHTML('afterbegin', nav());



    // Add new dropdown functions
    const toggleDropdown = (topLevelItem) => topLevelItem.classList.toggle('FL-showDrop');


    const newNav = document.querySelector('.FL-nav');

    // Remove inline style
    setTimeout(() => {
      newNav.removeAttribute('style');
    }, 300);


    const toggleTabs = (thisTab) => {
      const dataAttr = thisTab.dataset.tab;
      if (dataAttr) {
        // Remove Old
        const activeTab = document.querySelector('.FL-nav--tab.FL-activeTab');
        activeTab ? activeTab.classList.remove('FL-activeTab') : null;
        const activeTabTitle = document.querySelector('.FL-tabLink.FL-activeTitle');
        activeTabTitle ? activeTabTitle.classList.remove('FL-activeTitle') : null;

        // Add New
        const corraspondingTabContent = document.querySelector(`#${dataAttr}`);
        corraspondingTabContent ? corraspondingTabContent.classList.add('FL-activeTab') : null;

        thisTab.classList.add('FL-activeTitle');
      }
    }

    // Gender Tabs
    const tabLinks = document.querySelectorAll('button.FL-tabLink');
    if (tabLinks) {
      Array.from(tabLinks).map((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          events.send(ID, 'FL103 Click', 'FL103 User clicked menu tabs');
          return toggleTabs(link);
        });
      });
    }

    // Top Level Dropdowns
    const topLevelLinks = document.querySelectorAll('.FL-nav li.level1.mmHasChild');
    Array.from(topLevelLinks).map((link) => {
      link.addEventListener('click', (e) => {
        
        const { target } = e;
        if (target && target.classList.contains('FL-noLink')) {
          e.preventDefault();
        } else if (target && target.classList.contains('liMyAccount')) {
          e.preventDefault();
        }

        

        // Hide others
        const openDropdown = document.querySelector('li.level1.FL-showDrop');
        if (openDropdown === link) {
          toggleDropdown(link);
        } else {
          openDropdown ? openDropdown.classList.remove('FL-showDrop') : null;
          // Show this one
          toggleDropdown(link);
        }
      });
    });


    // Default Mobile Hamburger to trigger our new nav
    const mobMenu = document.querySelector('#mobMenuContainer');
    const mobMenuTrigger = document.querySelector('#mobMenuContainer a#trigger');
    mobMenu.addEventListener('click', (e) => {
      e.preventDefault();
      newNav.classList.add('FL-activeNav');
    });
    mobMenuTrigger.addEventListener('click', (e) => e.preventDefault());


    // New close menu
    const newCloseMenu = document.querySelector('.FL-nav .FL-navClose');

    newCloseMenu.addEventListener('click', () => {
      closeTheOldMenu();
      newNav.classList.remove('FL-activeNav');
      events.send(ID, 'FL103 Click', 'FL103 User closed the menu');
    });
    


    // Toggle currecnies
    const oldCurrencyWrap = document.querySelector('#mp-menu #liMobileCurrencySelector .currencySelectorMobile');
    const newCurrencyWrap = document.querySelector('.FL-nav #liMobileCurrencySelector .currencySelectorMobile');
    const currencyLink = document.querySelector('.FL-nav #liMobileCurrencySelector > a');

    // Open Currencies
    currencyLink.addEventListener('click', (e) => {
      e.preventDefault();
      newCurrencyWrap.classList.toggle('FL-show');
    });
    

    // Toggle currency
    newCurrencyWrap.addEventListener('click', (e) => {
      // e.preventDefault();

      const { target } = e;
      const listItem = target.closest('li');
      const thisInput = listItem.querySelector('input');
      const thisVal = thisInput.getAttribute('value');
      
      if (thisVal) {
        if (getCookie('FlannelsFashion_AnonymousUserCurrency')) {
          deleteCookie('FlannelsFashion_AnonymousUserCurrency');
        }
        setTimeout(() => {
          setCookie('FlannelsFashion_AnonymousUserCurrency', thisVal);
          window.location.reload();
        }, 500);
      }

    });

    // Newsletter submission
    const newButtonWrap = document.querySelector('.FL-nav .newsletterButtons');
    const newInput = document.querySelector('.FL-nav .signupInner > input[type="text"]');

    newButtonWrap ? newButtonWrap.addEventListener('click', (e) => {
      e.preventDefault();
      const { value } = e.target;
      if (value && newInput) {
        // Get input value
        const inputVal = newInput.value;

        // Find existing site form and replicate functions
        const oldInput = document.querySelector('#mp-menu .signupInner > input[type="text"]');
        const oldButton = document.querySelector(`#mp-menu .newsletterButtons input[value="${inputVal}"]`);

        if (oldInput && oldButton) {
          oldInput.value = inputVal;
          oldButton.click();
        }
      }
    }) : null;



    // Bottom Nav Links
    const bottomLinks = document.querySelectorAll('.FL-bottomNav li.root:not(.mmHasChild) a.menuitemtext');
    if (bottomLinks) {
      Array.from(bottomLinks).map((link) => link.addEventListener('click', (e) => {
        e.currentTarget.click();
      }));
    }

  }


  // Level 2 events
  const level2Links = document.querySelectorAll('li.level2 > a');
  if (level2Links) {
    Array.from(level2Links).map((link) => {
      link.addEventListener('click', () => {
        events.send('FL103', 'FL103 Click', 'FL103 Navigation click');
      });
    });
  }

  if (VARIATION == 2) {
    return false;
  }

};
