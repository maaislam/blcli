import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP092',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.addLogo();
    pollerLite(['.MP092-logo'], () => {
      components.showHideLogo();
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
    addLogo: () => {
      const tooltipText = '<li>Our products come with a 2 year Manufacturing Guarantee, for added reassurance.</li><li>Our products are tested in our UK accredited Lab so you can buy with confidence.</li>';
      const officialProductBox = document.createElement('div');
      officialProductBox.classList.add('MP092-official');
      officialProductBox.innerHTML = `
      <div class="MP092-logo">
        <span class="MP092-image"></span>
        <p><span class="MP092-long_text">Official</span> Product <span class="MP092-info"></span></p>
      </div>
      <div class="MP092-tooltip">
      <div class="MP092-close">&times;</div>
      ${tooltipText}
      </div>`;

      const productImage = document.querySelector('.js-galleryPane');
      // productImage.insertBefore(officialProductBox, productImage.firstChild);
      if (window.innerWidth < 992) {
        productImage.insertAdjacentElement('beforebegin', officialProductBox);
      } else {
        productImage.insertBefore(officialProductBox, productImage.firstChild);
      }
    },
    showHideLogo: () => {
      const { settings } = Experiment;
      const logoText = document.querySelector('.MP092-logo');
      const tooltip = document.querySelector('.MP092-tooltip');

      if (window.innerWidth < 992) {
        logoText.addEventListener('click', () => {
          if (tooltip.classList.contains('MP092-tooltip_show')) {
            tooltip.classList.remove('MP092-tooltip_show');
          } else {
            tooltip.classList.add('MP092-tooltip_show');
            events.send(settings.ID, 'Click', 'Tooltip shown mobile', { sendOnce: true });
          }
        });
      } else {
        logoText.addEventListener('mouseenter', () => {
          tooltip.classList.add('MP092-tooltip_show');
          events.send(settings.ID, 'Click', 'Tooltip shown desktop', { sendOnce: true });
        });
        logoText.addEventListener('mouseleave', () => {
          tooltip.classList.remove('MP092-tooltip_show');
        });
      }

      document.querySelector('.MP092-close').addEventListener('click', () => {
        tooltip.classList.remove('MP092-tooltip_show');
      });
    },
  },
};

export default Experiment;
