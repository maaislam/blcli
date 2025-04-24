/**
 * RC064 - Course description on course search
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import coursesData from '../lib/coursesData';

const { ID, VARIATION } = shared;

export default () => {
  /**
   * @desc SHOULD NOT RUN WITH RC062
   */
  setup();

  // Write experiment code here
  const courseResultsTable = document.querySelector('.component.booking-table');
  const selectEl = document.querySelector('select#productId');
  const selectedIndex = selectEl.selectedIndex;
  const selectedCourse = selectEl.options[selectedIndex];
  if (selectedCourse) {
    // console.log(selectedCourse);
    const courseName = selectedCourse.innerText.trim();
    if (courseName && courseName !== '') {
      const data = coursesData[`${courseName}`];

      if (window.innerWidth > 767) {
        const courseDetailsEl = `<div class="${ID}-courseDetails__wrapper ${ID}-courseDetails__wrapper-desktop">
          <div class="${ID}-courseDetails__content">
            <div class="${ID}-courseDetails__content-left">
              <div class="${ID}-course__img" style="background-image: url('${data.img}');"></div>
            </div>
            <div class="${ID}-courseDetails__content-right">
              <div class="${ID}-course__header-top">${data.certification}</div>
              <div class="${ID}-course__header">
                <a href="${data.url}">${courseName}</a>
              </div>
              <div class="${ID}-course__details">
                <p>${data.details}</p>
              </div>
              <a class="${ID}-course__viewMore" href="${data.url}"> > More Information</a>  
            </div>
          </div>
        </div>`;

        courseResultsTable.insertAdjacentHTML('beforebegin', courseDetailsEl);
      } else {
        const courseDetailsEl = `<div class="${ID}-courseDetails__wrapper ${ID}-courseDetails__wrapper-mobile">
          <div class="${ID}-courseDetails__content">
            <div class="${ID}-course__header-top">${data.certification}</div>
            <div class="${ID}-course__header">
              <a href="${data.url}">${courseName}</a>
            </div>
            <div class="${ID}-course__img" style="background-image: url('${data.img}');"></div>
            <div class="${ID}-course__details">
              <p>${data.details}</p>
            </div>
              <a class="${ID}-course__viewMore" href="${data.url}"> > More Information</a>  
          </div>
        </div>`;

        courseResultsTable.insertAdjacentHTML('beforebegin', courseDetailsEl);
      }
      

      
    }
   
    
  }
};
