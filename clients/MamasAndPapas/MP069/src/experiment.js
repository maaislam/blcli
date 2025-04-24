import { fullStory, events } from '../../../../lib/utils';

/**
 * MP069
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP069',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const relatedItems = document.querySelector('.relatedItems');
    const relatedItemsHeader = relatedItems.previousElementSibling;
    const productRecs = document.querySelector('.MP049_product-recs-row');

    // Move both sliders beside each other
    productRecs.parentElement.insertBefore(productRecs, relatedItems);

    // Wrap related items contents in a single element
    const wrap = document.createElement('div');
    wrap.classList.add('MP069_relatedItemsWrap');
    relatedItems.parentElement.insertBefore(wrap, relatedItems);
    wrap.appendChild(relatedItemsHeader);
    wrap.appendChild(relatedItems);

    // Create tabs
    const tabs = document.createElement('div');
    const sliders = [wrap, productRecs];
    tabs.classList.add('MP069_tabs');
    tabs.innerHTML = `
      <div class="MP069_tab${settings.VARIATION === '1' ? ' MP069_tab--active' : ''}" data-slider="MP069_relatedItemsWrap">Related Items</div>
      <div class="MP069_tab${settings.VARIATION === '2' ? ' MP069_tab--active' : ''}" data-slider="MP049_product-recs-row">Other Customers Also Bought</div>
    `;

    const hideSliders = () => {
      sliders.forEach((item) => {
        if (!item.style.display !== 'none') {
          item.style.display = 'none'; // eslint-disable-line no-param-reassign
        }
      });
    };

    // Click events
    [...tabs.querySelectorAll('.MP069_tab')].forEach((el) => {
      const sliderName = el.getAttribute('data-slider');
      const sliderEl = document.querySelector(`.${sliderName}`);
      const descriptiveSliderName = (() => {
        let toReturn;
        switch (sliderName) {
          case 'MP069_relatedItemsWrap':
            toReturn = 'Related Items';
            break;

          case 'MP049_product-recs-row':
            toReturn = 'Product Recommendations';
            break;

          default:
            break;
        }
        return toReturn;
      })();

      el.addEventListener('click', () => {
        hideSliders();

        // Change active classes
        const activeTab = tabs.querySelector('.MP069_tab--active');
        if (activeTab) activeTab.classList.remove('MP069_tab--active');
        el.classList.add('MP069_tab--active');

        // Show chosen slider
        sliderEl.style.display = 'block';

        /* Refresh Slick slider (issue that breaks the inactive slider
          when you resize the window) */
        const slick = sliderEl.querySelector('.slick-initialized');
        slick.slick.refresh();

        // Send GA event
        events.send(settings.ID, 'Click', `User clicked ${descriptiveSliderName} on variation ${settings.VARIATION}`, {
          sendOnce: true,
        });
      });
    });

    // Render tabs
    productRecs.parentElement.insertBefore(tabs, productRecs);

    // Initial setup (show related items slider, hide recommended products)
    hideSliders();
    if (settings.VARIATION === '1') {
      wrap.style.display = 'block';
    } else {
      productRecs.style.display = 'block';
    }
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
};

export default Experiment;
