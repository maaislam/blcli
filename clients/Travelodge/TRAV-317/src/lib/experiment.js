/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, logMessage, pollerLite, setCookie, deleteCookie } from '../../../../../lib/utils';
import  locationData  from './locationData';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const trackHotels = () => {

  pollerLite(['body',
    () => { return window.globalDataLayer; }
  ], () => {
    console.log('tracking hotels');
    let todayDate = new Date();


    let todayDateFormatted = todayDate.getDate() + '/' + (todayDate.getMonth() + 1) + '/' + todayDate.getFullYear();

    let checkIn = getParameterByName('checkIn') !== null ? getParameterByName('checkIn') : todayDateFormatted;
    let checkOut = getParameterByName('checkOut') !== null ? getParameterByName('checkOut') : todayDateFormatted;

    if (checkIn.indexOf('/22') > -1) {
      checkIn = checkIn.replace('/22', '/2022');
    }
    if (checkIn.indexOf('/23') > -1) {
      checkIn = checkIn.replace('/23', '/2023');
    }
    if (checkIn.indexOf('/24') > -1) {
      checkIn = checkIn.replace('/24', '/2024');
    }
    if (checkIn.indexOf('/25') > -1) {
      checkIn = checkIn.replace('/25', '/2025');
    }

    if (checkOut.indexOf('/22') > -1) {
      checkOut = checkOut.replace('/22', '/2022');
    }
    if (checkOut.indexOf('/23') > -1) {
      checkOut = checkOut.replace('/23', '/2023');
    }
    if (checkOut.indexOf('/24') > -1) {
      checkOut = checkOut.replace('/24', '/2024');
    }
    if (checkOut.indexOf('/25') > -1) {
      checkOut = checkOut.replace('/25', '/2025');
    }


    let currURL = window.location.href;
    // let globalDL = window.globalDataLayer;

    let location = currURL.split('location=')[1].split('&')[0];
    // console.log(location, 'location 1');
    if(location.indexOf('London') > -1) {
      location = 'london';
      // console.log(location, 'location 2');
    }
    if(location.indexOf('%') > -1) {
      location = location.split('%')[0];
      // console.log(location, 'location 2');
    }

    location = location.toLowerCase();
    console.log(location, 'location');

    let locationObj = {
      location: location,
      fullStringURL: currURL,
      checkIn: checkIn,
      checkOut: checkOut,
    }

    // let roomObject = {
    //   name: globalDL.hotelName,
    //   id: globalDL.hotelCode,
    //   location: location,
    //   nearbyHotels: globalDL.nearbyHotelFirst,
    //   checkIn: checkIn,
    //   checkOut: checkOut,
    //   fullStringURL: currURL,
    // };

    if (localStorage.getItem(`${ID}-recently-viewed`)) {
      let recentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));
  
      // Check if the location already exists in recentlyViewed
      const existingIndex = recentlyViewed.findIndex(item => item.location === location);
  
      // If the location exists, remove it from its current position
      if (existingIndex !== -1) {
          recentlyViewed.splice(existingIndex, 1);
      }
      
      // Add the new location to the beginning of the array
      recentlyViewed.unshift(locationObj);
  
      // If the length of recentlyViewed exceeds 3, remove the last item
      if (recentlyViewed.length > 3) {
          recentlyViewed.pop();
      }
  
      // Update localStorage and setCookie
      localStorage.setItem(`${ID}-recently-viewed`, JSON.stringify(recentlyViewed));
      setCookie(`${ID}-recently-viewed`, true);
  }
   else {

      let roomArray = [locationObj];

      localStorage.setItem(`${ID}-recently-viewed`, JSON.stringify(roomArray));
      setCookie(`${ID}-recently-viewed`, true);

    }


  });



}

const closeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_2042_256)">
    <path d="M13.4099 11.9999L17.7099 7.70994C17.8982 7.52164 18.004 7.26624 18.004 6.99994C18.004 6.73364 17.8982 6.47825 17.7099 6.28994C17.5216 6.10164 17.2662 5.99585 16.9999 5.99585C16.7336 5.99585 16.4782 6.10164 16.2899 6.28994L11.9999 10.5899L7.70994 6.28994C7.52164 6.10164 7.26624 5.99585 6.99994 5.99585C6.73364 5.99585 6.47824 6.10164 6.28994 6.28994C6.10164 6.47825 5.99585 6.73364 5.99585 6.99994C5.99585 7.26624 6.10164 7.52164 6.28994 7.70994L10.5899 11.9999L6.28994 16.2899C6.19621 16.3829 6.12182 16.4935 6.07105 16.6154C6.02028 16.7372 5.99414 16.8679 5.99414 16.9999C5.99414 17.132 6.02028 17.2627 6.07105 17.3845C6.12182 17.5064 6.19621 17.617 6.28994 17.7099C6.3829 17.8037 6.4935 17.8781 6.61536 17.9288C6.73722 17.9796 6.86793 18.0057 6.99994 18.0057C7.13195 18.0057 7.26266 17.9796 7.38452 17.9288C7.50638 17.8781 7.61698 17.8037 7.70994 17.7099L11.9999 13.4099L16.2899 17.7099C16.3829 17.8037 16.4935 17.8781 16.6154 17.9288C16.7372 17.9796 16.8679 18.0057 16.9999 18.0057C17.132 18.0057 17.2627 17.9796 17.3845 17.9288C17.5064 17.8781 17.617 17.8037 17.7099 17.7099C17.8037 17.617 17.8781 17.5064 17.9288 17.3845C17.9796 17.2627 18.0057 17.132 18.0057 16.9999C18.0057 16.8679 17.9796 16.7372 17.9288 16.6154C17.8781 16.4935 17.8037 16.3829 17.7099 16.2899L13.4099 11.9999Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_2042_256">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

// Function to format a date as dd/mm/yy
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  return `${day}/${month}/${year}`;
}


