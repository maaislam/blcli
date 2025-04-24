/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import clickHandler from './files/clickHandler';

const { ID, VARIATION } = shared;

const init = () => {

  //console.log(`BL ${ID} test working`);

  if (VARIATION == 'control') {
    return;
  }

  setTimeout(() => {

    document.querySelector('.css-19nbx3n').setAttribute('href', 'https://gocardless.com/contact-sales-page/')
    document.querySelector('.css-19nbx3n span').textContent = "Contact sales";

    document.querySelectorAll('a[href*="https://manage.gocardless.com/signup"] , a[href="https://gocardless.com/solutions/learn-more/"]').forEach((link) => {

      if (
        link.querySelector('span').textContent === 'Sign up' ||
        link.querySelector('span').textContent === 'Get Started'
      ) {

        link.querySelector('span').textContent = "Contact sales";
        link.setAttribute('href', 'https://gocardless.com/contact-sales-page/');

        if (link.classList.contains('css-1rhoc2k')) {
          link.style.padding = "12px 5px";
        }

      } else {
        link.querySelector('span').textContent = "Watch demo";
        link.setAttribute('href', 'https://gocardless.com/guides/posts/payment-certainty-in-uncertain-times/')
      }

    });

    document.querySelectorAll('[data-testid="stickyBanner"] .css-bczvj3').forEach((copy, index) => {
      copy.classList.add(`new-copy-${index}`)
      copy.textContent = "Discover a better way to get paid with direct bank payments from GoCardless.";
    })

    if (document.querySelector('p.css-bczvj3.new-copy-1')) {
      document.querySelector('p.css-bczvj3.new-copy-1').style.textAlign = 'center';
    }

  }, 1500)

}

export default () => {

  setup();
  fireEvent('Conditions Met');

  init();

  document.body.addEventListener('click', clickHandler);

};
