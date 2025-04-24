import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PD035}} - {{Order History Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PD035',
    VARIATION: '{{VARIATION}}',
  },

  cache: (() => {
    const bodyVar = document.body;
    const table = bodyVar.querySelector('table#order_history');
    const tableContainer = bodyVar.querySelector('.item_container_holder.acnt_order_history');
    const addToBagBtns = bodyVar.querySelectorAll('table#order_history tr td[headers="header8"]'); // Stored for later

    return {
      bodyVar,
      table,
      tableContainer,
      addToBagBtns,
    };
  })(),

  init() {
    // Setup
    const { settings, services, cache, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * Loop over table rows and call components
     */
    const tableRows = cache.table.querySelectorAll('tr');
    for (let i = 0; tableRows.length > i; i += 1) {
      // Move 'Date placed' to the begining
      components.moveDates(tableRows[i]);
      // Replace 'Add to bag' CTA's with 'View order'
      components.addViewOrder(tableRows[i]);
      // Add an identifier to the span to determine style positioning
      components.addRowIdentifier(tableRows[i], [i]);
      // Add AJAX and View Order dropdown
      components.addAjaxEvent(tableRows[i]);
      // Toggle dropdowns
      // services.toggleDropdowns(tableRows[i]);
    }

    const headerValue = document.querySelector('#order_history #header7');
    if(headerValue) {
      headerValue.innerHTML = 'Total Value (Incl. Delivery)';
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
    moveDates(row) {
      const dateCellTitle = row.querySelector('th#header5');
      const dateCell = row.querySelector('td[headers="header5"]');
      // Reset identifiers to 0
      if (dateCell) {
        row.insertAdjacentHTML('afterbegin', dateCell.outerHTML);
      }
      if (dateCellTitle) {
        row.insertAdjacentHTML('afterbegin', dateCellTitle.outerHTML);
      }
      // Hide old ones
      const oldDateCellTitle = row.querySelector('th:not(:first-of-type)#header5');
      if (oldDateCellTitle) {
        oldDateCellTitle.classList.add('PD035-hide');
      }
      const oldDateCell = row.querySelector('td:not(:first-of-type)[headers="header5"]');
      if (oldDateCell) {
        oldDateCell.classList.add('PD035-hide');
      }
    },
    addViewOrder(row) {
      const atbLinks = row.querySelector('td[headers="header8"]');
      if (atbLinks) {
        atbLinks.innerHTML = `
          <span class="PD035-view-order">View Order</span>
        `;
      }
    },
    addRowIdentifier(row, int) {
      const viewOrder = row.querySelector('span.PD035-view-order');
      if (viewOrder) {
        viewOrder.setAttribute('data-num', int);
      }
    },
    /**
     * @desc Adds an event listener to the newly added 'View Order' element on click
     * This will AJAX in the order details in which we will use to build the dropdown.
     * @param {Element} row
     */
    addAjaxEvent(row) {
      const orderLink = row.querySelector('td[headers="header1"] a');

      // AJAX Data
      const ajaxPromise = (link) => {
        if (!link) return false;
        return new Promise((relsolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', link);
          xhr.onload = () => relsolve(xhr.responseText);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
        });
      };

      // Bunlde data and build dropdown
      const buildDropdown = (html) => {
        const products = html.querySelectorAll('table#your_order tbody tr');
        // Cache HTML elements in object
        const htmlObjects = [];
        // Asign to object
        if (products.length > 0) {
          for (let i = 0; products.length > i; i += 1) {
            let image = products[i].querySelector('td.product_image a');
            if (image) {
              image = image.outerHTML;
            } else {
              image = products[i].querySelector('td.product_image .not_available').outerHTML;
            }
            htmlObjects[i] = {
              imgage: image,
              name: products[i].querySelector('td.product_details h2').outerHTML,
              qty: products[i].querySelector('td.quantity').textContent,
              price: products[i].querySelector('td.basePrice').textContent,
              discount: products[i].querySelector('td.discount').textContent,
              webPrice: products[i].querySelector('td.webPrice').textContent,
              total: products[i].querySelector('td.total').textContent,
            };
          }
        }
        // Cache total order elements (Value, delivery etc)
        let totalOrder = {};

        // Get order total table
        const orderTotalData = html.querySelector('.orderPage dl.order_totals');

        // Assign to totalOrder object
        if (orderTotalData) {
          totalOrder = {
            subtotal: orderTotalData.querySelector('dd.subtotal').textContent,
            delivery: orderTotalData.querySelector('dd:nth-of-type(2)').textContent.trim(),
            vat: orderTotalData.querySelector('dd:nth-of-type(3)').textContent,
            overallTotal: orderTotalData.querySelector('dd.grandTotal').textContent,
            addOrderBtn: html.querySelector('.orderDetailsBlock .reorder > form'),
          };
        }

        // Initially open as click occurs before
        const htmlToAdd = `
        <tr class="PD035-dropdown-row">
          <td colspan="7">
            <table class="PD035-order-dropdown">
              <thead>
                <tr class="PD035-order-titles">
                  <th class="PD035-ib" id="PD035-h-one">
                    <p></p>
                  </th>
                  <th class="PD035-ib" id="PD035-h-two">
                    <p>Product Name</p>
                  </th>
                  <th class="PD035-ib" id="PD035-h-three">
                    <p>Quantity</p>
                  </th>
                  <th class="PD035-ib" id="PD035-h-four">
                    <p>Item Price</p>
                  </th>
                  <th class="PD035-ib" id="PD035-h-five">
                    <p>Discount</p>
                  </th>
                  <th class="PD035-ib" id="PD035-h-six">
                    <p>Web Price</p>
                  </th>
                  <th class="PD035-ib" id="PD035-h-seven">
                    <p>Total</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${htmlObjects.map((product, i) => `
                <tr class="PD035-orders">
                  <td class="PD035-ib PD035-order--image">
                    ${product.imgage}
                  </td>
                  <td class="PD035-ib PD035-order--name">
                    ${product.name}
                  </td>
                  <td class="PD035-ib PD035-order--qty">
                    ${product.qty}
                  </td>
                  <td class="PD035-ib PD035-order--price">
                    ${product.price}
                  </td>
                  <td class="PD035-ib PD035-order--discount">
                    ${product.discount}
                  </td>
                  <td class="PD035-ib PD035-order--webPrice">
                    ${product.webPrice}
                  </td>
                  <td class="PD035-ib PD035-order--total">
                    ${product.total}
                  </td>
                </tr>
                `).join('')}
                <tr class="PD035-order-sum">
                  <th>
                    Subtotal: &nbsp;${totalOrder.subtotal}
                  </th>
                  <th>
                    Delivery: &nbsp;${totalOrder.delivery}
                  </th>
                  <th>
                    VAT @ 20%: &nbsp;${totalOrder.vat}
                  </th>
                  <th>
                    Total: &nbsp;${totalOrder.overallTotal}
                  </th>
                  <th colspan="3">
                    ${totalOrder.addOrderBtn.outerHTML}
                  </th>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        `;

        return htmlToAdd;
      };

      const viewOrderElement = row.querySelector('span.PD035-view-order');

      if (viewOrderElement && orderLink) {
        const orderLinkHref = orderLink.getAttribute('href');
        viewOrderElement.addEventListener('click', () => {
          // Event
          events.send(Experiment.settings.ID, 'Clicked', 'View Order');

          const hasDropdown = row.nextElementSibling;

          // If the dropdown element DOES NOT exist
          if (hasDropdown && !hasDropdown.classList.contains('PD035-dropdown-row') || hasDropdown === null) {

            ajaxPromise(orderLinkHref)
              .then((val) => {
                const html = document.createElement('div');
                html.innerHTML = val;
                // Begin grabbing elements from order page
                const dropdownHTML = buildDropdown(html);
                // Attach to clicked TD
                row.insertAdjacentHTML('afterend', dropdownHTML);
                // Add the slideDown class to this dropdown
                const thisDropdown = row.nextElementSibling;
                if (thisDropdown && thisDropdown.classList.contains('PD035-dropdown-row')) {
                  if (thisDropdown.querySelector('.not_available')) {
                    // Add class to disable 'Add full order to basket'
                    thisDropdown.classList.add('PD035-not-available');
                  }
                  // Add class as to not add multiple times.
                  thisDropdown.classList.add('PD035-added-table');
                  // Slide down
                  thisDropdown.classList.add('PD035-slideDown');

                  // Add 'target_blank' to links
                  const addedProducts = thisDropdown.querySelectorAll('.PD035-orders a');
                  if (addedProducts) {
                    for (let i = 0; addedProducts.length > i; i += 1) {
                      addedProducts[i].setAttribute('target', '_blank');
                      // Event(s)
                      addedProducts[i].addEventListener('click', () => {
                        events.send(Experiment.settings.ID, 'Click', 'View product through dropdown');
                      });
                    }
                  }

                  // Amend add to bag button text
                  const atbButton = thisDropdown.querySelectorAll('.PD035-order-sum button.positive');
                  if (atbButton) {
                    for (let i = 0; atbButton.length > i; i += 1) {
                      atbButton[i].textContent = 'Add Full Order to Basket';
                      // Event
                      atbButton[i].addEventListener('click', () => {
                        events.send(Experiment.settings.ID, 'Clicked', 'Add Full order to basket');
                      });
                    }
                  }
                }
              }).catch((reason) => {
                console.error(reason);
              });
          }
          // Dropdown element DOES exist, just toggle
          if (hasDropdown && hasDropdown.classList.contains('PD035-dropdown-row')) {
            const dropdownElement = row.nextElementSibling;

            if (dropdownElement) {
              dropdownElement.classList.toggle('PD035-slideDown');
            }
          }

          // Close all other dropdowns
          const otherDropdowns = Experiment.cache.bodyVar.querySelectorAll('.PD035-dropdown-row');
          const thisDropdown = row.nextElementSibling;
          if (otherDropdowns) {
            for (let k = 0; otherDropdowns.length > k; k += 1) {
              if (thisDropdown !== otherDropdowns[k]) {
                otherDropdowns[k].classList.remove('PD035-slideDown');
              }
            }
          }
        });
      }
    },
  },
};

export default Experiment;
