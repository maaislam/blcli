/**
 * IDXXX - Description
 * @author User Conversion
 * NH022
 */
import { setup } from './services';
import homepage from './homepage';
import resultsPage from './resultsPage';
import { events } from '../../../../../lib/utils';


const activate = () => {
  setup();
  events.setTrackerName('tracker2');

  if (window.location.href === 'https://www.nationalholidays.com/') {
    homepage();
  }
  if (window.location.href.indexOf('search-results?') > -1 || window.location.href.indexOf('/search-results/') > -1) {
    if (document.querySelector('#ddlRegion').value === '' && document.querySelector('#ddlPoint').value === '') {
      resultsPage();
    }
  }
};

export default activate;
