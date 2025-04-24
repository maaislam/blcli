/**
 * TP120 - Mobile basket savings
 * @author User Conversion
 */
import globals from './globals';
import { cacheDom } from './../../../../lib/cache-dom';
import { pollerLite } from '../../../../lib/uc-lib';
import ProductDiscount from './components/ProductDiscount';


const activate = () => {
  const Exp = {
    init() {
      // Create new ProductDiscount component for each product row
      const products = cacheDom.getAll('.baskt_item');
      Array.from(products).forEach((node) => {
        new ProductDiscount(node); // eslint-disable-line
      });

      /*
       * Poll for the ProductDiscountGlobalRender array to contain the same number of items as
       * there are product rows
       * This is to ensure we only render the components when all XHR requests have been
       * successul and to prevent showing misleading information
       */
      pollerLite([
        () => globals.ProductDiscountGlobalRender.length === products.length,
      ], () => {
        globals.ProductDiscountRenderAll.call(globals);
      });

      // Amend 8/1/19
      // Move red savings box just above the checkout cta
      const pageRef = document.querySelector('.total_price_wrapper');
      pollerLite([pageRef, '.total_price_wrapper .TP120_TotalDiscount'], () => {
        const savingsBox = document.querySelector('.total_price_wrapper .TP120_TotalDiscount');
        if (pageRef && savingsBox) {
          pageRef.insertAdjacentElement('beforeend', savingsBox);
        }
        // Amend wrong discount value.
        const totalPrice = document.querySelector('.basketTotalPrice span.sessioncamhidetext');
        const totalSavingsEl = document.querySelector('.TP120_TotalDiscount__price.sessioncamhidetext span:first-of-type');
        const discountPercentage = document.querySelector('.TP120_TotalDiscount__price.sessioncamhidetext span:last-of-type');
        if (totalPrice && totalSavingsEl) {
          const tp = totalPrice.textContent ? parseFloat(totalPrice.textContent.replace('£', '')) : null;
          const ts = totalSavingsEl.textContent ? parseFloat(totalSavingsEl.textContent.replace('-£', '')) : null;
          if (tp && ts) {
            const discount = ts / (tp + ts);
            discountPercentage.textContent = `(${discount.toFixed(2) * 100}% off)`;
          }
        }
      });
    },
  };

  Exp.init();
};

export default activate;
