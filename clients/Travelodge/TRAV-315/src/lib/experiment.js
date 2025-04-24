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

const tickSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
  <path d="M5.54998 12.5125L-0.150024 6.81255L1.27498 5.38755L5.54998 9.66255L14.725 0.487549L16.15 1.91255L5.54998 12.5125Z" fill="#008CC6"/>
</svg>`;

const trackRating = () => {
  pollerLite(['.hotel-details-right-content .ta-wrapper img'], () => {
    console.log('Rating found');

    const hdpObj = {
      rating: '',
      highlights: [],
      newDesignImg: ''
    };

    const ratingAboveFour = ['rating_5.0', 'rating_4.5', 'rating_4.0']
    const ratingString = document.querySelector('.hotel-details-right-content .ta-wrapper img').src;
    let newDesignImgSrc;
    if(document.querySelector('#main-carousel-image .badge-style-image')){
      if(document.querySelector('#main-carousel-image .badge-style-image').src.includes('https://media.travelodge.co.uk/image/upload/overlays/NewDesign.png')) {
        console.log('New design');
        newDesignImgSrc = document.querySelector('#main-carousel-image .img-fluid').src;
        hdpObj.newDesignImg = newDesignImgSrc;
      }
    }
    
    const hotelHighlights = document.querySelectorAll('.hotel-details-right-content ul.trv-bullets button span:last-child');
    // hotelHighlights.forEach(highlight => {
    //   highlight.classList.add(`${ID}-highlight`);
    // });
    const removedAC = Array.from(hotelHighlights).filter(highlight => !highlight.textContent.includes('Air-conditioned') && !highlight.textContent.includes('(Zone'));

    console.log('Removed AC', removedAC);
    const highlightHtml = removedAC.map(highlight => highlight.outerHTML);
    console.log('Highlight html', highlightHtml);
    hdpObj.highlights = highlightHtml;



    if(ratingAboveFour.some(rating => ratingString.includes(rating))) {
      hdpObj.rating = ratingString;
      console.log('Rating is above 4');
    }
    // localStorage.setItem(`${ID}-hdpObj`, `${JSON.stringify(hdpObj)}`);

  });
}

const getHDPageData = () => {
  return new Promise((resolve, reject) => {
    const siteNumbers = window.globalDataLayer.siteNumber.split(";");
    const hotelNames = window.globalDataLayer.basketHotelName.split(";");

    const createURL = (siteNumber, hotelName) => {
      const url = `https://www.travelodge.co.uk/hotels/${siteNumber}/${hotelName}`;
      return url;
    };

    const uniqueSiteNumbers = [...new Set(siteNumbers)];
    const uniqueHotelNames = [...new Set(hotelNames)];
    const uniqueHotelNamesFormatted = [...new Set(uniqueHotelNames.map(hotel => hotel.replace(/ /g, '-')))];

    // console.log('Site Numbers', uniqueSiteNumbers);
    // console.log('Hotel Names', uniqueHotelNamesFormatted);

    const queryURLs = [...new Set(uniqueSiteNumbers.map((siteNumber, index) => createURL(siteNumber, uniqueHotelNamesFormatted[index])))];
    // console.log('Query URLs', queryURLs);

    const promises = queryURLs.map(url => {
      return fetch(url)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(data, 'text/html');

          const hotelContent = htmlDoc.querySelector('.hotel-details-right-content');
          const taWrapperImg = hotelContent.querySelector('.ta-wrapper img');
          const newDesignButton = hotelContent.querySelector('.trv-bullets button span:last-child');
          const mainCarouselImage = htmlDoc.getElementById('main-carousel-image');

          const ratingAboveFour = ['rating_5.0', 'rating_4.5', 'rating_4.0']
          const ratingString = taWrapperImg.src;
          // const newDesignButton = htmlDoc.querySelector('.hotel-details-right-content .trv-bullets button span:last-child');
          let newDesignImgSrc;
          if (newDesignButton.innerText.includes('NEW DESIGN')) {
            console.log('New design');
            newDesignImgSrc = mainCarouselImage.querySelector('.img-fluid').src;
        }

          const hotelHighlights = htmlDoc.querySelectorAll('.hotel-details-right-content ul.trv-bullets button span:last-child');
          const removedAC = Array.from(hotelHighlights).filter(highlight => !highlight.textContent.includes('Air-conditioned') && !highlight.textContent.includes('(Zone'));
          const highlightHtml = removedAC.map(highlight => highlight.outerHTML);
          const hdpObj = {
            rating: '',
            highlights: highlightHtml,
            newDesignImg: newDesignImgSrc
          };
          if (ratingAboveFour.some(rating => ratingString.includes(rating))) {
            hdpObj.rating = ratingString;
            console.log('Rating is above 4');
          }

          const hotelId = url.split('/')[4];
          const hotelObj = {
            rating: hdpObj.rating,
            highlights: hdpObj.highlights,
            newDesignImg: hdpObj.newDesignImg
          };
          // console.log('Hotel Obj', hotelObj, 'Hotel ID', hotelId);
          return { hotelId, hotelObj };

        });
    });

    Promise.all(promises)
      .then((results) => {
        // console.log('All promises resolved');

        const hotelData = {};
        results.forEach(result => {
          if (result) { // Check if result is defined
            const { hotelId, hotelObj } = result;
            hotelData[hotelId] = hotelObj;
          }
        });

        // console.log('Hotel Data:', hotelData);
        resolve(hotelData);
      })
      .catch((error) => {
        console.error('Error in Promise.all:', error);
        reject(error);
      });
  });
};

