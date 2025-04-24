const addToCart = (Sku) => {
    const addToCartEndpoint = 'https://www.avon.it/api/cartapi/add';

    const payloads = [
        {
            Campaign: window._ShopContext.CampaignNumber,
            Quantity: 1,
            Sku,
        },
    ];

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payloads),
    };

    return fetch(addToCartEndpoint, options).then((response) => response.json());
};

addToCart('31038-18334525').then((data) => {
    console.log('data', data);
});