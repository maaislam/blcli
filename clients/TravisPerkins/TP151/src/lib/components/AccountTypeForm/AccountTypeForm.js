/* eslint-disable no-new */
import shared from '../../shared';
import { getDeviceType } from '../../services';
import { Animation, getClosest, pollerLite } from '../../../../../../../lib/utils';

export default class AccountType {
  constructor() {
    this.name = `${shared.ID}_AccountType`;
    this.selections = [];
    this.pathname = window.location.pathname;
    this.device = getDeviceType();

    this.create = this.create.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.getPageRenderFunction = this.getPageRenderFunction.bind(this);
    this.render = this.render.bind(this);

    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const { name } = this;

    const component = document.createElement('div');
    component.className = `${name}`;
    component.innerHTML = `
      <div class="${name}_overlay"></div>

      <div class="${name}_tab ${name}_mobileOnly">
        <a href="#">
          <p>Quick Account Question!</p>
        </a>
      </div>

      <div class="${name}_tab ${name}_desktopOnly">
        <h3>Quick Question!</h3>
        <p>Please select an option, so we can understand our customers and personalise your experience!</p>
      </div>

      <div class="${name}_contentWrap">
        <div class="${name}_step ${name}_step--active" data-step="default" data-step-count="1">
          <div class="${name}_head">
            <p>Which of these best describes your account type?</p>
          </div>

          <div class="${name}_body">
            <ul class="${name}_radioList">
              <li>
                <input type="radio" id="${name}_option--solo" name="user_type" value="solo">
                <label for="${name}_option--solo">Solo Tradesperson</label>
              </li>

              <li>
                <input type="radio" id="${name}_option--trade_company" name="user_type" value="trade_company">
                <label for="${name}_option--trade_company">Part of a Trade Company</label>
              </li>

              <li>
                <input type="radio" id="${name}_option--adjacent" name="user_type" value="adjacent">
                <label for="${name}_option--adjacent">Part of a Non-Trade Company</label>
              </li>

              <li>
                <input type="radio" id="${name}_option--diy" name="user_type" value="diy">
                <label for="${name}_option--diy">DIY / Non-business account</label>
              </li>
            </ul>
          </div>
        </div>


        <div class="${name}_step" data-step="trade_company" data-step-count="2">
          <div class="${name}_head">
            <p>And how many employees does your company have?</p>
          </div>

          <div class="${name}_body">
            <ul class="${name}_radioList ${name}_radioList--boxes">
              <li>
                <input type="radio" id="${name}_option--small" name="company_size" value="small">
                <label for="${name}_option--small">2-5</label>
              </li>

              <li>
                <input type="radio" id="${name}_option--medium" name="company_size" value="medium">
                <label for="${name}_option--medium">6-10</label>
              </li>

              <li>
                <input type="radio" id="${name}_option--medium2" name="company_size" value="medium">
                <label for="${name}_option--medium2">11-20</label>
              </li>

              <li>
                <input type="radio" id="${name}_option--large" name="company_size" value="large">
                <label for="${name}_option--large">21+</label>
              </li>
            </ul>
          </div>
        </div>

        <div class="${name}_step" data-step="thank_you">
          <div class="${name}_body">
            <h3>Thank you!</h3>
          </div>
        </div>

        <div class="${name}_button">
          <span>Select</span>
        </div>
      </div>
    `;

    this.component = component;
  }

