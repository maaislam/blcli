/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { sliderImages, textOrder } from './components/sliderContent';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // let imageOrder;

  /* imageOrder = textOrder([
    'treadmill', 'bikes', 'strength', 'cross',
  ]); */

  // check if the other order has been set
  /* const productEngagement = JSON.parse(localStorage.getItem('TG-product_engagement'));
  if (productEngagement) {
    const imageMap = { 
      'bike-excite-forma.html': 'bikes',
      'cross-personal.html': 'treadmill'
      'jog-excite-forma.html': 'treadmill',
      'mycycling.html': 'bikes',
      'run-personal.html': 'treadmill',
      'skillbike.html': 'bikes',
      'skillmill-connect.html': 'treadmill',
      'skillrow.html: 
      'skillrun.html: 0
      'synchro-excite-forma.html: 0
      'treadmill-myrun.html: 1
      'unica.html: 0
    }

    // loop over local storage
    // each item in ls match with the map
    // increment the bike counter/ treadmill counter / others
    // add up the counters in each category


  } else {

  } */

  // Default order to be used
  const imageOrder = textOrder([
    'treadmill', 'bikes', 'strength', // 'cross',
  ]);

  // Loop through the text order update one in slider
  Object.keys(imageOrder).reverse().forEach((i) => {
    const data = imageOrder[i];
    // to get the key - [i][0]
    const slideText = document.querySelector(`${[i][0]}`);
    if (slideText) {
      slideText.querySelector('.title').textContent = data.title;
      slideText.querySelector('.subtitle').textContent = data.content;
      slideText.querySelector('.button').setAttribute('href', data.link);
      slideText.querySelector('.button span').textContent = 'Shop Now';
    }
  });
  // Loop through the text and update it
  Object.keys(sliderImages).reverse().forEach((i) => {
    const imageObj = sliderImages[i];
    // to get the key - [i][0]
    const slideImage = document.querySelector(`.hp-top-slider-background .swiper-wrapper ${[i][0]}`);
    // duplicate the end on to the beginning
    let backgroundImage;
    const windowSize = window.innerWidth;
    if (windowSize < 567) {
      backgroundImage = imageObj.mobileImage;
    } else if (windowSize > 567 && windowSize < 1024) {
      backgroundImage = imageObj.horizontalMobile;
    } else if (windowSize >= 1024) {
      backgroundImage = imageObj.desktopImage;
    }
    if (slideImage && slideImage.querySelector('.lazybg.lazy-loaded')) {
      slideImage.querySelector('.lazybg.lazy-loaded').style = `background-image: url("${backgroundImage}")`;
    }
  });

  // loop through banners, on click send event
  const allBanners = document.querySelectorAll('.hp-top-slider-foreground .swiper-slide');
  for (let index = 0; index < allBanners.length; index += 1) {
    const element = allBanners[index];
    element.querySelector('a').addEventListener('click', () => {
      const title = element.querySelector('.title').textContent;
      events.send('TG070', 'click', `${title} banner clicked`);
    });
  }
};

export default activate;
