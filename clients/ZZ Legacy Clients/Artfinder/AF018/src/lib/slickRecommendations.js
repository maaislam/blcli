import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

export default () => {
    $(`.${ID}-slider`).slick({
        rows: 0,
        draggable: true,
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        slide: '.slide',
        appendDots: $(`.${ID}-slider-dots`),
        nextArrow: $(`.${ID}-slider-arrow-next`),
        prevArrow: $(`.${ID}-slider-arrow-prev`),
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    infinite: true,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0',
                    variableWidth: true,
                }
            },
        ]
    });
}