  bindEvents() {
    const {
      component,
      name,
      selections,
      device,
    } = this;
    const cta = component.querySelector(`.${name}_button`);
    const radioButtons = component.querySelectorAll('input[type="radio"]');
    const mobileTab = component.querySelector(`.${name}_tab.${name}_mobileOnly`);

    /**
     * Remove an element from the DOM
     * @param {HTMLElement} el
     */
    const removeEl = (el) => {
      el.parentElement.removeChild(el);
    };

    /** Remove all error messages from the component */
    const removeErrors = () => {
      const errors = component.querySelectorAll(`.${name}_error`);
      [].forEach.call(errors, removeEl);
    };

    /**
     * Create an error message
     * @param {string} message
     */
    const createError = (message) => {
      removeErrors();
      cta.insertAdjacentHTML('beforebegin', `
        <div class="${name}_error">
          <p>${message}</p>
        </div>
      `);
    };

    /**
     * Get the current step
     * @param {string}
     * @returns {HTMLElement}
     */
    const getCurrentStep = () => component.querySelector(`.${name}_step--active`);

    /**
     * Get the next step for this user type if applicable
     * @param {string} userType
     * @returns {HTMLElement}
     */
    const getNextStep = (userType) => {
      const currentStep = getCurrentStep();
      const currentStepNumber = Number(currentStep.getAttribute('data-step-count'));
      const nextStepNumer = currentStepNumber + 1;
      const nextStep = component.querySelector(`[data-step=${userType}][data-step-count="${nextStepNumer}"]`);
      return nextStep;
    };

    /**
     * Get the selected option value from a group of radio buttons
     * @returns {string} Selected value
     */
    const getSelectedValue = () => {
      const currentStep = getCurrentStep();
      const currentRadioButtons = currentStep.querySelectorAll('input');
      const selectedEl = [].filter.call(currentRadioButtons, option => option.checked)[0];
      return selectedEl ? selectedEl.value : null;
    };

    /**
     * Fade out an element
     * @param {HTMLElement} element Element to animate
     * @param {number} time Time to complete the animation
     * @param {object} callbacks
     * @param {object.<Function>} callbacks.beforeAnim Run before animation
     * @param {object.<Function>} callbacks.afterAnim Run after animation
     */
    const fadeOut = (element, time, callbacks) => {
      const cb = callbacks || {};

      new Animation({
        elem: element,
        style: 'opacity',
        unit: '',
        from: 1,
        to: 0,
        time: time || 700,
        beforeAnim: cb.beforeAnim || null,
        afterAnim: () => {
          element.style.display = 'none';

          if (cb.afterAnim instanceof Function) {
            cb.afterAnim();
          }
        },
      });
    };

    /**
     * Fade in an element
     * @param {HTMLElement} element Element to animate
     * @param {number} time Time to complete the animation
     * @param {object} callbacks
     * @param {object.<Function>} callbacks.beforeAnim Run before animation
     * @param {object.<Function>} callbacks.afterAnim Run after animation
     */
    const fadeIn = (element, time, callbacks) => {
      const cb = callbacks || {};

      new Animation({
        elem: element,
        style: 'opacity',
        unit: '',
        from: 0,
        to: 1,
        time: time || 700,
        beforeAnim: () => {
          element.style.display = '';

          if (cb.beforeAnim instanceof Function) {
            cb.beforeAnim();
          }
        },
        afterAnim: cb.afterAnim || null,
      });
    };

    /**
     * Transition to a step
     * @param {HTMLElement} nextStep
     * @param {Function} callback
     */
    const changeToStep = (nextStep, callback) => {
      const currentStep = getCurrentStep();

      // Fade out current step
      fadeOut(currentStep, 300, {
        afterAnim: () => {
          currentStep.classList.remove(`${name}_step--active`);

          // Fade in next step
          fadeIn(nextStep, 300, {
            beforeAnim: () => {
              nextStep.classList.add(`${name}_step--active`);
            },
            afterAnim: callback,
          });
        },
      });
    };

    /** Show a confirmation message */
    const showConfirmation = () => {
      const confirmation = component.querySelector('[data-step="thank_you"]');
      const currentStep = getCurrentStep();

      // Fade out current step
      fadeOut(currentStep, 300, {
        afterAnim: () => {
          currentStep.classList.remove(`${name}_step--active`);

          // Fade in next step
          fadeIn(confirmation, 300, {
            beforeAnim: () => {
              confirmation.classList.add(`${name}_step--active`);
            },
          });
        },
      });

      // Fade out CTA
      fadeOut(cta, 300);
    };

    /**
     * Submit the form
     * @param {string} selection Selection option
     * @param {Function} callback
     */
    const submitForm = (selection, callback) => {
      document.cookie = `${shared.ID}_persona=${selection};`;

      // Hide form
      setTimeout(() => {
        fadeOut(component, 600, {
          afterAnim: callback,
        });
      }, 2000);
    };

    /** Prevent component from being interacted with */
    const lockComponent = () => {
      component.classList.add(`${name}--locked`);
    };

    /** Allow component to be interacted with */
    const unlockComponent = () => {
      component.classList.remove(`${name}--locked`);
    };

    /**
     * Process the form
     * @param {Function} callback
     */
    const processForm = (callback) => {
      removeErrors();
      const selection = getSelectedValue();

      if (!selection) {
        createError('You must select an option');
      } else {
        // Keep a record of selection
        selections.push(selection);

        const nextStep = getNextStep(selection);
        if (nextStep) {
          changeToStep(nextStep, callback);
        } else {
          showConfirmation();
          submitForm(selection, callback);
        }
      }
    };

    /**
     * Return the input container
     * @param {HTMLElement} input
     * @returns {HTMLElement}
     */
    const getInputContainer = input => getClosest(input, `.${name}_step`);

    /**
     * Return the currently active input container
     * @param {HTMLElement} container
     * @returns {HTMLElement}
     */
    const getActiveInput = container => container.querySelector(`.${name}_radio--active`);

    /**
     * Update active input classes
     * @param {HTMLElement} input
     */
    const updateActiveState = (input) => {
      const activeClass = `${name}_radio--active`;
      const container = getInputContainer(input);
      const activeInput = getActiveInput(container);
      const parent = input.parentElement;
      const isActive = parent === activeInput;

      if (!isActive) {
        if (activeInput) {
          activeInput.classList.remove(activeClass);
        }

        parent.classList.add(activeClass);
      }
    };

    /** Show the CTA if it's hidden */
    const showCta = () => {
      const ctaHidden = cta.getBoundingClientRect().height === 0;
      if (ctaHidden) {
        cta.style.display = 'block';

        // Fade in CTA
        fadeIn(cta, 300);
      }
    };

    /**
     * Handle radio button change
     * @param {Object} event
     */
    const handleRadioChange = (event) => {
      updateActiveState(event.target);
      showCta();
    };

    /** Expand content on click for mobile */
    const handleMobileTabClick = () => {
      component.classList.toggle(`${name}--showMobile`);
    };

    [].forEach.call(radioButtons, (element) => {
      element.addEventListener('change', handleRadioChange);
      if (device === 'desktop') {
        element.addEventListener('change', () => {
          lockComponent();
          setTimeout(() => {
            processForm(unlockComponent);
          }, 700);
        });
      }
    });
    cta.addEventListener('click', processForm);
    mobileTab.addEventListener('click', handleMobileTabClick);
  }

