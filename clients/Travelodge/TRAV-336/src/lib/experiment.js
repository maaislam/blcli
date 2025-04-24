import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

function waitforhotelInfo() {
  const intervalId = setInterval(() => {
    if (window.hotelInfo !== undefined) {
      startExperiment();
      clearInterval(intervalId);
    }
  }, 50);
}

const startExperiment = () => {
  if (window.innerWidth < 768) {
    document.body.classList.add(`${ID}__showKeyPoints`);

    const newDesignElem = document.querySelector('button.key-points-border:has(.rebase-icons):has(#top-icon-newdesign)');
    if (newDesignElem) newDesignElem.classList.add(`${ID}__newDesign`);

    document
      .querySelector('#left-right-content .top-right-content .row.hotel-details-right-content .key-points-margin')
      .classList.add('elope');
    pollerLite(['#main-carousel-image .u-pin .c-facilities'], () => {
      const giftingButton = `
      <div class="${ID}-facilities media-scroller snaps-inline">
      </div>`;

      if (!document.querySelector(`.${ID}-facilities`)) {
        const attachPoint = document.querySelector(
          '#left-right-content > div.col.col-sm.col-md.col-lg-6.top-right-content > div.thumbnailMore'
        );
        attachPoint.insertAdjacentHTML('afterend', giftingButton);
      }

      if (window.hotelInfo.facilities) {
        const conntrolIcons = document.querySelectorAll(`button.key-points-border:has(.rebase-icons):not(.${ID}__newDesign)`);
        const url = document.location.pathname;
        const mediaScrollerElem = document.querySelector('.trv-bullets');

        conntrolIcons.forEach((icon) => {
          const svgElement = icon.querySelector('svg').cloneNode(true);
          const facilitytitle = icon.textContent.trim();

          const facilitytitleLower = facilitytitle.includes(' ')
            ? facilitytitle.toLowerCase().split(' ').join('-')
            : facilitytitle.toLowerCase();

          const facilitiesDiv = `
            <div class="media-element ${ID}-facility ${ID}-facility-${facilitytitleLower}">
              <div class="${ID}-facility-card">
                <div class="${ID}-facility-card-image image-one">
                  ${svgElement.outerHTML}
                </div>
                <a href="${url}" title="${facilitytitle}" class="trigger-modal ${ID}-facility-title">${facilitytitle}</a>
              </div>
            </div>`;

          mediaScrollerElem.insertAdjacentHTML('beforeend', facilitiesDiv);
          icon.style.display = 'none';
        });
      }

      document.querySelector(`.media-element .${ID}-facility-title`).style.display = 'block';
    });

    document.querySelectorAll('.media-element').forEach((element) => {
      const image1 = element.querySelector('.image-one');
      const title = element.querySelector(`.${ID}-facility-title`);

      image1.addEventListener('click', (e) => {
        const { target } = e;
        const facilityTitleElem = target.closest('.image-one').nextElementSibling;
        const facilityTitle = facilityTitleElem.title;

        fireEvent(`User taps on the ${facilityTitle} icon`);
        // Hide all title elements (across all .media-element)
        document.querySelectorAll(`.${ID}-facility-title`).forEach((titleElement) => {
          titleElement.style.display = 'none'; // Hide all titles
          titleElement.classList.remove(`${ID}-active`); // Remove active class
        });

        // Show the title next to the clicked image
        title.style.display = 'block'; // Show the title of the clicked image
        title.classList.add(`${ID}-active`); // Add the active class to the clicked title
      });
    });
  }
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  waitforhotelInfo();
};
