import { fullStory, events } from '../../../../lib/utils';

/**
 * FL001 - Size Guide Prominence
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL001',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    document.body.classList.add(settings.ID);
    events.analyticsReference = '_gaUAT';
    events.send('FL001', 'View', 'FL001 Variation 1 ran', { sendOnce: true });

    // Services
    const elements = services.cacheDOM();
    services.tracking();

    // Render size guide buttons for mobile and desktop
    const { addToBag, ctas } = elements;

    // Mobile
    (() => {
      const mobileSizeGuideBtn = components.sizeGuideBtn.init();
      mobileSizeGuideBtn.classList.add('FL001_sizeGuideBtn--mobile');
      addToBag.parentNode.insertBefore(mobileSizeGuideBtn, addToBag.nextSibling);
    })();

    // Desktop
    (() => {
      const desktopSizeGuideBtn = components.sizeGuideBtn.init();
      desktopSizeGuideBtn.classList.add('FL001_sizeGuideBtn--desktop');
      ctas.parentNode.insertBefore(desktopSizeGuideBtn, ctas.nextSibling);
    })();
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
     * @description Cache all used elements in Experiment.cache.elements
     * @returns {object} All cached elements
     */
    cacheDOM() {
      const { elements } = Experiment.cache;
      elements.addToBag = document.querySelector('.addToBasketContainer');
      elements.ctas = document.querySelector('.BasketWishContainer');
      return elements;
    },
  },

  components: {
    sizeGuideBtn: {
      create() {
        const element = document.createElement('div');
        const link = document.createElement('a');
        element.classList.add('FL001_sizeGuideBtn');
        // eslint-disable-next-line no-script-url
        link.href = 'javascript:void(0)';
        link.innerHTML = '<span>Size guide</span><span class="SizeGuideIco"></span>';
        element.appendChild(link);
        return element;
      },

      bindEvents(component) {
        component.addEventListener('click', (e) => {
          e.preventDefault();
          if (!document.body.classList.contains('FL002')) {
            const { sdPage } = window;
            sdPage.view.changePopupOrientation(sdPage.view.popupModal.popupSizes);
            sdPage.view.openPopUpModal([], 'https://www.flannels.com/Popup_SizeGuide', true);
            events.send('FL001', 'Click', 'Clicked Size Guide', { sendOnce: true });
          }
        });
      },

      init() {
        const component = this.create();
        this.bindEvents(component);
        return component;
      },
    },
  },

  cache: {
    elements: {},
  },
};

export default Experiment;
