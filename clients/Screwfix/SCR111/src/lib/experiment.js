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
import brandWrapper from './components/brandWrapper';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 700;
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const brandLinks = [
  {
    name: 'Milwaukee',
    url: 'https://www.screwfix.com/brand/milwaukee?cm_sp=managedredirect--brand--milwaukee',
    imgLink: 'https://media.screwfix.com/is/image/ae235/vf_brand_milwaukee?wid=112&dpr=on',
  },
  {
    name: 'Dewalt',
    url: 'https://www.screwfix.com/brand/dewalt?cm_sp=managedredirect--brand--dewalt',
    imgLink: 'https://media.screwfix.com/is/image/ae235/vf_brand_dewalt?wid=112&hei=114&dpr=on',
  },
  // {
  //   name: 'Wago',
  //   url: 'https://www.screwfix.com/brand/wago?cm_sp=managedredirect--electrical--wago',
  // },
  {
    name: 'Makita',
    url: 'https://www.screwfix.com/brand/makita?cm_sp=managedredirect--brand--makita',
    imgLink: 'https://media.screwfix.com/is/image/ae235/VF_brand_makita?wid=112&dpr=on',
  },
  // {
  //   name: 'Hive',
  //   url: 'https://www.screwfix.com/brand/hive',
  // },
  {
    name: 'Bosch',
    url: 'https://www.screwfix.com/brand/bosch?cm_sp=managedredirect--brand--bosch',
    imgLink: 'https://media.screwfix.com/is/image/ae235/vf_brand_bosch?wid=112&dpr=on',
  },
  {
    name: 'Erbauer',
    url: 'https://www.screwfix.com/brand/erbauer?cm_sp=managedredirect--brand--erbauer',
    imgLink: 'https://media.screwfix.com/is/image/ae235/vf_brand_erbauer?wid=112&dpr=on',
  },
  {
    name: 'Stihl',
    url: 'https://www.screwfix.com/brand/stihl?cm_sp=managedredirect--brand--stihl',
    imgLink: 'https://media.screwfix.com/is/image/ae235/vf_brand_stihl?wid=112&dpr=on',
  },
  {
    name: 'Evolution',
    url: 'https://www.screwfix.com/brand/evolution?cm_sp=managedredirect--brand--evolution',
    imgLink: 'https://media.screwfix.com/is/image/ae235/vf_brand_evolution?wid=112&dpr=on',
  },
];

const handleIntersectionSeenCarousel = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenCarousel`)) {
      fireEvent('User scroll on carousel');
      document.body.classList.add(`${ID}__seenCarousel`);
    }
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, handleIntersectionSeenCarousel);
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'home'; //add page check conditions here based on experiment requirement

  const brandWrappers = document.querySelectorAll(`.${ID}__bandBar`);
  if (brandWrappers) {
    brandWrappers.forEach((brandWrapper) => brandWrapper.remove());
  }

  if (!pageCondition) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  const targetPoint = document.querySelector('#container-main');
  if (!document.querySelector(`.${ID}__bandBar`)) {
    targetPoint.insertAdjacentHTML('afterbegin', brandWrapper(ID, brandLinks));
  }

  if (isMobile()) {
    pollerLite([`.${ID}__bandBar`], () => {
      handleObserver(`.${ID}__bandBar`);
    });
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
    //check if page is correct
    if (window.utag.data.basicPageId !== 'home') return;

    const { target } = e;
    if (target.closest('.brand-bar__item')) {
      const clickedItem = target.closest('.brand-bar__item');
      const brandName = clickedItem.querySelector('img')?.alt;
      fireEvent(`User interacts with quicklinks - ${brandName} - ${clickedItem.href}`);
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
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
