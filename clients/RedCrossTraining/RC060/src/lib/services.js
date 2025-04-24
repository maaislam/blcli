import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import initiateSlick from './initiateSlick';
import coursesData from './coursesData';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const homepageLightbox = () => {
  const getDataFromBasket = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;

        let courses = 'nothing';
        if (temp.querySelector('.component.purchase-summary')) {
          courses = temp.querySelectorAll('.component.purchase-summary tbody tr');
        }

        const data = courses;
        callback(data);
      }
    };
    request.send();
  };

  let numOfCourses = document.querySelector('.header span.cart-num').innerText;
  numOfCourses = parseInt(numOfCourses, 10);

  if (numOfCourses > 0) {
    // Get Stored data - if Recently Viewed exist
    let coursesObj = '';
    if (localStorage.getItem(`${shared.ID}-lightboxShown`) === null) {
      // coursesObj = JSON.parse(localStorage.getItem(`${shared.ID}-data`));
      coursesObj = coursesData;

      // Call
      getDataFromBasket(`https://www.redcrossfirstaidtraining.co.uk/basket/`, (data) => {
        const courses = data;
        let coursesItems = '';
        [].forEach.call(courses, (course) => {
          const courseName = course.querySelector('p strong').innerText;
          const courseDetails = course.querySelector('p').innerHTML.split('<br>');
          const date = courseDetails[1].trim();
          const time = courseDetails[2].trim();
          const location = courseDetails[3].trim();

          for (const key in coursesObj) {
            if (coursesObj.hasOwnProperty(key)) {
              const element = coursesObj[key];
              // console.log(key);
              // console.log(coursesObj[key]);
              // console.log(courseName);
              // console.log('-  -  -  -  -  -  -  -  -  -  -');
              if (courseName.toLowerCase().indexOf(key.toLowerCase()) > -1) {
                coursesItems += `<li class="${shared.ID}-lightbox__content">
                  <div class="${shared.ID}-content__left">
                    <img class="${shared.ID}-product__image" src=${element.img}>
                    
                  </div>
                  <div class="${shared.ID}-content__right">
                    <div class="RC060-course__title">${key}</div>
                    <div class="RC060-course__location">${location}</div>
                    <div class="RC060-course__dateTime">${date} <br> ${time}</div> 
                    <a class="RC060-course__viewMore" href="${element.url}">View More Info</a>  
                  </div>
                </li>`;
              }
              
            }
          }
        });

        // --- Generate Lighbox
        const mainContainer = document.querySelector('main');
        const logo = `<div class="logo">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="21 20 298 62" focusable="false">
                    <title id="title">British Red Cross</title>
                    <path class="st1" fill="#ee2a24" d="M62 40.7V20.1H41.3v20.6H20.7v20.7h20.6v20.5H62V61.4h20.6V40.7z"></path>
                    <path class="st2" fill="#231f20" d="M103.2 52.1h4.9c1.9 0 3.3.8 3.3 2.9 0 2.1-1.6 2.8-3.4 2.8h-4.8v-5.7zm-4.5 9.3h10c3.7 0 7.3-1.8 7.3-6 0-2.6-1.3-4.5-3.8-5.2 1.8-.9 2.8-2.3 2.8-4.3 0-3.8-2.6-5.1-6.6-5.1h-9.7v20.6zm4.5-17.2h4.2c1.6 0 3.1.4 3.1 2.4 0 1.7-1.2 2.5-2.8 2.5h-4.6v-4.9zM117.8 46.4h3.9v2.8h.1c.8-1.9 2.7-3.2 4.7-3.2.3 0 .6.1.9.1V50c-.4-.1-1-.1-1.5-.1-3 0-4 2.2-4 4.8v6.8h-4.1V46.4zM129.4 46.4h4.1v15h-4.1v-15zm4.1-2.3h-4.1v-3.4h4.1v3.4zM142.2 46.4h3v2.8h-3v7.4c0 1.4.4 1.8 1.7 1.8.4 0 .8 0 1.3-.1v3.2c-.7.1-1.5.1-2.4.1-2.5 0-4.7-.6-4.7-3.6v-8.8h-2.5v-2.8h2.5v-4.5h4.1v4.5zM148.1 46.4h4.1v15h-4.1v-15zm4.2-2.3h-4.1v-3.4h4.1v3.4zM157.9 56.5c0 1.8 1.5 2.5 3.2 2.5 1.2 0 2.7-.5 2.7-1.9 0-1.3-1.7-1.7-4.6-2.3-2.4-.5-4.8-1.4-4.8-4 0-3.8 3.3-4.8 6.5-4.8s6.3 1.1 6.6 4.8h-3.9c-.1-1.6-1.3-2-2.8-2-.9 0-2.3.2-2.3 1.4 0 1.5 2.3 1.7 4.7 2.2 2.4.5 4.7 1.4 4.7 4.2 0 4-3.4 5.2-6.8 5.2-3.5 0-6.9-1.3-7.1-5.3h3.9zM169.6 40.7h4.1v7.8h.1c1-1.7 2.8-2.5 4.4-2.5 4.4 0 5.4 2.5 5.4 6.2v9.2h-4.1v-8.5c0-2.5-.7-3.7-2.6-3.7-2.2 0-3.2 1.2-3.2 4.3v7.9h-4.1V40.7zM192.6 44.2h5c2 0 3.1.9 3.1 2.9 0 2.1-1.1 3-3.1 3h-5v-5.9zm-4.5 17.2h4.5v-8.1h4.6c2.3 0 3.1 1 3.5 3.1.2 1.7.2 3.7.7 5h4.5c-.8-1.2-.8-3.6-.9-4.9-.1-2.1-.8-4.2-3-4.8v-.1c2.2-.9 3.2-2.7 3.2-5.2 0-3.1-2.3-5.7-6-5.7h-11.1v20.7zM210.6 52.3c.1-1.2.8-3.2 3.4-3.2 2 0 2.9 1.1 3.3 3.2h-6.7zm10.8 2.6c.3-4.6-2.2-8.9-7.3-8.9-4.5 0-7.6 3.4-7.6 7.9 0 4.6 2.9 7.9 7.6 7.9 3.4 0 5.9-1.5 7-5.1h-3.6c-.3 1-1.6 2-3.2 2-2.3 0-3.5-1.2-3.6-3.8h10.7zM234.1 53.8c0 2.4-.8 4.8-3.5 4.8-2.6 0-3.6-2.5-3.6-4.8 0-2.5.9-4.8 3.6-4.8 2.6.1 3.5 2.4 3.5 4.8zm0 7.6h3.9V40.7h-4.1v7.5h-.1c-1-1.5-2.7-2.2-4.4-2.2-4.4 0-6.6 3.7-6.6 7.8s2.2 8 6.7 8c1.9 0 3.6-.7 4.5-2.3h.1v1.9zM255.8 47.6c-.3-2.1-2.3-3.6-4.5-3.6-4 0-5.6 3.5-5.6 7.1 0 3.5 1.5 6.9 5.6 6.9 2.8 0 4.4-1.9 4.7-4.6h4.4c-.5 5.2-4 8.5-9.1 8.5-6.4 0-10.1-4.8-10.1-10.8 0-6.1 3.7-10.9 10.1-10.9 4.6 0 8.4 2.6 8.9 7.4h-4.4zM262.3 46.4h3.9v2.8h.1c.8-1.9 2.8-3.2 4.8-3.2.3 0 .6.1.9.1V50c-.4-.1-1-.1-1.5-.1-3 0-4 2.2-4 4.8v6.8h-4.1V46.4zM276.6 53.9c0-2.4.8-4.8 3.6-4.8s3.6 2.4 3.6 4.8-.8 4.8-3.6 4.8-3.6-2.5-3.6-4.8zm-4.2 0c0 4.8 3 7.9 7.7 7.9s7.8-3.1 7.8-7.9c0-4.8-3-7.9-7.8-7.9-4.6 0-7.7 3.1-7.7 7.9zM293.2 56.5c0 1.8 1.5 2.5 3.2 2.5 1.2 0 2.7-.5 2.7-1.9 0-1.3-1.7-1.7-4.7-2.3-2.4-.5-4.7-1.4-4.7-4 0-3.8 3.3-4.8 6.5-4.8 3.3 0 6.3 1.1 6.6 4.8h-3.9c-.1-1.6-1.3-2-2.8-2-.9 0-2.3.2-2.3 1.4 0 1.5 2.3 1.7 4.7 2.2 2.4.5 4.7 1.4 4.7 4.2 0 4-3.4 5.2-6.8 5.2-3.5 0-6.8-1.3-7-5.3h3.8zM308.4 56.5c0 1.8 1.5 2.5 3.1 2.5 1.2 0 2.7-.5 2.7-1.9 0-1.3-1.7-1.7-4.7-2.3-2.3-.5-4.7-1.4-4.7-4 0-3.8 3.3-4.8 6.5-4.8 3.3 0 6.3 1.1 6.6 4.8H314c-.1-1.6-1.3-2-2.8-2-.9 0-2.2.2-2.2 1.4 0 1.5 2.3 1.7 4.6 2.2 2.4.5 4.8 1.4 4.8 4.2 0 4-3.4 5.2-6.9 5.2-3.4 0-6.8-1.3-7-5.3h3.9z"></path>
                </svg>
        </div>`;
        const lightboxContainer = `<div class="${shared.ID}-lightbox__wrapper">
          <div class="${shared.ID}-lightbox__container">
            <div  class="${shared.ID}-lightbox__header">
              <span  class="${shared.ID}-lightbox__title">${logo}</span>
              <span class="${shared.ID}-lightbox__close"></span>
            </div>
            <div  class="${shared.ID}-lightbox__subheader">
              <div class="${shared.ID}-lightbox__contentWrapper">
                <span  class="${shared.ID}-lightbox__title">Welcome back!</span>
                <span class="${shared.ID}-lightbox__subtitle">Pick up where you left off?</span>
              </div>
            </div>
            <ul class="${shared.ID}-lightbox__content-wrapper">
              ${coursesItems}
            </ul>
            <div class="RC060-course__cta-wrapper">
                <div class="RC060-course__cta">Continue Booking</div>
            </div>
          </div>
        </div>`;
        mainContainer.insertAdjacentHTML('afterbegin', lightboxContainer);

        // --- Initiate Slick Carousel
        initiateSlick();

        // --- Call Close ligtbox
        const lightboxEl = document.querySelector(`.${shared.ID}-lightbox__wrapper`);
        closeLightbox(lightboxEl);

        // --- Continue to Booking CTA
        continueBookingCta(lightboxEl);

        // ---- If lightbox shown once, do not show again
        localStorage.setItem(`${shared.ID}-lightboxShown`, true);

        /**
         * @desc Lightbox is shown
         * Send GA Event
         */
        setTimeout(() => {
          events.send('VWO', `${shared.ID} - Returning User Basket`, '', { sendOnce: true });
        }, 1500);
        
      });
    }

    
  }
};

