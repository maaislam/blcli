/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import bannerWrapper from './components/bannerWrapper';
import { fireEvent, newEvents, obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const handleControlIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__conditionMet`)) {
      fireEvent('Conditions Met');
      document.body.classList.add(`${ID}__conditionMet`);
    }
  }
};

const handleVariationIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__conditionMet`)) {
      fireEvent('Conditions Met');
      document.body.classList.add(`${ID}__conditionMet`);
    }
  }
};

const handleObserver = (selector, text) => {
  const intersectionAnchor = document.querySelector(selector);
  const selectedHandleIntersection =
    text === 'control' ? handleControlIntersection : text === 'variation' ? handleVariationIntersection : null;
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, selectedHandleIntersection);
  }
};

const init = () => {
  const targetPoint = document.querySelector('#insurance-details');
  if (!targetPoint.querySelector(`.${ID}__bannerWrapper > .container`)) {
    targetPoint.insertAdjacentHTML('beforeend', bannerWrapper(ID));
  }
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  document.body.addEventListener('click', (event) => {
    const { target } = event;
    if (target.closest(`.${ID}__repair-button`)) {
      fireEvent('User clicks the find out more CTA in the ding banner');
    } else if (
      target.closest('.HS-045__stickyWrapper a.btn') ||
      target.closest('.HS-034__btnWrapper a.btn') ||
      target.closest('#get-started a.btn')
    ) {
      fireEvent('User clicks Apply now CTA');
    } else if (
      target.closest('#insurance-details') &&
      target.closest('.measure-me-parent') &&
      target.closest('.col-md-6 + .col-md-6')
    ) {
      fireEvent('User clicks the upsell in the What isn’t covered section');
    }
  });

  if (VARIATION == 'control') {
    pollerLite(['#insurance-details > .container > .inner-container-wrapper'], () => {
      handleObserver('#insurance-details > .container > .inner-container-wrapper', 'control');
    });
    return;
  }

  init();

  pollerLite([`.${ID}__bannerWrapper`], () => {
    handleObserver(`.${ID}__bannerWrapper`, 'variation');
  });
};
