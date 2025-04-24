import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observeIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

//window[`${ID}__datatype`] = 'recently viewed';

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^|;\\s?)${name}=([^;]*)`));
  return match && match[2] ? unescape(match[2]) : undefined;
};
const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 1000);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig);
      }
    });
  });
  //Initialize the previous URL to the current URL
  try {
    observer.previousUrl = window.location.href;
    //Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      console.log(`Error starting onUrlChange observer: ${error}`);
    }
  }
};

const previouslyViewedBadge = () => {
  const htmlStr = `<div class='${ID}__prevViewedBadge'>
    <span class='${ID}__closeIcon'>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
        <path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path>
      </svg>
    </span>
    <span class='${ID}__prevViewedBadgeText'>You’ve previously viewed</span>
  </div>`;

  return htmlStr;
}

const prevBookedBadge = () => {
  const htmlStr = `<div class='${ID}__prevViewedBadge'>
    <span class='${ID}__closeIcon'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64"><path d="M 16 14 C 15.488 14 14.976938 14.194937 14.585938 14.585938 C 13.804937 15.366937 13.804937 16.633063 14.585938 17.414062 L 29.171875 32 L 14.585938 46.585938 C 13.804938 47.366938 13.804937 48.633063 14.585938 49.414062 C 14.976937 49.805062 15.488 50 16 50 C 16.512 50 17.023062 49.805062 17.414062 49.414062 L 32 34.828125 L 46.585938 49.414062 C 47.366938 50.195063 48.633063 50.195062 49.414062 49.414062 C 50.195063 48.633062 50.195062 47.366937 49.414062 46.585938 L 34.828125 32 L 49.414062 17.414062 C 50.195063 16.633063 50.195062 15.366938 49.414062 14.585938 C 48.633062 13.804938 47.366937 13.804938 46.585938 14.585938 L 32 29.171875 L 17.414062 14.585938 C 17.023062 14.194938 16.512 14 16 14 z"></path></svg></span>
    <span class='${ID}__prevViewedBadgeText'>Previously booked</span>
  </div>`;

  return htmlStr;
};

const init = () => {
  const hotelCards = document.querySelectorAll('.qa-hotel.hotel-card');

  // Retrieve previously viewed hotels from localStorage
  const prevViewedHotels = JSON.parse(localStorage.getItem(`${ID}__hotelInfo`)) || [];

  console.log('prevViewedHotels: ', prevViewedHotels);
  const prevHotelTitles = prevViewedHotels.map((hotel) => hotel.title.trim())

  // Iterate over all hotel cards
  hotelCards.forEach((card) => {
    const hotelNameElem = card.querySelector('.qa-hotel-name');

    if (hotelNameElem) {
      const hotelName = hotelNameElem.textContent.trim();
      
      const result = prevHotelTitles.some((prevHotelTitle) => prevHotelTitle.includes(hotelName));

      // Check if the hotel is in the previously viewed map
      if (result) {
        card.classList.add(`${ID}__prevViewedHotel`);
        card.insertAdjacentHTML('afterbegin', previouslyViewedBadge());
      }
    }
  });

  // window.DYO.recommendationWidgetData(165323, {}, function (error, data) {
  //   if (error) {
  //     console.log('Error fetching recommendation data:', error);
  //     return;
  //   }

  //   const { slots } = data;

  //   const slotMap = new Map();
  //   slots.forEach((slot) => {
  //     slotMap.set(slot.item.name.trim(), slot);
  //   });

  //   console.log('slotMap:', slotMap);

  //   hotelCards.forEach((card) => {
  //     const hotelNameElem = card.querySelector('.qa-hotel-name');
  //     const hotelName = hotelNameElem.textContent.trim();

  //     if (slotMap.has(hotelName)) {
  //       card.classList.add(`${ID}__prevViewedHotel`);
  //       card.insertAdjacentHTML('afterbegin', prevViewedBadge());
  //     }
  //   });
  // });

  //check if user is logged in

  //get upcoming bookings then

  const loggedin = () => {
    return getCookie('TLUSERSIGNEDIN') === '1';
  };

  if (!loggedin()) {
    return;
  }
  fetch('/api/v3/bookings/leisure?listType=upcomingBooking&offset=0&limit=25&groupBy=checkInDate', {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${getCookie('TLUSERAUTHTOKEN')}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {

      if (data.data.futureBookings.length === 0) {
        return;
      }

      const hotels = data.data.futureBookings.map((booking) => booking.hotelName.trim());

      hotelCards.forEach((card) => {
        const hotelNameElem = card.querySelector('.qa-hotel-name');
        const hotelName = hotelNameElem.textContent.trim();

        if (hotels.includes(hotelName)) {
          if (card.querySelector(`.${ID}__prevViewedBadge`)) {
            //remove badge
            card.querySelector(`.${ID}__prevViewedBadge`).remove();
          }
          card.classList.add(`${ID}__prevViewedHotel`);
          card.insertAdjacentHTML('afterbegin', prevBookedBadge());
        }
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
  //get upcoming bookings
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__closeIcon`)) {
      const card = target.closest('.qa-hotel.hotel-card');
      card.classList.remove(`${ID}__prevViewedHotel`);
      card.querySelector(`.${ID}__prevViewedBadge`).remove();
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();

  let scrollTimer;
  const intersectionAnchor = document.querySelector('.footer.qa-footer');
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          init();
        }, 1000);
      }
    });
  };
  observeIntersection(intersectionAnchor, 0, handleIntersection);

  onUrlChange(() => {
    init();

    let timer;
    const intersecAnchor = document.querySelector('.footer.qa-footer');
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            init();
          }, 1000);
        }
      });
    };
    observeIntersection(intersecAnchor, 0, handleIntersect);
  });
};
