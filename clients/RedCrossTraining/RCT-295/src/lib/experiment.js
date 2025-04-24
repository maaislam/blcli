import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { popularCourses } from './data/data';

const { ID, VARIATION } = shared;

const init = () => {
  const anchorPoint = document.querySelector('.homepage-hero + .related-links-card-container');

  const htmlStr = `<div class='wrapper ${ID}__wrapper'>
    <div class='${ID}__popularCoursesContainer'>
      <h3 class='${ID}__title'>Popular Courses</h3>
      <div class='${ID}__popularCourses'>
        ${popularCourses?.map(({ title, url }) => `<a href='${url}' class='${ID}__popularCourse'>${title}</a>`).join('')}
      </div>
    </div>
  </div>`;

  if (!document.querySelector(`.${ID}__popularCoursesContainer`)) {
    anchorPoint.insertAdjacentHTML('beforebegin', htmlStr);
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-2N7DXLH3YG';
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('button.search')) {
      fireEvent('User interact with search');
    } else if (target.closest(`.${ID}__popularCourse`)) {
      fireEvent('User interact with quicklinks');
    } else if (target.closest('.navigation li')) {
      fireEvent('User interact with navigation');
    } else if (target.closest('.cta') || target.closest('.related-links-card--link')) {
      fireEvent('User interact with homepage content');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