  getPageRenderFunction() {
    const { component, pathname, device } = this;
    const isMobile = device === 'mobile';
    const pages = {
      '/login': () => {
        if (isMobile) {
          pollerLite(['#collapsibleContainer'], (elements) => {
            const [content] = elements;
            content.insertAdjacentElement('beforebegin', component);
          });
        } else {
          pollerLite(['#content'], (elements) => {
            const [content] = elements;
            content.insertAdjacentElement('beforeend', component);
          });
        }
      },

      '/accountDashboard': () => {
        if (isMobile) {
          pollerLite(['#accountDashBoardMessage'], (elements) => {
            const [content] = elements;
            content.insertAdjacentElement('afterend', component);
          });
        } else {
          pollerLite(['.acc-dashboard-content'], (elements) => {
            const [content] = elements;
            content.insertAdjacentElement('beforebegin', component);
          });
        }
      },

      '/checkout/order_thank_you_page': () => {
        if (isMobile) {
          pollerLite(['.success_header'], (elements) => {
            const [content] = elements;
            content.insertAdjacentElement('afterend', component);
          });
        } else {
          pollerLite(['.confirmation_head'], (elements) => {
            const [content] = elements;
            content.insertAdjacentElement('afterend', component);
          });
        }
      },

      default: null,
    };

    return pages[pathname] || pages.default;
  }

  render() {
    const { getPageRenderFunction } = this;
    const pageRenderFunction = getPageRenderFunction();
    if (pageRenderFunction instanceof Function) {
      pageRenderFunction();
    }
  }
}
