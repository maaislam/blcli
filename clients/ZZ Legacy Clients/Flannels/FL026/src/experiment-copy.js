import { fullStory, events } from '../../../../lib/utils';
import config from './lib/config';
import { poller } from '../../../../lib/uc-lib';
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

  globals: {
    pageData: null,
    productCategory: null,
  },

  data: {},

  init() {
    // Setup
    const { settings, services, components, data } = Experiment;

    // Services
    services.tracking();
    components.populateGlobals();

    document.body.classList.add(settings.ID);
    const isDesktop = components.detectDevice();
    components.detectCategory();
    const productName = components.detectProduct();
    // // // console.log('product name, ', productName);
    // // // console.log('data.product', data.product);
    components.matchProduct(productName);
    // // console.log('///////// \n After matchProduct');
    // // console.log('product name, ', productName);
    // // console.log('data.product', data.product);
    const sizeData = components.getProductSizes();

    // // console.log('///////// \n After getProductSizes');
    // // console.log('product name, ', productName);
    // // console.log('data.product', data.product);
    console.log('sizeData', sizeData);

    components.buildSizeGuide(sizeData, productName);

    /**
     * Desktop
     */
    if (isDesktop) {
      components.replaceSizeGuideBtn();
      components.toggleSizeGuide();
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
    /**
     * Pulled from FL002
     */
    /**
     * @description Populate global variables
     */
    populateGlobals() {
      const { globals } = Experiment;
      globals.pageData = this.getPageData();
      globals.productCategory = this.getCategory();
    },
    /**
     * @description Performs a number of checks to determine which category
     * the product falls under. The category in the data layer is too generic
     * @returns {String} Product category (matching size guide categories)
     */
    getCategory() {
      const { globals } = Experiment;
      const { pageData } = globals;
      const { productName } = pageData;
      let category;
      const dataLayerCategory = pageData.productCategory;
      if (pageData.productGender === 'Men') {
        if (dataLayerCategory === 'Clothing') {
          switch (true) {
            case !!productName.match(/polo shirt/gi):
              category = 'Casual Shirts';
              break;

            case !!productName.match(/t shirt/gi):
              category = 'Casual Shirts';
              break;

            case !!productName.match(/t-shirt/gi):
              category = 'Casual Shirts';
              break;

            case !!productName.match(/jumpsuit/gi):
              category = 'Clothing';
              break;

            case !!productName.match(/dress/gi):
              category = 'Clothing';
              break;

            case !!productName.match(/jean/gi):
              category = 'Jeans';
              break;

            case !!productName.match(/trouser/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/chino/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/jogger/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/pants/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/boxer/gi):
              category = 'Swim/Underwear';
              break;

            case !!productName.match(/shorts/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/bottoms/gi):
              category = 'Trousers';
              break;

            case !!productName.match(/coat/gi):
              category = 'Outerwear';
              break;

            case !!productName.match(/jacket/gi):
              category = 'Outerwear';
              break;

            case !!productName.match(/gilet/gi):
              category = 'Outerwear';
              break;

            case !!productName.match(/brief/gi):
              category = 'Swim/Underwear';
              break;

            case !!productName.match(/trunk/gi):
              category = 'Swim/Underwear';
              break;

            case !!productName.match(/sweatshirt/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/shirt/gi):
              category = 'Formal Shirts';
              break;

            case !!productName.match(/jumper/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/cardigan/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/kimono/gi):
              category = 'Tops/Knitwear';
              break;

            case !!productName.match(/suit/gi):
              category = 'Tailoring';
              break;

            case !!productName.match(/blazer/gi):
              category = 'Tailoring';
              break;

            case !!productName.match(/sock/gi):
              category = 'Socks';
              break;

            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            default:
              break;
          }
        } else if (dataLayerCategory === 'Accessories') {
          switch (true) {
            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            case !!productName.match(/belt/gi):
              category = 'Belts';
              break;

            case !!productName.match(/glove/gi):
              category = 'Gloves';
              break;

            case !!productName.match(/sock/gi):
              category = 'Socks';
              break;

            default:
              break;
          }
        } else if (dataLayerCategory === 'Footwear') {
          category = 'Footwear';
        }
      } else if (pageData.productGender === 'Women') {
        if (dataLayerCategory === 'Clothing') {
          switch (true) {
            case !!productName.match(/jean/gi):
              category = 'Jeans';
              break;

            default:
              category = 'Clothing';
          }
        } else if (dataLayerCategory === 'Footwear') {
          category = 'Footwear';
        }
      } else if (pageData.productGender === 'Unisex') {
        if (dataLayerCategory === 'Clothing') {
          switch (true) {
            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            default:
              break;
          }
        } else if (dataLayerCategory === 'Accessories') {
          switch (true) {
            case !!productName.match(/cap/gi):
              category = 'Hats';
              break;

            case !!productName.match(/hat/gi):
              category = 'Hats';
              break;

            default:
              break;
          }
        }
      }

      return category;
    },
    /**
     * @description Gets the FLAN_onLoad data object that is pushed to
     * the datalayer on page load. Contains product category and other
     * useful information for this product
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
     * If true, is desktop. False, mobile
     */
    detectDevice() {
      return document.querySelector('.FL001_sizeGuideBtn.FL001_sizeGuideBtn--desktop');
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
     * Detect which category we are in, e.g. kids, mens, womens. FL026 Version
     */
    detectCategory() {
      const { data } = Experiment;
      const links = document.querySelectorAll('#MoreFromLinks ul li a.MoreFromLink');
      if (links) {
        for (let i = 0; links.length > i; i += 1) {
          const text = links[i].textContent.trim().toLowerCase();
          if (text) {
            switch (text) {
              case 'men':
                data.category = 'mens';
                break;
              case 'women':
                data.category = 'womens';
                break;
              case 'kids':
                data.category = 'kids';
                break;
              default:
                break;
            }
          }
        }
      }
    },
    /**
     * Detect which product we are currently on and returns the string.
     */
    detectProduct() {
      const productTitle = document.querySelector('.FlanProdDet .title h1 #lblProductName');
      if (productTitle) {
        const productText = productTitle.textContent.trim().toLowerCase();
        // At the moment just take the last word from the title.
        const arr = productText.split(' ');
        const product = arr.slice(-1)[0];
        if (product !== null || product !== 'undefined') {
          return product;
        }
      }
    },
    /**
     * @desc Matches the productName against the keys in the object
     * The object being the chosen category.
     * @param {String} productName
     */
    matchProduct(productName) {
      const { data } = Experiment;
      // Get Category first
      const dataObject = config[data.category];
      // If we have a category
      if (dataObject !== 'undefined') {
        // Check if product matches all or part of JSON products.
        const productNames = Object.keys(dataObject);
        // New Array without underscores
        const newArr = [];
        for (let i = 0; productNames.length > i; i += 1) {
          const name = productNames[i];
          // let newName = null;
          // if (name.match(/_/g)) {
          //   newName = name.replace('_', ' ');
          //   newArr.push(newName);
          // } else {
          // }
          newArr.push(name);
        }
        // Now check if data.product matches any keys
        const productResult = newArr.filter(name => name.match(productName));
        if (productResult) {
          data.product = productResult;
        }
      }
    },
    /**
     * Loop over and store the products, once we have those we then
     * return a dataObject with all the relevant size data.
     */
    getProductSizes() {
      const { data } = Experiment;
      const dataObject = {};
      const sizeObject = {};
      const dataProduct = () => {
        if (data.product.length > 1) {
          for (let i = 0; data.product.length > i; i += 1) {
            sizeObject[i] = data.product[i];
          }
        } else {
          sizeObject[0] = data.product;
        }
      };
      const getSizes = () => {
        const sizeObjectLength = Object.keys(sizeObject).length;
        if (sizeObjectLength > 1) {
          for (let i = 0; sizeObjectLength > i; i += 1) {
            dataObject[i] = config[data.category][sizeObject[i]];
          }
        } else {
          dataObject[0] = config[data.category][sizeObject[0]];
        }
      };
      dataProduct();
      getSizes();
      return dataObject;
    },
    /**
     * @desc Takes in a size object which it will use to build together
     * html to replace the current desktop size guide.
     * @param {Object} data 
     */
    buildSizeGuide(data, productName) {
      /**
       * This function is responsible for adding the top level data
       * to HTML.
       */
      const deconstructObject = (num) => {
        // Keep adding to the HTML
        let html = '';
        // // console.log('deconstruct num', num);
        // // console.log('data with number', data[num]);
        // Get to standard
        let dataNumber = 0;
        if (num) {
          dataNumber = num;
        }
        const { standard } = data[dataNumber];

        /**
         * Re order object XXS - XXXXL
         */
        const orderObject = () => {
          const arr = [];
          // Push to arr
          for (const key in standard) {
            if (standard.hasOwnProperty(key)) {
              if (standard.hasOwnProperty(key)) {
                arr.push([key, standard[key]]);
              }
            }
          }
          return arr;
        };
        const orderedArr = orderObject();
        /**
         * Get the top level sizes
         */
        let count = 0;
        const constructTopSizes = () => {
          // // console.log('NUM', num);
          let topHtml = '';
          if (num) {
            if (num >= 0) {
              topHtml = '<tr><td></td><td></td>';
            }
          }
          count += 1;
          // Sort Arr and return html
          // First level
          for (let i = 0; orderedArr.length > i; i += 1) {
            // // console.log('top sizes', orderedArr[i][0]);
            topHtml += `
              <td>${orderedArr[i][0]}</td>
            `;
          }
          topHtml += '</tr>';
          return topHtml;
        };
        const topSizes = constructTopSizes();
        html += topSizes;
        /**
         * Get the country names
         */
        const countryNames = () => {
          let countryArr = '';
          // Loop over array of objects
          for (let i = 0; orderedArr.length > i; i += 1) {
            if (i === 0) {
              const firstObject = orderedArr[0][1];
              // // // console.log(firstObject);
              const names = Object.keys(firstObject);
              countryArr = names;
            }
          }
          for (let i = 0; countryArr.length > i; i += 1) {
            html += `
              <tr class="FL026-size-rows">
                <td></td>
                <td>${countryArr[i]}</td>
            `;
            const objectColumn = orderedArr[i][1];
            const arrColumn = [];
            for (const key in objectColumn) {
              if (objectColumn.hasOwnProperty(key)) {
                if (objectColumn.hasOwnProperty(key)) {
                  arrColumn.push([key, objectColumn[key]]);
                }
              }
            }
            // // // console.log(arrColumn);
            
          }
        };
        /**
         * Strip the sizes and add to html
         */
        countryNames();
        
        // // // console.log(orderedArr);

        return html;
      };
      /**
       * This function is responsible for deciding if the category title
       * should be Standard, shoes etc.
       */
      const standardReplacement = () => {
        return 'STANDARD';
      };
      /**
       * This function is responsible for mapping over the data object
       * and assign the sizes to the correct country row using the country
       * text as key. Call after DOM creation
       */
      const constructTableCells = (standardOrNot, num) => {
        const getSizeValues = () => {
          let dataNum = 0;
          if (num) {
            dataNum = num;
          }
          const sizeObj = data[dataNum][standardOrNot.toLowerCase()];
          const arr = [];
          // Push to arr
          for (const key in sizeObj) {
            if (sizeObj.hasOwnProperty(key)) {
              if (sizeObj.hasOwnProperty(key)) {
                arr.push([key, sizeObj[key]]);
              }
            }
          }
          
          const countryValuesArr = [];
          arr.forEach((arrEl) => {
            
            const countryValues = Object.values(arrEl[1]);
            countryValuesArr.push(countryValues);
          });

          return countryValuesArr;
        };
        const sizeValues = getSizeValues();

        const formatValues = () => {
          const sizeArr = [];
          for (let i = 0; sizeValues.length > i; i += 1) {
            const sizeValueColumn = sizeValues[i];
            for (let k = 0; sizeValueColumn.length > k; k += 1) {
              // // console.log(sizeValueColumn[k]);
              sizeArr.push(sizeValueColumn[k]);
            }
          }
          return sizeArr;
        };
        const sizeArr = formatValues();

        const arrayToDom = () => {
          const table = document.querySelector('.FL026-S-G .FL026-size-table');
          const tableRows = document.querySelectorAll('.FL026-S-G .FL026-size-table tr[data-order]');
          if (tableRows) {
            let index = 0;
            for (let i = 0; sizeArr.length > i; i += 1) {
              const size = sizeArr[i];
              const element = table.querySelector(`[data-order="${index}"`);
              if (element) {
                element.insertAdjacentHTML('beforeend', `
                  <td>${size}</td>
                `);
              }
              index += 1;
              if (index === tableRows.length) {
                index = 0;
              }
            }
          }
        };
        arrayToDom();
      };
      
      const dataLength = Object.keys(data).length;
      // console.log('data length', dataLength);
      const finalObject = [];
      let objectSize = 0;
      if (dataLength > 0) {
        for (let i = 0; dataLength > i; i += 1) {
          // Get biggest object first
          const currentObjectSize = Object.keys(data[i].standard).length;
          if (currentObjectSize > objectSize) {
            objectSize = i;
          }
          const returnedHTML = deconstructObject(objectSize);
          finalObject[i] = returnedHTML;
        }
      } else {
        const returnedHTML = deconstructObject();
        finalObject[0] = returnedHTML;
      }
      // // console.log(finalObject.objectToUse);
      const standardOrOther = standardReplacement();

      const finalHtml = `
        <div class="FL026-size-guide">
          <div class="FL026-title">
            <div class="FL026-close"><span>X</span></div>
            <h1>Size Guide</h1>
          </div>

          <div class="FL026-container">
            <div class="FL026-intro">
              <p>Below is our sizing guide to help you select the correct items. Inevitable there is some variance in the sizing standards used by manufactures. Please refer to the bulleted description within each product for further detail on each product and sizing and country of origin.</p>
            </div>

            <table class="FL026-size-table">
              <th>${productName.toUpperCase()}</th>
              <tr class="FL026-top-row">
                <td>${productName.toUpperCase()}</td>
                <td>${standardOrOther}</td>
                ${finalObject}
              </tr>
            </table>
          </div>
        </div>
      `;
      /**
       * Create an element to then assign the correct sizes to the correct row.
       */
      const htmlDiv = document.createElement('div');
      htmlDiv.classList.add('FL026-S-G', 'FL026-hide', 'FL026-no-display');
      htmlDiv.innerHTML = finalHtml;
      /**
       * Append to the DOM
       */
      document.body.insertAdjacentElement('beforeend', htmlDiv);
      // After a few seconds remove the class FL026-no-display
      setTimeout(() => {
        const sG = document.querySelector('.FL026-S-G');
        if (sG) {
          sG.classList.remove('FL026-no-display');
        }
      }, 1000);
      /**
       * Add classes and data-order to table rows
       */
      const addRowOrder = () => {
        const rows = document.querySelectorAll('.FL026 .FL026-S-G .FL026-size-rows');
        // console.log(rows);
        for (let i = 0; rows.length > i; i += 1) {
          rows[i].setAttribute('class', `FL026=row-${i}`);
          rows[i].setAttribute('data-order', i);
        }
      };
      addRowOrder();
      /**
       * Now we have the element we can start mapping the sizes.
       */      
      constructTableCells(standardOrOther);
      // // console.log(htmlDiv);
    },
    replaceSizeGuideBtn() {
      const sizeGuideButton = document.querySelector('.FL001_sizeGuideBtn.FL001_sizeGuideBtn--desktop');
      const newButton = `
      <div class="FL026-SG-desktop"><a href="javascript:void(0)"><span>Size guide</span><span class="SizeGuideIco"></span></a></div>
      `;
      if (sizeGuideButton) {
        const previousRef = sizeGuideButton.previousElementSibling;
        if (previousRef) {
          previousRef.insertAdjacentHTML('afterend', newButton);
          sizeGuideButton.remove();
        }
      }
    },
    /**
     * Toggle the new size guide on desktop only.
     */
    toggleSizeGuide() {
      const sizeGuideButton = document.querySelector('.FL026 .FL026-SG-desktop');
      const newSizeGuide = document.querySelector('.FL026-S-G');
      const closeButton = document.querySelector('.FL026-S-G .FL026-close');
      if (sizeGuideButton) {
        sizeGuideButton.addEventListener('click', () => {
          newSizeGuide.classList.remove('FL026-hide');
        });
      }
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          newSizeGuide.classList.add('FL026-hide');
        });
      }
    },
  },
};

export default Experiment;
