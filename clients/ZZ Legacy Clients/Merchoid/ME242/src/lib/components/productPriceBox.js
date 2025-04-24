import shared from "../shared";

const { ID } = shared;
/**
 * Restyle the price box area 
 */
export default () => {

    const addProductName = () => {
        const priceBox = document.querySelector('.product-info-price');

        const productTitle = document.querySelector('.page-title');
        
        let newTitle;

        // if the title has the brand name in it
        if(productTitle.textContent.trim().match(/.+?(?=:)/)) {
            const productName = productTitle.textContent.trim().match(/:(.*)/)[1]
            const brand = productTitle.textContent.trim().match(/.+?(?=:)/)[0];
            newTitle = `<span>${brand}:</span> ${productName}`;
        } else {
            newTitle = productTitle.textContent;
        }
            
        const newProductTitle = document.createElement(`div`);
        newProductTitle.classList.add(`${ID}-productTitle`);
        newProductTitle.innerHTML = newTitle;

        priceBox.insertAdjacentElement('afterbegin', newProductTitle);
    }
    addProductName();

    // put the preoder date in a new div to style
    const shippingDate = document.querySelector('#product-preorder-date');
    const preorderDateSmallText = document.querySelector('.preorder-date-hint');
    if(shippingDate && preorderDateSmallText) {
        const newShippingContainer = document.createElement('div');
        newShippingContainer.classList.add(`${ID}-preorderDate`);
        newShippingContainer.innerHTML = 
        `<div class="${ID}-date_text">
            <h3>${shippingDate.innerHTML}</h3>
            <p>${preorderDateSmallText.innerHTML}</p>
        </div>`; 

        shippingDate.insertAdjacentElement('beforebegin', newShippingContainer);
    }
}