export const getCourseData = (urlParts) => {
  const courseTitle = document.querySelector('h1.hero-title').innerText;
  const courseImg = document.querySelector('.component.content-page-hero--sub .wrapper img').getAttribute('src');
  const courseUrl = window.location.href;
  let courseId = '';
  if (urlParts === 5) {
    courseId = urlParts[3];
  } else {
    courseId = urlParts[4];
  }

  const courseCta = document.querySelector('.component.course-info .wrapper a.cta');

  const courseData = {
    'id': `${courseId}`,
    'title': `${courseTitle}`,
    'url': `${courseUrl}`,
    'img': `${courseImg}`,
  };

  courseCta.addEventListener('click', () => {
    let coursesData = {};
    if (localStorage.getItem(`${shared.ID}-data`) !== null) {
      coursesData = JSON.parse(localStorage.getItem(`${shared.ID}-data`));
      const dataLength = Object.keys(coursesData).length;

      if (!coursesData[`${courseId}`]) {
        coursesData[`${courseId}`] = courseData;
        localStorage.setItem(`${shared.ID}-data`, JSON.stringify(coursesData));
      }
      
    } else {
      coursesData[`${courseId}`] = courseData;
      localStorage.setItem(`${shared.ID}-data`, JSON.stringify(coursesData));
    }

  });
  
  // Set Returning User items
  localStorage.setItem(`${shared.ID}-returningUser`, true);
  sessionStorage.setItem(`${shared.ID}-returningUser`, true);
};

