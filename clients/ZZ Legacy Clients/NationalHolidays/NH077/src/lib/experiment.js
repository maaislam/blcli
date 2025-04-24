/**
 * NH077 - More Dates on Itinerary Pages (Mobile)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();
  const stickyRow = document.querySelector('.sticky-row');
  stickyRow.classList.add('fixed');
  // Experiment code
  const moreDatesBtnContainer = `<a href class="NH077-moreDates orange-btn">More Dates</a>`;
  const bookNowBtn = document.querySelector('.sticky-row .container .left .orange-btn');
  bookNowBtn.innerText = 'Book Now';
  const selectDates = document.querySelector('select#ddlMoreDates');

  bookNowBtn.insertAdjacentHTML('beforebegin', moreDatesBtnContainer);
  if (innerWidth > 500) {
    document.querySelector('.sticky-row .see-more-dates').insertAdjacentElement('afterend', bookNowBtn);
  }
  
  const moreDatesBtn = document.querySelector('a.NH077-moreDates');
  
  // --- New Dropdown
  const selectDate = document.querySelector('select#ddlMoreDates');
  const selectedDate = selectDate[selectDate.options["selectedIndex"]];
  const selectedDateText = selectedDate.innerText;
  const dateSelectedValue = selectedDate.getAttribute('value');
  let listOfDates = '';

  // Add New Dropdown
  const newDropdown = `<div class="${settings.ID}-selectedDate__wrapper">
    <div class="${settings.ID}-selectedDate">${selectedDateText}</div>
  </div>
  <div class="${settings.ID}-dropdown__wrapper hide">
    <div class="${settings.ID}-dropdown">
      <ul></ul>
    </div>
  </div>`;
  if (!document.querySelector(`.${settings.ID}-dropdown__wrapper`)) {
    selectDate.insertAdjacentHTML('beforebegin', newDropdown);
  } else {
    document.querySelector(`.${settings.ID}-dropdown__wrapper`).classList.remove('hidden');
  }
  
  for (let i = 0; i < selectDate.options.length; i += 1) { 
    const el = selectDate.options[i];
    const value = el.getAttribute('value');

    if (dateSelectedValue === value) {
      listOfDates += `<li class="selectedDate">
        <div class="${settings.ID}-date" value="${value}">${el.innerHTML}</div>
      </li>`;
    } else {
      listOfDates += `<li>
        <div class="${settings.ID}-date" value="${value}">${el.innerHTML}</div>
      </li>`;
    }
  }

  document.querySelector(`.${settings.ID}-dropdown ul`).insertAdjacentHTML('afterbegin', listOfDates);

  pollerLite([`.${settings.ID}-dropdown ul li span.${settings.ID}-date__content`], () => {
    window.addEventListener('click', function(e){   
      if (document.querySelector(`.${settings.ID}-dropdown__wrapper`).contains(e.target)){
        // Clicked in box
      } else{
        // Clicked outside the box
        document.querySelector(`.${settings.ID}-dropdown__wrapper ul`).classList.add('hideOptions');
      }
    });

    const defaultOption = document.querySelector(`.${settings.ID}-dropdown__wrapper ul li.${settings.ID}-default`);
    defaultOption.addEventListener('click', () => {
      document.querySelector(`.${settings.ID}-dropdown__wrapper ul`).classList.remove('hideOptions');
    });
  });

  // ---- Select Date function
  const controlSelect = document.querySelector('select#ddlMoreDates');
  const selectOptions = document.querySelectorAll(`li div.${settings.ID}-date`);

  [].forEach.call(selectOptions, (option) => {
    // --- User clicks date
    option.addEventListener('click', (e) => {
      const dateEl = option.querySelector(`.${settings.ID}-date`);
      if (e.currentTarget.closest('ul').querySelector(`li.selectedDate`)) {
        e.currentTarget.closest('ul').querySelector(`li.selectedDate`).classList.remove('selectedDate');
        e.currentTarget.closest('li').classList.remove('selected');
      }
      const selectedText = option.innerText;
      const selectedValue = option.getAttribute('value');

      option.classList.add('selected');
      e.currentTarget.closest('li').classList.add('selected');

      // Selected Container
      const selectedContainer = document.querySelector(`.${settings.ID}-selectedDate`);
      if (selectedContainer) {
        selectedContainer.innerHTML = `${selectedText}`;
      }

      const selectOptions = document.querySelector('select#ddlMoreDates');
      let opt;
      for (let i = 0; i < selectOptions.length; i += 1) {
        opt = selectOptions.options[i];
        if (opt.value === selectedValue) {
          opt.selected = true;
          opt.selected = 'selected';

          break;
        }
      }
      eventFire(controlSelect, 'change');
    });
  });


  // ----- SHOW OPTIONS
  pollerLite([`.${settings.ID}-selectedDate__wrapper`, `.${settings.ID}-dropdown__wrapper`], () => {
    document.querySelector(`.${settings.ID}-selectedDate__wrapper`).addEventListener('click', () => {
      document.querySelector(`.${settings.ID}-dropdown__wrapper`).classList.remove('hide');
    });

    moreDatesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(`.${settings.ID}-dropdown__wrapper`).classList.remove('hide');

      // const stickyRow = document.querySelector('.sticky-row');
      stickyRow.classList.add('fixed');
    });

    // ----- Detect click outside of options 
    // ----- and hide them
    window.addEventListener('click', function(e){   
      if (document.querySelector(`.sticky-row`).contains(e.target)){
        // Clicked in box
      } else {
        // Clicked outside the box
        document.querySelector(`.${settings.ID}-dropdown__wrapper`).classList.add('hide');
      }
    });
  });

};

export default activate;
