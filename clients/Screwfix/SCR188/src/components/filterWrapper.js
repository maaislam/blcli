import { downArrow, rightArrow } from '../assets/icons';

const filterWrapper = (id, filterAppliedNumber) => {
  const html = `
        <div class="sort-filter-container ${id}__sort-filter-container" role="group" aria-label="Sort and filter options">
            <button 
                type="button" 
                class="sort-button" 
                aria-haspopup="listbox" 
                aria-expanded="false" 
                aria-controls="sort-options"
            >
                Sort by <span aria-hidden="true">${downArrow}</span>
            </button>

            <button 
                type="button" 
                class="filter-button" 
                aria-label="Filter options, 0 filters applied"
            >
                Filter ${filterAppliedNumber ? filterAppliedNumber : '(0)'}<span aria-hidden="true">${rightArrow}</span>
            </button>
        </div>

    `;
  return html.trim();
};

export default filterWrapper;
