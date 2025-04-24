import { fullStory, events } from '../../../../lib/utils';
import MP105 from './lib/MP105';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{MP114}} - {{Login UX Improvements (MP105 Iteration)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP114',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Excludes IE
    if (!(/*@cc_on!@*/false || !!document.documentMode)) { // eslint-disable-line spaced-comment
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      MP105.init();

      poller(['.MP105-checkbox'], () => {
        document.querySelector('.MP105-checkbox').innerHTML = `<input class='js-checkoutRegister' type='checkbox' id='MP114-registerWithMamasAndPapas' for='formOptionRegister'>
        <strong>Register</strong> <i>to save your details and get offers straight to your inbox</i>`;

        document.querySelector('.MP105-checkbox > input').addEventListener('click', () => {
          events.send('MP114', 'Clicked', 'Register', { sendOnce: true });
        });
      });

      // Changes text on Forgot Password lightbox
      document.querySelector('a.password-forgotten').addEventListener('click', () => {
        events.send('MP114', 'Clicked', 'Forgot your password?', { sendOnce: true });
        poller(['.forgottenPwd', '#forgottenPwdForm button.positive.btn-primary'], () => {
          document.querySelector('.forgottenPwd > .headline').innerHTML = 'Forgot your password?';
          document.querySelector('.forgottenPwd > .description').innerHTML = `No problem, it only takes a couple of minutes to get back into your account. Enter your email address and we'l send you a link to recover your password.`; // eslint-disable-line quotes
          document.querySelector('#forgottenPwdForm button.positive.btn-primary').innerHTML = 'Reset Password Securely';

          poller(['#validEmail.alert-success'], () => {
            events.send('MP114', 'Clicked', 'Reset Password', { sendOnce: true });
            setTimeout(() => {
              const successContent = `<div class='forgottenPwd clearfix p-4'>
              <div class='headline'>Forgot your password?</div>
              <div class='description'>We've sent you an email to help you recover your password</div><div class='MP105-listWrapper'>
              <div class='MP105-listContainer'>
              <ul class='MP105-list'>
                <li class='MP105-item'><p>If it doesn't arrive within a few minutes, please check your SPAM or Junk folder, our email might be there</p></li>
                <li class='MP105-item'><p>Still need some help? Call us on 0345 268 2000</p></li>
              </ul></div>
              </div>`;
              document.querySelector('#cboxContent').insertAdjacentHTML('afterbegin', successContent);
              document.querySelector('#cboxContent').style.height = 'fit-content';
              document.querySelector('#cboxOverlay').classList.add('MP114-showOverlay');
              document.querySelector('#colorbox').classList.add('MP114-showContainer');
              document.querySelector('#colorbox').style.top = '10%';
              document.querySelector('#cboxClose').addEventListener('click', () => {
                document.querySelector('#cboxOverlay').classList.remove('MP114-showOverlay');
                document.querySelector('#colorbox').classList.remove('MP114-showContainer');
              });
            }, 2000);
          }, { multiplier: 1, timeout: 100000 });
        });
      });
    }
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

  components: {},
};

export default Experiment;
