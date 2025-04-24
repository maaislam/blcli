/**
 * AV019 - Minibag
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import Minibag from './components/Minibag/Minibag';
import shared from './shared';
import { events, observer } from '../../../../../lib/utils';

export default () => {
  setup();
  // If true this experiment will also force hide the Increasingly Minicart
  const INCREASINGLY_SPLIT_TEST = true;

  const { ID, rootScope, VARIATION } = shared;

  if(VARIATION != 'control') {
    /**
     * Create the new minibag component
     */
    const createMinibag = (shouldShowExtraHtml = false, didAddToBag = false) => {
      const minibag = new Minibag(shouldShowExtraHtml, didAddToBag);
    };

    // Init
    createMinibag();

    // Rebuild minibag when a new product is added
    rootScope.$on('CartService_AddSuccess', () => {
      // Log breadcrumbs for items added from PDP.
      const isPagePDP = window.location.href.indexOf('tovar') !== -1;
      if (isPagePDP) {
        const { Breadcrumbs } = rootScope.ShopContext;
        let categories = [];
        const salePage = {
          Url: 'https://my.avon.ru/1152/rasprodazha',
          Text: 'Распродажа',
        };

        // First item is the homepage, we need 2 categories.
        if (Breadcrumbs.length > 2) {
          categories = Breadcrumbs.slice((Breadcrumbs.length - 2));
          localStorage.setItem('minibag-categories', JSON.stringify(categories));
        } else if (Breadcrumbs.length === 2) {
          categories = [Breadcrumbs[1], salePage];
          localStorage.setItem('minibag-categories', JSON.stringify(categories));
        }
      }

      createMinibag(isPagePDP ? true : false, true);
    });

    rootScope.$on('CartService.RemoveProductSuccess', () => {
      setTimeout(createMinibag, 700);
    });

    // Rebuild minibag on layout change
    rootScope.$on('App_LayoutChanged', () => {
      // Delay to wait for standard rendering to complete
      setTimeout(createMinibag, 700);
    });
  }

  /*
    Send event when minibag is opened
    Ignore the first time this broadcast occurs as that is sent
    during page load, not necessarily when the minibag is opened
  */
  let firstEventSent = false;
  rootScope.$on('CartService_GetCartSuccess', () => {
    if (firstEventSent) {
      events.send(`${ID}-${VARIATION}`, 'Opened', 'Minibag');
    } else {
      firstEventSent = true;
    }
  });

  if (INCREASINGLY_SPLIT_TEST && VARIATION != 'control') {
    const $body = $('body');
    $body.addClass(`${ID}_ForceHideIncreasingly`);

    /*
      Watch body for attribute changes on add to cart
      A class will be added to the body to prevent scrolling so
      we need to remove that
    */
    rootScope.$on('CartService_GetCartSuccess', () => {
      observer.connect($body[0], () => {
        if ($body.hasClass('active_popup')) {
          $body.removeClass('active_popup');
          $body.removeClass('active_loader');
          observer.disconnect($body[0]);
        }
      }, {
        config: {
          attributes: true,
          childList: false,
          subtree: false,
        },
      });
    });
  }
};
