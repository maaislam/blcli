import { events } from '../../../../lib/utils';
import settings from './settings';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function bindGaEvents() {
  const previousBtn = document.querySelector('button.slick-prev.slick-arrow');
  if (previousBtn) {
    previousBtn.addEventListener('click', () => {
      // eslint-disable-next-line
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Clicked left arrow to read more reviews`, { sendOnce: true });
    });
  }
  const nextBtn = document.querySelector('button.slick-next.slick-arrow');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // eslint-disable-next-line
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Clicked right arrow to read more reviews`, { sendOnce: true });
    });
  }
}

export { bindGaEvents }; // eslint-disable-line