import shared from './shared';

const { ID, VARIATION } = shared;

/**
 * Loop through filter based on variation and store in an object
 */
const getData = () => {
    let filters;
    const filterArr = [];
    let priceFilter = {}

    const highestvalue = document.querySelector(`.ais-RangeSlider .rheostat-handle.rheostat-handle-upper`).getAttribute('aria-valuemax');

    if(VARIATION === '1') {
       priceFilter = {
            '£0 - £10': {
                name: '£0 - £10',
                url: '0%3A10',
            },
            '£10-£25': {
                name: '£10-£25',
                url: '10%3A25',
            },
            '£25 - £50': {
                name: '£25 - £50',
                url: '25%3A50',
            },
            '£50 - £75': {
                name: '£50 - £75',
                url: '50%3A75',
            },
            '£75 - £100': {
                name: '£75 - £100',
                url: '75%3A100',
            },
            '£100+': {
                name: `£100+`,
                url: `100%3A${highestvalue}`,
                
            }
        }

        return priceFilter;
    }
  
    if(VARIATION === '2') {
        filters = document.querySelectorAll('.ais-RatingMenu-list .ais-RatingMenu-item');
        for (let index = 0; index < filters.length; index += 1) {
            const element = filters[index];
            const elID = element.querySelector('.ais-RatingMenu-link').getAttribute('aria-label');
            const elStars = element.querySelector('.product_rating').outerHTML;
            

            const dataObj = {}; 
            dataObj['name'] = elStars;
            dataObj['target'] = elID;
            filterArr.push(dataObj);
        }

        return filterArr;
    }

    
}

export default getData;