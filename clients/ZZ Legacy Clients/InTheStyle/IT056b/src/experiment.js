/* eslint-disable */
import { fullStory, setCookie, getCookie, events } from '../../../../lib/utils';

/**
 * {{IT056b}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'IT056b',  
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
 

    // Has the popup been displayed? If true, return
    const seenPopup = getCookie('seenPopup');
    if (seenPopup) { return }

    // Is the user on the register page?
    const regUrl = window.location.pathname.match('customer/account/create');
    if (regUrl) {
      setCookie('userVisitedRegister', true, 970);
      return;
    }
    const visitedRegister = getCookie('userVisitedRegister');

    // Is the user on the cart page?
    const cartUrl = window.location.pathname.match('checkout/cart');
    if (cartUrl && visitedRegister) {
      
          // Create popup 
          const popup = () => {
            let popupDiv = document.createElement('div');
            popupDiv.classList.add('it56-popup');
            const html = `
              <div class="it56-popup--container">
                <div class="it56-popup--wrap">	
                  <div id="it56-close" class="it56-popup--close">
                    <span></span>
                    <span></span>
                  </div>
      
                  <div class="it56-popup--content">
                    <div class="it56-popup--image"></div>
      
                    <p>oh hey NEWBIE!</p>
      
                    <h1>want 20% off your first order?</h1>
      
                    <p>use code: WELCOME20 in your shopping bag</p>
                    
                  </div>
      
                  <div class="it56-popup--exclusions">
                    <p>*Excludes sale. Valid only on first order.</p>
                  </div>
                </div>
              </div>
            `;
      
            popupDiv.innerHTML = html;
            return popupDiv;
      
          };
          popup();
          
          const appendPopup = () => {
            let popupHTML = popup();
            document.body.appendChild(popupHTML);
      
            // event tracking
            events.send('IT056', 'Popup', 'Popup has been displayed', {sendOnce: true});

            setCookie('seenPopup', true, 970);
          };
          appendPopup();  
      
          const controlPopup = (() => {
            let closeBtn = document.querySelector('#it56-close');
            const popup = document.querySelector('.it56-popup');
            const popupWrap = document.querySelector('.it56-popup--wrap');
      
            // Close X
            if (popup) {
              closeBtn.addEventListener('click', function() {
                popup.parentNode.removeChild(popup);
              });
              // Outside of box
              popup.addEventListener('click', function() {
                popup.parentNode.removeChild(popup);
              });
              popupWrap.addEventListener('click', function(e) {
                e.stopPropagation();
              });
              // Escape key
              document.onkeydown = function(evt) {
                evt = evt || window.event;
                if (evt.keyCode == 27) {
                  popup.parentNode.removeChild(popup);
                }
              };
            }
          })();

    }



  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
