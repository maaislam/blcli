import { events } from "../../../../../../lib/utils";
import { getSiteFromHostname } from "../services";
import shared from "../shared";
import { EJringData } from "./productData";


const { ID, VARIATION } = shared;

let ringData;
if(getSiteFromHostname() === 'ernestjones') {
    ringData = EJringData;

} else {
    ringData = EJringData;
}

let currentIndex;
const attributeArr = ['sku', 'name', 'price', 'brand', 'size', 'setting', 'shape', 'style', 'type', 'material'];

export const attributeSetup = () => {

    localStorage.setItem('toolInit', 'true');
    localStorage.setItem('indexArr', '[]');

    for (let index = 0; index < attributeArr.length; index += 1) {
        const attribute = attributeArr[index];
        createStorage(attribute);

    }

}

export const buildTool = (d) => {
    const targetEl = document.querySelector(`.${ID}-swiper-wrapper .${ID}-mainproduct`);
    const indexArr = localStorage.getItem('indexArr');
    const parseIndex = JSON.parse(indexArr);
    const newIndexArr = parseIndex.push('' + d + '');
    const indexString = JSON.stringify(parseIndex);
    localStorage.setItem('indexArr', indexString);
    const noString = JSON.stringify(d);
    const productReference = ringData[d];
    let sku = productReference.sku;
    let name = productReference.name;
    let price = productReference.price;
    let brand = productReference.brand;
    let size = productReference.diamondSize;
    let setting = productReference.stoneSetting;
    let shape = productReference.stoneShape;
    let style = productReference.stoneStyle;
    let type = productReference.stoneType;
    let material = productReference.material;
    let img = productReference.imgThumb;
    currentIndex = d;

    if(targetEl) {

        let productMarkup = ``;

        targetEl.innerHTML =
        `<div class="${ID}-product-card">
            <div class="${ID}-product__card__choice m--reject"></div>
            <div class="${ID}-product__card__choice m--like"></div>
           
            <div class="${ID}-product_image" style="background-image: url(${img})" width="250" height="250"></div>
            <div class="${ID}-product_information">
                <h2>${brand}</h2>
                <p class="${ID}-productTitle">${name}</p>
                <p class="${ID}-productPrice">£${price}</p>
            </div>
        </div>
        <div class="${ID}-buttons-wrapper">
            <button type="button" class="${ID}-circle-button product_no" data-sku="${sku}" data-name="${name}" data-price="${price}" data-brand="${brand}" data-size="${size}" data-setting="${setting}" data-shape="${shape}" data-style="${style}" data-type="${type}" data-material="${material}"></button> 
            <div class="lineBreak"></div>
            <button type="button" class="${ID}-circle-button product_yes" data-sku="${sku}" data-name="${name}" data-price="${price}" data-brand="${brand}" data-size="${size}" data-setting="${setting}" data-shape="${shape}" data-style="${style}" data-type="${type}" data-material="${material}"></button>
        </div>
        <a class="${ID}-btn" href="https://www.ernestjones.co.uk/webstore/l/engagement-rings/">View All Engagement Rings</a>`;

        // yes/no clicks
        if(targetEl.querySelector(`.${ID}-product-card`)) {
            const yesButton = targetEl.querySelector('.product_yes');
            const noButton = targetEl.querySelector('.product_no');
            
            if(yesButton && noButton) {
                yesButton.addEventListener('click', () => {
                   approveFn();
                    

                });
                noButton.addEventListener('click', () => {
                    rejectFn();
                });
            }
        }

        
    }
}


// clear all stored when closed

export const clearAllStorage = () => {

    localStorage.removeItem('nameArr');
    localStorage.removeItem('brandArr');
    localStorage.removeItem('rejskuArr');
    localStorage.removeItem('rejtypeArr');
    localStorage.removeItem('rejsettingArr');
    localStorage.removeItem('balskuArr');
    localStorage.removeItem('priceArr');
    localStorage.removeItem('balmaterialArr');
    localStorage.removeItem('balshapeArr');
    localStorage.removeItem('skuArr');
    localStorage.removeItem('styleArr');
    localStorage.removeItem('rejmaterialArr');
    localStorage.removeItem('rejsizeArr');
    localStorage.removeItem('shapeArr');
    localStorage.removeItem('rejbrandArr');
    localStorage.removeItem('sizeArr');
    localStorage.removeItem('balsizeArr');
    localStorage.removeItem('rejnameArr');
    localStorage.removeItem('typeArr');
    localStorage.removeItem('rejstyleArr');
    localStorage.removeItem('baltypeArr');
    localStorage.removeItem('indexArr');
    localStorage.removeItem('balbrandArr');
    localStorage.removeItem('materialArr');
    localStorage.removeItem('balpriceArr');
    localStorage.removeItem('rejshapeArr');
    localStorage.removeItem('balsettingArr');
    localStorage.removeItem('balstyleArr');
    localStorage.removeItem('settingArr');
    localStorage.removeItem('balnameArr');
    localStorage.removeItem('rejpriceArr');
}

