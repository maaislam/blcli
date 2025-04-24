import shared from "../../../../../../core-files/shared";


/**
 * Rebuild the main product slider
 */
const { ID, VARIATION } = shared;

export default class MainImageCarousel {
    constructor() {
        this.create();
        this.render();
        if(VARIATION === '1') {
            this.slickImages();
        }
    }

    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}-productSlider`);
        if(VARIATION === '1') {
            element.innerHTML = ` <div class="${ID}-images"></div><div class="${ID}-thumbnails"></div>`;
        } else if(VARIATION === '2'){
            element.innerHTML = ` <div class="${ID}-images"></div>`;
        }

        // get images from data object
        const allImages = document.querySelectorAll('.product-col-1.product-image-container #thumbnails .thumb:not(.slick-cloned) .productthumbnail');

        for (let i = allImages.length - 1; i >= 0; i--) {

            const imageBlock = allImages[i];
            const imageObj = JSON.parse(imageBlock.getAttribute('data-lgimg'));
            if (imageObj) {
                const sliderImage = `<img class="${ID}-image" src="${imageObj.url}"/>`;
                element.querySelector(`.${ID}-images`).insertAdjacentHTML(`afterbegin`, sliderImage);

                if(VARIATION === '1') {
                    element.querySelector(`.${ID}-thumbnails`).insertAdjacentHTML(`afterbegin`, sliderImage);
                }

            }
        }

        this.component = element;
    }

   

    render() {
        const { component } = this;
        if(VARIATION === '1') {
            document.querySelector(`.${ID}-mainSlider`).insertAdjacentElement('afterbegin', component);
        } else {
            document.querySelector(`.${ID}-left`).insertAdjacentElement('afterbegin', component);
        }
       
    }

    slickImages() {
        const noOfImages = document.querySelectorAll('.product-col-1.product-image-container #thumbnails .thumb:not(.slick-cloned) .productthumbnail').length;

        window.jQuery(`.${ID}-productSlider .${ID}-images`).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: `.${ID}-productSlider .${ID}-thumbnails`,
            fade: true,
            initialSlide: 0,
        });

        window.jQuery(`.${ID}-productSlider .${ID}-thumbnails`).slick({
            slidesToShow: noOfImages,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: `.${ID}-productSlider .${ID}-images`,
            dots: false,
            vertical: false,
            centerMode: true,
            centerPadding: '10px',
            focusOnSelect: true,
            draggable: false,
            initialSlide: 0,
            responsive: [{
                    breakpoint: 5000,
                    settings: {
                        slidesToShow: noOfImages,
                        slidesToScroll: 1,
                        vertical: true,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        vertical: false,
                        slidesToShow: noOfImages,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: noOfImages,
                        slidesToScroll: 1,
                        vertical: false,
                    }
                }
            ]
        });

        // // charcoal
        // window.jQuery(`.${ID}-productSlider .${ID}-images`).slick('slickAdd','<img class="HC088-image" attr="472727" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw667549e0/images/472727-new.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">');
        // // white
        // window.jQuery(`.${ID}-productSlider .${ID}-images`).slick('slickAdd','<img class="HC088-image" attr="472725" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd9e91467/images/472725-newimage.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">');
        // // stellar white
        // window.jQuery(`.${ID}-productSlider .${ID}-images`).slick('slickAdd','<img class="HC088-image" attr="472810" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5d322592/images/472802.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">');

        // // copper
        // window.jQuery(`.${ID}-productSlider .${ID}-images`).slick('slickAdd','<img class="HC088-image" attr="472726" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe57149a2/images/472726-new.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">');
    }
}