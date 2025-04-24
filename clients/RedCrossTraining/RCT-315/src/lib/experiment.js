import { fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    },
    { threshold: threshold }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-2N7DXLH3YG';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.trustpilot-widget iframe')) {
      fireEvent('Click - user clicks trust pilot near header');
      console.log('user clicks trust pilot near header');
    } else if (target.closest(`.${ID}-trustpilot-container`) && VARIATION === 'control') {
      fireEvent('Click - user clicks on trust pilot near courses');
      console.log('Click - user clicks on trust pilot near courses');
    } else if (target.closest('.course-list-grid')) {
      fireEvent('Click - user clicks on a course');
      console.log('Click - user clicks on a course');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const handleIntersection = (entry) => {
    // console.log('handleIntersection ~ entry:', entry.isIntersecting);

    if (entry.isIntersecting) {
      if (!document.body.classList.contains(`trustpilot-seen`)) {
        const eventText = VARIATION == 'control' ? 'User would have seen trust pilot reviews' : 'User has seen trust pilot reviews';
        fireEvent(eventText);
        document.body.classList.add(`trustpilot-seen`);
      }
    }
  };

  const handleObserver = (selector) => {
    const intersectionAnchor = document.querySelector(selector);
    if (intersectionAnchor) {
      obsIntersection(intersectionAnchor, 0.2, handleIntersection);
    }
  };

  handleObserver('#trustbox-carousel');
};
