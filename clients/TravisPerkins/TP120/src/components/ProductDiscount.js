import globals from '../globals';

export default class ProductDiscount {
  /**
   * @param {HTMLElement} product DOM element of a single product row
   */
  constructor(product) {
    this.cache = { product };
    this.fetchRRP();
  }

  /**
   * Pulls in the RRP from the product page
   */
  fetchRRP() {
    const self = this;
    const { cache } = this;
    const url = cache.product.querySelector('.itm_info > h3 > a').href;
    if (url) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = () => {
        const success = request.status >= 200 && request.status < 400;
        if (success) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          const rrp = (() => {
            let el = temp.querySelector('.product_price_section .rrp_price_ex_vat');
            if (el === null) {
              el = temp.querySelector('.product_price_section .price_value');
            }
            return el ? el.innerText.trim() : null;
          })();

          // If RRP exists create component
          if (rrp) {
            cache.rrp = Number(rrp.replace('£', ''));
            self.create();

            /*
             * Push component to a global array
             * This will be rendered when globals.ProductDiscountRenderAll() is called after all
             * XHR requests have recieved a response
             */
            globals.ProductDiscountGlobalRender.push(self);
          } else {
            /*
             * If RRP is unavailable push null to array so we know the XHR response was sucessful
             * and that there is just no RRP for this product
             */
            globals.ProductDiscountGlobalRender.push(null);
          }
        }
      };
      request.send();
    }
  }

  /**
   * Calculate the discount between the product subtotal and the rrp
   */
  calcDiscount() {
    const { cache } = this;
    if (!cache.subtotal) cache.subtotal = Number(cache.product.querySelector('.item_price .originalPrice').innerText.replace(/£|\(Ex VAT\)/g, '').trim());
    if (!cache.productQty) cache.productQty = Number(cache.product.querySelector('input[name="quantity"]').getAttribute('value'));
    if (!cache.rrpTotal) cache.rrpTotal = cache.rrp;

    const discount = cache.rrpTotal - cache.subtotal;
    const percentageDiscount = (100 * discount) / cache.rrpTotal;
    cache.discount = discount.toFixed(2);
    cache.percentageDiscount = Math.round(percentageDiscount.toFixed(2));
  }

  /**
   * Creates component
   */
  create() {
    const { cache } = this;
    this.calcDiscount();
    const element = document.createElement('div');
    element.classList.add('TP120_ProductDiscount');
    const eachProductDiscount = this.cache.discount;
    let ProductDiscountVal;
    if (cache.productQty > 1) {
      ProductDiscountVal = this.cache.discount / cache.productQty;
    } else {
      ProductDiscountVal = this.cache.discount;
    }
    if (ProductDiscountVal !== '0.00') {
      element.innerHTML = `
        <span class="TP120_ProductDiscount__price">£${eachProductDiscount} discount</span>
        <span class="TP120_ProductDiscount__saving">(${this.cache.percentageDiscount}% off)</span>
      `;
    }
    cache.component = element;
  }

  render() {
    this.cache.product.querySelector('.item_price').insertAdjacentElement('afterend', this.cache.component);
  }
}
