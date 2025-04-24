import { fullStory, events, addUrlParameter } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import { translations } from './translation';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'DS001',
    VARIATION: '{{VARIATION}}',
  },

  globals: {
    languageText: [],
  },


  init() {
    // Setup
    const {
      settings,
      services,
      components,
      globals,
    } = Experiment;
    services.tracking();

    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    globals.languageText = [];

    /**
    * @desc Set the language and push to globals
    */
    const language = document.querySelector('.language').textContent;
    let siteLanguage;
    switch (language) {
      case 'EN':
        siteLanguage = translations.EN;
        break;
      case 'DE':
        siteLanguage = translations.DE;
        break;
      case 'FR':
        siteLanguage = translations.FR;
        break;
      case 'SV':
        siteLanguage = translations.SV;
        break;

      default:
      /* code */
        break;
    }
    globals.languageText.push(siteLanguage);

    components.moveViewAll();
    components.iconLabel();
    document.querySelector('.row.gu-full').removeAttribute('style');
    components.productFamily();
    components.collapseFilters();
    components.showSelectedFilters();

    pollerLite([
      '.wrapperScrollTable .divScrollTable .tr_header.-stuck',
    ], () => {
      components.fixedLeftScroll();
    });

    if (settings.VARIATION === '1') {
      components.overlayArrow();
    }
    if (settings.VARIATION === '2') {
      /*eslint-disable */
      pollerLite([
        () => !!window.jQuery,
        () => !!window.jQuery.fn.datepicker,
      ], components.clickScroll());
      /* eslint-enable */
    }
    components.sendEvents();
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
    /**
     * @desc Add technical view label
     */
    iconLabel: () => {
      const { globals } = Experiment;
      const languageText = globals.languageText[0];

      /* eslint-enable */
      const standardviewButton = document.querySelector('.btn-switch-standard');
      const printButton = document.querySelector('.skin-toolsitem-print');

      const viewLabel = document.createElement('span');
      viewLabel.classList.add('DS001-icon_label');

      viewLabel.innerHTML = `${languageText.standardView}`;
      standardviewButton.appendChild(viewLabel);
      const newPrintLabel = document.createElement('div');
      newPrintLabel.classList.add('DS001-icon_label');
      newPrintLabel.innerHTML = `${languageText.print}`;

      printButton.appendChild(newPrintLabel);
    },
    /**
     * @desc Move view all products and products found
     */
    moveViewAll: () => {
      const { globals } = Experiment;
      const languageText = globals.languageText[0];
      const viewAll = document.querySelector('#productsCount .view-all');
      viewAll.querySelector('a').textContent = `${languageText.viewAllText}`;

      const prodPerPage = document.querySelector('.mod-productlist-pagination');
      prodPerPage.insertAdjacentElement('afterend', viewAll);

      const productsFound = document.querySelector('.mod.mod-amount-products-found');

      document.querySelector('.gu-12 .base.page-title').insertAdjacentElement('afterend', productsFound);
    },
    /**
     * @desc Request to the other product listing view and get the product family
     */
    productFamily: () => {
      const { globals } = Experiment;
      const languageText = globals.languageText[0];

      let URL;
      const techView = document.querySelector('.btn-switch-technical.active');
      const currentURL = window.location.href;
      if (techView) {
        if (currentURL.indexOf('useTechnicalView=true') > -1) {
          URL = currentURL.replace(/(useTechnicalView=true)/, 'useListView=true');
        } else {
          URL = addUrlParameter(currentURL, 'useListView', 'true');
        }
        const request = new XMLHttpRequest();
        request.open('GET', URL, true);

        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('div');
            temp.innerHTML = request.responseText;
            const productFamilyDiv = temp.querySelectorAll('.mod-product.skin-product-search .value-family .product-family');
            const allProducts = document.querySelectorAll('.divScrollTable .tr_content');

            productFamilyDiv.forEach((item, idx) => {
              const familyLink = item.getAttribute('href');
              const matchingProduct = allProducts[idx];

              if (matchingProduct) {
                const productName = matchingProduct.querySelector('.title-container .ellipsis').textContent.trim();
                const newFamilyLink = document.createElement('div');
                newFamilyLink.classList.add('DS001-family_link');
                newFamilyLink.innerHTML = `<a href="${familyLink}">${languageText.view} ${productName} ${languageText.family}</a>`;

                matchingProduct.querySelector('.headcol').appendChild(newFamilyLink);
              }
            });
          }
          URL = URL.replace(/(useListView=true)/, 'useTechnicalView=true');
          const newRequest = new XMLHttpRequest();
          newRequest.open('GET', URL, true);
          newRequest.send();
        };
        request.send();
      }
    },
    /**
    * @desc Collapse filters behind a button. When clicked, the
    * filters will appear over the top of the product grid
    */
    collapseFilters: () => {
      const productFilters = document.querySelector('.row__col-2 .mod.mod-facets');
      const showFiltersButton = document.querySelector('.xmod-filter__title');

      const closeFilter = document.createElement('div');
      closeFilter.classList.add('DS001-close_filter');
      closeFilter.innerHTML = '&times';

      document.querySelector('.xmod-filter__title span').insertAdjacentElement('afterend', closeFilter);

      showFiltersButton.addEventListener('click', () => {
        if (productFilters.classList.contains('DS001-filter_show')) {
          productFilters.classList.remove('DS001-filter_show');
        } else {
          productFilters.classList.add('DS001-filter_show');
        }
      });
    },
    showSelectedFilters: () => {
      const selectedFilters = document.querySelectorAll('.xmod-filter .bd ul .facet-item');
      const selectedFiltersWrap = document.createElement('div');
      selectedFiltersWrap.classList.add('DS001-chosen_filter');

      const mainWrap = document.querySelector('.mod.mod-facets');
      mainWrap.querySelector('.xmod-filter__title').insertAdjacentElement('afterend', selectedFiltersWrap);

      for (let index = 0; index < selectedFilters.length; index += 1) {
        const element = selectedFilters[index];
        const filter = document.createElement('div');
        filter.innerHTML = element.innerHTML;
        filter.classList.add('DS001-filter-selected');
        document.querySelector('.DS001-chosen_filter').appendChild(filter);
      }
    },
    /**
    * @desc add the overlay arrow
    */
    overlayArrow: () => {
      const { globals } = Experiment;
      const languageText = globals.languageText[0];
      const product = document.querySelectorAll('.divScrollTable .tr_content');

      for (let index = 0; index < product.length; index += 1) {
        const element = product[index];
        const overlayMessage = document.createElement('div');
        overlayMessage.classList.add('DS001-overlay');
        overlayMessage.innerHTML = `<span>${languageText.scrollRight}</span>`;
        element.appendChild(overlayMessage);
      }

      // on scroll remove the message
      const scrollTable = document.querySelector('.wrapperScrollTable');
      const scrollMessages = document.querySelectorAll('.DS001-overlay');
      scrollTable.addEventListener('scroll', () => {
        for (let index = 0; index < scrollMessages.length; index += 1) {
          const element = scrollMessages[index];
          element.remove();
        }
      });
    },
    /**
     * @desc Click to scroll, only show on hover of product, once clicked remove all
     */
    clickScroll: () => {
      const { globals } = Experiment;
      const languageText = globals.languageText[0];
      const product = document.querySelectorAll('.divScrollTable .tr_content');

      const scrolltable = document.querySelector('.wrapperScrollTop');
      const innerTable = document.querySelector('.wrapperScrollTable');
      scrolltable.classList.add('DS001-no_scroll');
      innerTable.classList.add('DS001-no_scroll_inner');

      for (let index = 0; index < product.length; index += 1) {
        const element = product[index];
        const overlayMessage = document.createElement('div');
        overlayMessage.classList.add('DS001-overlay_clickscroll');
        overlayMessage.innerHTML = `<span>${languageText.moreAttributes}</span>`;
        element.insertBefore(overlayMessage, element.firstChild);


        element.addEventListener('mouseenter', () => {
          if (element.querySelector('.DS001-overlay_clickscroll')) {
            element.querySelector('.DS001-overlay_clickscroll').classList.add('DS001-show_more');
          }
        });

        element.addEventListener('mouseleave', () => {
          if (element.querySelector('.DS001-overlay_clickscroll')) {
            element.querySelector('.DS001-overlay_clickscroll').classList.remove('DS001-show_more');
          }
        });

        /* eslint-disable */
        element.querySelector('.DS001-overlay_clickscroll').addEventListener('click', () => {
          $('.wrapperScrollTable').animate( { scrollLeft: '+=460' }, 1000);
          /* eslint-enable */
          scrolltable.classList.remove('DS001-no_scroll');
          innerTable.classList.remove('DS001-no_scroll_inner');

          [].forEach.call(document.querySelectorAll('.DS001-overlay_clickscroll'), (item) => {
            item.remove();
          });
        });
      }
    },
    /**
    * @desc Make the fixed header bar move left when table is scrolled
    */
    fixedLeftScroll: () => {
      const scrollTable = document.querySelector('.wrapperScrollTable .divScrollTable .tr_header.-stuck');
      document.querySelector('.wrapperScrollTable').addEventListener('scroll', (e) => {
        /* eslint-disable */
        const leftScroll = e.currentTarget.scrollLeft;
        scrollTable.style.marginLeft = '-' + leftScroll + 'px';
        /* eslint-enable */
      });
    },
    sendEvents: () => {
      const { settings } = Experiment;
      const applyFilter = document.querySelector('.btn-apply-filter');

      const product = document.querySelectorAll('.divScrollTable .tr_content');

      applyFilter.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', `${settings.ID} Clicks on Filter (apply selection button) - Variation ${settings.VARIATION}`);
      });

      pollerLite(['.DS001-family_link'], () => {
        for (let index = 0; index < product.length; index += 1) {
          const element = product[index];
          element.querySelector('.DS001-family_link').addEventListener('click', () => {
            events.send(settings.ID, 'Clicked', `${settings.ID} Clicks on product family  - Variation ${settings.VARIATION}`);
          });
        }
      });
    },
  },
};


export default Experiment;
