/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import colorBlock from './files/colorBlock';
import { handleScrollnEvent } from './files/handleScrollnEvent';

const { ID, VARIATION } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');
  handleScrollnEvent(
    '#yotpo-main-widget',
    'Customer scrolls to see reviews'
  );

  if (VARIATION == 'control') {
    handleScrollnEvent(
      '.pdp-extra',
      'Customer scrolls to the Glimmerstick persuasion content'
    );
    return;
  }

  const targetElement = document.querySelector('async-block[url="/block/products%2cproduct-box-1/"]');

  if (!document.querySelector(`.${ID}__colour-block-container`)) {
    targetElement.parentElement.classList.add('pdp-extra--parent');
    document.querySelector('.pdp-extra--parent').insertAdjacentHTML('afterbegin', colorBlock(ID, `for-desktop`));
    targetElement.insertAdjacentHTML('afterend', colorBlock(ID, `for-mobile`));

    if (window.innerWidth <= 450) {
      handleScrollnEvent(
        '.AV137__colour-block-container.for-mobile',
        'Customer scrolls to see new content block'
      );
    } else {
      handleScrollnEvent(
        '.AV137__colour-block-container.for-desktop',
        'Customer scrolls to see new content block'
      );
    }
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.review-btn`)) {
      if (document.querySelector('#yotpo-main-widget')) {
        document.querySelector('#yotpo-main-widget').scrollIntoView();
        window.scrollBy(0, -100);
      }

    }
  });

};
