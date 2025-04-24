/**
 * Page template
 */
import shared from "../shared";


const {
    ID
} = shared;

export default class PageContent {
    constructor() {
        this.create();
        this.render();
    }

    create() {

        const isCertified = () => {

            if (document.querySelector('.product-description__certified-diamond')) {
                const certText = document.querySelector('.product-description__certified-diamond').textContent;
                if (certText && (certText.indexOf('Certificated diamond') > -1)) {
                    return true;
                }
            } else {
                const hsCertText = document.querySelectorAll('.product-properties__property-text');
                for (let index = 0; index < hsCertText.length; index++) {
                    const element = hsCertText[index];
                    var pdpText = element.textContent;

                    if (pdpText && (pdpText.indexOf('Certificated diamond') > -1)) {
                        return true;
                    }
                }
            }
        }

        const isExclusive = () => {
            if (document.querySelector('.product-description__exclusive-product')) {
                const execText = document.querySelector('.product-description__exclusive-product').textContent;
                if (execText && (execText.indexOf('Exclusive') > -1)) {
                    return true;
                }
            } else {
                const productDesc = document.querySelectorAll('.product-properties__property');
                for (let index = 0; index < productDesc.length; index++) {
                    const element = productDesc[index];
                    var txtContent = element.textContent;

                    if (txtContent && (txtContent.indexOf('Exclusive') > -1)) {
                        return true;
                    }
                }
            }
        }

        // get the spec image
        let specImage;
        const thirdImage = document.querySelectorAll(`.product-gallery__image-container img`)[2];
        if (thirdImage) {
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

            <div class="${ID}__section ${ID}__description">
                <div class="${ID}__sectionContainer">
                </div>
            </div>

            ${isCertified() || isExclusive() ? `
            <div class="${ID}__section ${ID}__certificated">
                <div class="${ID}__sectionContainer">
                    ${isCertified() ? `
                        <div class="${ID}__blockContent">
                            <div class="${ID}__colLeft">
                                <div class="${ID}__blockInner">
                                    <div class="${ID}-blockBack">
                                        <div class="${ID}__block" style="background-image:url('https://www.ernestjones.co.uk/content-root/engagement-ring-buyers-guide.cdo/images/201901021400/engagement-ring-4Cs-v2.jpg')"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="${ID}__colRight">
                                <h3 class="${ID}__heading">Certificated</h3>
                                <div class="${ID}__paragraph">Independently certificated by internationally recognised grading laboratories.</div>
                            </div>
                        </div>
                    ` : '' }
                    ${isExclusive() ? `
                        <div class="${ID}__blockContent ${ID}__exclusive">
                            <div class="${ID}__colLeft">
                                <div class="${ID}__blockInner">
                                    <div class="${ID}-blockBack">
                                        <div class="${ID}__block" style="background-image:url('https://www.ernestjones.co.uk/content-root/engagement-ring-buyers-guide.cdo/images/201901021400/engagement-ring-branded-v2.jpg')"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="${ID}__colRight">
                                <h3 class="${ID}__heading">Exclusive</h3>
                                <div class="${ID}__paragraph">Our bridal range includes prestige and luxurious diamond brands that you won't find anywhere else. Each of these brands offers a unique take on beautiful engagement rings</div>
                            </div>
                        </div>` : ``}
                </div>
            </div>`
            : ''}

            <div class="${ID}__section ${ID}__fourcs">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">The Four C’s</h3>
                    <div class="${ID}__paragraph">The combination of the 4C's defines the price of our engagement rings. These specifications have been carefully selected to give your diamond the wow factor, with the best value for money.</div>
                    <div class="${ID}__innerBox"></div>
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

            <div class="${ID}__section ${ID}__offer">
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
            `;
        this.component = element;
    }

    render() {
        const {
            component
        } = this;
        document.querySelector('#access-content').insertAdjacentElement('afterbegin', component);

        // move existing elements
        const productInfo = document.querySelector('.detail-page__right-column');
        component.querySelector(`.${ID}__mainProductInfo`).appendChild(productInfo);
    }
}
