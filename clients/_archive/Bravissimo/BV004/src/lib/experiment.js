/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, addIcon, backToProduct, clickTracking } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
// import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { addPoller, addEventListener, addObserver } from './winstack';

const activate = () => {
  setup();
  
  // Desktop
  addPoller(['.c-product-details__size-grid h2.c-product-details__size-grid__title',
    '.c-product-details__brand, .c-product-details__name',
    '.c-product-gallery__base-image .c-picture', () => {
      let run = false;
      if (window.innerWidth > 559) {
        run = true;
      }
      return run;
    }], () => {
    // Cached Els
    const desktopRef = cacheDom.get('.c-product-details__size-grid h2.c-product-details__size-grid__title');
    addIcon(desktopRef);
    const addedLink = document.querySelector('.BV004-sizes');
    clickTracking(addedLink, 'User clicked size link');
  });

  // Mobile
  addPoller(['.c-product-details__style-colours', () => {
    let run = false;
    if (window.innerWidth <= 559) {
      run = true;
    }
    return run;
  }], () => {
    const mobileRef = cacheDom.get('.c-product-details__style-colours');
    addIcon(mobileRef);
    const addedLink = document.querySelector('.BV004-sizes');
    clickTracking(addedLink, 'User clicked size link');
  });

  // Bra fitting page
  if (window.location.href.match('/bra-fitting-guide/')) {
    addPoller(['section.c-container'], () => {
      if (document.referrer.match(/((\/)|(\/)(us)(\/))(products).*(bra).*/g)) {
        const ref = cacheDom.get('section.c-container .l-grid__unit.l-grid__unit--editorial-main');
        backToProduct(ref);
        const sectionToWatch = document.querySelector('section.c-container');
        addObserver(sectionToWatch, () => {
          backToProduct(ref);
        });
      }
    });
  }

  // Due to React, we need to add an observer to the doc body.
  addObserver(document.body, () => {
    if (!document.body.classList.contains(settings.ID)) {
      document.body.classList.add(settings.ID);
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
