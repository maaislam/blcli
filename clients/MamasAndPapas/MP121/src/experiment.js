import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{MP121}} - {{Pushchairs More Info Link}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP121',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (window.location.pathname !== '/en-gb/pushchairs-prams') {
      const ctaBtn = `<div class='MP121-messageWrapper'>
        <div class='MP121-container'>
          <a href='/pushchairs-prams' class='MP121-message'>
            <p>Need help deciding? Compare our range of pushchairs<span id='MP121-arrowLink'></span></p>
          </a>
        </div>
      </div>`;
      const rightSection = document.querySelector('.js-detailPane .productDetail.py-4');
      rightSection.insertAdjacentHTML('beforeend', ctaBtn);

      /*eslint-disable */
      viewabilityTracker(document.querySelector('.MP121-messageWrapper .MP121-container'), () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `CTA Viewed`, { sendOnce: true }); // eslint-disable-line quotes
      }, {removeOnView: true});
      /* eslint-enable */

      sessionStorage.setItem('MP121-Viewed', 1);

      document.querySelector('a.MP121-message').addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `CTA Clicked`, { sendOnce: true }); // eslint-disable-line quotes
      });
    } else {
      // 'More Details' open by default
      pollerLite(['.cd-products-comparison-table', 'button#btn-toggle.closed'], () => {
        if (sessionStorage.getItem('MP121-Viewed') === '1') {
          const toggleButton = document.querySelector('button#btn-toggle');
          setTimeout(() => {
            toggleButton.click();
            const details = document.querySelector('.cd-products-table');
            details.scrollIntoView(false);
            sessionStorage.removeItem('MP121-Viewed');
          }, 2000);
        }
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
