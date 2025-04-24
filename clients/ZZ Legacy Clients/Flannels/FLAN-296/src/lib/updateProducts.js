import getCurrentProductsInBasket from './getCurrentProductsInBasket';

const updateProducts = () => {
    const products = getCurrentProductsInBasket();
    products.forEach(product => {
        product.classList.add('is-in-basket');
    });
};

export default updateProducts;