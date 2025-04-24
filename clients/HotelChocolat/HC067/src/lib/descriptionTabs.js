import shared from "./shared";
import { events } from "../../../../../lib/utils";

/**
* Rebuild the product tabs on tablet/desktop
*/
const { ID, VARIATION } = shared;

export default class ProductTabs {
    constructor() {
        this.create();
        this.bindEvents();
        this.render();
    }
    
    create() {    
        const element = document.createElement('div');
        element.classList.add(`${ID}-productTabs`);
        element.classList.add(`product-tabs`);
        element.innerHTML = `
        <div class="${ID}-tab-wrap">
            ${VARIATION === '2' ? `<div class="${ID}-tab ${ID}-activeTab">Description</div>` : `<div class="${ID}-tab ${ID}-activeTab ${ID}-reviews">Reviews</div>`}
            ${VARIATION === '2' ? `` : `<div class="${ID}-tab">Description</div>`}

            <div class="${ID}-tab">Delivery</div>
            ${VARIATION === '2' ? `` : `<div class="${ID}-tab">Gifting</div>`}
        </div>
        ${VARIATION === '2' ? `<div class="${ID}-tabContent tab-content ${ID}-desc"></div>` : `<div class="${ID}-tabContent tab-content ${ID}-reviews"></div>`}
        ${VARIATION === '2' ? `` : `<div class="${ID}-tabContent tab-content ${ID}-desc"></div>`}

        <div class="${ID}-tabContent tab-content ${ID}-delivery prod-info prod-info-c"></div>
        ${VARIATION === '2' ? `` : `<div class="${ID}-tabContent tab-content ${ID}-gifting prod-info prod-info-b"></div>`}
        `;

        this.component = element; 
    }
    
    bindEvents() {
        const { component } = this;

        const tabContent= component.getElementsByClassName(`${ID}-tabContent`);
        const tab = component.getElementsByClassName(`${ID}-tab`);
        hideTabsContent(1);
    
        component.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains(`${ID}-tab`)) {
                for (let i=0; i<tab.length; i++) {
                    if (target == tab[i]) {
                        const targetName = target.textContent;
                        events.send(`${ID} varation: ${VARIATION} - Velvetiser Journey`, 'click', `tab: ${targetName}`);
                        showTabsContent(i);
                        break;
                    }
                }
            }
        });

        function hideTabsContent(a) {
            for (let i=a; i<tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add("hide");
                tab[i].classList.remove(`${ID}-activeTab`);
            }
        }

        function showTabsContent(b){
            if (tabContent[b].classList.contains('hide')) {
                hideTabsContent(0);
                tab[b].classList.add(`${ID}-activeTab`);
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }
    }
    
    render() {
        const { component } = this;
        if(VARIATION === '2') {
            document.querySelector(`.${ID}-productDetails`).appendChild(component);
        } else if (VARIATION === '1') {
            document.querySelector('.tab-target-desktop').insertAdjacentElement('beforebegin', component);
        }
        

         // move current tab content to new ones
         const reviews = document.querySelector('#tabReviews');
         const description = document.querySelector('#tabDesc');
         const ingredientContent = document.querySelector('#tabIngredients');
         const deliveryContent = document.querySelector('.prod-info.prod-info-c ul');
         const giftingContent = document.querySelector('.prod-info.prod-info-b ul');
         
         if(VARIATION !== '2') {
            if(reviews) {
                component.querySelector(`.${ID}-tabContent.${ID}-reviews`).insertAdjacentElement('afterbegin', reviews);
            }
        }

         if(description) {
            component.querySelector(`.${ID}-tabContent.${ID}-desc`).insertAdjacentElement('afterbegin', description);
         }

        /*if(ingredientContent) {
           component.querySelector(`.${ID}-tabContent.${ID}-ingredients`).insertAdjacentElement('afterbegin', ingredientContent);
        }*/

        if(deliveryContent) {
            component.querySelector(`.${ID}-tabContent.${ID}-delivery`).insertAdjacentElement('afterbegin', deliveryContent);
        }

        if(VARIATION !== '2') {
            if(giftingContent) {
                component.querySelector(`.${ID}-tabContent.${ID}-gifting`).insertAdjacentElement('afterbegin', giftingContent);
            }
        }
        
    }
}
      
 