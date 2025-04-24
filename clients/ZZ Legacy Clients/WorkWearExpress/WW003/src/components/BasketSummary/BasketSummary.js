import settings from '../../lib/settings';
import {
  getColours,
  invertColor,
  Animation,
  events,
} from '../../../../../../lib/utils';
import StickySidebar from '../../vendor/stickySidebar';

const { ID } = settings;

export default class BasketSummary {
  constructor() {
    this.getData();
    if (!this.productsData.length) {
      return false;
    }

    BasketSummary.loadBasketPage().then((data) => {
      this.basketPage = data;
      this.currency = (() => {
        const selected = data.querySelector('#current_currency_2').getAttribute('data-currency');
        let symbol;
        switch (selected) {
          case 'GBP':
            symbol = '£';
            break;

          case 'USD':
            symbol = '$';
            break;

          case 'EURO':
            symbol = '€';
            break;

          default:
            symbol = this.data.currencyCode;
        }
        return symbol;
      })();
      this.create();
      this.bindEvents();
      this.addAdditionalProductData();
      this.renderPrices();
      this.renderShipping();
      this.render();
      this.stickSidebar();
    }).catch((e) => {
      // Promise rejected
      console.log(e);
      events.send(ID, 'Error', 'Failed to load basket contents');
    });
  }

  /**
   * Determines the background colour of a custom logo by inverting the most common colour
   * @returns {string} HEX code
   */
  static getBackgroundColour(image) {
    const colours = getColours(image);

    // Get the most common colour from the image
    // Push all colours into an array
    const coloursArr = [];
    [].forEach.call(Object.keys(colours), (colour) => {
      coloursArr.push({
        colour,
        freq: colours[colour],
      });
    });

    // Sort array by most frequent and reverse for descending order
    // The most common colour will now be the first item in the array
    coloursArr.sort((a, b) => a.freq - b.freq).reverse();
    const primaryColour = coloursArr[0].colour;

    // Determine whether the background should be black or white for the best contrast
    return invertColor(primaryColour, true, 230);
  }

