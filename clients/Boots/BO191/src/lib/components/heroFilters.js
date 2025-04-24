
import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { getData } from "../data";
import priceSlider from "./priceSlider";

export default () => {

    const { ID} = shared;

    const urlData = getData();
    const filterType = urlData.filter;
    /**
     * Loop through filter based on variation and store in an object
     */
    const filterData = () => {
        let filters;
        const filterArr = [];

        //rating
        if (filterType === 'rating') {
            filters = document.querySelectorAll('#rating .facetSelect li a');
        }

        for (let index = 0; index < filters.length; index += 1) {
            const element = filters[index];
            const elID = element.getAttribute('id');
            
            // if rating
            const elStars = element.querySelector('.outline > span').outerHTML;
            const title = element.querySelector('.outline > span').getAttribute('title');

            const dataObj = {};
            dataObj['name'] = `${elStars}`;
            dataObj['title'] = title;
            dataObj['target'] = elID;
            filterArr.push(dataObj);
        }

        return filterArr;
    }

    const filterTitle = () => {
        let filterName;
        if (filterType == 'rating') {
            filterName = 'rating';
        } else {
            filterName = 'price';
        }

        return filterName;
    }

    const filterTracking = () => {
        const allFilters = document.querySelectorAll('#productsFacets .facetSelect .facetbutton');
        for (let index = 0; index < allFilters.length; index += 1) {
            const element = allFilters[index];
            element.addEventListener('click', (e) => {
                const filterName = e.currentTarget.getAttribute('name');
                if (filterName) {
                    fireEvent('Clicked filter');
                }
            });
        }
    }

    const createFilterWrapper = () => {
        const heroFilter = document.createElement('div');
        heroFilter.classList.add(`${ID}-allfilters`);
        heroFilter.innerHTML = `
            <h3>Filter by ${filterTitle()}</h3>
            <div class="${ID}-filters">
            </div>`;

        if (document.querySelector(`.${ID}-heroFilters`)) {
            document.querySelector(`.${ID}-heroFilters .${ID}-container`).insertAdjacentElement('afterbegin', heroFilter);
        } 
    }

    const addFilters = () => {
        const allFilters = filterData();

        Object.keys(allFilters).forEach((i) => {
            const data = allFilters[i];
            const filter = document.createElement('div');
            filter.classList.add(`${ID}-filterBox`);
            filter.setAttribute('filter-target', data.target);
            filter.innerHTML = `<span>${data.name} - ${data.title}</span>`;
            document.querySelector(`.${ID}-filters`).appendChild(filter);
        });
    }

    const checkActive = () => {
        const filters = document.querySelectorAll(`.${ID}-filterBox`);
        for (let index = 0; index < filters.length; index += 1) {
            const element = filters[index];

            const filterTargets = element.getAttribute('filter-target');
            const matchingFilter = document.querySelector(`.row.facetContainer a[id^="${filterTargets.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`);

            if (matchingFilter) {

                if (matchingFilter.getAttribute('aria-checked') === 'true') {
                    element.classList.add(`${ID}-filterActive`);
                } else {
                    element.classList.remove(`${ID}-filterActive`);
                }
            }
        }
    }

    const filterClick = () => {
        const filters = document.querySelectorAll(`.${ID}-filterBox`);
        for (let index = 0; index < filters.length; index += 1) {
            const element = filters[index];
            element.addEventListener('click', (e) => {
                const targetEl = e.currentTarget.getAttribute('filter-target');
                const filterName = e.currentTarget.querySelector('span');
                document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`).click();

                if (filterName) {
                    fireEvent('Clicked hero filter');
                }
            });

        }
    }


    createFilterWrapper();

    if (filterType === 'rating') {
        addFilters();
        checkActive();
        filterClick();
        filterTracking();
        
    } else {

        document.querySelector(`.${ID}-heroFilters`).classList.add(`${ID}-price`);

        priceSlider().loadScript();
        const slider = document.querySelector(`.${ID}-filters`);
        if (slider && !slider.noUiSlider) {
            priceSlider().init();
        }
    }
}