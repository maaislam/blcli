/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import mainModal from './helper/mainModal';
import modalContent from './helper/modalContent';

const { ID, VARIATION } = shared;

const init = () => {

  //console.log(`${ID} is running`);

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  setTimeout(() => {

    const elements = document.querySelectorAll('.css-1rhoc2k , .css-v6yn4w');
    elements.forEach((element) => {
      element.removeAttribute("href");
      element.classList.add(`${ID}__copy-changed`);
      element.querySelector('span').textContent = "Get in touch";

    });

    if (document.querySelector(`.${ID}__overlay`)) return;

    const overlay = document.createElement('div');
    overlay.classList.add(`${ID}__overlay`, `${ID}__hide`);
    document.body.classList.add(`${ID}__body`);
    // insert popup overlay
    document.body.insertAdjacentElement('afterbegin', overlay);
    // insert sticky banner
    document.body.insertAdjacentHTML('afterbegin', mainModal(ID));

    if (document.querySelector(`.${ID}__top-sticky-banner`)) {
      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.bottom > 0
        );
      }

      function checkElementVisibility() {
        const myElement = document.querySelector('[data-module-name="heroSlice"]');
        let isInViewport = isElementInViewport(myElement);

        if (isInViewport) {
          document.querySelector(`.${ID}__top-sticky-banner`)?.classList.add(`${ID}__slide-out`);
        } else {
          if (!document.querySelector('.css-9fhpsa.slide-enter-done')) {
            document.querySelector(`.${ID}__top-sticky-banner`)?.classList.remove(`${ID}__slide-out`);
          }
        }
      }

      checkElementVisibility();

      window.addEventListener('scroll', function () {
        checkElementVisibility();
      });
    }

  }, 1500);

};

export default () => {

  setup();

  init();

  //click
  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const overlay = document.querySelector(`.${ID}__overlay`);

    if (target.closest('.banner-button') || target.closest(`.${ID}__copy-changed`)) {
      e.preventDefault();
      overlay.classList.remove(`${ID}__hide`);
      overlay.insertAdjacentHTML('afterbegin', modalContent(ID));
    }

    if (target.closest('.css-3jiiz6')) {
      fireEvent('User interacts with “Login” CTA in banner');
    }

    if (target.closest('.css-1cr3yw6')) {
      fireEvent('User select log in in burger menu (mobile only)');
    }

    if (target.closest(`.${ID}__copy-changed`)) {
      fireEvent('User interacts with contact sales CTA in banner');
    }

    if (
      target.closest('.css-v6yn4w') &&
      !target.closest(`.${ID}__copy-changed`)
    ) {
      fireEvent('User interacts with "Sign up" CTA in banner');
    }

    if (
      target.closest('.css-1rhoc2k') &&
      !target.closest(`.${ID}__copy-changed`)
    ) {
      fireEvent('User select sign up in burger menu (mobile only)');
    }

    if (target.closest('.css-1gxess1') && !target.closest('.banner-button')) {
      fireEvent('User interacts with “Contact sales” CTA in hero slot');
    }

    if (target.closest('.css-140tqjo')) {

      if (
        target.getAttribute('href').includes('https://content.gocardless.com/a-new-era-of-payments') &&
        !target.getAttribute('href').includes('/ach-pull-use-cases')
      ) {
        fireEvent('User interacts with the “Find out more” CTA on the first customer story');
      }

      if (target.getAttribute('href').includes('https://content.gocardless.com/a-new-era-of-payments/ach-pull-use-cases')) {
        fireEvent('User interacts with the “Take a look” CTA');
      }

      if (target.getAttribute('href').includes('https://content.gocardless.com/faster-safer-cheaper')) {
        fireEvent('User interacts with the “Find out more” CTA on the third customer story');
      }
    }

    if (target.closest('.css-1lma31c')) {

      if (target.closest('.css-1lma31c').querySelector('a').getAttribute('href').includes('https://content.gocardless.com/faster-safer-cheaper/how-deel-reduced-payment-friction')) {
        fireEvent('User interacts with case studies (deel-case-study)');
      }

      if (target.closest('.css-1lma31c').querySelector('a').getAttribute('href').includes('https://content.gocardless.com/faster-safer-cheaper/capital-on-tap-ach')) {
        fireEvent('User interacts with case studies (capital-on-tap-case-study)');
      }

      if (target.closest('.css-1lma31c').querySelector('a').getAttribute('href').includes('https://content.gocardless.com/faster-safer-cheaper/uk-deputy')) {
        fireEvent('User interacts with case studies (deputy-case-study)');
      }

      if (target.closest('.css-1lma31c').querySelector('a').getAttribute('href').includes('https://content.gocardless.com/faster-safer-cheaper/premierepc')) {
        fireEvent('User interacts with case studies (premiere-pc-case-study)');
      }

    }

    if (target.closest('.css-10ssot6')) {
      fireEvent('User interacts with “Watch now” CTA');
    }

    if (target.closest('.css-1xg51cq')) {
      fireEvent('User interacts with  “Contact Sales” CTA at the bottom of the page');
    }

    if (
      target.closest('.css-eh9p4w') &&
      target.getAttribute('href').includes('https://gocardless.com/en-us/contact-sales/')
    ) {
      fireEvent('User interacts with  “Contact Sales” CTA in the footer');
    }

    if (
      target.closest(`.${ID}__modalcontainer--close`) ||
      (
        target.closest(`.${ID}__overlay`) &&
        document.querySelector(`.${ID}__modalcontainer`)
      )) {
      fireEvent('User closes form pop up.');
    }

    if (target.closest(`.css-6m389k`)) {
      fireEvent('User opens burger menu (mobile only)');
    }

    if (target.closest(`.${ID}__modalcontainer--close`) ||
      (target.closest(`.${ID}__overlay`) &&
        !target.closest(`.${ID}__modalcontainer`)
      )) {
      overlay.classList.add(`${ID}__hide`);
      overlay.innerHTML = '';
    }

  });

};
