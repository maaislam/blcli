import { addToCart, emitDYAddToCart } from '../helpers/addToCart';
import triggerEvent from '../helpers/triggerEvent';

const addToCartBtn = (id, sku, anchorElm, fireEvent, inStock) => {
  const htmlStr = `
    
    <div class="${id}__cartbtn--container">
    

            <div class="quantity_wrapper ${!inStock ? `${id}__hide--visibility` : ''}">
                <button disabled="disabled" class="btn-quantity ${id}__minus-btn">
                    <svg width="13"
                        height="3"
                        viewBox="0 0 13 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <line style="stroke: #212121;"
                                x1="1.28723"
                                y1="1.5"
                                x2="11.115"
                                y2="1.5"
                                stroke-width="2"
                                stroke-linecap="round"></line>
                    </svg>
                </button>
                <input name="quantity"
                        type="number"
                        min="1"
                        max="999"
                        value="1"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(..*)./g, '$1');"
                        class="input-quantity">
                <button class="btn-quantity ${id}__plus-btn">
                    <svg width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="#212121"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.80849 1.5C7.80849 0.947715 7.36077 0.5 6.80849 0.5C6.25621 0.5 5.80849 0.947715 5.80849 1.5V5.5L1.88025 5.5C1.32796 5.5 0.880249 5.94772 0.880249 6.5C0.880249 7.05228 1.32796 7.5 1.88025 7.5L5.80849 7.5V11.5C5.80849 12.0523 6.25621 12.5 6.80849 12.5C7.36077 12.5 7.80849 12.0523 7.80849 11.5V7.5L11.708 7.5C12.2603 7.5 12.708 7.05229 12.708 6.5C12.708 5.94772 12.2603 5.5 11.708 5.5L7.80849 5.5V1.5Z">
                        </path>
                    </svg>
                </button>
            </div>
        
        <div class="add-to-cart  ${!inStock ? `${id}__hide` : ''}"
            data-sku="${sku}">ADD TO BASKET</div>
        <div class="no-stock add-to-cart ${inStock ? `${id}__hide` : ''}"
            >Out of stock</div>
    </div> 
    
    `;

  anchorElm.insertAdjacentHTML('afterend', htmlStr);
  anchorElm.closest('.swiper-slide').addEventListener('click', (e) => {
    const target = e.target;

    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    const inputBox = target.closest(`.${id}__cartbtn--container`)?.querySelector('input');
    // fireEvent('user clicks on a product in the product carousel');
    if (targetMatched(`.${id}__plus-btn`)) {
      fireEvent('user interacts with quantity selector');
      inputBox.value = parseInt(inputBox.value) + 1;
      const nearestMinusBtn = target.closest(`.quantity_wrapper`).querySelector(`.${id}__minus-btn`);
      nearestMinusBtn.removeAttribute('disabled');
      nearestMinusBtn.classList.remove(`${id}__no-event`);
    } else if (targetMatched(`.${id}__minus-btn`)) {
      fireEvent('user interacts with quantity selector');
      inputBox.value = parseInt(inputBox.value <= 0 ? 2 : inputBox.value) - 1;
      const nearestMinusBtn = target.closest(`.quantity_wrapper`).querySelector(`.${id}__minus-btn`);
      if (inputBox.value == 1) {
        nearestMinusBtn.setAttribute('disabled', 'disabled');
        nearestMinusBtn.classList.add(`${id}__no-event`);
      }
    } else if (targetMatched(`.add-to-cart`)) {
      const card = target.closest(`.swiper-slide`);
      card.classList.add('adding');
      addToCart(target.getAttribute('data-sku'), parseInt(inputBox.value))
        .then((res) => {
          emitDYAddToCart(res, 1);
          fireEvent('user clicks on new add to bag CTA in carousel');
          const closeBasketBtn = document.querySelector('[data-item-id="wishlistClose"]') || document.querySelector('.btn_back');
          triggerEvent(closeBasketBtn);
          setTimeout(() => {
            card.classList.remove('adding');
            console.log(res);
            const headerBasketCount = document.querySelectorAll('.help_basketBtn .v7__elem--content-p')[0];
            headerBasketCount.innerText = res.itemsCount;
            const openBasketBtn = document.querySelector('[data-item-id="wishlistButton"]');
            triggerEvent(openBasketBtn);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

export default addToCartBtn;
