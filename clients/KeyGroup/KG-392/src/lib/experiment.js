/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  const width = window.innerWidth;

  const isMobile = width < 769;

  if (isMobile) {
    pollerLite(['.kr-body-container  .hero-banner'], () => {

      const htmlDataObject = {
        
        'Equity Release Calculator': {
          title: 'Equity release calculator',
          url: 'https://www.keyadvice.co.uk/equity-release/calculator',
        },
        'Mortgages Calculator': {
          title: 'Mortgages',
          url: 'https://www.keyadvice.co.uk/mortgages',
        },
        'Equity Release': {
          title: 'Equity release',
          url: 'https://www.keyadvice.co.uk/equity-release',
        }, 
        'About Us': {
          title: 'About Us',
          url: 'https://www.keyadvice.co.uk/about',
        },
        
      };

      const bannerSectionHTML = (title, url) => {
        return `<a href="${url}" class="${ID}-banner-section ${ID}-trustpilot">
        <div class="${ID}-banner-top">
          <div class="${ID}-title">
            <h4>${title}</h4>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M0.0149636 1.50398C0.014797 1.69057 0.0513618 1.87537 0.122616 2.04782C0.19387 2.22027 0.298425 2.37699 0.430251 2.50905L4.99368 7.08181L0.430251 11.6546C0.295406 11.7857 0.187918 11.9422 0.114072 12.1152C0.0402266 12.2882 0.00145948 12.4741 4.04146e-05 12.6622C-0.00137865 12.8503 0.0345861 13.0367 0.105813 13.2108C0.17704 13.3849 0.282134 13.5431 0.414986 13.6762C0.547837 13.8093 0.705795 13.9147 0.879713 13.9863C1.05363 14.0579 1.24004 14.0943 1.42811 14.0932C1.61619 14.0922 1.80219 14.0538 1.97532 13.9804C2.14844 13.9069 2.30524 13.7997 2.43663 13.6652L7.9986 8.08687C8.26459 7.8201 8.41395 7.45875 8.41395 7.08203C8.41395 6.70532 8.26459 6.34397 7.9986 6.07719L2.43663 0.498912C2.23813 0.300346 1.98521 0.165142 1.70983 0.110438C1.43445 0.0557345 1.149 0.0839811 0.889681 0.191605C0.630365 0.299229 0.408827 0.481391 0.253109 0.715014C0.0973906 0.948637 0.0145208 1.22322 0.0149636 1.50398Z" fill="#032140"/>
          </svg>
        </div>
        </a>`;
      };
      const equityReleaseCalcHTML = bannerSectionHTML(htmlDataObject['Equity Release Calculator'].title, htmlDataObject['Equity Release Calculator'].url);
      const mortgagesHTML = bannerSectionHTML(htmlDataObject['Mortgages Calculator'].title, htmlDataObject['Mortgages Calculator'].url);
      const equityReleaseHTML = bannerSectionHTML(htmlDataObject['Equity Release'].title, htmlDataObject['Equity Release'].url);
      const aboutUsHTML = bannerSectionHTML(htmlDataObject['About Us'].title, htmlDataObject['About Us'].url);

      const newBannerHTML = `<div class="${ID}-banner-container"></div>`;
      const targetContainer = document.querySelector('.kr-body-container');
      targetContainer.insertAdjacentHTML('afterbegin', newBannerHTML);
      const bannerContainer = document.querySelector(`.${ID}-banner-container`);
      bannerContainer.insertAdjacentHTML('beforeend', equityReleaseCalcHTML);
      bannerContainer.insertAdjacentHTML('beforeend', mortgagesHTML);
      bannerContainer.insertAdjacentHTML('beforeend', equityReleaseHTML);
      bannerContainer.insertAdjacentHTML('beforeend', aboutUsHTML);
      fireEvent(
        'Visible - Display order: 1 Equity Release Calc, 2 Mortgage Calc, 3 Equity Release, 4 About Us'
      , true);

      document.body.addEventListener('click', (e) => {

        if (e.target.classList.contains(`${ID}-banner-section`) || e.target.closest(`.${ID}-banner-section`)) {

          const clickedElement = e.target.closest(`.${ID}-banner-section`);
          const clickedElementTitle = clickedElement.querySelector(`.${ID}-title h4`).innerText;

          fireEvent(`Click - ${clickedElementTitle} quicklink`, true);
        }

      });

    });
  }
};

export default () => {


  newEvents.initiate = true;
  newEvents.methods = ['datalayer'];
  newEvents.property = 'G-LNFZ1KRLB8';

  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
