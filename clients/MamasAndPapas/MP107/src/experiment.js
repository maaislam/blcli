import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{MP107}} - {{Forgot Password Functionality}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP107',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    document.querySelector('.forget-password > a').addEventListener('click', () => {
      poller(['.forgottenPwd'], () => {
        const lightBoxDescription = document.querySelector('.forgottenPwd > .description');
        const lightBoxList = `<div class='MP107-listWrapper'>
        <div class='MP107-listContainer'>
        <ul class='MP107-list'>
        <li class='MP107-item'>You’ll receive an email with a link to reset your password in the next couple of minutes</li>
        <li class='MP107-item'>Please check your SPAM if it doesn’t arrive in 2 minutes</li>
        <li class='MP107-item'>Having trouble? Call us on 0345 268 2000 for help</li>
        </ul></div>
        </div>`;
        lightBoxDescription.insertAdjacentHTML('afterend', lightBoxList);
      });
    });

    document.querySelector('#cboxWrapper').addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        events.send('MP107', 'Interacted with Lightbox', 'Clicked "Send Email"');
        poller(['.forgottenPwd'], () => {
          if (document.querySelector('#cboxWrapper label.error')) {
            events.send('MP107', 'Interacted with Lightbox', 'Error on Submit', { sendOnce: true });
          }
        });
      }
    });
    events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
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
