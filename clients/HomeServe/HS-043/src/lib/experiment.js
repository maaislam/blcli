/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import uspsWrapper from './components/uspsWrapper';
import uspsData from './data/data';
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
  const targetElement = document.querySelector('#content-block #mainContainer #blockContainer');
  if (!document.querySelector(`.${ID}__uspsWrapper`)) {
    targetElement.insertAdjacentHTML('afterend', uspsWrapper(ID, uspsData));
  }
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__usp-card`)) {
      fireEvent('User tries to interacts with USPs');
    }
  });

  if (VARIATION === 'control') {
    handleObserver('#lowerContainer');
    return;
  }

  init();
  handleObserver(`.${ID}__uspsWrapper`);
};
