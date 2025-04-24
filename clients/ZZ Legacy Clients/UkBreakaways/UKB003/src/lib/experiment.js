import {
  setup,
  generateRooms,
  checkPeople,
  arrayPolyfill,
  checkEntries,
  setRooms,
} from './services';
import {reset} from './resetButton';
import settings from './settings';
const {
  ID
} = settings;

const activate = () => {
  setup();
  //polyfills Array.from()
  arrayPolyfill();
  // Set adults to 0
  document.querySelector('#ddlAdults').selectedIndex = 0;
  // Clear everything when clicking on continue button
  localStorage.removeItem('hasChanged');
  document.querySelector('#btnContinue').addEventListener('click', function(){
    const items = [
      'single-en-suite-room',
      'single-sea-view',
      'single-scenic',
      'double-en-suite-room',
      'double-sea-view',
      'double-premier-sea-view',
      'double-standard-plus-sea-view',
      'twin-sea-view',
      'twin-standard-plus',
      'twin-en-suite-room',
      'three-bedded-en-suite-room',
      'availableRooms',
    ]
    items.forEach(function (item) {
      if (localStorage.getItem(item)) {
        localStorage.removeItem(item);
      }
    });
  });
  // changes the text for the error box
  if (document.querySelector('.alert')) {
    const items = [
      'single-en-suite-room',
      'single-sea-view',
      'single-scenic',
      'double-en-suite-room',
      'double-sea-view',
      'double-premier-sea-view',
      'double-standard-plus-sea-view',
      'twin-sea-view',
      'twin-standard-plus',
      'twin-en-suite-room',
      'three-bedded-en-suite-room',
    ]
    items.forEach(function (item) {
      if (localStorage.getItem(item)) {
        localStorage.removeItem(item);
      }
    });
    const rooms = document.querySelectorAll('.left .sml-tbl .room-list-cont .field-row:not(.sold-out)');
    Array.from(rooms).forEach(function(room){
      room.querySelector('.cell.one select').selectedIndex = 0;
    });
    const element = document.querySelector('.alert');
    element.querySelector('strong').textContent = 'Whoops! Sorry.';
    element.querySelector('span').innerHTML = 'It looks like these rooms don\'t match your guests. Please note we require you to fill each room.';
    const newNotice = document.createElement('div');
    newNotice.classList.add('please-note-text');
    newNotice.innerHTML = 'Can\'t find the room<small>(s)</small> you need? Call <a href="tel:03446827000">0344 682 7000</a> for help, (8am - 8pm, 7 days a week).';
    const button = document.createElement('div');
    button.classList.add(`${ID}_dialog__buttonWrap`);
    button.innerHTML = `
    <a href="https://www.ukbreakaways.com" class="${ID}_dialog__button">Return to Homepage</a>
    `;
    element.querySelector('span').insertAdjacentElement('afterend', newNotice);
    element.insertAdjacentElement('beforeend', button);
  }
  // change the title
  document.querySelector('.inner-content h1').innerHTML = 'Choose your room<small>(s)</small>';
  // change the text under N° of guests
  document.querySelector('.left .box-with-border p').textContent = 'Please tell us how many people will be staying.';
  // wrap {infants} to let it be shown only on checkbox selected
  const infantsBlock = document.querySelector('.left .box-with-border .field-row:nth-child(5)');
  infantsBlock.querySelector('span').innerHTML = 'Infants <small style="color:#F56833">(free)</small>';
  const infantsContent = infantsBlock.innerHTML;
  const element = document.createElement('div');
  element.classList.add(`${ID}_infantsWrap`);
  element.innerHTML = `
    <div class="${ID}_infants">
      <input type="checkbox" id="infantsTrigger" name="infantsTrigger" class="${ID}_infants__trigger">
      <label for="infantsTrigger" class="${ID}_infants__label">
        Add infants under 2 years old.
      </label>
      <div class="${ID}_infants__body">
        ${infantsContent}
        <small class="${ID}_infants__notice"><em>An additional charge may apply for cot hire.</em></small>
      </div>
    </div>
  `;
  infantsBlock.innerHTML = '';
  infantsBlock.insertAdjacentElement('afterbegin', element);
  const boxes = document.querySelectorAll('.left .box-with-border');
  Array.from(boxes).forEach(function (box, i) {
    box.setAttribute('data-box', i);
  });
  setRooms();
  checkPeople();
  if (boxes.length === 4) {
    document.querySelector(`.left .box-with-border:nth-child(3)`).setAttribute('style', 'display:none');
    document.querySelector(`.left .box-with-border:nth-child(3) h2`).textContent = 'What type of room would you like?';
    document.querySelector(`.left .box-with-border:nth-child(3) p`).textContent = 'We ask that you fill each room you book, i.e. if the rooms sleeps 2, there must be 2 guests.';
    document.querySelector(`.left .box-with-border:nth-child(3) .please-note-text`).innerHTML = 'Can\'t find the room<small>(s)</small> you need? Call <a href="tel:03446827000">0344 682 7000</a> for help, (8am - 8pm, 7 days a week).';
    document.querySelector('.left .box-with-border:nth-child(3) .sml-tbl').setAttribute('style', 'display:none');
  } else {
    document.querySelector(`.left .box-with-border:nth-child(2)`).setAttribute('style', 'display:none');
    document.querySelector(`.left .box-with-border:nth-child(2) h2`).textContent = 'What type of room would you like?';
    document.querySelector(`.left .box-with-border:nth-child(2) p`).textContent = 'We ask that you fill each room you book, i.e. if the rooms sleeps 2, there must be 2 guests.';
    document.querySelector(`.left .box-with-border:nth-child(2) .please-note-text`).innerHTML = 'Can\'t find the room<small>(s)</small> you need? Call <a href="tel:03446827000">0344 682 7000</a> for help, (8am - 8pm, 7 days a week).';
    document.querySelector('.left .box-with-border:nth-child(2) .sml-tbl').setAttribute('style', 'display:none');
  }
  // disable the button
  document.querySelector('.left .box-with-border.orange .orange-btn.continue').classList.add(`${ID}_disabled`);
  document.querySelector('.left .box-with-border.orange .orange-btn.continue').setAttribute('disabled', true);
  const selectElements = ['#ddlAdults', '#ddlChildren'];
  [].forEach.call(selectElements, function(el){
    document.querySelector(el).addEventListener('change', function(){
      if(JSON.parse(localStorage.getItem('hasChanged'))){
        reset();
      } else {
        localStorage.setItem('hasChanged', JSON.stringify('true'));
      }
    })
  });
};

export default activate;
