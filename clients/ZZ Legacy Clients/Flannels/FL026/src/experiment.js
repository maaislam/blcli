import { fullStory, events } from '../../../../lib/utils';
// import config from './lib/config';
import FL002 from './lib/FL002';
// import { poller, pollerLite } from '../../../../lib/uc-lib';
/**
 * {{FL026}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL026',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;

    // Services
    events.analyticsReference = '_gaUAT';
    if (settings.VARIATION === '1') {
      services.tracking();

      // Add Body Class for styles
      document.body.classList.add(settings.ID);

      
      // Is desktop or not?
      const data = services.getPageData(); // Data object

      if (data.isMobile === 'False') {
        // Initialise FL002
        FL002();
        /**
         * Need to alter FL002 to show all rows on desktop, e.g. British, Roman etc.
         */
        // components.showAllRows();
        setTimeout(() => {
          components.showAllRows();
          components.removeToggle();
          components.joinTables();
          components.addIntro();
        }, 1000);
      } else {
        // Is mobile
        setTimeout(() => {
          components.colspanCover();
          components.moveToggle();
          const currentGender = services.isWomens();
          if (currentGender === 'Women') {
            const countryConverter = document.querySelector('.FL002_CountryConverter');
            if (countryConverter) {
              countryConverter.classList.add('FL026-show-two');
            }
          }
        }, 1000);
      }

      services.eventTracking();
    }
    if (settings.VARIATION === '2') {
      events.send(settings.ID, 'Active', 'Control is active', { sendOnce: true });

      // Tracking for ATB and on click of size guide.
      const atbBtn = document.querySelector('.addToBasketContainer a.addToBag');
      const sizeGuideBtn = document.querySelector('.FL001_sizeGuideBtn.FL001_sizeGuideBtn--desktop');

      if (atbBtn) {
        atbBtn.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Control Add To Bag Button clicked');
        });
      }
      if (sizeGuideBtn) {
        sizeGuideBtn.addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Control Size Guide Clicked');
        });
      }
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
    /**
     * @desc Gets FLAN_onLoad object that is pushed to the datalayer on page load
     * @returns {object} Returns data object pushed to data layer
     */
    getPageData() {
      let dataObject;
      for (let i = 0; i < window.dataLayer.length; i += 1) {
        const data = window.dataLayer[i];
        if (typeof data === 'object' && data.event && data.event === 'FLAN_onLoad') {
          dataObject = data;
          break;
        }
      }
      return dataObject;
    },
    /**
     * FL026 Tracking
     */
    eventTracking() {
      const desktopSizeBtn = document.querySelector('.FL026 .productVariantContainer .FL001_sizeGuideBtn.FL001_sizeGuideBtn--desktop');
      if (desktopSizeBtn) {
        desktopSizeBtn.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'User clicked the size guide link', { sendOnce: true });
          events.send(Experiment.settings.ID, 'Viewed', 'User saw the size guide on desktop', { sendOnce: true });
        });
      }
      const mobileSizeBtn = document.querySelector('.FL026 .productVariantContainer .FL001_sizeGuideBtn.FL001_sizeGuideBtn--mobile');
      if (mobileSizeBtn) {
        mobileSizeBtn.addEventListener('click', () => {
          events.send(Experiment.settings.ID, 'Clicked', 'User clicked the size guide link', { sendOnce: true });
          events.send(Experiment.settings.ID, 'Viewed', 'User saw the size guide on mobile', { sendOnce: true });
        });
      }
    },
    isWomens() {
      return window.dataLayer ? window.dataLayer[1].productGender : null;
    },
  },

  components: {
    showAllRows() {
      const tableRows = document.querySelectorAll('.FL002_MetricConverter__conversion');
      if (tableRows) {
        for (let i = 0; tableRows.length > i; i += 1) {
          tableRows[i].style.display = 'table-row';
        }
      }
    },
    removeToggle() {
      const toggle = document.querySelector('.FL002_SizeGuide .FL002_switch');
      const toggleInfo = document.querySelector('.FL002_SizeGuide .FL002_scrollTip');
      if (toggle && toggleInfo) {
        toggleInfo.classList.add('FL026-no-display');
        toggle.classList.add('FL026-no-display');
      }
    },
    joinTables() {
      const tableOne = document.querySelector('.FL002_SizeGuide .FL002_MetricConverter');
      const tableTwo = document.querySelector('.FL002_SizeGuide .FL002_CountryConverter .FL002_CountryConverter__table');
      if (tableOne && tableTwo) {
        // tableOne.insertAdjacentElement('afterend', tableTwo);
      }
    },
    addIntro() {
      const tableBody = document.querySelector('.FL002_SizeGuide .FL002_SizeGuide__body');
      if (tableBody) {
        tableBody.insertAdjacentHTML('afterbegin', `
          <div class="FL026-intro">
          <p>Below is our sizing guide to help you select the correct items. Inevitably there is some variance in the sizing standards used by manufacturers. Please refer to the bulleted description within each product for further detail on each product and sizing and country of origin.</p>
          </div>
        `);
      }
    },
    /**
     * On Mobile adjust the height of the left hand sized TD's to cover
     * multiple sizes.
     */
    colspanCover() {
      const tableDataCells = document.querySelectorAll('.FL002_MetricConverter__table .FL002_MetricConverter__values td');
      for (let i = 0; tableDataCells.length > i; i += 1) {
        if (tableDataCells[i].getAttribute('colspan')) {

          const colspanNumber = tableDataCells[i].getAttribute('colspan');
          const heightToAdd = 40 * colspanNumber;
          const paddingToAdd = (heightToAdd / 2) - 10;
          // set new height of TD
          tableDataCells[i].style.height = `${heightToAdd}px`;
          // Set padding top to half of new height
          tableDataCells[i].style.paddingTop = `${paddingToAdd}px`;
        }
      }
    },
    /**
     * Move the toggle on mobile.
     */
    moveToggle() {
      const toggleEl = document.querySelector('.FL002_SizeGuide__body .FL002_MetricConverter .FL002_switch');
      const ref = document.querySelector('.FL002_SizeGuide__body .FL002_heading--type2');
      if (toggleEl && ref) {
        ref.insertAdjacentElement('afterend', toggleEl);
      }
    },
    /**
     * Amend to add opacity background to prevent clicks
     */
    // addOpacityWrap() {
    //   const addedPopup = document.querySelector('.FL002_SizeGuide');
    //   if (addedPopup) {
    //     const wrapper = document.createElement('div');
        
    //   }
    // },
  },
};

export default Experiment;
