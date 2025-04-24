/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { h, render, Component } from 'preact';
import shared from "./shared";
import { pollerLite } from "../../../../../lib/uc-lib";
import { events, setCookie, getCookie } from "../../../../../lib/utils";
import { observePageChange } from '../../../../../lib/utils';
import CategoryComponent from './components/CategoryComponent';
import MobileComponent from './components/MobileComponent';

const runMobileChanges = () => {
  pollerLite([
    '[class^=TopCategory__Wrapper]'
  ], () => {
    const categoryWrapper = document.querySelector('[class^=TopCategory__Wrapper]');
    if (categoryWrapper) {
      render(<MobileComponent />, categoryWrapper);
    }
  })
}

const runDesktopChanges = () => {
  console.log('testing');
  pollerLite([
    '[class^=TopCategory__Wrapper]',
  ], () => {
    const categoryWrapper = document.querySelector('[class^=TopCategory__Wrapper]');
    if (categoryWrapper) {
      render(<CategoryComponent />, categoryWrapper);
    }
  })
}

const init = () => {
  let componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();
  // runDesktopChanges();

  pollerLite([
    '[class^=MobileLayout]'
  ], () => {
    runMobileChanges();
    componentAlreadyExists = true;
  });

  pollerLite([
    '[class^=PageHeaderDesktop]'
  ], () => {
    runDesktopChanges();
    componentAlreadyExists = true;
  });
  // ....
}

export default () => {
  init();

  observePageChange(document.body, (p) => {
    init();
  });

  // Poll and re-run init
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
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
        subtree: true
    };

    observer.observe(appContainer, config);
  });
};
