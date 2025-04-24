import shared from "./shared";

const { ID, VARIATION } = shared;

export default class MiniBasket {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-miniBasketWrapper`);
      element.innerHTML = `
       <div class="${ID}-miniBasketInner">
        <div class="${ID}-close"></div>
            <h3>Basket</h3>
            <div class="${ID}-basketContent">
                <div class="${ID}-products">
                </div>
                <div class="${ID}-basketTotal">
                    
                    <div class="${ID}-totalText">Subtotal <div class="${ID}-itemCount">(<span class="${ID}-itemNo"></span> items)</div></div>
                    <div class="${ID}-totalPriceText"><span class="${ID}-totalPrice"></span></div>
                </div>
                <div class="${ID}-buttons">
                    
                    ${VARIATION === '1' ? `
                    <a class="${ID}-basketButton ${ID}-continue">Continue shopping</a>
                    <a class="${ID}-basketButton  ${ID}-checkout" href="/OrderItemDisplay">Checkout</a>` :
                    `<a class="${ID}-basketButton ${ID}-continue" href="/OrderItemDisplay">View basket</a>
                    <a class="${ID}-basketButton  ${ID}-checkout" href="/OrderItemDisplay">Checkout</a>`
                  }
                </div>
                
            </div>
       </div>
      `;
      this.component = element;

    }
  
    bindEvents() {
      const { component } = this;

      const closeBasket = () => {
        document.body.classList.remove(`${ID}-noScroll`);
        document.querySelector(`.${ID}-miniBasketWrapper`).classList.remove(`${ID}-activeBasket`);
        document.querySelector(`.${ID}-basketOverlay`).classList.remove(`${ID}-overlayActive`);

        const miniBasketControl =  document.querySelector('#MiniShopCartProductsList');
        const overlay = document.querySelector('#overlay');
        const addedToBag = document.querySelector('#MiniShopCartProductAdded');
        
        // remove class from control basket
        overlay.classList.remove(`${ID}-hidden`);
        document.querySelector('#overlay').style.display = 'none';
        miniBasketControl.classList.remove(`${ID}-hidden`);
        addedToBag.classList.remove(`${ID}-hidden`);

        // clear the products
        component.querySelector(`.${ID}-products`).innerHTML = '';
      }

      component.querySelector(`.${ID}-close`).addEventListener('click', () => {
        closeBasket();
      });

      document.querySelector(`.${ID}-basketOverlay`).addEventListener('click', (e) => {
        
        if(e.target !== e.currentTarget) return;
        closeBasket();
        window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-ClickedClose-_-CTA');
      });


      component.querySelector(`.${ID}-continue`).addEventListener('click', (e) => {
        closeBasket();
        if(VARIATION === '1') {
          window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-ClickedContinueShopping-_-CTA')
        } else if (VARIATION === '2') {
          window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-ClickedContinueBasket-_-CTA');
        }
      });

      component.querySelector(`.${ID}-checkout`).addEventListener('click', (e) => {
        closeBasket();
        window.cmCreateManualLinkClickTag('/BO070?cm_sp=BO070MiniBasket-_-ClickedCheckout-_-CTA');
      });
    }
  
    render() {
      const { component } = this;
      document.body.appendChild(component);
      
    }
  }