const createStorage = (name) => {
    localStorage.setItem('' + name + 'Arr', '[]');
    localStorage.setItem('rej' + name + 'Arr', '[]');
    localStorage.setItem('bal' + name + 'Arr', '[]');
}
const handleData = (name) => {
    const attr = document.querySelector(`.${ID}-circle-button.product_yes`);
    const arr = localStorage.getItem('' + name + 'Arr');
    if(attr) {
        const parse = JSON.parse(arr);
        const newArr = parse.push(attr.getAttribute('data-' + name + ''));
        const string = JSON.stringify(parse);
        localStorage.setItem('' + name + 'Arr', string);
    }
}

const handleRejData = (name) => {
    const attr = document.querySelector(`.${ID}-circle-button.product_no`);
    const arr = localStorage.getItem('rej' + name + 'Arr');
    const parse = JSON.parse(arr);
    if(attr) {
        const newArr = parse.push(attr.getAttribute('data-' + name + ''));
        const string = JSON.stringify(parse);
        localStorage.setItem('rej' + name + 'Arr', string);
    }
}

const createLikedAtt = (name) => {

    const rejArr = JSON.parse(localStorage.getItem('rej' + name + 'Arr'));
    const Arr = JSON.parse(localStorage.getItem('' + name + 'Arr'));
    if (rejArr.length > 0) {
        for (let index = 0; index < rejArr.length; index += 1) {

            const rejWord = rejArr[index];

            for (let index = 0; index < Arr.length; index += 1) {

                const arrWord = Arr[index];

                if (arrWord === rejWord) {
                    Arr.splice(index, 1);
                    var string = JSON.stringify(Arr);
                    localStorage.setItem('bal' + name + 'Arr', string);
                    break;

                }
                else {
                    var string = JSON.stringify(Arr);
                    localStorage.setItem('bal' + name + 'Arr', string);
                }

            }
        }
    }
    else {
        var string = JSON.stringify(Arr);
        localStorage.setItem('bal' + name + 'Arr', string);
    }
    
    let mf;
    
    if (localStorage.getItem('bal' + name + 'Arr') === null || localStorage.getItem('bal' + name + 'Arr').length < 3) {
        mf = mostFrequent(JSON.parse(localStorage.getItem('' + name + 'Arr')));

    } else {
        mf = mostFrequent(JSON.parse(localStorage.getItem('bal' + name + 'Arr')));
    }

    let critera = [];
        for (let index = 0; index < mf.length; index += 1) {
            const element = mf[index];
            if (element.count > 1) {
                critera.push(element.word);
            }
        }
    return (critera);

}

// Yes functionality
export const approveFn = () => {

    //Return the clicked product information & viewed product index and return any stored information in local storage and add new information to array 
    for (let index = 0; index < attributeArr.length; index += 1) {
        const attribute = attributeArr[index];
        handleData(attribute);
    }

    //IF count of products interacted with is > 24, redirect to listing page
    if (JSON.parse(localStorage.getItem('skuArr')).length > 12) {
        const loader = document.querySelector(`.${ID}-loading-screen`);
        loader.classList.add(`${ID}-loaderActive`);
        buildURL();

    } else {

        //Set Popular Criteria

        const shapeCritera = createLikedAtt('shape');
        const materialCritera = createLikedAtt('material');
        const styleCritera = createLikedAtt('style');
        const brandCritera = createLikedAtt('brand');

        const avPrice = averagePrice(JSON.parse(localStorage.getItem('priceArr')));
        const price = Number(avPrice);
        const threshold = (price / 100) * 33;
        const topPrice = (price + threshold).toFixed(2);
        const bottomPrice = (price - threshold).toFixed(2);
        

        //Add 1 onto index

        currentIndex = Number(currentIndex);
        currentIndex = currentIndex + 1;

        //Loop Over Product Feed and Check Criteria

        let hasMatched = false;
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index += 1) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1 && element.price > bottomPrice && element.price < topPrice && styleCritera.indexOf(element.stoneStyle) > -1 && brandCritera.indexOf(element.brand) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index++) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1 && element.price > bottomPrice && element.price < topPrice && styleCritera.indexOf(element.stoneStyle) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index++) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1 && element.price > bottomPrice && element.price < topPrice) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index++) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index++) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }

        //If no matching product, return next viewed
        if (hasMatched === false) {
            checkIndex(currentIndex);
        }

    }
}

