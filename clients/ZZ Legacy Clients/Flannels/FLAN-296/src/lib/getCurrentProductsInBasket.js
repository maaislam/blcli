import getBasketItems from './getBasketItems';
import convertToLowerCaseString from './convertToLowerCaseString';

const getCurrentProductsInBasket = () => {
    // Get names
    const basketItems = getBasketItems();
    // Get products
    const products = document.querySelectorAll('.s-productthumbbox');
    products.forEach(product => {
        product.classList.remove('is-in-basket');
    });
    // Get all products in basket
    const productsInBasket = Array.prototype.filter.call(products, (product) => {
        const productBrand = product.querySelector('.productdescriptionbrand')?.innerText;
        const productName = product.querySelector('.nameWrapTitle')?.innerText;
        const productTitle = convertToLowerCaseString(`${productBrand}${productName}`);
        const colourCode = product.querySelector('.hotspotquickbuy').dataset.colourvariantid;
        // Check names include current product title
        const isCurrentlyInBasket = basketItems.some((item) => {
            // Compare name to product name and colour code to colour code
            const hasSameColourCode = item.colourCode.includes(colourCode);
            const hasSameName = item.name == productTitle;
            return hasSameName && hasSameColourCode;
        });
        return isCurrentlyInBasket;
    });
    return productsInBasket;
};

export default getCurrentProductsInBasket;