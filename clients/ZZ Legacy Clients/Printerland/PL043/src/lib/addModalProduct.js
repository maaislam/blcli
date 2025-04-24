import shared from './shared';
import elements from './elements';
import buildProduct from './buildProduct';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const addModalProduct = () => {
    const productHTML = buildProduct();
    const productInHTML = document.querySelector(`.${ID}-product`) ?? false;
    if (!productInHTML) {
        elements.modalBody.insertAdjacentHTML('afterbegin', productHTML);
    }
}

export default addModalProduct;