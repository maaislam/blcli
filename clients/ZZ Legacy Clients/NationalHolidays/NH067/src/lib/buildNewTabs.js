import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';
import toggleTabs from './toggleTabs';
import getCurrentDay from './getCurrentDay';

export default (returningUser) => {
  let bookHolidayStatus = '';
  let inspireMeStatus = '';
  let inspireMeStepStatus = '';
  // First Time User
  if (!returningUser) {
    bookHolidayStatus = 'inactive';
    inspireMeStepStatus = 'active';
  // Returning User
  } else {
    inspireMeStatus = 'inactive';
    inspireMeStepStatus = 'tab__inactive';
  }
  const tabsContainer = `<div class="NH067-tabs">
    <div class="tablink ${inspireMeStatus}" id="NH067-inspireTab"><span>Inspire me</span></div>
    <div class="tablink ${bookHolidayStatus}" id="NH067-bookHolidayTab"><span>Book a holiday</span></div>
  </div>`;

  document.querySelector('#main-body .right .holiday-search').insertAdjacentHTML('beforebegin', tabsContainer);

  const searchMainContent = document.querySelector('.holiday-search .search-content');

  // Holiday Search Container
  // Wrap the existing container in wrapper div
  const wrapper = document.createElement('div');
  wrapper.classList.add('NH067-tab-holidaySearch__content');
  if (!returningUser) {
    wrapper.classList.add('tab__inactive');
  }
  searchMainContent.parentNode.insertBefore(wrapper, searchMainContent);
  wrapper.appendChild(searchMainContent);

  // Get Current Date
  const todayIs = getCurrentDay();
  
  // Inspire Container
  const inspireContainer = `<div class="NH067-tab-inspireSearch__content ${inspireMeStepStatus}">
    <div class='NH067-step active' id='NH067-inspireMe__step1'>
      <p>Discover holidays and short breaks...</p>
      <ul class="NH067-options__step1">
        <li class="NH067-option" id="showtimeOption"><div class="button"><span>Showtime</span></div></li>
        <li class="NH067-option" id="familyFunOption"><div class="button"><span>Family Fun</span></div></li>
        <li class="NH067-option" id="britishBreaksOption"><div class="button"><span>British Breaks</span></div></li>
        <li class="NH067-option" id="eventsOption"><div class="button"><span>Events</span></div></li>
        <li class="NH067-option" id="sportsEventsOption"><div class="button"><span>Sports Events</span></div></li>
        <li class="NH067-option" id="europeanBreaksOption"><div class="button"><span>Europe<span></div></li>
      </ul>
    </div>
    <div class='NH067-step' id='NH067-inspireMe__step2'>
      <p>When would you like to go...</p>
      <ul class="NH067-options__step2">
        <li class="NH067-option" id="asapOption">
          <div class="periodOption__wrapper">
            <div class="periodOption">ASAP</div>
            <div class="subTitle">Now up to 2 months away</div>
          </div>
        </li>
        <li class="NH067-option" id="easterOption">
          <div class="periodOption__wrapper">
            <div class="periodOption">EASTER HOLIDAYS</div>
            <div class="subTitle">${todayIs} - 28th April</div>
          </div>
        </li>
        <li class="NH067-option" id="summerOption">
          <div class="periodOption__wrapper">
            <div class="periodOption">SUMMER</div>
            <div class="subTitle">May - September</div>
          </div>
        </li>
        <li class="NH067-option" id="noOption">
          <div class="periodOption__wrapper">
            <div class="periodOption">I don't mind</div>
            <div class="subTitle"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class='NH067-step' id='NH067-inspireMe__step3'>
      <p>Where are you travelling from...</p>
      <div class="NH067-text">Not all holidays and breaks depart all areas, please choose a region and town above.</div>
      <div class="NH067-button" id="NH067-searchBtn">See holidays &amp; breaks</div>
    </div>
    <ul class="NH067-steps">
        <li class="step step1 active"></li>
        <li class="step step2"></li>
        <li class="step step3"></li>
      </ul>
      <div class="NH067-link">
        Know what you want? <span>Search now</span>
      </div>
  </div>`;
  wrapper.insertAdjacentHTML('afterend', inspireContainer);
  
  // Tabs functionality
  pollerLite(['.NH067-tabs .tablink'], () => {
    toggleTabs(returningUser);
    // Search Now Link
    const searchNowLink = document.querySelector('.NH067-link span');
    searchNowLink.addEventListener('click', () => {
      document.querySelector('.tablink#NH067-bookHolidayTab').classList.remove('inactive');
      document.querySelector('.NH067-tab-holidaySearch__content').classList.remove('tab__inactive');
      document.querySelector('#NH067-inspireTab').classList.add('inactive');
      document.querySelector('.NH067-tab-inspireSearch__content').classList.add('tab__inactive');

      if (!document.querySelector('.NH067-tab-holidaySearch__content .NH067-departureInputSection')) {
        document.querySelector('.NH067-departingDateSection').insertAdjacentElement('beforebegin', document.querySelector('.input-split.NH067-departureInputSection'));
      }
    });
  });
};