import { fullStory, events } from '../../../../lib/utils';

/**
 * {{GR027}} - {{Homepage Redesign}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GR027',
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
      const oldBannerSlides = bodyVar.querySelectorAll('#homepage_slider > ul > li');
      const bannerCarouselMarkup = `
      <section class="landing_wrap GR027_Banner_Carousel">
        <div class="landing_slider"> 
          <div class="GR027_Slider_Wrap">
          </div>
        </div>
      </section>
      `;
      // Reassigned when initialising slick

      let GR027SlickParent;

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
        bannerCarouselMarkup,
        oldBannerSlides,
        GR027SlickParent,
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
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
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
        // Render carousel
        Exp.render.bannerCarousel();
        // Render Offer blocks
        Exp.render.offerBlocks();
        // Render free delivery banner
        Exp.render.freeDeliveryBanner();
        // Move category blocks after free delivery banner
        Exp.cache.bodyVar.querySelector('.GR027_Free_Delivery_Banner_Container').insertAdjacentElement('afterend', Exp.cache.categoryBlock);
        // Special offers carousel may not exist, decide how to render page
        if (Exp.cache.SOCarousel && Exp.cache.SOCarouselHeader) {
          // Move special offers carousel after category blocks
          Exp.cache.categoryBlock.insertAdjacentElement('afterend', Exp.cache.SOCarousel);
          // Move newsletter signup - after special offers carousel
          Exp.cache.SOCarousel.insertAdjacentElement('afterend', Exp.cache.newsletterSignupContainer);
          // Render carousel header
          Exp.render.carouselHeader();
        } else {
          // Move newsletter signup - after category blocks
          Exp.cache.categoryBlock.insertAdjacentElement('afterend', Exp.cache.newsletterSignupContainer);
        }
        // Reset placeholder value to empty onload, currently as 'your email address'
        Exp.cache.newsletterTextInput.value = '';
        // Add placeholder of newsletter signup
        Exp.cache.newsletterTextInput.placeholder = 'Enter email address...';
        // Add text to newsletter submit button, element is input type=submit
        Exp.cache.newsletterSubmitButton.value = 'Go!';
        // Render footer
        Exp.render.footerContact();
      },
    },
    render: {
      bannerCarousel() {
        const GR027BannerCarousel = () => {
          // Insert Markup
          Exp.cache.bannerCarousel.insertAdjacentHTML('afterend', Exp.cache.bannerCarouselMarkup);
          // Assign Selectors
          Exp.cache.GR027SlickParent = Exp.cache.bodyVar.querySelector('.GR027_Slider_Wrap');
          Exp.cache.bodyVar.querySelector('.landing_wrap.GR027_Banner_Carousel').className = 'GR027_landing_wrap GR027_Banner_Carousel';
          Exp.cache.GR027SlickParent.classList.add('GR027_landing_slider');
          Exp.cache.GR027SlickParent.classList.remove('landing_slider');
          Exp.cache.GR027SlickParent = $(Exp.cache.GR027SlickParent);
          // Build slides based on old carousel content
          for (let i = 0; i < Exp.cache.oldBannerSlides.length; i += 1) {
            const currentSlide = Exp.cache.oldBannerSlides[i];
            const currentAlt = currentSlide.querySelector('img').getAttribute('alt');
            const currentImage = currentSlide.querySelector('img').getAttribute('src');
            const currentLink = currentSlide.querySelector('a').getAttribute('href');
            let currentSlideMarkup = `
            <div class="GR027_Slide_Container">
              <a class="GR027_Slide_Link" href="${currentLink}">
                <img class="GR027_Slide_Image" src="${currentImage}" alt="${currentAlt}"/>
              </a>
            </div>
            `;
            // check current link, if link is for greenham pulse, then set target attribute
            if (currentLink.indexOf('pulse.greenham.com') > 1) {
              currentSlideMarkup = `
              <div class="GR027_Slide_Container">
                <a class="GR027_Slide_Link" href="${currentLink}" target="_blank">
                  <img class="GR027_Slide_Image" src="${currentImage}" alt="${currentAlt}"/>
                </a>
              </div>
              `;
            }
            Exp.cache.GR027SlickParent[0].insertAdjacentHTML('beforeend', currentSlideMarkup);
          }
          Exp.cache.GR027SlickParent.slick({
            dots: true,
            infinite: true,
            autoplay: true,
            slidesToShow: 1,
            autoplaySpeed: 5000,
            slidesToScroll: 1,
            arrows: false,
            customPaging: (slick, index) => {
              const targetText = slick.$slides.eq(index).find('img').attr('alt') || '';
              return `<span class="GR027_Slider_Button">${targetText}</span>`;
            },
          });
        };

        if ($.fn.slick) {
          GR027BannerCarousel();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', GR027BannerCarousel);
        }
      },
      offerBlocks() {
        const largeOfferData = {
          link: '/Special-Offers~c~D?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=Winter_Essentials_17122018',
          img: '//cdn-sitegainer.com/x1ylhrys5mi5f8r.jpg',
          alt: 'Winter Essentials 50% promo',
        };

        const offerData = [
          { img: '//cdn-sitegainer.com/4klwgs36y9gv6lm.jpg', alt: '6 Cu Ft Stackable Grit/Salt Bins', link: '/Contractors-Equipment/Traffic-Management/Cold-Weather-Equipment/6-Cu-Ft-Stackable-Grit-Salt-Bins~p~902000?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=902000_17122018' },
          { img: '//cdn-sitegainer.com/fax7cpdatfkzxlo.jpg', alt: 'Oakland Safety Goal Post System', link: '/Special-Offers/Oakland-Safety-Goal-Post-System~p~903013?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=903013_17122018' },
          { img: '//cdn-sitegainer.com/yp3wvgptkr0qame.jpg', alt: 'Pristine Pink Pearl Hand Soap', link: '/Cleaning-and-Hygiene/Washroom/Liquid-Soap-and-Sanitisers/Pristine-Pink-Pearl-Hand-Soap~p~948222?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=948222_17122018' },
          { img: '//cdn-sitegainer.com/vbngees15e932it.jpg', alt: 'Helly Hansen Lifa Pants', link: '/Special-Offers/Helly-Hansen-Lifa-Pants~p~985347?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=985347_17122018' },
          { img: '//cdn-sitegainer.com/e072gl13xrxcdvn.jpg', alt: 'Sioen Flexothane Classic Waterproof Coverall', link: '/Special-Offers/Sioen-Flexothane-Classic-Waterproof-Coverall~p~943609?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=943609_17122018' },
          { img: '//cdn-sitegainer.com/pqa68hre6mp3wgl.jpg', alt: 'MASCOT ADVANCED Jacket with CLIMASCOT', link: '/Special-Offers/MASCOT-ADVANCED-Jacket-with-CLIMASCOT~p~908243?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=908243_17122018' },
        ];

        Exp.cache.bannerCarousel.insertAdjacentHTML('afterend', `
          <div class="GR027_Offers_Blocks_Container">
            <div class="GR027_Large_Offer_Block_Wrap">
              <a class="GR027_Large_Link" href="${largeOfferData.link}">
                <img class="GR027_Large-Category_Image" src="${largeOfferData.img}" alt="${largeOfferData.alt}"/>
              </a>
            </div>
            <div class="GR027_Small_Offer_Blocks_Container">
            </div>
          </div>
        `);

        const smallOfferContainer = Exp.cache.bodyVar.querySelector('.GR027_Small_Offer_Blocks_Container');

        // Iterate over offer data and render markup
        for (let i = 0; i < offerData.length; i += 1) {
          smallOfferContainer.insertAdjacentHTML('beforeend', `
            <div class="GR027_Small_Offer_Block">
              <a href="${offerData[i].link}" class="GR027_Small_Link">
                <img class="GR027_Small_Offer_Image" src="${offerData[i].img}" alt="${offerData[i].alt}"/>
              </a>
            </div>
          `);
        }
      },
      carouselHeader() {
        Exp.cache.SOCarouselHeader.insertAdjacentHTML('beforeend', `
          <h3 class="GR027_SOCarousel_Header">Special Offers</h3>
          <span class="GR027_SOCarousel_Sub_Header">While stocks last!</span>
        `);
      },
      freeDeliveryBanner() {
        Exp.cache.bodyVar.querySelector('.GR027_Offers_Blocks_Container').insertAdjacentHTML('afterend', `
        <div class="GR027_Free_Delivery_Banner_Container">
          <img class="GR027_Free_Delivery_Icon" src="//d191y0yd6d0jy4.cloudfront.net/ax43zl77cci7rsh.png" alt="Free Delivery" />
          <span class="GR027_Free_Delivery_Text"><span class="GR027_FD_Upper">free delivery</span> on all <span class="GR027_FD_Upper GR027_Text_Green">online</span> orders</span>
        </div>
        `);
      },
      footerContact() {
        Exp.cache.footerContainer.insertAdjacentHTML('afterbegin', `
        <div class="GR027_Contact_Container">
          <div class="GR027_Social_Media_container">
            <span class="GR027_Contact_Text GR027_Social_Media_Text">Get in touch...</span>
            <a class="GR027_Social_Media_Link" href="https://www.facebook.com/pages/Greenham-Safety-Workplace-Supplies/549238305102367" target="_blank">
              <img class="GR027_Social_Media_Icon GR027_Facebook_Icon" src="//d191y0yd6d0jy4.cloudfront.net/2otu93j9n6ds35i.png" alt="Greenham Facebook" />
            </a>
            <a class="GR027_Social_Media_Link" href="https://twitter.com/GreenhamBunzl" target="_blank">
              <img class="GR027_Social_Media_Icon GR027_Twitter_Icon" src="//d191y0yd6d0jy4.cloudfront.net/mhoelamem4t9ttd.png" alt="Greenham Twitter" />
            </a>
            <a class="GR027_Social_Media_Link" href="https://www.youtube.com/channel/UCz1N4yblw8DCt2i9ACiztBg" target="_blank">
              <img class="GR027_Social_Media_Icon GR027_Youtube_Icon" src="//d191y0yd6d0jy4.cloudfront.net/qdfqw3buulx0dtu.png" alt="Greenham Youtube" />
            </a>
            <a class="GR027_Social_Media_Link" href="https://www.linkedin.com/company/bunzlgreenham/" target="_blank">
              <img class="GR027_Social_Media_Icon GR027_LinkedIn_Icon" src="//d191y0yd6d0jy4.cloudfront.net/0yzbjshwypza4uy.png" alt="Greenham LinkedIn" />
            </a>
          </div>
          <div class="GR027_Pulse_Container">
            <a class="GR027_Pulse_Link" href="https://pulse.greenham.com/" target="_blank">
              <span class="GR027_Contact_Text GR027_Pulse_Text">Stay updated with pulse</span>
              <img class="GR027_Pulse_Icon" src="//d191y0yd6d0jy4.cloudfront.net/4yrkr2zsh4f8q9c.png" alt="Greenham Pulse" />
            </a>
          </div>
          <a class="GR027_Feedback_Link GR027_Contact_Text" href="/Customer-Feedback-Greenham/cf/greenham_ppe">Leave your <span class="GR027_Feedback_Text GR027_Contact_Text">feedback</span></a>
        </div>
        `);
      },
    },
  };

  Exp.init();
};

export default Run;
