import shared from "../../../../../core-files/shared";
import { getClientID, getSiteFromHostname } from "./helpers";
export default () => {


    /**
     * 
     * @param {*} category 
     * @returns Increases category value in storage
     */
    const increaseStorage = (category) => {
        const items = localStorage.getItem(`${getClientID()}-groupings`) || '{}';
        const itemsObject = JSON.parse(items);

        itemsObject[category] += 1;

        return localStorage.setItem(`${getClientID()}-groupings`, JSON.stringify(itemsObject))
    }


    // set time storage
    let timeSet = false;

    if(!localStorage.getItem(`${getClientID()}-time`)) {
        localStorage.setItem(`${getClientID()}-time`, (new Date()).getTime())
        timeSet = true;
    }
    
    // store categories and set all values to 0

    if(!localStorage.getItem(`${getClientID()}-groupings`)) {
        console.log('here')
        localStorage.setItem(`${getClientID()}-groupings`, JSON.stringify({
            'prestige-watches': 0,
            'fashion-watches': 0,
            'engagement-rings': 0,
            'wedding-rings': 0,
            'jewellery': 0,
        }));
    }

    const config = {
        'prestige-watches': [
            /luxury-watches/,
            /tag.heuer.*(Watch|watch|watches)/,
            /tudor.*(Watch|watch|watches)/,
            /brietling.*(Watch|watch|watches)/,
            /bremont.*(Watch|watch|watches)/,
            /cartier.*(Watch|watch|watches)/,
            /longines.*(Watch|watch|watches)/,
            /omega.*(Watch|watch|watches)/,
        ],
        'fashion-watches': [
            /watches/,
            /watch/,
            /smartwatch/,
        ],
        'wedding-rings': [
            /wedding/,
            /wedding-rings/,
            () => digitalData.pageInstanceID.toLowerCase().indexOf('wedding') > -1 && location.pathname.match(/Ring/)
        ],
        'engagement-rings': [
            /engagement-rings/,
            /bridal.*set/,
            /diamond.*ring/,
            /engagement/,
        ],

        'jewellery': [
            /bracelets/,
            /bracelet/,
            /necklaces/,
            /necklace/,
            /rings/,
            /ring/,
            /earrings/,
            /jewellery/,
            /diamond/
        ]
    }
        
 
    let didMatch = false;

    Object.keys(config).forEach(grouping => {
        config[grouping].forEach(condition => {
            let check  = false;

            if(!didMatch) {
                if(typeof condition == 'function') {
                    check = condition();
                } 
                else {
                    check = location.href.toLowerCase().match(condition);
                }
            
                if(check) {
                    increaseStorage(grouping);
                    didMatch = true;
                }
            }
        });
    });


    // store last brand
    if (window.digitalData.page.pageInfo.pageType === 'PDP') {

        if(window.digitalData.product[0].productInfo.brand && window.digitalData.product[0].productInfo.brand !== '') {

            const productBrand = window.digitalData.product[0].productInfo.brand;

            let cache;
            
            if(getSiteFromHostname() === 'ernestjones') {
                cache = window.localStorage.EJbrand151;
            } else {
                cache = window.localStorage.HSbrand151;
            }
            
            const cachedBrandData = cache ? JSON.parse(cache) : [];

            const data = productBrand;

            if (typeof cachedBrandData.length === 'number') {
                while (cachedBrandData.length > 5) cachedBrandData.shift();
            }
            cachedBrandData.push(data);

            if(getSiteFromHostname() === 'ernestjones') {
                window.localStorage.EJbrand151 = JSON.stringify(cachedBrandData);
            } else {
                window.localStorage.HSbrand151 = JSON.stringify(cachedBrandData);

            }
        }
        
    }

    // store gender
    if (window.digitalData.page.pageInfo.pageType === 'PDP' || window.digitalData.page.pageInfo.pageType === 'PLP') {
        if(window.location.href.toLowerCase().indexOf('watch') > -1 || window.location.href.toLowerCase().indexOf('watches') > -1 ) {
            if(window.location.href.indexOf('ladies') > -1) {
                localStorage.setItem(`${getClientID()}-gender`, 'female')
            } else if(window.location.href.indexOf('mens') > -1) {
                localStorage.setItem(`${getClientID()}-gender`, 'male');
            }
        }
    }

}