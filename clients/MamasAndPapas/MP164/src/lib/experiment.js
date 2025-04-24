/**
 * MP164 - PLP/PDP Sprint.
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { whatPage, buildModal, timer, seenModal, showModal, titleTrigger, whatMessage } from './helpers/help';
import settings from './settings';

const activate = () => {
  setup();

  // Experiment code
  const page = whatPage();

  // Running a timeout to catch the feefo reviews. 
  // Can't poll in case products don't have any reviews.
  setTimeout(() => {
    if (page === 'PDP') {
      events.send(settings.ID, 'MP164 PDP Active', 'Test is active on PDP');
  
      const message = whatMessage();
      console.log('message ', message);
      // build and add the modal
      buildModal(null, null, message);
  
  
      // Start the timer
      timer(45000, () => {
        // Check if modal has already been displayed
        if (!seenModal()) {
          showModal();
          events.send(settings.ID, 'MP164 PDP Seen', 'User saw modal');
        } 
      });
  
      // Attach event to title for copy trigger
      titleTrigger(() => {
        // Check if modal has already been displayed
        if (!seenModal()) {
          showModal();
          events.send(settings.ID, 'MP164 PDP Seen', 'User saw modal');
        }
      });
  
    }
  }, 1000);

};

export default activate;
