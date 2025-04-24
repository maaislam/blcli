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
    const totalResults = document.querySelector('.filter-header .results').textContent;

    if (settings.VARIATION === '2') {
      // Creates Filter Content
      // const filterContent = components.createFilterContent();

      const products = document.querySelectorAll('article.product');
      let count = 0;

      [].forEach.call(products, (product) => {
        count++; // eslint-disable-line no-plusplus
        if (count === 6) {
          // Appends New Filter Container after 6th Product
          const newFilter = document.querySelector('.printers.printer_finder');
          product.insertAdjacentElement('afterend', newFilter);
          // components.appendNewFilter(product, filterContent, totalResults);
        } else if (count === 12) {
          // Appends New Message Container after 12th Product
          components.secondInterstilMessage(product);
        }
      });
    }

    // Event Listener for Price Range Field to stop from closing
    // const priceFields = document.querySelectorAll('.PL010-filter-item ul.dropdown-menu select');
    // [].forEach.call(priceFields, (field) => {
    //   // Remove default action
    //   field.removeAttribute('onchange');
    //   field.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //   });
    // });

    /**
     * @desc Select filter option in new filter
     */
    // const filterButtons = document.querySelectorAll('.PL010-printerFilterContainer .left .dropdown');
    // [].forEach.call(filterButtons, (button) => {
    //   const options = button.querySelectorAll('ul.dropdown-menu li>input');
    //   [].forEach.call(options, (option) => {
    //     option.addEventListener('click', () => {
    //       const categoryDiv = option.closest('.dropdown-menu').previousElementSibling;
    //       const categoryId = categoryDiv.querySelector('span').getAttribute('id'); // eslint-disable-line no-unused-vars
    //       const id = option.getAttribute('id').replace('PL010-', '');
    //       if (!option.getAttribute('checked')) {
    //         if (document.querySelector(`.printer-filter .filter-items .filter-item #filter-${id}`)) {
    //           option.setAttribute('checked', 'checked');
    //           document.querySelector(`.printer-filter .filter-items .filter-item #filter-${id}`).setAttribute('checked', 'checked');
    //         }
    //       } else {
    //         if (document.querySelector(`.printer-filter .filter-items .filter-item #filter-${id}`)) { // eslint-disable-line no-lonely-if
    //           option.removeAttribute('checked', 'checked');
    //           document.querySelector(`.printer-filter .filter-items .filter-item #filter-${id}`).removeAttribute('checked');
    //         }
    //       }
    //       // Get Updated Result Count
    //       services.checkNumberForChosenOptions();
    //     });
    //   });
    //   // Select Price
    //   if (button.querySelector('select')) {
    //     services.updateSelectedPrice(button, '#PL010-MinPrice');
    //     services.updateSelectedPrice(button, '#PL010-MaxPrice');
    //   }
    // });

    // 'Show Results' CTA Button Event Listener
    // if (document.querySelector('.PL010-printerFilterContainer #filterId')) {
    //   document.querySelector('.PL010-printerFilterContainer #filterId').addEventListener('click', () => {
    //     events.send(settings.ID, 'Clicked Printer Finder', `Variation ${settings.VARIATION} - Submit`, { sendOnce: true });
    //     window.location = services.getRequestUrl();
    //   });
    // }

    // 'Reset' CTA Button
    // if (document.querySelector('.PL010-printerFilterContainer #resetId')) {
    //   document.querySelector('.PL010-printerFilterContainer #resetId').addEventListener('click', () => {
    //     document.querySelector('.binner .filter-header .action > a.filter_reset').click();
    //   });
    // }

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
    /**
     * @desc Update Price in Control Filter
     */
    updateSelectedPrice(button, id) {
      button.querySelector(`${id}`).addEventListener('change', (e) => {
        const selectedValue = e.currentTarget.children[e.currentTarget.selectedIndex].textContent;
        id = id.replace('#PL010-', ''); // eslint-disable-line no-param-reassign
        // Find new selected price on control filter
        document.querySelector(`select[id*='${id}'] option[selected='selected']`).removeAttribute('selected');
        const allSelectOptions = document.querySelectorAll(`select[id*='${id}'] option`);
        [].forEach.call(allSelectOptions, (option) => {
          if (option.textContent === selectedValue) {
            option.setAttribute('selected', 'selected');
          }
        });

        // Get Updated Result Count
        this.checkNumberForChosenOptions();
      });
    },
    /**
     * @desc Get Request URL
     */
    getRequestUrl() {
      const chosenPaperSize = [];
      const chosenTechnology = [];
      const chosenType = [];
      const chosenExtras = [];
      const chosenInterface = [];
      const chosenDoubleSided = [];
      const chosenBrands = [];
      const chosenCompability = [];
      const chosenPrices = [];
      const controlFilterItems = document.querySelectorAll('.binner .filter-items .filter-item');
      [].forEach.call(controlFilterItems, (filter) => {
        const catId = filter.getAttribute('id').replace('filter-', '');
        const items = filter.querySelectorAll('li');
        [].forEach.call(items, (item) => {
          if (item.querySelector('input')) {
            if (item.querySelector(`[checked='checked']`)) { // eslint-disable-line quotes
              const value = item.querySelector('input:nth-of-type(2)').getAttribute('value');
              switch (catId) { // eslint-disable-line default-case
                case 'paperSize':
                  chosenPaperSize.push(value);
                  break;
                case 'technology':
                  chosenTechnology.push(value);
                  break;
                case 'printerType':
                  chosenType.push(value);
                  break;
                case 'multifunction':
                  chosenExtras.push(value);
                  break;
                case 'connectivity':
                  chosenInterface.push(value);
                  break;
                case 'doubleSided':
                  chosenDoubleSided.push(value);
                  break;
                case 'brand':
                  chosenBrands.push(value);
                  break;
                case 'compatibility':
                  chosenCompability.push(value);
                  break;
              }
            }
          } else if (item.querySelector('select')) {
            const priceOptions = item.querySelectorAll(`select option`); // eslint-disable-line quotes
            [].forEach.call(priceOptions, (option) => {
              // Get Selected Price Value
              if (option.getAttribute('selected')) {
                chosenPrices.push(option.textContent);
              }
            });
          }
        });
      });
      const finalUrl = `/Printers.aspx?papersize=${chosenPaperSize.join(',')}&technology=${chosenTechnology.join(',')}&type=${chosenType.join(',')}&extras=${chosenExtras.join(',')}&interface=${chosenInterface.join(',')}&d=${chosenDoubleSided.join(',')}&minPrice=${chosenPrices[0]}&maxPrice=${chosenPrices[1]}&Brand=${chosenBrands.join(',')}&compatible=${chosenCompability.join(',')}&a=&ds=`;

      return finalUrl;
    },
    checkNumberForChosenOptions() {
      const reqUrl = this.getRequestUrl();
      const request = new XMLHttpRequest();
      request.open('GET', reqUrl, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const productCount = temp.querySelector('.results').innerText;
          // Update Result Count on Page
          document.querySelector('#ctl00_ctl00_ContentPlaceHolderMain_ctl01_lblMatches').textContent = productCount;
          document.querySelector('.PL010-filterHeader span > b').textContent = productCount;
          document.querySelector('.PL010-printerFilterContainer #countId').textContent = productCount;
        }
      };
      request.send();
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
     * @desc Interstil #1 Filter
     */
    createFilterContent() {
      const { services } = Experiment;
      const filterItems = document.querySelectorAll('.filter-items .filter-item');
      let filterContent = '';
      let filterOptionsContent = '';
      let filterOptionChecked = '';
      [].forEach.call(filterItems, (item) => {
        let filterTypeContent = '';
        const filterType = item.querySelector('h5 > a').textContent;
        const filterTypeId = services.camelize(filterType);
        item.setAttribute('id', `filter-${filterTypeId}`);
        filterTypeContent += `<button class='btn dropdown-toggle' type='button' data-toggle='dropdown' aria-expanded='false'>
          <span id='PL010-${filterTypeId}'>${filterType}</span>
          <span class='caret'></span>
        </button>`;
        const filterOptions = item.querySelectorAll('ul li');
        filterOptionsContent = '';
        [].forEach.call(filterOptions, (option) => {
          filterOptionChecked = '';
          if (option.querySelector('label')) {
            const optionName = option.querySelector('label').textContent;
            const optionValue = option.querySelector('input:last-child').getAttribute('value');
            const optionId = services.camelize(optionName);
            option.querySelector('input').setAttribute('id', `filter-${optionId}`);
            // Checks if option is pre-selected and adds option as checked on the new filter
            const optionChecked = option.querySelector('input').getAttribute('checked');
            if (optionChecked === 'checked') {
              filterOptionChecked = `checked='checked'`; // eslint-disable-line quotes
            }
            filterOptionsContent += `<li id='${optionId}-option'>
              <input id='PL010-${optionId}' type='checkbox' ${filterOptionChecked} value='${optionValue}'>
              <label name='PL010-${optionId}'>${optionName}</label>
            </li>`;
          } else if (option.querySelector('select')) {
            const selectOptions = option.innerHTML;
            filterOptionsContent += `<li>${selectOptions}</li>`;
          }
        });
        filterContent += `<div class='PL010-filter-item filter-item dropdown'>
          ${filterTypeContent}
          <ul class='dropdown-menu'>
            ${filterOptionsContent}
          </ul>
        </div>`;
      });
      return filterContent;
    },
    /**
     * @desc Interstil #1 New Filter
     */
    appendNewFilter(product, filterContent, totalResults) {
      const newFilter = `<div class='PL010-interstilWrapper PL010-printerFilterWrapper'>
      <div class='PL010-printerFilterContainer'>
        <div class='PL010-filterHeader filter-header'>
          <span>We have <b>${totalResults}</b> printers that match your search. We recommend you refine your search below</span>
        </div>
        <div class='PL010filter-body'>
          <div class='left'>
            ${filterContent}
          </div>
          <div class='right'>
            <div class='PL010-count count'>
              <span id='countId' class='results'>${totalResults}</span>
              <span class='matches bold'>matching products</span>
            </div>
            <div class='PL010-action action'>
              <a id='resetId' class='btn_reset bold'>
                <span>Reset</span>
                <span class='glyphicon glyphicon-refresh'></span>
              </a>
              <a id='filterId' class='button filter_results'>
                <span>Show Results</span>
                <span class=''glyphicon glyphicon-chevron-right></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>`;
      product.insertAdjacentHTML('afterend', newFilter);

      // Changes the ID of select tags
      let count = 0;
      const selections = document.querySelectorAll('.PL010-filter-item ul.dropdown-menu li select');
      [].forEach.call(selections, (select) => {
        if (count === 0) {
          select.setAttribute('id', 'PL010-MinPrice');
          count++; // eslint-disable-line no-plusplus
        } else {
          select.setAttribute('id', 'PL010-MaxPrice');
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
          <div class='message-bottom'>We have 30+ printer experts waiting to talk right now who help over 300 customers every <b>DAY</b></div>
        </div>
      </div>`;
      product.insertAdjacentHTML('afterend', newDiv);
    },
  },
};

export default Experiment;
