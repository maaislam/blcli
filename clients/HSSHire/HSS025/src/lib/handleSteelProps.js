
import getFeaturedProduct from './getFeaturedProduct';
import basketMessage from './basketMessage';
import productMessage from './productMessage';
import mimicProductEvents from './mimicProductEvents';
import shared from './shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const methods = {
    experimentContainer: null,
    productContainer: null,
    productContainerInner: null,
    newProduct: null,
    hiddenProduct: null,
    getInitialElements() {
        const featuredProduct = getFeaturedProduct('STRONGBOY PROP HEAD WALL SUPPORTS');
        const availabilityCheck = document.querySelector('.availability_check');
        return {
            featuredProduct,
            featuredProductCopy: featuredProduct.cloneNode(true),
            availabilityCheck
        };
    },
    getProductElements(productContainer) {
        return {
            plus: productContainer.querySelector('button.plus'),
            minus: productContainer.querySelector('button.minus'),
            addedToggle: productContainer.querySelector('.no_items .controls-wrapper'),
            thumbnail: productContainer.querySelector('.thumb'),
            quantity: productContainer.querySelector('input.qtyrange'),
        };
    },
    init() {
        // Get elements
        const elements = this.getInitialElements();
        
        // Insert container after product info
        elements.availabilityCheck.insertAdjacentHTML('afterend',
        `<div class="${ID}-container ${ID}-text-base">
            <div class="${ID}-product-container">
                <div class="${ID}-product-container__inner">
                    Do you need Wall Supports? These are frequently hired with the Steel Props.
                </div>
            </div>
        </div>`
        );

        // Hide initial product
        elements.featuredProduct.classList.add(`${ID}-hidden`);

        // Define elements
        this.experimentContainer = document.querySelector(`.${ID}-container`);
        this.productContainer = document.querySelector(`.${ID}-product-container`);
        this.productContainerInner = document.querySelector(`.${ID}-product-container__inner`);
        this.hiddenProduct = this.getProductElements(elements.featuredProduct);

        // Insert basket message to container
        this.experimentContainer.insertAdjacentHTML('afterbegin', basketMessage);

        // Append new featured product to inner container
        this.productContainer.insertAdjacentHTML('afterbegin', productMessage);
        this.productContainerInner.appendChild(elements.featuredProductCopy);

        // Assign new product
        this.newProduct = this.getProductElements(this.productContainer);

        // Mimic events
        mimicProductEvents(this.newProduct, this.hiddenProduct);
    },
};

const handleSteelProps = () => {
    // Call methods
    methods.init();
};

export default handleSteelProps;