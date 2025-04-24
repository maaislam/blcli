import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { addYTapi } from './videoSetUp';

const { ID, VARIATION } = shared;



export const addSlideToCarousel = () => {
   // This is the html to add to the carousel
  const imageContent = `<div class="${ID}-imageBlock thumb">the new slide content in here</div>`;
  let jQuery = null;
  jQuery = window.jQuery || window.$;
  if (window.$.fn.slick) {
    jQuery('#thumbnails').slick('slickAdd', imageContent); // this adds it to the end of the carousel
    jQuery('#thumbnails').slick('refresh'); // this refreshes
    jQuery('#thumbnails').slick('resize'); // I just put this in to stop the width messing up
  }
  
  //    document.querySelector(`.${ID}-imageBlock.thumb`).insertAdjacentHTML('afterbegin', `https://hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dweed62486/VIDEOS/263318/Hotel%20Chocolate%20-%20The%20Cabinet%20Classic%20-%20opening%20box%20(V2).mp4`);

  //    addYTapi();
   


}