/**
 * @desc --- Close Lightbox
 */
export const closeLightbox = (lightboxEl) => {
  // --- Close Icon
  const closeIcon = lightboxEl.querySelector(`.${shared.ID}-lightbox__close`);
  
  closeIcon.addEventListener('click', () => {
    lightboxEl.classList.add('hide');
    // if (pageType === 'pdp') {
    //   lightboxEl.parentNode.removeChild(lightboxEl);
    // }
    localStorage.removeItem(`${shared.ID}-returningUser`);
    sessionStorage.removeItem(`${shared.ID}-returningUser`);
    localStorage.removeItem(`${shared.ID}-data`);
  });

  // --- Clicked outside Lightbox
  // if (window.innerWidth > 1023) {
    lightboxEl.addEventListener('click', (e) => {
      if (!lightboxEl.querySelector(`.${shared.ID}-lightbox__container`).classList.contains('hide')) {
        if (!lightboxEl.querySelector(`.${shared.ID}-lightbox__container`).contains(e.target)) {
          // Clicked outside the box
          lightboxEl.classList.add('hide');
          // if (pageType === 'pdp') {
          //   lightboxEl.parentNode.removeChild(lightboxEl);
          // }
          localStorage.removeItem(`${shared.ID}-returningUser`);
          sessionStorage.removeItem(`${shared.ID}-returningUser`);
          localStorage.removeItem(`${shared.ID}-data`);
        }
      }
    });
  // }
  
};

/**
 * @desc --- Continue Booking
 */
export const continueBookingCta = (lightboxEl) => {
  // --- Continue CTA
  const continueCta = lightboxEl.querySelector(`.${shared.ID}-course__cta`);
  
  continueCta.addEventListener('click', () => {
    localStorage.removeItem(`${shared.ID}-returningUser`);
    sessionStorage.removeItem(`${shared.ID}-returningUser`);
    localStorage.removeItem(`${shared.ID}-data`);
    window.location.href = "https://www.redcrossfirstaidtraining.co.uk/basket/";
  });
};
