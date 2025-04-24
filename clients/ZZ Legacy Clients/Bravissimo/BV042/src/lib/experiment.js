import { setup } from './services';
import { pollerLite } from '../../../../../lib/utils';
import settings from './settings';
import { h, render } from 'preact';
import BraSizes from './components/BraSizes';
import { addEventListener } from './winstack';

const { ID, VARIATION } = settings;

/**
 * Create containers markup
 */
const createMarkup = (container, where = 'beforeend') => {
  if(container) {
    container.insertAdjacentHTML(where, `
      <div class="${ID}-sizes">
      </div>
    `);
  }
};
  
/**
 * Entry point post polling
 */
const activate = () => {
  /**
   * Called on initial page load and subsequent async page requests
   */
  const init = () => {
    setup();

    const containerExisting = document.querySelector(`.${ID}-sizes`);
    if(containerExisting) {
      containerExisting.parentNode.removeChild(container);
    }

    pollerLite([
      '.c-product-details .c-field-brasize'
    ], () => {
      const c = document.querySelector('.c-product-details .c-field-brasize');
      createMarkup(c);

      const container = document.querySelector(`.${ID}-sizes`);

      if(container) {
        render(<BraSizes />, container);
      }
    });

    pollerLite([
      '.c-product-details__size-grid'
    ], () => {
      const c = document.querySelector('.c-product-details__size-grid');
      c.classList.add(`${ID}-force-hide`);
      createMarkup(c, 'afterend');

      const container = document.querySelector(`.${ID}-sizes`);

      if(container) {
        render(<BraSizes />, container);
      }
    });
  };

  // ------------------------------------
  // Observe changes
  // + Poller checks for page changes and checks to see if the URL has changed
  // ------------------------------------
  pollerLite([
    '.c-product-page__content',
  ], () => {
    const appContainer = document.querySelector('.c-product-page__content');

    let oldHref = document.location.href;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(ID);
          document.body.classList.remove(`${ID}-${VARIATION}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 1000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(appContainer, config);
  });

  // -----------------------------------
  // Init on initial page load
  // -----------------------------------
  init();

  setTimeout(() => {
    if(document.body.classList.contains('BRA-8')) {
      document.documentElement.classList.add('BRA-8');
    }

    if(document.body.classList.contains('BRA-28')) {
      document.documentElement.classList.add('BRA-28');
    }
  }, 3000);
  
  // -----------------------------------
  // On orientation change, we flip to the desktop
  // mode grid, so reload 
  // -----------------------------------
  addEventListener(window, 'orientationchange', () => {
    location.reload();
  });
};

export default activate;
