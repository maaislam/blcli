import settings from '../settings';
import { toggleFilter } from './toggleFilter';

export const buildFilters = (filtersObjArr, filterNumberString) => {
  const html = document.createElement('div');
  html.classList.add('MP155-filters');
  html.classList.add(`MP155-filters-${settings.VARIATION}`);
  // Add number of active filters
  const prevFilters = toggleFilter.checkActiveFilters();
  if (prevFilters) {
    if (prevFilters) {
      html.insertAdjacentHTML('afterbegin', `
        <div class="MP155-filter-amount clearfix">
          <p>${prevFilters.length} Filter${parseInt(prevFilters.length) === 1 ? '' : 's'} Selected</p>
  
          <button id="MP155-clear" class="${prevFilters.length > 0 ? 'MP155-show' : ''}">Clear All</button>
        </div>
      `);
    }
  } else if (filterNumberString && filterNumberString.textContent) {
    let filterNumber = filterNumberString.textContent.match(/\d+/g);
    html.insertAdjacentHTML('afterbegin', `
      <div class="MP155-filter-amount clearfix">
        <p>${filterNumber} Filter${parseInt(filterNumber) === 1 ? '' : 's'} Selected</p>

        <button id="MP155-clear">Clear All</button>
      </div>
    `);
  }
  // Loop over filter objects and build HTML
  filtersObjArr.map((filterObj) => {
    const theOptions = filterObj.options;
      if (settings.VARIATION === '1') {
        html.insertAdjacentHTML('beforeend', `
          <button class="MP155-filter--title" data-item="${filterObj.data}">${filterObj.name}</button>
          <div class="MP155-filter--options" data-options=${filterObj.data}>
            ${theOptions[0].innerHTML}
          </div>
          `);  
      }
      if (settings.VARIATION === '2') {
        // console.log(theOptions);
        const singleOptions = theOptions[0].querySelectorAll('.d-inline-block');
        // Only show Brand, Price, Size, Colour
        if (filterObj.name && filterObj.name.match(/brand|price|size|colour/gi)) {
          html.insertAdjacentHTML('beforeend', `
            <div class="MP155-select--wrap">
              <select>
                <option value="">${filterObj.name}</option>
                ${singleOptions ? Array.from(singleOptions).map((opt) => {
                  const searchQuery = opt.querySelector('div[data-search-query]');
                  return `<option class="MP155-option" value="${searchQuery.getAttribute('data-search-query')}">${opt.innerHTML.trim()}</option>`
                }).join(' ') : ''}
              </select>
            </div>
          `);
        }
      }
    });

  return html;
};  