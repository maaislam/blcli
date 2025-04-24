import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import publicCoursesContent from './lib/public_courses';
import workplaceCoursesContent from './lib/workplace_courses';

/**
 * {{RC048}} - {{Add to bag overlay}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC048',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    // eslint-disable-next-line
    const { settings, services, components, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Get Venue Details
    pollerLite(['.modal-window.mfp-hide .modal-window-inner .venue-details-extra', '.modal-window.mfp-hide .modal-window-inner .venue-details-extra h2', '.modal-window.mfp-hide .modal-window-inner .venue-details-extra p'], () => {
      const mapDetails = document.querySelector('.modal-window.mfp-hide .modal-window-inner .venue-details-extra');
      if (mapDetails) {
        const venueTitle = document.querySelector('.modal-window.mfp-hide .modal-window-inner .venue-details-extra h2').innerHTML.trim();
        const venueAddress = document.querySelector('.modal-window.mfp-hide .modal-window-inner .venue-details-extra p').innerHTML.trim().replace(',', '<br>').replace(',', '<br>');
        const venueHref = document.querySelector('.modal-window.mfp-hide .modal-window-inner .venue-details-extra p>a').href;

        // Build Pop Up
        components.createPopUp(venueTitle, venueAddress, venueHref);
        // Show Pop Up
        bindExperimentEvents.showPopUpLightbox();
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Get Course Page Type
     */
    getCoursesPageType() {
      const url = window.location.href;
      let pageType;
      if (url.indexOf('Public') > -1) {
        pageType = 'Public';
      } else {
        pageType = 'Workplace';
      }
      return pageType;
    },
    /**
     * @desc Update Course Details on Pop Up
     */
    updateCourseDetailsInPopUp(courseTitle, dates, times) {
      const { services } = Experiment;
      let data;
      let dots;
      let moreInfoLink;
      if (courseTitle !== '') {
        document.querySelector('span.RC048-popUp__bookingCourseTitle').innerText = courseTitle;
      }
      if (dates !== '') {
        document.querySelector('div.RC048-dates').innerText = dates;
      }
      if (times !== '') {
        document.querySelector('div.RC048-times').innerText = times;
      }
      const pageType = services.getCoursesPageType();
      if (pageType === 'Workplace') {
        data = workplaceCoursesContent[`${courseTitle}`];
        // eslint-disable-next-line
        dots = data.dots;
        document.querySelector('.RC048-popUp__infoContent ul').innerHTML = dots;
        moreInfoLink = data.link;
        document.querySelector('.RC048-moreInfo__link a').href = moreInfoLink;
      } else if (pageType === 'Public') {
        data = publicCoursesContent[`${courseTitle}`];
        // eslint-disable-next-line
        dots = data.dots;
        document.querySelector('.RC048-popUp__infoContent ul').innerHTML = dots;
        moreInfoLink = data.link;
        document.querySelector('.RC048-moreInfo__link a').href = moreInfoLink;
      }
    },
    /**
     * @desc Add Course In Basket
     */
    addCourseIntoBasket(id) {
      /*eslint-disable */
      const getBasketContents = (id) => {
        const $ = window.jQuery;
        const mainForm = document.forms['MainForm'];
        const url = mainForm.action;
        const extraData = {
          __EVENTTARGET: `${id}`, // See __doPostback definition
        };
        const mainFormSerialized = $(mainForm).serializeArray();
        const requestData = {};
      
        mainFormSerialized.forEach((o) => {
          if(o.name && o.value) {
            requestData[o.name] = o.value;
          }
        });
      
        const requestDataFinal = Object.assign(requestData, extraData);
      
        $.ajax({
          url: url,
          type: 'post',
          data: requestDataFinal,
          success: (data) => {
            const div = document.createElement('div');
            div.innerHTML = data;
          }
        });
      };
      /* eslint-enable */
      getBasketContents(id);
    },
  },

  components: {
    /**
     * @desc Get Course Details for Pop Up
     */
    getCourseDetailsForPopUp(courseDetails) {
      const { services } = Experiment;
      let courseTitle = '';
      let datesText = '';
      let timesText = '';
      if (courseDetails) {
        if (courseDetails.getAttribute('rc18-row-identifier')) {
          courseTitle = courseDetails.getAttribute('rc18-row-identifier');
        }
        if (courseDetails.querySelector('.course-col-date')) {
          const dates = courseDetails.querySelectorAll('.rc23-resulttimes')[0];
          if (dates) {
            datesText = dates.innerText.trim();
          }
          const times = courseDetails.querySelectorAll('.rc23-resulttimes')[1];
          if (times) {
            timesText = times.innerText.trim();
          }
        }
        services.updateCourseDetailsInPopUp(courseTitle, datesText, timesText);
      }
    },
    /**
     * @desc Create Pop Up
     */
    createPopUp(venueTitle, venueAddress, venueHref) {
      const { bindExperimentEvents } = Experiment;
      const mainContainer = document.querySelector('.site-container');
      const popUpContainer = `<div class='RC048-popUp__wrapper hide'>
        <div class='RC048-popUp__container'>
          <div class='RC048-popUp__topContent'>
            <div class='RC048-popUp__bookingDetailsContent'>
              <div class='RC048-popUp__bookingContent'>
                <div class='RC048-popUp__bookingAction'>
                  <span class='RC048-bookingAction'>Added</span>
                  <span class='RC048-popUp__bookingCourseTitle'></span>
                </div>
                <div class="RC048-popUp__bookingCtaBtn">
                  <div class="RC048-bookingCta" onclick="window.location.href='/Purchase/YourDetails.aspx'">Continue to booking</div>
                </div>
                <div class="RC048-popUp__bookingDate">
                  <div class='RC048-dates'></div>
                  <div class='RC048-times'></div>
                </div>
              </div>
            </div>
            <div id='RC048-popUp__close'><span></span></div>
          </div>
          <div class="RC048-popUp__bottomContent">
            <div class="RC048-popUp__venueContent">
              <div class='RC048-popUp__content'>
                <div class="RC048-popUp__venueTitle">${venueTitle}</div>
                <div class="RC048-popUp__venueAddress">${venueAddress}</div>
                <div class="RC048-popUp__venueUrl"><a href='${venueHref}'>Go to venue page</a></div>
              </div>
            </div>
            <div class="RC048-popUp__moreInfoContent">
              <div class='RC048-popUp__infoContent'>
                <div class='RC048-popUp__moreInfoTitle'>What you'll learn</div>
                <ul>
                </ul>
                <div class='RC048-moreInfo__link'>
                  <a href=''>More Information</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      mainContainer.insertAdjacentHTML('beforeend', popUpContainer);

      // GA Events
      bindExperimentEvents.bindGAEvents();
    },
  },

  bindExperimentEvents: {
    /**
     * @desc Show Lightbox
     */
    showPopUpLightbox() {
      const { components, services, bindExperimentEvents } = Experiment;
      const bookCtaBtnContainers = document.querySelectorAll('.course-result-cart.form-autoSubmit');
      [].forEach.call(bookCtaBtnContainers, (container) => {
        const btn = container.querySelector('.course-result-cart-wrapper input.button-primary.button-addtocart');
        if (btn) {
          let updateButton = false;
          // eslint-disable-next-line
          btn.setAttribute('onclick', 'javascript: null');
          const courseDetails = btn.parentElement.parentElement.parentElement;
          if (btn.classList.contains('button-updatebutton')) {
            btn.innerText = 'UPDATE BASKET';
            btn.value = 'UPDATE BASKET';
            btn.style.fontSize = '1em';
            updateButton = true;
            // Hide increase/decrease input
            const inputNumber = btn.previousElementSibling;
            if (inputNumber) {
              inputNumber.style.display = 'none';
            }
          }
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (updateButton) {
              window.location.href = '/Basket.aspx';
            } else {
              const courseId = btn.getAttribute('name');
              services.addCourseIntoBasket(courseId);
              components.getCourseDetailsForPopUp(courseDetails);
              const popUpWrapper = document.querySelector('.RC048-popUp__wrapper');
              if (popUpWrapper) {
                popUpWrapper.classList.remove('hide');
                const mainContentWrapper = document.querySelector('#wrapper.main-wrapper');
                if (mainContentWrapper) {
                  mainContentWrapper.classList.add('blur');
                }
                // Close Pop Up Lightbox
                bindExperimentEvents.closePopUpLightbox();
              }
            }
          });
        }
      });
    },
    /**
     * @desc Close Lightbox
     */
    closePopUpLightbox() {
      const popUpWrapper = document.querySelector('.RC048-popUp__wrapper');
      if (popUpWrapper) {
        const popUpLightbox = document.querySelector('.RC048-popUp__container');
        window.addEventListener('click', (e) => {
          if (!document.querySelector('.RC048-popUp__container').contains(e.target)) {
            if (popUpLightbox) {
              popUpWrapper.classList.add('hide');
              popUpWrapper.classList.add('shown');
              document.querySelector('#wrapper.main-wrapper').classList.remove('blur');
              if (popUpWrapper.classList.contains('shown')) {
                window.location.reload();
              }
            }
          }
        });
        const closeIcon = document.querySelector('div#RC048-popUp__close');
        if (closeIcon) {
          closeIcon.addEventListener('click', () => {
            if (popUpLightbox) {
              popUpWrapper.classList.add('hide');
              popUpWrapper.classList.add('shown');
              document.querySelector('#wrapper.main-wrapper').classList.remove('blur');
              if (popUpWrapper.classList.contains('shown')) {
                window.location.reload();
              }
            }
          });
        }
      }
    },
    /**
     * @desc GA Events
     */
    bindGAEvents() {
      const { settings } = Experiment;
      const closeIcon = document.querySelector('#RC048-popUp__close > span');
      /*eslint-disable */
      if (closeIcon) {
        closeIcon.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Cross icon`, { sendOnce: true });
        });
      }
      const continueBtn = document.querySelector('.RC048-popUp__bookingCtaBtn > .RC048-bookingCta');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Continue to booking`, { sendOnce: true });
        });
      }
      const venuePageLink = document.querySelector('.RC048-popUp__venueUrl > a');
      if (venuePageLink) {
        venuePageLink.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Go to venue page`, { sendOnce: true });
        });
      }
      /* eslint-enable */
    },
  },
};

export default Experiment;
