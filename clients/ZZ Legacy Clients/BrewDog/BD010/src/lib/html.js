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

export const html = (arr) => (

    `<div class="header__menu__collection">
        ${arr.map((obj, index) => {
            let keyVal = Object.keys(obj);
            let key = keyVal[0].replace('$', '');

            let objVal = Object.values(obj)[0];
            
            return keyVal[0].indexOf('$') ? 
                `<div class="header__menu__item">
                    <a href="${objVal.indexOf('$BLANK') > -1 ? objVal.replace('$BLANK', '') : objVal}" ${objVal.indexOf('$BLANK') > -1 ? `target="_blank"` : ''} class="link menu__inner-link" data-menu="menu-${index}">
                        ${key}
                    </a>
                </div>`
            :
                `<div class="header__menu__header">
                    <a href="${objVal.indexOf('$BLANK') > -1 ? objVal.replace('$BLANK', '') : objVal}" ${objVal.indexOf('$BLANK') > -1 ? `target="_blank"` : ''} data-menu="menu-${index}" class="link menu__inner-link">
                        ${key}
                    </a>
                </div>
                ` 
        }).join(' ')}    
     </div>`

);