import { fullStory } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { eventFire } from './../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function variation1(item, btn) {
  generateLightbox(item, btn);
}

function generateLightbox(item, btn) {
  const resultId = item.getAttribute('id');
  // If date was previously selected, then check sessionStorage item for value
  let dateSelectedValue = '';
  let object = '';
  let data = {};
  if (sessionStorage.getItem('NH063-data') !== null) {
    object = sessionStorage.getItem('NH063-data');
    data = JSON.parse(object);
    dateSelectedValue = data[`${resultId}`];
  }

  const selectDate = item.querySelector('select.tour-list');
  // Hide Dropdown for Variation 1
  selectDate.classList.add('hide');
  delete selectDate.options[0];
  let listOfDates = '';

  for (let i = 0; i < selectDate.options.length; i += 1) { 
    if (i !== 0) {
      const el = selectDate.options[i];
      const value = el.getAttribute('value');
      if (dateSelectedValue === value) {
        listOfDates += `<li>
          <span class="NH063-date__content">
            <div class="NH063-text">Coach Departs on </div>
            <div class="NH063-date">${el.innerHTML}</div>
          </span>
          <span class="NH063-select__btn selected" data-value="${el.innerHTML}" value="${value}">Selected<span class="NH063-arrow"></span></span>
        </li>`;
      } else {
        listOfDates += `<li>
          <span class="NH063-date__content">
            <div class="NH063-text">Coach Departs on </div>
            <div class="NH063-date">${el.innerHTML}</div>
          </span>
          <span class="NH063-select__btn" data-value="${el.innerHTML}" value="${value}">Select<span class="NH063-arrow"></span></span>
        </li>`;
      }
    }
  }

  if (!document.querySelector('.NH063-date__content')) {
    document.querySelector('.NH063-lightbox__container ul').insertAdjacentHTML('afterbegin', listOfDates);
  }
  
  const lightboxContainer = document.querySelector('.NH063-lightbox__wrapper');
  // Show Lightbox
  lightboxContainer.classList.remove('hidden');

  // ---- Select Date function
  const selectBtns = document.querySelectorAll('.NH063-select__btn');
  [].forEach.call(selectBtns, (sel) => {
    sel.addEventListener('click', () => {
      const preselected = document.querySelector('.NH063-select__btn.selected');
      if (preselected) {
        preselected.classList.remove('selected');
        preselected.innerText = 'Select';
      }
      const selectedText = sel.getAttribute('data-value');
      const selectedValue = sel.getAttribute('value');
      btn.innerText = `${selectedText}`;
      btn.classList.add('date-selected');
      btn.setAttribute('value', `${selectedValue}`);
      btn.style.display = 'block';
      sel.classList.add('selected');
      sel.innerText = 'Selected';

      const selectOptions = item.querySelector('select.tour-list');
      let opt;
      for (let i = 0; i < selectOptions.length; i += 1) {
        opt = selectOptions.options[i];
        if (opt.value === selectedValue) {
          opt.selected = true;
          opt.selected = 'selected';


          // Store selected value in object
          let dateSelectionsObject = {};
          let retrievedObject = '';
          let data = {};
          if (sessionStorage.getItem('NH063-data') !== null) {
            retrievedObject = sessionStorage.getItem('NH063-data');
            data = JSON.parse(retrievedObject);
            if (data[`${itemId}`]) {
              data[`${itemId}`] = selectedValue;
            } else {
              data[`${itemId}`] = selectedValue;
            }
          } else {
            data[`${itemId}`] = selectedValue;
          }
          // Put the object into storage
          sessionStorage.setItem('NH063-data', JSON.stringify(data));

          break;
        }
      }
      eventFire(selectOptions, 'change');
    });
  });

  // ------ Hide Lightbox
  const closeIcon = lightboxContainer.querySelector('.NH063-lightbox__close');
  closeIcon.addEventListener('click', () => {
    lightboxContainer.classList.add('hidden');
    document.querySelector('.NH063-lightbox__container ul').innerHTML = '';
    btn.style.display = 'block';
    if (btn.innerText === 'Loading...') {
      btn.innerText = 'Click for more dates';
      btn.classList.remove('date-selected');
    }
  });

  btn.classList.add('NH063-dateSelected');
  const itemId = item.getAttribute('id');

  btn.addEventListener('click', () => {
    if (btn.classList.contains('NH063-dateSelected')) {
      generateLightbox(item, btn);
    }
  });
}

