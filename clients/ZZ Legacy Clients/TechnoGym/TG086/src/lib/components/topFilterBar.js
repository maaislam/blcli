// Add the top filter bar
import settings from '../settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
    const { ID } = settings;
    const addTopFilters = () => { 
    
    let topFilters; 
    let barTitle;
        if(window.location.href.indexOf('/product_type-treadmills.html') > -1) {
            barTitle = 'Designed for';

            topFilters = {
                Home: { 
                    link: 'https://www.technogym.com/gb/products/cardio/shopby/line_internal-myrun-personal-forma-artis/product_type-treadmills.html',
                    iconName: 'home',
                },
                Business: {
                    link: 'https://www.technogym.com/gb/products/cardio/shopby/line_internal-artis-excite/product_type-treadmills.html',
                    iconName: 'business',
                },
            }
        } else {
            barTitle = 'Training type';
            topFilters = {
                Cardio: { 
                    link: 'https://www.technogym.com/gb/products/cardio.html',
                    iconName: 'cardio',
                },
                Strength: {
                    link: 'https://www.technogym.com/gb/products/strength.html',
                    iconName: 'strength',
                },
                'Functional & Flexibility': {
                    link: 'https://www.technogym.com/gb/products/functional-flexibility.html',
                    iconName: 'functionFlex',
                }, 
                'Group Activities': {
                    link: 'https://www.technogym.com/gb/products/group-activities.html',
                    iconName: 'groupActivities',
                }, 
            }
        }
        

        const topBar = document.createElement('div');
        topBar.classList.add(`${ID}-topBar`);
        topBar.innerHTML = 
        `<div class="${ID}-filterTitleDesktop">
            <h2>Filter Products</h2>
        </div>
        <div class="${ID}-topFiltersWrapper">
            <span class="${ID}-barTitle">${barTitle}</span><div class="${ID}-topFilters"></div>
            <div class="${ID}-seeMore">See more filters</div>
        </div>`;

        const topHeader = document.querySelector(`.${ID}_header`);
        topHeader.insertAdjacentElement('afterend', topBar);

        const url = window.location.pathname;

        Object.keys(topFilters).forEach((i) => {
            const data = topFilters[i];
            const topFilter = document.createElement('div');
            topFilter.classList.add(`${ID}-topFilter`);
            topFilter.innerHTML = `<a href="${data.link}"><span class="${ID}-${data.iconName}"></span><p class="${ID}-linkText">${[i][0]}</p></a>`;
            document.querySelector(`.${ID}-topFilters`).appendChild(topFilter);
        
            if(url.indexOf(`/products/${data.iconName}.html`) > -1) {
                topFilter.classList.add(`${ID}-topFilter_active`);
            }
        });
    }


    const slickTheFilters = () => {
        // slick the top filters
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', (data, textStatus, jqxhr) => {
                pollerLite([`.${ID}-topFilters`, () => !!jQuery.fn.slick], () => {
                    jQuery(`.${ID}-topFilters`).slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        variableWidth: true,
                        arrows: true,
                    });
                });
            }); 
    }

    const allFiltersButton = () => {
        const allFiltersBar = document.createElement('div');
        allFiltersBar.classList.add(`${ID}-allFilterButton`);
        allFiltersBar.innerHTML = '<span>More filters</span>';
        document.querySelector(`.${ID}-topBar`).insertAdjacentElement('afterend', allFiltersBar);
        
        allFiltersBar.addEventListener('click', () => {
            document.querySelector('.filter-mobile .btn-filter').click();
        });
    }

    addTopFilters();
    if(window.innerWidth < 1024) {
        if(window.location.href.indexOf('/product_type-treadmills.html') === -1) {
            slickTheFilters();
        }
    }
    allFiltersButton();
};

