import settings from '../../settings';
import { cacheDom } from '../../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';

export default () => {
  const isMobile = window.innerWidth < 900;
  const { ID } = settings;

  /**
   * component
   * @returns {HTMLElement}
   */
  const component = (() => {
    const element = document.createElement('div');
    element.classList.add(`${ID}_NewsletterBar`);
    element.setAttribute('style', 'display: none;');
    element.innerHTML = `
      <div class="container noPadding ${ID}_NewsletterBar__hiddenView" style="display: none;">
        <div class="${ID}_NewsletterBar__label">
          <p style="font-size: 13px;">
            Save 10% off your next order*. <span class="${ID}_NewsletterBar__open">Learn More ></span>
          </p>
        </div>
      </div>
      <div class="container noPadding ${ID}_NewsletterBar__fieldView" style="display: block;">
        <div class="${ID}_NewsletterBar__label">
          <p class="${ID}_NewsletterBar__label__desktop">
            Save 10% off your next order*. Just sign up to our newsletter for your unique code:
          </p>
          <p class="${ID}_NewsletterBar__label__mobile">
            Sign up to our newsletter and get a 10% off voucher*
          </p>
        </div>
        <div class="${ID}_NewsletterBar__field"></div>
        <div class="${ID}_NewsletterBar__close"></div>
      </div>
    `;

    if (settings.VARIATION === '2') {
      const hidden = element.querySelector(`.${ID}_NewsletterBar__hiddenView`);
      const field = element.querySelector(`.${ID}_NewsletterBar__fieldView`);
      hidden.style.display = 'block';
      field.style.display = 'none';

      hidden.addEventListener('click', () => {
        pollerLite([() => !!window.jQuery], () => {
          jQuery(hidden).slideUp();
          jQuery(field).slideDown();
        });
      });
    }

    const form = cacheDom.get('#js-emailSignUp');
    form.querySelector('#js-emailSignUpEmail').placeholder = isMobile ? 'Enter your email...' : 'Enter your email address...';
    form.querySelector('.email-sign-up-pop-up__submit').value = isMobile ? 'Send' : 'Get voucher';
    element.querySelector(`.${ID}_NewsletterBar__field`).appendChild(form);

    // Add privacy policy link
    form.insertAdjacentHTML('beforeend', `
      <div class="${ID}_privacypolicy">
        <a href="/privacy-policy/?utm_source=${ID}">View Privacy Policy here</a>
      </div>
    `);

    return element;
  })();

  /** show */
  const show = () => {
    component.style.display = 'block';
    events.send(settings.ID, 'View', '10% off bar shown', { sendOnce: true });
  };

  /** hide */
  const hide = () => {
    component.style.display = 'none';
  };

  /** bindEvents */
  const bindEvents = () => {
    // Close
    const closeEl = component.querySelector(`.${ID}_NewsletterBar__close`);
    closeEl.addEventListener('click', () => {
      events.send(ID, 'Closed', 'Closed field', { sendOnce: true });
      document.cookie = 'EJ013_submitted=true';
      hide();
    });

    // Hide field on success
    const formEl = cacheDom.get('#js-emailSignUp');
    formEl.onsubmit = () => {
      pollerLite([
        () => {
          let submitted;
          const success = cacheDom.get('#js-userNewsletterSubscribedSuccess');
          if (success && success.style.display === 'block') {
            submitted = true;
          } else {
            const subscribed = cacheDom.get('#js-userAlredySubscribedToNewsletter');
            if (subscribed && subscribed.style.display === 'block') {
              submitted = true;
            }
          }
          return submitted;
        },
      ], () => {
        document.cookie = 'EJ013_submitted=true';
        hide();
      }, {
        multiplier: 0,
        timeout: 10000,
      });
    };

    // Event on click
    const submitEl = formEl.querySelector('.email-sign-up-pop-up__submit');
    submitEl.addEventListener('click', () => {
      events.send(ID, 'Clicked', 'Get Voucher');
    });
  };

  /** render */
  const render = () => {
    const nav = cacheDom.get('.main-site-header');
    nav.parentElement.insertBefore(component, nav.nextElementSibling);
    return component;
  };

  bindEvents(component);
  render(component);

  return {
    show,
    hide,
  };
};
