import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

/* Scroll the first store in to view */
export default () => {
  const title = document.querySelector('.storeFinder_title');
  title.textContent = 'Pick a store for collection';

  const searchButton = document.querySelector('#pickupstore_search_button');
  searchButton.textContent = 'Search Stores';
  const findStoreButton = document.querySelector('#pickupstore_search_button');
  findStoreButton.addEventListener('click', () => {
    pollerLite(['.storeFinderElem.modal-find-stores-body-results-elem'], () => {
      document.body.classList.add('MP144-store_searched');
      const firstStoreAvailable = document.querySelector('.storeFinderElem.modal-find-stores-body-results-elem');
      firstStoreAvailable.scrollIntoView();
      events.send('MP144', 'User saw', 'at least one store option in the lightbox');
    });
  });
};
