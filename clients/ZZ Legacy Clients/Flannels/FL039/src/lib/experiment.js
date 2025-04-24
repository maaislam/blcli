/**
 * FL039 - Brands Navigation Mobile
 * @author User Conversion
 */
import { setup, buildMenu, addMenu, buildPlus, toggleMenu } from './services';
import { events } from './../../../../../lib/utils';
import { pollerLite, observer } from './../../../../../lib/uc-lib';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();
  const mainNav = document.querySelector('#mobMenuContainer');
  if (settings.VARIATION === '2') {
    // Control
    mainNav.addEventListener('click', () => {
      events.send(settings.ID, 'Control', 'Main Navigation Clicked');
    });
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  // ------ Menu ------
  const menuChanges = () => {
    const menu = buildMenu();
    const ref = document.querySelector('#mp-menu .MobileMenuContentWrap .shop ul li.has-dropdown.mmHasChild.multicolumn.MenuGroupE.mobOnly:last-of-type > a');
    console.log(ref);
    if (ref) {
      ref.parentElement.classList.add('FL039-brands');
    }
    addMenu(menu, ref);

    const brandRef = document.querySelector('#mp-menu .shop ul li.FL039-brands > a span.menuitemtext');
    const plusMenu = buildPlus();

    addMenu(plusMenu, brandRef);
    events.send(settings.ID, 'Active', 'Brand menu has been added');

    // Remove a href
    ref.setAttribute('href', '');

    const addedMenu = document.querySelector('li.FL039-brands');
    if (addedMenu) {
      // Top Level Menu
      const topMenuClickEle = addedMenu.querySelector('a:first-of-type');
      const topMenuToToggle = addedMenu.querySelector('.FL039-brand-menu');
      if (topMenuClickEle && topMenuToToggle) {
        toggleMenu(topMenuClickEle, topMenuToToggle);
      }
      // Sub Menu
      const subMenuClickEle = addedMenu.querySelector('.FL039-brand-menu > ul > li:first-of-type > a');
      const subMenuToToggle = addedMenu.querySelector('.FL039-brand-menu > ul > li:first-of-type .FL039-popular');
      if (subMenuClickEle && subMenuToToggle) {
        toggleMenu(subMenuClickEle, subMenuToToggle);
      }
    }

    // Tracking
    function clickTracking() {
      const brandMenu = document.querySelector('li.FL039-brands > a');
      const topLevelLinks = document.querySelectorAll('.FL039 .FL039-brand-menu > ul > li:not(:first-of-type) a');
      const mostPopularBrands = document.querySelectorAll('.FL039-popular ul li a');

      if (mainNav) {
        mainNav.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Main Navigation', { sendOnce: true });
        });
      }
      if (brandMenu) {
        brandMenu.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Brands Menu Toggle', { sendOnce: true });
        });
      }
      if (topLevelLinks.length) {
        for (let i = 0; topLevelLinks.length > i; i += 1) {
          topLevelLinks[i].addEventListener('click', () => {
            events.send(settings.ID, 'Click', 'Brands Top Level Links');
          });
        }
      }
      if (mostPopularBrands.length) {
        for (let i = 0; mostPopularBrands.length > i; i += 1) {
          mostPopularBrands[i].addEventListener('click', () => {
            const brandName = mostPopularBrands[i].textContent;
            events.send(settings.ID, 'Click', `Popular Brand Link; ${brandName}`);
          });
        }
      }
    }
    clickTracking();
  };

  // Set mutation observer on nav to watch for DOM being rebuilt
  const menu = document.querySelector('#mp-menu');
  const menuObserver = {
    connect: () => {
      observer.connect(menu, (els, mutation) => {
        const { attributeName } = mutation;

        const inputWasChecked = attributeName && attributeName === 'checked';

        // If currency input was checked the menu is about to be rebuilt
        if (inputWasChecked) {
          // Poll for the new class to NOT exist (meaning the menu has been rebuilt) then re-apply changes
          pollerLite([
            '#mp-menu .MobileMenuContentWrap .shop ul li.has-dropdown.mmHasChild.multicolumn.MenuGroupE.mobOnly:last-of-type > a',
            () => !document.querySelector('.FL039-brand-menu'),
          ], () => {
            menuChanges();
            menuObserver.disconnect();
          });
        }
      }, {
        throttle: 0,
        config: { childList: false, attributes: true, subtree: true },
      });
    },
    disconnect: () => {
      observer.disconnect(menu);
    },
  };
  menuObserver.connect();

  // Remove mutation observer after 3s to avoid excessive resource consumption
  setTimeout(menuObserver.disconnect, 3000);

  // Init menu changes
  menuChanges();

  // On click of menu, check for test and re add
  const menuToggle = document.querySelector('#mobMenuContainer');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (!document.querySelector('.FL039 li.FL039-brands')) {
        menuChanges();
      }
    });
  }
};

export default activate;
