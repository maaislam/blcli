/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
//import { setup } from './services';
import shared from './shared';
import LoggedInComponent from './components/LoggedInComponent';
import { pollerLite } from '../../../../../lib/utils';
import { h, render, Component } from 'preact';
import { observePageChange } from '../../../../../lib/utils';
import { events } from '../../../../../lib/utils';
import { setup, fireEvent } from '../../../../../core-files/services';

const runChanges = () => {
  pollerLite([`[class^="NavMenuDesktop__HeaderNavMenuDesktop-sc"]`], () => {
    const DesktopInner = document.querySelector('[class^="NavMenuDesktop__HeaderNavMenuDesktop-sc"]');

    const markup = `
      <div class="${shared.ID}__wrapper">
        
      </div>
    `;

    DesktopInner.insertAdjacentHTML('afterend', markup);
    const experimentWrap = document.querySelector(`.${shared.ID}__wrapper`);
    console.log(experimentWrap);
    if (experimentWrap) {
      render(<LoggedInComponent />, experimentWrap);
      if (document.querySelector(`.${shared.ID}__loggedIn`)) {
        fireEvent('Conditions Met');
      }
    }
  });
};

const init = () => {
  const componentAlreadyExists = document.querySelector(`.${shared.ID}__wrapper`);
  if (componentAlreadyExists) {
    return;
  }

  const accType = sessionStorage.getItem('loggedInType');
  if (accType === 'ACC') {
    // Experiment Code...
    setup();

    runChanges();
    setTimeout(() => {
      const checkLoggedOut = sessionStorage.getItem('loggedInType');
      if (checkLoggedOut !== 'ACC') {
        const dashboard = document.querySelector(`.${shared.ID}__wrapper`);
        if (dashboard) {
          dashboard.style.display = 'none';
        }
      }
    }, 5000);
  } else {
    // Delay to check for newly logged in time-lapse
    setTimeout(() => {
      const delayedAcc = sessionStorage.getItem('loggedInType');
      if (delayedAcc === 'ACC') {
        setup();
        runChanges();
      } else {
        setTimeout(() => {
          const delayedAcc2 = sessionStorage.getItem('loggedInType');
          if (delayedAcc2 === 'ACC') {
            setup();
            runChanges();
          }
        }, 3000);
      }
    }, 5000);
  }

  // pollerLite([
  //   sessionStorage.loggedInType === 'ACC'
  // ], () => {
  //   setup();
  //   runChanges();
  // }, {
  //   timeout: 20000,
  //   multiplier: 1
  // })
};

export default () => {
  setup();
  init();

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
