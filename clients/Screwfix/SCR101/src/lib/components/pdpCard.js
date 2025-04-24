import { plusIcon } from '../assets/svg';
import bundleProduct from './bundleProduct';

const pdpCard = (id, VARIATION) => {
  const mainProdPriceIncVat = window.utag.data.prodPriceIncVat[0];
  const priceParts = mainProdPriceIncVat.split('.');
  const deliveryBtn = document.querySelector('[data-qaid="pdp-button-deliver"]');
  const clickAndCollectIcon = document.querySelector('[data-qaid="pdp-button-click-and-collect"]');

  const newDeliveryBtn = deliveryBtn && deliveryBtn.cloneNode(true);
  const newClickAndCollectIcon = clickAndCollectIcon && clickAndCollectIcon.cloneNode(true);

  deliveryBtn && newDeliveryBtn.classList.add(`${id}__delivery-btn`);
  clickAndCollectIcon && newClickAndCollectIcon.classList.add(`${id}__click-collect-btn`);

  if (clickAndCollectIcon) newClickAndCollectIcon.querySelector('span').innerText = 'Click & Collect';
  const htmlStrV1 = `<div class='${id}__pdpCard'>
        
        <h3 class='pdpCard-title'>Get a FREE Flomasta TRV worth £20.00 when bought with any Flomasta Convector Radiator</h3>

        <div class='content'>
            <div class='bundle-products'>
                <div class='bundle-product'>
                    ${bundleProduct()}
                </div>

                <div class='plus-icon'>${plusIcon}</div>

                <div class='bundle-product'>
                    ${bundleProduct(true)}
                </div>
            </div>

            <div class='bundle-buttons'>
                <div class='bundle-price'>
                    <div class='bundle-price-text'>Bundle price: </div>
                    <div class="bundle-product-price">
                        <span class="currency-symbol">£</span>
                        <span class="current-price">${priceParts[0]}</span>
                        <span class="price-decimal">.<!-- -->${priceParts[1]}</span>
                        <span class="bundle-product-vat">Inc Vat</span>
                    </div>
                </div>

                ${newDeliveryBtn ? newDeliveryBtn.outerHTML : ''}
                
                ${newClickAndCollectIcon ? newClickAndCollectIcon.outerHTML : ''}
            </div>
        </div>
    </div>`;

  const htmlStrV2 = `
    <div class='${id}__pdpCard ${id}__pdpCardV2'>
        <p class='pdpCard-title'>Get a FREE Flomasta valve when brought with this radiator</p>
        <div class="content">
                <div class="image">
                    <img src="https://media.screwfix.com/is/image/ae235/602HN_P?$fxSharpen$=&amp;wid=257&amp;hei=257&amp;dpr=on" alt="Product Image">
                </div>
                <div >
                    <div class="price-container">
                        <span class="free-text">FREE</span>
                        <span class="price-text">was £20.00</span>
                    </div>
                    <div class="${id}__checkbox-container">
                        <input type="checkbox" class="${id}__checkbox is-checked sr-only-input" id="addToBasketCheckbox-v2" name="addToBasket">
                        <label for="addToBasketCheckbox-v2">
                            <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" class="modalCard-checkIcon" aria-hidden="true" focusable="false" ><path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"></path></svg>
                            <span class="checkbox-label">Add 1 Flomasta TRV <span>(602HN)</span> to basket</span>
                        </label>
                        
                    </div>
                </div>
            </div>
            <div class="v2-message ${id}__hide">Now add a Flomasta radiator to complete the offer</div>
    </div>
  `;
  return VARIATION === '1' ? htmlStrV1 : htmlStrV2;
};

export default pdpCard;
