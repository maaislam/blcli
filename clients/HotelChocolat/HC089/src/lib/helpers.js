import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const skus = [
    '356508',
    '356509',
    '358279',
    '503356',
    '503357',
    '503358',
    '503359',
    '503360',
    '503361',
    '503363',
    '503553',
    '503554',
    '503581',
    '503592',
    '503609',
    '503646',
    '503652',
    '503653',
    '503654',
    '503656',
    '503657',
    '503658',
    '503659',
    '503739',
    '503746',
    '503751',
    '503794',
    '503820',
    '503821',
    '503824',
    '503825',
    '503844',
    '503845',
    '503846',
    '503932',
    '503992',
    '503993',
    '504059',
    '504060',
    '504097',
    '504098',
    '504101',
    '504103',
    '504105',
    '504107',
    '504109',
    '504126',
];


export const showBox = (lightbox) => {
    lightbox.classList.remove(`${ID}-modalHide`);
    document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayHide`);

    if(lightbox.querySelectorAll('input[name="age"]')) {
        lightbox.querySelectorAll('input[name="age"]').forEach((input) => {
            input.checked = false;
        });
    }
}
export const closeBox = (lightbox) => {
    lightbox.classList.add(`${ID}-modalHide`);
    document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayHide`);
}

 // click CTA
 export const ctaClick = (CTA) => {
    const popUp = document.querySelector(`.${ID}-ageBox`);
    if(CTA) {
        CTA.addEventListener('click', (e) => {
            if(CTA.textContent.indexOf('Add all ingredients to bag') > -1) {
                popUp.setAttribute('type', 'addAll');
            } else if(CTA.textContent.indexOf('Add to Bag') > -1 || CTA.textContent.indexOf('Add to bag') > -1) {
                popUp.setAttribute('type', 'addToBag');
                fireEvent('Clicked add to bag on age restricted');
            } else {
                popUp.setAttribute('type', 'subscription');
                fireEvent('Clicked add to subscription on age restricted');
            }

             // windows fix
            const allNewRadios = document.querySelectorAll(`.${ID}-radio__input .radio`);
            if(allNewRadios) {
                for (let index = 0; index < allNewRadios.length; index += 1) {
                    const element = allNewRadios[index];
                    if(element.querySelector('input')) {
                        element.insertAdjacentElement('beforebegin', element.querySelector('input'));
                        element.remove();
                    }
                    
                }
            }
            
            showBox(popUp);
        });
    }
}


 