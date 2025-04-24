/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

import attachEvent from './helpers/attachEvent';
import observeDOM from './helpers/observer';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // const buttonConfig = [
  //   {
  //     name: 'login',
  //     domElm: document.querySelector('a[href^="https://manage.gocardless.com"]'),
  //   },
  //   {
  //     name: 'signup',
  //     domElm: document.querySelector('a[href^="https://manage.gocardless.com/signup"]'),
  //   },
  // ];

  // buttonConfig.forEach((item) => {
  //   item.domElm.addEventListener('click', (e) => {
  //     fireEvent(`user has clicked ${item.name} button`);
  //   });
  // });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  const locationStr = '/fr'; //const locationStr = '/de'(when test run for DACH)

  if (VARIATION == 'control' || (VARIATION == '2' && location.pathname.indexOf('/fr') !== -1)) {
    //last min change
    /*******change contact sales href in control*******/
    const newContactUrl =
      VARIATION == 'control' ? 'https://gocardless.com/g/contact-sales-1/' : 'https://gocardless.com/g/contact-sales-3/';
    const isContactPage = location.pathname.indexOf('/contact-us/') !== -1;

    //const isGermany = location.pathname.indexOf('/fr') !== -1;
    const isFrench = location.pathname.indexOf('/fr') !== -1;

    const setHrefToNewContactSales = (elmSelector) => {
      let talkToSales = document.querySelectorAll(elmSelector)[0];

      talkToSales?.setAttribute('href', newContactUrl);
    };

    const pageMutationCallback = () => {
      if (isContactPage && !isFrench) {
        setHrefToNewContactSales('.css-sqz7l1');
      } else if (isFrench) {
        setHrefToNewContactSales('.css-1m52c96');
      }
    };

    observeDOM('body', { attributes: false, childList: true, characterData: false, subtree: false }, pageMutationCallback);
    document.body.addEventListener('click', (e) => {
      attachEvent(e, fireEvent, VARIATION);
    });
    /*******change contact sales href in control*******/

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  //

  // create an observer instance

  const mutationCallback = (mutation) => {
    //hide login Btn (:O)
    const experimentConfig = (variation) => {
      const isGermany = location.pathname.indexOf('/de') !== -1;
      const isFrench = location.pathname.indexOf('/fr') !== -1;
      const data = {
        variation1: {
          ctaText: isGermany ? 'Kontakt aufnehmen' : isFrench ? 'Demander une démo' : 'Get a demo',
          ctaLink: 'https://gocardless.com/de-de/g/gcm0029dach/',
        },
        variation2: {
          ctaText: isGermany ? 'Vertrieb kontaktieren' : isFrench ? 'Contactez-nous' : 'Contact Sales',
          ctaLink: 'https://gocardless.com/de-de/g/gcm0029dach/',
        },
      };
      return variation === '1' ? data.variation1 : data.variation2;
    };

    const experimentData = experimentConfig(VARIATION);
    const getDemoText = experimentData.ctaText;
    const destinationUrl = experimentData.ctaLink;

    const signupBtn =
      document.querySelector('a[href^="https://manage.gocardless.com/signup"]') ||
      document.querySelector(`a[href="${destinationUrl}"]`);
    const loginBtn = document.querySelector('a[href^="https://manage.gocardless.com"]');

    const primaryMobileNav = document.querySelector('[aria-labelledby="mobilePrimaryNavigation"]');

    if (loginBtn) {
      loginBtn.removeAttribute('style');
      loginBtn.style.display = 'none';
    }
    if (signupBtn) {
      signupBtn.innerText = getDemoText;
      signupBtn.classList.add(`${ID}__max-width`);
      signupBtn.setAttribute('href', `${destinationUrl}`);

      if (document.querySelectorAll('.GCM-22__patch').length == 0) {
        signupBtn.insertAdjacentHTML(
          'beforebegin',
          `<a class="GCM-22__patch btn btn--small sc-1b6vnr3-8-sc-bdVaJa css-1ks30qh ieoTQl GCM-22__max-width" href="${destinationUrl}" style="">${getDemoText}</a>`
        );
        signupBtn.style.display = 'none';
      }
    }
    //for mobile

    const mobileCallback = () => {
      const primaryMobileNav = document.querySelector('[aria-labelledby="mobilePrimaryNavigation"]');
      const mobileLoginBtn = primaryMobileNav?.querySelector('a.css-2mnmbz');

      const mobileSignupBtn = primaryMobileNav?.querySelector('a.css-1bwxyks');

      mobileLoginBtn && (mobileLoginBtn.style.display = 'none');
      if (mobileSignupBtn) {
        mobileSignupBtn.innerText = getDemoText;
        mobileSignupBtn.classList.add(`${ID}__max-width`);
      }

      mobileLoginBtn?.closest('div').classList.add(`${ID}__mobile-hetdemo-btn`);
    };

    if (primaryMobileNav) {
      mobileCallback();

      primaryMobileNav.addEventListener('click', (e) => {
        setTimeout(() => {
          mobileCallback();
        }, 50);
      });
      //}
    }
    //signupBtn.firstElementChild.innerText = getDemoText;

    //hide cta in hero section
    const allowedCountries = ['/', '/de-de/', '/fr-fr/'];

    const leftHeroSection = document.querySelector('[data-testid="heroSliceText"]');
    const btnSignup = document.querySelectorAll('a[href^="https://manage.gocardless.com/signup"]');
    const btnChat = leftHeroSection?.querySelector('a[href^="https://gocardless.com/contact-us/"]');
    const reqCallBtn = leftHeroSection?.querySelector('button[data-testid="pardotButtonTrigger"]');
    const frenchContactUsBtn = document.querySelector('a[href^="https://gocardless.com/fr-fr/contactez-nous/"]');
    const germanContactUsBtn = document.querySelector('a[href^="https://gocardless.com/de-de/kontakt/"]');
    const irelandContactUsBtn = document.querySelectorAll('a[href ="https://gocardless.com/en-ie/contact-sales/"]')[1];

    if (btnSignup.length > 0) {
      btnSignup.forEach((item) => {
        item.innerHTML = getDemoText;
      });
    }

    [btnChat, reqCallBtn, frenchContactUsBtn, germanContactUsBtn, irelandContactUsBtn].forEach((item) => {
      if (item) {
        item.style.display = 'none';
      }
    });
  };

  (function pollForVariation() {
    if (document.querySelector('#root') || document.querySelector('#gatsby-focus-wrapper')) {
      fireEvent('user has seen the test GCM-22--Homepage CTA');

      mutationCallback();

      document.getElementById('gatsby-focus-wrapper')?.classList.add(`${ID}__gartsby-wrapper`);

      observeDOM('body', { attributes: false, childList: true, characterData: false, subtree: false }, mutationCallback);

      document.body.addEventListener('click', (e) => {
        mutationCallback();
        attachEvent(e, fireEvent, VARIATION);
      });

      let currentPage = location.href;

      setInterval(function () {
        if (currentPage != location.href) {
          currentPage = location.href;

          mutationCallback();
        }
      }, 500);
    } else {
      setTimeout(pollForVariation, 25);
    }
  })();
};
