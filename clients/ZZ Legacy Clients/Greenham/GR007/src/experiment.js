import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';


/**
 * {{GR007}} - {{Request Trade Prices Link under Prices}}
 */

const ActivateProductPage = () => {
  const $ = window.jQuery;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GR007',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Inc VAT price container
      const incVATPriceContainer = bodyVar.querySelector('.secLinePrice');
      // Reassigned when modal is added to DOM
      let GR007Modal;
      let $GR007Modal;

      return {
        docVar,
        bodyVar,
        incVATPriceContainer,
        GR007Modal,
        $GR007Modal,
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Insert modal link after inc VAT price
        Exp.render.modalLink();
        // Insert modal
        Exp.render.modalMarkup();
        // Assign selectors
        Exp.cache.GR007Modal = Exp.cache.bodyVar.querySelector('.GR007_pop-up_modal');
        Exp.cache.$GR007Modal = $(Exp.cache.GR007Modal);
        // Add event listeners
        Exp.bindExperimentEvents.modalLinkClick();
        Exp.bindExperimentEvents.closeModal();
        // Exp.bindExperimentEvents.trackCreateAccountButton();
      },
    },
    render: {
      modalLink() {
        Exp.cache.incVATPriceContainer.insertAdjacentHTML('afterend', `
        <div class="GR007_RTP_Container">
          <span class="GR007_RTP_Text">Request Trade Prices</span>
        </div>
        `);
      },
      modalMarkup() {
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
          <div class="GR007_pop-up_modal">
            <div class="GR007_body_click"></div>
            <div class="GR007_inner_div">
              <a class="GR007_close_btn">✕</a>
              <div class="GR007_overflow_fix">
                <div class="GR007_Modal_Content_Container">
                  <img class="GR007_Modal_Logo" src="/medias/sys_master/email/email/hff/hfe/8842970234910/logo.png" alt="Greenham Logo" />
                  <h3 class="GR007_Modal_Header">Need Trade Prices?<br />Give us a Call on 0845 300 6672</h3>
                  <span class="GR007_Modal_Text">Don’t have a trade account with us? Enquire today when you're connected.</span>
                  <span class="GR007_Sign_In_Text">If you already have a login <a href="/login" class="GR007_Sign_In_Link">Sign In</a> now to see your contracted prices.</span>
                </div>
              </div>
            </div>
          </div>`);
      },
    },
    bindExperimentEvents: {
      modalLinkClick() {
        Exp.cache.bodyVar.querySelector('.GR007_RTP_Text').addEventListener('click', () => {
        // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Request Trade Prices', { sendOnce: true });
          slideQ = true;
          Exp.cache.$GR007Modal.fadeIn('slow', () => {
            Exp.cache.GR007Modal.classList.add('GR007_active');
            slideQ = false;
          });
        });
      },
      closeModal() {
        Exp.cache.GR007Modal.addEventListener('click', (e) => {
          if (slideQ === false && (e.target.classList.contains('GR007_close_btn') || e.target.classList.contains('GR007_body_click'))) {
            slideQ = true;
            Exp.cache.$GR007Modal.fadeOut('slow', () => {
              Exp.cache.GR007Modal.classList.remove('active');
              slideQ = false;
            });
          }
        });
      },
      // Client amend, no longer needed
      // trackCreateAccountButton() {
      // eslint-disable-next-line
      //   Exp.cache.bodyVar.querySelector('.GR007_Create_Account_Link').addEventListener('click', () => {
      //     // Send event
      // eslint-disable-next-line
      //     events.send(`${Exp.settings.ID}`, 'Clicked', 'Create Account Button in Pop Up', { sendOnce: true });
      //   });
      // },
    },
  };

  Exp.init();
};

const ActivateCategoryPage = () => {
  const $ = window.jQuery;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GR007',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // All product Areas
      const allProductAreas = bodyVar.querySelectorAll('.prod_cols');
      // Reassigned when modal is added to DOM
      let GR007Modal;
      let $GR007Modal;

      return {
        docVar,
        bodyVar,
        allProductAreas,
        GR007Modal,
        $GR007Modal,
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Insert request trade prices links, under prices
        Exp.render.modalLinks();
        // Insert modal
        Exp.render.modalMarkup();
        // Assign selectors
        Exp.cache.GR007Modal = Exp.cache.bodyVar.querySelector('.GR007_pop-up_modal');
        Exp.cache.$GR007Modal = $(Exp.cache.GR007Modal);
        // Bind event listeners
        Exp.bindExperimentEvents.closeModal();
        // Exp.bindExperimentEvents.trackCreateAccountButton();
      },
    },
    render: {
      modalLinks() {
        const modalLinkMarkup = `
        <div class="GR007_RTP_Container">
          <span class="GR007_RTP_Text">Request Trade Prices</span>
        </div>
        `;
        for (let i = 0; i < Exp.cache.allProductAreas.length; i += 1) {
          const currentProductArea = Exp.cache.allProductAreas[i];
          currentProductArea.querySelector('.pd3-addto').insertAdjacentHTML('afterend', modalLinkMarkup);
          // Add event listener to newly added markup
          currentProductArea.querySelector('.GR007_RTP_Text').addEventListener('click', Exp.bindExperimentEvents.modalLinkClick);
        }
      },
      modalMarkup() {
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
          <div class="GR007_pop-up_modal">
            <div class="GR007_body_click"></div>
            <div class="GR007_inner_div">
              <a class="GR007_close_btn">✕</a>
              <div class="GR007_overflow_fix">
                <div class="GR007_Modal_Content_Container">
                  <img class="GR007_Modal_Logo" src="/medias/sys_master/email/email/hff/hfe/8842970234910/logo.png" alt="Greenham Logo" />
                  <h3 class="GR007_Modal_Header">Need Trade Prices?<br />Give us a Call on 0845 300 6672</h3>
                  <span class="GR007_Modal_Text">Don’t have a trade account with us? Enquire today when you're connected.</span>
                  <span class="GR007_Sign_In_Text">If you already have a login <a href="/login" class="GR007_Sign_In_Link">Sign In</a> now to see your contracted prices.</span>
                </div>
              </div>
            </div>
          </div>`);
      },
    },
    bindExperimentEvents: {
      modalLinkClick() {
        // Send event
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Request Trade Prices', { sendOnce: true });
        slideQ = true;
        Exp.cache.$GR007Modal.fadeIn('slow', () => {
          Exp.cache.GR007Modal.classList.add('GR007_active');
          slideQ = false;
        });
      },
      closeModal() {
        Exp.cache.GR007Modal.addEventListener('click', (e) => {
          if (slideQ === false && (e.target.classList.contains('GR007_close_btn') || e.target.classList.contains('GR007_body_click'))) {
            slideQ = true;
            Exp.cache.$GR007Modal.fadeOut('slow', () => {
              Exp.cache.GR007Modal.classList.remove('active');
              slideQ = false;
            });
          }
        });
      },
      // Client amend, no longer needed
      // trackCreateAccountButton() {
      // eslint-disable-next-line
      //   Exp.cache.bodyVar.querySelector('.GR007_Create_Account_Link').addEventListener('click', () => {
      //     // Send event
      // eslint-disable-next-line
      //     events.send(`${Exp.settings.ID}`, 'Clicked', 'Create Account Button in Pop Up', { sendOnce: true });
      //   });
      // },
    },
  };

  Exp.init();
};

