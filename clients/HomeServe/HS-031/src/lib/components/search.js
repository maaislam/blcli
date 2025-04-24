import { crossIcon, searchIcon } from './componentUtils';

const search = (id) => {
  const htmlStr = `<div class="${id}_search-container">
        <form action="/search" method="GET" data-gtm-form-interact-id="0">
        <div id="search-panel" class="search">
            <div class="">
            <label for="txtSearch">Search:</label>
            <input name="q" type="text" id="txtSearch" placeholder="Search" class="HS-031_search-input form-control" data-gtm-form-interact-field-id="0" required="required">
            <input type="hidden" value="/search" id="search-results-url">
            <div class="HS-031_form-control">
                <button type="submit" class="icon icon-search icon-search-font" value="Search">
                ${searchIcon}
                </button>
                <div class="clear-input">
                ${crossIcon}       
                </div>
            </div>
            </div>
        </div>
        </form>
    </div>`;

  return htmlStr;
};

export default search;
