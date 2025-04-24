const getTotalProductQuantity = (basketdata) => {
    if (!basketdata || !basketdata.product || !Array.isArray(basketdata.product)) return 0;

    return basketdata.product.reduce((sum, product) => sum + (product.product_quantity || 0), 0);
}

export default getTotalProductQuantity;