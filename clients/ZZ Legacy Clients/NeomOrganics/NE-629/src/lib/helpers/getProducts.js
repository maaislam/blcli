const productUrls = [
    "/products/perfect-nights-sleep-luxury-scented-candle.js",
    "/products/perfect-nights-sleep-mist-30ml.js",
    "/products/real-luxury-luxury-scented-candle.js",
    "/products/real-luxury-pod-mini-starter-pack.js"
];

const getProducts  = async () => {
    try {
        const responses = await Promise.all(productUrls.map(url => fetch(url)));
        const productsData = await Promise.all(responses.map(response => response.json()));
        return productsData;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
};

export default getProducts;
