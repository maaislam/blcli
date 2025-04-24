import settings from '../settings';

// put the filters in a slider
const productSlider = () => {
  jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
    jQuery(`.${settings.ID}_LastViewedProducts-list`).slick({
      infinite: true,
    });
  });
};

export default productSlider;
