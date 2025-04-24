/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  const ratingScoreSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" fill="#00AA6C" stroke="#00AA6C"/>
  </svg>
  `
  const halfRatingScoreSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" fill="url(#paint0_linear_15_1854)" stroke="#00AA6C"/>
    <defs>
      <linearGradient id="paint0_linear_15_1854" x1="0" y1="8" x2="8" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0.9999" stop-color="#00AA6C"/>
        <stop offset="1" stop-color="white"/>
      </linearGradient>
    </defs>
  </svg>
  `
  const emptyRatingScoreSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <circle cx="8" cy="8.5" r="7.5" stroke="#00AA6C"/>
  </svg>
`

  const dimHTML = `
  <div class="${ID}-dim ${ID}-hide">
  </div>`


  pollerLite(['.container.rebaseContainer #section-img-with-hotel-details .trip-advisor-rating', () => typeof window.DY.feedProperties === 'object' && typeof window.DY.ServerUtil === 'object'], () => {

    function getHotelSKU() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const hotelSKU = window.DY.feedProperties.sku;
          resolve(hotelSKU);
        }, 1000)
      })
    }

    function getTAData(hotelSKU) {
      return new Promise((resolve, reject) => {
          window.DY.ServerUtil.getProductsData([hotelSKU], ['daily', 'twoDays'], 'view', true, function(err, res) {
            if(err) {
              reject(err);
            } else {
              const tripAdvisorData = res[hotelSKU].productData;
              resolve(tripAdvisorData);
            }
          });
        })
    }


    function insertTAHTML(TAData){

    //get total reviews
    const totalReviews = document.querySelector('.trip-advisor-rating .ta-wrapper span').innerText.split(' ')[0];
    //hotel rating overall
    const hotelRatingOverall = (parseFloat(TAData['TA_Overall_Rating']) / 10).toFixed(1);
    let hotelRatingOverallStars = '';
    for (let i = 0; i < Math.floor(hotelRatingOverall); i++) {
      hotelRatingOverallStars += ratingScoreSVG;
    }
    let hotelRatingOverallStarsHalf = '';
    if(hotelRatingOverall % 1 !== 0) {
     hotelRatingOverallStarsHalf = halfRatingScoreSVG;
    }
    let emptyhotelRatingOverallStars = '';
    for (let i = 0; i < 5 - Math.ceil(hotelRatingOverall); i++) {
      emptyhotelRatingOverallStars += emptyRatingScoreSVG;
    }
    const hotelRatingOverallStarsHTML = `${hotelRatingOverallStars}${hotelRatingOverallStarsHalf}${emptyhotelRatingOverallStars}`;

    //hotel rating location
    const hotelRatingLocation = (parseFloat(TAData['TA_Location_Rating']) / 10).toFixed(1);
    let hotelRatingLocationStars = '';
    for (let i = 0; i < Math.floor(hotelRatingLocation); i++) {
      hotelRatingLocationStars += ratingScoreSVG;
    }
    let hotelRatingLocationStarsHalf = '';
    if(hotelRatingLocation % 1 !== 0) {
     hotelRatingLocationStarsHalf = halfRatingScoreSVG;
    }
    let emptyHotelRatingLocationStars = '';
    for (let i = 0; i < 5 - Math.ceil(hotelRatingLocation); i++) {
      emptyHotelRatingLocationStars += emptyRatingScoreSVG;
    }
    const hotelRatingLocationStarsHTML = `${hotelRatingLocationStars}${hotelRatingLocationStarsHalf}${emptyHotelRatingLocationStars}`;

    //hotel rating service
    const hotelRatingService = (parseFloat(TAData['TA_Service_Rating']) / 10).toFixed(1);
    let hotelRatingServiceStars = '';
    for( let i = 0; i < Math.floor(hotelRatingService); i++) {
      hotelRatingServiceStars += ratingScoreSVG;
    }
    let hotelRatingServiceStarsHalf = '';
    if(hotelRatingService % 1 !== 0) {
      hotelRatingServiceStarsHalf = halfRatingScoreSVG;
    }
    let emptyHotelRatingServiceStars = '';
    for (let i = 0; i < 5 - Math.ceil(hotelRatingService); i++) {
      emptyHotelRatingServiceStars += emptyRatingScoreSVG;
    }
    const hotelRatingServiceStarsHTML = `${hotelRatingServiceStars}${hotelRatingServiceStarsHalf}${emptyHotelRatingServiceStars}`;

    //hotel rating cleanliness
    const hotelRatingCleanliness = (parseFloat(TAData['TA_Cleanliness_Rating']) / 10).toFixed(1);
    let hotelRatingCleanlinessStars = '';
    for( let i = 0; i < Math.floor(hotelRatingCleanliness); i++) {
      hotelRatingCleanlinessStars += ratingScoreSVG;
    }
    let hotelRatingCleanlinessStarsHalf = '';
    if(hotelRatingCleanliness % 1 !== 0) {
      hotelRatingCleanlinessStarsHalf = halfRatingScoreSVG;
    }
    let emptyHotelRatingCleanlinessStars = '';
    for (let i = 0; i < 5 - Math.ceil(hotelRatingCleanliness); i++) {
      emptyHotelRatingCleanlinessStars += emptyRatingScoreSVG;
    }
    const hotelRatingCleanlinessStarsHTML = `${hotelRatingCleanlinessStars}${hotelRatingCleanlinessStarsHalf}${emptyHotelRatingCleanlinessStars}`;

    //hotel rating value
    const hotelRatingValue = (parseFloat(TAData['TA_Value_Rating']) / 10).toFixed(1);
    let hotelRatingValueStars = '';
    for( let i = 0; i < Math.floor(hotelRatingValue); i++) {
      hotelRatingValueStars += ratingScoreSVG;
    }
    let hotelRatingValueStarsHalf = '';
    if(hotelRatingValue % 1 !== 0) {
      hotelRatingValueStarsHalf = halfRatingScoreSVG;
    }
    let emptyHotelRatingValueStars = '';
    for (let i = 0; i < 5 - Math.ceil(hotelRatingValue); i++) {
      emptyHotelRatingValueStars += emptyRatingScoreSVG;
    }
    const hotelRatingValueStarsHTML = `${hotelRatingValueStars}${hotelRatingValueStarsHalf}${emptyHotelRatingValueStars}`;


    //hotel HTML add but hidden
    const hotelRatingHTML = `
    <div class="${ID}-hotel-rating-container ${ID}-hide">
      <div class="${ID}-hotel-rating-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="170" height="37" viewBox="0 0 170 37" fill="none">
          <path d="M168.283 24.5557C167.758 24.5557 167.332 24.9821 167.332 25.507C167.332 26.032 167.758 26.4583 168.283 26.4583C168.808 26.4583 169.234 26.032 169.234 25.507C169.234 24.9821 168.808 24.5557 168.283 24.5557ZM168.283 26.3075C167.84 26.3075 167.482 25.9474 167.482 25.507C167.482 25.0645 167.842 24.7066 168.283 24.7066C168.725 24.7066 169.085 25.0666 169.085 25.507C169.085 25.9475 168.725 26.3075 168.283 26.3075ZM168.593 25.3441C168.593 25.1711 168.47 25.0686 168.289 25.0686H167.985V25.9354H168.134V25.6217H168.297L168.454 25.9354H168.615L168.442 25.5895C168.534 25.5472 168.593 25.4627 168.593 25.3441ZM168.283 25.4869H168.136V25.1994H168.283C168.383 25.1994 168.444 25.2496 168.444 25.3421C168.444 25.4366 168.381 25.4869 168.283 25.4869ZM53.66 14.9282V12.6274H50.1324V26.3155H53.66V18.1079C53.66 16.6217 54.6133 15.8916 56.0996 15.8916H58.0303V12.6275H56.3811C55.0899 12.6274 53.9677 13.3012 53.66 14.9282ZM61.3347 7.21338C60.1279 7.21338 59.2028 8.16669 59.2028 9.37339C59.2028 10.5519 60.1279 11.5052 61.3347 11.5052C62.5413 11.5052 63.4665 10.5519 63.4665 9.37339C63.4665 8.16664 62.5413 7.21338 61.3347 7.21338ZM59.5749 26.3155H63.0944V12.6274H59.5749V26.3155ZM79.8595 19.4715C79.8595 23.3792 76.692 26.5468 72.7842 26.5468C71.2074 26.5468 69.7775 26.03 68.6311 25.1571V30.3339H65.1116V12.6274H68.6311V13.7859C69.7775 12.913 71.2074 12.3961 72.7842 12.3961C76.692 12.3961 79.8595 15.5638 79.8595 19.4715ZM76.3179 19.4715C76.3179 17.3497 74.5963 15.6281 72.4745 15.6281C70.3527 15.6281 68.6312 17.3497 68.6312 19.4715C68.6312 21.5933 70.3528 23.3148 72.4745 23.3148C74.5963 23.3148 76.3179 21.5953 76.3179 19.4715ZM141.031 18.2708L138.978 17.7077C137.627 17.3557 137.102 16.9414 137.102 16.2275C137.102 15.5316 137.842 15.0449 138.9 15.0449C139.907 15.0449 140.698 15.7045 140.698 16.5492V16.6276H143.942V16.5492C143.942 14.0654 141.916 12.3961 138.9 12.3961C135.913 12.3961 133.743 14.0634 133.743 16.3621C133.743 18.1501 134.928 19.4975 136.995 20.0566L138.962 20.5936C140.456 21.0079 141.011 21.4665 141.011 22.2891C141.011 23.1559 140.209 23.7392 139.014 23.7392C137.769 23.7392 136.931 22.9507 136.931 21.7803V21.7018H133.488V21.7803C133.488 24.5879 135.748 26.5508 138.986 26.5508C142.105 26.5508 144.37 24.6341 144.37 21.9955C144.37 20.7003 143.791 19.0069 141.031 18.2708ZM92.345 12.6274H95.8645V26.3155H92.345V25.157C91.1986 26.0299 89.7686 26.5468 88.1919 26.5468C84.2842 26.5468 81.1166 23.3792 81.1166 19.4714C81.1166 15.5637 84.2842 12.3961 88.1919 12.3961C89.7686 12.3961 91.1986 12.913 92.345 13.7858V12.6274ZM92.345 19.4715C92.345 17.3477 90.6234 15.6281 88.5016 15.6281C86.3797 15.6281 84.6582 17.3497 84.6582 19.4715C84.6582 21.5933 86.3797 23.3148 88.5016 23.3148C90.6253 23.3148 92.345 21.5953 92.345 19.4715ZM108.573 7.75638H112.093V26.3175H108.573V25.159C107.427 26.0319 105.997 26.5488 104.42 26.5488C100.512 26.5488 97.3447 23.3812 97.3447 19.4734C97.3447 15.5657 100.512 12.3981 104.42 12.3981C105.997 12.3981 107.427 12.915 108.573 13.7878V7.75638ZM108.573 19.4715C108.573 17.3497 106.852 15.6281 104.73 15.6281C102.608 15.6281 100.886 17.3497 100.886 19.4715C100.886 21.5933 102.606 23.3148 104.73 23.3148C106.852 23.3148 108.573 21.5953 108.573 19.4715ZM128.433 26.3155H131.953V12.6274H128.433V26.3155ZM130.193 7.21338C128.987 7.21338 128.061 8.16669 128.061 9.37339C128.061 10.5519 128.987 11.5052 130.193 11.5052C131.4 11.5052 132.325 10.5519 132.325 9.37339C132.325 8.16664 131.4 7.21338 130.193 7.21338ZM159.583 19.4715C159.583 23.3792 156.415 26.5468 152.507 26.5468C148.599 26.5468 145.432 23.3792 145.432 19.4715C145.432 15.5637 148.599 12.3961 152.507 12.3961C156.415 12.3961 159.583 15.5638 159.583 19.4715ZM156.351 19.4715C156.351 17.3497 154.629 15.6281 152.507 15.6281C150.385 15.6281 148.664 17.3497 148.664 19.4715C148.664 21.5933 150.383 23.3148 152.507 23.3148C154.629 23.3148 156.351 21.5953 156.351 19.4715ZM51.8579 7.75638H38.3569V10.8958H43.3547V26.3155H46.8622V10.8958H51.86V7.75638H51.8579ZM120.135 22.5667L117.004 12.6275H113.307L118.004 26.3155H122.239L126.963 12.6275H123.267L120.135 22.5667ZM164.739 14.9282V12.6274H161.212V26.3155H164.739V18.1079C164.739 16.6217 165.693 15.8916 167.179 15.8916H169.109V12.6275H167.46C166.169 12.6274 165.049 13.3012 164.739 14.9282Z" fill="black"/>
          <path d="M18.0002 36.5C27.9414 36.5 36.0002 28.4411 36.0002 18.5C36.0002 8.55887 27.9414 0.5 18.0002 0.5C8.05912 0.5 0.000244141 8.55887 0.000244141 18.5C0.000244141 28.4411 8.05912 36.5 18.0002 36.5Z" fill="#34E0A1"/>
          <path d="M29.1177 14.9882L31.2898 12.6251H26.473C24.0616 10.9779 21.1494 10.0186 17.9999 10.0186C14.8544 10.0186 11.9503 10.9799 9.54293 12.6251H4.71411L6.88618 14.9882C5.55481 16.2029 4.72017 17.9527 4.72017 19.8955C4.72017 23.5618 7.69272 26.5343 11.3591 26.5343C13.1008 26.5343 14.6876 25.8626 15.8722 24.7645L18 27.0814L20.1278 24.7665C21.3124 25.8646 22.8972 26.5343 24.6388 26.5343C28.3052 26.5343 31.2818 23.5618 31.2818 19.8955C31.2837 17.9507 30.4491 16.201 29.1177 14.9882ZM11.3611 24.3884C8.87924 24.3884 6.86812 22.3773 6.86812 19.8955C6.86812 17.4137 8.87929 15.4025 11.3611 15.4025C13.8428 15.4025 15.854 17.4137 15.854 19.8955C15.854 22.3773 13.8428 24.3884 11.3611 24.3884ZM18.0019 19.7647C18.0019 16.8083 15.852 14.2702 13.0142 13.1862C14.5488 12.5446 16.2321 12.1886 17.9999 12.1886C19.7677 12.1886 21.4531 12.5446 22.9876 13.1862C20.1519 14.2722 18.0019 16.8083 18.0019 19.7647ZM24.6409 24.3884C22.159 24.3884 20.1479 22.3773 20.1479 19.8955C20.1479 17.4137 22.159 15.4025 24.6409 15.4025C27.1227 15.4025 29.1338 17.4137 29.1338 19.8955C29.1338 22.3773 27.1226 24.3884 24.6409 24.3884ZM24.6409 17.5383C23.3396 17.5383 22.2857 18.5922 22.2857 19.8935C22.2857 21.1947 23.3396 22.2485 24.6409 22.2485C25.9421 22.2485 26.9959 21.1947 26.9959 19.8935C26.9959 18.5942 25.9421 17.5383 24.6409 17.5383ZM13.7161 19.8955C13.7161 21.1967 12.6623 22.2506 11.3611 22.2506C10.0599 22.2506 9.00598 21.1967 9.00598 19.8955C9.00598 18.5942 10.0599 17.5404 11.3611 17.5404C12.6623 17.5383 13.7161 18.5942 13.7161 19.8955Z" fill="black"/>
        </svg>
      </div>

      <div class="${ID}-hotel-rating-overall">
        <div class="${ID}-hotel-rating-overall-number">
        <p>${hotelRatingOverall}</p>
        </div>
        <div class="${ID}-hotel-rating-overall-stars">
          <div class="${ID}-hotel-rating-overall-stars-inner-top">
            Excellent
          </div>
          <div class="${ID}-hotel-rating-overall-stars-inner-bottom">
            ${hotelRatingOverallStarsHTML}
          </div>
        </div>
        <div class="${ID}-hotel-rating-total-reviews">
          <p>${totalReviews} reviews</p>
        </div>
      </div>

      <div class="${ID}-hotel-rating-category-container">
        <div class="${ID}-hotel-rating-category">
          ${hotelRatingLocationStarsHTML}
         <p>Location</p>
        </div>
        <div class="${ID}-hotel-rating-category">
        ${hotelRatingCleanlinessStarsHTML}
        <p>Cleanliness</p>
        </div>
        <div class="${ID}-hotel-rating-category">
        ${hotelRatingServiceStarsHTML}
        <p>Service</p>
        </div>
        <div class="${ID}-hotel-rating-category">
        ${hotelRatingValueStarsHTML}
        <p>Value</p>
        </div>
      </div>
    </div>
  `

    //target current rating and insert HTML 
    const tripAdvisorRating = document.querySelector('.hotel-details-right-content .trip-advisor-rating');
    tripAdvisorRating.insertAdjacentHTML('beforeend', hotelRatingHTML);
    tripAdvisorRating.insertAdjacentHTML('afterend', dimHTML);
    tripAdvisorRating.classList.add(`${ID}-trip-advisor-rating`);


    //target hotel rating HTML and dimHTML as DOM element
    const hotelRatingDOM = document.querySelector(`.${ID}-hotel-rating-container`);
    const dimDOM = document.querySelector(`.${ID}-dim`);

    function toggleTripAdvisorRating() {
      hotelRatingDOM.classList.toggle(`${ID}-hide`);
      dimDOM.classList.toggle(`${ID}-hide`);
    }

    tripAdvisorRating.addEventListener('click', function () {
      toggleTripAdvisorRating();
      fireEvent('Click - User has seen detailed reviews');
    });

    dimDOM.addEventListener('click', function () {
      toggleTripAdvisorRating();
    });  
  }

      function fetchDataAndInsertHTML() {
        getHotelSKU()
          .then((hotelSKU) => {
            return getTAData(hotelSKU);
          })
          .then((TAData) => {
            insertTAHTML(TAData);
          })
          .catch((err) => {
            console.log(err);
          })
      }

        fetchDataAndInsertHTML();
  })
}

const addTracking = () => {

  if (VARIATION == 'control') {
    fireEvent('User is part of control');
  } else if (VARIATION == 1) {
    fireEvent('User is part of Variation 1');
  }

  document.body.addEventListener('click', (e) => {
    // Nav tracking
    if (e.target.closest('.trip-advisor-rating')) {
      fireEvent(`Click - User has clicked on trip advisor rating`);
    }
  })
}

export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

};
