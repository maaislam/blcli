// Obj Schema
// arr = [
//         {
//             "$BrewDog": "https://www.brewdog.com/uk/beers/headliners",
//         },
//         {
//             "Punk IPA": "https://www.brewdog.com/uk/punk-ipa-4-x-can"
//         }
//    ]

// a dollar ($) sign at the beginning highlights it as a header item.

export const html = (arr) => {

    return(`<div class="header-mobile__menu__subitem">
        ${arr.map((obj, index) => {
            let keyVal = Object.keys(obj);
            let key = keyVal[0].replace('$', '');
            key = key.replace('SUB', '');
            key = key.replace('#DIR', '');

            let objVal = Object.values(obj)[0];
            let html = '';
            
            if (keyVal[0].indexOf('$')) {
                html =  `<div class="header-mobile__menu__subitem__subitem">
                                <a href="${objVal.indexOf('$BLANK') > -1 ? objVal.replace('$BLANK', '') : objVal}" ${objVal.indexOf('$BLANK') > -1 ? `target="_blank"` : ''} class="link menu__inner-link" data-menu="menu-${index}">
                                    ${key}
                                </a>
                            </div>`;
            } else if (keyVal[0].indexOf('SUB')) {
                html =  `<div class="header-mobile__menu__subitem__item">
                            <a href="${objVal.indexOf('$BLANK') > -1 ? objVal.replace('$BLANK', '') : objVal}" ${objVal.indexOf('$BLANK') > -1 ? `target="_blank"` : ''} class="link menu__inner-link" data-menu="menu-${index}">
                                ${key}
                            </a>
                            <img class="icon-open" src="https://www.brewdog.com/static/version1603174652/frontend/Born/arcticFox/en_US/icons/icon-minus-16.svg" alt="">
                                <img class="icon-closed" src="https://www.brewdog.com/static/version1603174652/frontend/Born/arcticFox/en_US/icons/icon-plus-16.svg" alt="">
                        </div>`;
            } else if (keyVal[0].indexOf('#DIR')) {
                html = `<div class="header-mobile__menu__subitem__subitem">
                        <a href="${objVal.indexOf('$BLANK') > -1 ? objVal.replace('$BLANK', '') : objVal}" ${objVal.indexOf('$BLANK') > -1 ? `target="_blank"` : ''} data-menu="menu-${index}" class="link menu__inner-link">
                            ${key}
                        </a>
                    </div>`; 
            } else {
                html = `<div class="header-mobile__menu__subitem__item">
                            <a href="${objVal.indexOf('$BLANK') > -1 ? objVal.replace('$BLANK', '') : objVal}" ${objVal.indexOf('$BLANK') > -1 ? `target="_blank"` : ''} data-menu="menu-${index}" class="link menu__inner-link">
                                ${key}
                            </a>
                        </div>`; 
            }

            return html;
        }).join(' ')}    
     </div>`);
};