const recsCarousel = (recs) => {
  const backupRecsArray = [
      {
          location: 'London',
          fullStringURL: 'https://www.travelodge.co.uk/search/results?location=london&lat=&long=&action=search&source=l&checkIn=&rooms%5B0%5D%5Badults%5D=1&rooms%5B0%5D%5Bchildren%5D=0&sb=0',
          imageUrl: 'https://media.travelodge.co.uk/image/upload/destinations/london.webp',
          popularDestinationFlag: true,
      },
      {
          location: 'Edinburgh',
          fullStringURL: 'https://www.travelodge.co.uk/search/results?location=edinburgh&lat=&long=&action=search&source=l&checkIn=&rooms%5B0%5D%5Badults%5D=1&rooms%5B0%5D%5Bchildren%5D=0&sb=0',
          imageUrl: 'https://media.travelodge.co.uk/image/upload/destinations/edinburgh.webp',
          popularDestinationFlag: true,
      },
      {
          location: 'Manchester',
          fullStringURL: 'https://www.travelodge.co.uk/search/results?location=manchester&lat=&long=&action=search&source=l&checkIn=&rooms%5B0%5D%5Badults%5D=1&rooms%5B0%5D%5Bchildren%5D=0&sb=0',
          imageUrl: 'https://media.travelodge.co.uk/image/upload/destinations/manchester.webp',
          popularDestinationFlag: true,
      },
    //   {
    //     location: 'Birmingham',
    //     fullStringURL: 'https://www.travelodge.co.uk/search/results?location=birmingham&lat=&long=&action=search&source=l&checkIn=&rooms%5B0%5D%5Badults%5D=1&rooms%5B0%5D%5Bchildren%5D=0&sb=0',
    //     imageUrl: 'https://media.travelodge.co.uk/image/upload/destinations/birmingham.webp',
    //     popularDestinationFlag: true,
    // },
  ];

  if(!recs) {
    recs = backupRecsArray;
  } else if(recs.length < 4 && recs.length > 0) {
    let newRecs = [];
    const availableRecImages = locationData;
    recs.forEach(element => {
      if (availableRecImages.includes(element.location)) {
        // Check if the location already exists in newRecs
        if (!newRecs.some(rec => rec.location.toLowerCase() === element.location.toLowerCase())) {
          const recObj = {
            location: element.location,
            fullStringURL: element.fullStringURL,
            imageUrl: `https://media.travelodge.co.uk/image/upload/destinations/${element.location}.webp`,
          };
          newRecs.push(recObj);
        }
      }
    });
    console.log(newRecs, 'new recs');
    // Ensure newRecs has exactly 3 elements by adding from backupRecsArray
    let backupIndex = 0;
    while (newRecs.length < 3 && backupIndex < backupRecsArray.length) {
      const backupElement = backupRecsArray[backupIndex];
      // Check if the location already exists in newRecs before pushing
      if (!newRecs.some(rec => rec.location.toLowerCase() === backupElement.location.toLowerCase())) {
        const recObj = {
          location: backupElement.location,
          fullStringURL: backupElement.fullStringURL,
          imageUrl: backupElement.imageUrl,
        };
        newRecs.push(recObj);
      }
      backupIndex++;
    }
    //Check dates and update any expired dates to same weekday next week
    newRecs.forEach((rec) => {
      const urlObj = new URL(rec.fullStringURL);
      // console.log("URL object:", urlObj);
      const params = new URLSearchParams(urlObj.search);
      // console.log("URL parameters:", params.toString());
      
      const checkIn = params.get("checkIn");
      if(!checkIn) {
        return;
      }
      const checkOut = params.get("checkOut");
      
      console.log("Check-in date:", checkIn);
      console.log("Check-out date:", checkOut);
      
      // Parse the check-in date
      const checkInDate = new Date(`20${checkIn.slice(-2)}`, checkIn.slice(3, 5) - 1, checkIn.slice(0, 2));
      const checkOutDate = new Date(`20${checkOut.slice(-2)}`, checkOut.slice(3, 5) - 1, checkOut.slice(0, 2));
      
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of the day
      
      // Check if the check-in date is before today
      if (checkInDate < today) {
        console.log("Check-in date is before today. Updating dates...");
        // Find the next same weekday
        let daysToAdd = (7 - today.getDay() + checkInDate.getDay()) % 7;
        if (daysToAdd === 0) {
          daysToAdd = 7;
        }
        checkInDate.setDate(today.getDate() + daysToAdd);
        checkOutDate.setDate(checkInDate.getDate() + 1); // Assuming check-out is the day after check-in

        // Format the dates
        const newCheckIn = formatDate(checkInDate);
        const newCheckOut = formatDate(checkOutDate);
      
        // Update the URL parameters
        params.set("checkIn", newCheckIn);
        params.set("checkOut", newCheckOut);
      
        // Recreate the full URL string
        const newUrl = `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
        
        console.log("Updated URL:", newUrl);
        rec.fullStringURL = newUrl;
      } else {
        console.log("Check-in date is not before today. No update needed.");
      }
    });

    recs = newRecs;
  }
  const recsCarouselHtml = `
      <div class="${ID}-recs-carousel">
          <div class="${ID}-recs-carousel-head">
              <h2>Your destinations</h2>
              <span class="${ID}-close-recently-viewed">${closeSVG}</span>
          </div>
          <div class="${ID}-recs-carousel-body">
              ${recs.map((rec) => {
      return `
                      <div class="${ID}-rec-card">
                          <a href="${rec.fullStringURL}" class="rec-card-link" ${rec.popularDestinationFlag ? 'data-popular="true"' : ''}>
                              <div class="${ID}-rec-card-image">
                                  <img src="${rec.imageUrl}" alt="${rec.location}">
                              </div>
                              <div class="${ID}-rec-card-content">
                                  <p>Hotels in <span>${rec.location}</span></p>
                              </div>
                          </a>
                      </div>
                  `;
            }).join('')}
          </div>
      </div>`;

  return recsCarouselHtml;
};

const addVariationTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('close-recently-viewed')) {
      fireEvent('Click - recently viewed close button');
    }

    if(e.target.classList.contains('rec-card-link')) {
      fireEvent('Click - recently viewed card');
    }

    if(e.target.getAttribute('data-popular')) {
      fireEvent('Click - popular destination');
    } else if (!e.target.getAttribute('data-popular')) {
      fireEvent('Click - searched for destination');
    }
  });
}


const startExperiment = () => {
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const recentlyViewed = JSON.parse(localStorage.getItem(`${ID}-recently-viewed`));
  const recentlyViewedHtml = recsCarousel(recentlyViewed);

  pollerLite(['.pgHome .main .espot-container'], () => {

    const target = document.querySelector('.pgHome .main .espot-container');
    // const recentlyViewedHtml = recsCarousel();
    target.insertAdjacentHTML('beforebegin', recentlyViewedHtml);

    const closeRecentlyViewed = document.querySelector(`.${ID}-close-recently-viewed`);
    closeRecentlyViewed.addEventListener('click', () => {
      document.querySelector(`.${ID}-recs-carousel`).remove();
    });
  
  })
};

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

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
  if (window.location.href.indexOf('/search/results') > -1 && (getCookie(`${ID}-recview-stoptracking`) !== true)) {
    // console.log('tracking hotels');
    trackHotels();
  } else if (document.body.classList.contains('pgHome') && localStorage.getItem(`${ID}-recently-viewed`) && JSON.parse(localStorage.getItem(`${ID}-recently-viewed`)).length > 0 && VARIATION !== 'control' && !document.querySelector(`.${ID}-recently-viewed`)) {
    pollerLite(['.form-inline-sss'], () => {
      // console.log('adding recently viewed');
      startExperiment();
      addVariationTracking();
    });
  }
};
