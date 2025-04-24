import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';

export default (returningUser) => {
  // Departing Date
  const departingDateSection = document.querySelectorAll('.NH067-tab-holidaySearch__content .search-content .input-split')[1];
  departingDateSection.classList.add('NH067-departingDateSection');
  // Departure Input Section
  const departureInputSection = document.querySelectorAll('.NH067-tab-holidaySearch__content .search-content .input-split')[2];
  departureInputSection.classList.add('NH067-departureInputSection');

  // First Time User
  const stepThreeContainerTitle = document.querySelector('#NH067-inspireMe__step3 p');
  if (!returningUser) {
    // Move when user is on STEP 3
    stepThreeContainerTitle.insertAdjacentElement('afterend', departureInputSection);
  }
  
  const tabs = document.querySelectorAll('.tablink');
  [].forEach.call(tabs, (tab) => {
    tab.addEventListener('click', (e) => {
      if (e.currentTarget.id === 'NH067-inspireTab') {
        tab.classList.remove('inactive');
        document.querySelector('.NH067-tab-inspireSearch__content').classList.remove('tab__inactive');
        document.querySelector('#NH067-bookHolidayTab').classList.add('inactive');
        document.querySelector('.NH067-tab-holidaySearch__content').classList.add('tab__inactive');

        if (!document.querySelector('#NH067-inspireMe__step3 .NH067-departureInputSection')) {
          stepThreeContainerTitle.insertAdjacentElement('afterend', departureInputSection);
        }
        
      } else if (e.currentTarget.id === 'NH067-bookHolidayTab') {
        tab.classList.remove('inactive');
        document.querySelector('.NH067-tab-holidaySearch__content').classList.remove('tab__inactive');
        document.querySelector('#NH067-inspireTab').classList.add('inactive');
        document.querySelector('.NH067-tab-inspireSearch__content').classList.add('tab__inactive');

        if (!document.querySelector('.NH067-tab-holidaySearch__content .NH067-departureInputSection')) {
          document.querySelector('.NH067-departingDateSection').insertAdjacentElement('beforebegin', departureInputSection);
        }
      }
    });
  });
};