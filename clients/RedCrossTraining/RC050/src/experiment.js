import { fullStory, events } from '../../../../lib/utils';
import pageMarkup from './components/pageMarkup';
import courses from './components/courses';
import { pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC050',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    pageMarkup();
    pollerLite(['.RC050-courses'], () => {
      components.addCourse();
      components.sendEvents();
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
  },

  components: {
    addCourse: () => {
      Object.keys(courses).forEach((i) => {
        const data = courses[i];
        const wellbeingCourse = document.createElement('div');
        wellbeingCourse.classList.add('RC050-course');
        wellbeingCourse.innerHTML = `
        <div class="RC050-course_title">${data.name}</div>
        <div class="RC050-course_image" style="background-image:url('${data.image}')"></div>
        <div class="RC050-courseDetails">
          <span>${data.length}</span>
          <span>${data.size}</span>
          <span>${data.price}</span>
        </div>
        <p class="RC050-description">${data.description}</p>
        <a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do/mental-wellbeing-courses/mental-wellbeing-enquiry-form.aspx">Enquire now</a>
        `;
        document.querySelector('.RC050-courses').appendChild(wellbeingCourse);
      });
    },
    sendEvents: () => {
      const { settings } = Experiment;
      pollerLite(['.RC050-course'], () => {
        const allCourses = document.querySelectorAll('.RC050-course');
        for (let index = 0; index < allCourses.length; index += 1) {
          const element = allCourses[index];
          const courseTitle = element.querySelector('.RC050-course_title').textContent;
          element.querySelector('a').addEventListener('click', () => {
            events.send(settings.ID, `Clicked ${courseTitle}`, 'Make an enquiry');
          });
        }

        document.querySelector('.RC050-form_link').addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Enquiry Form');
        });

        document.querySelector('.RC050-review_block a').addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'Read full case study');
        });
      });
    },
  },
};

export default Experiment;
