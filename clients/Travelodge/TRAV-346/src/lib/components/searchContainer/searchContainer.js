import searchInput from '../searchInput/searchInput';
import searchSuggestions from '../searchSuggestions/searchSuggestions';

const searchContainer = (id) => {
  const htmlStr = `
      <div class="${id}__searchContainer">
        <div class='${id}__titles'>Where?</div>
        ${searchInput(id)}
        ${searchSuggestions(id)}
      </div>
  `;

  return htmlStr;
};

export default searchContainer;
