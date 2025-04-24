import { fullStory, events } from '../../../../lib/utils';
import { courses } from './lib/descriptions';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC034',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    components.courseDescription();
    components.numberOfResults();
    components.dropdownSort();
    components.arrangeResults();
    components.moveSearch();
    components.addIcons();
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
  },

  components: {
    /**
     * @desc get the number of results and add to the title
     */
    numberOfResults: () => {
      const resultAmount = document.querySelector('.course-search-summary span');
      const title = document.querySelector('.course-search-current h2');
      const allText = document.createElement('span');
      allText.innerText = 'All';
      title.insertBefore(allText, title.firstChild);
      title.appendChild(resultAmount);
    },
    /**
     * @desc Move search results up
     */
    moveSearch: () => {
      const searchBox = document.querySelector('.show-internal-search');
      document.querySelector('.course-search-current').insertAdjacentElement('afterend', searchBox);
    },
    /**
     * @desc create the top course description box
     */
    courseDescription: () => {
      const { settings } = Experiment;
      // create the course description box
      const courseName = document.querySelector('.course-search-current h2 strong').textContent.trim();
      const courseSearch = document.querySelector('.course-refinement');

      const courseDescription = document.createElement('div');
      courseDescription.classList.add('RC034-courseDescription');
      courseDescription.innerHTML = `<div class="RC034-desc_toggle">
      <h3>${courseName}</h3>
        <div class="RC034-less">Less information</div>
      </div>
      <div class="RC034-more_info">
        <div class="RC034-certified"></div>
        <ul class="RC034-points"></ul>
      </div>`;
      courseSearch.appendChild(courseDescription);

      // add bullet points
      for (let i = 0; i < Object.keys(courses).length; i += 1) {
        const data = Object.entries(courses)[i];
        const key = data[0];
        const category = data[1];

        if (courseName === key) {
          document.querySelector('.RC034-certified').innerHTML = category.certified;

          const coursePoints = category.bullets;
          [].forEach.call(coursePoints, (element) => {
            const bulletPoint = document.createElement('div');
            bulletPoint.classList.add('RC034-bulletPoint');
            bulletPoint.innerHTML = element;
            document.querySelector('.RC034-points').appendChild(bulletPoint);
          });
        }
      }

      // on less info click, hide the info
      const lessInfo = document.querySelector('.RC034-less');
      lessInfo.addEventListener('click', () => {
        if (lessInfo.textContent === 'Less information') {
          lessInfo.textContent = 'More information';
          events.send(settings.ID, 'Click', 'Closed more information', { sendOnce: true });
          document.querySelector('.RC034-more_info').classList.add('RC034-hide_info');
        } else if (lessInfo.textContent === 'More information') {
          events.send(settings.ID, 'Click', 'Clicked more information', { sendOnce: true });
          lessInfo.textContent = 'Less information';
          document.querySelector('.RC034-more_info').classList.remove('RC034-hide_info');
        }
      });
    },
    /**
     * @desc Add the dropdowns
     */
    dropdownSort: () => {
      const sortBy = document.getElementById('main_0_contentmain_0_SortingControl').outerHTML;
      const sortByRadius = document.getElementById('main_0_contentmain_0_RadiusControl').outerHTML;
      const sortByBlock = document.createElement('div');
      sortByBlock.classList.add('RC034-sort_by');
      sortByBlock.innerHTML = `<div class="RC034-radius">${sortByRadius}</div><div class="RC034-dates"><span>Sort by:</span>${sortBy}</div>`;
      document.querySelector('.RC034-courseDescription').insertAdjacentElement('afterend', sortByBlock);
    },
    /**
     * @desc Loop through all the course results and rearrange
     */
    arrangeResults: () => {
      const { settings } = Experiment;
      const courseResults = document.querySelectorAll('.table-responsive .course-search-location');
      for (let index = 0; index < courseResults.length; index += 1) {
        const courseDetails = courseResults[index];
        courseDetails.querySelector('.icon-info').outerHTML = '<span class="RC034-details">(Details)</span>';

        const closeDetails = document.createElement('div');
        closeDetails.classList.add('RC034-close_details');
        closeDetails.innerHTML = '&times;';

        courseDetails.appendChild(closeDetails);

        // click on details
        courseDetails.querySelector('.RC034-details').addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Clicked on course details link', { sendOnce: true });
        });

        courseDetails.addEventListener('click', () => {
          if (courseDetails.querySelector('.RC034-close_details').classList.contains('RC034-close_showing')) {
            courseDetails.querySelector('.RC034-close_details').classList.remove('RC034-close_showing');
          } else {
            courseDetails.querySelector('.RC034-close_details').classList.add('RC034-close_showing');
          }
        });
      }

      // add the nearest center text to result if distance is showing
      const nearestCenter = document.createElement('div');
      nearestCenter.classList.add('RC034-nearest');
      nearestCenter.innerText = 'This is your nearest center';
      const selectedFilter = document.querySelector('#main_0_contentmain_0_SortingControl');
      const chosenFilter = selectedFilter.options[selectedFilter.selectedIndex].value;
      if (chosenFilter === 'distance') {
        document.querySelector('.course-venue-distance').insertAdjacentElement('beforebegin', nearestCenter);
      }
    },
    addIcons: () => {
      const allResults = document.querySelectorAll('.table-responsive tbody tr');

      for (let index = 0; index < allResults.length; index += 1) {
        const element = allResults[index];
        const dates = element.querySelector('.course-col-date');
        if (dates) {
          const courseDate = dates.childNodes[0].nodeValue;
          const courseTime = dates.childNodes[2].nodeValue;
          dates.innerHTML = `<div class="RC034-date">${courseDate}</div>
          <div class="RC034-time">${courseTime}</div>`;
        }
      }
    },
  },
};

export default Experiment;
