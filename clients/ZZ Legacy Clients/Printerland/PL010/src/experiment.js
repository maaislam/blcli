import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import PL006 from './lib/PL006';

import quicklinks from './lib/quick-links';
import stickyNav from './lib/sticky-nav';

/**
 * {{PL010}} - {{PL006 Iteration}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL010',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    PL006.init();

    // Init quick links
    quicklinks();

    // --------------------------------------------------------------
    // Calculate point at which "footer" begins
    // --------------------------------------------------------------
    pollerLite([
      () => {
        const product = document.querySelector('.gallery_view > article');
        if (product && product.style && product.style.height) {
          return true;
        }

        return false;
      },
    ], () => {
      const contentDiv = document.querySelector('.content');
      const contentHeight = contentDiv.clientHeight;
      const contentTop = contentDiv.offsetTop;

      const footerOffset = contentHeight + contentTop;

      // --------------------------------------------------------------
      // Init sticky nav
      // --------------------------------------------------------------
      stickyNav(document.querySelector('.main_inner > .left.filter'), 'pl10-', footerOffset, () => {
        events.send(settings.ID, 'sticky-nav-did-stick', window.location.pathname, {
          sendOnce: true,
        });
      });
    });

    /**
     * @desc Sidebar Filter
     */
    components.changeSidebarFilter();

    /**
     * @desc VARIATION 2 Code
     */
    if (settings.VARIATION === '2') {
      const products = document.querySelectorAll('article.product');
      let count = 0;

      [].forEach.call(products, (product) => {
        count++; // eslint-disable-line no-plusplus
        if (count === 6) {
          // Appends New Filter Container after 6th Product
          const newFilter = document.querySelector('.printers.printer_finder');
          product.insertAdjacentElement('afterend', newFilter);
          // Show Filter
          document.querySelector('.printers.printer_finder').classList.add('show');
        } else if (count === 12) {
          // Appends New Message Container after 12th Product
          components.secondInterstilMessage(product);
        }
      });
    }

    // 'Show Results' CTA Button Event Listener
    if (document.querySelector('.printers.printer_finder a.button.filter_results')) {
      document.querySelector('.printers.printer_finder a.button.filter_results').addEventListener('click', () => {
        events.send(settings.ID, 'Clicked Printer Finder', `Variation ${settings.VARIATION} - Submit`, { sendOnce: true });
      });
    }

    /**
     * @desc GA Events - Quicklinks
     */
    const allQuickLinks = document.querySelectorAll('.PL010-quickLinksContainer .PL010-link');
    [].forEach.call(allQuickLinks, (link) => {
      link.addEventListener('click', () => {
        const quickLinkId = document.querySelector('.PL010-quickLinksContainer .PL010-link li').getAttribute('id');
        events.send(settings.ID, 'Clicked Quick Link', `Variation ${settings.VARIATION} - Clicked ${quickLinkId}`, { sendOnce: true });
      });
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
    /**
     * @desc Page Loader
     */
    pageLoader() {
      const loaderContent = `<div class='PL010-loader'><p class='PL010-loadingText'>Loading...</p></div>`;// eslint-disable-line quotes
      document.querySelector('div.form_master').insertAdjacentHTML('beforebegin', loaderContent);
      setTimeout(() => {
        document.querySelector('div.PL010-loader').classList.add('hidden');
      }, 4000);
    },
    /**
     * @desc Transforms element IDs to camelCase
     */
    /*eslint-disable */
    camelize: function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/(\s+|[!@#$%^&*])/g, '');
    /* eslint-enable */
    },
  },

  components: {
    /**
     * @desc Sidebar Filter
     */
    changeSidebarFilter() {
      const filterOptions = document.querySelectorAll('.filter-item');
      [].forEach.call(filterOptions, (option) => {
        if (option.querySelector('h5>a')) {
          // Filter - Hide Options
          option.querySelector('h5>a').classList.remove('opened');
          option.querySelector('ul').classList.remove('opened');

          // Event Listener For Loader
          const listInputs = option.querySelectorAll('li > input');
          [].forEach.call(listInputs, (input) => {
            input.addEventListener('click', () => {
              const loaderContent = `<div class='PL010-loader'><p class='PL010-loadingText'>Loading...</p></div>`;// eslint-disable-line quotes
              document.querySelector('div.form_master').insertAdjacentHTML('beforebegin', loaderContent);
            });
          });
        }
      });
    },
    /**
     * @desc Interstil #2 Message
     */
    secondInterstilMessage(product) {
      const newDiv = `<div class='PL010-interstilWrapper PL010-messageWrapper'>
        <div class='PL010-messageContainer'>
          <div class='message-header'><p>Need help in making the right decision for you or your business?</p></div>
          <div class='call-us'>
            <div><b>0800 840 1992</b></div>
            <div>Call us FREE Mon - Fri 8:30am - 6:00pm</div>
          </div>
          <div class='message-bottom'>We have 30+ printer experts waiting to talk right now who help over <b>300 customers EVERY DAY!</b></div>
        </div>
      </div>`;
      product.insertAdjacentHTML('afterend', newDiv);
    },
  },
};

export default Experiment;
