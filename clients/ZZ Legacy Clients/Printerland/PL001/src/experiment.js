import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PL001}} - {{Quick Links (POC)}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL001',
    VARIATION: '1',
  },

  init() {
    if (document.querySelector('#topNav')) {
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);

      // Creates Quick Links
      const quickLinksWrapper = `<div class='PL001-quickLinksWrapper'>
      <div class='PL001-quickLinksContainer'>
      <ul>
      <p class='PL001-links'>Quick links:</p>
      <a class='PL001-link' href='/printers/laser/colour/a4'><li class='PL001-link__item' id='PL001-ColourLaserPrinters'><p class='PL001-link'>A4 Colour Laser Printers <span id='colourLaserPrintersCount'></span></p><span class='PL001-rightArrow'></span></li></a>
      <a class='PL001-link' href='/printers/multifunction/colour'><li class='PL001-link__item' id='PL001-MultifunctionPrinters'><p class='PL001-link'>Colour Multifunction Printers <span id='colourMultifunctionPrintersCount'></span></p><span class='PL001-rightArrow'></span></li></a>
      </ul>
      </div>
      </div>`;
      document.querySelector('header').insertAdjacentHTML('afterend', quickLinksWrapper);

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

      // Update A4 Colour Laser Printers count
      getProductCount('https://www.printerland.co.uk/printers/laser/colour/a4', (productCount) => {
        document.querySelector('#colourLaserPrintersCount').innerText = `(${productCount})`;
      });

      // Update Colour Multifunction Printers count
      getProductCount('https://www.printerland.co.uk/printers/multifunction/colour', (productCount) => {
        document.querySelector('#colourMultifunctionPrintersCount').innerText = `(${productCount})`;
      });

      // GA Events on click
      const quickLinks = document.querySelectorAll('.PL001-link__item');
      [].forEach.call(quickLinks, (link) => {
        link.addEventListener('click', (e) => {
          let clickedLink = e.currentTarget.id;
          switch (clickedLink) { // eslint-disable-line default-case
            case 'PL001-ColourLaserPrinters':
              clickedLink = 'A4 Colour Laser Printers';
              break;
            case 'PL001-MultifunctionPrinters':
              clickedLink = 'Colour Multifunction Printers';
              break;
          }
          events.send('PL001', 'Clicked on Quick Link', `Link clicked: ${clickedLink}`);
        });
      });
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
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
