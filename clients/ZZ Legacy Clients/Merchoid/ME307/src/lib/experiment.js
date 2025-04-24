/**
 * ME307 - Christmas UGC
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
// import { initiateSnow } from './PureSnow';
import data from './jumper_images';
import dataV2 from './jumper_images-v2';
import initiateSlick from './initiateSlick';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  setTimeout(() => {
    let carouselHeader = '';
    if (window.location.href.indexOf('/uk/') > -1) {
      carouselHeader = 'Our customers love our Christmas Jumpers';
    } else {
      carouselHeader = 'Our customers love our Christmas Sweaters';
    }
    document.querySelector('.product-secondary-tabs-wrapper .product-secondary-tabs').insertAdjacentHTML('beforebegin', `<div class="${ID}-jumpers__wrapper"></div>`);

    const jumpersContent = `<div class="${ID}-jumpers__container">
      <h5>${carouselHeader}</h5>
    </div>`;
  
    document.querySelector(`.${ID}-jumpers__wrapper`).insertAdjacentHTML('beforeend', jumpersContent);
    // initiateSnow();

    let carouselWrapper = `<ul class="${ID}-carousel"></ul>`;
    document.querySelector(`.${ID}-jumpers__container h5`).insertAdjacentHTML('afterend', carouselWrapper);

    // --- Shuffle Images and Generate Carousel Content
    let carouselContent = '';
    let arr = data['data'];
    if (VARIATION == '2') {
      arr = dataV2['data'];
    }
    function shuffle(array) {
      var currentIndex = array.length,  randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    shuffle(arr);

    for (let i = 0; i < 5; i += 1) {
      const prodImg = arr[i];
      // carouselContent += `<li class="${ID}-jumper" id="${ID}-jumper-${i}" ><img src="${prodImg}"></li>`;
      if (prodImg.indexOf('/49254/613f27cb71d021631528907') > -1) {
        carouselContent += `<li class="${ID}-jumper" id="${ID}-jumper-${i}" ><div style="background-image:url('${prodImg}');background-size: 125%;"></div></li>`;
      } else if (prodImg.indexOf('/49254/611f86d404ddf1629456084') > -1) {
        carouselContent += `<li class="${ID}-jumper" id="${ID}-jumper-${i}" ><div style="background-image:url('${prodImg}');background-size: 102.5%;"></div></li>`;
      } else {
        carouselContent += `<li class="${ID}-jumper" id="${ID}-jumper-${i}" ><div style="background-image:url('${prodImg}')"></div></li>`;
      }
      
    }

    pollerLite([`ul.${ID}-carousel`], () => {
      if (window.innerWidth > 767) {
        // DESKTOP
        document.querySelector(`ul.${ID}-carousel`).insertAdjacentHTML('afterbegin', carouselContent);
      } else {
        // MOBILE
        document.querySelector(`ul.${ID}-carousel`).insertAdjacentHTML('afterbegin', carouselContent);
      }
      
      pollerLite([`ul.${ID}-carousel li`], () => {
        initiateSlick();
      });
    });
     
  }, 1500);

};
