
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, checkIntersection } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  const data = {
    '/collections/scent-to-sleep': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%205.jpg',
    '/collections/scent-to-de-stress': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%207%20%283%29.jpg',
    '/collections/scent-to-make-you-happy': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%208.jpg',
    '/collections/scent-to-boost-your-energy': 'https://ucds.ams3.digitaloceanspaces.com/ne-159/image%206.jpg',
  };

  const insertPoints = [0,4,9,14];

  const cols = document.querySelectorAll('#MainContent .columns .column');

  if(shared.VARIATION == 'control') {
    // Tracking would the element have been seen?
    insertPoints.forEach((p, idx) => {
      if(cols[p+1]) {
        checkIntersection(cols[p]).then(() => {
          fireEvent(`View Ad Block - ` + (idx + 1), true);
        });
      }
    });

    return;
  }

  setup();

  // -----------------------
  // Create target container divs
  // -----------------------
  if(cols.length) {
    const winCutoff = 769;

    Object.keys(data).forEach((cta, idx) => {
      const insertPoint = insertPoints[idx];

      if(cols[insertPoint]) {
        cols[insertPoint].insertAdjacentHTML('afterend', `
          <a href="${cta}"
            class="${shared.ID}-pod ${shared.VARIATION != 'control' ? `column is-3-desktop is-4-tablet is-6-mobile` : ''}"
            style="background-image:url(${data[cta]})"
          >
            <div class="height-100 is-flex is-flex-column is-justify-content-space-between content has-text-centered">
              <div class="product-list-item-image">
              </div>

              <p class="is-size-8-mobile">&nbsp;</p>
              <h2 class="product-list-item__title">&nbsp;</h2>
              <p class="has-text-weight-semibold"><span class="is-size-7">&nbsp;</span></p>

              <p class="has-padding-bottom-small">
                <span 
                  class="button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold"
                    >Discover</span>
              </p>
            </div>
          </a>`
        );
      }

    });
  }

  // -----------------------
  //  Variation Tracking
  // -----------------------
  [].forEach.call(document.querySelectorAll(`.${shared.ID}-pod`), (p, idx) => {
    checkIntersection(p).then(() => {
      fireEvent(`View Ad Block - ` + (idx + 1), true);
    });

    // Events
    p.addEventListener('click', e => {
      fireEvent('Clicked Ad Block - ' + e.currentTarget.getAttribute('href'));
    });
  });
};
