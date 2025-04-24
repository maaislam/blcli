import settings from './settings';
import { events, deleteCookie } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  pollerLite(['#ctl00_ctl02_pnlPickupPoint', '#ctl00_ctl02_ddlRegion', '#ctl00_ctl02_ddlPickupPoint'], () => {
    const buildSubmitURL = () => {
      const searchBox = document.querySelector('#ctl00_ctl02_txtKeyword').value;
      const departFirst = document.querySelector('#txtStartDateAlt').value.split('/').reverse().join('-');
      const departLast = document.querySelector('#txtEndDateSelector').value.split('/').reverse().join('-');
      const durationBox = document.querySelector('#ctl00_ctl02_ddlDuration').value;
      let duration;
      if (durationBox === '') {
        duration = 8;
      }

      const buildURL = `https://www.nationalholidays.com/search-results?s=${searchBox}&min=${departFirst}&max=${departLast}&d=${duration}`;
      window.location.href = buildURL;
    };

    if (settings.VARIATION === '1') {
      const departureRegion = document.querySelector('#ctl00_ctl02_pnlRegion');
      const departureTown = document.querySelector('#ctl00_ctl02_pnlPickupPoint');
      // Add optional labels
      departureRegion.querySelector('label').innerHTML = 'Departure Region <span>(optional)</span>';
      departureTown.querySelector('label').innerHTML = 'Departure Town <span>(optional)</span>';


      const showButton = () => {
        const submitButton = document.querySelector('#ctl00_ctl02_flexibleSearchPanel #btnSearch');
        submitButton.style.display = 'none';
        const newSubmit = document.createElement('div');
        newSubmit.classList.add('NH055-submit_button');
        newSubmit.classList.add('orange-btn');
        newSubmit.innerHTML = '<span>Search</span>';

        submitButton.insertAdjacentElement('beforebegin', newSubmit);


        newSubmit.addEventListener('click', () => {
          buildSubmitURL();
          events.send('NH055 V1', 'clicked', 'Search without inputting departure region');
          events.send('NH055 V1', 'clicked', 'Search without inputting departure town');
        });
      };
      showButton();


      // hide the button if a region is changed
      const hideButton = () => {
        const newSubmit = document.querySelector('.NH055-submit_button');
        const submitButton = document.querySelector('#ctl00_ctl02_flexibleSearchPanel #btnSearch');
        newSubmit.classList.add('NH055-submitButton_hide');
        submitButton.style.display = 'block';
      };

      document.querySelector('#ctl00_ctl02_ddlRegion').addEventListener('change', () => {
        if (document.querySelector('#ctl00_ctl02_ddlRegion').value !== '' && document.querySelector('#ctl00_ctl02_ddlPickupPoint').value !== '') {
          hideButton();
        }
      });
      document.querySelector('#ctl00_ctl02_ddlPickupPoint').addEventListener('change', () => {
        if (document.querySelector('#ctl00_ctl02_ddlRegion').value !== '' && document.querySelector('#ctl00_ctl02_ddlPickupPoint').value !== '') {
          hideButton();
        }
      });
    }

    if (settings.VARIATION === '2') {
      const newButton = document.createElement('div');
      newButton.classList.add('NH055-allHolidays');
      newButton.innerHTML = '<span>Not sure? Browse all of our holidays</span>';

      const searchForm = document.querySelector('#ctl00_ctl02_flexibleSearchPanel');
      searchForm.insertAdjacentElement('afterend', newButton);

      newButton.addEventListener('click', () => {
        deleteCookie('WEBRES_SEARCH');
        buildSubmitURL();
        events.send('NH055 V2', 'clicked', 'Not sure? Browse all of your holidays');
      });
    }
  });
};
