import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import { Header } from './components/menuHeader';
import { Update_Header } from './components/updateHeader';
import { ArrowRight } from './components/icons';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  if (location.href.includes('/checkout')) return;
  setup();

  var sessionStorage_transfer = function (event) {
    if (!event) {
      event = window.event;
    } // ie suq
    if (!event.newValue) return; // do nothing if no value to work with
    if (event.key == 'getSessionStorage') {
      // another tab asked for the sessionStorage -> send it
      localStorage.setItem('shareSessionStorage', sessionStorage.getItem(`${ID}-navSearchUsed`));
      // the other tab should now have it, so we're done with it.
      localStorage.removeItem('shareSessionStorage'); // <- could do short timeout as well.
    } else if (event.key == 'shareSessionStorage') {
      // another tab sent data <- get it
      var data = JSON.parse(event.newValue);
      if (data != '' && data != null) {
        sessionStorage.setItem(`${ID}-navSearchUsed`, data);
      } else {
        sessionStorage.removeItem(`${ID}-navSearchUsed`);
      }
    } else if (event.key == 'removeSessionStorage') {
      sessionStorage.removeItem(`${ID}-navSearchUsed`);
    }
  }; // listen for changes to localStorage
  if (window.addEventListener) {
    window.addEventListener('storage', sessionStorage_transfer, false);
  } else {
    window.attachEvent('onstorage', sessionStorage_transfer);
  } // Ask other tabs for session storage (this is ONLY to trigger event)
  if (!sessionStorage.getItem(`${ID}-navSearchUsed`)) {
    localStorage.setItem('getSessionStorage', `dummy`);
    localStorage.removeItem('getSessionStorage', `dummy`);
  }

  document.body.addEventListener('click', ({ target }) => {
    console.log(target, 'target');
    if (target.closest('.icon.menu-icon')) {
      fireEvent('Conditions met');
    } else if (target.closest('#add-to-cart') && sessionStorage.getItem(`${ID}-navSearchUsed`)) {
      fireEvent(`User clicks to add to the bag from Quick Buy after using ${sessionStorage.getItem(`${ID}-navSearchUsed`)}`);

      sessionStorage.removeItem(`${ID}-navSearchUsed`);
      localStorage.setItem('removeSessionStorage', 'dummy');
      localStorage.removeItem('removeSessionStorage', 'dummy');
    }
  });

  pollerLite(['#navigation']).then(() => {
    const searchForm = document.querySelector('#navigation');
    searchForm.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        sessionStorage.setItem(`${ID}-navSearchUsed`, 'Navigation');
      }
    });
  });

  if (VARIATION === 'control') {
    // Control code
    return;
  }

  if (VARIATION == '1') {
    let header = '';
    let sub_header = '';

    //overlay
    const overlay = document.createElement('div');
    overlay.classList.add(`${ID}-overlay`);
    document.body.prepend(overlay);

    const nav = document.querySelector('#navigation');
    nav.querySelector('.main-navigation').style = 'width: 100% !important;';
    //nav.querySelector(".drop-down-options.menu-wrapper").classList.add(`${ID}__menu-wrapper`);
    nav.querySelector('.hover-drop-down.menu-item').classList.add(`hover`);
    if (!document.querySelector(`.${ID}__menu-header`)) {
      nav.querySelector('.drop-down-options.menu-wrapper').insertAdjacentHTML('afterbegin', Header(ID));
      document.querySelectorAll('.has-sub-menu-level-2').forEach((item) => {
        item.insertAdjacentHTML('beforeend', ArrowRight(ID));
      });
    }

    nav.querySelector('#hamburger-menu .menu-title')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('menu-open');
      document.querySelector(`.${ID}-overlay`).classList.add('active');
      nav.querySelector('.drop-down-options.menu-wrapper').classList.add(`${ID}__menu-wrapper`);
    });

    //listner for menu header update
    nav.querySelector('.drop-down-options.menu-wrapper').addEventListener('click', ({ target }) => {
      console.log(target, 'target');
      console.log(target.closest('has-sub-menu-level-2'), 'jjj');

      if (target.closest('.has-sub-menu') || target.classList.contains('has-sub-menu')) {
        header = target.closest('.has-sub-menu').textContent.trim();
        console.log(header, 'header');
        document.querySelector(`.${ID}__header-wrapper .${ID}__title`).innerHTML = Update_Header(ID, header, 'second-level');
        document.querySelector('.content-asset.active') &&
          document.querySelector('.content-asset.active').classList.remove('active');
        target.closest('.top-level').querySelector('.content-asset').classList.add('active');
      } else if (
        target.closest('has-sub-menu-level-2') ||
        target.classList.contains('has-sub-menu-level-2') ||
        target.closest(`.${ID}__arrow-right`)
      ) {
        console.log('target');

        sub_header = header;
        header = target.textContent.trim() || target.closest('.has-sub-menu-level-2').textContent.trim();
        document.querySelector(`.${ID}__header-wrapper .${ID}__title`).innerHTML = Update_Header(
          ID,
          header,
          'second-level',
          'third-level'
        );
        target.closest('.top-level').querySelector('.content-asset').classList.add('active');
      } else if (target.closest(`.${ID}__title`)?.querySelector(`.${ID}__arrow_svg.${ID}__second-level.${ID}__third-level`)) {
        document.querySelector('.sub-level-item.hover') &&
          document.querySelector('.sub-level-item.hover').classList.remove('hover');
        document.querySelector('.has-sub-menu-level-2.hover') &&
          document.querySelector('.has-sub-menu-level-2.hover').classList.remove('hover');
        document.querySelector('.sub-level-content.hover') &&
          document.querySelector('.sub-level-content.hover').classList.remove('hover');
        document.querySelector(`.${ID}__header-wrapper .${ID}__title`).innerHTML = Update_Header(
          ID,
          sub_header,
          'second-level',
          ''
        );
      } else if (target.closest(`.${ID}__title`)?.querySelector(`.${ID}__arrow_svg.${ID}__second-level`)) {
        document.querySelector(`.${ID}__header-wrapper .${ID}__title`).innerHTML = 'menu';
        document.querySelector('.content-asset.active') &&
          document.querySelector('.content-asset.active').classList.remove('active');
        document.querySelector('.top-level.hover') && document.querySelector('.top-level.hover').classList.remove('hover');
        document.querySelector('.sub-level.hover') && document.querySelector('.sub-level.hover').classList.remove('hover');
      } else if (target.closest('.menu-close-icon')) {
        document.body?.classList.remove('menu-open');
        document.querySelector(`.${ID}-overlay`)?.classList.remove('active');
        target.closest('.menu-wrapper').classList.remove(`${ID}__menu-wrapper`);
        document.querySelector(`.${ID}__header-wrapper .${ID}__title`).innerHTML = 'menu';
        document.querySelector('.top-level.hover') && document.querySelector('.top-level.hover').classList.remove('hover');
        document.querySelector('.sub-level.hover') && document.querySelector('.sub-level.hover').classList.remove('hover');
        document.querySelector('.sub-level-item.hover') &&
          document.querySelector('.sub-level-item.hover').classList.remove('hover');
        document.querySelector('.has-sub-menu-level-2.hover') &&
          document.querySelector('.has-sub-menu-level-2.hover').classList.remove('hover');
        document.querySelector('.sub-level-content.hover') &&
          document.querySelector('.sub-level-content.hover').classList.remove('hover');
        document.querySelector('.content-asset.active') &&
          document.querySelector('.content-asset.active').classList.remove('active');
        sub_header = '';
        header = '';
      }
    });
  }
};
