import shared from "../../shared";
import scrollToElement from '../../scrollTo';
import { ringJSON, ringData } from "./ringsData";
import { events } from "../../../../../../../lib/utils";

/**
 * Create four C's section
 */
export default () => {

    const { ID, VARIATION } = shared;


    let diamondCarat;
    let cut;
    let clarity;
    let colour;

    // loop through the specs to get the four cs
    const specs = document.querySelectorAll('.product-specification tr');
    for (let index = 0; index < specs.length; index += 1) {
        const element = specs[index];
        
        const specTitle = element.querySelector('td:first-child');
        const specData = element.querySelector('td:last-child');

        if(specTitle) {
            if(specTitle.innerText.trim() === 'Diamond') {
                diamondCarat = specData.innerText.trim().replace('carat', '');
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

    const addFourCInfo = () => {

        let centerStone;
        let diamondStone;

        // add the weights based on JSON
        const sku = window.digitalData.product[0].productInfo.masterSku;

        const data = ringData.Diamonds;
        Object.keys(data).forEach((i) => {
            const dataEl = data[i];

            const dataSku = dataEl.sku;
            if(dataSku) {
                if(dataSku === parseFloat(sku)) {
                    const diamondWeight = dataEl.total;
                    const centerWeight = dataEl.center;

                    // if diamond weight is more than center then it will be shown
                    if(diamondWeight > centerWeight) {
                        diamondStone = diamondWeight.toFixed(2);
                        centerStone = centerWeight.toFixed(2);
                    }
                }
            }

        });

        const fourCDescriptions = document.createElement('div');
        fourCDescriptions.classList.add(`${ID}__fourCDesc-wrapper`);
        fourCDescriptions.innerHTML = 
            `<div class="${ID}__row" id="carat">
                <div class="${ID}__colLeft">
                    <div class="${ID}__blockInner">
                        <div class="${ID}-blockBack">
                            <div class="${ID}__block" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/C2F4CB1568321FAB896C708FFEA154849B60D64721709E7FC170EA89CE088955/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/kreated-media-fAIklKagBcw-unsplash111.jpg')"></div>
                        </div>
                    </div>
                </div>
                <div class="${ID}__colRight">
                    <h3 class="${ID}__heading">Diamond Carat</h3>
                    <div class="${ID}__subHeading">
                        ${diamondStone !== undefined || centerStone !== undefined ? `<span class="${ID}_weights"><li>Total Weight: ${diamondStone}</li><li>Centre Stone: ${centerStone}</li></span>` : `This ring: ${diamondCarat}`}
                    </div>
                    <p class="${ID}__paragraph">Measures the weight not the size of a diamond. A diamond with a large carat weight will make it a valuable diamond because of its rarity; however a diamond can appear larger than its actual weight depending on the way it is cut and set.</p> 
                </div>
            </div>
            <div class="${ID}__row" id="cut">
                <div class="${ID}__colLeft">
                <div class="${ID}__blockInner">
                    <div class="${ID}-blockBack">
                        <div class="${ID}__block" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/15432312ECD304BB65B81FFAF99BC7B71779C8951887B4EAEE625CEF2BC4F11D/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/engagement-ring-4Cs-v2.jpg')"></div>
                    </div>
                </div>
                </div>
                <div class="${ID}__colRight">
                    <h3 class="${ID}__heading">Diamond Cut</h3>
                    <div class="${ID}__subHeading">This ring: ${cut}</div>
                    <p class="${ID}__paragraph">Diamond proportions evaluated using the attributes of brilliance, fire, and scintillation. While high grades of color or clarity affect a diamond, it's the cut that determines its overall proportions and its ability to reflect light.</p> 
                </div>
            </div>
            <div class="${ID}__row" id="clarity">
                <div class="${ID}__colLeft">
                    <div class="${ID}__blockInner">
                        <div class="${ID}-blockBack">
                            <div class="${ID}__block" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/D47487BC07C0E0E2ADEAC3DD2BA63527F4451D2799768A0C2BE15CDBAA14F718/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/clarity-2.png')"></div>
                        </div>
                    </div>
                </div>
                <div class="${ID}__colRight">
                    <h3 class="${ID}__heading">Diamond Clarity</h3>
                    <div class="${ID}__subHeading">This ring: ${clarity}</div>
                    <p class="${ID}__paragraph">Clarity is the measure of the tiny imperfections found in almost every diamond under 10x magnification. It's very common for diamonds to be formed with slight imperfections - the fewer inclusions, the more valuable a diamond is.</p> 
                </div>
            </div>
            <div class="${ID}__row" id="colour">
                <div class="${ID}__colLeft">
                    <div class="${ID}__blockInner">
                        <div class="${ID}-blockBack">
                            <div class="${ID}__block" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/4088410F077030594055304E4DBD01A52F6DC4660A9CBF5F782E30717F7F0562/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/colour.png')"></div>
                        </div>
                    </div>
                </div>
                <div class="${ID}__colRight">
                    <h3 class="${ID}__heading">Diamond Colour</h3>
                    <div class="${ID}__subHeading">This ring: ${colour}</div>
                    <p class="${ID}__paragraph">Diamonds are generally colourless or near colourless (they may have shades of yellow or brown.) A diamond which is completely colourless is more desirable than one which is slightly yellow.</p> 
                </div>
            </div>`;

        document.querySelector(`.${ID}__fourcs .${ID}__innerBox`).insertAdjacentElement('afterend', fourCDescriptions);
    }

    const smoothScroll = () => {
        const cRow = document.querySelectorAll(`.${ID}__cRow`);

        cRow.forEach((item) => {
            const tooltip = item.querySelector(`.${ID}__tooltip`);
            item.querySelector('span').addEventListener('click', (e) => {
                const targetEl = e.currentTarget.getAttribute('target');
                const matching = document.querySelector(`#${targetEl}`);
                scrollToElement(matching);
            });
        });
    }
    if(shared.VARIATION === '1' || shared.VARIATION === '2') {
        tooltip();
    }

    if(shared.VARIATION === '3') {
       addFourCInfo();
       smoothScroll();
    }
}