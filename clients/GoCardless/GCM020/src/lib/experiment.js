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

const { ID, VARIATION } = shared;

const init = () => {

  fireEvent('Conditions Met');

  if (VARIATION === 'control') {
    return;
  }

  document.body.insertAdjacentHTML('beforeend', banner(ID));
  const target = document.body;
  const totalHeight = target.scrollHeight - window.innerHeight;

  window.addEventListener('scroll', function () {
    const currentScroll = document.documentElement.scrollTop;
    const scrollPercentage = ((currentScroll / totalHeight) * 100).toFixed(2);
    const webinerContainer = document.querySelector(`.${ID}__webinerbanner`);


    if (scrollPercentage > 15) {
      webinerContainer.classList.remove('inactive');
      webinerContainer.classList.add('active');
      document.getElementById('drift-frame-controller')?.classList.add(`${ID}__hide`);
      if (!document.body.classList.contains('seen-stickybanner')) {
        fireEvent('User sees sticky banner');
        document.body.classList.add('seen-stickybanner');
      }
    } else if (scrollPercentage <= 15 && webinerContainer.classList.contains('active')) {
      webinerContainer.classList.remove('active');
      webinerContainer.classList.add('inactive');
      document.getElementById('drift-frame-controller')?.classList.remove(`${ID}__hide`);
    }

    if (scrollPercentage > 25 && !webinerContainer.classList.contains('scroll-25')) {
      fireEvent('User Scrolls to 25%');
      webinerContainer.classList.add('scroll-25');
    }

    if (scrollPercentage > 50 && !webinerContainer.classList.contains('scroll-50')) {
      fireEvent('User Scrolls to 50%');
      webinerContainer.classList.add('scroll-50');
    }

  });
};

export default () => {
  setup();
  if (
    window.location.pathname.includes('/pricing/') ||
    window.location.pathname.includes('/solutions/reduce-churn/') ||
    window.location.pathname.includes('/solutions/reduce-international-barriers/') ||
    window.location.pathname.includes('/solutions/reduce-operational-costs/') ||
    window.location.pathname.includes('/solutions/reduce-time-to-get-paid/') ||
    window.location.pathname.includes('/solutions/reduce-conversion-risk/')
  ) {

    init();

  } else if (window.location.pathname === '/guides/posts/uncovering-payment-costs-webinar/') {
    fireEvent('User lands on webiner landing page');
  } else if (window.location.pathname === '/g/uncover-costs-payments-sales/') {
    fireEvent('User lands on sales landing page');
  }

  document.body.addEventListener('click', ({ target }) => {

    if (target.closest('.css-azp2z')) {
      fireEvent('User clicks hero ‘register now’');
      let waitDomInterval;
      waitDomInterval = setInterval(() => {
        if (document.querySelector('.css-1tj3yc')) {
          clearInterval(waitDomInterval);
          fireEvent('Opens of form');
        }
      }, 50);

    } else if (target.closest('.css-1xg51cq')) {
      fireEvent('User clicks footer ‘contact sales’');
    } else if (target.closest('.css-19r582e')) {
      fireEvent('Form exits');
    } else if (target.closest('.webiner-register')) {
      fireEvent('Clicks to ‘Register now’ CTA');
    } else if (target.closest('.contact-sales')) {
      fireEvent('Clicks to ‘Contact sales’ CTA');
    } else if (target.closest('.css-19nbx3n') || target.closest('.css-1rhoc2k')) {
      fireEvent('Clicks to ‘sign up’');
    } else if (target.closest('.css-mo3vs8') || target.closest('.css-1cr3yw6')) {
      fireEvent('Clicks to ‘login’');
    } else if (target.closest('.css-q5bwx4') || target.closest('.css-1lnsvng')) {
      fireEvent('Engagement with navigation');
    }

  });

};