const startExperiment = async () => {
  const hotelData = await getHDPageData();
  const hotelDataArray = Object.entries(hotelData);
  // console.log('Hotel Data in Start Experiemnt', hotelDataArray);

  pollerLite(['.checkout-booking-summary-container .checkout-booking-summary .room-details'], () => {

    const bookingSummarySections = document.querySelectorAll('.checkout-booking-summary-container .checkout-booking-summary ');

    bookingSummarySections.forEach((section, index) => {
    //check for all rooms incl superroom/breakfat/flexible
    const roomDetails = Array.from(section.querySelectorAll('.checkout-booking-summary-container .checkout-booking-summary .rooms-container .room-section'));

    //CHANGED TO SOME
    const allRoomsAreSuperRoom = roomDetails.some(room => 
      room.querySelector('.room-title').innerText.includes('SuperRoom') 
    );

    const allRoomsAreFlexible = roomDetails.some(room =>
      room.querySelector('.room-details div').innerText.includes('Flexible')
    );

    const allRoomsHaveBreakfast = roomDetails.some(room => {
    if(room.querySelector('.extras-details div')){
        if(!room.querySelector('.extras-details div').innerText.includes('Breakfast')){
          return false;
        } else {
        return room.querySelector('.extras-details div').innerText.includes('Breakfast')
          }
        }
      }
    );

    const highlightContainer = document.createElement('div');
    highlightContainer.classList.add(`${ID}-highlight-container`);
    highlightContainer.classList.add(`${ID}-room-specs`);
    if(allRoomsAreSuperRoom) {
      // console.log('All rooms are superroom');
      const superRoomHighlight = `<div class="${ID}-superroom-highlight ${ID}-highlight">${tickSVG}<span>SuperRoom selected</span></div>`;
      highlightContainer.insertAdjacentHTML('beforeend', superRoomHighlight);
    }
    if(allRoomsHaveBreakfast) {
      const breakfastHighlight = `<div class="${ID}-breakfast-highlight ${ID}-highlight">${tickSVG}<span>Breakfast included</span></div>`;
      highlightContainer.insertAdjacentHTML('beforeend', breakfastHighlight);
    }
    if(allRoomsAreFlexible) {
      const checkInDate = section.querySelector('.checkout-booking-summary .checkout-summary-box .iCalendar').closest('div').querySelector('strong span').textContent;
      const flexibleHighlight = `<div class="${ID}-flexible-highlight ${ID}-highlight">${tickSVG}<span>Free cancellation until ${checkInDate.replace("2024", "")} - 12pm</span></div>`;
      highlightContainer.insertAdjacentHTML('beforeend', flexibleHighlight);
    }
    

    //check for breakfast/dinner added
    console.log('Booking summary found');
    const hdpObjString = localStorage.getItem(`${ID}-hdpObj`);
    // const hdpObj = JSON.parse(hdpObjString);
    const hdpObj = hotelDataArray[index][1];
    console.log('HDP OBJ', hdpObj);

    if(hdpObj && hdpObj.newDesignImg) {
      section.querySelector('.checkout-summary-box .hotel-location').insertAdjacentHTML('afterend', `<img src="${hdpObj.newDesignImg}" alt="New Design" class="${ID}-new-design-image">`);
    }

    if(hdpObj && hdpObj.rating) {
      const reviewImg = `<img src="${hdpObj.rating}" alt="Rating" class="${ID}-rating-image">`;
      section.querySelector('.checkout-summary-box .hotel-location').insertAdjacentHTML('afterend', reviewImg);
    }

    if(hdpObj && hdpObj.highlights.length > 0) {
      const highlightsHtml = `
        <div class="${ID}-highlight-container ${ID}-hotel-specs">
          ${hdpObj.highlights.map(highlight => {
            // console.log('Highlight', highlight);
            if(highlight.includes('Food &amp; drink') && allRoomsHaveBreakfast) {
              // console.log(highlight, 'BREAKFAST ALREADY');
              return;
            } 
            if (!highlight.includes('NEW DESIGN') && 
                      !highlight.includes('Central location') && 
                      !highlight.includes('New hotel') && 
                      !highlight.includes('Free parking') && 
                      !highlight.includes('Breakfast') && 
                      !highlight.includes('Dinner') &&
                      !highlight.includes('Food &amp; drink')) {
              return;
            } else {
            return `<div class="${ID}-highlight">${tickSVG + highlight.toLowerCase()}</div>`
            }
          }).join('')}
        </div>
      `;
      if(highlightsHtml.includes(`${ID}-highlight`)) {
        section.querySelector('.checkout-booking-summary-container .checkout-booking-summary .row.booking-details').insertAdjacentHTML('afterend', highlightsHtml);
      }
    }
      if(highlightContainer.querySelector(`.${ID}-highlight`)){
      section.querySelector('.checkout-booking-summary-container .checkout-booking-summary .row.booking-details').insertAdjacentElement('afterend', highlightContainer);
      }

    });
  });
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest(`.proceedToPaymentDefault`)) {
      fireEvent('Click - Proceed to payment clicked');
    }
  });
}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

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
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  // trackRating();
  startExperiment();
};