function variation2(item, btn) {
  generateDropdown(item, btn);
}

function  generateDropdown(item, btn) {
  const resultId = item.getAttribute('id');
  // If date was previously selected, then check sessionStorage item for value
  let dateSelectedValue = '';
  let object = '';
  let data = {};
  if (sessionStorage.getItem('NH063-data') !== null) {
    object = sessionStorage.getItem('NH063-data');
    data = JSON.parse(object);
    dateSelectedValue = data[`${resultId}`];
  }


  const selectDate = item.querySelector('select.tour-list');
  delete selectDate.options[0];
  let listOfDates = '';

  // Add New Dropdown
  const newDropdown = `<div class="NH063-selectedDate__wrapper">
    <div class="NH063-selectedDate"></div>
  </div>
  <div class="NH063-dropdown__wrapper">
    <div class="NH063-dropdown">
      <ul><li class="NH063-default">Choose a date...</li></ul>
    </div>
  </div>`;
  if (!item.querySelector('.NH063-dropdown__wrapper')) {
    selectDate.insertAdjacentHTML('beforebegin', newDropdown);
  } else {
    item.querySelector('.NH063-dropdown__wrapper').classList.remove('hidden');
  }

  for (let i = 0; i < selectDate.options.length; i += 1) { 
    if (i !== 0) {
      const el = selectDate.options[i];
      const value = el.getAttribute('value');

      if (dateSelectedValue === value) {
        listOfDates += `<li>
          <span class="NH063-date__content" data-value="${el.innerHTML}" value="${value}">
            <div class="NH063-date" value="${value}">${el.innerHTML}</div>
          </span>
        </li>`;
      } else {
        listOfDates += `<li>
          <span class="NH063-date__content" data-value="${el.innerHTML}" value="${value}">
            <div class="NH063-date" value="${value}">${el.innerHTML}</div>
          </span>
        </li>`;
      }
    }
  }

  if (item.querySelectorAll('.NH063-dropdown ul li').length === 1) {
    item.querySelector('.NH063-dropdown ul li.NH063-default').insertAdjacentHTML('afterend', listOfDates);

    pollerLite(['.NH063-dropdown ul li span.NH063-date__content'], () => {
      window.addEventListener('click', function(e){   
        if (item.querySelector('.NH063-dropdown__wrapper').contains(e.target)){
          // Clicked in box
        } else{
          // Clicked outside the box
          item.querySelector('.NH063-dropdown__wrapper ul').classList.add('hideOptions');
        }
      });

      const defaultOption = item.querySelector('.NH063-dropdown__wrapper ul li.NH063-default');
      defaultOption.addEventListener('click', () => {
        item.querySelector('.NH063-dropdown__wrapper ul').classList.remove('hideOptions');
      });
    });
  }

  // ---- Select Date function
  const controlSelect = item.querySelector('select.tour-list');
  const selectOptions = item.querySelectorAll('.NH063-date__content');

  [].forEach.call(selectOptions, (option) => {
    // --- User clicks date
    option.addEventListener('click', (e) => {
      const dateEl = option.querySelector('.NH063-date');
      if (e.currentTarget.closest('ul').querySelector('.NH063-date.selected')) {
        e.currentTarget.closest('ul').querySelector('.NH063-date.selected').classList.remove('selected');
        e.currentTarget.closest('li').classList.remove('selected');
      }
      const selectedText = option.getAttribute('data-value');
      const selectedValue = option.getAttribute('value');
      dateEl.classList.add('selected');
      e.currentTarget.closest('li').classList.add('selected');
      item.querySelector('.NH063-dropdown__wrapper').classList.add('hide');
      // Selected Container
      const selectedContainer = item.querySelector('.NH063-selectedDate');
      if (selectedContainer) {
        selectedContainer.innerHTML = `${selectedText}`;
      }

      const selectOptions = item.querySelector('select.tour-list');
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

  // Re-open dropdown Selection
  pollerLite(['.NH063-selectedDate__wrapper'], () => {
    const selectedBtn = item.querySelector('.NH063-selectedDate__wrapper');
    if (selectedBtn) {
      selectedBtn.addEventListener('click', () => {
        item.querySelector('.NH063-dropdown__wrapper.hide').classList.remove('hide');
      }); 
    } 
  });
}

export { setup, generateLightbox, variation1, variation2 }; // eslint-disable-line
