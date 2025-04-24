import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import setup from './setup';
import flickerPrevention from './flickerPrevention';

// Flicker prevention
flickerPrevention();

/**
 * PU018 - Select Time Loader
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PU018-Desktop',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    const experiment = setup(settings.ID);
    services.tracking();

    poller(['body'], () => {
      document.body.classList.add(settings.ID);
    }, {
      multiplier: 0,
      wait: 30,
    });

    experiment.pollers.push(poller([
      '#appLoading',
    ], () => {
      const loader = document.querySelector('#appLoading');
      if (loader.style.display !== 'none') {
        components.Loader.init();
      }
    }));
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    Loader: {
      /**
       * @returns {string} Returns a review at random
       */
      getRandomReview: function getRandomReview() {
        const reviews = [
          'Excellent service. So glad I tried it. It was on a Saturday and severe snow conditions. I thought I\'d try this as I wouldn\'t be able to get to the drs until Monday morning. I had a video appointment and a prescription sent to the nearest pharmacy. By 11am I\'d started the course of antibiotics.',
          'Brilliant. Brilliant. Brilliant. Couldn\'t recommend more. Was away from home and needed an urgent prognoses. 30 minutes later, prescription at a local chemist ready and waiting. Amazing. Thank you',
          'Face to face consultation with very understanding and supportive doctor within 15 minutes; prescription ready for collection at nearest pharmacy, 10 minutes after appointment finished.',
          'Could not get an appointment with my own surgery,so thought i would give push doctor a go,within 90 minutes i had seen the doctor and picked up my medication cannot fault the service i was given.',
        ];

        return reviews[Math.floor(Math.random() * reviews.length)];
      },

      /**
       * @param {number} variation Variation number
       */
      getVariationMarkup: function getVariationMarkup(variation) {
        let markup;

        switch (variation.toString()) {
          case '1':
            markup = `
              <div class="PU018_section">
                <div class="PU018_section__inner">
                  <div class="PU018__heading">
                    <div class="PU018_fading-circle">
                      <div class="PU018_circle1 PU018_circle"></div>
                      <div class="PU018_circle2 PU018_circle"></div>
                      <div class="PU018_circle3 PU018_circle"></div>
                      <div class="PU018_circle4 PU018_circle"></div>
                      <div class="PU018_circle5 PU018_circle"></div>
                      <div class="PU018_circle6 PU018_circle"></div>
                      <div class="PU018_circle7 PU018_circle"></div>
                      <div class="PU018_circle8 PU018_circle"></div>
                      <div class="PU018_circle9 PU018_circle"></div>
                      <div class="PU018_circle10 PU018_circle"></div>
                      <div class="PU018_circle11 PU018_circle"></div>
                      <div class="PU018_circle12 PU018_circle"></div>
                    </div>
                    <h3>Searching for available appointments...</h3>
                  </div>
                  <div class="PU018_centre">
                    <p>Push Doctor is a leading UK digital health service - here’s why:</p>
                    <ul>
                      <li>Same-day prescriptions delivered to a local pharmacy</li>
                      <li>Don’t waste time in waiting rooms, we’ll see you in minutes</li>
                      <li>Our GPs are UK-based and NHS-trained</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="PU018_section PU018_section--grey">
                <div class="PU018_section__inner">
                  <div>
                    <h4>Verified TrustPilot reviews</h4>
                  </div>
                  <div class="PU018_review">
                    <span class="PU018_reviewLogo">
                      <span class="PU018_reviewLogo__rating"></span>
                      <span class="PU018_reviewLogo__service"></span>
                    </span>
                    <p>${this.getRandomReview()}</p>
                  </div>
                </div>
              </div>
            `;
            break;

          case '2':
            markup = `
              <div class="PU018_section">
               <div class="PU018_section__inner">
                  <div class="PU018__heading">
                    <div class="PU018_fading-circle">
                      <div class="PU018_circle1 PU018_circle"></div>
                      <div class="PU018_circle2 PU018_circle"></div>
                      <div class="PU018_circle3 PU018_circle"></div>
                      <div class="PU018_circle4 PU018_circle"></div>
                      <div class="PU018_circle5 PU018_circle"></div>
                      <div class="PU018_circle6 PU018_circle"></div>
                      <div class="PU018_circle7 PU018_circle"></div>
                      <div class="PU018_circle8 PU018_circle"></div>
                      <div class="PU018_circle9 PU018_circle"></div>
                      <div class="PU018_circle10 PU018_circle"></div>
                      <div class="PU018_circle11 PU018_circle"></div>
                      <div class="PU018_circle12 PU018_circle"></div>
                    </div>
                    <h3>Searching for available appointments...</h3>
                  </div>
                  <div class="PU018_centre">
                    <p>Push Doctor is a leading UK digital health service - here’s why:</p>
                    <ul>
                      <li>Same-day prescriptions delivered to a local pharmacy</li>
                      <li>Don’t waste time in waiting rooms, we’ll see you in minutes</li>
                      <li>Our GPs are UK-based and NHS-trained</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="PU018_section PU018_section--grey PU018_section--doctor">
                <div class="PU018_section__inner">
                  <div class="PU018_doctorBio">
                    <div>
                      <h4>Meet Our Doctors</h4>
                    </div>
                    <p class="PU018_doctorBio__name">Dr Sarah Marshall</p>
                    <p class="PU018_doctorBio__desc">Known as 'Dr Sarah' or simply 'Sarah' to her patients, Dr Marshall has been operating as a GP within NHS and private surgeries for more than two decades.</p>
                  </div>
                  <div class="PU018_doctorImage">
                    <img src="https://ab-test-sandbox.userconversion.com/experiments/PU018-Desktop-doctor.png" />
                  </div>
                </div>
              </div>
            `;
            break;

          case '3':
            markup = `
              <div class="PU018_section">
                <div class="PU018_section__inner">
                  <div class="PU018__heading">
                    <div class="PU018_fading-circle">
                      <div class="PU018_circle1 PU018_circle"></div>
                      <div class="PU018_circle2 PU018_circle"></div>
                      <div class="PU018_circle3 PU018_circle"></div>
                      <div class="PU018_circle4 PU018_circle"></div>
                      <div class="PU018_circle5 PU018_circle"></div>
                      <div class="PU018_circle6 PU018_circle"></div>
                      <div class="PU018_circle7 PU018_circle"></div>
                      <div class="PU018_circle8 PU018_circle"></div>
                      <div class="PU018_circle9 PU018_circle"></div>
                      <div class="PU018_circle10 PU018_circle"></div>
                      <div class="PU018_circle11 PU018_circle"></div>
                      <div class="PU018_circle12 PU018_circle"></div>
                    </div>
                    <h3>Searching for available appointments...</h3>
                  </div>
                  <div class="PU018_centre">
                    <p>Push Doctor is a leading UK digital health service - here’s why:</p>
                    <ul>
                      <li>Same-day prescriptions delivered to a local pharmacy</li>
                      <li>Don’t waste time in waiting rooms, we’ll see you in minutes</li>
                      <li>Our GPs are UK-based and NHS-trained</li>
                    </ul>
                  </div>
                </div>
              </div>
            `;
            break;

          default:
            markup = '';
            break;
        }

        return markup;
      },

      /**
       * @desc Hide loader if original loader has ended OR 3 seconds has passed
       */
      waitForLoadEnd: function waitForLoadEnd() {
        const loader = document.querySelector('#appLoading');
        if (loader && loader.style.display === 'none') {
          document.querySelector('.PU018_Loader').style.display = 'none';
          document.body.classList.remove('PU018_noScroll');
          document.documentElement.classList.remove('PU018_noScroll');
        } else {
          setTimeout(Experiment.components.Loader.waitForLoadEnd, 750);
        }
      },

      /**
       * @returns {HTMLElement} Component
       */
      create: function create() {
        const el = document.createElement('div');
        el.classList.add('PU018_Loader');

        const overlay = document.createElement('div');
        overlay.classList.add('PU018_Loader__overlay');

        const lightbox = document.createElement('div');
        lightbox.classList.add('PU018_Loader__lightbox');

        const lightboxContent = document.createElement('div');
        lightboxContent.classList.add('PU018_Loader__lightboxContent');
        lightboxContent.innerHTML = this.getVariationMarkup(Experiment.settings.VARIATION);

        lightbox.appendChild(lightboxContent);
        el.appendChild(overlay);
        el.appendChild(lightbox);

        return el;
      },

      /**
       * @param {HTMLElement} component Instance of the component
       */
      render: function render(component) {
        poller(['body'], () => {
          events.send(
            Experiment.settings.ID,
            'View',
            `Loader shown - Variation ${Experiment.settings.VARIATION}`,
          );
          document.body.appendChild(component);
          document.body.classList.add('PU018_noScroll');
          document.documentElement.classList.add('PU018_noScroll');
          setTimeout(Experiment.components.Loader.waitForLoadEnd, 5000);
        }, {
          multiplier: 0,
          wait: 30,
        });
      },

      init: function init() {
        // Remove old loader
        const existingLoader = document.querySelector('.PU018_Loader');
        if (existingLoader) {
          existingLoader.parentElement.removeChild(existingLoader);
        }
        const component = this.create();
        this.render(component);
      },
    },
  },
};

export default Experiment;
