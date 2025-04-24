import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';
import { pollerLite, poller } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class Steps {
  constructor() {
    this.steps = ['Choose your offer', 'Choose your food', 'Place your order'];
    this.setDefaultStep();
    this.create();
    this.bindEvents();
    this.render();
    this.changeStep(this.defaultStep); // Set initial step
  }

  /**
   * Create component element
   */
  create() {
    const element = document.createElement('ul');
    element.classList.add(`${ID}_Steps`);
    element.innerHTML = `
      ${this.steps.map((step, i) => `
        <li class="${ID}_Step" data-step-num="${i + 1}">
          <span class="${ID}_Step-num">
            <i>${i + 1}</i>
          </span>
          <span class="${ID}_Step-text">${step}</span>
        </li>
      `).join('')}
    `;

    this.component = element;
  }

  /**
   * Event handlers
   */
  bindEvents() {
    // Remember when the user has added an offer
    const addedOffer = () => {
      window.localStorage[`${ID}_added_offer`] = 'true';
      events.send(ID, 'Clicked', 'An offer');
    };

    // Offer slide out offers
    pollerLite(['.aside-offers'], () => {
      const offers = document.querySelectorAll('.aside-offers .offer-box');
      Array.from(offers).forEach((offer) => {
        offer.querySelector('a').addEventListener('click', addedOffer);
      });
    });

    // /offers.aspx page offers
    if (this.defaultStep === 1) {
      const offers = document.querySelectorAll('.offer-m');
      Array.from(offers).forEach((offer) => {
        const link = offer.querySelector('a[href]');
        if (link) {
          link.addEventListener('click', addedOffer);
        }
      });
    }

    const steps = this.component.querySelectorAll(`.${ID}_Step-num`);
    Array.from(steps).forEach((step) => {
      step.addEventListener('click', () => {
        // Click handler
      });
    });
  }

  /**
   * Render component
   */
  render() {
    this.setPage();

    /**
     * Render to page
     */
    const inject = () => {
      let el;
      switch (this.page) {
        case 'dealbuilder-PJ014':
          pollerLite(['.PJ014_dealName'], () => {
            el = document.querySelector('.PJ014_dealName');
            el.insertAdjacentElement('afterend', this.component);
          });
          break;

        case 'dealbuilder':
          el = document.querySelector('.aside-header > a');
          el.insertAdjacentElement('afterend', this.component);
          break;

        case 'basket':
          el = document.querySelector('.main');
          el.insertAdjacentElement('afterbegin', this.component);
          break;

        case 'checkout':
          el = document.querySelector('.checkout-mobile-panel');
          el.insertAdjacentElement('afterend', this.component);
          break;

        case 'offers':
          el = document.querySelector('.mainMobileInside');
          el.insertAdjacentElement('afterbegin', this.component);
          break;

        default:
          el = document.querySelector('.mainMobileInside');
          el.insertAdjacentElement('afterbegin', this.component);
          break;
      }
    };

    /**
     * Watches for page reloads to re-render the component
     */
    const prm = window.prm || window.Sys.WebForms.PageRequestManager.getInstance();
    prm.add_pageLoaded(() => {
      try {
        if (!document.querySelector(`.${ID}_Steps`)) {
          inject();
        }
      } catch (e) {
        console.log(e);
      }
    });

    inject(); // Init
  }

  /**
   * Set page type
   */
  setPage() {
    const url = window.location.href;
    let page;
    switch (true) {
      case /\/dealbuilder.aspx/.test(url):
        if (document.body.classList.contains('PJ014')) {
          page = 'dealbuilder-PJ014';
        } else {
          page = 'dealbuilder';
        }
        break;

      case /\/(basket-confirmation|basket).aspx/.test(url):
        page = 'basket';
        break;

      case /\/checkout-mobile.aspx/.test(url):
        page = 'checkout';
        break;

      case /\/offers.aspx/.test(url):
        page = 'offers';
        break;

      default:
        break;
    }
    this.page = page;
  }

  /**
   * Change the active step number
   * @param {number} num Step number to change to
   */
  changeStep(num) {
    this.resetState();

    // Add --active modifier to active step
    const newActiveStep = this.component.querySelectorAll(`.${ID}_Step`)[num - 1];
    newActiveStep.classList.add(`${ID}_Step--active`);

    // Add --completed modifier to any steps before the active step
    let previousStep = newActiveStep.previousElementSibling;
    while (previousStep) {
      previousStep.classList.add(`${ID}_Step--completed`);
      previousStep = previousStep.previousElementSibling;
    }

    // GA tracking
    events.send(ID, 'User saw', `Stage ${num} of the offer progress bar`);
  }

  /**
   * Reset all step states
   */
  resetState() {
    const activeStep = this.component.querySelector(`.${ID}_Step--active`);
    if (activeStep) activeStep.classList.remove(`${ID}_Step--active`);

    const completedSteps = this.component.querySelectorAll(`.${ID}_Step--completed`);
    Array.from(completedSteps).forEach((step) => {
      step.classList.remove(`${ID}_Step--completed`);
    });
  }

  /**
   * Gets active step based on URL
   * @returns {number}
   */
  setDefaultStep() {
    const url = window.location.href;
    let value;
    switch (true) {
      case /\/offers.aspx/.test(url):
        value = 1;
        break;

      case /\/(dealbuilder|pizzas|sides|drinks|desserts).aspx/.test(url):
        value = 2;
        break;

      case /\/(basket|basket-confirmation|checkout-mobile).aspx/.test(url):
        value = 3;
        break;

      default:
        break;
    }
    this.defaultStep = value;
  }
}
