import { fullStory, events } from '../../../../lib/utils';
import { observer, pollerLite } from '../../../../lib/uc-lib';
import test from './lib/test';

/**
 * {{TP122m}} - {{Product Details and Technical Specs on Mobile PLP}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP122m',
    VARIATION: '{{VARIATION}}',
  },

  info: [],

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Initialise TP084 unless TP084 is already active
    if (!document.body.classList.contains('TP084')) {
      test();
    }
    pollerLite([
      '.TP084',
    ], Experiment.run);

    /**
     * Add no info class to elements with no info after select change.
     */
    const addNoInfoClass = () => {
      const productItems = document.querySelectorAll('ul#tp_product_lister_enumeration li.product_item');
      [].forEach.call(productItems, (product) => {
        if (product) {
          const detailsTitle = product.querySelector('.TP084_ProductInfo_Wrapper');
          const detailsContent = product.querySelector('.TP084_ProductInfo_Data_Wrap');
          if (!detailsTitle || !detailsContent) {
            product.classList.add('TP122-no-info');
          }
        }
      });
    };

    /**
     * Adds the elements from each product to the array info[]
     */
    const infoToArr = () => {
      const items = document.querySelectorAll('ul#tp_product_lister_enumeration li.product_item');
      for (let i = 0; items.length > i; i += 1) {
        const item = items[i];
        const elements = {};
        const title = item.querySelector('.TP084_ProductInfo_Wrapper');
        const content = item.querySelector('.TP084_ProductInfo_Data_Wrap');
        if (title && content) {
          elements.title = title;
          elements.content = content;
          Experiment.info.push(elements);
        }
      }
    };
    infoToArr();

    /**
     * Add the elements back to the product
     */
    const addBackToProduct = () => {
      const product = document.querySelectorAll('ul#tp_product_lister_enumeration li.product_item');
      for (let i = 0; product.length > i; i += 1) {
        if (product[i].classList.contains('TP122-no-info')) {
          // const title = Experiment.info.count.title;
          const obj = Experiment.info[i];
          if (obj) {
            const thisTitle = obj.title;
            const thisContent = obj.content;
            product[i].insertAdjacentHTML('beforeend', thisTitle.outerHTML);
            product[i].insertAdjacentHTML('beforeend', thisContent.outerHTML);
          }
        }
      }
    };
    /**
     * Remove extra elements that are added via test()
     */
    const removeDupes = () => {
      const addedElements = document.querySelectorAll('ul#tp_product_lister_enumeration li.product_item');
      [].forEach.call(addedElements, (element) => {
        const titles = element.querySelectorAll('.TP084_ProductInfo_Wrapper');
        const contents = element.querySelectorAll('.TP084_ProductInfo_Data_Wrap');
        for (let i = 1; titles.length > i; i += 1) {
          titles[i].remove();
        }
        for (let i = 1; contents.length > i; i += 1) {
          contents[i].remove();
        }
      });
    };

    const listContainer = document.querySelector('ul#tp_product_lister_enumeration');
    observer.connect(listContainer, () => {
      addNoInfoClass();
      addBackToProduct();
      test();
      Experiment.components.toggleLinkText();
      Experiment.components.remapClickEvent();
      setTimeout(() => {
        removeDupes();
        Experiment.run();
      }, 1000);
    }, {
      config: {
        childList: true,
        attributes: false,
      },
    });

    /**
     * Re run run() on load more products click.
     */
    const reRunOnLoadMore = () => {
      const loadMoreLink = document.querySelector('.tp_prod_listing #show_more');
      if (loadMoreLink) {
        loadMoreLink.addEventListener('click', () => {
          setTimeout(() => {
            addNoInfoClass();
            addBackToProduct();
            test();
            setTimeout(() => {
              removeDupes();
              Experiment.run();
            }, 1000);
          }, 4500);
        });
      }
    };
    reRunOnLoadMore();
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

  run() {
    const { components } = Experiment;
    components.changeText('View more details');
    components.remapClickEvent();
    components.toggleTechBanner();
  },

  components: {
    /**
     * @desc Changes TP084 product details text
     * @param {String} titleChange
     */
    changeText(titleChange) {
      const titleElement = document.querySelectorAll('.TP084_ProductInfo_Wrapper .TP084_ProductInfo_Text');
      if (titleChange && titleElement) {
        [].forEach.call(titleElement, (title) => {
          title.textContent = titleChange;
        });
      }
    },
    toggleLinkText(el) {
      if (el) {
        if (el.parentElement.classList.contains('TP084_Product_Info_Open')) {
          el.textContent = 'Close product information';
        } else {
          el.textContent = 'View more details';
        }
      } else {
        const titleElement = document.querySelectorAll('.TP084_ProductInfo_Wrapper .TP084_ProductInfo_Text');
        for (let i = 0; titleElement.length > i; i += 1) {
          if (titleElement[i].parentElement.classList.contains('TP084_Product_Info_Open')) {
            titleElement[i].textContent = 'Close product information';
          } else {
            titleElement[i].textContent = 'View more details';
          }
        }
      }
    },
    remapClickEvent() {
      const newLinks = document.querySelectorAll('.TP084_ProductInfo_Wrapper');
      if (newLinks.length) {
        [].forEach.call(newLinks, (el) => {
          el.addEventListener('click', (e) => {
            const thisEl = el.querySelector('.TP084_ProductInfo_Text');
            // Trigger click if not clicking current link.
            if (!e.target.classList.contains('TP084_ProductInfo_Text')) {
              thisEl.click();
              return;
            }
            // Events
            events.send(Experiment.settings.ID, 'Clicked', 'View more details', { sendOnce: false });
            console.log('clicked and should toggle text');
            // Change text open / closed
            Experiment.components.toggleLinkText(thisEl);
            
            // Opened panel with item description
            const openPanel = el.nextElementSibling;
            const hasTechPanel = openPanel.nextElementSibling;
            // if (!hasTechPanel.classList.contains('TP084_ProductInfo_Data_Wrap')) {
            if (!hasTechPanel) {
              Experiment.components.toggleTechBanner();
              Experiment.components.AddTechBanner(openPanel);
            }
            // }
          });
        });
      }
    },
    /**
     * Adds the tech banner to the product
     * @param {DOM Element} ref
     */
    AddTechBanner(ref) {
      const html = `
      <div class="TP122m-tech-wrapper">
        <img class="TP084_ProductInfo_Icon" src="data:image/png;base64,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" alt="Product Informtion Icon">
        <p class="TP122m-tech-link">View technical details</p>
      </div>
      `;
      if (ref) {
        if (!ref.querySelector('.TP122m-tech-wrapper')) {
          ref.insertAdjacentHTML('afterend', html);
        }
      }
      // Re Run Control Tech Banner
      Experiment.components.controlTechBanner();
      // Run Toggle Tech Banner
      Experiment.components.toggleTechBanner();
    },
    /**
     * AJAX requests for the technical table
     */
    controlTechBanner() {
      // Get URL
      const fetchUrl = (el) => {
        const anchor = el.parentElement.querySelector('a');
        if (anchor) {
          const href = anchor.getAttribute('href');
          return href;
        }
      };

      // AJAX Request
      const ajaxCall = (url, el) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            const data = request.responseText;
            const html = document.createElement('div');
            html.innerHTML = data;
            const techTable = html.querySelector('.tp_prodDetailTabs .tp_detSpec .featureClass:first-of-type');
            const techWrap = `
              <div class="TP122m-tech-info-wrap">
                ${techTable.innerHTML}
              </div>
            `;
            // On click of the Tech Banner append Tech Table
            // const hasTechInfo = el.nextElementSibling;
            let runClick = true;
            if (runClick === true) {
              el.addEventListener('click', (e) => {
                runClick = false;
                if (!el.parentElement.querySelector('.TP122m-tech-info-wrap')) {
                  el.insertAdjacentHTML('afterend', techWrap);
                  // Send Event
                  events.send(Experiment.settings.ID, 'Viewed', 'View Technical Details', { sendOnce: false });
                }
                e.stopImmediatePropagation();
              });
            }
          } else {
            // We reached our target server, but it returned an error

          }
        };
        request.onerror = () => {
          // There was a connection error of some sort
        };
        request.send();
      };

      const banners = document.querySelectorAll('.TP122m-tech-wrapper');
      [].forEach.call(banners, (banner) => {
        const url = fetchUrl(banner);
        ajaxCall(url, banner);
      });
    },
    /**
     * Control the tech banner and the following table
     */
    toggleTechBanner() {
      const techBanners = document.querySelectorAll('.TP122m-tech-wrapper');
      [].forEach.call(techBanners, (banner) => {
        const beenAdded = banner.getAttribute('added');
        // Only just been added
        if (beenAdded !== 'true') {
          banner.addEventListener('click', () => {
            // Events
            events.send(Experiment.settings.ID, 'Clicked', 'View more details', { sendOnce: false });
            // Toggle banner classes
            banner.classList.toggle('TP122m-show');
            banner.setAttribute('added', 'true');
            // Toggle tech table
            const table = banner.nextElementSibling;

            if (table && table.classList.contains('TP122m-tech-info-wrap')) {
              if (table.classList.contains('TP122m-toggle-tech')) {
                table.classList.remove('TP122m-toggle-tech');
              } else {
                table.classList.add('TP122m-toggle-tech');
              }
            }
            // Technical title
            const title = banner.querySelector('p');
            if (title) {
              if (title.textContent === 'View technical details') {
                title.textContent = 'Close technical details';
              } else {
                title.textContent = 'View technical details';
              }
            }
          });
        }
      });
    },
  },
};

export default Experiment;
