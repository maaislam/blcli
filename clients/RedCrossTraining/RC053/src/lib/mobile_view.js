import { pollerLite, observer } from '../../../../../lib/uc-lib';

export default () => {
  // Add Background
  observer.connect([document.querySelector('.rc4-search-box')], (el, mutation) => {
    pollerLite(['.RC022_courseType_overlay--active'], () => {
      const background = document.querySelector('.RC053-background');
      if (!background) {
        const courseTypeOverlay = document.querySelector('.RC022_courseType_overlay.RC022_courseType_overlay--active');
        courseTypeOverlay.insertAdjacentHTML('beforebegin', `<div class='RC053-background'></div>`);
      } else {
        background.style.display = 'block';
      }

      /*** Hide background when lightbox is not open ***/
      // When user clicks X 
      pollerLite(['span.rc4-options-overlay__close'], () => {
        const closeLightboxIcons = document.querySelectorAll('span.rc4-options-overlay__close');
        if (closeLightboxIcons.length > 0) {
          [].forEach.call(closeLightboxIcons, (closeIcon) => {
            closeIcon.addEventListener('click', () => {
              document.querySelector('.RC053-background').style.display = 'none';
            });
          });
        }
      }); 
      // When user selects course
      pollerLite(['.rc4-options-overlay a.customSelect'], () => {
        const selectCourseBtns = document.querySelectorAll('.rc4-options-overlay a.customSelect');
        if (selectCourseBtns.length > 0) {
          [].forEach.call(selectCourseBtns, (selectBtn) => {
            selectBtn.addEventListener('click', () => {
              document.querySelector('.RC053-background').style.display = 'none';
            });
          });
        }
      });
    });
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: true,
    },
  });
  
  // Course List
  pollerLite(['.custom-course-container'], () => {
    const courseOptions = document.querySelectorAll('.custom-course-container');
    if (courseOptions) {
      const customHSCBox = `<div class="RC053-customHscBox">HSE certified for workplace</div>`;
      [].forEach.call(courseOptions, (course) => {
        const hscBox = course.querySelector('span.custom-hsc-box');
        if (hscBox) {
          const courseTitle = course.querySelector('.custom-nameNdetails h3');
          courseTitle.insertAdjacentHTML('afterend', customHSCBox);
        }
      });
    }
  });
};