// No functionality
export const rejectFn = () => {

    //Return the clicked product information & viewed product index and return any stored information in local storage and add new information to array 

    for (let index = 0; index < attributeArr.length; index += 1) {
        const attribute = attributeArr[index];
        handleRejData(attribute);
    }

    //IF count of products interacted with is > 24, redirect to listing page

    if (JSON.parse(localStorage.getItem('rejskuArr')).length > 50) {
        const loader = document.querySelector(`.${ID}-loading-screen`);
        loader.classList.add(`${ID}-loaderActive`);

        if(getSiteFromHostname() === 'ernestjones') {
            window.location.href = 'https://www.ernestjones.co.uk/webstore/l/engagement-rings';
        } else {
            window.location.href = 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement';
        }
    

    } else {
        //Set Popular Criteria

        const shapeCritera = createLikedAtt('shape');
        const materialCritera = createLikedAtt('material');
        const styleCritera = createLikedAtt('style');
        const brandCritera = createLikedAtt('brand');

        //Set Average Price

        const avPrice = averagePrice(JSON.parse(localStorage.getItem('priceArr')));
        const price = Number(avPrice);
        const threshold = (price / 100) * 25;
        const topPrice = (price + threshold).toFixed(2);
        const bottomPrice = (price - threshold).toFixed(2);
        const priceURL = `Nf=P_Current_Price%7CBTWN+${bottomPrice}+${topPrice}`;

        //Add 1 onto index
        currentIndex = Number(currentIndex);
        currentIndex = currentIndex + 1;

        //Loop Over Product Feed and Check Criteria
        let hasMatched = false;
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index += 1) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1 && element.price > bottomPrice && element.price < topPrice && styleCritera.indexOf(element.stoneStyle) > -1 && brandCritera.indexOf(element.brand) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index += 1) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1 && element.price > bottomPrice && element.price < topPrice && styleCritera.indexOf(element.stoneStyle) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index += 1) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1 && element.price > bottomPrice && element.price < topPrice) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index += 1) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1 && materialCritera.indexOf(element.material) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }
        if (hasMatched === false) {
            for (let index = currentIndex; index < ringData.length; index += 1) {
                const element = ringData[index];
                if (shapeCritera.indexOf(element.stoneShape) > -1) {
                    checkIndex([index]);
                    hasMatched = true;
                    break;
                }
            }
        }

        //If no matching product, return next viewed
        if (hasMatched === false) {
            checkIndex(currentIndex);
        }

    }
}

const mostFrequent = (array) => {
    let counts = {};

    for (let i = array.length - 1; i >= 0; i--) {
        const word = array[i];

        if (counts[word] === undefined) {
            counts[word] = 1;
        } else {
            counts[word] = counts[word] + 1;
        }

    }

    let frequencies = [];
    Object.keys(counts).forEach(function (word) {
        frequencies.push({
            word: word,
            count: counts[word],
        });
    });

    const ordered = frequencies.sort(function (a, b) {
        return b.count - a.count;
    })

    return ordered;

}

const averagePrice = (priceArray) => {

    let sum = 0;
    for (let i = 0; i < priceArray.length; i += 1) {
        sum += Number(priceArray[i]);
    }

    const avg = sum / priceArray.length;
    const avgPrice = avg.toFixed(2);

    return avgPrice;
}

const checkIndex = (i) => {

    const indexArr = localStorage.getItem('indexArr');
    const parseIndex = JSON.parse(indexArr);
    const numString = JSON.stringify(i).replace(/[\[\]]+/gmi, '');

    if (i > 49) {
        checkIndex(1)
    } else if (parseIndex.includes(numString)) {
        const newIndex = Number(numString);
        const addOne = newIndex + 1;
        checkIndex(addOne);
    } else {
        buildTool(i);
    }
}

