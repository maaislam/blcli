import { events, pollerLite } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
// change to false to send code to client
// setting to true allows you to run it normally on the HC homepage through UserJS/CSS
let debug = true;

/* Had to copy the code from core-files/services.js into here so that the experiment didn't add
a class to the html tag. This code is now used to power a page on site so considerations about
page load are a lot more important than they usually are for experimentation */

export const setup = () => {
  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + ' - ' + ID);

  if (LIVECODE == 'true') {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // // adds document body classlist
  // document.documentElement.classList.add(ID);
  // document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label, sendOnce = false) => {
  let labelMessage = 'Test ID: ' + ID + ' Variation: ' + VARIATION + ' Label: ' + label;
  if (newEvents.initiate == false) {
    events.sendNormalised(labelMessage, {
      sendOnce: sendOnce,
    });
  } else {
    newEvents.send(label);
  }
};

export const newEvents = {
  initiate: false,
  methods: ['ga4'], // ga4 | datalayer | ua
  tracker: false, // custom tracker for UA
  property: false, // custom property for GA4
  uaRef: 'ga',

  send(label) {
    if (this.methods.includes('ga4')) {
      pollerLite([() => document.readyState === 'complete'], () => {
        if (window.gtag !== undefined) {
          window.gtag('event', 'experimentation', {
            experiment_id: `${ID}-${VARIATION}`,
            experiment_label: label,
            send_to: this.property || 'default',
          });
        } else {
          window.dataLayer = window.dataLayer || [];

          if (window.customGtag === undefined) {
            window.customGtag = function () {
              window.dataLayer.push(arguments);
            };
            window.customGtag('js', new Date());
            window.customGtag('config', this.property || 'default');
          }

          window.customGtag('event', 'experimentation', {
            experiment_id: `${ID}-${VARIATION}`,
            experiment_label: label,
            send_to: this.property || 'default',
          });
        }
      });
    }

    if (this.methods.includes('datalayer')) {
      pollerLite([() => !!window.dataLayer], () => {
        window.dataLayer.push({
          event: 'experimentation',
          experiment_id: `${ID}-${VARIATION}`,
          experiment_label: label,
        });
      });
    }

    if (this.methods.includes('ua')) {
      pollerLite([() => !!window[this.uaRef]], () => {
        const tracker = this.tracker || window[this.uaRef].getAll()[0].get('name');

        window[this.uaRef](`${tracker}.send`, 'event', 'experimentation', `${ID}-${VARIATION}`, label, {
          nonInteraction: true,
        });
      });
    }
  },
};

