/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const handleIntersection = (entries) => {
  if (entries.isIntersecting && !document.body.classList.contains(`${ID}__conditionMet`)) {
    fireEvent('Conditions Met');
    document.body.classList.add(`${ID}__conditionMet`);
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0, handleIntersection);
  }
};

const init = () => {
  const bannerHeader = document.querySelector('.hero-banner__section--additional h2');
  const bannerSubtext = document.querySelector('.hero-banner__additional-subtext');
  bannerHeader.innerHTML = 'Find out how much tax-free cash you could release';

  bannerSubtext.childNodes[0].textContent = 'Use our calculator if you:';

  bannerSubtext.querySelector('li:nth-child(1)').textContent = 'Are a UK homeowner aged 55+';
  bannerSubtext.querySelector('li:nth-child(2)').textContent = 'Own a property worth £70,000+';
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('a.button') && target.closest('.hero-banner__button-container')) {
      fireEvent('User interects with calculate now button');
    }
  });

  handleObserver('.hero-banner .hero-banner__section--additional');

  if (VARIATION == 'control') {
    return;
  }

  init();
};
