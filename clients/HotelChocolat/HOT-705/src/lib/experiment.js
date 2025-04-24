/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent , newEvents} from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite  } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;


const closeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
  <path d="M15.8143 16.6357L9 10.2L2.18574 16.6357C1.9286 16.8786 1.67144 17 1.28573 17C0.5143 17 1.57005e-05 16.5143 1.57005e-05 15.7857C1.57005e-05 15.4214 0.128571 15.1786 0.385714 14.9357L7.20001 8.5L0.385714 2.06429C-0.128571 1.57857 -0.128571 0.85 0.385714 0.364286C0.899998 -0.121429 1.67146 -0.121429 2.18574 0.364286L9 6.8L15.8143 0.364286C16.3285 -0.121429 17.1 -0.121429 17.6143 0.364286C18.1286 0.85 18.1286 1.57857 17.6143 2.06429L10.8 8.5L17.6143 14.9357C18.1286 15.4214 18.1286 16.15 17.6143 16.6357C17.1 17.1214 16.3285 17.1214 15.8143 16.6357Z" fill="black"/>
</svg>`;

const sleevebtnListener = () => {
  const buttons = document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn");

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          // const dataAttributes = JSON.parse(document.querySelector('#product-content .product-variations').getAttribute('data-attributes'));
  
          // alert(dataAttributes.sleeveOption.value);
          // if (dataAttributes.sleeveOption.value == "NoSleeve") {
              // If the value is not "NoSleeve", add the gifting button
              const giftingButton = `
                <div class="${ID}-ways-to-pay-container">
                  <div class="${ID}-ways-to-pay">
                    <div class="${ID}-ways-to-pay-left">
                      <p class="${ID}-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>
                    </div>
                    <div class="${ID}-ways-to-pay-right">
                      <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag.png" alt="Card">
                    </div>

                </div>`;
              // alert('noS and nogo');
              setTimeout(function(){
              const addToCartContainer = document.querySelector("#product-detail-wrapper #product-content .product-variations");
              // const addToCartContainer = document.querySelector("#product-detail-wrapper").children[0].children[3].children[1].children[0].children[6];
              // console.log(addToCartContainer)
              if (addToCartContainer) {
                pollerLite(['#product-detail-wrapper #product-detail-wrapper .product-variations'], () => {
                  // setTimeout(function(){
                  addToCartContainer.insertAdjacentHTML('afterend', giftingButton);
                  console.log('Added gifting button before add to cart after checking data-attributes.');
                // },2000);
                sleevebtnListener();
                sliderFunction();
                })
              }
            },600)
          // }
      });
  });

}

const sliderFunction = () =>{
  const slideOutContainer = document.querySelector(`.${ID}-ways-to-pay-slide`);
      // const learnMoreDOM = document.querySelector(`.${ID}-learn-more`);
      const waysToPayDOM = document.querySelector(`.${ID}-ways-to-pay-container`);  
      const closeDOM = document.querySelector(`.${ID}-ways-to-pay-slide-close`);
      const overlayDOM = document.querySelector(`.${ID}-overlay`);
      const continueShoppingDOM = document.querySelector(`.${ID}-continue-shopping`);
      const screenWidth = window.innerWidth;
      const bodyele = document.querySelector('body');

      waysToPayDOM.addEventListener('click', () => {
        fireEvent('Click - User clicks “Learn more” CTA');
        const isVisible = slideOutContainer.style.right === '0px';
        if(screenWidth < 678) {
          slideOutContainer.style.right = isVisible ? '-550px' : '0px';
        } else {
        slideOutContainer.style.right = isVisible ? '-725px' : '0px';
        }
        overlayDOM.style.display = isVisible ? 'none' : 'block';
        bodyele.style.overflowY = 'hidden';
      });

      closeDOM.addEventListener('click', () => {
        fireEvent('Click - User clicks close CTA in slide out');
        if(screenWidth < 678) {
          slideOutContainer.style.right = '-550px';
        } else {
        slideOutContainer.style.right = '-725px';
        }
        overlayDOM.style.display = 'none';
        bodyele.style.removeProperty('overflow-y');
      });

      continueShoppingDOM.addEventListener('click', () => {
        fireEvent('Click - User clicks “Continue Shopping” CTA in slide out');
        if(screenWidth < 678) {
          slideOutContainer.style.right = '-550px';
        } else {
        slideOutContainer.style.right = '-725px';
        }
        overlayDOM.style.display = 'none';
        bodyele.style.removeProperty('overflow-y');
      });
}

const startExperiment = () => {
  // console.log('Product details page loaded');
  
  pollerLite(['#product-content .product-add-to-cart'], () => {
    // console.log('Product details page loaded');

    const giftingButton = `
      <div class="${ID}-ways-to-pay-container">
        <div class="${ID}-ways-to-pay">
          <div class="${ID}-ways-to-pay-left">
            <p class="${ID}-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>
          </div>
          <div class="${ID}-ways-to-pay-right">
            <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag.png" alt="Card">
          </div>

      </div>`;
      if(!document.querySelector('#product-content .product-variations') && !document.querySelector('#product-content .HOT-705-ways-to-pay-container')){
        const targetContainer = document.querySelector("#product-content .product-add-to-cart");
        targetContainer.insertAdjacentHTML('beforebegin', giftingButton );
        console.log('add to cart')
      
      } else if(document.querySelector('#product-content .product-variations')){
        // const targetContainer = document.querySelector("#product-content .product-variations");
        // targetContainer.insertAdjacentHTML('afterend', giftingButton );
          pollerLite(['#product-content .HOT-705-ways-to-pay-container'], () => {
            document.querySelector('#product-content .product-variations').after(document.querySelector('#product-content .HOT-705-ways-to-pay-container'))
            console.log('sleeve');
          })
      }
    
      const buttons = document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn");

      buttons.forEach(button => {
          button.addEventListener('click', function() {
              // const dataAttributes = JSON.parse(document.querySelector('#product-content .product-variations').getAttribute('data-attributes'));
      
              // alert(dataAttributes.sleeveOption.value);
              // if (dataAttributes.sleeveOption.value == "NoSleeve") {
                  // If the value is not "NoSleeve", add the gifting button
                  const giftingButton = `
                    <div class="${ID}-ways-to-pay-container">
                      <div class="${ID}-ways-to-pay">
                        <div class="${ID}-ways-to-pay-left">
                          <p class="${ID}-more-ways">Sending as a gift? <u>Explore our gifting options.</u></p>
                        </div>
                        <div class="${ID}-ways-to-pay-right">
                          <img src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-bag.png" alt="Card">
                        </div>

                    </div>`;
                  // alert('noS and nogo');
                  setTimeout(function(){
                  const addToCartContainer = document.querySelector("#product-detail-wrapper #product-content .product-variations");
                  // const addToCartContainer = document.querySelector("#product-detail-wrapper").children[0].children[3].children[1].children[0].children[6];
                  // console.log(addToCartContainer)
                  if (addToCartContainer) {
                    pollerLite(['#product-detail-wrapper #product-detail-wrapper .product-variations'], () => {
                      // setTimeout(function(){
                      addToCartContainer.insertAdjacentHTML('afterend', giftingButton);
                      console.log('Added gifting button before add to cart after checking data-attributes.');
                    // },2000);
                    sleevebtnListener()
                    sliderFunction();
                    })
                  }
                },600)
              // }
          });
      });

      const waysToPaySlide = `
        <div class="${ID}-ways-to-pay-slide">
          <div class="${ID}-ways-to-pay-slide-close">
            ${closeSVG}
          </div>
          <div class="${ID}-ways-to-pay-slide-content">
            <h2>Luxury Gifting</h2>
            <p class="${ID}-following-options">We know the importance of making every detail perfect. Add a final flourish to your chocolate gifts with elegant gift bags, complimentary chocolate box gift sleeves and more.</p>
            
            <div class="${ID}-payment-options">
              <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/christmas24-gift-card-message-image.jpg">
              <div class="${ID}-brief">
              <h3 class="${ID}-sub-heading">Personalised Message</h3>
              <p class="${ID}-following-options">Witty or sentimental. Complimentary or congratulatory. You choose the words, we’ll provide the means, courtesy of a message card. They’re complimentary with every online order and there’s space for up to 200 characters (that’s about 30 words).A gift message option is available at checkout.</p><br><span class="${ID}-free">Free<span>
             </div>
            
            </div>
                <div class="${ID}-payment-options">
              <div class="${ID}-brief">
              <h3 class="${ID}-sub-heading">Signature Gift Bag and Box</h3>
              <p class="${ID}-following-options">Ensure your gifts arrive in style by choosing to present them in a chic, ribbon-tied box or bag. Simply select one of these options at checkout.<br><ul><li style="margin-bottom:0px;">Gift Bag: £3.00</li><li>Gift Box: £5.00</li></ul></p>
              </div>
              <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/christmas24-gift-bags-boxes-image.jpg" alt="Klarna">
             
            </div>
        

            <div class="${ID}-payment-options">
             <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/christmas24-gift-card-image.jpg" alt="Klarna">
             <div class="${ID}-brief">
              <h3 class="${ID}-sub-heading">Gift Cards</h3>
              <p class="${ID}-following-options">Need something last-minute or not sure what they'd like? Send a Hotel Chocolat gift card, either through the post or instantly via email.<br><a target="_blank" href="https://www.hotelchocolat.com/uk/gift-card.html"><u>Explore Gift Card Options</u></a></p>
              </div>
              
            </div>

            <div class="${ID}-payment-options">

            </div>
            
            
            </div>
            <div class="${ID}-continue-shopping">
              <p>Continue Shopping</p>
            </div>
        </div>`;
     
      //   <div class="${ID}-payment-options">
      //   <img  src="https://blcro.fra1.digitaloceanspaces.com/HC-705/image%2012.png" alt="Klarna">
      //   <div class="${ID}-brief">
      //   <h3 class="${ID}-sub-heading">Complimentary Gift Sleeve</h3>
      //   <p class="${ID}-following-options">Gifting a boxed chocolate selection? Dress it for the occasion with a complimentary gift sleeve. With a variety of designs to suit different occasions, they slot perfectly onto any H-box, Sleekster or Luxe chocolate box. Select yours before you add your gift to your online basket.</p><br><span class="${ID}-free">Free<span>
      //   </div>
      // </div>
    
      const overlay = `<div class="${ID}-overlay"></div>`
      const targetContainerSlide = document.querySelector('body');
      targetContainerSlide.insertAdjacentHTML('afterbegin', waysToPaySlide);
      targetContainerSlide.insertAdjacentHTML('afterbegin', overlay);

      sliderFunction();
      // const slideOutContainer = document.querySelector(`.${ID}-ways-to-pay-slide`);
      // // const learnMoreDOM = document.querySelector(`.${ID}-learn-more`);
      // const waysToPayDOM = document.querySelector(`.${ID}-ways-to-pay-container`);  
      // const closeDOM = document.querySelector(`.${ID}-ways-to-pay-slide-close`);
      // const overlayDOM = document.querySelector(`.${ID}-overlay`);
      // const continueShoppingDOM = document.querySelector(`.${ID}-continue-shopping`);
      // const screenWidth = window.innerWidth;
      // const bodyele = document.querySelector('body');

      // waysToPayDOM.addEventListener('click', () => {
      //   fireEvent('Click - User clicks “Learn more” CTA');
      //   const isVisible = slideOutContainer.style.right === '0px';
      //   if(screenWidth < 678) {
      //     slideOutContainer.style.right = isVisible ? '-550px' : '0px';
      //   } else {
      //   slideOutContainer.style.right = isVisible ? '-725px' : '0px';
      //   }
      //   overlayDOM.style.display = isVisible ? 'none' : 'block';
      //   bodyele.style.overflowY = 'hidden';
      // });

      // closeDOM.addEventListener('click', () => {
      //   fireEvent('Click - User clicks close CTA in slide out');
      //   if(screenWidth < 678) {
      //     slideOutContainer.style.right = '-550px';
      //   } else {
      //   slideOutContainer.style.right = '-725px';
      //   }
      //   overlayDOM.style.display = 'none';
      //   bodyele.style.removeProperty('overflow-y');
      // });

      // continueShoppingDOM.addEventListener('click', () => {
      //   fireEvent('Click - User clicks “Continue Shopping” CTA in slide out');
      //   if(screenWidth < 678) {
      //     slideOutContainer.style.right = '-550px';
      //   } else {
      //   slideOutContainer.style.right = '-725px';
      //   }
      //   overlayDOM.style.display = 'none';
      //   bodyele.style.removeProperty('overflow-y');
      // });
      
  });
}

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';
  setup();


  document.body.addEventListener('click', (e) => {
    const { target } = e;
    
  if (target.closest(`.${ID}-ways-to-pay-container`)) {
      fireEvent('user clicks new gifting element');
      console.log('user clicks new gifting element');
      
    } else if (target.closest(`.${ID}-ways-to-pay-slide-close`)) {
      fireEvent('user clicks the close button within slideout');
      console.log('user clicks the close button within slideout');
    } else if (target.closest(`.${ID}-continue-shopping`)) {
      fireEvent('user clicks "Continue Shopping" within slideout');
      console.log('user clicks "Continue Shopping" within slideout');
    } 
  });

  // const buttons = document.querySelectorAll("#product-content .product-variations .sleeveContent .sleeveBtn");

  //     buttons.forEach(button => {
  //         button.addEventListener('click', function() {
  //             console.log('sleeve clicked')
  //           pollerLite(['#product-content'], () => {
  //             startExperiment();
  //           })

  //         });
  //     });


  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
