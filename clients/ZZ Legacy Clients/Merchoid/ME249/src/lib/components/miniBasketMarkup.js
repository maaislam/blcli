import shared from "../shared";

const { ID } = shared;


export default class MiniBasket {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}_miniBasketContainer`);
      element.innerHTML = `
        <div class="${ID}_basket-close"></div>
        <div class="${ID}_title-container">
            <h3>Basket</h3>
            <p class="${ID}_basketAmount"><span></span> Items</p>
        </div>

        <div class="${ID}_addedMessage">
            <span>Product successfully added to bag</span>
        </div>

        <div class="${ID}-basketSteps">
          <div class="${ID}-stepsInner">
            <div class="${ID}-step"><span></span><div class="${ID}-stepText">Cart</div></div>
            <div class="${ID}-step"><span><p>2</p></span><div class="${ID}-stepText">Checkout</div></div>
            <div class="${ID}-step"><span><p>3</p></span><div class="${ID}-stepText">Complete</div></div>
          </div>
          <div class="${ID}-stepMessage">You're only 2 steps away from purchasing this awesome merch!</div>
        </div>
       
        
        <div class="${ID}_basket-items_wrapper">
            <div class="${ID}-products"></div>
            <div class="${ID}-actionBlock">
                <div class="${ID}-total">
                    <p>Total:</p>
                    <p class="${ID}-price"></p>
                </div>
                <a class="${ID}_voucher" href="/checkout/cart/?voucherAdd=1">Add voucher code</a>
                <div class="${ID}_CTAs">
                ${shared.VARIATION === '1' ? 
                ` <div class="${ID}_checkout_wrap">
                    <div class="${ID}_button ${ID}_checkout"><a href="/checkout/">Checkout</a></div>
                    <div class="${ID}_button ${ID}_paypal"><span></span> Checkout</div>
                  </div>
                  <div class="${ID}_button ${ID}_basket"><a href="/checkout/cart/">View Basket</a></div>
                  <div class="${ID}_link">Continue Shopping</div>` : 
                  
                  `<div class="${ID}_link">Continue Shopping</div>
                   <div class="${ID}_button ${ID}_basket"><a href="/checkout/cart/">View Basket</a></div>
                   <div class="${ID}_checkout_wrap">
                    <div class="${ID}_button ${ID}_checkout"><a href="/checkout/">Checkout</a></div>
                    <div class="${ID}_button ${ID}_paypal"><span></span> Checkout</div>
                  </div>`}

                </div>
            </div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('.page-wrapper').appendChild(component);
      document.querySelector('.page-wrapper').insertAdjacentHTML('beforeend', `<div class="${ID}_overlay"></div>`);
    }
  }
  
