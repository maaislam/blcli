import { fullStory, events } from '../../../../lib/utils';
import { publicCourses, workCourses } from './components/publicCourse';
import { bulletPoints, lastBullets } from './components/bulletPoints';
import { pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'BR001',
    VARIATION: '{{VARIATION}}',
  },

  globals: {
    control: '?utm_source=redcross.org.uk&utm_medium=referral&utm_campaign=BR001-Ctrl',
    variation: '?utm_source=redcross.org.uk&utm_medium=referral&utm_campaign=BR001-V1',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.changeNavLink();
    const url = window.location.href;
    if (url.indexOf('/first-aid/book-a-first-aid-course') > -1) {
      document.body.classList.add(`${settings.ID}-firstAidCourse`);
      pollerLite([
        '.component.rich-text.light',
        '.hero-title',
        '.wrapper .base8.ml12.mp12 .large',
        '.component.sublayout-1.light',
      ], () => {
        components.topOfPage();
        components.firstSection();
        components.whyTrainSection();
        components.publicSection();
        components.workCourseSection();
        components.otherCourses();
        components.vulnerablePeople();
      });
    }

    pollerLite([
      '.BR001-CTAs',
      '.BR001-points',
      '.BR001-public_courses',
      '.BR001-work_courses',
    ], () => {
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
      events.send('Google Optimize', `${settings.ID} View`, `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {

    changeNavLink: () => {
      const { settings } = Experiment;
      const navLinks = document.querySelectorAll('.component.navigation .main li a');
      for (let index = 0; index < navLinks.length; index += 1) {
        const element = navLinks[index];
        if (element.textContent === 'Do a first aid course') {
          element.textContent = 'Find a first aid course';

          element.addEventListener('click', () => {
            events.send('Google Optimize', `${settings.ID} clicked`, 'Find a first aid course in the nav');
          });
        }
      }
    },

    topOfPage: () => {
      const firstIntro = document.querySelectorAll('.component.rich-text.light')[0];
      firstIntro.style.display = 'none';
      const pageTitle = document.querySelector('.hero-title');
      const subTitle = document.querySelector('.wrapper .base8.ml12.mp12 .large');
      // change title text
      pageTitle.textContent = 'Find a first aid course';
      subTitle.textContent = 'We offer face to face training courses for people in the workplace, parents and anyone who wants to learn the simple skills needed to help in a first aid emergency.';
    },

    firstSection: () => {
      const { settings, globals } = Experiment;
      let queryString;
      if (settings.VARIATION === '1') {
        queryString = globals.variation;
      }

      const topSection = document.querySelector('.component.rich-text.light:nth-of-type(2) .base7.ml12.mp12');
      // combine the text
      const newintroText = document.createElement('div');
      newintroText.classList.add('BR001-intro');
      newintroText.innerHTML = `<h2> Book your first aid course </h2>
      <p>We offer face to face training courses for people in the workplace, parents and anyone who wants to learn the simple skills needed to help in a first aid emergency. View all our courses below, find the right course by using out course finder, or talk to an expert by calling <strong>08455277743</strong><i>(calls cost 5p per minute, plus standard call charges)</i></p>
      <div class="BR001-CTAs">
        <a class="BR001-button cta" href="https://www.redcrossfirstaidtraining.co.uk/Courses.aspx${queryString}"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)"><g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" id="Icon_arrow" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span>View all courses</a>
        <a class="BR001-button cta" href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx${queryString}"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)"><g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" id="Icon_arrow" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span>Try our course finder</a>
      <div>`;

      topSection.insertBefore(newintroText, topSection.firstChild);
    },

    whyTrainSection: () => {
      const whyTrainWrapper = document.querySelector('.component.sublayout-1.light');
      whyTrainWrapper.innerHTML = `<h2>Why train with us?</h2>
      <div class="BR001-points base6 ml12 mp12"><ul class="BR001-first"></ul><ul class="BR001-last"></ul></div>`;

      // add all the bullet points
      for (let index = 0; index < bulletPoints.length; index += 1) {
        const element = bulletPoints[index];
        const bulletPoint = document.createElement('li');
        bulletPoint.innerHTML = element;

        document.querySelector('.BR001-points .BR001-first').appendChild(bulletPoint);
      }

      for (let index = 0; index < lastBullets.length; index += 1) {
        const element = lastBullets[index];
        const bulletPoint = document.createElement('li');
        bulletPoint.innerHTML = element;

        document.querySelector('.BR001-points .BR001-last').appendChild(bulletPoint);
      }
    },

    publicSection: () => {
      const { settings, globals } = Experiment;
      let queryString;
      if (settings.VARIATION === '1') {
        queryString = globals.variation;
      }

      const introSection = document.querySelector('.component.sublayout-1.light');
      const publicWrapper = document.createElement('div');
      publicWrapper.classList.add('component');
      publicWrapper.classList.add('BR001-public_section');
      publicWrapper.innerHTML = `
      <div class="wrapper">
        <div class="base7 ml12 mp12">
          <h2>First aid for the public</h2>
          <p>You can learn a range of skills on our courses designed for members of the public. These courses are not suitable if you need a first aid certificate for a workplace but will give you skills to help in a first aid emergency.</p>
        </div>
      </div>
      <div class="BR001-fullwidth_wrap">
        <div class="BR001-public_courses">
          <h3>Most popular public courses</h3>
        <div class="BR001-courses_public"></div>
        <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses.aspx${queryString}" class="BR001-allCourse cta"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)"><g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" id="Icon_arrow" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span>View all public courses</a>
      </div>`;
      introSection.insertAdjacentElement('afterend', publicWrapper);


      const coursesWrapper = document.querySelector('.BR001-courses_public');
      // add the courses
      Object.keys(publicCourses).forEach((i) => {
        const data = publicCourses[i];
        const publicCourse = document.createElement('div');
        publicCourse.classList.add('BR001-course');
        publicCourse.innerHTML =
        `<div class="BR001-image" style="background-image: url('${data.image}')"></div>
        <h3>${data.name}</h3>
        <ul>
          <li>${data.point1}</li>
          <li>${data.point2}</li>
          <li>${data.point3}</li>
        </ul>
        <div class="BR001-more_info">
          <a class="BR001-info cta secondary" href="${data.link}${queryString}"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)"><g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" id="Icon_arrow" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span><span>More information</span></a>
        </div>`;
        coursesWrapper.appendChild(publicCourse);
      });
    },

    workCourseSection: () => {
      const { settings, globals } = Experiment;
      let queryString;
      if (settings.VARIATION === '1') {
        queryString = globals.variation;
      }

      const publicSection = document.querySelector('.BR001-public_section');
      const workWrapper = document.createElement('div');
      workWrapper.classList.add('BR001-work_section');
      workWrapper.innerHTML = `
      <div class="wrapper">
        <div class="base7 ml12 mp12">
          <h2>First aid for work</h2>
          <p>Ensure you’ve got the right level of first aid cover for your workplace. Book onto our interactive courses that provide the practical skills and confidence to help save lives.</p>
          <p>As an organisation you need to comply with the Health and Safety (First Aid) Regulations 1981, which govern the provision of first aid by a business to their staff. The regulations apply to all workplaces, regardless of size.</p>
        </div>
      </div>
      <div class="BR001-fullwidth_wrap">
        <div class="BR001-work_courses">
          <h3>Most popular work courses</h3>
        <div class="BR001-courses_work"></div>
        <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland.aspx${queryString}" class="BR001-allCourse cta"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)"><g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" id="Icon_arrow" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span>View all work courses</a>
      </div>`;
      publicSection.insertAdjacentElement('afterend', workWrapper);


      const coursesWrapper = document.querySelector('.BR001-courses_work');
      // add the courses
      Object.keys(workCourses).forEach((i) => {
        const data = workCourses[i];
        const workCourse = document.createElement('div');
        workCourse.classList.add('BR001-course');
        workCourse.innerHTML =
        `<div class="BR001-image" style="background-image: url('${data.image}')"></div>
        <h3>${data.name}</h3>
        <ul>
          <li>${data.point1}</li>
          <li>${data.point2}</li>
          <li>${data.point3}</li>
        </ul>
        <div class="BR001-more_info">
          <a class="BR001-info cta secondary" href="${data.link}${queryString}"><span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g id="C01.02_Navigation_&amp;_Search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="C01.02_Navigation_Search_Mobile" transform="translate(-281 -169)" fill="#262626"><g id="C01.02_Navigation_Secondary_Links" transform="translate(0 60)"><g id="Nav_item_1" transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" id="Icon_arrow" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span><span>More information</span></a>
        </div>`;
        coursesWrapper.appendChild(workCourse);
      });
    },

    otherCourses: () => {
      const otherCourseSection = document.querySelectorAll('.component.rich-text.light')[4];
      otherCourseSection.classList.add('BR001-other_courses');

      const workCoursesWrapper = document.querySelector('.BR001-work_section');
      workCoursesWrapper.insertAdjacentElement('afterend', otherCourseSection);

      const otherTitle = document.createElement('h2');
      otherTitle.innerText = 'Other first aid training courses:';
      otherCourseSection.insertBefore(otherTitle, otherCourseSection.firstChild);

      otherCourseSection.querySelector('p').textContent = 'The British Red Cross also provide first aid training in other areas, including:';
      otherCourseSection.querySelector('p:last-child').innerHTML = '<a class="BR001-allCourses_link" rel="noopener noreferrer" href="https://www.redcrossfirstaidtraining.co.uk/courses/first-aid-at-work-courses-uk-mainland.aspx?utm_source=redcross.org.uk&utm_medium=referral&utm_campaign=BR001-V1" target="_blank">Find out more about the first aid training courses available from British Red Cross</a>';

      otherCourseSection.querySelector('li').textContent = 'Fire marshal training';
      otherCourseSection.querySelector('li:last-child').textContent = 'mental wellbeing, based on the unique British Red Cross psychosocial framework that helps people manage stress and build resilience at work.';
    },
    vulnerablePeople: () => {
      const lastSection = document.querySelector('.component.rich-text.light:last-of-type');
      lastSection.querySelector('a').textContent = 'Find out more about first aid training for organisations supporting vulnerable people';
    },

    sendEvents: () => {
      const { settings } = Experiment;
      const viewAllCourseTop = document.querySelector('.BR001-CTAs .BR001-button');
      const courseFinder = document.querySelector('.BR001-CTAs .BR001-button:last-of-type');
      const trainingVenues = document.querySelector('.BR001-points .BR001-first a');
      const allPublicCourses = document.querySelector('.BR001-public_courses .BR001-allCourse');
      const allWorkCourses = document.querySelector('.BR001-work_courses .BR001-allCourse');
      const allCoursesBottomLink = document.querySelector('.BR001-allCourses_link');
      const vulnerablePeopleLink = document.querySelector('.component.rich-text.light:last-of-type a');

      viewAllCourseTop.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - view all courses (top of page)');
      });
      courseFinder.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - try our course finder');
      });
      trainingVenues.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - UK training venues');
      });
      allPublicCourses.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - view all public courses');
      });
      allWorkCourses.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - view all work courses');
      });
      allCoursesBottomLink.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - view all courses (bottom of page)');
      });
      vulnerablePeopleLink.addEventListener('click', () => {
        events.send('Google Optimize', `${settings.ID} Clicked`, 'CTA - find out more');
      });

      const firstAidnavigationLink = document.querySelector('.component.navigation .main > li:nth-of-type(4)');
      firstAidnavigationLink.addEventListener('mouseenter', () => {
        events.send('Google Optimize', `${settings.ID} User Saw`, 'Find a first aid course in the nav');
      });

      const firstAidInnerLinks = firstAidnavigationLink.querySelectorAll('a');
      for (let index = 0; index < firstAidInnerLinks.length; index += 1) {
        const element = firstAidInnerLinks[index];
        element.addEventListener('click', () => {
          events.send('Google Optimize', `${settings.ID} Clicked`, 'Any first aid nav item from this page');
        });
      }
    },
  },
};

export default Experiment;
