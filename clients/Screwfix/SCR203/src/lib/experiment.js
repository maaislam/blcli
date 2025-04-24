/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import plpPromo from './components/plpPromo';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const intersectionCallback = (entry) => {
  if (entry.isIntersecting && !document.body.classList.contains('user-seen')) {
    fireEvent('User sees the the 6th slot promo');
    document.body.classList.add('user-seen');
  }
};

const intersectionCallbackControl = (entry) => {
  if (entry.isIntersecting && !document.body.classList.contains('user-seen')) {
    fireEvent('User sees the the 6th slot');
    document.body.classList.add('user-seen');
  }
};

const resetDom = () => {
  const plpPromos = document.querySelectorAll(`.${ID}__plpPromoWrapper`);
  if (plpPromos.length > 0) {
    plpPromos.forEach((item) => item.remove());
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'lister Page';

  if (!pageCondition) {
    resetDom();
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    document.body.classList.remove('user-seen');
    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';

  //plp page
  if (window.utag.data.basicPageId === 'lister Page') {
    const productCards = document.querySelectorAll('[data-qaid="product-card"]');

    const validPlps = [
      {
        link: '/c/heating-plumbing/central-heating-controls/cat831042',
        promoTag: 'save energy',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat831042',
      },
      {
        link: '/c/bathrooms-kitchens/bathroom-taps/cat7310006',
        promoTag: 'save water',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat7310006',
      },
      {
        link: '/c/safety-workwear/work-trousers/cat850376',
        promoTag: 'save materials',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat850322',
      },
      {
        link: '/c/safety-workwear/womens-work-trousers/cat15830003',
        promoTag: 'save materials',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat850322',
      },
      {
        link: '/c/safety-workwear/work-shorts/cat6920001',
        promoTag: 'save materials',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat850322',
      },
      {
        link: '/c/safety-workwear/womens-work-shorts/cat16400003',
        promoTag: 'save materials',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat850322',
      },
      {
        link: '/c/heating-plumbing/pipe/cat831500',
        promoTag: 'save materials',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat831552',
      },
      {
        link: '/c/heating-plumbing/copper-pipe/cat831552',
        promoTag: 'save materials',
        promoText: 'save 10% on Selected Greenstar use code:',
        discountCode: 'EARTH10',
        promoLink: '/search?search=earthdaypromo&category=cat831552',
      },
    ];

    const isValidPlp = validPlps.find((plp) => plp.link === window.location.pathname);

    if (isValidPlp) {
      setup();
      fireEvent('Conditions Met');
      productCards.forEach((card, i) => {
        const targetPoint = card.parentElement;
        const positionIndex = 4;

        if (!document.querySelector(`.${ID}__plpPromoWrapper`) && i === positionIndex) {
          if (VARIATION !== 'control') {
            targetPoint.insertAdjacentHTML('afterend', plpPromo(ID, isValidPlp));
            obsIntersection(document.querySelector(`.${ID}__plpPromoWrapper`), 1, intersectionCallback);
          }
        }

        if (i === 5) {
          if (VARIATION === 'control') {
            obsIntersection(targetPoint, 1, intersectionCallbackControl);
          }
        }
      });
    }
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    const { target } = e;
    if (window.utag.data.basicPageId !== 'lister Page') return;

    if (target.closest(`.${ID}__plpPromoWrapper`)) {
      const clickedItem = target.closest(`.${ID}__plpPromoWrapper`);
      const promoTag = clickedItem.getAttribute('data-attr');
      fireEvent(`User interacts with ${promoTag} promo`);
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    resetDom();
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
