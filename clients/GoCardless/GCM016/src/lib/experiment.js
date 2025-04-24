/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import banner from './components/banner';
import modalContent from './components/modalContent';
import observeDOM from './helpers/utils';

const { ID, VARIATION } = shared;

const init = (pageData) => {
  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }
  const { attachTo } = pageData;

  const attachPoint = document.querySelector(attachTo);

  const placement = attachPoint !== 'body' ? 'afterbegin' : 'beforeend';

  attachPoint.insertAdjacentHTML(placement, banner(ID, pageData));

  //console.log('banner added', document.querySelector(`.${ID}__webinerbanner`));

  //add modal container
  if (document.querySelector(`.${ID}__overlay`)) return;
  const overlay = document.createElement('div');

  overlay.classList.add(`${ID}__overlay`, `${ID}__hide`);

  document.body.classList.add(`${ID}__body`);
  document.body.insertAdjacentElement('afterbegin', overlay);
};

export default (pageData) => {
  setup();
  init(pageData);
  const callback = (mutation) => {
    if (mutation.target.matches('#qa-website-app') && mutation.removedNodes.length > 0) {
      init(pageData);
    }
  };
  observeDOM('body', callback);

  //click
  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const overlay = document.querySelector(`.${ID}__overlay`);
    if (target.closest(`.${ID}__webinerbanner--btncontainer`)) {
      e.preventDefault();
      overlay.innerHTML = '';
      overlay.classList.remove(`${ID}__hide`);
      const formType = target.closest('.webiner-register') ? 'register' : 'contact';
      overlay.insertAdjacentHTML('afterbegin', modalContent(ID, pageData, formType));
      fireEvent(`user interacts with ${formType === 'register' ? 'watch demo' : 'contact sales'} CTA in banner`);
    } else if (
      target.closest(`.${ID}__modalcontainer--close`) ||
      (target.closest(`.${ID}__overlay`) && !target.closest(`.${ID}__modalcontainer`))
    ) {
      const closedUsingOverlay = !target.closest(`.${ID}__modalcontainer--close`);
      overlay.classList.add(`${ID}__hide`);
      const formType = target.closest(`${ID}__register`) ? 'watch demo' : 'contact sales';
      fireEvent(
        `${closedUsingOverlay
          ? `User closes the ${formType} modal using the overlay background`
          : `User interacts with x button in ${formType}`
        }`
      );
    }
  });

  //scroll
  const target = document.body;
  const totalHeight = target.scrollHeight - window.innerHeight;

  window.addEventListener('scroll', () => {
    const currentScroll = document.documentElement.scrollTop;
    const scrollPercentage = ((currentScroll / totalHeight) * 100).toFixed(2);
    const webinerContainer = document.querySelector(`.${ID}__webinerbanner`);

    if (!webinerContainer) return;
    if (scrollPercentage > 10 && scrollPercentage < 85) {
      //console.log(`BL visible`);
      webinerContainer.classList.remove('inactive');
      webinerContainer.classList.add('active');
      document.getElementById('drift-frame-controller')?.classList.add(`${ID}__hide`);

      if (!document.body.classList.contains('seen-stickybanner')) {
        fireEvent('User sees sticky banner');
        document.body.classList.add('seen-stickybanner');
      }
    } else if ((scrollPercentage <= 10 || scrollPercentage >= 85) && webinerContainer.classList.contains('active')) {
      //console.log(`BL not visible`);
      webinerContainer.classList.remove('active');
      webinerContainer.classList.add('inactive');
      document.getElementById('drift-frame-controller').classList.remove(`${ID}__hide`);

    } else if (target.closest('.webiner-register')) {
      fireEvent('Clicks to ‘Register now’ CTA ');
    } else if (target.closest('.contact-sales')) {
      fireEvent('Clicks to ‘Contact sales’ CTA ');
    }

    //console.log(`BL ${scrollPercentage}% of the page has been scrolled`);
  });
};
