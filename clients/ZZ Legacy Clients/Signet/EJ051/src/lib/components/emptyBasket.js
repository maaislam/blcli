import shared from "../shared"

export default () => {

    const { ID } = shared;
 
    document.body.classList.add(`${ID}-basketEmpty`);

    const continueButton = document.querySelector('.content-area__main-content .solid-button.solid-button--black');

    continueButton.textContent = 'Continue Shopping';
    document.querySelector('.content-area__title h2').insertAdjacentElement('afterend', continueButton);

    const upsellProducts = document.querySelectorAll('.content-area__main-content .product-detail .product-detail__link');

    for (let index = 0; index < upsellProducts.length; index += 1) {
        const element = upsellProducts[index];
         const price = element.querySelector('.product-detail__price--left');

         element.appendChild(price);
    }

}