  /** Load in basket page to obtain product info that doesn't exist on checkout */
  static loadBasketPage() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/basket', true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          resolve(temp);
        } else {
          reject();
        }
      };
      request.onerror = reject;
      request.send();
    });
  }

  /**
   * Converts a shortened size label to a full one (e.g. M -> Medium (M))
   * @param {string} size Shortened size label (e.g. M)
   * @returns {string}
   */
  static getFullSizeLabel(size) {
    let label;
    switch (size) {
      case 'S':
        label = 'Small (S)';
        break;

      case 'M':
        label = 'Medium (M)';
        break;

      case 'L':
        label = 'Large (L)';
        break;

      case 'XL':
        label = 'Extra Large (XL)';
        break;

      case 'OS':
        label = 'One Size';
        break;

      // Sizing for ties and scarves is an empty string in the dataLayer
      case 'ONE SIZE':
        label = 'One Size';
        break;

      case '':
        label = 'One Size';
        break;

      default:
        label = size;
        break;
    }

    return label;
  }

  /** Store data from data layer */
  getData() {
    // Data layer
    this.data = (() => {
      let dataObject;
      for (let i = 0; i < window.dataLayer.length; i += 1) {
        const data = window.dataLayer[i];
        if (typeof data === 'object' && data.ecommerce) {
          dataObject = data.ecommerce;
          break;
        }
      }
      return dataObject;
    })();

    // Product data
    this.productsData = this.data.checkout.products;
  }

  /**
   * Get and render product images and customisation options
   */
  addAdditionalProductData() {
    const { basketPage, productData, component } = this;
    const products = basketPage.querySelectorAll('.productrow');

    /**
     * Scrape the value from a heading in the additional info
     * @param {HTMLElement} info
     * @param {string} heading
     */
    const getInfoData = (info, heading) => {
      const categories = [].filter.call(info.children, el => el.nodeName === 'STRONG');
      let value;
      categories.forEach((el) => {
        const isHeading = el.innerText === heading; // e.g. 'Colour:';
        if (isHeading) value = el.nextSibling.textContent.trim();

        // Fix for getting locations on bundles
        // Needed as there is a BR tag after the heading
        if (value === '' && el.nextSibling.nodeName === 'BR' && el.nextSibling.nextSibling && el.nextSibling.nextSibling.nodeType === 3) {
          value = el.nextSibling.nextSibling.textContent.trim();
        }
      });
      return value;
    };

    [].forEach.call(products, (product) => {
      // Product data
      const dataEls = product.querySelectorAll('td');
      const info = dataEls[1];
      const bundleInfo = [].filter.call(info.childNodes, node => node.nodeName === 'SMALL');
      const isBundle = bundleInfo.length > 0;
      const name = info.querySelector('a').innerText.trim();
      let customId;
      let colour;
      let size;
      let group;
      let thisProductEl;

      if (isBundle) {
        customId = `bundle ${name.toLowerCase()}`;
        group = productData[customId];
        thisProductEl = component.querySelector(`.${ID}_BasketSummary-product[data-id="${customId}"]`);
        const variations = thisProductEl.querySelectorAll(`.${ID}_BasketSummary-product-variations > tbody > tr`);

        // Render bundle data in first empty container
        for (let i = 0; i < variations.length; i += 1) {
          const row = variations[i];
          const firstData = row.querySelectorAll('td')[0];
          if (firstData && firstData.innerText === '') {
            // Wrap all text nodes from bundle data in P tag for styling purposes
            [].forEach.call(bundleInfo[0].childNodes, (node) => {
              if (node.nodeType === 3 && node.textContent.trim() !== '') {
                const el = document.createElement('p');
                el.className = `${ID}_BasketSummary-bundle-item`;
                el.innerHTML = node.textContent;
                bundleInfo[0].insertBefore(el, node);
                bundleInfo[0].removeChild(node);
              }
            });
            firstData.innerHTML = bundleInfo[0].innerHTML.trim().replace(/<br>/g, '');
            break;
          }
        }
      } else {
        colour = getInfoData(info, 'Colour:');
        size = getInfoData(info, 'Size:');
        customId = `${name.toLowerCase()}|${colour.toLowerCase()}`;
        group = productData[customId];
        thisProductEl = component.querySelector(`.${ID}_BasketSummary-product[data-id="${customId}"]`);

        /*
        * For some products the size in the dataLayer is not the full size. For example,
        * a suit jacket of 42, Regular will only show as 42 in the dataLater.
        * We need to account for these by looking for comma separated sizes on the basket page
        * and replacing the matching checkout summary sizes with them
        */
        const isExtendedSize = size.indexOf(',') > -1;
        if (isExtendedSize) {
          const shortenedSize = size.match(/(.+),/)[1];
          const basketSummaryRow = thisProductEl.querySelector(`tr[data-size="${shortenedSize}"]`);
          if (basketSummaryRow) {
            basketSummaryRow.setAttribute('data-size', size);
            basketSummaryRow.children[0].innerText = size;
          }
        }
      }

      // Render product image
      let img = dataEls[0].querySelector('img').src;
      if (!img) img = 'https://www.workwearexpress.com/images-products/small/noimg.gif';
      group.img = img;
      const productImgEl = thisProductEl.querySelector(`.${ID}_BasketSummary-product-image`);
      productImgEl.innerHTML = `<img src="${img}" />`;

      // Get customisation options
      const nextEl = product.nextElementSibling;
      const hasCustomisation = nextEl && nextEl.classList.contains('customisationrow');
      if (hasCustomisation) {
        const customisationRow = nextEl;
        const cDataEls = customisationRow.querySelectorAll('td');
        const cPrice = cDataEls[4].innerText.trim().replace('+', '');
        const cInfo = cDataEls[1].querySelector('.customisation_info');

        /**
         * Scrapes data and renders customisation from supplied nodes
         * @param {array|HTMLCollection} customisation Collection of nodes for this customisation
         */
        const processCustomisation = (customisationNodes, i, totalCustomisations) => {
          // Push nodes to an element so we can use querySelector
          const customisation = document.createElement('div');
          customisationNodes.forEach((node) => {
            customisation.appendChild(node);
          });

          // Get heading
          const cHeadingEls = customisation.querySelectorAll('strong');
          const cType = cHeadingEls[0].innerText.trim();

          // If you add a bundle without a customisation applied it the first heading will be
          // 'Locations:' without a value. If this is the case don't continue
          if (cType === 'Locations:') return false;

          // Get image
          const cImage = (() => {
            const cImgHeading = [].filter.call(cHeadingEls, (el, j) => j > 0 && el.innerText.trim() === 'Image:');
            return cImgHeading.length && cImgHeading[0].nextElementSibling.nodeName === 'A' ? cImgHeading[0].nextElementSibling.href : null;
          })();

          // Get rest of data
          const cData = (() => {
            const data = [];
            const cOptions = [].filter.call(cHeadingEls, (el, j) => {
              const isHeading = j === 0;
              const isImage = cImage && el.innerText.trim() === 'Image:';
              return !isHeading && !isImage;
            });
            const cHeadings = cOptions.map(el => el.innerText.trim());
            cHeadings.forEach((heading) => {
              data.push([heading, getInfoData(customisation, heading)]);
            });
            return data;
          })();

          // Get edit link
          const editLink = (() => {
            const links = customisation.querySelectorAll('a');
            const edit = [].filter.call(links, link => link.innerText.trim() === 'edit these options');
            return edit.length ? edit[0].href : null;
          })();

          const contactForImage = cData.filter(data => data[0] === 'Image:' && data[1] === 'Contact Me').length > 0;

          // Render customisation option
          let sizeRow;
          if (isBundle) {
            const content = bundleInfo[0].innerText.trim().replace(/\s/g, '');
            const thisProductVariations = thisProductEl.querySelectorAll(`.${ID}_BasketSummary-product-variations > tbody > tr`);
            sizeRow = [].filter.call(thisProductVariations, (variation) => {
              const firstData = variation.children[0];
              if (firstData.nodeName === 'TD') {
                const thisContent = firstData.innerText.trim().replace(/\s/g, '');
                return thisContent === content;
              }
            })[0];
          } else {
            sizeRow = thisProductEl.querySelector(`tr[data-size="${size}"]`);
          }
          if (!sizeRow) return false;
          sizeRow.insertAdjacentHTML('afterend', `
            <tr class="${ID}_BasketSummary-customisation-row">
              <td colspan="3">
                <table class="${ID}_BasketSummary-customisation${cImage || contactForImage ? ` ${ID}_BasketSummary-customisation--hasImage` : ''}">
                  <tr>
                    ${!cImage ? '' : `
                      <td class="${ID}_BasketSummary-customisation-img">
                        <a href="${cImage}" target="_blank">
                          <img src="${cImage}" />
                        </a>
                      </td>
                    `}
                    ${!contactForImage ? '' : `
                      <td class="${ID}_BasketSummary-customisation-img">
                        <a href="https://www.workwearexpress.com/images/custimage-tbp.png" target="_blank">
                          <img src="https://www.workwearexpress.com/images/custimage-tbp.png" />
                        </a>
                      </td>
                    `}
                    <td class="${ID}_BasketSummary-customisation-options">
                      <table>
                        <tr>
                          <td><em>${cType}<em></td>
                        </tr>
                        ${cData.map(data => `<tr><td>${data[0]} ${data[1]}</td></tr>`).join('')}
                        ${!editLink ? '' : `
                          <tr>
                            <td><a class="${ID}_BasketSummary-customisation-edit" href="${editLink}">Edit</a></td>
                          </tr>
                        `}
                      </table>
                    </td>
                    ${i === totalCustomisations - 1 ? `<td class="${ID}_BasketSummary-customisation-price">+${cPrice}<div><small>per item</small></div></td>` : ''}
                  </tr>
                </table>
              </td>
            </tr>
          `);

          // If a custom logo exists, get the background colour for it
          if (cImage) {
            const image = new Image();

            // Wait for image to load before doing this as we need the full image data
            const cImageEl = sizeRow.nextElementSibling.querySelector(`.${ID}_BasketSummary-customisation-img`);
            image.onload = () => {
              if (cImageEl) {
                const cImageBgColour = BasketSummary.getBackgroundColour(cImageEl.querySelector('img'));
                const cImageLink = cImageEl.querySelector('a');
                cImageLink.style.backgroundColor = cImageBgColour;
              }
            };

            image.src = cImage;
          }
        };

        /**
         * Products can have more than one customisation applied. Split
         * the child nodes into groups for each customisation. Customisations
         * are separated by two BR tags
         * @returns {array}
         */
        const customisations = (() => {
          const groups = [];
          let groupEls = [];
          const { childNodes } = cInfo;
          for (let i = 0; i < childNodes.length; i += 1) {
            const node = childNodes[i];
            const { nodeName, nextElementSibling } = node;
            if (nodeName === 'BR' && nextElementSibling && nextElementSibling.nodeName === 'BR') {
              // Register all nodes up to now as a group and push to groups array
              groups.push(groupEls);

              // Start a new group
              groupEls = [];

              // Skip over the two BR tags separating the groups
              i += 1;
            } else {
              // Push node as part of current group
              groupEls.push(node);

              // If last node, push current nodes as a group
              if (i >= childNodes.length - 1) {
                groups.push(groupEls);
              }
            }
          }

          return groups;
        })();

        customisations.forEach((customisation, i) => {
          processCustomisation(customisation, i, customisations.length);
        });
      }
    });
  }

  /** renderPrices */
  renderPrices() {
    const { component, mobileTrigger, basketPage } = this;
    const priceTable = basketPage.querySelector('#basket_summary');

    // Extract prices
    const priceData = {};
    const priceRows = priceTable.querySelectorAll('tr');
    [].forEach.call(priceRows, (row) => {
      const heading = row.querySelector('th').innerText.trim();
      const value = row.querySelector('td').innerText.trim();
      priceData[heading] = value;
    });

    // Render
    const thisPriceTable = component.querySelector(`.${ID}_BasketSummary-pricing`);
    const rowsToRender = ['Logo Setup Charge', 'Personalisation Total', 'Delivery', 'Discount', 'VAT'];
    /* eslint-disable no-confusing-arrow */
    thisPriceTable.innerHTML = `
      <div class="${ID}_BasketSummary-pricing-subtotals">
        <table>
          <tbody>
            ${rowsToRender.map(row => !priceData[row] ? '' : `
              <tr>
                <th width="75%">${row}</th>
                <td width="25%">${priceData[row]}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="${ID}_BasketSummary-pricing-total">Total Price: ${priceData['Order Total']}</div>
    `;
    /* eslint-enable no-confusing-arrow */

    mobileTrigger.querySelector(`.${ID}_BasketSummary-mobile-basket-total`).innerHTML = priceData['Order Total'];

    this.priceData = priceData;
  }

  /** renderShipping */
  renderShipping() {
    const { component, basketPage } = this;
    const shippingForm = basketPage.querySelector('form[action="https://www.workwearexpress.com/scripts/modshipping.php"]');

    // Create markup
    let courierDefined = false;
    const shippingMethod = (() => {
      const img = shippingForm.querySelector('label[for="ship_method"] img');
      if (img) {
        courierDefined = true;
        return img.outerHTML;
      } else {
        return shippingForm.querySelector('label[for="ship_method"] br').nextSibling.textContent.trim();
      }
    })();
    const estimatedDispatchEl = shippingForm.querySelector('.delivery_date');
    const innerMarkup = (() => {
      let str;
      if (estimatedDispatchEl) {
        // Delivery data exists
        const monthNameMap = {
          JAN: 'January',
          FEB: 'Feburary',
          MAR: 'March',
          APR: 'April',
          MAY: 'May',
          JUN: 'June',
          JUL: 'July',
          AUG: 'August',
          SEP: 'September',
          OCT: 'October',
          NOV: 'November',
          DEC: 'December',
        };
        const text = estimatedDispatchEl.innerText.trim();
        const month = monthNameMap[text.match(/[a-z|A-Z]+/)[0].toUpperCase()];
        const date = text.match(/\d+/)[0];
        const lastNum = date[date.length - 1];
        const suffix = lastNum === '1' ? 'st' : lastNum === '2' ? 'nd' : lastNum === '3' ? 'rd' : 'th';
        str = `
          <span class="${ID}_BasketSummary-shipping-icon"></span>
          <p><em>Estimated Dispatch: ${month} ${date}${suffix}</em> ${courierDefined ? 'by' : '-'} </p>
          ${courierDefined ? `<span class="${ID}_BasketSummary-shipping-courier">${shippingMethod}</span>` : shippingMethod}
        `;
      } else {
        if (courierDefined) {
          str = `<p>Delivery by <span class="${ID}_BasketSummary-shipping-courier">${shippingMethod}</span></p>`;
        } else {
          str = `<p>Shipping Method: ${shippingMethod}</p>`;
        }
      }
      return str;
    })();

    // Render
    const thisShippingSection = component.querySelector(`.${ID}_BasketSummary-shipping`);
    thisShippingSection.innerHTML = innerMarkup;
  }

  /** Create component */
  create() {
    /*
     * Group products together by type and colour so we can show
     * multiple sizes in the same section
     */
    const groupedProducts = {};
    [].forEach.call(this.productsData, (data) => {
      let customId;
      let group;

      if (data.id.indexOf('CUSTOMISATION') > -1) {
        // Skip customisation fields
        return false;
      } else if (data.id === 'BUNDLE') {
        // Bundle products
        customId = `bundle ${data.name.toLowerCase().trim()}`;
        group = groupedProducts[customId] || { products: [] };
        group.isBundle = true;
      } else {
        // Normal products
        customId = `${data.brand.toLowerCase()} ${data.name.toLowerCase().trim()}|${data.variant.toLowerCase()}`;
        group = groupedProducts[customId] || { products: [] };
      }

      // Create/add to group data
      group.products.push(data);
      if (!group.name) group.name = data.name;
      if (!group.id) group.id = data.id;
      if (!group.brand) group.brand = data.brand;
      if (!group.colour) group.colour = data.variant;
      if (!group.customId) group.customId = customId;

      // Save group
      groupedProducts[customId] = group;
    });
    this.productData = groupedProducts;

    const element = document.createElement('div');
    element.classList.add(`${ID}_BasketSummary`);

    /* eslint-disable indent */
    element.innerHTML = `
      <div class="${ID}_BasketSummary-head">
        <h2>Basket Summary</h2>
        <a href="/basket/">Edit Basket</a>
        <div class="${ID}_BasketSummary-close">×</div>
      </div>
      <div class="${ID}_BasketSummary-body">
      <div class="${ID}_BasketSummary-products">
        ${[].map.call(Object.keys(groupedProducts), ((key) => {
          const group = groupedProducts[key];
          return `
            <div class="${ID}_BasketSummary-product" data-id="${group.customId}">
              <div class="${ID}_BasketSummary-product-head">
                <div class="${ID}_BasketSummary-product-image"></div>
                <div class="${ID}_BasketSummary-product-name">
                  ${!group.brand ? '' : `${group.brand} `}${group.name}
                  ${!group.colour ? '' : `<span class="${ID}_BasketSummary-product-colour">${group.colour}</span>`}
                </div>
              </div>
              <div class="${ID}_BasketSummary-product-body">
                <table class="${ID}_BasketSummary-product-variations">
                  <tr>
                    ${group.isBundle ? `
                      <th>Bundles:</th>
                      <th>Price</th>
                    ` : `
                      <th width="60%">Sizes:</th>
                      <th width="20%">Qty</th>
                      <th width="20%">Price</th>
                    `}
                  </tr>
                  ${group.products.map(product => `
                    ${group.isBundle ? `
                    <tr>
                      <td></td>
                    ` : `
                    <tr data-size="${product.size ? product.size : 'One Size'}">
                      <td>${BasketSummary.getFullSizeLabel(product.size)}</td>
                      <td>${product.quantity}</td>
                    `}
                      <td><span class="${ID}_currency">${this.currency}</span>${(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
            </div>
          `;
        })).join('')}
      </div>
      <div class="${ID}_BasketSummary-shipping-and-pricing">
        <div class="${ID}_BasketSummary-shipping"></div>
        <div class="${ID}_BasketSummary-pricing"></div>
      </div>
      </div>
    `;
    /* eslint-enable indent */

    const mobileTrigger = document.createElement('div');
    mobileTrigger.className = `${ID}_BasketSummary-mobile-trigger`;
    mobileTrigger.innerHTML = `
      <div class="${ID}_BasketSummary-arrow-image"></div>
      <div class="${ID}_BasketSummary-mobile-trigger-inner">
        <div class="${ID}_BasketSummary-basket-image"></div>
        <p>Basket Summary</p>
        <p class="${ID}_BasketSummary-mobile-basket-total"></p>
      </div>
    `;

    const overlay = document.createElement('div');
    overlay.className = `${ID}_BasketSummary-overlay`;

    this.overlay = overlay;
    this.component = element;
    this.mobileTrigger = mobileTrigger;
  }

  /** Bind event handlers */
  bindEvents() {
    const { component, mobileTrigger, overlay } = this;
    const close = component.querySelector(`.${ID}_BasketSummary-close`);
    const shippingSection = component.querySelector(`.${ID}_BasketSummary-shipping-and-pricing`);
    const products = component.querySelector(`.${ID}_BasketSummary-products`);

    const ctrls = {
      open: () => {
        const slideAnim = new Animation({
          elem: component,
          style: 'right',
          unit: '%',
          from: -100,
          to: 0,
          time: 300,
          beforeAnim: () => {
            component.classList.add(`${ID}_BasketSummary--show`);
            events.send(ID, 'Opened', 'Mobile - opened basket');
          },
          afterAnim: () => {
            // Set top padding of product list to same height as shipping section for mobile
            products.style.paddingTop = `${shippingSection.offsetHeight}px`;
          },
        });

        const overlayAnim = new Animation({
          elem: overlay,
          style: 'opacity',
          unit: '',
          from: 0,
          to: 1,
          time: 300,
          beforeAnim: () => {
            overlay.classList.add(`${ID}_BasketSummary-overlay--show`);
          },
        });
      },

      close: () => {
        const slideAnim = new Animation({
          elem: component,
          style: 'right',
          unit: '%',
          from: 0,
          to: -100,
          time: 300,
          afterAnim: () => {
            component.classList.remove(`${ID}_BasketSummary--show`);
            events.send(ID, 'Closed', 'Mobile - closed basket');
          },
        });

        const overlayAnim = new Animation({
          elem: overlay,
          style: 'opacity',
          unit: '',
          from: 1,
          to: 0,
          time: 300,
          afterAnim: () => {
            overlay.classList.remove(`${ID}_BasketSummary-overlay--show`);
          },
        });
      },
    };
    mobileTrigger.addEventListener('click', () => {
      ctrls.open();
    });
    close.addEventListener('click', () => {
      ctrls.close();
    });
    overlay.addEventListener('click', () => {
      ctrls.close();
    });
    component.querySelector('a[href="/basket/"]').addEventListener('click', () => {
      events.send(ID, 'Clicked', 'Edit basket');
    });
    const editLinks = component.querySelectorAll(`.${ID}_BasketSummary-customisation-edit`);
    [].forEach.call(editLinks, (link) => {
      link.addEventListener('click', () => {
        events.send(ID, 'Clicked', 'Edit customisation option');
      });
    });
  }

  /** Stick right side of page on scroll with StickySidebar plugin */
  stickSidebar() {
    this.sidebar = new StickySidebar(`.${ID}_page-right`, {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: `.${ID}_page-container`,
    });
  }

  /** Render component */
  render() {
    const { component, mobileTrigger, overlay } = this;
    const content = document.querySelector('#site_torso');

    // Split page content into 2 columns
    const container = document.createElement('div');
    container.className = `${ID}_page-container`;

    const pageLeft = document.createElement('div');
    pageLeft.className = `${ID}_page-left`;
    while (content.childNodes.length > 0) pageLeft.appendChild(content.childNodes[0]);

    const pageRight = document.createElement('div');
    pageRight.className = `${ID}_page-right`;
    pageRight.appendChild(component);

    container.appendChild(pageLeft);
    container.appendChild(pageRight);
    content.appendChild(container);

    const progressBar = content.querySelector('#travelator');
    content.insertAdjacentElement('afterbegin', progressBar);

    // Mobile trigger
    const logo = document.querySelector('#header_logo');
    logo.insertAdjacentElement('afterend', mobileTrigger);

    // Overlay
    container.appendChild(overlay);
  }
}
