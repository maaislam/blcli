/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import badgeWrapper from './components/badgeContainer';

const { ID, VARIATION } = shared;

const init = () => {
  const targetPoint = document.querySelector('.hero-banner__content');
  if (!document.querySelector(`.${ID}__badgeWrapper`)) {
    targetPoint.insertAdjacentHTML('afterend', badgeWrapper(ID));
  }
};
export default () => {
  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();
};
