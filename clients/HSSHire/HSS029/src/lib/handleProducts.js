import shared from './shared';
import getCurrentProductData from './getCurrentProductData';
import addElements from './addElements';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getButton = (productLink) => {
    return `
    <a href="${productLink}" class="${ID}-button btn btn-info">
        View
    </a>
    `;
};

const handleProducts = () => {
    const pageProductData = getCurrentProductData();
    const products = document.querySelectorAll('.product_listing_inner .prod_list');
    products.forEach(product => {
        const price = product.querySelector('.cart');
        const heading = product.querySelector('.productMainLink h2');
        const headingText = heading.innerText;
        const productLink = product.querySelector('.productMainLink a').getAttribute('href');

        const html = {
            button: getButton(productLink)
        };

        // Add button
        price.insertAdjacentHTML('afterend', html.button);

        // Add variant related functionality
        const relatedProductData = pageProductData.products.filter((productLayer) => {
            // Check if title is the same as the current product in data (without spaces)
            return productLayer.productTitle.replace(/\s/g, '') == headingText.replace(/\s/g, '');
        })[0];
        if (relatedProductData) {
            addElements(product, relatedProductData);
        }
    });
};

export default handleProducts;