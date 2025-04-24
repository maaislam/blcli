/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observeDOM } from './helper/utils';
import mainModal from './helper/mainModal';
import modalContent from './helper/modalContent';

const { ID, VARIATION } = shared;

const init = (pageData) => {

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }


  if (window.location.pathname !== '/guides/posts/payment-certainty-in-uncertain-times/') {

    //add first pop up
    if (document.querySelector(`.${ID}__overlay`)) return;
    const overlay = document.createElement('div');

    overlay.classList.add(`${ID}__overlay`, `${ID}__hide`);

    document.body.classList.add(`${ID}__body`);
    document.body.insertAdjacentElement('afterbegin', overlay);
    overlay.insertAdjacentHTML('afterbegin', mainModal(ID, pageData));

  }

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

    if (target.closest('.watch-demo')) {
      // add form modal
      e.preventDefault();
      overlay.innerHTML = '';
      overlay.classList.remove(`${ID}__hide`);
      overlay.insertAdjacentHTML('afterbegin', modalContent(ID, pageData));
      fireEvent('User interacts with “watch demo’ CTA in pop up');
    }

    if (target.closest('.webiner-discover')) {
      fireEvent('User interacts with ‘Discover more’ CTA in banner');
    }

    if (target.closest('.css-19nbx3n')) {
      fireEvent('User interacts with ‘sign up’ in header');
    }

    if (target.closest('.css-mo3vs8:not(.webiner-register)')) {
      fireEvent('User interacts with ‘login’  in header');
    }

    if (target.closest('.css-1abozqc')) {
      fireEvent('User interacts with navigation');
    }

    if (target.closest('.css-azp2z')) {
      fireEvent('User interacts with the watch now cta on the webinar page');
    }

    if (
      target.closest(`.${ID}__mainModal--close`) ||
      (
        target.closest(`.${ID}__overlay`) &&
        document.querySelector(`.${ID}__mainModal`)
      )) {
      fireEvent('User closes the pop up');
    }

    if (
      target.closest(`.${ID}__modalcontainer--close`) ||
      (
        target.closest(`.${ID}__overlay`) &&
        document.querySelector(`.${ID}__modalcontainer`)
      )) {
      fireEvent('User closes the watch demo form');
    }

    if (target.closest(`.${ID}__modalcontainer--close`) ||
      target.closest(`.${ID}__mainModal--close`) ||
      (target.closest(`.${ID}__overlay`) &&
        !target.closest(`.${ID}__modalcontainer`) &&
        !target.closest(`.${ID}__mainModal`)
      )) {
      overlay.classList.add(`${ID}__hide`);
      overlay.innerHTML = '';
    }

  });

  //scroll
  const target = document.body;
  const totalHeight = target.scrollHeight - window.innerHeight;

  window.addEventListener('scroll', () => {
    const currentScroll = document.documentElement.scrollTop;
    const scrollPercentage = ((currentScroll / totalHeight) * 100).toFixed(2);
    const mainModal = document.querySelector(`.${ID}__mainModal`);
    const overlay = document.querySelector(`.${ID}__overlay`);

    if (!mainModal) return;
    if (scrollPercentage > 33 && mainModal) {
      overlay.classList.remove(`${ID}__hide`);
      if (!overlay.classList.contains(`popup-triggered`)) {
        fireEvent('User sees the pop up (user reaches 33%)');
        overlay.classList.add(`popup-triggered`);
      }
    }

  });

};
