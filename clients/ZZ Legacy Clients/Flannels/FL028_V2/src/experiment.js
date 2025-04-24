import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL028_V2}} - {{Wishlist - Desktop}}
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
      VARIATION: '2',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Add to wishlist button text
      const ATWLText = docVar.getElementById('dnn_ctr176031_ViewTemplate_ctl00_ctl13_lblWishListToLoginButton');
      // Add to wishlist button
      const ATWLButton = docVar.getElementById('dnn_ctr176031_ViewTemplate_ctl00_ctl13_aWishListToLogin');
      // Add to bag button
      const ATBButton = docVar.getElementById('dnn_ctr176031_ViewTemplate_ctl00_ctl12_aAddToBag');
      // Add to wishlist container
      const ATWLContainer = docVar.getElementById('addToWishListContainer');
      // Minicart
      const miniCart = docVar.getElementById('divBagItems');
      // Add to bag container
      const ATBContainer = docVar.getElementById('dnn_ctr176031_ViewTemplate_ctl00_ctl12_sAddToBagWrapper');
      // added to bag message - Reassigned when test markup is added to the DOM
      let ATBMessage;
      // Next line exceeds length
      // eslint-disable-next-line
      // Prevents multiple clicks to the add to wishlist button at once - reassigned in ATWLButtonClick function
      // eslint-disable-next-line
      let allowATWL = true;

      return {
        docVar,
        bodyVar,
        ATWLText,
        ATWLButton,
        ATBButton,
        ATWLContainer,
        ATBMessage,
        allowATWL,
        miniCart,
        ATBContainer,
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
        Exp.cache.ATBMessage = $('.FL028_V2_Added_Text');
        // Add functionality
        Exp.bindExperimentEvents.ATWLButtonClick();
      },
    },
    render: {
      ATWLText() {
        // change text content based on previous text
        if (Exp.cache.ATWLText.textContent.toUpperCase().trim() !== 'SAVE FOR LATER') {
          Exp.cache.ATWLText.textContent = 'Save for later';
        } else {
          Exp.cache.ATWLText.textContent = 'Saved for later';
        }
      },
      AddedToWishListText() {
        Exp.cache.ATWLContainer.insertAdjacentHTML('beforeend', `
        <span class="FL028_V2_Added_Text">Item Saved<br />You can find this item in your bag</span>
        `);
      },
      preventAddToBagDIV() {
        Exp.cache.ATBButton.insertAdjacentHTML('afterend', `
          <div class="FL028_V2_Prevent_ATB_DIV"></div>
        `);
      },
    },
    bindExperimentEvents: {
      // Add an event listener to the ad to wish list button
      ATWLButtonClick() {
        Exp.cache.ATWLButton.addEventListener('click', (e) => {
          // Prevent redirect to login page
          e.preventDefault();
          if (Exp.cache.allowATWL) {
            // Click the add to bag button
            Exp.cache.ATBButton.click();
            // Check if add to bag error message exists, if not then add to bag succesful
            // Wait for validation
            setTimeout(() => {
              if (!Exp.cache.bodyVar.querySelector('.popover.SelectSizePopover.bottom.in')) {
                // Send event
                events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', `Save for later - ${Exp.settings.ID}`, { sendOnce: true });
                // Add to bag successful
                // Toggle styling class on add to bag button - QA Amend
                Exp.cache.ATBButton.classList.toggle('FL028_V2_Fade_Out');
                Exp.cache.ATBContainer.classList.toggle('FL028_V2_Prevent_ATB');
                // Prevent multiple clicks
                Exp.cache.allowATWL = false;
                // Change button text
                Exp.render.ATWLText();
                // Add styling class to prevent minibag from showing
                Exp.cache.miniCart.classList.toggle('FL028_V2_Hide');
                // slide down message
                Exp.cache.ATBMessage.slideDown('slow', () => {
                  // set timeout to wait five seconds to slideup message
                  setTimeout(() => {
                    Exp.cache.ATBMessage.slideUp('slow', () => {
                      // Reset above changes
                      // Reset add to wishlist text
                      Exp.render.ATWLText();
                      // Remove styling classclasses
                      Exp.cache.ATBButton.classList.toggle('FL028_V2_Fade_Out');
                      Exp.cache.miniCart.classList.toggle('FL028_V2_Hide');
                      Exp.cache.ATBContainer.classList.toggle('FL028_V2_Prevent_ATB');
                      // Reset style attribute - otherwise basket display function is out of sync
                      Exp.cache.miniCart.style.display = 'none';
                      // Allow next click
                      Exp.cache.allowATWL = true;
                    });
                  }, 3000);
                });
              }
            }, 50);
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
