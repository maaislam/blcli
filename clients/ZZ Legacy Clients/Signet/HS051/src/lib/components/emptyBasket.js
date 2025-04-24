import shared from "../shared"

export default () => {

    const { ID } = shared;
 
    document.body.classList.add(`${ID}-basketEmpty`);

    const continueButton = document.querySelector('.container.emptyBasket a:first-of-type');

    continueButton.textContent = 'Continue Shopping';
    document.querySelector('.container strong').insertAdjacentElement('afterend', continueButton);

    const upsellProducts = document.querySelectorAll('.productList .productItem');

    for (let index = 0; index < upsellProducts.length; index += 1) {
        const element = upsellProducts[index];
         const price = element.querySelector('p strong');

         element.appendChild(price);
    }

}