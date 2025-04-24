import {
    fireEvent
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const {
    ID
} = shared;
/* Close all filters */
export const closeFilters = () => {
    const allFilterHeadings = document.querySelectorAll('.ais-RefinementList details.section');
    for (let index = 0; index < allFilterHeadings.length; index++) {
        const element = allFilterHeadings[index];
        if (element.getAttribute('open')) {
            element.querySelector('.section__title').click();
        }

    }
}
/*
Pull out the matching filter and put in a dropdown
*/
export const generatePopularFilters = (filter) => {

    const allFilters = document.querySelectorAll('.facet-category');
    for (let index = 0; index < allFilters.length; index += 1) {
        const element = allFilters[index];
        const filterTitle = element.querySelector('.facet-category__title span').textContent.trim();

        if (filterTitle === filter) {
            // add top filter title
            const popularFilter = document.createElement('div');
            popularFilter.classList.add(`${ID}-filter`);
            popularFilter.setAttribute('filter-target', filter)
            popularFilter.innerHTML = `
            <div class="${ID}-filterTitle"><span>${filter}</span></div>`;

            document.querySelector(`.${ID}-filterBar`).appendChild(popularFilter);

            let filterLinks;
            if (element.querySelector('.filter-group')) {
                filterLinks = element.querySelector('.filter-group')

            } else {
                filterLinks = element.querySelector('ul');
            }

            // add inner filters
            const filterBlock = document.createElement('div');
            filterBlock.setAttribute('filter-content', filter)
            filterBlock.classList.add(`${ID}-filterBlock`);
            filterBlock.innerHTML = filterLinks.innerHTML;

            //filterBlock.innerHTML = `<div class="${ID}-checkbox"></div><p></p>`


            document.querySelector(`.${ID}-filterBar`).insertAdjacentElement('afterbegin', popularFilter);
            document.querySelector(`.${ID}-filterDropdown`).appendChild(filterBlock);
        }
    }

    if (document.querySelector(`[filter-content="Brands"]`)) {
        document.querySelector(`.${ID}-filterBlock ul`).classList.add('filter-group');
    }
}

/*
 On the new filter clicks, click existing ones
*/
export const filterClicks = () => {

    const allFilters = document.querySelectorAll(`.${ID}-filterDropdown .facet-menu__item`);

    for (let index = 0; index < allFilters.length; index += 1) {
        const element = allFilters[index];
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const currentValue = e.currentTarget.querySelector('input').getAttribute('value');
        

            if(element.querySelector('input').checked === true) {
                element.querySelector('input').checked = false;
            } else {
                element.querySelector('input').checked = true;
            }

            fireEvent('Clicked popular filter' + currentValue);
        
            if(document.querySelector(`.refinements .facet-section .facet-category .facet-menu__item input[value="${currentValue}"]`)) {
               document.querySelector(`.refinements .facet-section .facet-category .facet-menu__item input[value="${currentValue}"]`).click();
            }
        });
    }
}

export const brandFilterClicks = () => {
    const brandFilters = document.querySelectorAll(`.${ID}-filterDropdown [filter-content="Brands"] ul li`);
    for (let index = 0; index < brandFilters.length; index += 1) {
        const brandEl = brandFilters[index];
        brandEl.addEventListener('click', (e) => {
            const currentValue = e.currentTarget.querySelector('input[type="checkbox"]').getAttribute('value');
            fireEvent('Clicked popular filter - brand filter');
            window.location.href = window.location.href + `?brand.lvl0=${currentValue.toLowerCase()}`;

        });
    }
}

/*
 Show/hide filter dropdowns
*/
export const makeFilterActive = () => {
    const filters = document.querySelectorAll(`.${ID}-popularFilters .${ID}-filter`);

    // loop through and show active ones
    for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];

        element.addEventListener('click', (e) => {

            const filterTarget = e.currentTarget.getAttribute('filter-target');
            const filterToShow = document.querySelector(`.${ID}-filterBlock[filter-content="${filterTarget}"]`);

            if (element.classList.contains('active')) {
                element.classList.remove('active');
                filterToShow.classList.remove('active');
            } else {

                // make current link active

                // remove any currently active
                if (document.querySelector(`.${ID}-filter.active`)) {
                    document.querySelector(`.${ID}-filter.active`).classList.remove('active');
                }
                // make dropdown active
                if (document.querySelector(`.${ID}-filterBlock.active`)) {
                    document.querySelector(`.${ID}-filterBlock.active`).classList.remove('active');
                }

                element.classList.add(`active`);

                if (filterToShow) {
                    filterToShow.classList.add('active');
                }
            }
        });
    }
}


export const filterToggle = () => {
    /*Toggle for popular filters vs all*/
    if (document.documentElement.classList.contains('popularOnly')) {
        document.documentElement.classList.remove('popularOnly');
        if (document.querySelector(`.${ID}-filter.active`)) {
            document.querySelector(`.${ID}-filter.active`).classList.remove('active');
            document.querySelector(`.${ID}-filterBlock.active`).classList.remove('active');
        }
    } else {
        document.documentElement.classList.add('popularOnly');
    }
}
