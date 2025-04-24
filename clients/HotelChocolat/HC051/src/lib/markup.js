import { events } from "../../../../../lib/utils";
import { fnc_scrollto, scrollToElement, SmoothVerticalScrolling } from "./helpers";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class PageMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}-content`);
      element.innerHTML = `
        <section class="${ID}-topContent">
            <div class="${ID}-mainImage"></div>
            <div class="${ID}-container">
                <h1>The Velvetiser Hot Chocolate Maker</h1>
                <p>In-home hot chocolate machine. Imagined by Hotel Chocolat, engineered by Dualit. Select your colour - Velvetise your world!</p>
                <div class="${ID}-reviewAnchor"></div>
            </div>
        </section>
        <h2 class="${ID}-title"><span>Build your Velvetiser Kit</span></h2>
        <div class="${ID}-main">
            <div class="${ID}-leftSide">
                <section class="${ID}-configurator">
                    <div class="${ID}-steps">
                        <div class="${ID}-accordionSteps">
                            <div class="${ID}-accordionStep ${ID}-colours"> 
                                <h3 class="${ID}-stepTitle">1. Choose your Velvetiser Colour</h3>
                                <p>(Includes 2 FREE Limited Edition Pod Cups worth £20)</p>
                                <div class="${ID}-carousel"></div>
                            </div>
                            <div class="${ID}-accordionStep ${ID}-flakes">
                                <h3 class="${ID}-stepTitle">2. Choose your hot chocolate(s)</h3>
                                <div class="${ID}-stepContent">
                                <p>2 for £15 on all pouches - discount applied at basket</p>
                                    <div class="${ID}-carousel"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="${ID}-delivery">
                    <div class="${ID}-deliveryInfo">
                        <div class="${ID}-deliveryTitle">
                            <h4>DELIVERY ${window.location.href.indexOf('/uk/') ? '(FREE IN THE UK)' : ''}</h4>
                        </div>
                        <div class="${ID}-deliveryContent"></div>
                    </div>
                </section>
                <section class="${ID}-description">
                    <div class="${ID}-container">
                        <h3>Description</h3>
                        <div class="${ID}-descriptionTxt">
                            <p>Imagined by Hotel Chocolat, engineered by Dualit, this chic hot chocolate machine creates barista-grade hot chocolate, made with real grated chocolate flakes, in just 2.5 minutes. No need for the resident hot chocolate maker to slave over a hot stove, slowly heating milk and showering cocoa powder. Instead, simply plug in your Velvetiser, choose your chocolate and your milk – dairy or plant-based, or even water if you prefer – and press the button. <span class="${ID}-readMore">Read More...</p>
                            <div class="${ID}-moreText">
                                <p>Plus, with the removable whisk and non-stick coating, cleaning is easy – just rinse out with cold water. (It’s not suitable for dishwashers – but they’d just slow you down anyway.)</p>
                                <br></br>
                                Included with your Velvetiser:
                                <ul>
                                    <li>2 ceramic Podcups worth £20.</li>
                                    <li>1-year full parts and labour guarantee.</li>
                                </ul>
                                <div class="${ID}-moreDetails"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="${ID}-video">
                    <div class="${ID}-container">
                        <div class="${ID}-videoBlock"></div>
                    </div>
                </section>
                <section class="${ID}-warranty">
                    <a class="${ID}-warrantyBanner" href="https://www.hotelchocolat.com/uk/velvetiser-warranty.html" target="_blank">
                    <img src="${window.innerWidth <= 767 ? `https://editor-assets.abtasty.com/48343/6005b52e513c41610986798.jpg` : 'https://editor-assets.abtasty.com/48343/6005b557db0691610986839.jpg'}"/>
                    </a>
                </section>
                <section class="${ID}-reviews"></section>
            </div>
            <div class="${ID}-rightSide"></div>
        </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      /* Delivery accordion click */
      const deliveryTitle = component.querySelector(`.${ID}-deliveryTitle`);
      const deliveryContent = component.querySelector(`.${ID}-deliveryInfo`);
      deliveryTitle.addEventListener('click', () => {
          if(deliveryContent.classList.contains(`${ID}-deliveryShow`)) {
            deliveryContent.classList.remove(`${ID}-deliveryShow`);
          } else {
            deliveryContent.classList.add(`${ID}-deliveryShow`);
            events.send(`${ID} variation:${VARIATION}`, 'click', 'show delivery options'); 
          }
      })

      const readMoreDesc = component.querySelector(`.${ID}-readMore`);
      const moreText = component.querySelector(`.${ID}-moreText`);
      readMoreDesc.addEventListener('click', () => {
            events.send(`${ID} variation:${VARIATION}`, 'click', 'read more description'); 
          moreText.classList.add(`${ID}-moreShow`);
         readMoreDesc.style.display = 'none';
      });

      // warranty banner click
      component.querySelector(`.${ID}-warrantyBanner`).addEventListener('click', () => {
        events.send(`${ID} variation:${VARIATION}`, 'click', 'warranty banner'); 
      });
    }
  
    render() {
      const { component } = this;
      document.querySelector(`#main`).insertAdjacentElement('afterbegin', component);

      /* Move review anchor to the top and move all other reviews to bottom */
        const reviews = document.querySelector('#product-content .product-review-links.product-review-links-top');
        const reviewRating = reviews.querySelector('.bv-rating span');
        const allReviews = document.querySelector('#tabReviews');
        if(reviews && reviewRating && allReviews) {
            document.querySelector(`.${ID}-reviewAnchor`).appendChild(reviews);
            reviews.insertAdjacentHTML('beforeend',`<div class="${ID}-reviewRating">${reviewRating.innerText}</div><div class="${ID}-readReviews">Read Reviews</div>`);            
        
            allReviews.removeAttribute('style');
            component.querySelector(`.${ID}-reviews`).appendChild(allReviews);

             /* Review anchor */
            const reviewLink = document.querySelector(`.${ID}-reviewAnchor`);
            const reviewBlock = document.querySelector(`#BVRRContainer`);
        
            reviewLink.addEventListener('click', () => {
                events.send(`${ID} variation:${VARIATION}`, 'click', 'read reviews'); 
                scrollToElement(allReviews);
            
               
            });

            const controlReviews = document.querySelector(`.${ID}-reviewAnchor .bv-rating-stars-container.bv-focusable`);
            controlReviews.addEventListener('click', (e) => {
                e.preventDefault();
            });
            /*if(controlReviews){
                controlReviews.addEventListener('click', (e) => {
                    e.preventDefault();
                
                    events.send(`${ID} variation:${VARIATION}`, 'click', 'read reviews'); 
                    SmoothVerticalScrolling(reviewBlock, 500, "center");
                });
            }*/
        }

        /* Move more details in to description */
        const moreDetails = document.querySelector('#tabDesc .descSection3.additional');
        if(moreDetails) {
            component.querySelector(`.${ID}-moreDetails`).appendChild(moreDetails);
        }
      
        /* Move delivery information */
        const deliveryInfo = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-c ul');
        if(deliveryInfo) {
            component.querySelector(`.${ID}-deliveryContent`).appendChild(deliveryInfo);
        }

       
    }
  }
