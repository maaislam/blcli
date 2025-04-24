import shared from './shared';
const { ID, VARIATION } = shared;

const updateUsps = () => {
    const $usps = jQuery(`.${ID}-usps`);
    $usps.each(function() {
        let sliderSettings = {
            slidesToShow: jQuery(this).data('slidestoshow'),
            slidesToScroll: jQuery(this).data('slidestoshow'),
            variableWidth: jQuery(this).data('variablewidth'),
            rows: jQuery(this).data('rows'),
            infinite: false,
            dots: true,
            arrows: false,
            autoplay: true,
            pauseOnDotsHover: true,
            autoplaySpeed: 6000,
        };
        if (!jQuery(this).hasClass('slick-initialized')) {
            jQuery(this).slick(sliderSettings);
        }
        jQuery(this).on('mouseover', () => {
            jQuery(this).slick('slickPause');
        });
        jQuery(this).on('mouseout', () => {
            jQuery(this).slick('slickPlay');
        });
    });
    jQuery(window).trigger('resize');
};

export default updateUsps;