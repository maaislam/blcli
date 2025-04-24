import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { parkingIcon, barCafeIcon } from './assets/svg';
import skelatonLoader from './components/skelatonLoader';

const { ID, VARIATION } = shared;

const RENDER_DELAY = 100;
let hotelName = '';
let facilitiesNames = [];
let ratingValue = 0;

const updateImage = () => {
  const parkingImageElem =
    document.querySelector(`.${ID}__hotelCard [title="Chargeable parking nearby"]`) || document.querySelector(`.${ID}__hotelCard [title="Chargeable parking onsite"]`) || document.querySelector(`.${ID}__hotelCard [title="Free parking onsite"]`);

  const barCafeImageElem = document.querySelector(`.${ID}__hotelCard [title="Bar Cafe"]`);

  if (parkingImageElem) {
    parkingImageElem.insertAdjacentHTML('beforebegin', parkingIcon);
    parkingImageElem.remove();
  }
  if (barCafeImageElem) {
    barCafeImageElem.insertAdjacentHTML('beforebegin', barCafeIcon);
    barCafeImageElem.remove();
  }
};

const fetchPDP = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc;
  } catch (error) {
    console.log('An error occurred:', error);
  }
};

const init = () => {
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  const hotelCard = document.querySelector('.map-with-markers__info-box');
  const hotelCardBtn = document.querySelector('.map-with-markers__info-box .qa-map-popover-hotel-link');
  const hotelTitleElem = document.querySelector('.qa-map-popover h1');
  const hotelUrl = hotelCardBtn.getAttribute('href');
  hotelName = hotelTitleElem.textContent;

  hotelCardBtn.textContent = 'See availability';
  hotelCard.classList.add(`${ID}__hotelCard`);
  hotelTitleElem.insertAdjacentHTML('afterend', skelatonLoader(ID));

  // console.log(`User selected hotel name: ${hotelName}`);
  // fireEvent(`User selected hotel name: ${hotelName}`);

  fetchPDP(hotelUrl).then((doc) => {
    const ratingElem = doc.querySelector('.trip-advisor-rating');
    const facilities = doc.querySelector('ul.c-facilities');
    //const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');

    const facilitiesList = Array.from(facilities.querySelectorAll('li.c-facilities__item a'));
    facilitiesNames = facilitiesList.map((facility) => {
      return facility.getAttribute('title');
    });

    hotelTitleElem.insertAdjacentElement('afterend', ratingElem);
    hotelCardBtn.insertAdjacentElement('beforebegin', facilities);

    if (document.querySelector(`.${ID}__loader`)) {
      document.querySelector(`.${ID}__loader`).remove(); // Remove loader
    }

    // console.log(`User selected hotel facilities: ${[...facilitiesNames].join(', ')}`);
    // fireEvent(`User selected hotel facilities: ${[...facilitiesNames].join(', ')}`);

    // if (jsonLdScript) {
    //   const jsonData = JSON.parse(jsonLdScript.innerHTML);

    //   // Access the aggregateRating value
    //   ratingValue = jsonData.aggregateRating?.ratingValue;
    //   console.log(`User selected hotel has ${ratingValue} star rating`);
    //   fireEvent(`User selected hotel has ${ratingValue} star rating`);
    // }

    updateImage();
  });
};

export default () => {
  setup();

  // const { search } = window.location;
  // const urlParams = new URLSearchParams(search);
  // const locationValue = urlParams.get('location');
  // fireEvent(`User searched for - ${locationValue}`);

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;

    if (target.closest('.map')) {
      setTimeout(() => {
        const hotelCard = document.querySelector('.map-with-markers__info-box');

        if (hotelCard && !document.querySelector(`.${ID}__hotelCard`)) {
          init();
        }
      }, RENDER_DELAY);
    }
    // --- If user clicks on See Availability button ---
    // if (target.closest('.qa-map-popover-hotel-link')) {
    //   console.log(`User selected hotel name: ${hotelName}`);
    //   fireEvent(`User selected hotel name: ${hotelName}`);

    //   console.log(`User selected hotel facilities: ${[...facilitiesNames].join(', ')}`);
    //   fireEvent(`User selected hotel facilities: ${[...facilitiesNames].join(', ')}`);

    //   console.log(`User selected hotel has ${ratingValue} star rating`);
    //   fireEvent(`User selected hotel has ${ratingValue} star rating`);
    // }
  });
};
