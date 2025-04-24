
import { setup, fireEvent } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default () => {
  // -----------------------
  // Data - run against pages shown
  // -----------------------
  const data = {
    '/collections/scent-to-sleep': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%205.jpg',
    '/collections/scent-to-de-stress': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%207%20%283%29.jpg',
    '/collections/scent-to-make-you-happy': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%208.jpg',
    '/collections/scent-to-boost-your-energy': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%206.jpg',
  };

  const imageToShow = data[window.location.pathname.replace(/\/$/, '')];
  if(imageToShow) {
    setup();

    // -----------------------
    // Create target container divs
    // -----------------------
    const cols = document.querySelectorAll('#MainContent .columns .column');
    if(cols.length) {
      const winCutoff = 769;

      // Indices for Target Elements
      const colPosPod = 1;

      [].forEach.call(cols, (col, idx) => {
        if(idx == colPosPod - 1) {
          col.insertAdjacentHTML('afterend', `
            <div class="${shared.ID}-pod ${shared.VARIATION != 'control' ? 
              `column is-3-desktop is-4-tablet is-6-mobile` : ''}"></div>
          `);
        }
      });
    }

    // -----------------------
    // Control and Variation Tracking
    // -----------------------
    const pod = document.querySelector(`.${shared.ID}-pod`);
    if(pod) {
      checkIntersection(pod).then(() => {
        fireEvent(`View Ad Block`);
      });
    }

    // -----------------------
    // Variant specific code
    // -----------------------
    if(shared.VARIATION != 'control') {
      if(pod) {
        pod.setAttribute('style', `background-image:url(${imageToShow})`);

        // Events
        pod.addEventListener('click', e => {
          fireEvent('Clicked Ad Block - ' + location.pathname);
        });
      }
    }
  }
};
