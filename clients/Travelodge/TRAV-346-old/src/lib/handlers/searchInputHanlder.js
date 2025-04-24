import searchResults from '../components/searchResults/searchResults';
import modalOpenHandler from './modalOpenHandler';

const isMobile = window.innerWidth <= 768;

const searchInputHanlder = (ID, searchInput) => {
  const searchSuggestions = document.querySelector(`.${ID}__searchSuggestions`);
  const popularDestinations = document.querySelector(`.${ID}__popularDestinations`);

  searchInput.addEventListener('input', (e) => {
    const searchResultsElem = document.querySelector(`.${ID}__searchResults`);
    const value = e.target.value;

    if (value.length === 0) {
      popularDestinations.classList.remove(`${ID}__hide`);
      searchResultsElem?.classList.add(`${ID}__hide`);
      // searchInput.classList.add(`${ID}__search-input--active`);
      searchInput.classList.remove(`${ID}__search-input--success`);
    } else {
      searchInput.classList.add(`${ID}__search-input--success`);
      const results = window.fuse.search(value, { limit: 20 });

      const places = results.filter((result) => result.item.Category === 'Place').slice(0, 3);
      const hotels = results.filter((result) => result.item.Category === 'Hotel').slice(0, 3);

      if (searchResultsElem) searchResultsElem.remove();

      const searchResultHtml = searchResults(ID, places, hotels, value);
      popularDestinations.insertAdjacentHTML('afterend', searchResultHtml);

      // console.log(' ~ searchInput.addEventListener ~ results:', results);
      // console.log(' ~ searchInput.addEventListener ~ places:', places);
      // console.log(' ~ searchInput.addEventListener ~ hotels:', hotels);

      // searchResultsElem.classList.remove(`${ID}__hide`);
      popularDestinations.classList.add(`${ID}__hide`);
    }
  });

  searchInput.addEventListener('focus', () => {
    modalOpenHandler(ID, searchInput);
    searchSuggestions.classList.remove(`${ID}__hide`);
    setTimeout(() => {
      // Delay adding the open class slightly to trigger animation
      searchSuggestions.classList.add(`${ID}__searchSuggestions--open`);
      searchInput.classList.add(`${ID}__search-input--active`);
    }, 10);
  });

  searchInput.addEventListener('blur', () => {
    searchSuggestions.classList.remove(`${ID}__searchSuggestions--open`);

    setTimeout(() => {
      searchInput.classList.remove(`${ID}__search-input--active`);
      searchSuggestions.classList.add(`${ID}__hide`);
    }, 300);
  });
};
export default searchInputHanlder;
