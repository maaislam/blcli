import { events, pollerLite } from '../../../../../lib/utils';
import { getSiteFromHostname } from './services';
import shared from './shared';

const {  ID, VARIATION } = shared;

/* Create last viewed products carousel */

export default class RecentlyViewed {
    constructor() {

        let productDataStr;
        
        if(getSiteFromHostname() === 'hsamuel') {
            productDataStr = window.localStorage.HS116stored_prods_1;
        } else {
            productDataStr = window.localStorage.EJ116stored_prods_1;
        }
        
        if (productDataStr) {
            this.productData = JSON.parse(productDataStr);
            if (this.productData.length) {
                 this.createAndRender();
            }
        }
    }

    createAndRender() {

        // add overlay
        const overlay = document.createElement('div');
        overlay.classList.add(`${ID}-recentlyOverlay`);

        // Create the tab
        const viewedTab = document.createElement('div');
        viewedTab.classList.add(`${ID}-viewTab`);
        viewedTab.innerHTML = `
        <div class="${ID}-remove"></div>
        <span>Recently Viewed</span>`;

        // create recently viewed container
        const lastViewedproducts = document.createElement('div');
        lastViewedproducts.classList.add(`${ID}-lastViewedWrapper`);
        lastViewedproducts.innerHTML = `
        <div class="${ID}-title">
            <h3>Recently Viewed</h3>
            <div class="${ID}-close"></div>
        </div>
       
        <div class="${ID}_LastViewedProducts-list_wrapper">
            <ul class="${ID}_productsList">
                ${this.productData.map(data => `
                <li class="${ID}_productsList-item">
                    <a class="${ID}_productLink" href="${data.link}"></a>
                    <div class="${ID}_productsList-img" style="background-image:url(${data.image})"></div>
                    <div class="${ID}_productDetails">
                        <p class="${ID}_productsList-name">${data.name}</p>
                        <p class="${ID}_productsList-price">${data.price}</p>
                    </div>
                </li>
                `).join('')}
            </ul>
            <div class="${ID}-clearContainer">
                <div class="${ID}-clearCTA">Clear all</div>
            </div>
        </div>`;

    
        document.body.appendChild(overlay);
        document.body.appendChild(viewedTab);
        document.body.appendChild(lastViewedproducts);

        /* ----------
         Click events
         -----------*/

        const closeViewed = () => {
            lastViewedproducts.classList.remove(`${ID}-recent-active`);
            document.body.classList.remove(`${ID}-noScroll`);
            overlay.classList.remove(`${ID}-overlayShow`);
            viewedTab.classList.remove(`${ID}-viewHide`);
            events.send(`${ID} V:${VARIATION}`, 'click', 'Closed recently viewed');
        }

        const openViewed = () => {
            lastViewedproducts.classList.add(`${ID}-recent-active`);
            document.body.classList.add(`${ID}-noScroll`);
            overlay.classList.add(`${ID}-overlayShow`);
            viewedTab.classList.add(`${ID}-viewHide`);

           events.send(`${ID} V:${VARIATION}`, 'click', 'Open recently viewed tab');
        }

        overlay.addEventListener('click', () => {
            closeViewed();
        });
        lastViewedproducts.querySelector(`.${ID}-close`).addEventListener('click', () => {
            closeViewed();
        });

        viewedTab.addEventListener('click', (e) => {
            if(e.target ===  document.querySelector(`.${ID}-remove`)) {
                viewedTab.remove();
                if(getSiteFromHostname() === 'hsamuel') {
                    localStorage.setItem(`HS-tabRemoved`, true);
                } else {
                    localStorage.setItem(`EJ-tabRemoved`, true);
                }
              
                events.send(`${ID} V:${VARIATION}`, 'click', 'Removed recently viewed tab');
            } else {
                openViewed();
            }
        });   
        
        // on clear all
        lastViewedproducts.querySelector(`.${ID}-clearCTA`).addEventListener('click', () => {
            if(getSiteFromHostname() === 'hsamuel') {
                localStorage.removeItem('HS116stored_prods_1');
            } else {
                localStorage.removeItem('EJ116stored_prods_1');
            }
            closeViewed();
            viewedTab.remove();
        });

        // on hover of tab on desktop, show the close button
        if(window.innerWidth > 1024) {
            viewedTab.addEventListener('mouseenter', () => {
                viewedTab.querySelector(`.${ID}-remove`).classList.add(`${ID}-removeShow`);
            });
        }

        pollerLite([`.${ID}_productsList-item`], () => {
            const allViewedProducts = document.querySelectorAll(`.${ID}_productsList-item`);
            for (let index = 0; index < allViewedProducts.length; index += 1) {
                const element = allViewedProducts[index];
                element.querySelector(`.${ID}_productLink`).addEventListener('click', () => {
                    events.send(`${ID} V:${VARIATION}`, 'click', 'Product in recently viewed');
                });
                
            }
        });
    }
}
