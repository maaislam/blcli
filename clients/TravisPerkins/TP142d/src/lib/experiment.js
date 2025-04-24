/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, whatPage } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

const activate = () => {
  setup();

  const currentPage = whatPage();
  if (window.dataLayer && window.dataLayer[0].loggedIn === 'no') {
    events.send(settings.ID, 'Logged Out', 'User not logged in, exit test');
    return false;
  }

  events.send(settings.ID, 'Active', 'Test is active and user is logged in');
  /**
   * PLP
   */
  if (currentPage === 'PLP') {
    pollerLite([
      '.product_price_holder .rrp_price_ex_vat',
      '.price_value',
      '.list_view #products .row .prod'], () => {
      const products = cacheDom.getAll('#products .row .prod');

      if (!products) return;

      Array.from(products, (product) => {
        const productPrice = {
          priceContainer: product.querySelector('.product_price_holder'),
          exVat: () => {
            const exVatEl = product.querySelector('.product_price_holder .rrp_price_ex_vat');
            if (exVatEl && exVatEl.textContent) {
              return exVatEl.textContent.trim();
            }
          },
          eachPrice: () => {
            const priceEl = product.querySelector('.product_price_holder .price_value');
            if (priceEl && priceEl.textContent) {
              return priceEl.textContent.trim();
            }
          },
          measurement: () => {
            const measureEl = product.querySelector('.price_info_holder');
            if (measureEl && measureEl.textContent) {
              return measureEl.textContent.trim();
            }
          },
          savings: () => {
            let savingsAmt;
            let exVatPrice = productPrice.exVat();
            let singlePrice = productPrice.eachPrice();
            if (exVatPrice) {
              exVatPrice = exVatPrice.replace('£', '');
              exVatPrice = exVatPrice.replace(/,/g, '');
            }
            if (singlePrice) {
              singlePrice = singlePrice.replace('£', '');
              singlePrice = singlePrice.replace(/,/g, '');
            }
            if (exVatPrice && singlePrice) {
              savingsAmt = parseFloat(exVatPrice) - parseFloat(singlePrice);
            }
            if (savingsAmt > 0) {
              return savingsAmt.toFixed(2);
            }
          },
        };
        // Rebuild product price element.
        if (productPrice.priceContainer) {
          productPrice.priceContainer.innerHTML = `
            ${productPrice.savings() ? `<div class="TP142d-product-price">
              <div class="TP142d-ex-vat">
                <p><span>${productPrice.eachPrice() ? productPrice.eachPrice() : ''}</span> ${productPrice.measurement() ? productPrice.measurement() : ''}</p>
              </div>

              ${productPrice.savings() ? `<div class="TP142d-savings">
                <p>Logged in savings: <span>£${productPrice.savings()}</span></p>
              </div>` : ''}
            </div>` : productPrice.priceContainer.innerHTML}
          `;
        }
      });

      events.send(settings.ID, 'PLP User Saw', 'User saw new pricing style');
    });
  }

  /**
   * PDP
   */
  if (currentPage === 'PDP') {
    const productPrice = {
      priceContainer: cacheDom.get('.tpInfoWrapper .productPrice'),
      exVat: () => {
        const exVatEl = document.querySelector('.tpInfoWrapper .productPrice .rrp_price_ex_vat');
        if (exVatEl && exVatEl.textContent) {
          return exVatEl.textContent.trim();
        }
      },
      eachPrice: () => {
        const priceEl = document.querySelector('.tpInfoWrapper .productPrice .price_value');
        if (priceEl && priceEl.textContent) {
          return priceEl.textContent.trim();
        }
      },
      measurement: () => {
        const measureEl = document.querySelector('.tpInfoWrapper .productPrice .price_info_holder.uom_value span');
        if (measureEl && measureEl.textContent) {
          return measureEl.textContent.trim();
        }
      },
      savings: () => {
        let savingsAmt;
        let exVatPrice = productPrice.exVat();
        let singlePrice = productPrice.eachPrice();
        if (exVatPrice) {
          exVatPrice = exVatPrice.replace('£', '');
          exVatPrice = exVatPrice.replace(/,/g, '');
        }
        if (singlePrice) {
          singlePrice = singlePrice.replace('£', '');
          singlePrice = singlePrice.replace(/,/g, '');
        }
        // console.log(exVatPrice);
        if (exVatPrice && singlePrice) {
          savingsAmt = parseFloat(exVatPrice) - parseFloat(singlePrice);
        }
        if (savingsAmt > 0) {
          return savingsAmt.toFixed(2);
        }
      },
    };

    // Rebuild product price element.
    if (productPrice.priceContainer) {
      // Keep old price for TP121/120
      const oldPrice = document.querySelector('.feature-can-collect.Guest-Checkout .product_price_section .rrp_price_ex_vat');
      productPrice.priceContainer.innerHTML = `
        ${oldPrice ? `<div class="TP142d-hide product_price_section">${oldPrice.outerHTML}</div>` : ''}
        ${productPrice.savings() ? `<div class="TP142d-product-price">
          ${productPrice.savings() ? `<div class="TP142d-savings">
            <p>Logged in savings: <span>£${productPrice.savings()}</span></p>
          </div>` : ''}
          <div class="TP142d-ex-vat">
            ${productPrice.eachPrice() ? `<p>${productPrice.eachPrice()} <span>(Ex VAT)</span></p>` : ''}
            ${productPrice.measurement() ? `<p><span>${productPrice.measurement()}</span></p>` : ''}
          </div>
        </div>` : productPrice.priceContainer.innerHTML}
      `;
    }

    events.send(settings.ID, 'PDP User Saw', 'User saw new pricing style');
  }

  // Experiment code
};

export default activate;
