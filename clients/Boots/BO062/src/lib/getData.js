import shared from './shared';

const { ID, VARIATION } = shared;

/**
 * Loop through filter based on variation and store in an object
 */
const getData = () => {
    let filters;
    const filterArr = [];

    // brands
    if(VARIATION === '1') {
        filters = document.querySelectorAll('#brand .facetSelect li a');
    }
    if(VARIATION === '3') {
        filters = document.querySelectorAll('#price .facetSelect li a');
    }
    if(VARIATION === '4') {
        filters = document.querySelectorAll('#rating .facetSelect li a');
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