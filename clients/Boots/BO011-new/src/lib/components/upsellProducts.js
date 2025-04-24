
import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import getData from "./productData";
import Swiper from "swiper/bundle";
/**
 * Add Upsell Products to box
 */

 export default () => {
    const { ID } = shared;
    const upsellProductsObj = getData();

    const addProducts = () => {
        Object.keys(upsellProductsObj).forEach((i) => {
            const data = upsellProductsObj[i];

            const product = document.createElement('div');
            product.classList.add(`${ID}-product`);
            product.classList.add("swiper-slide");
            product.innerHTML = `
            <a href="${data.link}">
            <div class="${ID}-image" style="background-image:url(${data.image})"></div></a>
            <p>${data.name}</p>
            <div class="${ID}-prices">
                <span class="${ID}-price">${data.price}</span>
            </div>
            <a class="${ID}-modal_button" href="${data.link}">Shop now</a>`;

            document.querySelector(`.${ID}-stockcarousel .swiper-wrapper`).appendChild(product);
        });
    };
    const addFragrance = () => {

        const fragranceEl = document.createElement('div');
        fragranceEl.className = `${ID}-product ${ID}-fragranceFinder swiper-slide`;
        fragranceEl.innerHTML = `
        <a href="https://www.boots.com/boots-fragrance-finder">
            <div class="${ID}-image" style="background-image:url('https://assets.boots.com/content/dam/boots/shop-by-department/fragrance/2021-2022/10b/FragranceFinder_Content50_v3.dam.8x5x720.ts%3D1652799177158.jpg')"></div>
        </a>
        <div class="${ID}-info">
            <p>Need help discovering your signature scent?</p>
            <div class="${ID}-prices">
                <span class="${ID}-price">Find your match today!</span>
            </div>
            <a class="${ID}-modal_button" href="https://www.boots.com/boots-fragrance-finder">Find out more</a>
        </div>`;
        document.querySelector(`.${ID}-stockcarousel .${ID}-product`).insertAdjacentElement('beforebegin', fragranceEl);
    }

    const slickProducts = () => {

        // slick products
        const slickBoxes = () => {
            new Swiper(`.${ID}-stockcarousel`, {
                slidesPerView: 2,
                loop: true,
              //slidesPerGroup: 1,
              spaceBetween: 10,
              //centerInsufficientSlides: true,
             
              navigation: {
                nextEl: `.${ID}-carouselWrapper .swiper-button-next`,
                prevEl: `.${ID}-carouselWrapper .swiper-button-prev`,
              },
              breakpoints: {
                320: {
                  slidesPerView: 1.5,
                  //slidesPerGroup: 1,
                  spaceBetween: 8,
                },
                540: {
                  slidesPerView: 2.5,
                  //slidesPerGroup: 2,
                  spaceBetween: 10,
                },
                760: {
                  slidesPerView: 2.5,
                  //slidesPerGroup: 3,
                  spaceBetween: 10,
                },
                1020: {
                  slidesPerView: 3,
                  //slidesPerGroup: 4,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 4,
                  //slidesPerGroup: 4,
                  spaceBetween: 10,
                },
                },
              });
            // window.jQuery(`.${ID}-stockcarousel`).not('.slick-initialized').slick({
            //     infinite: true,
            //     arrows: true,
            //     slidesToShow: 3,
            //     slidesToScroll: 1,
            //     adaptiveWidth: true
            // });
        //     window.jQuery(`.${ID}-stockcarousel`).slick({
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         dots: false,
        //         arrows: true,
        //         infinite: true,
        //         autoplay: false,
        //         swipeToSlide: true,
        //         cssEase: 'linear', 
        //         variableWidth: false,
        //         rows: 0,
        //         mobileFirst: true,
        //         responsive: [
        //             {
        //                 breakpoint: 1280,
        //                 settings: {
        //                     slidesToShow: 3,
        //                     slidesToScroll: 1,
        //                     arrows: true,
        //                     centerMode: false,
        //                 }
        //             },
        //             {
        //                 breakpoint: 1023,
        //                 settings: {
        //                     slidesToShow: 3,
        //                     slidesToScroll: 1,
        //                     centerMode: false,
        //                     arrows: true,
        //                 }
        //             },
        //             {
        //                 breakpoint: 766,
        //                 settings: {
        //                     slidesToShow: 2,
        //                     slidesToScroll: 1,
        //                 }
        //             },
        //             {
        //                 settings: {
        //                     slidesToShow: 1,
        //                     slidesToScroll: 1,
        //                     variableWidth: false,
        //                 }
        //             },
        //         ]
        //     });  
        //    window.jQuery(`.${ID}-stockcarousel`).slick('resize');
        }
        slickBoxes();

        // // slick boxes
        // if(window.innerWidth >= 1024) {
        //     slickBoxes();
        //     window.jQuery(`.${ID}-stockcarousel`).slick('resize');
        //     window.jQuery(window).on('resize orientationchange', function() {
        //         window.jQuery(`.${ID}-stockcarousel`).slick('reinit');
        //     });
        // }

        // window.jQuery(window).resize(function() {
        //     if(window.innerWidth >= 1024) {
        //         if(!document.querySelector(`.${ID}-product.slick-slide`)) {
        //             slickBoxes();
        //             window.jQuery(`.${ID}-stockcarousel`).slick('resize');
        //         }
        //     } else {
        //         if(document.querySelector(`.${ID}-stockcarousel.slick-initialized`)) {
        //             window.jQuery(`.${ID}-stockcarousel`).slick('unslick');
        //         }
        //     }
        // });
    }

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

    addProducts();
    if(document.querySelector('#estore_product_title').textContent.toLowerCase().match(/.*(parfum|aftershave|toilette|perfume).*/)){
        addFragrance();
    }
   
    slickProducts();
    productTracking();
 }