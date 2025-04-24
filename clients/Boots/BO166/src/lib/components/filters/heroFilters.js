import {
    fireEvent
} from "../../../../../../../core-files/services";
import shared from "../../../../../../../core-files/shared";
import priceSlider from "./priceSlider";

export default () => {

    const {
        ID,
        VARIATION
    } = shared;
    /**
     * Loop through filter based on variation and store in an object
     */
    const getData = () => {
        let filters;
        const filterArr = [];

        //rating
        if (VARIATION !== '2') {
            filters = document.querySelectorAll('#rating .facetSelect li a');
        }

        for (let index = 0; index < filters.length; index += 1) {
            const element = filters[index];
            const elID = element.getAttribute('id');
            const elName = element.querySelector('.outline > span').textContent.trim();

            // if rating
            const elStars = element.querySelector('.outline > span').outerHTML;

            const dataObj = {};
            if (elName) {
                dataObj['name'] = elName;
            } else if (elStars) {
                dataObj['name'] = `${elStars}`;
            }
            dataObj['target'] = elID;
            filterArr.push(dataObj);
        }

        return filterArr;
    }

    const filterTitle = () => {
        let filterName;
        if (VARIATION !== '2') {
            filterName = 'rating';
        } else {
            filterName = 'price';
        }

        return filterName;
    }

    const filterTracking = () => {
        const allFilters = document.querySelectorAll('#productsFacets .facetSelect .facetbutton');
        const url = window.location.pathname;
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
        heroFilter.classList.add(`${ID}-heroFilters`);
        heroFilter.innerHTML = `
            <h3>Filter by ${filterTitle()}</h3>
            <div class="${ID}-filters">
            </div>`;

        if (document.querySelector(`.${ID}-filterBar`)) {
            document.querySelector(`.${ID}-filterBar`).insertAdjacentElement('beforebegin', heroFilter);
        } else {
            document.querySelector('#estores_product_listing_widget').insertAdjacentElement('beforebegin', heroFilter);
        }
    }

    const addFilters = () => {
        const allFilters = getData();

        Object.keys(allFilters).forEach((i) => {
            const data = allFilters[i];
            const filter = document.createElement('div');
            filter.classList.add(`${ID}-filterBox`);
            filter.setAttribute('filter-target', data.target);
            filter.innerHTML = `<span>${data.name}</span>`;
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
        const url = window.location.pathname;
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

    const slickFilters = () => {
        window.jQuery(`.${ID}-filters`).slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            draggable: true,
            rows: 0,
            infinite: true,
            nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
            prevArrow: `<button class="slide-arrow ${ID}-back"></button>`,
            mobileFirst: true,
            responsive: [
              {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                draggable: false,
              }
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 280,
                settings: "unslick"
              }
            ]
        });
    }

    document.documentElement.classList.add(`${ID}-heroFilter`);

    if (VARIATION == '1' || VARIATION === '3' || VARIATION === '4') {
        createFilterWrapper();
        addFilters();
        filterClick();
        checkActive();
        filterTracking();

        // if (window.innerWidth > 1024) {
        //     if (getData().length > 2) {
        //         slickFilters();
        //         window.jQuery(`.${ID}-filters`).slick('resize');
        //     }
        // }

        // window.addEventListener('resize', () => {
        //     if (window.innerWidth >= 1024) {
        //         slickFilters();
        //     } else {
        //         if(document.querySelector(`.${ID}-filters.slick-initialized`)) {
        //             window.jQuery(`.${ID}-filters`).slick('unslick');
        //         }
        //     }
        // });
    }

    if (VARIATION === '2') {
        if (window.location.href.indexOf('&minPrice:0&maxPrice') === -1) {
            createFilterWrapper();
            filterTracking();
            priceSlider().loadScript();
            const slider = document.querySelector(`.${ID}-filters`);
            if (slider && !slider.noUiSlider) {
                priceSlider().init();
            }
        }
    }
}