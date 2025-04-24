export const initSlick = (selector) => {
    window.jQuery(selector).slick({
        speed: 300,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2.8,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },

            {
                breakpoint: 414,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                }
            },
        ]
    })
};
