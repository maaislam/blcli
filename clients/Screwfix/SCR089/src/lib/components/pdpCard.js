import { plusIcon } from "../assets/svg";
import bundleProduct from "./bundleProduct";

const pdpCard = (id) => {
    const mainProdPriceIncVat = window.utag.data.prodPriceIncVat[0];
    const priceParts = mainProdPriceIncVat.split('.');
    const deliveryBtn = document.querySelector('[data-qaid="pdp-button-deliver"]');
    const clickAndCollectIcon = document.querySelector('[data-qaid="pdp-button-click-and-collect"]');

    const newDeliveryBtn = deliveryBtn && deliveryBtn.cloneNode(true);
    const newClickAndCollectIcon = clickAndCollectIcon && clickAndCollectIcon.cloneNode(true);

    deliveryBtn && newDeliveryBtn.classList.add(`${id}__delivery-btn`);
    clickAndCollectIcon && newClickAndCollectIcon.classList.add(`${id}__click-collect-btn`);

    const htmlStr = `<div class='${id}__pdpCard'>
        <div class='badge'>Free Value</div>
        <p class='pdpCard-title'>Get a FREE Flomasta TRV worth £20.00 when bought with any Flomasta Convector Radiator</p>

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
    return htmlStr;
};

export default pdpCard;
