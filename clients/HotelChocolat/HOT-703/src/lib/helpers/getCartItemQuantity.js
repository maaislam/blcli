const getCartItemQuantity = () => {
    const basketDataInput = document.querySelector('input[name="basketData"]');
    if (!basketDataInput) return 1;
    
    const basketData = JSON.parse(basketDataInput.value.replace(/&quot;/g, '"'));
    const totalQuantity = basketData.product.reduce((sum, item) => sum + item.product_quantity, 0);
    
    return totalQuantity;
}

export default getCartItemQuantity;
