import { fullStory, events, getCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{NH039}} - {{NH005 Seating Plan Extension}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH039',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // if (!getCookie('NH039-show')) {
    //   return;
    // }
    // Setup
    events.setTrackerName('tracker2');
    const { settings, services, components } = Experiment;
    services.tracking();
    const busFront = document.querySelector('#seatPlanCont');
    const page = components.whichPage();
    /**
     * Itineraries page when NH013/20 are active
     */
    if (page === 'itineraries') {
      if (document.body.classList.contains('NH013') || document.body.classList.contains('NH020')) {
        document.body.classList.add(settings.ID);

        document.body.classList.add('NH-itin-active');
        document.body.classList.add('itineraries');
        poller([
          '#seatPlanCont',
        ], () => {
          const busFront = document.querySelector('#seatPlanCont');
          components.addDriver(busFront);
          components.addBackText(busFront);
        });
        events.send('NH039', 'Active', 'NH039 Bus changes are active', { sendOnce: true });
      } else if (!document.body.classList.contains('NH013') || !document.body.classList.contains('NH020')) {
        document.body.classList.add(settings.ID);

        document.body.classList.add('NH-itin-inactive');
        document.body.classList.add('itineraries');
        poller([
          '#seatPlanCont',
        ], () => {
          const busFront = document.querySelector('#seatPlanCont');
          components.addDriver(busFront);
          components.addBackText(busFront);
        });
        events.send('NH039', 'Active', 'NH039 Bus changes are active', { sendOnce: true });
      }

      window.jQuery(document).ajaxComplete(function(event, xhr, options) {
        // Fallback in case bus driver and back text don't exist
        if (options.url.match('GetSeatplan')) {
          const busFront = document.querySelector('#seatPlanCont');

          components.addDriver(busFront);
          components.addBackText(busFront);
        }
      }); 
    }
    /**
     * Search results page when NH14/19 are active
     */
    if (page.match(/search-results/)) {
      document.body.classList.add('quickview');
      //if (document.body.classList.contains('NH014') || document.body.classList.contains('NH019')) {
      poller([
        () => document.body.classList.contains('NH014') || document.body.classList.contains('NH019'),
      ], () => {
        const busComponent = document.querySelector('#divQuickviewPopup .seat-area');
        if (busComponent) {
          document.body.classList.add(settings.ID);

          const frontOfBus = busComponent.querySelector('.front');
          if (frontOfBus) {
            frontOfBus.insertAdjacentHTML('beforebegin', `
            <div class="NH039-driver">
            <img class="nh5-seating-wheel" width="31" height="44" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/f2783c1aa93fc001c781ed1a38abee77_seat-wheel-mobile.png">
            </div>
            `);
          }
        }
        events.send('NH039', 'Active', 'NH039 Bus changes are active', { sendOnce: true });
      });

      //} else if (!document.body.classList.contains('NH014') || !document.body.classList.contains('NH019')) {
        // ------------------------------------------------------
        // Removed by DD 2018-10-24
        // Don't run if NH014 is not running... 
        // Instead, above, poll for NH014 conditions
        // ------------------------------------------------------
        /*document.body.classList.add('NH-ative');
        events.send('NH039', 'Active', 'NH039 Bus changes are active', { sendOnce: true });
        const busComponent = document.querySelector('#divQuickviewPopup .seat-area');
        if (busComponent) {
          const frontOfBus = busComponent.querySelector('.front');
          if (frontOfBus) {
            frontOfBus.insertAdjacentHTML('beforebegin', `
            <div class="NH039-driver">
            <img class="nh5-seating-wheel" width="31" height="44" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/f2783c1aa93fc001c781ed1a38abee77_seat-wheel-mobile.png">
            </div>
            `);
          }
        }*/
      //}
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

  components: {
    whichPage() {
      return window.location.pathname.split('/')[1];
    },
    addDriver(ref) {
      const html = `
        <div class="NH039-driver">
          <span>FRONT</span>
          <img class="nh5-seating-wheel" width="31" height="44" src="//useruploads.visualwebsiteoptimizer.com/useruploads/317288/images/f2783c1aa93fc001c781ed1a38abee77_seat-wheel-mobile.png">
        </div>
      `;
      if (ref) {
        const existingDriver = document.querySelector('.NH039-driver');
        if(existingDriver) {
          existingDriver.remove();
        }

        ref.insertAdjacentHTML('afterbegin', html);
      }
    },
    addBackText(backRef) {
      if (backRef) {
        const html = `
          <div class="NH039-back NH039-driver">
            <span>BACK</span>
          </div>
        `;

        const existingText = document.querySelector('.NH039-back');
        if(existingText) {
          existingText.remove();
        }

        backRef.insertAdjacentHTML('beforeend', html);
      }
    },
  },
};

export default Experiment;
