/**
 * @desc Slide out filter for mobile
 */

import settings from '../settings';

const { ID } = settings;

export default () => {
    // add the title
    const addFilterTitle = () => {
        const filterBox = document.querySelector('#main .aside-content');
        filterBox.insertAdjacentHTML('afterbegin', `<div class="${ID}-filterTitle"><h2>Filter Products</h2></div>`);
    
        // change the search title
        const searchTitle = document.querySelector('#form-sidebar-search .block-title');
        if(window.innerWidth >= 1024) {
            searchTitle.textContent = 'Search';
        } else {
            searchTitle.textContent = 'Search Products';
        }
    }

    // add the apply and clear buttons
    const addfilterButtons = () => {
        const filterButtons = document.createElement('div');
        filterButtons.classList.add(`${ID}-filterButtons`);
        filterButtons.innerHTML = `<div class="${ID}-filterButton ${ID}-clearAll">Clear filters</div><div class="${ID}-applyAll ${ID}-filterButton">Apply filters</div>`;
        document.querySelector('.aside-content .filter-actions').appendChild(filterButtons);
    }

    const filterButtonEvents = () => {
        const clearFilter = document.querySelector(`.${ID}-clearAll`);
        clearFilter.addEventListener('click', () => {
            document.querySelector('.actions .clear-all').click();
        });

        const applyFilter = document.querySelector(`.${ID}-applyAll`);
        applyFilter.addEventListener('click', () => {
            document.querySelector('.filter-actions .no-std-link').click();
        });
    }
    
    addFilterTitle();
    addfilterButtons();
    filterButtonEvents();

};