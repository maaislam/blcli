const modal = document.querySelector('.modal.related_products');
const modalHeader = document.querySelector('.modal.related_products header');
const modalBody = document.querySelector('.modal.related_products .modal-body');
const modalClose = document.querySelector('.modal.related_products .close-modal');

const product = {
    image: document.querySelector('#imgProductMain'),
    title: document.querySelector('#productTitle'),
    priceEx: document.querySelector('.price-ex .price'),
    priceInc: document.querySelector('.price-inc .price'),
    stock: document.querySelector('.stock__pip'),
};

export default {
    modal,
    modalHeader,
    modalBody,
    modalClose,
    product
};