const startExperiment = () => {
  document.documentElement.classList.add('HOT-643');

  // const addJsToPage = (src, id, cb, classes) => {
  //   if (document.querySelector(`#${id}`)) {
  //     return;
  //   }

  //   const s = document.createElement('script');
  //   if (typeof cb === 'function') {
  //     s.onload = cb;
  //   }

  //   if (classes) {
  //     s.className = classes;
  //   }

  //   s.src = src;
  //   s.setAttribute('id', id);
  //   document.body.appendChild(s);
  // };
  // const js = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js';
  // addJsToPage(js, `HOT-643__slickjs`);
  // Code to add the content to the page for development
  if (debug == true) {
    document.getElementById('main').innerHTML = '';

    let HTMLBlock1 = `
  
      <a class="HCN-block HCN-heroblock" href="/uk/shop/collections/products/hot-chocolate/">

        <div class="HCN-block--inner">

          <div class="HCN-heroblock--content">
            <h2> VELVETISE INTO HAPPINESS </h2>
            <p> Be whisked away by the Velvetiser. Pour, sip, and savour velvet-smooth liquid chocolate. </p>
            <span class="HCN-button"> shop now </span>
          </div>

        </div>

      </a>
    
    
    `;

    let HTMLBlock2 = `

      <div class="HCN-block HCN-category-carousel-block">

        <div class="HCN-category-carousel-wrapper">
        
          <div class='HOT-643__categoryHeader'>
            <h2 class="HOT-643__title">Luxury Chocolate & Gifts</h2>
            <p class="HOT-643__details">
              <span class='HOT-643__expandedArea'>Explore our exquisite selection of <a href='https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/'>boxed chocolates</a>, luxury chocolate treats, and cacao-infused alcohol gifts for every special occasion...</span>
              <span class="HOT-643__readMore">read more</span>
            </p>
            <p class="HOT-643__fullDetails">
              Explore our exquisite selection of <a href='https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/'>boxed chocolates</a>, luxury chocolate treats, and cacao-infused alcohol gifts for every special occasion — from birthdays and 
              <a href='https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/anniversary/'>anniversaries</a> to 
              <a href='https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/sorry/'>heartfelt apologies</a>.
              Original, authentic, ethical: our three guiding principles have inspired us to establish over 120 chocolate shops, cafés, restaurants, and our luxurious Rabot Estate hotel in Saint Lucia. Collect your order in-store or experience the joy of next-day chocolate delivery.
            </p>
          </div>

          <div class="HCN-category-block--inner">

            <div class="HCN-category-carousel-block--contents loading">         

              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/whats-new/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/halloween.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Halloween </h3>
                  </div>
                
                </div>

                

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/whats-new/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/christmas.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Christmas </h3>
                  </div>

                </div>

                

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/chocolateboxes.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Chocolate Boxes </h3>
                  </div>

                </div>              

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/bestsellers.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Best Sellers </h3>
                  </div>

                </div>

                

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-hampers/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/hampers.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Hampers </h3>
                  </div>

                </div>

                

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/luxury-chocolate/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/icons.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Icons </h3>
                  </div>

                </div>

                

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/biscuits/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/biscuits.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Biscuits </h3>
                  </div>

                </div>

                

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/selectors/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/selectors.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Selectors </h3>
                  </div>

                </div>

              

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/wine-chocolate/" class="HCN-item">

                <div class="HCN-item-wrapper">

                  <div class="HCN-bannerblock--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/category-carousel/alcohol.jpg"></img>
                  </div>

                  <div class="HCN-item--content">
                    <h3> Alcohol </h3>
                  </div>

                </div>

                

              </a>

              
            
            </div>

            <div class="HCN-category-progress-bar-container">

              <div class="progress-bar-category" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <span class="slider__label sr-only"></span>
              </div>

              <div class="slick_btn">

                <div class="slick_btn__item slick_btn__item--prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="14.3" stroke="black" stroke-width="1.4"/>
                  <path d="M16.5 10.5L12 15L16.5 19.5" stroke="black" stroke-width="1.4"/>
                  </svg>
                </div>

                <div class="slick_btn__item slick_btn__item--next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="14.3" transform="rotate(-180 15 15)" stroke="black" stroke-width="1.4"/>
                  <path d="M13.5 19.5L18 15L13.5 10.5" stroke="black" stroke-width="1.4"/>
                  </svg>
                </div>

              </div> 

            </div>

          </div>
        </div>

      </div>
    `;

    let HTMLBlock3 = `

      <div class="HCN-block HCN-newinblock-container">

        <div class="HCN-newinblock-wrapper">
          <div class="HCN-newinblock-inner">
            <div class="HCN-newinblock-container--title"> Trending</div>

            <div class="HCN-product-carousel">
            
                <a href="https://www.hotelchocolat.com/uk/apple-pie-hot-chocolate.html" class="HCN-item HOT-643__promotedItem">
                    <div class="HCN-item-wrapper">
                        <div class='HOT-643__discountMessage'>20% Off Limited Time Only</div>
                        <div class="HCN-item--image">
                            <img src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf8d7b6ea/images/504301-1X.jpg?sw=2000&sh=2000&sm=fit">
                        </div>
                        <div class="HCN-item--content HOT-643__content">
                            <h3> Apple Pie Drinking... </h3>
                            <p> £13.50 </p>
                        </div>
                        <div class="HCN-item--content HOT-643__hideContent">
                            <h3> Apple Pie Drinking... </h3>
                            <p> £13.50 </p>
                        </div>
                    </div>
                </a>
              
                <a href="https://www.hotelchocolat.com/uk/shop/collections/products/the-velvetiser/" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/velvetiser.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> The Velvetiser </h3>
                    <p> from £99.95 </p>
                  </div>
                </div>

              </a>
			  
			  
              <a href="https://www.hotelchocolat.com/uk/apple-pie-hot-chocolate.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/applepie.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> Apple Pie Drinking Chocolate </h3>
                    <p> £13.50 </p>
                  </div>
                </div>

              </a>

              <a href="https://www.hotelchocolat.com/uk/pumpkin-spice-hot-chocolate.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/pumpkinspice.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> Pumpkin Spice Drinking Chocolate </h3>
                    <p> £13.50 </p>
                  </div>
                </div>

              </a>

              <a href="https://www.hotelchocolat.com/uk/black-forest-sachets.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/blackforest.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> Black Forest Gateau Hot Chocolate Sachets </h3>
                    <p> £13.50 </p>
                  </div>
                </div>

              </a>

            

              <a href="https://www.hotelchocolat.com/uk/hot-chocolate-variety-pack.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/everythingselection.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> The Everything Hot Chocolate Sachet Selection </h3>
                    <p> £14.50 </p>
                  </div>
                </div>

              </a>

              <a href="https://www.hotelchocolat.com/uk/latte-hot-chocolate-selection-box.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/everythinglatte.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> The Everything Selection - Latte </h3>
                    <p> £29.50 </p>
                  </div>
                </div>

              </a>

              <a href="https://www.hotelchocolat.com/uk/classic-chocolate-latte.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/mochalatte.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> Caffè Latte Sachets </h3>
                    <p> £13.50 </p>
                  </div>
                </div>

              </a>

              <a href="https://www.hotelchocolat.com/uk/shop/collections/products/hot-chocolate/" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/hotchoc.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> Hot Chocolate </h3>
                    <p> from £14.50 </p>
                  </div>
                </div>

              </a>

              <a href="https://www.hotelchocolat.com/uk/iced-chocolate-with-the-velvetiser.html" class="HCN-item">

                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/trending-carousel/icedchoc.png" />
                  </div>

                  <div class="HCN-item--content">
                    <h3> Iced Chocolate </h3>
                    <p> from £99.95 </p>
                  </div>
                </div>

              </a>

              
              
            </div>

            <div class="HCN-progress-bar-container">

              <div class="progress-bar-newin" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <span class="slider__label sr-only"></span>
              </div>

              <div class="slick_btn">

                <div class="slick_btn__item slick_btn__item--prev">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="14.3" stroke="black" stroke-width="1.4"/>
                  <path d="M16.5 10.5L12 15L16.5 19.5" stroke="black" stroke-width="1.4"/>
                  </svg>
                </div>

                <div class="slick_btn__item slick_btn__item--next">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="14.3" transform="rotate(-180 15 15)" stroke="black" stroke-width="1.4"/>
                  <path d="M13.5 19.5L18 15L13.5 10.5" stroke="black" stroke-width="1.4"/>
                  </svg>
                </div>

              </div> 

            </div>

          </div>
        </div>

      </div>





    `;

    let HTMLBlock4 = `

      <div class="HCN-block HCN-goodchocolate-container">

        <div class="HCN-goodchocolate-wrapper">
          <div class="HCN-goodchocolate-inner">
            <div class="HCN-goodchocolate-container--title"> Good Chocolate Is For Everyone </div>

            <div class="HCN-goodchocolate-product-carousel">
              
              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-her/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforher.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Gifts For Her </h3>
                  </div>
                </div>
    
              </a>
    
              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-him/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforhim.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Gifts For Him </h3>
                  </div>
                </div>
    
              </a>
    
              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/birthday/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/birthdaygifts.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Birthday Gifts </h3>
                  </div>
                </div>
    
              </a>

              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/thank-you/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/thankyougifts.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Thank You Gifts </h3>
                  </div>
                </div>
    
              </a>

              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-couples/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforcouples.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Gifts For Couples </h3>
                  </div>
                </div>
    
              </a>
    
              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/wedding/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/weddinggifts.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Wedding Gifts </h3>
                  </div>
                </div>
    
              </a>
    
              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/collections/dietary/vegan-chocolate/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforher.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Vegan Gifts </h3>
                  </div>
                </div>
    
              </a>
    
              <!-- Product -->
              <a href="https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-children/" class="HCN-item">
    
                <div class="HCN-item-wrapper">
                  <div class="HCN-item--image">
                    <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/goodchoc-carousel/giftsforchildren.jpg" />
                  </div>
    
                  <div class="HCN-item--content">
                    <h3> Gifts for Children </h3>
                  </div>
                </div>
    
              </a>
    
              
    
              
              
            </div>
    
            
    
          </div>

          <div class="HCN-progress-bar-container">
              <div class="HCN-progress-bar-wrapper">
                <div class="HCN-progress-bar-goodchocolat">
                  <div class="progress-bar-goodchocolat" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <span class="slider__label sr-only"></span>
                  </div>
        
                  <div class="slick_btn">
        
                    <div class="slick_btn__item slick_btn__item--prev">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <circle cx="15" cy="15" r="14.3" stroke="black" stroke-width="1.4"/>
                      <path d="M16.5 10.5L12 15L16.5 19.5" stroke="black" stroke-width="1.4"/>
                      </svg>
                    </div>
        
                    <div class="slick_btn__item slick_btn__item--next">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <circle cx="15" cy="15" r="14.3" transform="rotate(-180 15 15)" stroke="black" stroke-width="1.4"/>
                      <path d="M13.5 19.5L18 15L13.5 10.5" stroke="black" stroke-width="1.4"/>
                      </svg>
                    </div>
        
                  </div> 
                </div>
                
              </div>    
            </div>
        </div>
      </div>

        

    `;

    let HTMLBlock5 = `

      <a href="https://www.hotelchocolat.com/uk/love-match.html" class="HCN-block HCN-discovermatchblock">

        <div class="HCN-discovermatchblock--inner">

          <div class="discover-contents">
            <h2> Chocolate Love Match </h2>
            <P> Let us reveal your personal flavour profile and elevate your chocolate experience </P>
            <div class="discover-btn HCN-button"> discover yours </div>
          </div>

          <div class="discover-thumbnail"></div>

        </div>

      </a>
    `;

    let HTMLBlock6 = `

      <a href="https://www.hotelchocolat.com/uk/about-vipme/" class="HCN-block HCN-memberbenefitblock">

        <div class="HCN-memberbenefitblock--inner">

          <div class="memberbenefit-thumbnail"></div>

          <div class="memberbenefit-contents">
            <h2> VIP.ME member benefits </h2>
            <P> It’s free to join and as a welcome offer you’ll get 15% off your next purchase. </P>
            <ul>
              <li> Save £30 off The Velvetiser </li>
              <li> A special treat on your birthday </li>
              <li> 20% off drinks and ices </li>
            </ul>
            <div class="member-benefit-btn HCN-button"> find out more </div>
          </div>

        </div>

      </a>
    `;

    let HTMLBlock7 = `

      <div class="HCN-block HCN-ethicalbusiness-container">

        <div class="HCN-ethicalbusiness-contents-container">

          <div class="HCN-ethicalbusiness-contents">

            <h2> Our World of Chocolate </h2>
            <p> Learn more about Gentle Farming, visit our Rabot Hotel in St Lucia, explore our cafe recipes and get inspired.</p>
            <a href="" class="HCN-button HCN-ethical_btn"> find out more </a>

          </div>

        </div>

        <div class="HCN-ethicalbusiness-carousel-container">

          <div class="HCN-ethicalbusiness-product-carousel HOT-643__ethicalbusinessCarousel">
            
            <!-- Product -->
            <a href="https://www.hotelchocolat.com/uk/our-cocoa-manifesto.html" class="HCN-item">

              <div class="HCN-item-wrapper">
                <div class="HCN-item--image">
                  <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/ethical-carousel/morecacao.jpg" />
                </div>

                <div class="HCN-item--content">
                  <h3> more cacao less sugar  </h3>
                  <div class="HOT-643__details">
                      <p>Gently farmed, kind to nature, kind to communities...</p>
                      <span class="HOT-643__readMoreDetail">Read More</span>
                  </div>
                </div>
              </div>

            </a>

            <!-- Product -->
            <a href="https://www.hotelchocolat.com/uk/rabothotel.html" class="HCN-item">

              <div class="HCN-item-wrapper">
                <div class="HCN-item--image">
                  <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/ethical-carousel/hotelstlucia.jpg" />
                </div>

                <div class="HCN-item--content">
                  <h3> our hotel in st lucia </h3>
                  <div class="HOT-643__details">
                      <p>Take a trip to our spellbinding getaway in St Lucia...</p>
                      <span class="HOT-643__readMoreDetail">Read More</span>
                  </div>
                </div>
              </div>

            </a>

            <!-- Product -->
            <a href="https://www.hotelchocolat.com/uk/engaged-ethics/our-farmers.html" class="HCN-item">

              <div class="HCN-item-wrapper">
                <div class="HCN-item--image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/ethical-carousel/farmers.jpg" />
                </div>

                <div class="HCN-item--content">
                  <h3> our farmers </h3>
                  <div class="HOT-643__details">
                      <p>Ethical cacao production is a journey, not a destination...</p>
                      <span class="HOT-643__readMoreDetail">Read More</span>
                  </div>
                </div>
              </div>

            </a>

            <!-- Product -->
            <a href="https://www.hotelchocolat.com/uk/cocoa-bar-cafes.html" class="HCN-item">

              <div class="HCN-item-wrapper">
                <div class="HCN-item--image">
                  <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/ethical-carousel/drinksices.jpg" />
                </div>

                <div class="HCN-item--content">
                  <h3> our drinks & ices </h3>
                  <div class="HOT-643__details">
                      <p>Cacao cafes with a cacao-inspired menu, brewed cacao drinks...</p>
                      <span class="HOT-643__readMoreDetail">Read More</span>
                  </div>
                </div>
              </div>

            </a>

            <!-- Product -->
            <a href="https://www.hotelchocolat.com/uk/careers.html" class="HCN-item">

              <div class="HCN-item-wrapper">
                <div class="HCN-item--image">
                  <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/ethical-carousel/workwithus.jpg" />
                </div>

                <div class="HCN-item--content">
                  <h3> Work with us </h3>
                  <div class="HOT-643__details">
                      <p>We’re always looking for passionate people to join our team...</p>
                      <span class="HOT-643__readMoreDetail">Read More</span>
                  </div>
                </div>
              </div>

            </a>

            <!-- Product -->
            <a href="https://www.hotelchocolat.com/uk/blog/" class="HCN-item">

              <div class="HCN-item-wrapper">
                <div class="HCN-item--image">
                  <img src="https://blcro.fra1.digitaloceanspaces.com/HC-NEW-HOMEPAGE/ethical-carousel/blog.jpg" />
                </div>

                <div class="HCN-item--content">
                  <h3> Blog </h3>
                  <div class="HOT-643__details">
                      <p>Discover our recipes, stories and competitions...</p>
                      <span class="HOT-643__readMoreDetail">Read More</span>
                  </div>
                </div>
              </div>

            </a>

            
            
          </div>

          <div class="HCN-ethicalbusiness-progress-bar-container">

            <div class="progress-bar-ethicalbusiness" role="progressbar" aria-valuemin="0" aria-valuemax="100">
              <span class="slider__label sr-only"></span>
            </div>

            <div class="slick_btn">

              <div class="slick_btn__item slick_btn__item--prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14.3" stroke="black" stroke-width="1.4"/>
                <path d="M16.5 10.5L12 15L16.5 19.5" stroke="black" stroke-width="1.4"/>
                </svg>
              </div>

              <div class="slick_btn__item slick_btn__item--next">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14.3" transform="rotate(-180 15 15)" stroke="black" stroke-width="1.4"/>
                <path d="M13.5 19.5L18 15L13.5 10.5" stroke="black" stroke-width="1.4"/>
                </svg>
              </div>

            </div> 

          </div>

        </div>

      </div>
    `;

    let HTMLBlock8 = `
      <div class="HCN-sale-banner">
          <span class="offer-text">50% OFF EASTER</span>
          <span class="availability">WHILE STOCKS LAST</span>
          <div id="countdown">
              Ends in: <span id="timer"></span>
          </div>
          <div class='shop-now'>
              <a href="" class='shop-now-btn'>Shop now</a>
          </div>
      </div>
    `;

    let wrapper = document.getElementById('wrapper');
    wrapper.classList.add('new-homepage');
    let insertionPoint = document.getElementById('main');
    insertionPoint.innerHTML = '';
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock1);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock3);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock2);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock4);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock5);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock6);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock7);
    insertionPoint.insertAdjacentHTML('beforeend', HTMLBlock8);
  }

  // Code for each content block - requires poller to wait for elements to become available.

  //hero block
  pollerLite(['.HCN-heroblock'], () => {
    let heroBlockButton = document.querySelector('.HCN-heroblock .HCN-button');
    heroBlockButton.addEventListener('click', () => {
      fireEvent('Click - hero block button clicked', true);
    });
  });

  //loop carousel block

  window.jQuery(`.HCN-category-carousel-block--contents`).slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 2,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ],
  });

  var $slider = $('.HCN-category-carousel-block--contents');
  var $progressBar = $('.progress-bar-category');
  var count = $slider.find('.slick-slide').length;
  var visibleSlides;

  if (window.innerWidth < 1024 && window.innerWidth > 768) {
    visibleSlides = 4;
  } else if (window.innerWidth < 768 && window.innerWidth > 480) {
    visibleSlides = 3;
  } else if (window.innerWidth < 480) {
    visibleSlides = 2;
  } else {
    visibleSlides = 6;
  }

  let numMovements = count - visibleSlides + 1;
  let percentage = 100 / numMovements;

  $progressBar.css('background-size', percentage + '% 100%').attr('aria-valuenow', percentage);

  $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if (nextSlide == 0) {
      $progressBar.css('background-size', percentage + '% 100%').attr('aria-valuenow', percentage);
    } else {
      $progressBar
        .css('background-size', percentage * (nextSlide + 1) + '% 100%')
        .attr('aria-valuenow', percentage * (nextSlide + 1));
    }
  });

  document.querySelector('.HCN-category-carousel-block .slick_btn__item--next').addEventListener('click', () => {
    window.jQuery('.HCN-category-carousel-block--contents').slick('slickNext');
  });
  document.querySelector('.HCN-category-carousel-block .slick_btn__item--prev').addEventListener('click', () => {
    window.jQuery('.HCN-category-carousel-block--contents').slick('slickPrev');
  });

  document.body.addEventListener('click', (e) => {
    if (
      e.target.closest('.HCN-category-carousel-block .HCN-item') ||
      e.target.classList.contains('.HCN-category-carousel-block .HCN-item')
    ) {
      fireEvent(`Click - product ${e.target.closest('.HCN-item').href} clicked`, true);
      3;
    }
  });

  //sale banner - countdown timer
  let interval;
  const date = '2024-04-16'; // end date
  const endDate = new Date(date).getTime();

  const updateCountdown = (interval) => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      document.querySelector('.shop-now').style.display = 'inline'; // Show "Shop now" button
      document.getElementById('countdown').style.display = 'none'; // Hide countdown
      return '';
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.shop-now').style.display = 'none'; // Hide "Shop now" button
    document.getElementById('countdown').style.display = 'block'; // Show countdown

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  //new_in block
  pollerLite(['.HCN-newinblock-container'], () => {
    const trendingCarousel = document.querySelector('.HCN-newinblock-container');
    trendingCarousel.classList.add('HOT-643__trendingCarousel');

    window.jQuery(`.HCN-product-carousel`).slick({
      dots: false,
      speed: 300,
      infinite: false,
      slidesToShow: 5.5,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
          },
        },
      ],
    });

    var $slider = $('.HCN-product-carousel');
    var $progressBar = $('.progress-bar-newin');
    var count = $slider.find('.slick-slide').length;
    var visibleSlides;

    if (window.innerWidth < 1024 && window.innerWidth > 768) {
      visibleSlides = 3;
    } else if (window.innerWidth < 768 && window.innerWidth > 480) {
      visibleSlides = 2;
    } else if (window.innerWidth < 480) {
      visibleSlides = 1;
    } else {
      visibleSlides = 5;
    }

    $progressBar
      .css('background-size', (100 / count) * visibleSlides + '% 100%')
      .attr('aria-valuenow', (100 / count) * visibleSlides);

    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var calc = (100 / count) * nextSlide;

      $progressBar
        .css('background-size', (100 / count) * visibleSlides + calc + '% 100%')
        .attr('aria-valuenow', (100 / count) * visibleSlides + calc);
    });

    document.querySelector('.HCN-newinblock-container .slick_btn__item--next').addEventListener('click', () => {
      window.jQuery('.HCN-product-carousel').slick('slickNext');
    });
    document.querySelector('.HCN-newinblock-container .slick_btn__item--prev').addEventListener('click', () => {
      window.jQuery('.HCN-product-carousel').slick('slickPrev');
    });

    document.body.addEventListener('click', (e) => {
      if (
        e.target.closest('.HCN-newinblock-container .HCN-item') ||
        e.target.classList.contains('.HCN-newinblock-container .HCN-item')
      ) {
        fireEvent(`Click - product ${e.target.closest('.HCN-item').href} clicked`, true);
      }
    });
  });

  //good chocolat block
  pollerLite(['.HCN-goodchocolate-container a img'], () => {
    window.jQuery(`.HCN-goodchocolate-product-carousel`).slick({
      dots: false,
      infinite: true,
      slide: '.HCN-item',
      initialSlide: 0,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            infinite: false,
            slidesToShow: 3.2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            infinite: false,
            slidesToShow: 2.2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            infinite: false,
            slidesToShow: 1.5,
            slidesToScroll: 1,
          },
        },
      ],
    });

    var $slider = $('.HCN-goodchocolate-product-carousel');
    var $progressBar = $('.progress-bar-goodchocolat');
    var count = $slider.find('.slick-slide:not(.slick-cloned)').length;

    let eachPortion = 100 / count;
    $progressBar.css('background-size', eachPortion + '% 100%').attr('aria-valuenow', eachPortion);
    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      let portionToBeHighlighted = eachPortion * (nextSlide + 1);
      $progressBar.css('background-size', portionToBeHighlighted + '% 100%').attr('aria-valuenow', portionToBeHighlighted);
    });

    document.querySelector('.HCN-goodchocolate-container .slick_btn__item--next').addEventListener('click', () => {
      window.jQuery('.HCN-goodchocolate-product-carousel').slick('slickNext');
    });
    document.querySelector('.HCN-goodchocolate-container .slick_btn__item--prev').addEventListener('click', () => {
      window.jQuery('.HCN-goodchocolate-product-carousel').slick('slickPrev');
    });

    document.body.addEventListener('click', (e) => {
      if (
        e.target.closest('.HCN-goodchocolate-container .HCN-item') ||
        e.target.classList.contains('.HCN-goodchocolate-container .HCN-item')
      ) {
        fireEvent(`Click - product ${e.target.closest('.HCN-item').href} clicked`, true);
      }
    });
  });

  //discover match block
  pollerLite(['.HCN-discovermatchblock'], () => {
    document.querySelector('.HCN-discovermatchblock').style = 'display: block; padding-top: 24px';
    document.querySelector('.HCN-discovermatchblock .HCN-discovermatchblock--inner .discover-thumbnail').style.height = '190px';

    let heroBlockButton = document.querySelector('.HCN-discovermatchblock .HCN-button');
    heroBlockButton.addEventListener('click', () => {
      fireEvent('Click - discover yours button clicked', true);
    });
  });

  //member benefit block
  pollerLite(['.HCN-memberbenefitblock'], () => {
    let heroBlockButton = document.querySelector('.HCN-memberbenefitblock .HCN-button');
    heroBlockButton.addEventListener('click', () => {
      fireEvent('Click - VIP.ME find out more button clicked', true);
    });
  });

  //ethical block
  pollerLite(['.HCN-ethicalbusiness-container a img'], () => {
    window.jQuery(`.HCN-ethicalbusiness-product-carousel`).slick({
      dots: false,
      infinite: true,
      slide: '.HCN-item',
      // autoplay: true,
      // autoplaySpeed: 2000,
      // speed: 300,
      initialSlide: 0,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,

      responsive: [
        // {
        //   breakpoint: 1024,
        //   settings: {
        //     infinite: false,
        //     slidesToShow: 3.5,
        //     slidesToScroll: 1,
        //   }
        // },
        {
          breakpoint: 768,
          settings: {
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

    var $slider = $('.HCN-ethicalbusiness-product-carousel');
    var $progressBar = $('.progress-bar-ethicalbusiness');
    var count = $slider.find('.slick-slide:not(.slick-cloned)').length;

    let eachPortion = 100 / count;
    $progressBar.css('background-size', eachPortion + '% 100%').attr('aria-valuenow', eachPortion);
    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      let portionToBeHighlighted = eachPortion * (nextSlide + 1);

      $progressBar.css('background-size', portionToBeHighlighted + '% 100%').attr('aria-valuenow', portionToBeHighlighted);
    });

    document.querySelector('.HCN-ethicalbusiness-container .slick_btn__item--next').addEventListener('click', () => {
      window.jQuery('.HCN-ethicalbusiness-product-carousel').slick('slickNext');
    });
    document.querySelector('.HCN-ethicalbusiness-container .slick_btn__item--prev').addEventListener('click', () => {
      window.jQuery('.HCN-ethicalbusiness-product-carousel').slick('slickPrev');
    });

    document.body.addEventListener('click', (e) => {
      if (
        e.target.closest('.HCN-ethicalbusiness-container .HCN-item') ||
        e.target.classList.contains('.HCN-ethicalbusiness-container .HCN-item')
      ) {
        fireEvent(`Click - product ${e.target.closest('.HCN-item').href} clicked`, true);
      } else if (e.target.closest('.HCN-ethicalbusiness-container .HCN-button')) {
        fireEvent(`Click - our ethical business find out more button clicked`, true);
      }

      if (e.target.closest(`.HOT-643__readMore`) && document.querySelector('nav.stuckMenu')) {
        const categoryHeader = e.target.closest(`.HOT-643__categoryHeader`);
        categoryHeader.classList.add(`HOT-643__expanded`);
      }
    });
  });

  pollerLite(['nav.stuckMenu'], () => {
    const isMobile = () => document.querySelector('nav.stuckMenu');

    if (!isMobile()) return;

    const findOutMoreBtn = document.querySelector('.HCN-button.HCN-ethical_btn');
    const ethicalProgressBar = document.querySelector('.HCN-ethicalbusiness-progress-bar-container');
    const newFindOutMoreBtn = `<div class='HOT-643__ethicalFindOutMoreBtn'>
        ${findOutMoreBtn.outerHTML}
      </div>`;
    ethicalProgressBar.insertAdjacentHTML('afterend', newFindOutMoreBtn);

    window.jQuery('.HCN-category-carousel-block--contents').slick('destroy');
    const carouselContainer = document.querySelector('.HCN-category-carousel-block--contents');
    carouselContainer.classList.add('HOT-643__categoryCarousel');
  });

  // Sale Banner ------------------------------
  pollerLite(['.HCN-sale-banner'], () => {
    let timer = document.querySelector('.HCN-sale-banner #timer');
    interval = setInterval(() => {
      timer.innerHTML = updateCountdown(interval);
    }, 1000);
  });
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  startExperiment();
};
