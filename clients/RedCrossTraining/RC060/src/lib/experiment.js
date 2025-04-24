/**
 * RC060 - Returning user lightbox
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, homepageLightbox, getCourseData } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import coursesData from '../lib/coursesData';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // Write experiment code here
  const pathname = window.location.pathname;
  const urlParts = pathname.split('/');
  let page = '';

  /**
   * @desc Check for Returning User
   */
  if (localStorage.getItem(`${shared.ID}-returningUser`) !== null && sessionStorage.getItem(`${shared.ID}-returningUser`) === null) {
    /**
     * ///////////// Returning user //////////////
     */
    console.log('-----returning user');
    if (shared.VARIATION == 'control') {
      let numOfCourses = document.querySelector('.header span.cart-num').innerText;
      numOfCourses = parseInt(numOfCourses, 10);

      if (numOfCourses > 0) {
        setTimeout(() => {
          if (localStorage.getItem(`${shared.ID}-returningUser`) !== null
          && sessionStorage.getItem(`${shared.ID}-returningUser`) === null) {
            console.log('------control');
            events.send('VWO', `${shared.ID} - Returning User Basket`, '', { sendOnce: true });
            // Remove any Storage Items once event has been sent
            localStorage.removeItem(`${shared.ID}-returningUser`);
            sessionStorage.removeItem(`${shared.ID}-returningUser`);
            localStorage.removeItem(`${shared.ID}-data`);
          }
        }, 500);
      }
    } else {
      console.log('---------- V1');
      // -- VARIATION 1
      homepageLightbox();
    }

  } else {
    /**
     * ///////////// First Visit on page //////////////
     */
    if (localStorage.getItem(`${shared.ID}-returningUser`) === null
    && sessionStorage.getItem(`${shared.ID}-returningUser`) === null) {
      console.log('------- first time');
      localStorage.setItem(`${shared.ID}-returningUser`, true);
      sessionStorage.setItem(`${shared.ID}-returningUser`, true);
    }
  }
  // if (pathname.indexOf("/basket") === -1 && pathname.indexOf("/basket") === -1 && urlParts.length === 2) {
  //   page = 'homepage';

  //   /**
  //    * @desc Check for Returning User
  //    */
  //   if (localStorage.getItem(`${shared.ID}-returningUser`) !== null && sessionStorage.getItem(`${shared.ID}-returningUser`) === null) {
  //     /**
  //      * ///////////// Returning user //////////////
  //      */
  //     homepageLightbox();

  //   } else {
  //     /**
  //      * ///////////// First Visit on page //////////////
  //      */
  //     localStorage.setItem(`${shared.ID}-returningUser`, true);
  //     sessionStorage.setItem(`${shared.ID}-returningUser`, true);
  //   }
  // } else if (urlParts.length >= 5 && urlParts[1] === "courses") {
  //   pollerLite(['.component.course-info .wrapper a.cta', 
  //   '.component.content-page-hero--sub .wrapper img'], () => {
  //     page = 'course-info';
  //     getCourseData(urlParts);
  //   });
  // } else if (pathname.indexOf('/where-we-train/course-search') > -1 && urlParts.length === 4) {
  //   page = 'course-search';
  // }

  // console.log(`-------- ${shared.ID} is running`);
};
