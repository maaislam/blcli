import { fullStory, events } from '../../../../lib/utils';
import RC017 from './lib/RC017';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC037',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    RC017();
    components.getCurrentPage();
    components.getStorageData();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Get the pages the user has previously been on
     */
    storeURLs: function storeURLs() {
      const URLvisited = window.location.pathname;
      const trainingData = (() => {
        const cached = window.sessionStorage.RC037;
        return cached ? JSON.parse(cached) : { site_Pages: [] };
      })();
      if (trainingData.site_Pages.indexOf(URLvisited) === -1) {
        trainingData.site_Pages.push(URLvisited);
        const stringifiedTrainingData = JSON.stringify(trainingData);
        window.sessionStorage.RC037 = stringifiedTrainingData;
      }
    },
    /**
     * @desc trigger lightbox
     */
    triggerLightbox: function triggerLightbox() {
      const { components } = Experiment;
      const overlay = document.querySelector('.rc17-lightbox-page-overlay');
      const courseFinderTrigger = document.querySelector('.RC037-show_course_finder');
      courseFinderTrigger.addEventListener('click', () => {
        events.send('RC037 - Not sure popup', 'Yes - Find my course click', 'Find my course clicked', { sendOnce: true });
        components.showCourseFinder();
        document.querySelector('.RC037-lightbox_intro').remove();
      });

      // close the lightbox
      const introClose = document.querySelector('.RC037-close_intro');
      introClose.addEventListener('click', () => {
        document.querySelector('.RC037-lightbox_intro').remove();
        overlay.classList.remove('rc17-lightbox-page-overlay--active');
        localStorage.setItem('RC037-Lightbox_closed', 1);
        events.send('RC037 - Not sure popup', 'No thanks', 'No thanks clicked on popup', { sendOnce: true });
      });
      overlay.addEventListener('click', () => {
        document.querySelector('.RC037-lightbox_intro').remove();
        overlay.classList.remove('rc17-lightbox-page-overlay--active');
        localStorage.setItem('RC037-Lightbox_closed', 1);
        events.send('RC037 - Not sure popup', 'Lightbox close', 'Click outside box to close', { sendOnce: true });
      });
      const introExit = document.querySelector('.RC037-lightbox_close');
      introExit.addEventListener('click', () => {
        document.querySelector('.RC037-lightbox_intro').remove();
        overlay.classList.remove('rc17-lightbox-page-overlay--active');
        localStorage.setItem('RC037-Lightbox_closed', 1);
        events.send('RC037 - Not sure popup', 'Lightbox closed on first screen', 'closed popup', { sendOnce: true });
      });
      components.stopLightboxOncoursesearch();
    },
  },

  components: {
    /**
     * @desc function to run based on what page user is on
     */
    getCurrentPage: function getCurrentPage() {
      const { services } = Experiment;
      const URL = window.location.pathname;
      const matchingURLs = ['/', 'PurchaseSuccess', 'work', 'appointed', 'paediatric', 'emergency', 'public', 'baby', 'adult', '&type=Workplace', '&type=Public'];
      for (let i = 0; i < matchingURLs.length; i += 1) {
        const element = matchingURLs[i];
        if (URL.indexOf(element) > -1) {
          services.storeURLs();
        }
      }
    },
    /**
     * @desc function to run based on what page user is on
     */
    getStorageData: function getStorageData() {
      const { components } = Experiment;
      if (!localStorage.getItem('RC037-Lightbox_closed')) {
        if (!sessionStorage.getItem('RC037-no_lightbox')) {
          if (window.sessionStorage.RC037) {
            const storedURLS = JSON.parse(window.sessionStorage.RC037);
            const URLarray = storedURLS.site_Pages;
            const concatenatedURL = URLarray.join('');

            if (concatenatedURL.match(/.*(work|appointed|emergency|paediatric).*/g) && concatenatedURL.match(/.*(public|baby|adult).*/g)) {
              setTimeout(() => {
                components.showLightbox();
              }, 5000);
            }
            if (concatenatedURL.match(/.*(&type=workplace).*/gi) && concatenatedURL.match(/.*(&type=public).*/gi)) {
              setTimeout(() => {
                components.showLightbox();
              }, 5000);
            }
            if (concatenatedURL.match(/.*([A-z]).*/gi) && window.location.href === 'https://www.redcrossfirstaidtraining.co.uk/') {
              setTimeout(() => {
                components.showLightbox();
              }, 5000);
            }
            if (concatenatedURL.match(/.*(PurchaseSuccess).*/gi)) {
              sessionStorage.setItem('RC037-no_lightbox', 1);
            }
          }
        }
      }
    },
    /**
     * @desc create new lightbox screen that will show
     */
    stopLightboxOncoursesearch: function stopLightboxOncoursesearch() {
      const searchCourses = document.querySelector('.RC037-show_course_finder');
      searchCourses.addEventListener('click', () => {
        sessionStorage.setItem('RC037-no_lightbox', 1);
      });
    },
    /**
     * @desc create new lightbox screen that will show
     */
    showLightbox: function showLightbox() {
      const { services } = Experiment;
      // show the overlay
      const overlay = document.querySelector('.rc17-lightbox-page-overlay');
      overlay.classList.add('rc17-lightbox-page-overlay--active');
      // build the new lightbox
      const lightboxStartingScreen = document.createElement('div');
      lightboxStartingScreen.classList.add('RC037-lightbox_intro');
      lightboxStartingScreen.innerHTML = `
      <div class="RC037-lightbox_close">&times;</div>
      <div class="RC037-lightbox__sidebar">
        <h2 class="RC037-lightbox__title">
          <img src="//www.redcrossfirstaidtraining.co.uk/images/svg/logo-redcross.svg">
        </h2>
        <p class="RC037-lightbox__instructions">
            Learn first aid skills you can confidently use in an emergency situation, either at work or in your day-to-day life
        </p>
      </div>
      <div class="RC037-lightbox__main">
        <h3>Need help choosing a course?</h3>
        <p>Not sure which first aid course is right for you? Answer a few simple questions and we’ll match you with a course.</p>
        <div class="RC037-options">
          <div class="RC037-show_course_finder">Yes - Find my course</div>
          <div class="RC037-close_intro">No thanks, I'm fine</div>
        </div>
      </div>`;
      document.body.appendChild(lightboxStartingScreen);

      services.triggerLightbox();
    },
    /**
     * @desc show the original course finder
     */
    showCourseFinder: function showCourseFinder() {
      // create new lightbox screen, then click the orginal one
      const courseFinder = document.querySelector('.rc17-lightbox-init.rc17-lightbox-init--active');
      courseFinder.click();
    },
  },
};

export default Experiment;
