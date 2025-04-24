import shared from "../../shared";

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
        if(shared.VARIATION === '1') {
            element.innerHTML = `
            <div class="${ID}-tab-wrap">
                <div class="${ID}-tab ${ID}-activeTab ${ID}-desc">Product Description</div>
                <div class="${ID}-tab">Specifications</div>
                <div class="${ID}-tab ${ID}-delivery">Delivery & Returns</div>
                <div class="${ID}-tab ${ID}-help"><a target="_blank" href="https://www.hsamuel.co.uk/help/">Help Center<span></span></a></div>
                <div class="${ID}-tab_slider"></div>
            </div>
            <div class="${ID}-tabContent tab-content ${ID}-desc"></div>
            <div class="${ID}-tabContent tab-content ${ID}-specs"></div>
            <div class="${ID}-tabContent tab-content ${ID}-delivery"></div>
            `;
        }

        else if(shared.VARIATION === '2') {
            element.innerHTML = `
            <div class="${ID}-tab-wrap">
                <div class="${ID}-tab ${ID}-activeTab ">Specifications</div>
                <div class="${ID}-tab ${ID}-desc">Product Description</div>
                <div class="${ID}-tab ${ID}-delivery">Delivery & Returns</div>
                <div class="${ID}-tab ${ID}-help"><a target="_blank" href="https://www.hsamuel.co.uk/help/">Help Center<span></span></a></div>
                <div class="${ID}-tab_slider"></div>
            </div>
            <div class="${ID}-tabContent tab-content ${ID}-specs"></div>
            <div class="${ID}-tabContent tab-content ${ID}-desc"></div>
            <div class="${ID}-tabContent tab-content ${ID}-delivery"></div>
            `;
        }

        this.component = element; 
    }
    
    bindEvents() {
        const { component } = this;

        const tabContent= component.getElementsByClassName(`${ID}-tabContent`);
        const tab = component.getElementsByClassName(`${ID}-tab`);
        hideTabsContent(1);
    
        component.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains(`${ID}-tab`) && !target.classList.contains(`${ID}-help`)) {
                for (let i=0; i<tab.length; i++) {
                    if (target == tab[i]) {
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
        document.querySelector(`.${ID}__section.${ID}__description .${ID}__sectionContainer`).appendChild(component);

         // move current tab content to new ones
         const description = document.querySelector('.product-description-container');
         const specsContent = document.querySelector('.product-accordion-item__content .product-specification');
         const deliveryContent = document.querySelector('.product-accordion-item__content .product-delivery');
         
         
         if(description) {
            component.querySelector(`.${ID}-tabContent.${ID}-desc`).insertAdjacentElement('afterbegin', description);
         }

         if(specsContent) {
            component.querySelector(`.${ID}-tabContent.${ID}-specs`).insertAdjacentElement('afterbegin', specsContent);
         }

        if(deliveryContent) {
           component.querySelector(`.${ID}-tabContent.${ID}-delivery`).insertAdjacentElement('afterbegin', deliveryContent);
        } else {
            component.querySelector(`.${ID}-tab.${ID}-delivery`).style.display = 'none';
        }
        
    }
}
      
 