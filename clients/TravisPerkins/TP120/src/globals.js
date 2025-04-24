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
      // const totalSavings = (() => {
      //   const element = document.createElement('div');
      //   element.classList.add('TP120_TotalDiscount');

      //   // Calc totals
      //   let basketDiscount = 0;
      //   let basketRRPSubtotal = 0;
      //   this.ProductDiscountGlobalRender.forEach((component) => {
      //     // console.log('PDGR Component, ', component);
      //     if (component) {
            // if (component.cache.productQty > 1) {
            //   basketDiscount += Number(component.cache.discount) * component.cache.productQty;
            // } else {
            //   basketDiscount += Number(component.cache.discount);
            // }
            // basketRRPSubtotal += Number(component.cache.rrpTotal);
      //     }
      //   });
      //   // console.log('basket discount, ', basketDiscount);
      //   // console.log('Basket RRP Subtotal, ', basketRRPSubtotal);
        // const percentageDiscount = (100 * basketDiscount) / basketRRPSubtotal;
      //   discount = Math.round(percentageDiscount);

      //   if (basketDiscount && percentageDiscount) {
      //     element.innerHTML = `
      //       <span class="TP120_TotalDiscount__text">Total savings for logging in<span class="TP120_TotalDiscount__subtext">(Inc your trade price and promotions)</span></span>
      //       <div class="TP120_TotalDiscount__price sessioncamhidetext">      
      //         <span>£${basketDiscount.toFixed(2)}</span>
      //         <span>(${discount}% off)</span>
      //       </div>
      //     `;
      //   }
      //   return element;
      // })();
      const totalSavings = (() => {
        const element = document.createElement('div');
        element.classList.add('TP120_TotalDiscount');
        element.classList.add('clearfix');

        // Calc totals
        let basketDiscount = 0;
        let basketRRPSubtotal = 0;
        let totalBasketDiscount = 0;
        let productSubtotal = 0;
        this.ProductDiscountGlobalRender.forEach((component) => {
          // console.log('component, ', component);
          if (component) {
            // if (component.cache && component.cache.productQty) {
            //   basketDiscount 
            // }
            console.log(component);
            basketRRPSubtotal += Number(component.cache.rrpTotal);
            basketDiscount += Number(component.cache.discount);
            totalBasketDiscount += Number(component.cache.discount) * component.cache.productQty;
            productSubtotal += Number(component.cache.subtotal) * component.cache.productQty;
          }
        });
        // Add vat (20%)
        const vat = productSubtotal / 100 * 20;
        productSubtotal += vat;
        
        let originalPrice = totalBasketDiscount + productSubtotal;
        
        const percent = totalBasketDiscount / originalPrice * 100;
        
        const percentageDiscount = (100 * basketDiscount) / basketRRPSubtotal;
        discount = Math.round(percentageDiscount);

        if (basketDiscount && percentageDiscount) {
          element.innerHTML = `
            <span class="TP120_TotalDiscount__text">Total savings <span class="TP120_TotalDiscount__subtext">(Inc your trade price and promotions)</span></span>
            <div class="TP120_TotalDiscount__price sessioncamhidetext">      
              <span>£${totalBasketDiscount.toFixed(2)}</span>
              <span>(${percent.toFixed(2)}% off)</span>
            </div>
          `;
        }
        return element;
      })();


      // Only render if discount is at least 10%
      if (discount && discount >= 10) {
        setup();
        if (!document.querySelector('.TP120_TotalDiscount')) {
          cacheDom.get('.basketSubtotal').insertAdjacentElement('afterend', totalSavings);
        }
      }
    }
  },
};
