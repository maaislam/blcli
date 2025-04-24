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
import { onUrlChange } from './helpers/utils';
import navData from './data/navData';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;
const mainData = navData[VARIATION];

const navElementsPlacement = () => {
  const navElementWrapper = document.querySelector('#site-navigation[data-qaid="qa-meganav-block"] ul');
  const allNavItems = navElementWrapper.querySelectorAll('li');

  allNavItems.forEach((element) => {
    const linkElement = element.querySelector('a');
    if (!linkElement) return;
    const link = linkElement.href;
    const isExistingLink = mainData.find((item) => {
      const key = Object.keys(item)[0];
      return link.includes(key);
    });

    if (isExistingLink) {
      const [value] = Object.values(isExistingLink); // Get the value
      element.classList.add(`${ID}__${value}`);
    }
  });
};

const init = () => {
  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  navElementsPlacement();
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

    if (target.closest(`#navigation-area`)) {
      pollerLite([() => document.querySelector('#site-navigation[data-qaid="qa-meganav-block"] ul')], () => {
        navElementsPlacement();
      });
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
