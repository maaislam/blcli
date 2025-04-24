const getBasketRecommendations = () => {
    const oldBasketProductData = localStorage.getItem('oldBasketProducts');

    if (!oldBasketProductData || oldBasketProductData === 'undefined') return Promise.resolve([]);
    
    // Retrieve oldBasketProductData from localStorage and parse it
    const oldBasketProducts = JSON.parse(oldBasketProductData);

    // Check if oldBasketProducts is undefined, null, or an empty array
    if (!oldBasketProducts || oldBasketProducts.length === 0) {
        return Promise.resolve([]); // Return empty array if no products are found
    }

    // Create request body by mapping over the products
    const requestBody = {
        itemDetails: oldBasketProducts.map(product => ({
            parentPartNumber: product.parentPartNumber || product.item.parentPartNumber,
            partNumber: product.partNumber || product.item.partNumber,
            quantity: product.quantity,
            price: {
                amount: product.unitDiscountedPrice ? product.unitDiscountedPrice.amount : product.unitPrice ? product.unitPrice.amount : 0,
                currencySymbol: product.unitDiscountedPrice ? product.unitDiscountedPrice.currencySymbol : product.unitPrice ? product.unitPrice.currencySymbol : '£',
                currencyCode: product.unitDiscountedPrice ? product.unitDiscountedPrice.currencyCode : product.unitPrice ? product.unitPrice.currencyCode : 'GBP'
            }
        }))
    };

    // Send the POST request to the endpoint
    return fetch('/api/checkout/basket/recommendations?consent=true', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Siteid': 'UK',
            'Channel': 'Ecommerce',
            'Environment': 'desktop'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            return data; // Return success data
        }
        return []; // Return empty array if data is not present
    })
    .catch((error) => {
        console.log('Error:', error);
        return []; // Return empty array in case of error
    });
}

export default getBasketRecommendations;
