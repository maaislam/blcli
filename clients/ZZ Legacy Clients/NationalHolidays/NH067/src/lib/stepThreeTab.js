import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import NH067_content from './NH067_content';
import queryData from './queryData';

export default () => {
  pollerLite(['#NH067-searchBtn'], () => {
    const searchButton = document.querySelector('#NH067-searchBtn');
    const controlSearchButton = document.querySelector('button#btnSearch');
    searchButton.addEventListener('click', () => {
      // LocalStorage
      localStorage.setItem('NH067-search', JSON.stringify(queryData));
      // Click original Search Button to keep Validation functionality
      controlSearchButton.click();
      // window.__doPostBack("ctl00_ctl02_btnSearch".replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
    });
  });
};