import shared from "../shared";

/**
* Rebuild the main product slider
*/
const { ID } = shared;

export default class MainProductSlider {
        constructor() {
            this.create();
            this.bindEvents();
            this.render();
            this.slickImages();
        }
        
        create() {    
            const element = document.createElement('div');
            element.classList.add(`${ID}-productSlider`);
            element.innerHTML = `
            <div class="${ID}-images"></div>
            <div class="${ID}-thumbnails"></div>`;

             // get images from data object
            const allImages = document.querySelectorAll('.product-col-1.product-image-container #thumbnails .thumb:not(.slick-cloned) .productthumbnail');
           
            for (let i = allImages.length - 1; i >= 0; i--) {        
            
                    const imageBlock = allImages[i];
                    const imageObj = JSON.parse(imageBlock.getAttribute('data-lgimg'));
                    if(imageObj) {
                        const sliderImage = `<img class="${ID}-image" src="${imageObj.url}"/>`;
                        element.querySelector(`.${ID}-images`).insertAdjacentHTML(`afterbegin`, sliderImage);
                        element.querySelector(`.${ID}-thumbnails`).insertAdjacentHTML(`afterbegin`, sliderImage);

                    }
                }
        
            this.component = element;
        }
        
        bindEvents() {
            const { component } = this;
        }
        
        render() {
            const { component } = this;
            document.querySelector(`.${ID}-mainSlider`).insertAdjacentElement('afterbegin', component);
        }

        slickImages () {
            const noOfImages = document.querySelectorAll('.product-col-1.product-image-container #thumbnails .thumb:not(.slick-cloned) .productthumbnail').length;

            window.jQuery(`.${ID}-productSlider .${ID}-images`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: `.${ID}-productSlider .${ID}-thumbnails`,
                fade: true,
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
                responsive: [
                    {
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
             
        }
    }
      
 