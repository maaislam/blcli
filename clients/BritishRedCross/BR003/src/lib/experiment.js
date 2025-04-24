/**
 * BR003 - Mobile - donation form improvements
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import donationPagesContent from './donations_content';
import addSectionHeadings from './components/addSectionHeadings';
import updateDonationAmountEventListener from './bindExperimentEvents/updateDonationAmountEventListener';

const activate = () => {
  // setup();

  // Experiment code
  const url = window.location.href;
  const pathname = window.location.pathname;
  const userVisitedDonationAppealPage = sessionStorage.getItem('BR003-userVisited');

  // donate.redcross.org.uk/appeal/XXXXX pages
  if (url.indexOf('donate.redcross.org.uk/appeal/') > -1) {
    let page = pathname.replace('/appeal/', '');
    page = page.toLowerCase();
    sessionStorage.setItem('BR003-userVisited', JSON.stringify(page));
  } else if (url.indexOf('donate.redcross.org.uk/PersonalDetails/Index?AppealTitle') > -1 && userVisitedDonationAppealPage) {
    const data = donationPagesContent;
    const page = JSON.parse(sessionStorage.getItem('BR003-userVisited'));
    if (data[`${page}`]) {
      setup();
      // const page = JSON.parse(sessionStorage.getItem('BR003-userVisited'));
      const changeAmountContainer = document.querySelector('.form-change-amount__grid');
      const labelText = changeAmountContainer.querySelector('label');
      const pageTitle = labelText.querySelector('strong').innerText.trim();
      // Change Label Text
      labelText.innerHTML = `I would like to make a one-off donation of:`;

      // Add Progress Bar - Steps
      const progressBarContainer = `<div class="BR003-progressBar__wrapper">
        <div class="BR003-progressBar__container">
          <ul class="BR003-progressBar__steps">
            <li class="progressBar__step">
              <div class="step__icon active"><span>1</span></div>
              <div class="step active"><div>Personal</div><div>Details</div></div>
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
      const innerTopSectionContainer = document.querySelector('div.form-status__grid');
      innerTopSectionContainer.insertAdjacentHTML('afterbegin', progressBarContainer);

      // Add Banner - Page Title & Image
      // const data = window.donationPagesContent;
      // const data = donationPagesContent;
      const imgId = data[`${page}`].id;
      const bannerContainer = `<div class="BR003-pageTitle__wrapper">
        <h2>${pageTitle}</h2>
      </div>
      <div class="BR003-donationAppeal__img" id='${imgId}'></div>`;
      const topSectionContainer = document.querySelector('section.form-status');
      topSectionContainer.insertAdjacentHTML('afterend', bannerContainer);

      // Add Fieldset Headings
      pollerLite(['fieldset'], () => {
        addSectionHeadings();

        // Move "Required field" note under first title box
        const requiredFiledNote = document.querySelector('.form__note');
        const firstTitle = document.querySelector('.BR003-form__heading.personalDetails');
        firstTitle.insertAdjacentElement('afterend', requiredFiledNote);

        // Billing Address - Add "OR"
        const addressSearchBtn = document.querySelector('button.form-address__manual.js-address-lookup-manual');
        const newRow = `<div class="BR003-billingSection__row"><div>OR</div></div>`;
        addressSearchBtn.insertAdjacentHTML('beforebegin', newRow);

        // Payment Type - Add Asterisk*
        const asterisk = `<span class="form__required">*</span>`;
        const paymentTypeLabel = document.querySelector('.form-row__left label[for="paymentType"]');
        if (paymentTypeLabel) {
          paymentTypeLabel.innerHTML = 'Card type';
          paymentTypeLabel.insertAdjacentHTML('beforeend', asterisk);
        }
        // Change Card Name placeholder
        const cardNameField = document.querySelector('input#card_name.form-card-name');
        if (cardNameField && cardNameField.getAttribute('placeholder')) {
          cardNameField.setAttribute('placeholder', 'Name on card')
        }
      });
      updateDonationAmountEventListener();
    }
  }
};

export default activate;
