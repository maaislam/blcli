import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const slickProducts = () => {

    const runSlick = () => {
        window.jQuery(`.${ID}-products`).slick({
            slidesToShow: 4,
            arrows: true,
            infinite: true,
            rows: 0,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 1279,
                    settings: {
                      slidesToShow: 5,
                      slidesToScroll: 1
                    }
                  },
                {
                  breakpoint: 1023,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                breakpoint: 300,
                settings: "unslick",
                },
            ]
        });
    }
    
    if (window.innerWidth >= 1024) {
        if (window.jQuery.fn.slick) {
            runSlick();
        } else {
            jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', () => {
            runSlick();
            });
        }
    }

    window.jQuery(window).resize(function () {
        if (window.innerWidth >= 1024) {
          if (!document.querySelector(`.${ID}-product.slick-slide`)) {
            slickProducts();
            window.jQuery(`.${ID}-products`).slick('resize');
          }
        } else {
          if (document.querySelector(`.${ID}-products.slick-initialized`)) {
            window.jQuery(`.${ID}-products`).slick('unslick');
          }
        }
    });
}