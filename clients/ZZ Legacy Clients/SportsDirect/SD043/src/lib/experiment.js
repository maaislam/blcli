/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { DyFetchWidgetData } from '../../../../../lib/utils';
import { buildWidget } from './build';

export default () => {
  setup();

  const widgetID = 112016; // Google Shopping Similar items
  // Write experiment code here
  let req = DyFetchWidgetData(widgetID);
  console.log(req.then((res)=> res));

  req.then((results) => {
    console.log('results = ', results);
    if (!results) {
      console.log('SD043 no results found');
      return;
    }
    return results;
  }).then((data) => {
    // Build the widget
    if (!data) return;

    let html = buildWidget(data);
    const ref = document.querySelector('#contentWrapper');

    ref.insertAdjacentHTML('beforeend', html);

    // Run slick
    let $slider = $('.SD043-widget .swiper-container');
    let swiper = window.Swiper;
    console.log('swiper ', swiper);
    var mySwiper = new swiper(slider, {
      // Optional parameters
      direction: 'vertical',
      loop: true,
    
      // // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },
    
      // // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
    
      // // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    })

  }).catch((err) => console.error(err));
};
