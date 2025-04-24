import {
  setup,
  storeTourData,
  initTest
} from './services';
const activate = () => {
  setup();

  // Experiment code
  if (window.location.href.indexOf('/itineraries/') > -1) {
    storeTourData();
    const bookNowArray = ['.sticky-row .left .orange-btn', '.price-table .blue-table .col-md-12:nth-child(4) p a'];
    [].forEach.call(bookNowArray, function(curEl){
      document.querySelector(curEl).setAttribute('data-listener', 'click');
      document.querySelector(curEl).addEventListener('click', function(e){
        const holidayName = document.querySelector('.destination-box h2').textContent.trim().toLowerCase();
        localStorage.setItem('clickedHoliday', JSON.stringify(holidayName));
      });
    });
  }
  if (window.location.href.indexOf('OrderProcess/Availability') > -1) {
    initTest();
  }
  if (window.location.href.indexOf('/search-results') > -1) {
    const bookButtons = document.querySelectorAll('.book-now');
    [].forEach.call(bookButtons, function (button) {
      button.setAttribute('data-listener', 'click');
      button.addEventListener('click', function (e) {
        const curButton = e.target;
        let curHoliday;
        if(curButton.closest('.result-item').querySelector('.itin-title').children.length === 0){
          curHoliday = curButton.closest('.result-item').querySelector('.itin-title').textContent.trim().toLowerCase();
        } else {
          curHoliday = curButton.closest('.result-item').querySelector('.itin-title a').textContent.trim().toLowerCase();
        }
        localStorage.setItem('clickedHoliday', JSON.stringify(curHoliday));
      });
    });
  }
};

export default activate;
