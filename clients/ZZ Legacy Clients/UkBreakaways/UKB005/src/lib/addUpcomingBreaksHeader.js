import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  pollerLite(['#search-results'], () => {
    const searchResultsContainer = document.querySelector('#search-results');
    if (searchResultsContainer) {
      searchResultsContainer.insertAdjacentHTML('afterbegin', `<h1><span style="color: #000000;">Upcoming breaks</span></h1>`);
    }
  });
};
