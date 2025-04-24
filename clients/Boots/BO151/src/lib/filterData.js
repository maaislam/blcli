// enter 'price', 'reviews' or 'brands'

import shared from "../../../../../core-files/shared";

/**
 * Format:
 * 'pathname': {
        rating: true/false,
        price: true/false,
        brands: true/false/ ['brand name'] array of brands,
 */

export const filterObj = {
    '/beauty/luxury-beauty-skincare': {
        rating: true,
        price: false,
        brands: false,
        /*brands: [ // change to true to use default or false if no brands to be shown
            'Estee Lauder',
            'Clinique',
            'The Ordinary',
            'KVD',
            'Benefit',
            'IT Cosmetics',
            'Liz Earle',
            'NARS',
            'Fenty Beauty',
            'Fenty Skin',
            'Lancome',
        ],*/
    },
    
    '/beauty/skincare/': {
        rating: false,
        price: false,
        brands: false,
    },

}


const { ID } = shared;


/**
 * 
 * @returns default brands object
 */
const defaultBrands = () => {

    let filters;
    const filterArr = [];

    filters = document.querySelectorAll('#productsFacets #brand .facetSelect li a');

    for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];
        const elID = element.getAttribute('id');
        const elName = `${element.querySelector('[id*=facetLabel]').textContent.trim()}`;
        
        // if rating
        const dataObj = {}; 
        if(elName){
            dataObj['name'] = elName;
        } 
        dataObj['target'] = elID;
        filterArr.push(dataObj);
    }

    return filterArr;

}

/**
 * 
 * @returns the brand hero filters if in list or if on page
 */

export const brandFilters = (matchingURL) => {


    let brandData;
    if(matchingURL.brands !== true) {
        brandData = matchingURL.brands;
    } else {
        brandData = defaultBrands();
    }
    
    const allBrandFilters = document.querySelectorAll('#productsFacets #brand .facetSelect li');


    for (let index = 0; index < allBrandFilters.length; index += 1) {
        const element = allBrandFilters[index];
        const filterName = element.querySelector('.outline *[id^="facetLabel_"]');

        // add the hardcoded brands
        if(matchingURL.brands !== true) {

            if (brandData.indexOf(filterName.textContent) > -1) {            

                const filterTarget = element.querySelector('.facetbutton').id;


                const brandFilter = document.createElement('div');
                brandFilter.classList.add(`${ID}-topFilter`);
                brandFilter.setAttribute('filter-target', filterTarget);
                brandFilter.innerHTML = `<span>${filterName.textContent}</span>`;

                document.querySelector(`.${ID}-filters`).appendChild(brandFilter);
            }
        // add all default brands
        } else { 
            Object.keys(brandData).forEach((i) => {
                const data = brandData[i];
                const filter = document.createElement('div');
                filter.classList.add(`${ID}-topFilter`);
                filter.setAttribute('filter-target', data.target);
                filter.innerHTML = `<span>${data.name}</span>`;
                document.querySelector(`.${ID}-filters`).appendChild(filter);
            }); 
        } 
    }
}

/**
 * 
 * @returns the review filter object
 */
export const reviewsData = () => {
    let filters;
    const filterArr = [];

    filters = document.querySelectorAll('#rating .facetSelect li a');

    for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];
        const elID = element.getAttribute('id');
        const elName = `${element.querySelector('.outline [id*=facetLabel_-]').getAttribute('title')}`;
        
        // if rating
        const dataObj = {}; 
        if(elName){
            dataObj['name'] = elName;
        } 
        dataObj['target'] = elID;
        filterArr.push(dataObj);
    }

    return filterArr;
}


/**
 * 
 * @returns the price filter object
 */
export const priceData = () => {

    let filters;
    const filterArr = [];

    filters = document.querySelectorAll('#price .facetSelect li a');

    for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];
        const elID = element.getAttribute('id');
        const elName = `${element.querySelector('[id*=facetLabel]').textContent.trim()} & up`;
        
        // if rating
        const dataObj = {}; 
        if(elName){
            dataObj['name'] = elName;
        } 
        dataObj['target'] = elID;
        filterArr.push(dataObj);
    }

    return filterArr;

}


/**
 * 
 * @returns the review hero filters
 */

export const addReviewFilters = () => {

    const allFilters = reviewsData();
  
      Object.keys(allFilters).forEach((i) => {
        const data = allFilters[i];
        const filter = document.createElement('div');
        filter.classList.add(`${ID}-topFilter`);
        filter.setAttribute('filter-target', data.target);
        filter.innerHTML = `<span>${data.name}</span>`;
        document.querySelector(`.${ID}-filters`).appendChild(filter);
      });  
}

/**
 * 
 * @returns the price hero filters
 */

export const addPriceFilters = () => {

    const allFilters = priceData();
  
    Object.keys(allFilters).forEach((i) => {
        const data = allFilters[i];
        const filter = document.createElement('div');
        filter.classList.add(`${ID}-topFilter`);
        filter.setAttribute('filter-target', data.target);
        filter.innerHTML = `<span>${data.name}</span>`;
        document.querySelector(`.${ID}-filters`).appendChild(filter);
    });  
}
/*
export const brandFilters = {
    '/beauty/luxury-beauty-skincare/':
        [
        'Estee Lauder',
        'Clinique',
        'The Ordinary',
        'KVD',
        'Benefit',
        'IT Cosmetics',
        'Liz Earle',
        'NARS',
        'Fenty Beauty',
        'Fenty Skin',
        'Lancome',
    ],
    
    '/beauty/skincare/': [
        'La Roche Posay',
        'Garnier',
        'Palmers',
        'Neutrogena',
        'Teatree & Witch Hazel',
        'Nivea',
        'Simple',
        'Dove',
        'E45',
        'Olay',
    ],
    '/beauty/hair/': [
        'Bleach London',
        'Head and Shoulders',
        'Herbal Essences',
        'Tresemme',
        'Elvive',
        'Pantene',
        'Shrine',
        'Noughty',
        'Aussie',
        "L'Oreal",
    ],
    '/beauty/beauty-accessories/': [
        'Real Techniques',
        'Revolution',
        'Denman',
        'Eylure',
        'Cantu',
        'Elegant Touch',
        'Invisibobble',
        'Skinnydip',
        'Tangle Teezer',
        'Ardell',
    ],
    '/fragrance/perfume/': [
        'Mugler',
        'Paco Rabanne',
        'Jimmy Choo',
        'Christian Dior',
        'Marc Jacobs',
        'Gucci',
        'Ariana Grande',
        'Valentino',
        'Viktor & Rolf',
        'Hugo Boss'
    ],
    '/fragrance/aftershave/': [
        'Christian Dior',
        'Hugo Boss',
        'Paco Rabanne',
        'Versace',
        'Mont Blanc',
        'Calvin Klein',
        'Diesel',
        'Lacoste',
        'Emporio Armani',
        'Dolce and Gabbana'
    ],

} 


const getData = () => {
    let filters;
    const filterArr = [];

    
    if(filterType === 'price') {
        filters = document.querySelectorAll('#price .facetSelect li a');
    }
    if(filterType === 'reviews') {
        filters = document.querySelectorAll('#rating .facetSelect li a');
    }

    for (let index = 0; index < filters.length; index += 1) {
        const element = filters[index];
        const elID = element.getAttribute('id');
        const elName = element.querySelector('.outline > span').textContent.trim();
        
        // if rating
        const elStars = `${element.querySelector('[id*=facetLabel]').textContent.trim()} & up`
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

export default getData; */