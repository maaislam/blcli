import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared"
import { pollerLite } from "../../../../../lib/utils";
import { closeSlideTab, keyFeatures, openSlideTab, scrollToElement, stockRestyle, switchQuestion } from "./helpers";
//import { pollerLite } from "../../../../../lib/utils";
//import { closeCarousel, getWarranty, openCarousel, SwitchTab } from "./helpers";


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
      const deliveryDate = document.querySelector('#js-update-delivery');
      const productDesc = document.querySelector('.product-description');
      const currentPrice = window.digitalData.product[0].price.currentPrice;
      const wasPrice = document.querySelector(".product-price--history s");
      const introDescription = document.querySelectorAll('.product-description p')[1].textContent.match(/^(.*?)[.?!]\s/)[0];

      const firstImage = document.querySelector('.product-gallery__image-container img').getAttribute('src');


      const features = keyFeatures();

      const element = document.createElement('div');
      element.classList.add(`${ID}-pdp`);
      element.innerHTML = `
        <section class="${ID}-top">
          <div class="${ID}__sectionContainer">
            <div class="${ID}__row">
            <div class="${ID}__col-left ${ID}-mainProductSlider">
                <div class="swiper-container">
                    <div class="swiper-wrapper"></div>
                </div>
                <div class="${ID}-swiperNext swiper-button-next"></div>
                <div class="${ID}-swiperPrev swiper-button-prev"></div>
                <div class="${ID}-swiperPagination swiper-pagination"></div>
            </div>
            <div class="${ID}__col-right ${ID}__mainProductInfo">
                <div class="${ID}-product-name">
                    <h4 class="alternate">${brand ? brand : 'H.Samuel Collection'}</h4>
                    <h4>${productName.replace(/(Forever Diamond|Perfect Fit|Tag\sHeuer)/g, '')}</h4>
                </div>
                <div class="${ID}-reviews">
                    <div class="${ID}-usp" usp-attr="reviews"><div class="${ID}-reviewCount"></div></div>
                </div>
                <div class="${ID}-productIntro">
                    <p>${introDescription}</p>
                </div>
                <div class="${ID}-productPrice">
                ${
                  document.querySelector(".product-price-history")
                    ? `<span class="${ID}-nowPrice">£${currentPrice}</span>
                      <span class="${ID}-wasPrice">${wasPrice.textContent}</span>`
                    : `<span class="${ID}-normalPrice">£${currentPrice}</span>`
                }
                </div>
                <div class="${ID}-finance">
                    <div class="${ID}__financeBox">
                        <span>0% APR finance available <span>from <b>£x.xx</b> p/m</span></span>
                        <div class="${ID}__textLink">View finance options</div>
                    </div>
                </div>
                
                <div class="${ID}-stockCheck">
                  <div class="${ID}-usp ${ID}-stock" usp-attr="stock"><span></span>Check store stock</div>
                </div>
                <div class="${ID}-usps">
                    <div class="${ID}-usp ${ID}-returns" usp-attr="deliveryReturns"><span></span><p>Free <div class="${ID}__textLink">returns & exchanges.</div></p></div>
                    <div class="${ID}-usp ${ID}-resize"><span></span><p>Free in-store ring resizing.</p></div>
                    <div class="${ID}-usp ${ID}-delivery" usp-attr="deliveryReturns"><span></span><p>Discreet packaging.</p><div class="${ID}__textLink">Delivery info</div></div>
                    <div class="${ID}-usp ${ID}-clickCollect" usp-attr="clickcollect"><span></span><p>Free click & collect.</p><div class="${ID}__textLink">Learn more</div></div>
                </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="${ID}-detail">
        <div class="${ID}__sectionContainer">
          <div class="${ID}__row">
                  <div class="${ID}__col-left">
                    <div class="${ID}-image" style="background-image:url(${firstImage})"></div>
                  </div>
                  <div class="${ID}-block ${ID}__col-right">
                  <div tab-attr="proddetail" class="tab tab-active">
                   <h2>Product details</h2>
                    <div class="${ID}-content">
                      
                        <p>Product number: ${sku}</p>
                        <p>${productDesc.innerHTML}</p>
                        <div class="${ID}-keyFeatures">
                        ${features.map(
                          (item) =>
                            `<div class="${ID}-feature">
                              <span></span><p>${item}</p>
                            </div>`
                        ).join('')}
               
                      </div>
                    </div>
                  </div>
                  <div tab-attr="specs" class="tab">
                    <h2>Specifications</h2>
                    <div class="${ID}-content">
                    </div>
                  </div>
              </div>
          </div>    
        </div>                   
      </section>

      <section class="${ID}-appointment">
          <div class="${ID}__sectionContainer">
              <div class="${ID}__row">
                  <div class="${ID}-image"></div>
                  <div class="${ID}-textBlock">
                      <div class="inner">
                          <h2>Personal appointment</h2>
                          <p>Our experts can help you find the ring that's right for you and your budget. We'll work with you to find a style that fits your unique personality, and we'll provide expert advice on the best way to care for your new ring. Schedule an appointment today and let us help you begin this exciting new chapter in your life.</p>
                          <div class="${ID}-ctas">
                              <a href="https://www.hsamuel.co.uk/webstore/store-appointment-booking.cdo" class="${ID}__button primary">Book now</a>
                              <a href="https://www.hsamuel.co.uk/webstore/content/live-chat/" class="${ID}__button secondary">Talk to an expert</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section class="${ID}-faqs">
        <div class="${ID}__sectionContainer">
          <div class="${ID}-textBlock">
            <div class="inner">
                <h2>Help getting started</h2>
                <p>All your questions answered</p>
              </div>
            </div>
            <div class="${ID}-questions-container">
                <div class="${ID}-answersBlock">
                  <div class="${ID}-answer fit active">
                      <h2>What if it doesn't fit?</h2>
                      <p>At H.Samuel, we offer ring resizing, adjustments and free exchanges so you have peace of mind if the ring doesn't fit. Simply pop in to an H.Samuel store or book an appointment with us.</p>
                      <a class="${ID}__textLink" target="_blank" href="https://www.hsamuel.co.uk/webstore/store-appointment-booking.cdo">Book appointment</a>
                  </div>
                  <div class="${ID}-answer deposit">
                    <h2>Do I have to pay a deposit?</h2>
                    <p>If you choose to pay with out Interest Free credit options, a 10% deposit is required with purchase.</p>
                  </div>
                  <div class="${ID}-answer size">
                    <h2>How do I find out their size?</h2>
                    <p>There a variety of different ways to find out your partners ring size without them knowing. Read our guide to find out more</p>
                    <a class="${ID}__textLink" target="_blank" href="https://www.hsamuel.co.uk/webstore/blog/find-your-partners-ring-size-without-them-knowing/">Ring size guide</a>
                  </div>
                  <div class="${ID}-answer payment">
                    <h2>What are my payment options?</h2>
                    <p>Buying an engagement ring can be a considerable purchase. At H.Samuel, you don't necessarily have to fork out the full cost all in one go; we offer interest-free credit for up to three years, so you can spread the cost in much more manageable chunks.</p>
                  </div>
                  <div class="${ID}-answer engraved">
                    <h2>When will my ring arrive?</h2>
                    <p>We have several delivery options available. Standard delivery is free on orders over £49 and your item will arrive within 3-6 days. If you’re in more of a hurry, you can have your ring delivered the next day using our express service. This is available for £4.95, or comes free on orders over £500.</p>
                  </div>
                </div>
                <div class="${ID}-questions">
                      <div class="${ID}-question active" question-data="fit">What if it doesn't fit?</div>
                      <div class="${ID}-question" question-data="deposit">Do I have to pay a deposit?</div>
                      <div class="${ID}-question" question-data="size">How do I find out their size?</div>
                      <div class="${ID}-question" question-data="payment">What are my payment options?</div>
                      <div class="${ID}-question" question-data="engraved">When will my ring arrive?</div>
                      <a href="https://www.hsamuel.co.uk/webstore/content/live-chat/" class="${ID}__button secondary">Ask a question</a>
                </div>
            </div>
        </div>
      </section>

      <section class="${ID}-quote">
        <div class="${ID}__sectionContainer">
          <div class="${ID}__row">
           <div class="${ID}__col-left">
            <div class="${ID}-textBlock">
              <div class="inner">
                <h2>Why buy from H.Samuel</h2>
                <p>At H.Samuel, we understand that an engagement ring is so much more than just a piece of jewellery. It is a symbol of love and commitment, and it should be perfect for the person who is wearing it. That's why we offer a wide range of engagement rings to suit every style, budget, and need.</p>
              </div>
            </div>
          </div>
          <div class="${ID}-review ${ID}__col-right">
              <h4>I had a fantastic experience from start to finish. Buying an engagement ring online couldn't have been easier plus I received it the next day. Excellent service!</h4>
              <span>- John</span>
          </div>
          </div>
          </div>
      </section>

      ${VARIATION === '1' ? `
      <section class="${ID}-diamondGuide">
        <div class="${ID}__sectionContainer">
          <div class="${ID}-textBlock">
            <div class="inner">
              <h2>The diamond guide</h2>
              <p>Finding the perfect ring can be a daunting task however if you're not sure where to begin, a good place to start is with the "4Cs." The "Four Cs" of diamonds stand for Cut, Clarity, Color, and Carat</p>
            </div>
          </div>
          <div class="${ID}-guideCarousel">
            <div class="swiper-wrapper"></div>
            <div class="${ID}-swiperNext swiper-button-next"></div>
            <div class="${ID}-swiperPrev swiper-button-prev"></div>
            <div class="${ID}-swiperPagination swiper-pagination"></div>
          </div>
        </div>
      </section>
      ` : ''}

      ${VARIATION === '1' ? `
      <section class="${ID}-articles">
          <div class="${ID}__sectionContainer">
              <h2>The engagement edit</h2>
              <div class="${ID}-articlesContainer">
                  <div class="${ID}-article">
                      <div class="${ID}-articleImage" style="background-image:url(https://cdn.media.amplience.net/i/hsamuel/HS2210W08_AssetsResized_1342x1050_2?w=671&fmt=webp)"></div>
                      <div class="${ID}-articleText">
                          <h3>A guide to buying an engagement ring</h3>
                          <p class="art-mobile-text">Everything you need to know about buying an engagement ring.</p>
                          <p class="art-desktop-text">Buying an engagement ring and gearing up for an unforgettable proposal is an exciting but challenging time – so we’re here to give you a helping hand.</p>
                          <a href="https://www.hsamuel.co.uk/webstore/blog/Everything-You-Need-to-Know-About-Buying-an-Engagement-Ring/?icid=hs-ep-engagement-rings-blog" class="${ID}__button secondary">Read more</a>
                      </div>
                  </div>
                  <div class="${ID}-article">
                  <div class="${ID}-articleImage" style="background-image:url(https://cdn.media.amplience.net/i/hsamuel/1000x1000_ListPage_HS2111B09?w=1000&fmt=webp)"></div>
                      <div class="${ID}-articleText">
                          <h3>Top 5 proposal ideas</h3>
                          <p class="art-mobile-text">We’ve scoured the internet for the best ways to get it right.</p>
                          <p class="art-desktop-text">Popping the question is a big deal. So, as your bridal bestie, we’ve scoured the internet for the best ways to do it and get it right.</p>
                          <a href="https://www.hsamuel.co.uk/webstore/blog/top-five-proposal-ideas/" class="${ID}__button secondary">Read more</a>
                      </div>
                  </div>
              </div>
          </div>
      </section>   
      ` : ''}
      <div class="${ID}-overlay"></div>
      <div class="${ID}-slideOutTab">
          <div class="${ID}-close"></div>
          <div class="${ID}-inner deliveryReturns">
              <h2 class="alternate">Delivery & Returns</h2>
              <div class="${ID}-content">
                  <h3>Delivery</h3>
                  <p>Get it by <b>${deliveryDate.innerText}</b></p>
                  <div class="${ID}-deliveryCharges">
                      <p>Free Standard delivery - Free on orders over £40 or £1.99. We aim to deliver within 2-5 working days, Monday to Saturday.</p>
                      <p>Express delivery - Free on orders over £500 or £4.95. Order by 6pm Monday - Friday for delivery the following day.</p>
                  </div>
              </div>
              <div class="${ID}-content">
                  <h3>Returns</h3>
                  <p>If you’ve changed your mind about keeping your purchase, please return it in its original condition we’ll exchange or refund it.</p>
                  <p>You can return items to us by post free of charge within 30 days via Royal Mail and you will be refunded to the payment method you used to place the order.</p>
              </div>
              <a href="https://www.hsamuel.co.uk/delivery/" class="${ID}__button secondary">Delivery information</a>
          </div>
          <div class="${ID}-inner clickcollect">
              <h2 class="alternate">Click & collect</h2>
              <div class="${ID}-content">
                  <h3>Free Click & collect</h3>
                  <p>We offer free click & collect to stores across the UK (excludes stores in Eire or the Channel Islands). Delivery times vary depending on the store you select.</p>
                  <p>You will be provided with estimated delivery dates for stores near you when you select your delivery option in checkout. In general, your order will be ready for collection between 4 and 8 working days. We will email you when your order has been processed and again when your order has been despatched ready for collection.</p>
              </div>
              <a href="https://www.hsamuel.co.uk/delivery/" class="${ID}__button secondary">More information</a>
          </div>
          <div class="${ID}-inner stock">
              <h2 class="alternate">Click & collect</h2>
              <div class="${ID}-content">
                  <h3>Check store stock</h3>
              </div>
          </div>
          <div class="${ID}-inner reviews">
              <h2 class="alternate">Reviews</h2>
              <div class="${ID}-content"></div>
          </div>
      </div>

      `;
      this.component = element;


      element.querySelector(`.${ID}-stockCheck`).insertAdjacentElement('beforebegin', document.querySelector('.detail-page__right-column'));
      const specs = document.querySelector('.product-specification');
      element.querySelector(`.tab[tab-attr="specs"] .${ID}-content`).appendChild(specs);
    }
  
    bindEvents() {
      const { component } = this;


      // ------- Reviews
      const reviewNo = window.digitalData.product[0].productInfo.ratingCount;

      pollerLite(['.product-customer-rating-summary', '#js-reviews-data'], () => {
        component.querySelector(`.${ID}-reviewCount`).innerHTML = document.querySelector('#js-link-reviews').innerHTML;
        component.querySelector('.product-customer-rating-summary__text').textContent = `(${reviewNo})`;
        component.querySelector(`.${ID}-inner.reviews`).appendChild(document.querySelector('#js-reviews-data').parentNode);

        component.querySelector(`.${ID}-inner.reviews`).appendChild(document.querySelector('#js-reviews-data').parentNode);
      });

      // --------- Finance
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

      // ------- Stock checker
      pollerLite(["collect-in-store"], () => {
        const stockCheck = document.querySelector("collect-in-store");
        document.querySelector(`.${ID}-inner.stock .${ID}-content`).appendChild(stockCheck);
        stockRestyle();
      });

      // --- Detail tabs
      let accItem;
      if(window.innerWidth > 767) {
        accItem = component.querySelectorAll(`.${ID}-detail .tab`);
      } else {
        accItem = component.querySelectorAll(`.${ID}-detail .tab`);
      }
      
      const accHeading = component.querySelectorAll(`.${ID}-detail .tab h2`);

      for (let index = 0; index < accHeading.length; index += 1) {
      const el = accHeading[index];
        el.addEventListener('click', toggleItem, false);
      }

      function toggleItem() {
     
        const itemClass = this.parentNode.className;
        for (let i = 0; i < accItem.length; i += 1) {
          const accEl = accItem[i];
          accEl.className = `tab`;
        }

        if (itemClass == `tab`) {
          this.parentNode.className = `tab tab-active`;
          scrollToElement(component.querySelector(`.${ID}-detail`));
        }
      }


       // -------- Usps
       const allUspLinks = component.querySelectorAll(`.${ID}-usp`);

       for (let index = 0; index < allUspLinks.length; index += 1) {
           const element = allUspLinks[index];
 
           let elToClick;
 
 
           if(element.querySelector(`.${ID}__textLink`)) {
               elToClick = element.querySelector(`.${ID}__textLink`);
 
           } else {
               elToClick = element;
           }
 
           elToClick.addEventListener('click', () => {
               
               const matchingContent = element.getAttribute('usp-attr');
 
               const matchingInnerContent = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.${matchingContent}`);
               if(matchingInnerContent) {
                   openSlideTab(matchingInnerContent);
               }
           });
           
       }
 
       const closeBox = component.querySelector(`.${ID}-slideOutTab .${ID}-close`);
       closeBox.addEventListener('click', () => {
           const elToHide = document.querySelector(`.${ID}-slideOutTab .${ID}-inner.active`);
           closeSlideTab(elToHide);
       });
 
       const overlay = component.querySelector(`.${ID}-overlay`);
       overlay.addEventListener('click', () => {
           const elToHide = component.querySelector(`.${ID}-slideOutTab .${ID}-inner.active`);
           closeSlideTab(elToHide);
       });

       // ------ Questions
       const allQuestions = component.querySelectorAll(`.${ID}-question`);
        for (let index = 0; index < allQuestions.length; index++) {
          const element = allQuestions[index];
          element.addEventListener('click', (e) => {
              switchQuestion(e, e.currentTarget.getAttribute("question-data"));
              scrollToElement(component.querySelector(`.${ID}-answersBlock`));

              fireEvent('Clicked question');
          })
      }
   
      pollerLite(['.tangiblee-button'], () => {
        component.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector('.tangiblee-button'));
        document.querySelector('.tangiblee-button').removeAttribute('style');
        document.querySelector('.tangiblee-button span').removeAttribute('style');
        document.querySelector('.tangiblee-button span').textContent = 'Try it on';
      });

      // // Move similar
      pollerLite(['.product-gallery__syte.js-syte-functionality'], () => {
        component.querySelector(`.${ID}-mainProductSlider`).appendChild(document.querySelector('.product-gallery__syte.js-syte-functionality'));
      });
      


    }
  
    render() {
      const { component } = this;
      document.querySelector('#access-content').insertAdjacentElement('beforebegin', component);
    }
  }