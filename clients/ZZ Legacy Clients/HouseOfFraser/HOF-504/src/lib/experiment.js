/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage } from '../../../../../lib/utils';
 import { fetchMaleFemale } from './fetchBrands';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let mySwiper;

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector(`.${ID}-festivebrands--links`);
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    freeMode: true,
    slidesPerView: 'auto',
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      350: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 10,
      }, 
    }
  
  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function() {
    mySwiper.init();
  }, 300);



}

let categoryData = [
  // Female
  { categoryName: 'Womens Party Dresses', categoryURL: 'https://www.houseoffraser.co.uk/women/dresses/party', categoryGender: "female" },
  { categoryName: 'Womens Hoodies & Sweatshirts', categoryURL: 'https://www.houseoffraser.co.uk/women/hoodies-and-sweatshirts', categoryGender: "female" },
  { categoryName: 'Womens Scarves & Wraps', categoryURL: 'https://www.houseoffraser.co.uk/accessories/womens-scarves', categoryGender: "female" },
  { categoryName: 'Womens Boots', categoryURL: 'https://www.houseoffraser.co.uk/shoes-and-boots/ladies-boots', categoryGender: "female" },
  { categoryName: 'Womens Nightwear & Slippers', categoryURL: 'https://www.houseoffraser.co.uk/women/nightwear-and-slippers', categoryGender: "female" },
  { categoryName: 'Womens Knitwear', categoryURL: 'https://www.houseoffraser.co.uk/women/knitwear', categoryGender: "female" },
  { categoryName: 'Womens Gloves', categoryURL: 'https://www.houseoffraser.co.uk/accessories/ladies-gloves', categoryGender: "female" },
  { categoryName: 'Womens Jumper Dresses', categoryURL: 'https://www.houseoffraser.co.uk/women/dresses/jumper-dresses', categoryGender: "female" },
  // Male
  { categoryName: 'Mens Hoodies & Sweatshirts', categoryURL: 'https://www.houseoffraser.co.uk/men/hoodies-and-sweatshirts', categoryGender: "male" },
  { categoryName: 'Mens Boots', categoryURL: 'https://www.houseoffraser.co.uk/shoes-and-boots/mens-boots', categoryGender: "male" },
  { categoryName: 'Mens Knitwear', categoryURL: 'https://www.houseoffraser.co.uk/men/knitwear', categoryGender: "male" },
  { categoryName: 'Mens Nightwear & Slippers', categoryURL: 'https://www.houseoffraser.co.uk/men/nightwear', categoryGender: "male" },
  { categoryName: 'Mens Gloves', categoryURL: 'https://www.houseoffraser.co.uk/accessories/mens-gloves', categoryGender: "male" },
  { categoryName: 'Mens Scarves', categoryURL: 'https://www.houseoffraser.co.uk/accessories/mens-scarves', categoryGender: "male" },
  { categoryName: 'Mens Hats & Caps', categoryURL: 'https://www.houseoffraser.co.uk/accessories/mens-caps-and-hats', categoryGender: "male" },
  { categoryName: 'Mens Suits', categoryURL: 'https://www.houseoffraser.co.uk/men/suits', categoryGender: "male" },

]

const startExperiment = () => {

  let expHTML = `
  
    <div class="${ID}-festivebrands">
    
      <div class="${ID}-festivebrands--header">
        <h2> House of Festive </h2>
        <h3> By Category </h3>
      </div>

      <div class="${ID}-festivebrands--links swiper-container">
        <div class="swiper-wrapper">
        
        </div>
      </div>
    
    </div>
  
  `;

  let insertionPoint = document.querySelector('.swiper-container-xmas-categories');
  insertionPoint.insertAdjacentHTML('beforebegin', expHTML);

  document.documentElement.classList.add(`${ID}-festivebrandsdisplayed`);

  fetchMaleFemale().then((gender) => {

    logMessage("You are interested in "+gender+" garments/accessories");

    let genderCategoryData = categoryData.filter((data) => {

      if(data.categoryGender == gender) {
        return data;
      } 

    })

    let linkInsertionPoint = document.querySelector(`.${ID}-festivebrands--links`);
    genderCategoryData.forEach((item) => {

      let linkHTML = `<a class="swiper-slide" href="${item.categoryURL}">${item.categoryName}</a>`;
      linkInsertionPoint.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend', linkHTML);

    });

    fireEvent('Visible - experiment has been shown on the christmas page');

    let allCurrLinks = document.querySelectorAll(`.${ID}-festivebrands--linksinner a`);

    
      // let totalWidth = 0;
      // [].slice.call(allCurrLinks).forEach((link) => {
      //   totalWidth = totalWidth + link.offsetWidth + 25;
      // })
      // document.querySelector(`.${ID}-festivebrands--linksinner`).style.minWidth = totalWidth + "px";
    
      initiateSlider();

    [].slice.call(allCurrLinks).forEach((link) => {
      link.addEventListener('click', (e) => {
        fireEvent(`Click - user has clicked on item: ${link.innerText} and gone to ${link.href}`);
      })
    });

  })


}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
