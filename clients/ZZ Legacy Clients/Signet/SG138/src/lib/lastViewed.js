import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getSiteFromHostname } from './experiment';



const { ID, VARIATION } = shared;

/* Create last viewed products carousel */
export default class RecentlyViewed {
    constructor() {

        let productDataStr;
        if (getSiteFromHostname() === 'ernestjones') {
            productDataStr = window.localStorage.EJ138recommended_prods_1;
        } else {
            productDataStr = window.localStorage.HS138recommended_prods_1;
        }
       

        if (productDataStr) {
            this.productData = JSON.parse(productDataStr);
            if (this.productData.length) {
               this.createAndRender();

                if (this.productData.length <= 4) {
                    document.querySelector(`.${ID}-lastViewed`).classList.add(`${ID}-lessThanFour`);
                } 

                this.productEvents();
            }
        }
    }

    createAndRender() {
        const lastViewedproducts = document.createElement('div');
        lastViewedproducts.classList.add(`${ID}-lastViewed`);
        lastViewedproducts.innerHTML = `    
        <div class="${ID}-container">  
            <h3>You Recently Viewed</h3>
            <div class="${ID}-products">
                <ul class="${ID}-productsInner">
                    ${this.productData.map(data => `
                    <li class="${ID}-product">
                        <a href="${data.link}">
                            <div class="${ID}-productImage" style="background-image:url(${data.image})"></div>
                        </a>
                        <div class="${ID}-info">
                            <p class="${ID}-productName">${data.name}</p>
                            <a class="${ID}-link" href="${data.link}">Shop Now</a>
                        </div>              
                    </li>
                    `).join('')}
                </ul>
            </div>
        </div>`;

        // if plp
        if (window.digitalData.page.pageInfo.pageType === 'PLP') {
            document.querySelector('.product-listing__title-container').insertAdjacentElement('beforebegin', lastViewedproducts);
        }

        // if homepage
        if (window.digitalData.page.pageInfo.pageType === 'Landing') {
            const homeContent = document.querySelector('.delivery-banner');
            homeContent.insertAdjacentElement('afterend', lastViewedproducts);
        }
        
    }


    productEvents () {
        const allProducts = document.querySelectorAll(`.${ID}_LastViewedProducts-item`);
        for (let index = 0; index < allProducts.length; index += 1) {
            const element = allProducts[index];
            element.querySelector('a').addEventListener('click', () => {
               fireEvent('Clicked recently viewed product');
            });
        }
    }
}
