import { events } from '../../../../../../lib/utils';
import {
    getSiteFromHostname
} from '../services';
import shared from '../shared';

const {
    ID,
    VARIATION
} = shared;

/* Create last viewed products carousel */

export default class LastProducts {
    constructor() {

        let productDataStr;
        if (VARIATION === '1') {
            if (getSiteFromHostname() === 'ernestjones') {
                productDataStr = window.localStorage.EJ089recommended_prods_1;
            } else {
                productDataStr = window.localStorage.HS089recommended_prods_1;
            }
        } else if (VARIATION === '2') {
            if (getSiteFromHostname() === 'ernestjones') {
                productDataStr = window.localStorage.EJ089recommended_cats_1;
            } else {
                productDataStr = window.localStorage.HS089recommended_cats_1;
            }
        }

        if (productDataStr) {
            this.productData = JSON.parse(productDataStr);
            if (this.productData.length) {
                // add markup for V1/V2
                if (VARIATION === '1') {
                    this.createAndRender();

                } else if (shared.VARIATION === '2') {
                    this.createAndRenderV3();
                    if (this.productData.length > 3) {
                        if (window.innerWidth >= 767 ) {
                           this.slickProducts();
                        }
                    }
                    
                }

                if (this.productData.length === 1) {
                    document.querySelector(`.${ID}-lastViewedWrapper`).classList.add(`${ID}-onlyOne`);
                }

                this.productEvents();
            }
        }
    }

    createAndRender() {
        const lastViewedproducts = document.createElement('div');
        lastViewedproducts.classList.add(`${ID}-lastViewedWrapper`);
        lastViewedproducts.innerHTML = `
        <div class="${ID}-LastViewedMobileTab"><span>Pick up where you left off</span></div>
        <div class="${ID}_LastViewedProducts-list_wrapper">
        <h3>Pick up where you left off</h3>
        <ul class="${ID}_LastViewedProducts-list">
            ${this.productData.map(data => `
            <li class="${ID}_LastViewedProducts-item">
                <a href="${data.link}">
                <div class="${ID}_LastViewedProducts-img" style="background-image:url(${data.image})"></div>
                <p class="${ID}_LastViewedProducts-name">${data.name}</p>
                </a>
                <a class="${ID}-link" href="${data.link}">Shop Now</a>
            </li>
            `).join('')}
        </ul>
        </div>`;

        if (VARIATION === '1') {
            document.body.appendChild(lastViewedproducts);
            lastViewedproducts.querySelector(`.${ID}-LastViewedMobileTab`).addEventListener('click', () => {
                if (lastViewedproducts.classList.contains(`${ID}-LastViewedMobileTab_active`)) {
                    lastViewedproducts.classList.remove(`${ID}-LastViewedMobileTab_active`);
                    events.send(`${ID} variation:${VARIATION}`, 'closed', 'last viewed tab');
                } else {
                    lastViewedproducts.classList.add(`${ID}-LastViewedMobileTab_active`);
                    events.send(`${ID} variation:${VARIATION}`, 'opened', 'last viewed tab');
                }
            });

            if(!sessionStorage.getItem(`${ID}-lastViewOpen`)){
                sessionStorage.setItem(`${ID}-lastViewOpen`, true);
                lastViewedproducts.querySelector(`.${ID}-LastViewedMobileTab`).click();
            } 
            
        }
    }

    slickProducts() {

        jQuery.getScript( "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js" )
        .done(function( s, Status ) {
            jQuery(`.${ID}_LastViewedProducts-list`).slick({
                slidesToShow: 3,
                arrows: true,
                infinite: true,
                rows: 0,
                mobileFirst: true,
                responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                        breakpoint: 300,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1
                        }
                      },
                ]

            });
        })
        .fail(function( jqxhr, settings, exception ) {
        });
    }

    createAndRenderV3() {
        const lastViewedproducts = document.createElement('div');
        lastViewedproducts.classList.add(`${ID}-lastViewedWrapper`);
        lastViewedproducts.innerHTML = `
        <div class="${ID}-LastViewedMobileTab"><span>Pick up where you left off</span></div>
        <div class="${ID}_LastViewedProducts-list_wrapper">
        <h3>Pick up where you left off</h3>
        <ul class="${ID}_LastViewedProducts-list">
            ${this.productData.map(data => `
            <li class="${ID}_LastViewedProducts-item">
                <a href="${data.link}">
                    <p class="${ID}_LastViewedProducts-name">Shop ${data.name}</p>
                </a>
            </li>
            `).join('')}
        </ul>
        </div>`;

        // if plp
        if (window.digitalData.page.pageInfo.pageType === 'PLP') {
            document.querySelector('#js-content-webnav').insertAdjacentElement('beforebegin', lastViewedproducts);
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
            const elName = element.querySelector(`.${ID}_LastViewedProducts-name`);
            element.querySelector('a').addEventListener('click', () => {
                if(VARIATION === '1') {
                    events.send(`${ID} variation: ${VARIATION}`, 'Click', `Last viewed product: ${elName}`);
                } else if (VARIATION === '2'){
                    events.send(`${ID} variation: ${VARIATION}`, 'Click', `Last viewed category: ${elName}`);
                }
            });
        }
    }
}