const EJurlObj = {
    "stoneShape": {
      "Round":"stone_shape=round",
      "Brilliant (round)":"stone_shape=brilliant%20%28round%29",
      "Pear":"stone_shape=pear",
      "Oval":"stone_shape=oval",
      "Baguette": "stone_shape=baguette",
      "Cushion": "stone_shape=cushion",
      "Emerald": "stone_shape=emerald",
      "Princess": "stone_shape=princess",
      "Radiant": "stone_shape=radiant",
      "Square": "stone_shape=square",
      "Trillion": "stone_shape=trillion",
      "Marquise": "stone_shape=marquise",
    },
    /*"ringMaterial": {
        "White Gold":"%7Cwhite+gold",
        "9ct White Gold":"%7C9ct+white+gold",
        "14ct White Gold":"%7C14ct+white+gold",
        "18ct White Gold":"%7C18ct+white+gold",
        "Yellow Gold":"%7Cyellow+gold",
        "9ct Yellow Gold":"%7C9ct+yellow+gold",
        "14ct Yellow Gold":"%7C14ct+yellow+gold",
        "18ct Yellow Gold":"%7C18ct+yellow+gold",
        "Rose Gold":"%7Crose+gold",
        "Two Colour Gold":"%7Ctwo+colour+gold",
        "Silver":"%7Call+silver",
        "Platinum":"%7Cplatinum"
    },*/
    "ringMaterial": {
        "White Gold":"material.lvl0=white%20gold",
        "Yellow Gold":"material.lvl0=yellow%20gold",
        "Rose Gold":"material.lvl0=rose%20gold",
        "Two Colour Gold":"material.lvl0=two%20colour%20gold",
        "Silver":"material.lvl0=all%20silver",
        "Platinum":"material.lvl0=platinum"
    },
    "ringStyle": {
        "Bridal Set":"style=bridal%20set",
        "Cluster":"style=cluster",
        "Court":"style=court",
        "Eternity":"style=eternity",
        "Halo":"style=halo",
        "Multi Stone":"style=multi%20stone",
        "Solitaire":"style=solitaire",
        "Three Stone":"style=three%20stone",
        "Diamond Set":"ring_style=diamond%20set",
    },

    "ringBrand": {
        "Arctic Light":"brand.lvl0=arctic%20light",
        "Ernest Jones Diamond Collection":"brand.lvl0=ernest%20jones%20diamond%20collection",
        "Ernest Jones Gemstone Collection":"brand.lvl0=ernest%20jones%20gemstone%20collection",
        "Ernest Jones Pearl Collection":"brand.lvl0=ernest%20jones%20pearl%20collection",
        "Ernest Jones Wedding Collection":"brand.lvl0=ernest%20jones%20wedding%20collection", 
        "Eternal Diamond":"brand.lvl0=eternal%20diamond",
        "Gucci Jewellery":"brand.lvl0=gucci%20jewellery",
        "Le Vian":"brand.lvl0=le%20vian",
        "Marco Bicego":"brand.lvl0=marco%20bicego",
        "Neil Lane":"brand.lvl0=neil%20lane",
        "Swarovski":"brand.lvl0=swarovski",
        "The Diamond Story":"brand.lvl0=the%20diamond%20story",
        "Tolkowsky":"brand.lvl0=tolkowsky",
        "Vera Wang Love":"brand.lvl0=vera%20wang%20love",
    }
}
// const HSurlObj = {
//     "stoneShape": {
//       "Round":"%7Cround",
//       "Brilliant (round)":"%7Cbrilliant+%28round%29",
//       "Pear":"%7Cpear",
//       "Oval":"%7Coval",
//       "Baguette": "%7Cbaguette",
//       "Cushion": "%7Ccushion",
//       "Emerald": "%7Cemerald",
//       "Princess": "%7Cprincess",
//       "Radiant": "%7Cradiant",
//       "Square": "%7Csquare",
//       "Trillion": "%7Ctrillion",
//       "Marquise": "%7Cmarquise",
//     },
//    /* "ringMaterial": {
//         "White Gold":"%7Cwhite+gold",
//         "9ct White Gold":"%7C9ct+white+gold",
//         "14ct White Gold":"%7C14ct+white+gold",
//         "18ct White Gold":"%7C18ct+white+gold",
//         "Yellow Gold":"%7Cyellow+gold",
//         "9ct Yellow Gold":"%7C9ct+yellow+gold",
//         "14ct Yellow Gold":"%7C14ct+yellow+gold",
//         "18ct Yellow Gold":"%7C18ct+yellow+gold",
//         "Rose Gold":"%7Crose+gold",
//         "Two Colour Gold":"%7Ctwo+colour+gold",
//         "Silver":"%7Call+silver",
//         "Platinum":"%7Cplatinum"
//     },*/
//     "ringMaterial": {
//         "White Gold":"%7Cwhite+gold",
//         "9ct White Gold":"%7Cwhite+gold",
//         "14ct White Gold":"%7Cwhite+gold",
//         "18ct White Gold":"%7Cwhite+gold",
//         "Yellow Gold":"%7Cyellow+gold",
//         "9ct Yellow Gold":"%7Cyellow+gold",
//         "14ct Yellow Gold":"%7Cyellow+gold",
//         "18ct Yellow Gold":"%7Cyellow+gold",
//         "Rose Gold":"%7Crose+gold",
//         "Two Colour Gold":"%7Ctwo+colour+gold",
//         "Silver":"%7Call+silver",
//         "Platinum":"%7Cplatinum"
//     },
//     "ringStyle": {
//         "Bridal Set":"%7Cbridal+set",
//         "Cluster":"%7Ccluster",
//         "Court":"%7Ccourt",
//         "Cushion":"%7Ccushion",
//         "Eternity":"%7Ceternity",
//         "Halo":"%7Chalo",
//         "Multi Stone":"%7Cmulti+stone",
//         "Solitaire":"%7Csolitaire",
//         "Three Stone":"%7Cthree+stone",
//         "Shaped":"%7Cshaped",
//         "Diamond Set":"%7Cdiamond+set",
//     },

