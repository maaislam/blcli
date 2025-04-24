import { cacheDom } from './../../../../lib/cache-dom';
import { setup } from './services';

export default {
  /*
   * ProductDiscountGlobalRender should have an item for each product row in the basket
   * If RRP is available the value will be a component instance, otherwise the value will be 'null'
   */
  ProductDiscountGlobalRender: [],
  ProductDiscountRenderAll() {
    let discountExists;

    // Render individual product discounts
    this.ProductDiscountGlobalRender.forEach((component) => {
      if (component) {
        if (!discountExists) discountExists = true;
        component.render();
      }
    });

    // Create totals section
    if (discountExists) {
      let discount;

      // Add 'Total savings' to totals group
      const totalSavings = (() => {
        const element = document.createElement('div');
        element.classList.add('TP121_TotalDiscount');
        element.classList.add('clearfix');

        // Calc totals
        let basketDiscount = 0;
        let basketRRPSubtotal = 0;
        let totalBasketDiscount;
        let productSubtotal = 0;
        this.ProductDiscountGlobalRender.forEach((component) => {
          if (component) {
            basketRRPSubtotal += Number(component.cache.rrpTotal);
            basketDiscount += Number(component.cache.discount);
            productSubtotal += Number(component.cache.subtotal);
            totalBasketDiscount += Number(component.cache.discount);
          }
        });

        // Add vat (20%)
        const vat = productSubtotal / 100 * 20;
        productSubtotal += vat;

        let originalPrice = basketDiscount + productSubtotal;
        
        const percent = basketDiscount / originalPrice * 100;
        
        const percentageDiscount = (100 * basketDiscount) / basketRRPSubtotal;
        discount = Math.round(percentageDiscount);

        if (basketDiscount && percentageDiscount) {
          element.innerHTML = `
            <span class="TP121_TotalDiscount__text">Total savings <span class="TP121_TotalDiscount__subtext">(Inc your trade price and promotions)</span></span>
            <div class="TP121_TotalDiscount__price sessioncamhidetext">      
              <span>£${basketDiscount.toFixed(2)}</span>
              <span>(${percent.toFixed(2)}% off)</span>
            </div>
          `;
        }
        return element;
      })();

      // Only render if discount is at least 10%
      if (discount && discount >= 10) {
        setup();
        if (!document.querySelector('.TP121_TotalDiscount')) {
          cacheDom.get('.basketTotalPrice').insertAdjacentElement('afterend', totalSavings);
        } 
      }
    }
  },
};
