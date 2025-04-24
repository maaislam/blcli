import { fullStory, events } from '../../../../lib/utils';
import { pollerLite, observer } from '../../../../lib/uc-lib';

/**
 * {{ME164}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME164',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.openLightbox();
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
     * Returns brand name.
     */
    getBrand() {
      const meta = document.querySelector("meta[property='og:brand']");
      if (meta) {
        return meta.getAttribute('content');
      }
    },
    /**
     * Event listener for the lightbox which on click will run the following;
     * lightboxEvents()
     * controlMessages()
     * closeLightbox()
     * swipeControl()
     */
    openLightbox() {
      const lightbox = document.querySelector('.images .product-image');
      if (lightbox) {
        lightbox.addEventListener('click', (e) => {
          if (!e.target.classList.contains('mfp-arrow-right') || !e.target.classList.contains('mfp-arrow-left')) {
            // add no scroll class to the body.
            document.body.classList.add('ME164-disable-scroll');
          }
          // Send event
          events.send(Experiment.settings.ID, 'Clicked', 'User opened the lightbox', { sendOnce: true });
          pollerLite(['.mfp-wrap.mfp-gallery .mfp-container'], () => {
            Experiment.components.lightboxEvents();
            Experiment.components.controlMessages();
            Experiment.components.closeLightbox();
            // Experiment.components.swipeControl();
          });
        });
      }
    },
    closeLightbox() {
      const openLightbox = document.querySelector('.mfp-wrap');
      if (openLightbox) {
        openLightbox.addEventListener('click', () => {
          document.body.classList.remove('ME164-disable-scroll');
        });
      }
    },
    lightboxEvents() {
      const messageList = (brand) => {
        return `
          <div class="ME164-messages">
            <ul class="clear">
              <li class="ME164-first"><p>Officially licensed merch for the biggest ${brand} fans</p></li>
              <li><p>Limited stock. When they're all gone, they're gone.</p></li>
              <li><p>Get ready to hear 'where did you get that!?'</p></li>
              <li><p>Premium quality approved by ${brand}'s creators</p></li>
              <li class="ME164-last"><p>Show you're the biggest ${brand} fan around</p></li>
            </ul>
          </div>
        `;
      };
      const addMessages = (htmlToAdd) => {
        const ref = document.querySelector('.mfp-wrap.mfp-gallery .mfp-container');
        if (ref) {
          ref.insertAdjacentHTML('beforeend', htmlToAdd);
        }
      };
      const brand = Experiment.components.getBrand();
      const html = messageList(brand);
      addMessages(html);
    },
    controlMessages() {
      const messageSlider = document.querySelector('.ME164-messages ul');
      const lightbox = document.querySelector('.mfp-wrap .mfp-container');
      
      /**
       * Helper functions
       */
      const messageWidth = () => {
        const item = messageSlider.querySelector('li');
        const width = item.offsetWidth;
        return width;
      };
      const width = messageWidth();
      /**
       * Move slider forward
       */
      const moveForward = () => {
        // Slide the UL container left XX amount of pixels
        const forwardWidth = `-${width}px`;
        messageSlider.style.left = forwardWidth;
        // Move the first slide to the end of the list
        const firstSlide = messageSlider.querySelector('li');
        messageSlider.insertAdjacentElement('beforeend', firstSlide);
        // Reset slider UL container
        messageSlider.style.left = '';
      };
      /**
       * Move slider backwards
       */
      const moveBackward = () => {
        const backWidth = `${width}px`;
        messageSlider.style.left = backWidth;
        // Move the last slide to the begining of the list.
        const lastSlide = messageSlider.querySelector('li:last-of-type');
        messageSlider.insertAdjacentElement('afterbegin', lastSlide);
        // Reset slider UL container
        messageSlider.style.left = '';
      };

      // Attach event listener to container for click events
      if (lightbox) {
        lightbox.addEventListener('click', (e) => {
          // Prev button
          if (e.target.classList.contains('mfp-arrow-left')) {

            moveBackward();
          }
          if (e.target.classList.contains('mfp-arrow-right')) {
            moveForward();
          }
        });
      }
    },
    // swipeControl() {
    //   let touchstartX = 0;
    //   let touchstartY = 0;
    //   let touchendX = 0;
    //   let touchendY = 0;

    //   const gesuredZone = document.querySelector('.mfp-wrap.mfp-gallery .mfp-content .mfp-img');
    //   console.log(gesuredZone);

    //   gesuredZone.addEventListener('touchstart', (event) => {
    //       touchstartX = event.screenX;
    //       touchstartY = event.screenY;
    //   }, false);

    //   gesuredZone.addEventListener('touchend', (event) => {
    //       touchendX = event.screenX;
    //       touchendY = event.screenY;
    //       handleGesure();
    //   }, false);

    //   function handleGesure() {
    //     const swiped = 'swiped: ';
    //     if (touchendX < touchstartX) {
    //         alert(swiped + 'left!');
    //     }
    //     if (touchendX > touchstartX) {
    //         alert(swiped + 'right!');
    //     }
    //     if (touchendY < touchstartY) {
    //         alert(swiped + 'down!');
    //     }
    //     if (touchendY > touchstartY) {
    //         alert(swiped + 'left!');
    //     }
    //     if (touchendY == touchstartY) {
    //         alert('tap!');
    //     }
    //   }
    // },
  },
};

export default Experiment;
