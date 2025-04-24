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

const pricingPageInit = () => {
  if (!window.location.pathname.includes('/pricing/')) return;

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
      document.getElementById('drift-frame-controller').classList.add(`${ID}__hide`);
      if (!document.body.classList.contains('seen-stickybanner')) {
        fireEvent('User sees sticky banner');
        document.body.classList.add('seen-stickybanner');
      }
    } else if (scrollPercentage <= 15 && webinerContainer.classList.contains('active')) {
      webinerContainer.classList.remove('active');
      webinerContainer.classList.add('inactive');
      document.getElementById('drift-frame-controller').classList.remove(`${ID}__hide`);
    } else if (target.closest('.webiner-register')) {
      fireEvent('Clicks to ‘Register now’ CTA ');
    } else if (target.closest('.contact-sales')) {
      fireEvent('Clicks to ‘Contact sales’ CTA ');
    }

    //console.log(`${scrollPercentage}% of the page has been scrolled`);
  });
};

export default () => {
  setup();
  if (window.location.pathname.includes('/pricing/')) {
    pricingPageInit();
  } else if (window.location.pathname === '/guides/posts/payment-certainty-in-uncertain-times/') {
    fireEvent('User lands on webiner landing page ');
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
      }
    });
  }
};
