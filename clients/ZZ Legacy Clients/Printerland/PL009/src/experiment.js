import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PL009}} - {{Quick Links (PL001 Iteration)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL009',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    if (document.querySelector('#topNav')) {
      // Setup
      const { settings, services, components } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      // Creates Quick Links
      components.createQuickLinks();

      /**
       * @desc Makes a GET request to a category URL and retrieves the product count
       * @param {String} url URL to retrieve the product count from
       * @param {Function} callback Function to run when the request was successful
       */
      const getProductCount = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('html');
            temp.innerHTML = request.responseText;
            const productCount = temp.querySelector('.results').innerText;
            callback(productCount);
          }
        };
        request.send();
      };

      // Update Low Running Cost Printers count
      getProductCount('/Printers-with-Low-Running-Costs-C32693.aspx', (productCount) => {
        document.querySelector('#lowRunningCostCount').innerHTML = `(${productCount})`;
      });

      // Update Cashback Printers count
      getProductCount('/Printers-with-Cashback-C25167.aspx', (productCount) => {
        document.querySelector('#cashbackCount').innerHTML = `(${productCount})`;
      });

      // Update Free Gift Printers count
      getProductCount('/Printers-with-Free-Gifts-C34325.aspx', (productCount) => {
        document.querySelector('#freeGiftsCount').innerHTML = `(${productCount})`;
      });

      // GA Events on click
      const quickLinks = document.querySelectorAll('.PL009-link__item');
      [].forEach.call(quickLinks, (link) => {
        link.addEventListener('click', (e) => {
          let clickedLink = e.currentTarget.id;
          switch (clickedLink) { // eslint-disable-line default-case
            case 'PL009-LowRunningCost':
              clickedLink = 'Low Running Costs';
              break;
            case 'PL009-Cashback':
              clickedLink = 'Cashback';
              break;
            case 'PL009-FreeGifts':
              clickedLink = 'Free Gifts';
              break;
          }
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Quicklink: ${clickedLink}`, { sendOnce: true });
        });
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

  components: {
    createQuickLinks() {
      const quickLinksWrapper = `<div class='PL009-quickLinksWrapper'>
      <div class='PL009-quickLinksContainer'>
      <ul>
        <p class='PL009-links'>Find Printers with:</p>
        <a class='PL009-link' href='/Printers-with-Low-Running-Costs-C32693.aspx'>
          <li class='PL009-link__item' id='PL009-LowRunningCost'>
            <div class='PL009-link__content'>
              <p class='PL009-link'>Low Running Costs </p>
              <span class='PL009-count' id='lowRunningCostCount'><span class='PL009-loading'></span></span>
            </div>
          </li>
        </a>
        <a class='PL009-link' href='/Printers-with-Cashback-C25167.aspx'>
          <li class='PL009-link__item' id='PL009-Cashback'>
            <div class='PL009-link__content'>
              <p class='PL009-link'>Cashback </p>
              <span class='PL009-count' id='cashbackCount'><span class='PL009-loading'></span></span>
            </div>
          </li>
        </a>
        <a class='PL009-link' href='/Printers-with-Free-Gifts-C34325.aspx'>
          <li class='PL009-link__item' id='PL009-FreeGifts'>
            <div class='PL009-link__content'>
              <p class='PL009-link'>Free Gifts </p>
              <span class='PL009-count' id='freeGiftsCount'><span class='PL009-loading'></span></span>
            </div>
          </li>
        </a>
      </ul>
      </div>
      </div>`;
      document.querySelector('header').insertAdjacentHTML('afterend', quickLinksWrapper);
    },
  },
};

export default Experiment;
