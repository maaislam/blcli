import shared from "../shared"
import { getData } from "../productData";
import { pollerLite } from "../../../../../../lib/utils";

export default () => {
    const { ID } = shared;

    const productSKU = window.digitalData.product[0].productInfo.masterSku;
    const productObj = getData(productSKU);
    const topProductSection = document.querySelector(`.${ID}__mainProductInfo`);

    // add new elements
    const addNewContent = () => {
        const brand = window.digitalData.product[0].productInfo.brand;

        // add range logo or text
        if(productObj.brandText) {
            topProductSection.querySelector('.product-summary').insertAdjacentHTML('afterbegin',`<div class="${ID}__typeText">${productObj.brandText}</div>`);
        } else {
            topProductSection.querySelector('.product-summary').insertAdjacentHTML('afterbegin',`<div class="${ID}__typeLogo" style="background-image:url(${productObj.secondLogo})"></div>`);
        }
        topProductSection.querySelector('.product-name').insertAdjacentHTML('afterend', `<div class="${ID}__productNo">Product No: ${productObj.productNo}</div>`)
    
        // update basket title
        const addToBag = document.querySelector('.product-buy-now');
        if(addToBag) {
            addToBag.querySelector('.product-buy-now__text').textContent = 'Add to basket';
        }

        // if reviews
        const reviews = document.querySelector('.product-summary .product-customer-rating-summary');
        if(reviews) {
            document.querySelector('.product-summary .product-price').insertAdjacentElement('beforebegin', reviews);
        }
    }

    const priceSection = () => {
        const currentPrice = topProductSection.querySelector('.product-price');
        const financeMessage = topProductSection.querySelector('.finance-options > p > b:last-of-type');
        const financeAmount = financeMessage.querySelector('strong');

        const financePrice = financeAmount.innerText.trim().toLowerCase().replace('per month', '');

        const newPriceArea = document.createElement('div');
        newPriceArea.classList.add(`${ID}__row`);
        newPriceArea.classList.add(`${ID}__priceSection`);
        newPriceArea.innerHTML = 
        `${currentPrice.outerHTML}
        <div class="${ID}__financeBox">
            <p>4 Years Interest Free Credit Available</p>
            <p>from <b>${financePrice}</b> per month
                ${financeMessage.textContent.indexOf('(1 item only)') > -1 ? `<span>(1 Item only)</span>` : `<div class="${ID}__textLink">Learn More</div>`}
            </p>
        </div>`;

        document.querySelector('#basketForm').insertAdjacentElement('beforebegin', newPriceArea);

        const ifcButton = document.querySelector('#js-ifcBuyButton');
        if(newPriceArea.querySelector(`.${ID}__financeBox .${ID}__textLink`)) {
            newPriceArea.querySelector(`.${ID}__financeBox .${ID}__textLink`).addEventListener('click', () => {
                ifcButton.click();
            })
        }
    }

    const checkStock = () => {
        const inStock = window.digitalData.product[0].productInfo.stock;

        if(inStock === 'no') {
            document.querySelector(`.${ID}__productNo`).insertAdjacentHTML('afterend', `<div class="${ID}__button ${ID}-noStock">Out of stock</div>`);
        }
    }

    addNewContent();
    checkStock();
    pollerLite([`.${ID}__mainProductInfo`, '.product-ifc'], () => {
        //priceSection();
    });
}