/**
 * BR002 - Donation Form Improvements - Desktop
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import { getUrlParameter } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
//import donationPagesContent from './donations_content'; // Commented out for Google Optimize
import addSectionHeadings from './components/addSectionHeadings';
import updateDonationAmountEventListener from './bindExperimentEvents/updateDonationAmountEventListener';

const activate = () => {
  // setup();

  // Experiment code
  const url = window.location.href;
  const pathname = window.location.pathname;
  const userVisitedDonationAppealPage = sessionStorage.getItem('BR002-userVisited');

  // donate.redcross.org.uk/appeal/XXXXX pages
  if (url.indexOf('donate.redcross.org.uk/appeal/') > -1) {
    let page = pathname.replace('/appeal/', '');
    page = page.toLowerCase();
    sessionStorage.setItem('BR002-userVisited', JSON.stringify(page));
  } else if (url.indexOf('donate.redcross.org.uk/PersonalDetails/Index?AppealTitle') > -1 && userVisitedDonationAppealPage) {
    const data = window.donationPagesContent;
    const page = JSON.parse(sessionStorage.getItem('BR002-userVisited'));
    if (data[`${page}`]) {
      setup();
      // Get page title - create top heading
      const inputLabel = document.querySelector('section.form-change-amount label');
      const pageTitle = inputLabel.querySelector('strong').innerText;
      const pageTitleContainer = `<div class='BR002-page__title'>
        <h1>${pageTitle}</h1>
      </div>`;
      const mainContainer = document.querySelector('main');
      mainContainer.insertAdjacentHTML('afterbegin', pageTitleContainer);
      // Replace text in label for input new amount
      inputLabel.innerHTML = `<strong>You are making a one off donation of:</strong>`;

      // Add Progress Bar - Steps
      const progressBarContainer = `<div class="BR002-progressBar__wrapper">
        <div class="BR002-progressBar__container">
          <ul class="BR002-progressBar__steps">
            <li class="progressBar__step">
              <div class="step__icon active"><span>1</span></div>
              <div class="step"><div>Personal</div><div>Details</div></div>
            </li>
            <li class="progressBar__dash"></li>
            <li class="progressBar__step">
              <div class="step__icon"><span>2</span></div>
              <div class="step"><div>Payment</div></div>
            </li>
            <li class="progressBar__dash"></li>
            <li class="progressBar__step">
              <div class="step__icon"><span>3</span></div>
              <div class="step"><div>Confirmation</div></div>
            </li> 
          </ul>
        </div>
      </div>`;
      
      const donationAmountSection = document.querySelector('section.form-change-amount');
      donationAmountSection.insertAdjacentHTML('beforebegin', progressBarContainer);
      
      // Form
      // Move type of donation
      const typeOfDonationEl = document.querySelector('fieldset.form-personal-donation');
      document.querySelector('fieldset.form-giftaid').insertAdjacentElement('beforebegin', typeOfDonationEl);
      
      // const data = window.donationPagesContent;
      const amountSelected = document.querySelector('#form-change-amount-input').value;
      const donationAmounts = data[`${page}`].donations;

      // Add Sidebar
      const formContainer = document.querySelector('div[data-component="form-validation"]');
      formContainer.insertAdjacentHTML('afterend', data[`${page}`].sidebar);

      // Add Fieldset Headings
      pollerLite(['fieldset'], () => {
        addSectionHeadings();
      });

      // Add Upsell Messages

      const upsell = `<div class="BR002-upsellMsg__wrapper"><div class="BR002-upsellMsg__container"><div class="upsell__heading">EUROPE REFUGEE CRISIS APPEAL</div><div class="upsell__message">£50 could buy blankets for six people</div></div></div>`;
      pollerLite(['.BR002-sidebar__wrapper'], () => {
        Object.keys(donationAmounts).forEach((i) => {
          const data = donationAmounts[i];
          if (Number(i) > Number(amountSelected)) {
            const upsellMessageContainer = `<div class="BR002-upsell__message">
              <div class="upsell__heading">
                <div>${pageTitle}</div>
              </div>
              <div class="upsell__message">
                <div>${data}</div>
              </div>
              <div class="updateAmount__container">
                <div class="update__label">Update Donation to</div>
                <div class="update__amount" value='${i}'>£${i}</div>
              </div>
            </div>`;

            document.querySelector('.BR002-upsell__container').insertAdjacentHTML('beforeend', upsellMessageContainer);
          }
        });
      });

      // Update Amount Event
      pollerLite(['.BR002-upsell__container', '.BR002-upsell__message'], () => {
        updateDonationAmountEventListener();
      });

      // Clicked into donation amount box
      const donationInputBox = document.querySelector('input#form-change-amount-input');
      if (donationInputBox) {
        donationInputBox.addEventListener('click', () => {
          events.send('Google Optimize', `BR002 Clicked`, `Into Donation amount box`, { sendOnce: true });
        });
      }
    }   
  }
};

export default activate;
