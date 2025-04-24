import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{MP116}} - {{Forgot Password Functionality (MP107 iteration)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP116',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Changes text on Forgot Password lightbox
    document.querySelector('a.password-forgotten').addEventListener('click', () => {
      events.send('MP116', 'Clicked', 'Forgot your password?', { sendOnce: true });
      poller(['.forgottenPwd', '#forgottenPwdForm button.positive.btn-primary'], () => {
        document.querySelector('.forgottenPwd > .headline').innerHTML = 'Forgot your password?';
        document.querySelector('.forgottenPwd > .description').innerHTML = `No problem, it only takes a couple of minutes to get back into your account. Enter your email address and we'l send you a link to recover your password.`; // eslint-disable-line quotes
        document.querySelector('#forgottenPwdForm button.positive.btn-primary').innerHTML = 'Reset Password Securely';

        poller(['#validEmail.alert-success'], () => {
          events.send('MP116', 'Clicked', 'Reset Password', { sendOnce: true });
          setTimeout(() => {
            const successContent = `<div class='forgottenPwd clearfix p-4'>
            <div class='headline'>Forgot your password?</div>
            <div class='description'>We've sent you an email to help you recover your password</div><div class='MP107-listWrapper'>
            <div class='MP107-listContainer'>
            <ul class='MP107-list'>
              <li class='MP107-item'><p>If it doesn't arrive within a few minutes, please check your SPAM or Junk folder, our email might be there</p></li>
              <li class='MP107-item'><p>Still need some help? Call us on 0345 268 2000</p></li>
            </ul></div>
            </div>`;
            document.querySelector('#cboxContent').insertAdjacentHTML('afterbegin', successContent);
            document.querySelector('.MP107-listWrapper').classList.add('show');
            document.querySelector('#cboxContent').style.height = 'fit-content';
            document.querySelector('#cboxOverlay').classList.add('MP116-showOverlay');
            document.querySelector('#colorbox').classList.add('MP116-showContainer');
            document.querySelector('#colorbox').style.top = '10%';
            document.querySelector('#cboxClose').addEventListener('click', () => {
              document.querySelector('#cboxOverlay').classList.remove('MP116-showOverlay');
              document.querySelector('#colorbox').classList.remove('MP116-showContainer');
            });
          }, 2000);
        }, { multiplier: 1, timeout: 100000 });
      });
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

  components: {},
};

export default Experiment;
