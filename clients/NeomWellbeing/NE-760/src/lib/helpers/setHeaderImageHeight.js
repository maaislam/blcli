const setHeaderImageHeight = (id) => {
    const productImage = document.querySelector(`.${id}-image:not(.header-column__image)`);

    const headerImage = document.querySelector('.header-column__image');

    if (productImage && headerImage) {
        const productImageRect = productImage.getBoundingClientRect();
        const productImageHeight = productImageRect.height;
        headerImage.style.height = `${productImageHeight}px`;
    }
};

export default setHeaderImageHeight;