//     "ringBrand": {
//         "Adrianna Papel":"%7Cadrianna+papel",
//         "Emmy London":"%7Cemmy+london",
//         "Enchanted Disney Fine Jewelry": "%7Cenchanted+disney+fine+jewelry",
//         "Le Vian": "%7Cle+vian",
//         "Perfect Fit": "%7Cperfect+fit",
//         "Princessa": "%7Cprincessa",
//         "The Diamond Story":"%7Cthe+diamond+story",
//         "The Forever Diamond":"%7Cthe+forever+diamond",
//         "H Samuel Collection":"",
//     }
// }

const buildURL = () => {

    let urlObj;
    if(getSiteFromHostname() === 'ernestjones') {
        urlObj = EJurlObj;
    } else {
        urlObj = HSurlObj;
    }
    //returns all frequently liked attributes

    const shapeTerms = createLikedAtt('shape').map((att) => urlObj['stoneShape'][att]);
    const materialTerms = createLikedAtt('material').map((att) => urlObj['ringMaterial'][att]);
    const styleTerms = createLikedAtt('style').map((att) => urlObj['ringStyle'][att]);
    const brandTerms = createLikedAtt('brand').map((att) => urlObj['ringBrand'][att]);

    //Set Average Price

    const avPrice = averagePrice(JSON.parse(localStorage.getItem('priceArr')));
    const price = Number(avPrice);
    const threshold = (price / 100) * 25;
    const topPrice = (price + threshold).toFixed(2);
    const bottomPrice = (price - threshold).toFixed(2);

    // Build the URL

    let shapeURL = '';
    let materialURL = '';
    let styleURL = '';
    let brandURL = '';

    if(shapeTerms.length > 0) {
        shapeURL = `${shapeTerms.join('&')}`;
    }
    if(materialTerms.length > 0) {
        materialURL = `${materialTerms.join('&')}`;
    }
    if(styleTerms.length > 0) {
        styleURL = `${styleTerms.join('&')}`;
    }
    if(brandTerms.length > 0) {
        brandURL = `${brandTerms.join('&')}`;
    }

    let urlStart;
    if(getSiteFromHostname() === 'ernestjones') {
        urlStart = 'https://www.ernestjones.co.uk/webstore/l/engagement-rings';
    } else {
        urlStart = 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement';
    }

    const url = `${urlStart}/?${shapeURL}&${materialURL}&${styleURL}&current_price=${bottomPrice}%3a${topPrice}`;
    events.send(`${ID} v${VARIATION}`, 'completed search', 'End of finder tool');
    window.location.href = url;
    
}
