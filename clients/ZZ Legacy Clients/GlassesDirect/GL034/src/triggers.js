import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.site-review-badge__score', // Render location for mobile - consistent across devices
  // Checks for Trust pilot data
  () => {
    let dataCheck = false;
    const trustPilotElement = document.querySelector('script[type="application/ld+json"]');
    // Make sure element exists
    if (trustPilotElement) {
      const parsedData = JSON.parse(trustPilotElement.innerHTML);
      const trustPilotData = parsedData.aggregateRating && parsedData.aggregateRating.ratingValue;
      // Next line disabled, unexpected use of IsNaN
      // eslint-disable-next-line
      if (!isNaN(parseFloat(trustPilotData))) {
        dataCheck = true;
      }
    }
    return dataCheck;
  },
], Run);
