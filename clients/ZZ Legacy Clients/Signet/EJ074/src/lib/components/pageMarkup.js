/**
 * Page template
 */
import shared from "../shared";


const { ID } = shared;

export default class PageContent {
    constructor() {
        this.create();
        this.render();
    }

    create() {

        // get the spec image
        let specImage;
        const thirdImage = document.querySelectorAll(`.product-gallery__image-container img`)[2];
        if(thirdImage) {
            specImage = thirdImage.getAttribute('src');
        } else {
            specImage = document.querySelector(`.product-gallery__image-container img`).getAttribute('src');
        }
       

        // Get all the product data
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
                <div class="${ID}__row">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                        </div>
                    </div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__specs">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__specification_wrapper ${ID}__row">
                        <h3 class="${ID}__heading">Ring Specifications</h3>
                    </div>
                    <div class="${ID}__specificationImage" style="background-image:url(${specImage})"></div>
                </div>
            </div>


            <div class="${ID}__section ${ID}__fourcs">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">The Four C’s</h3>
                    <div class="${ID}__paragraph">The combination of the 4C's defines the price of our engagement rings. These specifications have been carefully selected to give your diamond the wow factor, with the best value for money.</div>
                    <div class="${ID}__innerBox"></div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__description">
                <div class="${ID}__sectionContainer">
                </div>
            </div>

            <div class="${ID}__section ${ID}__parallax"></div>

            <div class="${ID}__section ${ID}__origin">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">Diamond specialists since 1949</h3>
                    <div class="${ID}__paragraph">We pride ourselves on being the diamond specialists, so whether you're searching for a cluster engagement ring or a traditional solitaire, our exquisite collections are the perfect symbol of everlasting love and companionship.</div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__hint">
                <div class="${ID}__sectionContainer">
                <div class="${ID}__row">
                    <div class="${ID}__colRight">
                        <div class="${ID}__hintIcon"></div>
                        <h3 class="${ID}__heading">Drop a hint</h3>
                        <div class="${ID}__paragraph">Want to let them know what you like without making it obvious? Tell someone special what you’re wishing for.</div>
                        <a class="${ID}__contentLink">Drop a hint</a>
                    </div>
                    <div class="${ID}__colLeft">
                        <div class="${ID}__blockInner">
                            <div class="${ID}-blockBack">
                                <div class="${ID}__block" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/778BF4129CC0B24EEAB3B5ED5A4EAD4565E28B1CE4ACDE62E4D7E4E1BEF6EDC1/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/hintImage-1.png')"></div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__buyingGuides">
                <div class="${ID}__sectionContainer">
                </div>
            </div>

            <div class="${ID}__section ${ID}__offer">
                <div class="${ID}__sectionContainer">
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
    }
}
