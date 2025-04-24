/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import banner from './components/banner';
import { fireEvent, newEvents } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  if (!document.querySelector(`.${ID}__bannerWrapper`)) {
    document.querySelector('#header-block').insertAdjacentHTML('beforebegin', banner(ID));
  }

  if (!document.body.classList.contains(`${ID}__seenBanner`)) {
    fireEvent('Users sees banner');
    document.body.classList.add(`${ID}__seenBanner`);
  }
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__text a`)) {
      fireEvent('User interacts with banner cta');
    } else if (target.closest(`.${ID}__closeWrapper`)) {
      const clickedItem = target.closest(`.${ID}__closeWrapper`);
      const wrapper = clickedItem.closest(`.${ID}__bannerWrapper`);
      fireEvent('User closes banner');
      if (wrapper) wrapper.remove();
    } else if (
      target.closest(`.${ID}__bannerWrapper`) &&
      (!target.closest(`.${ID}__text a`) || !target.closest(`.${ID}__closeWrapper`))
    ) {
      fireEvent('User clicks on dead space outside of the cta and close cta');
    }
  });
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();
};
