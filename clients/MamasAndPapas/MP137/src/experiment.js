import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{MP137}} - {{Forgot password optimisation}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP137',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const forgotPwdLink = document.querySelector('.forget-password');

    forgotPwdLink.addEventListener('click', () => {
      // Replaces Text in form
      components.replaceFormText();

      // Send GA Event
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Forgot your password?`, { sendOnce: true }); // eslint-disable-line quotes
    });
    pollerLite(['#validEmail.alert.alert-success'], () => {
      const successMessage = document.querySelector('#validEmail.alert.alert-success');
      // Replace Success Message
      successMessage.innerHTML = `<div class='MP137-successMessageWrapper'>
        <div class='MP137-message'>We've sent you an email so you can reset your login</div>
        <div class='MP137-messageSteps'>
          <ul>
            <li class='MP137-step'><span>Please check your SPAM if it doesn't arrive in 2 minutes</span></li>
            <li class='MP137-step'><span>Having trouble? Call us on 0345 268 2000 for help</span></li>
          </ul>
        </div>
      </div>`;
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Replace Text
     */
    replaceFormText() {
      pollerLite(['#cboxWrapper', '.forgottenPwd'], () => {
        const resetPwdBox = document.querySelector('.forgottenPwd');
        // Replace Heading Text
        resetPwdBox.querySelector('.headline').textContent = `Forgot Your Password?`; // eslint-disable-line quotes
        // Replace Instructions Text
        resetPwdBox.querySelector('.description').textContent = `We'll email you a secure link so you can reset your password.`; // eslint-disable-line quotes
        // Replace CTA Text
        resetPwdBox.querySelector('.positive.btn.btn-primary').textContent = `Get Secure Link`; // eslint-disable-line quotes
      });
    },
  },
};

export default Experiment;
