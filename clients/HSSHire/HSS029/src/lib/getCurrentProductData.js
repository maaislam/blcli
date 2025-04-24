import productData from './productData';

const currentURL = window.location.href;

const getCurrentProductData = () => {
    let currentProductData = productData.filter((data) => {
        return data.listingPage == currentURL;
    })[0];
    return currentProductData;
};

export default getCurrentProductData;