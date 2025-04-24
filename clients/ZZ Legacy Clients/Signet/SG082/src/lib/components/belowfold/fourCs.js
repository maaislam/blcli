import shared from "../../shared";
//import scrollToElement from '../../scrollTo';
//import { ringJSON, ringData } from "./ringsData";
import { events } from "../../../../../../../lib/utils";
import { getSiteFromHostname } from "../../services";

/**
 * Create four C's section
 */
export default () => {

    const { ID, VARIATION } = shared;


    let diamondCarat;
    let cut;
    let clarity;
    let colour;

    let specs;

    if(getSiteFromHostname() === 'hsamuel') {
        specs = document.querySelectorAll('.product-specification .product-specification__item');
    } else {
        specs = document.querySelectorAll('.product-specification tr');
    }
    // loop through the specs to get the four cs
    for (let index = 0; index < specs.length; index += 1) {
        const element = specs[index];
        
        let specData;
        let specTitle;
        if(getSiteFromHostname() === 'hsamuel') {
            specTitle = element.querySelector('.product-specification__info');
            specData = element.querySelector('.product-specification__detail');
        } else {
            specTitle = element.querySelector('td:first-child');
            specData = element.querySelector('td:last-child');
        }

        if(specTitle) {
            if(specTitle.innerText.trim() === 'Total diamond carat weight') {
                diamondCarat = specData.innerText.trim();
            }

            if(specTitle.innerText.trim() === 'Diamond colour') {
                colour = specData.innerText.trim();
            }

            if(specTitle.innerText.trim() === 'Stone shape') {
                cut = specData.innerText.trim();
            }

            if(specTitle.innerText.trim() === 'Diamond clarity') {
                clarity = specData.innerText.trim();
            }
        }   
    }


    const fourCBox = document.createElement('div');
    fourCBox.classList.add(`${ID}__fourcWrapper`);
    fourCBox.innerHTML = 
    `<div class="${ID}__cRow">
        <div class="${ID}__title">
            <p>Carat <span target="carat"></span></p>
            <div class="${ID}__tooltip ${ID}__carat"><div class="${ID}__close"></div>Measures the weight not the size of a diamond. A diamond with a large carat weight will make it a valuable diamond because of its rarity; however a diamond can appear larger than its actual weight depending on the way it is cut and set.</div>
            </div>
        <div class="${ID}__cData">${diamondCarat}</div>
    </div>

    <div class="${ID}__cRow">
        <div class="${ID}__title">
            <p>Cut <span target="cut"></span></p>
            <div class="${ID}__tooltip ${ID}__cut"><div class="${ID}__close"></div>Diamond proportions evaluated using the attributes of brilliance, fire, and scintillation. While high grades of color or clarity affect a diamond, it's the cut that determines its overall proportions and its ability to reflect light.</div>
            </div>
        <div class="${ID}__cData">${cut}</div>
    </div>

    <div class="${ID}__cRow">
        <div class="${ID}__title">
            <p>Clarity <span target="clarity"></span></p>
            <div class="${ID}__tooltip ${ID}__clarity"><div class="${ID}__close"></div>Clarity is the measure of the tiny imperfections found in almost every diamond under 10x magnification. It's very common for diamonds to be formed with slight imperfections - the fewer inclusions, the more valuable a diamond is.</div>
            </div>
        <div class="${ID}__cData">${clarity}</div>
    </div>

    <div class="${ID}__cRow">
        <div class="${ID}__title">
            <p>Colour <span target="colour"></span></p>
            <div class="${ID}__tooltip ${ID}__colour"><div class="${ID}__close"></div>Diamonds are generally colourless or near colourless (they may have shades of yellow or brown.) A diamond which is completely colourless is more desirable than one which is slightly yellow.</div>
        </div>
        <div class="${ID}__cData">${colour}</div>
    </div>`;
    

    document.querySelector(`.${ID}__fourcs .${ID}__innerBox`).appendChild(fourCBox);


    const tooltip = () => {
        const cRow = document.querySelectorAll(`.${ID}__cRow`);

        cRow.forEach((item) => {
            const tooltip = item.querySelector(`.${ID}__tooltip`);
            item.querySelector('span').addEventListener('click', () => {
                if(tooltip.classList.contains(`${ID}__active`)) {
                    tooltip.classList.remove(`${ID}__active`);
                } else {
                    tooltip.classList.add(`${ID}__active`);
                    events.send(`${ID} variation: ${VARIATION}`, 'click', 'four c tooltip');
                }
            });

            item.querySelector(`.${ID}__close`).addEventListener('click', () => {
                 tooltip.classList.remove(`${ID}__active`);
            });
        });
    }
    tooltip();
}