/**
 * BV Sale Nav Reposition
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { addPoller, addEventListener, addObserver } from './winstack';
import settings from './settings';

const runMobile = () => {
  const navBar = cacheDom.get('.c-drawer-nav:last-of-type ul.c-drawer-nav__items', true);

  const item = navBar.querySelector('.BVSaleNav-item');
  if(item) {
    item.parentNode.removeChild(item);
  }

  // Experiment code
  const saleButtonCopy = `
    <li class="c-drawer-nav__item BVSaleNav-item">
      <a class="c-drawer-nav__label" href="/collections/sale/" title="Sale" id="sale" role="menuitem" data-ref="Navigation: Sale">
        <span class="c-tag">Sale</span>
      </a>
    </li>
  `;

  let timeout = 500;

  setTimeout(() => {
    navBar.insertAdjacentHTML('afterbegin', saleButtonCopy);
  }, timeout);

  events.send(settings.ID, 'Active', 'Sale Button has moved.', {
    sendOnce: true
  });
};

const runDesktop = () => {
  const navBar = cacheDom.get('ul.c-navigation__items', true);
  // Experiment code
  const saleButtonCopy = `
    <li class="c-navigation__item BVSaleNav-item">
      <a href="/collections/sale/" title="Sale" id="sale" role="menuitem" data-ref="Navigation: Sale">
        <span class="c-tag">Sale</span>
      </a>
    </li>
  `;

  navBar.insertAdjacentHTML('afterbegin', saleButtonCopy);
  events.send(settings.ID, 'Active', 'Sale Button has moved.');

  addPoller([
    // Sometimes it gets removed
    () => {
      const navBar = cacheDom.get('ul.c-navigation__items', true);
      return !navBar.querySelector('.BVSaleNav-item');
    }
  ], () => {
    runDesktop();
  }, {
    timeout: 5000  
  });
};

const activate = () => {
  setup();

  // Desktop
  addPoller([
    'ul.c-navigation__items',
    '.c-navigation__item',
  ], () => {
    runDesktop();
  });

  // Mobile
  addPoller([
    '.c-drawer-nav',
    'ul.c-drawer-nav__items',
    'li.c-drawer-nav__item',
    () => document.querySelectorAll('li.c-drawer-nav__item').length > 4,
  ], () => {
    runMobile();
  });

  // Events
  const addedSaleBtn = document.querySelector('.BVSaleNav-item a');
  if (addedSaleBtn) {
    addedSaleBtn.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'User clicked new sale nav link.');
    });
  }

  // Observe body class. Using the nav, will remove it.
  // Due to React, we need to add an observer to the doc body.
  addObserver(document.body, () => {
    if (!document.body.classList.contains(settings.ID)) {
      document.body.classList.add(settings.ID);
    }

    // Sometimes the sale nav is rmoved from mobile
    const navBar = cacheDom.get('.c-drawer-nav:last-of-type ul.c-drawer-nav__items', true);
    if(navBar && !navBar.querySelector('.BVSaleNav-item')) {
      runMobile();
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    },
  });
};

export default activate;
 
