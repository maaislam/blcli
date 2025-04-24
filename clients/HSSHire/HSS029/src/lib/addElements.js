import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getSelect = (relatedProductData) => {
    return `
    <small class="${ID}-heading">MULTIPLE PRODUCTS</small>
    <select class="${ID}-select">
        ${getOptions(relatedProductData)}
    </select>
    `;
};

const getOptions = (relatedProductData) => {
    let html = `<option value="none" disabled selected>Select a variant</option>`;
    relatedProductData.variants.forEach(variant => {
        html = `${html} <option value="${variant.name}" data-url="${variant.url}">${variant.name}</option>`;
    });
    return html;
};

const addElements = (product, relatedProductData) => {
    const html = {
        select: getSelect(relatedProductData),
    };
    const price = product.querySelector('.cart');
    product.classList.add(`${ID}-product`);
    price.insertAdjacentHTML('beforebegin', html.select);
};

export default addElements;