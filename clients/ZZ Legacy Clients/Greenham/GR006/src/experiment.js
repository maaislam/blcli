import { fullStory } from '../../../../lib/utils';


/**
 * {{GR006}} - {{Homepage Redesign - Desktop}}
 */

const Run = () => {
  // const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GR006',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const bannerCarousel = bodyVar.querySelector('.span-18.section2.cms_banner_slot.last > .slider_component');
      const SOCarousel = bodyVar.querySelector('.span-18.section5.cms_banner_slot.last');
      const footerContainer = docVar.getElementById('footer');
      const newsletterSignupContainer = bodyVar.querySelector('.news_signup');
      const categoryBlock = bodyVar.querySelector('.greenham_home_categories');
      const newsletterTextInput = bodyVar.querySelector('#news_signup_subscribe_form > p input');
      const newsletterSubmitButton = docVar.getElementById('enquireBtnNewsletter');
      const SOCarouselHeader = bodyVar.querySelector('.home_product_carousel .title_holder');

      return {
        docVar,
        bodyVar,
        SOCarousel,
        bannerCarousel,
        footerContainer,
        newsletterSignupContainer,
        categoryBlock,
        newsletterTextInput,
        newsletterSubmitButton,
        SOCarouselHeader,
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
      // Event template
      // events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      // eslint-disable-next-line
      // events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Action', 'Label', { sendOnce: true });
      // Flannels event
      // eslint-disable-next-line
      // events.send(settings.ID, 'View', `${settings.ID} Variation ${settings.VARIATION}`, { sendOnce: true });
      // const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      // hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        // eslint-disable-next-line
        // events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Move special offers carousel to after banner carousel
        Exp.cache.bannerCarousel.insertAdjacentElement('afterend', Exp.cache.SOCarousel);
        // Render free delivery banner
        Exp.render.freeDeliveryBanner();
        // Move newsletter signup
        Exp.cache.categoryBlock.insertAdjacentElement('afterend', Exp.cache.newsletterSignupContainer);
        // Reset placeholder value to empty onload, currently as 'your email address'
        Exp.cache.newsletterTextInput.value = '';
        // Add placeholder of newsletter signup
        Exp.cache.newsletterTextInput.placeholder = 'Enter email address...';
        // Add text to newsletter submit button, element is input type=submit
        Exp.cache.newsletterSubmitButton.value = 'Go!';
        // Insert carousel header
        Exp.render.carouselHeader();
        // Render footer
        Exp.render.footerContact();
      },
    },
    render: {
      carouselHeader() {
        Exp.cache.SOCarouselHeader.insertAdjacentHTML('beforeend', `
          <h3 class="GR006_SOCarousel_Header">Special Offers</h3>
          <span class="GR006_SOCarousel_Sub_Header">While stocks last!</span>
        `);
      },
      freeDeliveryBanner() {
        Exp.cache.SOCarousel.insertAdjacentHTML('afterend', `
        <div class="GR006_Free_Delivery_Banner_Container">
          <span class="GR006_Free_Delivery_Text"><span class="GR006_FD_Upper">free delivery</span> on all <span class="GR006_FD_Upper GR006_Text_Green">online</span> orders</span>
        </div>
        `);
      },
      footerContact() {
        Exp.cache.footerContainer.insertAdjacentHTML('afterbegin', `
        <div class="GR006_Contact_Container">
          <div class="GR006_Social_Media_container">
            <span class="GR006_Contact_Text GR006_Social_Media_Text">Get in touch...</span>
            <a class="GR006_Social_Media_Link" href="https://www.facebook.com/pages/Greenham-Safety-Workplace-Supplies/549238305102367" target="_blank">
              <img class="GR006_Social_Media_Icon GR006_Facebook_Icon" src="//d191y0yd6d0jy4.cloudfront.net/2otu93j9n6ds35i.png" alt="Facebook" />
            </a>
            <a class="GR006_Social_Media_Link" href="https://twitter.com/GreenhamBunzl" target="_blank">
              <img class="GR006_Social_Media_Icon GR006_Twitter_Icon" src="//d191y0yd6d0jy4.cloudfront.net/mhoelamem4t9ttd.png" alt="Twitter" />
            </a>
            <a class="GR006_Social_Media_Link" href="https://www.youtube.com/channel/UCz1N4yblw8DCt2i9ACiztBg" target="_blank">
              <img class="GR006_Social_Media_Icon GR006_Youtube_Icon" src="//d191y0yd6d0jy4.cloudfront.net/qdfqw3buulx0dtu.png" alt="Youtube" />
            </a>
            <a class="GR006_Social_Media_Link" href="https://www.linkedin.com/company/bunzlgreenham/" target="_blank">
              <img class="GR006_Social_Media_Icon GR006_LinkedIn_Icon" src="//d191y0yd6d0jy4.cloudfront.net/0yzbjshwypza4uy.png" alt="LinkedIn" />
            </a>
          </div>
          <div class="GR006_Pulse_Container">
            <a class="GR006_Pulse_Link" href="http://pulse.greenham.com/">
              <span class="GR006_Contact_Text GR006_Pulse_Text">Stay updated with pulse</span>
              <img class="GR006_Pulse_Icon" src="//d191y0yd6d0jy4.cloudfront.net/4yrkr2zsh4f8q9c.png" alt="Pulse" />
            </a>
          </div>
          <a class="GR006_Feedback_Link GR006_Contact_Text" href="/Customer-Feedback-Greenham/cf/greenham_ppe">Leave your <span class="GR006_Feedback_Text GR006_Contact_Text">feedback</span></a>
        </div>
        `);
      },
    },
  };

  Exp.init();
};

export default Run;
