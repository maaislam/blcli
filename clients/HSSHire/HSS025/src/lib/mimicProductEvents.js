const mimicProductEvents = (newProduct, hiddenProduct) => {
    const mimic = () => {
        updateQuantity();
        updateButtonStates();
        updateThumbnail();
    };
    const updateQuantity = () => {
        let quantityVal = hiddenProduct.quantity.value;
        newProduct.quantity.value = quantityVal;
    };
    const updateButtonStates = () => {
        newProduct.minus.disabled = hiddenProduct.minus.getAttribute('disabled');
        newProduct.plus.disabled = hiddenProduct.plus.getAttribute('disabled');
    };
    const updateThumbnail = () => {
        newProduct.thumbnail.classList = hiddenProduct.thumbnail.classList;
    };
    // Mimic minus
    newProduct.minus.addEventListener('click', () => {
        hiddenProduct.minus.click();
        mimic();
    });
    // Mimic plus
    newProduct.plus.addEventListener('click', () => {
        hiddenProduct.plus.click();
        mimic();
    });
};

export default mimicProductEvents;