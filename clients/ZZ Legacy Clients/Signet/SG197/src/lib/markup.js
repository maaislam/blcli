import shared from "../../../../../core-files/shared"
import { pollerLite } from "../../../../../lib/utils";
import { productData } from "./data";
import { closeCarousel, getWarranty, openCarousel, SwitchTab } from "./helpers";


const { ID, VARIATION } = shared;


export default class Markup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

    const product = window.digitalData.product[0];
    const brand = product.productInfo.brand;
    const productName = product.productInfo.productName;
    const sku = product.productInfo.masterSku;
    const prodData = productData[sku];
    const deliveryDate = document.querySelector('.product-delivery__text .product-delivery__text-span');


      const element = document.createElement('div');
      element.classList.add(`${ID}-pdp`);
      element.innerHTML = `
            <div class="${ID}-offer-banner"><p><b>Complimentary gift</b> - receive a free watch winder with this watch.</p><a class="${ID}__textLink" href="https://www.ernestjones.co.uk/terms/#WolfWinders" target="_blank">Learn more</a></div>
            <section class="${ID}-top">
                <div class="${ID}__row">
                <div class="${ID}__col-left ${ID}-mainProductSlider">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                        </div>
                    </div>
                    <div class="${ID}-swiperNext swiper-button-next"></div>
                    <div class="${ID}-swiperPrev swiper-button-prev"></div>
                </div>
                <div class="${ID}__col-right ${ID}__mainProductInfo">
                    <div class="${ID}-product-name">
                        <h4 class="alternate">${brand}</h4>
                        <h4>${productName.replace(/(Omega|Breitling|Tag\sHeuer)/g, '')}</h4>
                    </div>
                    <div class="${ID}-reviews">
                        <div class="${ID}-usp" usp-attr="reviews"><div class="${ID}-reviewCount"></div></a>
                    </div>
                    <div class="${ID}-small-description">
                        <p>${prodData.introCopy}</p>
                    </div>
                    <div class="${ID}-productPrice">
                        <div class="${ID}-price"></div>
                        <div class="${ID}-finance">
                            <div class="${ID}__financeBox">
                                <span>0% APR finance available <span>from <b>£x.xx</b> p/m</span></span>
                                <div class="${ID}__textLink">Learn More</div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="${ID}-stockCheck"></div>
                    <div class="${ID}-uspDetails">
                        <div class="${ID}-usp ${ID}-returns" usp-attr="deliveryReturns"><span></span><p>Free returns & exchanges.</p><div class="${ID}__textLink">Learn more</div></div>
                        <div class="${ID}-usp ${ID}-warranty"><span></span><p>${getWarranty()} year warranty.</p></div>
                        <div class="${ID}-usp ${ID}-delivery" usp-attr="deliveryReturns"><span></span><p>Free express delivery.</p><div class="${ID}__textLink">Delivery info</div></div>
                        <div class="${ID}-usp ${ID}-clickCollect" usp-attr="clickcollect"><span></span><p>Free click & collect.</p><div class="${ID}__textLink">Learn more</div></div>
                    </div>
                </div>
            </div>
            </section>
            <section class="${ID}-features">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}-circles">
                        <div class="${ID}-circle" slide-target="1">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureOneImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureOneTitle}</p>
                        </div>
                        <div class="${ID}-circle" slide-target="2">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureTwoImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureTwoTitle}</p>
                        </div>
                        <div class="${ID}-circle" slide-target="3">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureThreeImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureThreeTitle}</p>
                        </div>
                        ${prodData.featureFourTitle ? `
                        <div class="${ID}-circle" slide-target="4">
                            <div class="${ID}-icon" style="background-image:url(${prodData.featureFourImg})">
                                <div class="${ID}-loader">
                                    <svg viewbox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40"/>
                                    </svg>
                                </div>
                            </div>
                            <p>${prodData.featureFourTitle}</p>
                        </div>`: ''}
                    </div>
                    <div class="${ID}-carouselModal">
                        <div class="${ID}-close"></div>
                        <div class="${ID}-modalInner ${ID}-swiper">
                            <div class="${ID}-topBar">
                                <div class="${ID}-progessPagination swiper-pagination"></div>
                                <div class="${ID}-socialTitle"></div>
                            </div>
                            <div class="swiper-wrapper">
                                <div class="${ID}-slide swiper-slide" slide-no="1">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureOneTitle}</h2>
                                        <p>${prodData.featureOneContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                    <div class="${ID}-imgbg" style="background-image:url(${prodData.featureOneImg})"></div>
                                    </div>
                                </div>
                                <div class="${ID}-slide swiper-slide" slide-no="2">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureTwoTitle}</h2>
                                        <p>${prodData.featureTwoContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                        <div class="${ID}-imgbg" style="background-image:url(${prodData.featureTwoImg})"></div>
                                    </div>
                                </div>
                                <div class="${ID}-slide swiper-slide" slide-no="3">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureThreeTitle}</h2>
                                        <p>${prodData.featureThreeContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                    <div class="${ID}-imgbg" style="background-image:url(${prodData.featureThreeImg})"></div>
                                    </div>
                                </div>
                                ${prodData.featureFourTitle ? `
                                <div class="${ID}-slide swiper-slide" slide-no="4">
                                    <div class="${ID}-textBlock">
                                        <h2>${prodData.featureFourTitle}</h2>
                                        <p>${prodData.featureFourContent}</p>
                                    </div>
                                    <div class="${ID}-image">
                                        <div class="${ID}-imgbg" style="background-image:url(${prodData.featureFourImg})"></div>
                                    </div>
                                </div>
                                `:''}
                            </div>
                            <div class="${ID}-swiperNext swiper-button-next"></div>
                            <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        </div>
                    </div>
                </div>
            
            </section>

            ${VARIATION === "1" ? `
            <section class="${ID}-detail-blocks">
                <div class="${ID}__row">
                    <div class="${ID}-block">
                        <div class="${ID}-image" style="background-image:url(${prodData.detailsImg})"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>Product details</h2>
                                <p>Product number: ${Object.keys(productData)[0]}</p>
                                <p>${prodData.detailsContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="${ID}__row">
                    <div class="${ID}-block">
                        <div class="${ID}-image" style="background-image:url(${prodData.brandImg})"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>${brand}</h2>
                                <p>${prodData.brandContent}</p>
                            </div>
                        </div>
                    </div>
                </div>                          
            </section>` : ''}
            <section class="${ID}-specifications ${prodData.isHorizontal === 'n' ? 'vertical' : 'horizontal'}">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__headingText">
                        <h2>Watch specifications</h2>
                        <p>${prodData.specsContent}</p>
                    </div>
                    
                    <div class="${ID}__row">
                        <div class="${ID}-specImage" style="background-image:url(${prodData.specsImg})">
                            <div class="${ID}-specBadge" tab-target="movement">Movement</div>
                            <div class="${ID}-specBadge" tab-target="dial">Dial</div> 
                            <div class="${ID}-specBadge" tab-target="strap">Strap</div> 
                        </div>
                        <div class="${ID}-specs">
                            <div class="${ID}-tabs">
                                <div class="${ID}-tab active" tab-target="model"><span>Model</span></div>
                                <div class="${ID}-tab" tab-target="movement"><span>Movement</span></div>
                                <div class="${ID}-tab" tab-target="dial"><span>Dial</span></div>
                                <div class="${ID}-tab" tab-target="strap"><span>Strap</span></div>
                            </div>
                            <div class="${ID}-tabContents">
                                <div class="${ID}-tabContent active" data="model"></div>
                                <div class="${ID}-tabContent" data="movement"></div>
                                <div class="${ID}-tabContent" data="dial"></div>
                                <div class="${ID}-tabContent" data="strap"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="${ID}-concierge">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__row">
                        <div class="${ID}-image"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>Concierge service</h2>
                                <p>From finding the right watch for your wrist size to selecting the perfect gift for a special occasion, our concierges are here to provide expert advice and outstanding customer service. Whether you're looking for information on the latest watch trends or need help choosing the right watch for your lifestyle, our concierge service is here to help.</p>
                                <div class="${ID}-ctas">
                                    <a href="https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo?icid=ej-fn-appointment" class="${ID}__button primary">Book now</a>
                                    <a href="https://customer.bookingbug.com/?client=ernest_jones&service=48321&company=37397" class="${ID}__button secondary">Talk to an expert</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="${ID}-fullwidth-banner" style="background-image:url(${prodData.fullWidthBanner})">
            </section>
            ${VARIATION === "1" && prodData.packageImg ? `
            <section class="${ID}-packaging">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__row">
                        <div class="${ID}-image"style="background-image:url(${prodData.packageImg})"></div>
                        <div class="${ID}-textBlock">
                            <div class="inner">
                                <h2>Bespoke packaging</h2>
                                <p>${prodData.packageContent}</p>
                                <a href="#" class="${ID}__button secondary">Learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>` : ''}
            ${VARIATION === "1" ? `
            <section class="${ID}-adjustment">
                <div class="${ID}__sectionContainer">
                    <div class="${ID}__row">
                        <div class="${ID}-image"></div>
                        <div class="${ID}-textBlock">
                             <div class="inner">
                                <h2>Complementary adjustment</h2>
                                <p>At Ernest Jones, we appreciate that a watch is more than just a timepiece, it is an extension of your personal style. That's why we provide a complementary adjustment service on all of our watches.</p>
                                <a href="https://www.ernestjones.co.uk/webstore/store-appointment-booking.cdo" class="${ID}__button secondary">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>` : ''}
            <section class="${ID}-recommendations">
                <div class="${ID}__sectionContainer">
                    <h2>More like this</h2>
                    <div class="${ID}-recProducts ${ID}-swiper swiper">
                        <div class="swiper-wrapper"></div>
                        <div class="${ID}-swiperNext swiper-button-next"></div>
                        <div class="${ID}-swiperPrev swiper-button-prev"></div>
                        <div class="${ID}-swiperScroll swiper-scrollbar"></div>
                     </div>
                </div>
            </section>
            <div class="${ID}-overlay"></div>
            <div class="${ID}-slideOutTab">
                <div class="${ID}-close"></div>
                <div class="${ID}-inner deliveryReturns">
                    <h2 class="alternate">Delivery & Returns</h2>
                    <div class="${ID}-content">
                        <h3>Delivery</h3>
                        <p>${deliveryDate.innerText}</p>
                        <div class="${ID}-deliveryCharges">
                            <p>Free Standard delivery - we aim to deliver within 2-5 working days, Monday to Saturday.</p>
                            <p>Express delivery - Free on orders over £100 or £5. Order by 7pm Monday - Friday for delivery the following day.</p>
                        </div>
                    </div>
                    <div class="${ID}-content">
                        <h3>Returns</h3>
                        <p>If you’ve changed your mind about keeping your purchase, please return it in its original condition we’ll exchange or refund it.</p>
                        <p>You can return items to us by post free of charge within 30 days via Royal Mail and you will be refunded to the payment method you used to place the order.</p>
                    </div>
                    <a href="https://www.ernestjones.co.uk/delivery-information/?icid=ej-fn-ess-delivery" class="${ID}__button secondary">More information</a>
                </div>
                <div class="${ID}-inner clickcollect">
                    <h2 class="alternate">Click & collect</h2>
                    <div class="${ID}-content">
                        <h3>Free Click & collect</h3>
                        <p>We offer free click & collect to stores across the UK (excludes stores in Eire or the Channel Islands). Delivery times vary depending on the store you select.</p>
                        <p>You will be provided with estimated delivery dates for stores near you when you select your delivery option in checkout. In general, your order will be ready for collection between 4 and 8 working days. We will email you when your order has been processed and again when your order has been despatched ready for collection.</p>
                    </div>
                    <a href="https://www.ernestjones.co.uk/delivery-information/" class="${ID}__button secondary">More information</a>
                </div>
                <div class="${ID}-inner reviews">
                    <h2 class="alternate">Reviews</h2>
                    <div class="${ID}-content"></div>
                </div>
            </div>

      `;
      this.component = element;


      // Move existing elements
       //const mainDetails = document.querySelector('.detail-page__right-column');
        //const form = document.querySelector('#basketForm');
        element.querySelector(`.${ID}-productPrice`).insertAdjacentElement('afterend', document.querySelector('#basketForm'));
 
        element.querySelector(`.${ID}-price`).innerHTML = document.querySelector('.detail-page__right-column .product-price').innerHTML;
    
       // element.querySelector(`.${ID}-productPrice`).insertAdjacentElement('afterend',  mainDetails.querySelector('.product-buy-now'));
    

    }
  
    bindEvents() {
      const { component } = this;


      // Reviews
        const reviewNo = window.digitalData.product[0].productInfo.ratingCount;
        const reviewStars = document.querySelector('.product-customer-rating-summary');
        if(reviewStars && reviewNo) {
            component.querySelector(`.${ID}-reviewCount`).innerHTML = document.querySelector('#js-link-reviews').innerHTML;
            component.querySelector('.product-customer-rating-summary__text').textContent = `(${reviewNo})`;
        }  

      if(document.querySelector('#js-reviews-data')) {
        component.querySelector(`.${ID}-inner.reviews`).appendChild(document.querySelector('#js-reviews-data').parentNode);
      }

      // Finance
      pollerLite(['finance-options'], () => {
        const ifcButton =  document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button');
        const financePrice = document.querySelector('finance-options').shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);

        document.querySelector('finance-options').shadowRoot.querySelector('.finance-options').style="background-color: none; padding: 0px;";
        document.querySelector('finance-options').shadowRoot.querySelector('.finance-options > p').style="display: none";
        document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').style="display: none";
        
        component.querySelector(`.${ID}__financeBox b`).textContent = financePrice[0];

        if(component.querySelector(`.${ID}__financeBox .${ID}__textLink`)) {
            document.body.appendChild(document.querySelector('finance-options'));
            component.querySelector(`.${ID}__financeBox .${ID}__textLink`).addEventListener('click', () => {
                ifcButton.click();
            });
        }
      });
      pollerLite(['.tangiblee-button'], () => {
        component.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector('.tangiblee-button'));
        document.querySelector('.tangiblee-button').removeAttribute('style');
        document.querySelector('.tangiblee-button span').removeAttribute('style');
      });

      // Move similar
      pollerLite(['.product-gallery__syte.js-syte-functionality'], () => {
        component.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector('.product-gallery__syte.js-syte-functionality'));
      });

      // on click of each circle
      const allCircles = component.querySelectorAll(`.${ID}-circle`);
      if(allCircles) {
        for (let index = 0; index < allCircles.length; index++) {
            const element = allCircles[index];
            element.addEventListener('click', (e) => {
                const elNo = element.getAttribute('slide-target');
                openCarousel(elNo, e.currentTarget);
            });
        }
    }

      if(component.querySelector(`.${ID}-carouselModal .${ID}-close`)) {
        component.querySelector(`.${ID}-carouselModal .${ID}-close`).addEventListener('click', () => {
            closeCarousel();
        });
        }

      // hide warranty banner
      pollerLite(['div[style="padding-bottom: 10px; padding-top: 10px;"]'], () => {
        document.querySelector('div[style="padding-bottom: 10px; padding-top: 10px;"]').style="display: none;";
      });
      

      // Tabs
      const tabs = component.querySelectorAll(`.${ID}-tab`);
        if(tabs) {
            for (let index = 0; index < tabs.length; index += 1) {
            const element = tabs[index];

            element.addEventListener('click', (e) => {
                const matchingTab = e.currentTarget.getAttribute('tab-target');
                SwitchTab(e.currentTarget, document.querySelector(`.${ID}-tabContent[data="${matchingTab}"]`));
            }); 
            }
        }

      
      // Spec badges
      const specBadges = component.querySelectorAll(`.${ID}-specBadge`);
      if(specBadges) {
        for (let index = 0; index < specBadges.length; index += 1) {
            const element = specBadges[index];

            element.addEventListener('click', (e) => {
                const matchingTab = e.currentTarget.getAttribute('tab-target');
                SwitchTab(e.currentTarget, document.querySelector(`.${ID}-tabContent[data="${matchingTab}"]`));
            }); 
        }
    }


    }
  
    render() {
      const { component } = this;
      document.querySelector('#access-content').insertAdjacentElement('beforebegin', component);
    }
  }