import { fireEvent } from "../../../../../../../core-files/services";
import shared from "../../../../../../../core-files/shared";
import { observer, pollerLite } from "../../../../../../../lib/utils";
import { data } from "./gridData";

export default () => {

    const { ID } = shared;

    /* Add multiple in grid content */
    const addInGridContent = () => {

        if(!document.querySelector(`.${ID}-inGridBlock`)) {
            const gridData = data.content;

            Object.keys(gridData).forEach((i) => {
                const data = gridData[i];

                const gridBlock = document.createElement('li');
                if (data.blockClass) {
                    gridBlock.className = `${ID}-inGridBlock ${ID}-${data.blockClass}`;
                } else {
                    gridBlock.className = `${ID}-inGridBlock`;
                }
                gridBlock.innerHTML = `
                <div class="${ID}-inGridContent estore_product_container">
                    <div class="${ID}-container" style="background-color:${data.color}">
                        <span class="${ID}-icon" style="background-image: url(${data.icon})"></span>
                        <div class="${ID}-title"><h3>${[i][0]}</h3></div>
                        <p>${data.innerText}</p>
                        <a class="${ID}-button" target="_blank" href="${data.link}">${data.linkText}</a>
                    </div>
                </div>`;


                const productEl = document.querySelectorAll('.grid_mode.grid li')[data.position];
                if (productEl) {
                    productEl.insertAdjacentElement('afterend', gridBlock);
                }
            });
        }
    }

    const inGridTracking = () => {
        const allInGrid = document.querySelectorAll(`.${ID}-inGridBlock`);
        for (let index = 0; index < allInGrid.length; index += 1) {
            const element = allInGrid[index];
            element.querySelector('a').addEventListener('click', () => {
                fireEvent('Clicked in grid block');
            });
        }
    }

    const removeBlock = () => {
        const block = document.querySelectorAll(`.${ID}-inGridBlock`);
        for (let index = 0; index < block.length; index += 1) {
            const element = block[index];
            if (element) {
                element.remove();
            }
        }
    }

    /**
     * Run functions
     */
    addInGridContent();
    inGridTracking();

    // Observer, might need to be added in experiment.js

    pollerLite([`.${ID}-inGridBlock`, '.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range'], () => {
        observer.connect(document.querySelector('.grid_mode.grid'), () => {
            removeBlock();
            addInGridContent();
            inGridTracking();
        }, {
        throttle: 200,
        config: {
            attributes: false,
            childList: true,
            // subtree: true,
        },
        });
    });
    

}