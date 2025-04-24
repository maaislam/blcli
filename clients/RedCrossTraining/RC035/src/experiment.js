import { fullStory } from '../../../../lib/utils';
import { courses } from './lib/RC035-courses';

// look in to why price has broke - look at tooltip code added
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation     number in production
   */
  settings: {
    ID: 'RC035',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    services.getcourseJsonData();
    services.addTotalPrice();
    services.showHidebasketItems();
    services.addCourseDesc();
    services.showHideToolTip();

    // move back to courses wrapper
    const lastPage = document.referrer;
    const backToCourses = document.querySelector('.purchasenav-back-button');
    const mainWrapper = document.querySelector('.checkout-heading');
    mainWrapper.insertBefore(document.querySelector('.purchasenav-back-button'), mainWrapper.firstChild);
    if (lastPage !== '') {
      backToCourses.setAttribute('href', lastPage);
    }
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
     * @desc loop through basket items and add relevant data - e.g price, course no, info
     */
    getcourseJsonData: function getcourseJsonData() {
      // loop through course elements
      const course = document.querySelectorAll('.purchasenav-basket-contents-course');
      for (let i = 0; i < course.length; i += 1) {
        const element = course[i];

        // add item listing number
        const courseCount = document.createElement('div');
        courseCount.classList.add('RC035-courseItem_no');
        courseCount.innerHTML = `<span>${(i + 1)}</span>`;

        element.appendChild(courseCount);

        // wrap the course data in spans for the icons
        const courseDate = element.querySelector('.course-result-description');
        courseDate.innerHTML = `<span class="RC035-course_data">${courseDate.innerHTML.split('<br>').join('</span><span class="RC035-course_data">')}</span>`;

        const courseTitle = element.querySelector('.course-result-name').textContent.trim();
        const courseItems = window.basketContentsJson.Items;
        // add the price and inc vat to each course
        courseItems.forEach((item) => {
          const jsonCourseName = item.Course;
          if (courseTitle === jsonCourseName) {
            const courseObjPrice = parseFloat(item.Price, 0);
            const places = item.Quantity;
            const coursePrice = document.createElement('div');
            const courseIncVat = courseObjPrice * 1.2;
            const totalIncVat = courseIncVat * places;
            coursePrice.classList.add('RC035-courseprice');
            const totalExVat = courseObjPrice * places;
            coursePrice.innerHTML = `<p><span class="RC035-courseEx">£${totalExVat.toFixed(2)}</span> (£${totalIncVat.toFixed(2)} inc VAT)</p>`;
            if (!element.querySelector('.RC035-courseprice')) {
              element.appendChild(coursePrice);
            }
          }
        });
        // add the tooltip icon for each course
        const tooltipIcon = document.createElement('div');
        tooltipIcon.classList.add('RC035-tooltip');
        element.insertBefore(tooltipIcon, element.querySelector('.course-result-name').previousSibling);
      }
    },
    /**
     * @desc add total basket price
     */
    addTotalPrice: function addTotalprice() {
      const coursePrices = document.querySelectorAll('.purchasenav-basket-contents-course .RC035-courseEx');
      let total = 0;
      let VATprice = 0;
      for (let x = 0; x < coursePrices.length; x += 1) {
        const element = coursePrices[x];
        total += parseFloat(element.textContent.replace('£', ''), 10);
        VATprice = total * 1.2;
      }
      const basket = document.querySelector('.purchasenav-mini-basket');
      const totalPriceWrapper = document.createElement('div');
      totalPriceWrapper.classList.add('RC035-basket_wrapper');
      totalPriceWrapper.innerHTML = `
      <i class="icon-cart-empty"></i>
      <div class="RC035-basket_title">
        <h3>Basket</h3>
        <p class="RC035-courses_length">${document.querySelectorAll('.purchasenav-basket-contents-course').length} Course/s - <span>£${VATprice.toFixed(2)} inc VAT</span></p>
      </div>`;
      basket.insertBefore(totalPriceWrapper, basket.firstChild);
    },
    /**
     * @desc toggle basket items
     */
    showHidebasketItems: function showHidebasketItems() {
      const basketWrapper = document.querySelector('.RC035-basket_wrapper');
      const basketContent = document.querySelector('.purchasenav-basket-contents');
      basketWrapper.addEventListener('click', () => {
        if (basketContent.classList.contains('RC035-basket_showing')) {
          basketContent.classList.remove('RC035-basket_showing');
          basketWrapper.classList.remove('RC035-basketTitle_showing');
        } else {
          basketContent.classList.add('RC035-basket_showing');
          basketWrapper.classList.add('RC035-basketTitle_showing');
        }
      });
    },
    /**
     * @desc get course descriptions from object and add to tooltip and course box
     */
    addCourseDesc: function addCourseDesc() {
      const courseObj = courses;
      for (let i = 0; i < Object.keys(courseObj).length; i += 1) {
        const data = Object.entries(courseObj)[i];
        const key = data[0];
        const description = data[1].desc;
        const longDescription = data[1].courseDetailed;
        [].forEach.call(document.querySelectorAll('.purchasenav-basket-contents-course'), (item) => {
          const courseName = item.querySelector('.course-result-name');
          const courseDescription = document.createElement('p');
          courseDescription.classList.add('RC035-course_description');
          courseDescription.innerHTML = `${description}`;

          // add the long tooltip description
          const longTooltip = document.createElement('div');
          longTooltip.classList.add('RC035-tooltip_desc');
          longTooltip.innerHTML = `<span><div class="RC035-tooltip_close">&times;</div>${longDescription}</span>`;

          if (courseName.textContent.trim() === key) {
            item.insertBefore(courseDescription, courseName.nextSibling);
            courseName.appendChild(longTooltip);
          }
        });
      }
    },
    /**
     * @desc show/hide the tooltip
     */
    showHideToolTip: function showHideToolTip() {
      const course = document.querySelectorAll('.purchasenav-basket-contents-course');
      [...course].forEach((item) => {
        const toolTipTrigger = item.querySelector('.RC035-tooltip');
        const courseToolTip = item.querySelector('.RC035-tooltip_desc');
        const tooltipExit = item.querySelector('.RC035-tooltip_close');

        if (window.innerWidth > 1024) {
          toolTipTrigger.addEventListener('mouseover', () => {
            [].forEach.call(document.querySelectorAll('.RC035-tooltip_desc'), (element) => {
              element.classList.remove('RC035-tooltip_showing');
              courseToolTip.classList.add('RC035-tooltip_showing');
            });
          });
          if (tooltipExit) {
            toolTipTrigger.addEventListener('mouseleave', () => {
              courseToolTip.classList.remove('RC035-tooltip_showing');
            });
          }
        } else {
          toolTipTrigger.addEventListener('click', () => {
            [].forEach.call(document.querySelectorAll('.RC035-tooltip_desc'), (element) => {
              element.classList.remove('RC035-tooltip_showing');
              courseToolTip.classList.add('RC035-tooltip_showing');
            });
          });
          if (tooltipExit) {
            tooltipExit.addEventListener('click', () => {
              courseToolTip.classList.remove('RC035-tooltip_showing');
            });
          }
        }
      });
    },
  },

  components: {
  },
};

export default Experiment;
