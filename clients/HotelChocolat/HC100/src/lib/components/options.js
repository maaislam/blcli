import shared from "../../../../../../core-files/shared";
import { cups, extras, included, podBundle, pods } from "../data";
import { slickProducts } from "../helpers";

/**
 * Create options
 */

const { ID, VARIATION } = shared;

export default () => {

    /**
     * 
     * @param {*} object - data object
     * @param {*} type - product type
     * @param {*} parentEl - element new items will be added to
     */
    const createOptions = (object, type, parentEl) => {

        Object.keys(object).forEach((i) => {
            const el = object[i];
            const newEl = document.createElement('div');
            newEl.classList.add(`${ID}-product`);
            newEl.classList.add(`${ID}-${type}`);
            newEl.setAttribute('prod-id', el.id);
            newEl.setAttribute('qty', el.qty ? el.qty : 1);
           
            if(el.no) {
              newEl.setAttribute('slideNo', el.no);
            }
            newEl.setAttribute('prod-name', [i][0]);
            
            newEl.innerHTML = 
            `
            <div class="${ID}-productimage" style="background-image:url(${el.image})"></div>
            <p>
                ${VARIATION === '1' ? `<span class="${ID}-name">${el.name}</span>`:`<span class="${ID}-name">${el.v2Name}</span>`}
                ${el.podNo && VARIATION === '1' ? `${el.podNo}` : ''}
                ${el.wasPrice ? `
                <div class="${ID}-priceBlock">
                    <span class="${ID}-wasPrice">${el.wasPrice}</span> 
                    <span class="${ID}-price">${el.price}</span>
                </div>` : 
                `<span class="${ID}-price">${el.price}</span>`}
            </p>
            ${VARIATION === '2' ? `<div class="${ID}-select">select</div>` : ''} `;

            document.querySelector(parentEl).appendChild(newEl);
        });
    }

    if(VARIATION === '1') {
        // createOptions(included, 'included', `.${ID}-included .${ID}-stepContent`);
        // createOptions(podBundle, 'bundle', `.${ID}-podBundles .${ID}-stepContent .${ID}-carousel`);
        // createOptions(extras, 'extra', `.${ID}-extras .${ID}-carousel`);

        createOptions(window.HCincluded, 'included', `.${ID}-included .${ID}-stepContent`);
        createOptions(window.HCpods, 'bundle', `.${ID}-podBundles .${ID}-stepContent .${ID}-carousel`);
        createOptions(window.HCextras, 'extra', `.${ID}-extras .${ID}-carousel`);


        slickProducts(`.${ID}-extras .${ID}-carousel`, 0);
        slickProducts(`.${ID}-podBundles .${ID}-carousel`, 0);
        
        window.jQuery(`.${ID}-carousel`).slick('resize');
    }

    if(VARIATION === '2') {
        createOptions(podBundle, 'bundle', `.${ID}-radioOption[data-attr="bundle"] .radioContent .${ID}-options`);
        createOptions(cups, 'cups', `.${ID}-cups.${ID}-addOn .${ID}-products`);
        createOptions(pods, 'pods', `.${ID}-pods .${ID}-products`);

    }
    
}
