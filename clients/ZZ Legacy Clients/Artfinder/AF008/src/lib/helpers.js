import { pollerLite } from "../../../../../lib/utils";

export const getScore = () => {
    if (!window.localStorage.getItem('uc_intentObject')) return;
    var intent_object = JSON.parse(window.localStorage.uc_intentObject)
    if (!intent_object) {
        console.error('no intent score');
        return;
    }
    return intent_object.uc_overall_intent
}


export const bandLevel = score => {
    let band = 'low';

    if (score < 10) {
        return band;
    }
    if (score >= 10 && score < 47) {
        return band = 'med';
    }
    if (score >= 47) {
        return band = 'high';
    }   
}


export const detectActiveFilters = () => {
    const filters = document.querySelectorAll('div.af-tag span span');
    if (filters) {
        const names = Array.from(filters).map((filt) => filt.textContent.trim());

        return names;
    }
}


export const getFilters = (title, cb) => {
    const titles = document.querySelectorAll('span.af-bold');
    const thisTitle = Array.from(titles).filter((tit) => tit.textContent === title);
    console.log({thisTitle});
    let arr = [];

    if (thisTitle.length) { 
        const parentLink = thisTitle[0].closest('.accordion-navigation');
        const thisTab = parentLink.querySelector('a.af-accordion-element');
        console.log({thisTab})
        thisTab.click();
        let thisContent = parentLink.querySelector('.content');
        
        pollerLite([() => {
            let pass = false;
            if (thisContent.classList.contains('active')) {
                pass = true;
            }
            return pass;
        }], () => {
            thisContent = parentLink.querySelector('.content.active');
            if (title === 'Subject' || title === 'Style') {
                const inputs = thisContent.querySelectorAll('input[type="radio"]');
                // console.log({inputs})
                if (inputs.length) {
                    Array.from(inputs).map((imp) => arr.push({
                        name: imp.value,
                        value: `${title.toLowerCase()}-${imp.value}`,
                    }));
                }
            }

            if (title === 'Size') {
                const inputs = thisContent.querySelectorAll('input[type="radio"]');
                // console.log({inputs})
                if (inputs.length) {
                    Array.from(inputs).map((imp) => arr.push({
                        name: imp.value,
                        value: `size_-${imp.value}`,
                    }));
                }
            }

            if (title === 'Colour') {
                const inputs = thisContent.querySelectorAll('input[type="checkbox"]');
                // console.log({inputs})
                if (inputs.length) {
                    Array.from(inputs).map((imp) => arr.push({
                        name: imp.value,
                        value: `colours-${imp.value}`,
                    }));
                }
            }

            // console.log({arr})
            cb(arr);
        });
    }
}


export const filterTerms = banding => {
    switch (banding) {
        case 'low':
            return ['Subject', 'Style'];
            break;
        case 'med':
            return ['Size', 'Colour'];
            break;
        case 'high':
            return ['Price'];
            break;
        default:
            break;
    }
}