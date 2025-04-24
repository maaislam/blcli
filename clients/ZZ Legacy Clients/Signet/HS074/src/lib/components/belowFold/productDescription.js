/**
 * Add product description
 */

import shared from "../../shared";

export default () => {

    const { ID } = shared;

    const productDesc = document.querySelector('.product-description .s-product-description-markdown p');
    const productImage = document.querySelector('.product-gallery__image-container img');


    if(productDesc && productImage) {
        const desc = document.createElement('div');
        desc.classList.add(`${ID}__descriptionWrapper`);
        desc.classList.add(`${ID}__row`);
        desc.innerHTML = `
        <div class="${ID}__colLeft">
            <div class="${ID}__blockInner">
                <div class="${ID}-blockBack">
                    <div class="${ID}__block" style="background-image:url('${productImage.getAttribute('src')}')"></div>
                </div>
            </div>
        </div>
        <div class="${ID}__colRight">
            <h3 class="${ID}__heading">Diamonds as unique as your own love story.</h3>
            <div class="${ID}__paragraph">${productDesc.innerText.trim()}</div>
        </div>`;

        document.querySelector(`.${ID}__description .${ID}__sectionContainer`).appendChild(desc);
    }
}