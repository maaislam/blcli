import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP118',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, buildLogo } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const header = document.querySelector('#js-header');
    if(header.classList.contains('header_sticky')) {
      Experiment.sendStickyEvent();
    } else {
      observer.connect([ header ], () => {
        if(header.classList.contains('header_sticky')) {
          Experiment.sendStickyEvent();
        }
      }, {
          childList: false,
          attributes: true
      });
    }
  },

  sendStickyEvent() {
    events.send(Experiment.settings.ID, 'MP118', 'sticky-nav-saw', {
      sendOnce: true
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
