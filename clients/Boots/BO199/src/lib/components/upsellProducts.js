
import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { getData, increasinglyData } from "./productData";


/**
 * Add Upsell Products to box
 */

 export default () => {
    const { ID, VARIATION } = shared;

    let upsellProductsObj;
    if(VARIATION === '1') {
        upsellProductsObj = getData();
    } else if(VARIATION === '2'){
        upsellProductsObj = increasinglyData();
    }
    
    Object.keys(upsellProductsObj).forEach((i) => {
        const data = upsellProductsObj[i];

        const product = document.createElement('div');
        product.classList.add(`${ID}-product`);
        product.innerHTML = `
        <a href="${data.link}">
        <div class="${ID}-image" style="background-image:url(${data.image})"></div></a>
        <p>${data.name}</p>
        <div class="${ID}-prices">
            <span class="${ID}-price">${data.price}</span>
        </div>
        <a class="${ID}-modal_button" href="${data.link}">Shop now</a>`;

        document.querySelector(`.${ID}-carousel`).appendChild(product);
    });

    // slick products
    const slickBoxes = () => {
        window.jQuery(`.${ID}-carousel`).slick({
            infinite: true,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
        });
    }

    // slick boxes
    if(window.innerWidth >= 1024) {
        slickBoxes();
        window.jQuery(`.${ID}-carousel`).slick('resize');
        window.jQuery(window).on('resize orientationchange', function() {
            window.jQuery(`.${ID}-carousel`).slick('reinit');
        });
    }

    window.jQuery(window).resize(function() {
        if(window.innerWidth >= 1024) {
            if(!document.querySelector(`.${ID}-product.slick-slide`)) {
                slickBoxes();
                window.jQuery(`.${ID}-carousel`).slick('resize');
            }
        } else {
            if(document.querySelector(`.${ID}-carousel.slick-initialized`)) {
                window.jQuery(`.${ID}-carousel`).slick('unslick');
            }
        }
    });

    const productTracking = () => {
        const allProducts = document.querySelectorAll(`.${ID}-product`);
        for (let index = 0; index < allProducts.length; index += 1) {
            const element = allProducts[index];
            element.querySelector('a').addEventListener('click', () => {
                fireEvent('Clicked OOS product image');
            });

            element.querySelector(`.${ID}-modal_button`).addEventListener('click', () => {
                fireEvent('Clicked OOS product shop now');
            });
        }
    }

    productTracking();
 }