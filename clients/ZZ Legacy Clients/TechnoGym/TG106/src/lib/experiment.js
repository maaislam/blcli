/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import Markup from './components/pageMarkup';
import form from './components/formChanges';
import bestSellingBikes from './components/bestSellingBikes';
import shared from './shared';
import moreBikes from './components/moreBikes';
import formSubmit from './components/form/formSubmit';
import requestClick from './components/form/requestClick';
import { createLoader } from './components/form/loader';

export default () => {

  const { ID } = shared;

  setup();

  // add the page HTML
  new Markup();

  // form changes
  form();
  bestSellingBikes();
  moreBikes();

  // put all images on the oage as carousels
  const slickTheProducts = () => {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {
        jQuery(`.${ID}-product_images`).slick({
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1,
          mobileFirst: true,
          arrows: false,
          dots: true,
        });

        if(window.innerWidth > 1023) {
          jQuery(`.${ID}_moreBikesProduct`).slick('unslick');
        }
    });

    
  }

  createLoader();

  slickTheProducts();

  // on click of the products
  requestClick();

  // on submit, get the brochure
  formSubmit();

};
