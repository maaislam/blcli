
const getFeaturedProduct = (productName) => {
    let featuredProduct;
    let products = document.querySelectorAll('.precart_slider .prod_list_outer');
    products.forEach(product => {
        let heading = product.querySelector('h2');
        if (heading.innerText == productName) {
            featuredProduct = product;
        }
    });
    return featuredProduct;
};

export default getFeaturedProduct;