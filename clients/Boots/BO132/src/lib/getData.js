import shared from '../../../../../core-files/shared';
import expData from './expData';

const { ID, VARIATION } = shared;

/**
 * Loop through filter based on variation and store in an object
 */
const getData = () => {
    let filters;
    const filterArr = [];

    let pageUrl;
    if (window.location.pathname.indexOf(`/fragrance/fragrance-offers`) > -1) {
      pageUrl = '/fragrance/fragrance-offers';
    } else if (window.location.pathname.indexOf(`searchTerm`) > -1) {
      pageData = 'searchTerm';
    } else {
      pageUrl = window.location.pathname;
    }

    const filterTarget = expData[`${pageUrl}`][`${VARIATION}`].filterTarget;
    document.querySelector(`.${ID}-heroFilters`).classList.add(`${ID}-filterBy${filterTarget.replace(' ', '')}`);

    if(VARIATION === '1') {
        filters = document.getElementById(`${filterTarget}`).querySelectorAll('.facetSelect li a');
        
    }
    if(VARIATION === '2') {
        filters = document.getElementById(`${filterTarget}`).querySelectorAll('.facetSelect li a');
    }

    for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];
        const elID = element.getAttribute('id');
        const elName = element.querySelector('.outline > span').textContent.trim();
        
        // if rating
        const elStars = element.querySelector('.outline > span').outerHTML;

        const dataObj = {}; 
        if(elName){
            dataObj['name'] = elName;
        } else if(elStars) {
            dataObj['name'] = elStars;
        }
        dataObj['target'] = elID;
        filterArr.push(dataObj);
    }

    return filterArr;
}

export default getData;