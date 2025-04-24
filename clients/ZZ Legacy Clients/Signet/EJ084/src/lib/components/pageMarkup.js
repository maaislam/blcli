/**
 * Page template
 */
import shared from "../shared";
import {
    getData
} from "../productData";
import { events } from "../../../../../../lib/utils";

const {
    ID
} = shared;

export default class PageContent {
    constructor() {
        this.create();
        this.render();
    }

    create() {

        const brand = window.digitalData.product[0].productInfo.brand;
        // Get all the product data
        const productSKU = window.digitalData.product[0].productInfo.masterSku;
        const productObj = getData(productSKU);

        const element = document.createElement('div');
        element.classList.add(`${ID}__pageContent`);
        element.innerHTML =
            `<div class="${ID}__productDetails ${ID}__row">
                <div class="${ID}__col-left ${ID}__mainProductSlider">
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
                    <div class="${ID}__logo" style="background-image:url(${productObj.brandLogo})"></div>
                    <h3 class="${ID}__heading">${productObj.section1Title}</h3>
                    <div class="${ID}__productParagraph">${productObj.productDescription}<div class="${ID}__textLink">Read more</div></div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__parallax" style="background-image:url(${productObj.parallax1image})"></div>

            <div class="${ID}__section ${ID}__back_front">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">${productObj.section2Title}</h3>
                    <p class="${ID}__paragraph">${productObj.section2Content}</p>
                </div>
                ${brand === 'Tissot' ? `<div class="${ID}-video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/9hTQSOR1DtI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>` : ''}
            </div>

            <div class="${ID}__section ${ID}__features">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">${productObj.featuresTitle}</h3>
                    <p class="${ID}__paragraph">${productObj.featuresContent}</p>
                </div>
                <div class="${ID}__sectionCarousel">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage1})">
                                <span class="${ID}__featureCaption">${productObj.featureImage1Caption}</span>
                            </div>
                            <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage2})">
                                <span class="${ID}__featureCaption">${productObj.featureImage2Caption}</span>
                            </div>
                            <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage3})">
                                <span class="${ID}__featureCaption">${productObj.featureImage3Caption}</span>
                            </div>
                            ${productObj.featureImage4 ? `
                            <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage4})">
                                <span class="${ID}__featureCaption">${productObj.featureImage4Caption}</span>
                            </div>` : ``}
                            ${productObj.featureImage5 ? `
                            <div class="swiper-slide ${ID}__slide" style="background-image:url(${productObj.featureImage5})">
                            <span class="${ID}__featureCaption">${productObj.featureImage5Caption}</span>
                        </div>` : ``}
                        </div>
                        <div class="swiper-button-prev ${ID}__slide_prev ${ID}__slide_arrow"></div>
                        <div class="swiper-button-next ${ID}__slide_next ${ID}__slide_arrow"></div>
                        <div class="swiper-pagination ${ID}__sliderPagination"></div>
                    </div>
                </div>
            </div>

            ${productObj.parallax2image ? `<div class="${ID}__section ${ID}__parallax" style="background-image:url(${productObj.parallax2image})"></div>` : ''}

            <div class="${ID}__section ${ID}__specs">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__specification_wrapper ${ID}__row">
                        <h3 class="${ID}__heading">Technical Specifications</h3>
                    </div>
                    <div class="${ID}__specificationImage" style="background-image:url(${productObj.specImage})"></div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__range">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">Explore the range</h3>
                    <p class="${ID}__paragraph">${productObj.rangeText}</p>
                </div>
                <div class="${ID}__sectionCarousel">
                    <div class="swiper-container">
                        <div class="swiper-wrapper"></div>
                        <div class="swiper-button-prev ${ID}__slide_prev ${ID}__slide_arrow"></div>
                        <div class="swiper-button-next ${ID}__slide_next ${ID}__slide_arrow"></div>
                        <div class="swiper-pagination ${ID}__sliderPagination"></div>
                    </div>
                </div>
            </div>

            <div class="${ID}__section ${ID}__stores">
                <div class="${ID}__sectionContainer">
                    <h3 class="${ID}__heading">Store Locations</h3>
                    <p class="${ID}__paragraph">We currently have ${productObj.storeAmount} stores that stock the ${productObj.brand} ${productObj.range}</p>
                    <div class="${ID}__storeList"></div>
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

        // read more on mobile
        if (window.innerWidth < 767) {
            const readMoreLink = document.querySelector(`.${ID}__textLink`);
            const hiddenText = document.querySelector(`.${ID}__paragraph.${ID}__moreText`);
            readMoreLink.addEventListener('click', () => {
                hiddenText.classList.add(`${ID}__showAll`);
                readMoreLink.style.display = 'none';
            });
        }


        // move existing elements
        const productInfo = document.querySelector('.detail-page__right-column');
        component.querySelector(`.${ID}__mainProductInfo`).appendChild(productInfo);


        // make the back and front container in to a slider and the features

        /*new Swiper(`.${ID}__back_front .swiper-container`, {
            direction: 'horizontal',
            loop: true,
            effect: 'fade',
            observer: true,  
            observeParents: true,
            pagination: {
                el: `.${ID}__back_front .swiper-pagination`,
            },
        });*/

        if (window.innerWidth <= 767) {
            const featureSlider = new Swiper(`.${ID}__features .swiper-container`, {
                direction: 'horizontal',
                loop: true,
                effect: 'fade',
                pagination: {
                    el: `.${ID}__features .swiper-pagination`,
                },
                navigation: {
                    nextEl: `.${ID}__features .swiper-button-next.${ID}__slide_next`,
                    prevEl: `.${ID}__features .swiper-button-prev.${ID}__slide_prev`,
                },
            });

            featureSlider.on('slideChange', function () {
                events.send(`EJ084 v${shared.VARIATION} brand: ${brand}`, 'change', 'interacted with feature slider', { sendOnce: true });
            });

        } else {

            const featureDesktop = new Swiper(`.${ID}__features .swiper-container`, {
                direction: 'horizontal',
                loop: true,
                pagination: {
                    el: `.${ID}__features .swiper-pagination`,
                },
                navigation: {
                    nextEl: `.${ID}__features .swiper-button-next.${ID}__slide_next`,
                    prevEl: `.${ID}__features .swiper-button-prev.${ID}__slide_prev`,
                },
                slidesPerView: 3,
                spaceBetween: 30,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 5
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });
            if(featureDesktop) {
                featureDesktop.on('slideChange', function () {
                    events.send(`EJ084 v${shared.VARIATION} brand: ${brand}`, 'change', 'interacted with feature slider', { sendOnce: true });
                });
            }
        }
    }
}
