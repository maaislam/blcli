/**
 * @desc brands bar
 */


import shared from "../shared";

export default () => {

    const { ID } = shared;
    const $ = window.jQuery;

    const createBrands = () => {
        const brands = {
            'brand': 'https://via.placeholder.com/150',
            'brand2': 'https://via.placeholder.com/150',
            'brand3': 'https://via.placeholder.com/150',
            'brand4': 'https://via.placeholder.com/150',
            'brand5': 'https://via.placeholder.com/150',
            'brand6': 'https://via.placeholder.com/150',
            'brand7': 'https://via.placeholder.com/150',
            'brand8': 'https://via.placeholder.com/150',
            'brand9': 'https://via.placeholder.com/150',
            'brand10': 'https://via.placeholder.com/150',
            'brand11': 'https://via.placeholder.com/150',
            'brand12': 'https://via.placeholder.com/150',
        }
    
        Object.keys(brands).forEach((i) => {
            const data = brands[i];
            const brandEl = document.createElement('div');
            brandEl.classList.add(`${ID}__brandBox`);
            brandEl.innerHTML = `<div class="${ID}__image" style="background-image:url(${data})"><a href="#"></a></div>`;
        
            document.querySelector(`.${ID}__brandBar .${ID}__carousel__inner`).appendChild(brandEl);
        });
    }
    createBrands();
    
  

    // slick the brand bar
    const slickBrandBar = () => {
        $(`.${ID}__brandBar .${ID}__carousel__inner`).slick({
            infinite: true,
            arrows: true,
            slidesToShow: 6,
            slidesToScroll: 6,
        });
    }
    // only on tablet
    if(window.innerWidth > 1100) {
        document.querySelector(`.${ID}__brandBar .${ID}__carousel__inner`).classList.add('container');
        slickBrandBar();
    }
}