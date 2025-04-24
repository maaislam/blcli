import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite, obsIntersection } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import { modalNewsletterData, newsletterData } from './data/data';
import newsletterWrapper from './components/newsletterWrapper';
import modal from './components/modal';
import showEmailError from './helpers/showEmailError';
import hideEmailError from './helpers/hideEmailError';
import checkoutPage from './pages/checkout';
import signUpHandler from './handlers/signUpHandler';

const { ID, VARIATION } = shared;
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

const init = () => {
  const { pathname } = window.location;

  if (pathname === '/') {
    pollerLite(
      ['#FED-prop-swiper-sticky + div[data-testid="row"] [data-testid="grid"]', '.oct-tabbed-section--transparent'],
      () => {
        const targetElement = isMobile()
          ? document.querySelector('.oct-tabbed-section--transparent + div')
          : document.querySelector('.oct-tabbed-section--transparent');
        if (!document.querySelector(`#${ID}__newsletterWrapper`)) {
          targetElement.insertAdjacentHTML('afterend', newsletterWrapper(ID, newsletterData));
        }

        const ctrlEmailElem = document.querySelector('.oct-signup__field [data-testid="email"]');
        const stayInTouchElem = ctrlEmailElem.closest('[data-testid="row"]');
        const varEmailElem = document.querySelectorAll(`.${ID}__input`);
        const emailRegex = /^[^@]+@[^@]+\.[^@.]{2,}$/;

        stayInTouchElem.classList.add(`${ID}__hide`);

        if (ctrlEmailElem) {
          const handleInputChange = (elem, flag = false) => {
            const { value } = elem;
            if (value.length === 0) {
              showEmailError(ID, elem, 'Please fill out this field.');
            } else if (!emailRegex.test(value)) {
              showEmailError(ID, elem, 'Please enter a valid email address.');
            } else {
              hideEmailError(ID, elem);
              flag === true && elem.closest(`.${ID}__emailWrapper`).querySelector(`.${ID}__btn`).click();
            }
          };

          varEmailElem.forEach((elem) => {
            elem.value = '';
            elem.addEventListener('input', (e) => {
              handleInputChange(e.target);
            });

            elem.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleInputChange(e.target, true);
              }
            });
          });
        }
      }
    );
  }

  if (!document.querySelector(`.${ID}__modal`)) {
    document.body.insertAdjacentHTML('beforeend', modal(ID, modalNewsletterData));
  }

  if (pathname.includes('/checkout/initialise')) {
    checkoutPage(ID);
  }
};

export default () => {
  const testID = `${ID}|insert test name`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  // fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  const { pathname } = window.location;

  if (pathname === '/') {
    const handleIntersection = (entry) => {
      const modal = document.querySelector(`.${ID}__modal`);
      if (entry.isIntersecting) {
        if (!document.body.classList.contains(`${ID}__conditionMet`)) {
          fireBootsEvent(
            'Customer scrolls to the bottom of the homepage and sees the homepage element',
            true,
            eventTypes.experience_action,
            {
              action: actionTypes.view,
              action_detail: 'Customer scrolls to the bottom of the homepage and sees the homepage element',
            }
          );
          document.body.classList.add(`${ID}__conditionMet`);
        }

        if (sessionStorage.getItem('modalShown') !== 'true') {
          modal && modal.classList.remove(`${ID}__open`);
        }
      } else if (!entry.isIntersecting) {
        if (sessionStorage.getItem('modalShown') !== 'true') {
          modal && modal.classList.add(`${ID}__open`);
        }
      }
    };

    const handleObserver = (selector) => {
      const intersectionAnchor = document.querySelector(selector);
      if (intersectionAnchor) {
        obsIntersection(intersectionAnchor, 0.2, handleIntersection);
      }
    };

    if (VARIATION === 'control') {
      pollerLite(['.oct-signup__main-container'], () => {
        handleObserver('.oct-signup__main-container');
      });
    } else if (VARIATION === '1') {
      pollerLite([`#${ID}__newsletterWrapper`], () => {
        handleObserver(`#${ID}__newsletterWrapper`);
      });
    }
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__floatElement`)) {
      const modal = document.querySelector(`.${ID}__modal`);
      modal.classList.add(`${ID}__open`);
    } else if (target.closest(`.${ID}__closeButton`)) {
      const modal = document.querySelector(`.${ID}__modal`);
      modal.classList.remove(`${ID}__open`);
      sessionStorage.setItem('modalShown', 'true');
    } else if (target.closest(`.${ID}__btn`)) {
      signUpHandler(ID, target);
    } else if (target.closest(`.${ID}__preferenceBtn`)) {
      fireBootsEvent('Customer enters their email and clicks submit', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'Customer enters their email and clicks submit',
      });
    } else if (target.closest('.oct-your-details-user [data-testid="your-details-edit-btn"]')) {
      if (document.querySelector(`.${ID}__consent`)) {
        document.querySelector(`.${ID}__consent`).remove();
      }
      checkoutPage(ID);
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const { isLoggedIn } = window.userObj;

  if (isLoggedIn === 'true') {
    window.userStatus = 'logged-in';
  } else {
    window.userStatus = 'logged-out';
  }

  init();
};
