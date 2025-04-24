import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL028}} - {{Wishlist - Desktop}}
 */

const Run = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL028',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Add to wishlist button text
      const ATBButton = bodyVar.querySelector('.BasketWishContainer .addToBasketContainer .addToBag');
      // Add to wishlist button
      const ATWLButton = bodyVar.querySelector('.BasketWishContainer #addToWishListContainer > span > a');
      // Add to bag button

      const ATBUpperWrap = bodyVar.querySelector('.BasketWishContainer .addToBasketContainer');
      
      // Add to wishlist container
      const ATWLContainer = docVar.getElementById('addToWishListContainer');
      
      // Minicart
      const miniCart = docVar.getElementById('divBagItems');
      // added to bag message - Reassigned when test markup is added to the DOM
      const ATBContainer = bodyVar.querySelector('.BasketWishContainer .ImgButWrap');
      const sizeInputWrap = bodyVar.querySelector('#productVariantAndPrice .swapSize');

      let ATBMessage;
      let allowATWL = true;

      return {
        docVar,
        bodyVar,
        ATWLButton,
        ATBButton,
        ATWLContainer,
        ATBMessage,
        allowATWL,
        miniCart,
        ATBContainer,
        ATBUpperWrap,
        sizeInputWrap,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      Exp.services.removeFlicker();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
      removeFlicker: () => {
        const hide = document.getElementById(`${Exp.settings.ID}_flickerPrevention`);
        if (hide) {
          hide.parentElement.removeChild(hide);
        }
      },
    },
    components: {
      setupElements() {
        // Render new text for add to wishlist button
        Exp.render.ATWLText();
        // Render added to basket text
        Exp.render.AddedToWishListText();
        Exp.render.preventAddToBagDIV();
        // Store selector to added message for sliding
        Exp.cache.ATBMessage = $('.FL028_Added_Text');
        // Add functionality
        Exp.bindExperimentEvents.ATWLButtonClick();
      },
    },
    render: {
      ATWLText() {
        // Move Add to bag button next to color field
        Exp.cache.bodyVar.querySelector('#divColour').nextElementSibling.parentNode.insertBefore(Exp.cache.ATBContainer, Exp.cache.bodyVar.querySelector('#divColour').nextElementSibling);
        Exp.cache.sizeInputWrap.insertAdjacentHTML('afterend', '<a class="FL028_wishlist_submit">Add to wishlist</a>');
      },
      AddedToWishListText() {
        document.querySelector('.FL028_wishlist_submit').insertAdjacentHTML('afterend', `
        <span class="FL028_Added_Text">Item Added<br />You can find this item in your bag</span>
        `);
      },
      preventAddToBagDIV() {
        Exp.cache.ATBButton.insertAdjacentHTML('afterend', `
          <div class="FL028_Prevent_ATB_DIV"></div>
        `);
      },
    },
    bindExperimentEvents: {
      // Add an event listener to the ad to wish list button
      ATWLButtonClick() {
        document.querySelector('.FL028_wishlist_submit').addEventListener('click', () => {
          // Prevent redirect to login page
          if (Exp.cache.allowATWL) {
            // Click the add to bag button
            Exp.cache.ATBButton.click();
            // Check if add to bag error message exists, if not then add to bag succesful
            // Wait for validation
            setTimeout(() => {
              console.log(Exp.cache.bodyVar.querySelector('.popover.SelectSizePopover.bottom.in'));
              if (!Exp.cache.bodyVar.querySelector('.popover.SelectSizePopover.bottom.in')) {
                // Send event
                events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', `Add to wishlist - ${Exp.settings.ID}`, { sendOnce: true });
                // Add to bag successful
                // Toggle styling class on add to bag button - QA Amend
                Exp.cache.ATBButton.classList.toggle('FL028_Fade_Out');
                // Prevent multiple clicks
                Exp.cache.allowATWL = false;
                // Change button text
                // Add styling class to prevent minibag from showing/being used
                Exp.cache.miniCart.classList.toggle('FL028_Hide');
                Exp.cache.ATBContainer.classList.toggle('FL028_Prevent_ATB');
                // slide down message
                Exp.cache.ATBMessage.slideDown('slow', () => {
                  // set timeout to wait five seconds to slideup message
                  setTimeout(() => {
                    Exp.cache.ATBMessage.slideUp('slow', () => {
                      // Reset above changes
                      // Reset add to wishlist text
                      // Remove styling classes
                      Exp.cache.ATBButton.classList.toggle('FL028_Fade_Out');
                      Exp.cache.miniCart.classList.toggle('FL028_Hide');
                      Exp.cache.ATBContainer.classList.toggle('FL028_Prevent_ATB');
                      // Reset style attribute - otherwise basket display function is out of sync
                      Exp.cache.miniCart.style.display = 'none';
                      // Allow next click
                      Exp.cache.allowATWL = true;
                    });
                  }, 1000);
                });
              }
            }, 3000);
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
