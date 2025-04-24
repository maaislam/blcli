/**
 * GD043
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import Lightbox from '../../../../../lib/components/Lightbox/Lightbox';

const activate = () => {
  setup();

  const { ID } = settings;

  // Create lightbox component
  const lightbox = new Lightbox(ID, {
    content: `
      <h2>Struggling to read your optician's handwriting?</h2>
      <p>Don't worry - enter your details as best you can, and our opticians will check over everything. If something doesn't look right, we'll give you a call.</p>
      <div class="${ID}_button">Continue</div>
    `,
    closeOnClick: false,
    afterOpen: () => {
      // Set cookie to prevent experiment firing again
      document.cookie = 'GD043-seen=1';
    },
  });

  // Add event to continue button
  const cta = lightbox.cache.component.querySelector(`.${ID}_button`);
  cta.addEventListener('click', () => {
    lightbox.close();
  });

  // Open lightbox component
  lightbox.open();
};

export default activate;