const ActivateHomePage = () => {
  const $ = window.jQuery;
  let slideQ = false;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GR007',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const carouselProductContainer = bodyVar.querySelector('.jcarousel.jcarousel-clip.jcarousel-clip-horizontal');
      // Reassigned when modal is added to DOM
      let GR007Modal;
      let $GR007Modal;

      return {
        docVar,
        bodyVar,
        carouselProductContainer,
        GR007Modal,
        $GR007Modal,
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Add event listener to carousel product parent
        Exp.bindExperimentEvents.handleProductClick();
        // Insert modal
        Exp.render.modalMarkup();
        // Assign selectors
        Exp.cache.GR007Modal = Exp.cache.bodyVar.querySelector('.GR007_pop-up_modal');
        Exp.cache.$GR007Modal = $(Exp.cache.GR007Modal);
      },
    },
    render: {
      modalLink() {
        Exp.cache.bodyVar.querySelector('.prod_add_to_cart').insertAdjacentHTML('beforebegin', `
        <div class="GR007_RTP_Container">
          <span class="GR007_RTP_Text">Request Trade Prices</span>
        </div>
        `);
      },
      modalMarkup() {
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
          <div class="GR007_pop-up_modal">
            <div class="GR007_body_click"></div>
            <div class="GR007_inner_div">
              <a class="GR007_close_btn">✕</a>
              <div class="GR007_overflow_fix">
                <div class="GR007_Modal_Content_Container">
                  <img class="GR007_Modal_Logo" src="/medias/sys_master/email/email/hff/hfe/8842970234910/logo.png" alt="Greenham Logo" />
                  <h3 class="GR007_Modal_Header">Need Trade Prices?<br />Give us a Call on 0845 300 6672</h3>
                  <span class="GR007_Modal_Text">Don’t have a trade account with us? Enquire today when you're connected.</span>
                  <span class="GR007_Sign_In_Text">If you already have a login <a href="/login" class="GR007_Sign_In_Link">Sign In</a> now to see your contracted prices.</span>
                </div>
              </div>
            </div>
          </div>`);
      },
    },
    bindExperimentEvents: {
      modalLinkClick() {
        Exp.cache.bodyVar.querySelector('.GR007_RTP_Text').addEventListener('click', () => {
        // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Request Trade Prices', { sendOnce: true });
          slideQ = true;
          Exp.cache.$GR007Modal.fadeIn('slow', () => {
            Exp.cache.GR007Modal.classList.add('GR007_active');
            slideQ = false;
          });
        });
      },
      closeModal() {
        Exp.cache.GR007Modal.addEventListener('click', (e) => {
          if (slideQ === false && (e.target.classList.contains('GR007_close_btn') || e.target.classList.contains('GR007_body_click'))) {
            slideQ = true;
            Exp.cache.$GR007Modal.fadeOut('slow', () => {
              Exp.cache.GR007Modal.classList.remove('active');
              slideQ = false;
            });
          }
        });
      },
      handleProductClick() {
        // Bind event listener to product container
        Exp.cache.carouselProductContainer.addEventListener('click', (e) => {
          const el = e.target;
          if (el.tagName !== 'DIV') {
            pollerLite([
              '.prod_add_to_cart', // Add to cart
            ], Exp.bindExperimentEvents.activateTest);
          }
        });
      },
      activateTest() {
        if (!Exp.cache.bodyVar.querySelector('.GR007_RTP_Container')) {
          // Render link
          Exp.render.modalLink();
          // Add event listeners
          Exp.bindExperimentEvents.modalLinkClick();
          Exp.bindExperimentEvents.closeModal();
        }
      },
    },
  };

  Exp.init();
};
export { ActivateProductPage, ActivateCategoryPage, ActivateHomePage };
