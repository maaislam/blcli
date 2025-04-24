/**
 * Page template
 */
import productCarousel from "./components/aboveFold/productCarousel";
import shared from "./shared";


const { ID } = shared;

export default class PageMarkup {
    constructor() {
        this.create();
        this.render();
    }

    create() {

    
        const element = document.createElement('div');
        element.classList.add(`${ID}__pageContent`);
        element.innerHTML =
            `<div class="${ID}__productDetails ${ID}__row">
                <div class="${ID}__col-left ${ID}__mainProductSlider">
                    <div class="${ID}__zoomIcon"></div>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                        </div>
                        <div class="swiper-pagination ${ID}__sliderPagination"></div>
                    </div>
                    <div class="${ID}__swiperArrow swiper-button-prev"></div>
                    <div class="${ID}__swiperArrow swiper-button-next"></div>
                </div>
                <div class="${ID}__col-right ${ID}__mainProductInfo"></div>
            </div>
            
            <div class="${ID}__usps">
                <div class="${ID}__sectionContainer">
                </div>
            </div>

            <div class="${ID}__section ${ID}__description">
                <div class="${ID}__sectionContainer">
                </div>
            </div>

            <div class="${ID}__section ${ID}__otherWatches">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">More Like This</h3>
                    <div class="${ID}__carousel swiper-container">
                        <div class="swiper-wrapper">
                        </div>
                    </div>
                    <div class="${ID}__swiperArrow swiper-button-prev"></div>
                        <div class="${ID}__swiperArrow swiper-button-next"></div>
                </div>
            </div>

           
            `;
        this.component = element;
    }

    render() {
        const { component } = this;
        document.querySelector('#access-content').insertAdjacentElement('afterbegin', component);

        // move existing elements
        const productInfo = document.querySelector('.detail-page__right-column');
        component.querySelector(`.${ID}__mainProductInfo`).appendChild(productInfo);

        // move accordion on mobile
        const productDescription = document.querySelector('.detail-page__product-accordion-container');
        document.querySelector(`.${ID}__description .${ID}__sectionContainer`).appendChild(productDescription);
    }
}
