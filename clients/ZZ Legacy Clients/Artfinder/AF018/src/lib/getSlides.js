import getSlide from './getSlide';

const getSlides = (products) => {
    let html = '';
    products.forEach(product => {
        html = html + getSlide(product);
    });
    return html;
};

export default getSlides;