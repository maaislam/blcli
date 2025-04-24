import { fullStory, events } from '../../../../lib/utils';

/**
 * {{WB070}} - {{US context on PDP - V2 mobile}}
 */
const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'WB070',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const designerInformation = bodyVar.querySelector('.desiger-info');
      const imageGallery = bodyVar.querySelector('.row-fluid.product-row > .span7.product-image-column');
      const addToBag = bodyVar.querySelector('.span5.product-details-column > .row:not(.variant-row)');
      const wishlistIcon = bodyVar.querySelector('#pjax-container .wishlist-add-form-container');

      // Markup

      const belowDesigner = `
        <div class="WB070-Wrapper WB070-Top">
          <div class="WB070-Text-Wrapper">
            <p class="WB070-Text">Our London team curates unique, enduring pieces from the most exciting independent designers worldwide</p> 
          </div>
          <div class="WB070-Image-Wrapper">
            <img class="WB070-Swipe-Icon" src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/3108779834ed106ec451f5c8358acd30_108_164.png" alt="Swipe">
            <p class="WB070-Swipe-Text">Swipe to dismiss</p>
          </div>
        </div>
      `;

      const belowGallery = `
        <div class="WB070-Wrapper WB070-Middle">
          <div class="WB070-Text-Wrapper">
            <ul class="WB070-Text">
              <li class="WB070-Text-Item"> - Free 14 day returns worldwide</li>
              <li class="WB070-Text-Item"> - Our customer support team are here to help if you have any queries</li>
              <li class="WB070-Text-Item WB070-Hide"> - Free shipping from brands inside the US</li>
            </ul>
          </div>
          <div class="WB070-Image-Wrapper">
            <img class="WB070-Swipe-Icon" src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/3108779834ed106ec451f5c8358acd30_108_164.png" alt="Swipe">
            <p class="WB070-Swipe-Text">Swipe to dismiss</p>
          </div>
        </div>
      `;

      const belowAddToBag = `
      <div class="WB070-Wrapper WB070-Bottom">
        <div class="WB070-Text-Wrapper">
          <ul class="WB070-Text">
            <li class="WB070-Text-Item"> - Pay securely in USD $</li>
            <li class="WB070-Text-Item"> - Free returns within 14 days, no questions asked</li>
          </ul>
        </div>
        <div class="WB070-Image-Wrapper">
          <img class="WB070-Swipe-Icon" src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/3108779834ed106ec451f5c8358acd30_108_164.png" alt="Swipe">
          <p class="WB070-Swipe-Text">Swipe to dismiss</p>
        </div>
      </div>
      `;

      let topWrapper;
      let middleWrapper;
      let bottomWrapper;

      return {
        bodyVar,
        designerInformation,
        belowDesigner,
        belowGallery,
        imageGallery,
        addToBag,
        belowAddToBag,
        topWrapper,
        middleWrapper,
        bottomWrapper,
        wishlistIcon,
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
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Add markup
        Exp.cache.designerInformation.insertAdjacentHTML('afterend', Exp.cache.belowDesigner);
        Exp.cache.imageGallery.insertAdjacentHTML('afterend', Exp.cache.belowGallery);
        Exp.cache.addToBag.insertAdjacentHTML('afterend', Exp.cache.belowAddToBag);

        // Check if product is froma US brand, remove hiding class if it is

        if (window.universal_variable.product.designer_country_iso2 === 'US') {
          Exp.cache.bodyVar.querySelector('.WB070-Text-Item.WB070-Hide').classList.remove('WB070-Hide');
        }

        // Markup added, assign selectors - using jQuery for swipe handler
        Exp.cache.topWrapper = $('.WB070-Wrapper.WB070-Top');
        Exp.cache.middleWrapper = $('.WB070-Wrapper.WB070-Middle');
        Exp.cache.bottomWrapper = $('.WB070-Wrapper.WB070-Bottom');

        // Move wishlist icon

        Exp.cache.topWrapper.after(Exp.cache.wishlistIcon);

        this.setupFunctions();
      },
      setupFunctions() {
        // touch swipe
        /* eslint-disable */
        $.fn.touchwipe = function(settings) {
          var config = {
                 min_move_x: 30,
                 min_move_y: 20,
                  wipeLeft: function() { },
                  wipeRight: function() { },
                  wipeUp: function() { },
                  wipeDown: function() { },
                 preventDefaultEvents: true
          };
          
          if (settings) $.extend(config, settings);
      
          this.each(function() {
              var startX;
              var startY;
              var isMoving = false;
     
              function cancelTouch() {
                $('.WB070-Wrapper')[0].removeEventListener('touchmove', onTouchMove);
                  startX = null;
                  isMoving = false;
              }    
              
              function onTouchMove(e) {
                  if(config.preventDefaultEvents) {
                      e.preventDefault();
                  }
                  if(isMoving) {
                      var x = e.touches[0].pageX;
                      var y = e.touches[0].pageY;
                      var dx = startX - x;
                      var dy = startY - y;
                      if(Math.abs(dx) >= config.min_move_x) {
                        let swipedWrapper = $(e.target);
                         cancelTouch();
                         if(dx > 0) {
                                if (!e.target.classList.contains('WB070-Wrapper')) {
                                  $(e.target).closest('.WB070-Wrapper').slideUp();  
                                  swipedWrapper = $(e.target).closest('.WB070-Wrapper');
                                } else {
                                  $(e.target).slideUp();
                                };
                            }
                            else {
                                if (!e.target.classList.contains('WB070-Wrapper')) {
                                  $(e.target).closest('.WB070-Wrapper').slideUp(); 
                                  swipedWrapper = $(e.target).closest('.WB070-Wrapper'); 
                                } else {
                                  $(e.target).slideUp();
                              };
                            }

                            // Send event 

                            let eventSwipe = 'Top Message';

                            if (swipedWrapper.hasClass('WB070-Middle')) {
                              eventSwipe = 'Middle Message';
                            } else if (swipedWrapper.hasClass('WB070-Bottom')) {
                              eventSwipe = 'Bottom Message';
                            }

                            events.send(`${Exp.settings.ID}`, 'Message Swiped', eventSwipe);

                      } 
                    }
                  }
              
              function onTouchStart(e)
              {
                  if (e.touches.length == 1) {
                      startX = e.touches[0].pageX;
                      startY = e.touches[0].pageY;
                      isMoving = true;
                      this.addEventListener('touchmove', onTouchMove, false);
                  }
              }         
              if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false);
              }
          });
      
          return this;
        };
        // Add event handlers
        $('.WB070-Wrapper').touchwipe({
          min_move_x: 100,
          preventDefaultEvents: true
        });
         /* eslint-enable */
      },
    },
  };

  Exp.init();
};

export default Run;
