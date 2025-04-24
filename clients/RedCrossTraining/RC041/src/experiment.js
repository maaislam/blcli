import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import { shareBarHTML } from './lib/sharebar';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC041',
    VARIATION: '{{VARIATION}}',
  },
  globals: {
    queryString: '?utm_source=UC&utm_campaign=RC041',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    poller(['.RC032'], () => {
      components.createShareBar();
      components.copyAndEmailClick();
    });

    poller(['.RC33-main-container'], () => {
      components.createShareBar();
      components.copyAndEmailClick();
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
     * @desc create the share bar
     */
    createShareBar: function createShareBar() {
      const { settings } = Experiment;
      const mobileBox = document.querySelector('.RC010_course_information .booking_inner-wrap');
      const shareBar = document.createElement('div');
      shareBar.classList.add('RC041-shareBar');
      shareBar.innerHTML = shareBarHTML;

      mobileBox.appendChild(shareBar);
      events.send(settings.ID, 'User saw', 'Share options', { sendOnce: true });
    },

    /**
      * @desc copy & email
      */
    copyAndEmailClick: function copyAndEmailClick() {
      const { settings, globals } = Experiment;
      const pageURL = window.location.href;

      // share by email
      const shareByEmail = document.querySelector('.RC041-share_email');
      const shareByURL = document.querySelector('.RC041-share_url');

      shareByEmail.addEventListener('click', () => {
        window.location.href = `mailto:send@example.com?subject=Red%20Cross%20Training%20Course&body=I%20just%20found%20this%20course%20on%20Red%20Cross%20Training%20%0D%0A%0D%0A${encodeURIComponent(pageURL)}${encodeURIComponent(globals.queryString)}`;
        events.send(settings.ID, 'Clicked', 'Clicked share by email', { sendOnce: true });
      });

      // on click of the share URL
      const URLInput = document.querySelector('.RC041-urlOpen');
      URLInput.querySelector('#RC041url_tocopy').value = `${pageURL}${globals.queryString}`;

      shareByURL.addEventListener('click', () => {
        document.querySelector('.RC041-urlOpen').classList.add('RC041-url_showing');
        document.querySelector('.RC041-shareBar').classList.add('RC041-url_show');
        events.send(settings.ID, 'Clicked', 'Clicked share by URL', { sendOnce: true });
      });

      // copy to clipboard when share url is open
      URLInput.querySelector('.RC041-copyButton').addEventListener('click', () => {
        const urlToCopy = document.querySelector('#RC041url_tocopy');
        urlToCopy.focus();
        urlToCopy.select();
        document.execCommand('copy');
      });

      document.querySelector('.RC041-exitshare').addEventListener('click', () => {
        document.querySelector('.RC041-urlOpen').classList.remove('RC041-url_showing');
        document.querySelector('.RC041-shareBar').classList.remove('RC041-url_show');
      });
    },
  },
};

export default Experiment;
