import { fullStory, events } from '../../../../lib/utils';
import { sidebarInner } from './lib/RC036-sidebar';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC036',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.newSideBar();
    components.moveMoreNews();
    services.sendEvents();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Events to track
     */
    sendEvents: function sendEvents() {
      const signIn = document.querySelector('.RC036-safeHands a');
      signIn.addEventListener('click', () => {
        events.send('RC036', 'button click', 'Sign in to safe hands click', { sendOnce: true });
      });

      const getApp = document.querySelector('.RC036-blockLink a');
      getApp.addEventListener('click', () => {
        events.send('RC036', 'button click', 'Get Free App click', { sendOnce: true });
      });

      const learnMore = document.querySelector('.RC036-blockLink:last-of-type a');
      learnMore.addEventListener('click', () => {
        events.send('RC036', 'button click', 'Learn more click', { sendOnce: true });
      });
    },
  },

  components: {
    /**
     * @desc Create the new sidebar
     */
    newSideBar: function newSideBar() {
      const currentSideBar = document.querySelector('.sidebar-last');
      const sideBar = document.createElement('div');
      sideBar.classList.add('RC036-sidebar_inner');
      sideBar.innerHTML = sidebarInner;

      currentSideBar.appendChild(sideBar);
    },
    /**
    * @desc CTA for safe hands
    */
    moveMoreNews: function moveMoreNews() {
      const moreNews = document.querySelector('.sidebar-first');
      const newSideBarNews = document.querySelector('.RC036-latestNews');
      newSideBarNews.appendChild(moreNews);
    },
  },
};

export default Experiment;
