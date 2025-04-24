/**
 * TP121 - Desktop basket savings
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

        // Amend 17.1.19 Move discount prices below item price.
        const cartProducts = document.querySelectorAll('.baskt_item');
        if (cartProducts.length) {
          for (let i = 0; cartProducts.length > i; i += 1) {
            const discountEl = cartProducts[i].querySelector('.TP121_ProductDiscount');
            if (discountEl) {
              const productRef = cartProducts[i].querySelector('.itm_price');
              if (productRef) {
                productRef.insertAdjacentElement('beforeend', discountEl);
              }
            }
          }
        }

        // Amend
        const totalPrice = document.querySelector('.feature-design .basket .total_price_wrapper .basketTotalPrice span');
        const totalSavingsEl = document.querySelector('.TP121 .TP121_TotalDiscount__price > span:first-of-type');
        const discountPercentage = document.querySelector('.TP121 .TP121_TotalDiscount__price > span:last-of-type');
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
