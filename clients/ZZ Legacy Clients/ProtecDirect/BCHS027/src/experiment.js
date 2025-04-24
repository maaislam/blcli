import { fullStory } from '../../../../lib/utils';


/**
 * {{BCHS027}} - {{Homepage Redesign}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: '{{ID}}',
      VARIATION: '{{VARIATION}}',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const specialOffersCarousel = bodyVar.querySelector('.span-18.section5.cms_banner_slot.last');
      const bannerCarousel = bodyVar.querySelector('.span-18.section2.cms_banner_slot.last');
      const oldBannerSlides = bodyVar.querySelectorAll('#homepage_slider > ul > li');
      const homepageCatgeories = bodyVar.querySelector('.bchs_home_categories');

      // Reassigned when initialising slick

      let BCHS027SlickParent;
      let BCHS027SlickParentJQ;

      return {
        docVar,
        bodyVar,
        specialOffersCarousel,
        bannerCarousel,
        BCHS027SlickParent,
        BCHS027SlickParentJQ,
        oldBannerSlides,
        homepageCatgeories,
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
        const { render } = Exp;
        // Render offer blocks
        render.offerBlocks();
        // Rebuild Carousel
        if ($.fn.slick) {
          render.rebuildCarousel();
        } else {
          $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', render.rebuildCarousel);
        }
        render.divider();
        render.footerArea();
      },
    },
    render: {
      offerBlocks() {
        const largeOfferData = {
          link: '/BCHS-Exclusive-Brands~c~BCHSEBR?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=EB_October',
          img: '//cdn-sitegainer.com/u5p3wlyyx4rtchb.jpg',
          alt: 'BCHS Exclusive Brands - Shop Now',
        };
        const offerData = [
          { img: '//cdn-sitegainer.com/hgyxmwtbhn5sdav.png', alt: 'Cleanline Carpet Extraction Shampoo 5 Litre', link: '/Cleaning-Chemicals/Carpet-Care/Carpet-Shampoo/Cleanline-Carpet-Extraction-Shampoo~p~059400P?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=059400P_17122018' },
          { img: '//cdn-sitegainer.com/m9r7kvxz14oq446.png', alt: 'Cleanline Spot & Stain Remover 6 x 750ML', link: '/Cleaning-Chemicals/Carpet-Care/Spot-and-Stain-Remover/Cleanline-Spot-and-Stain-Remover~p~059418P?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=059418P_17122018' },
          { img: '//cdn-sitegainer.com/rjyy9u688paupdd.png', alt: 'Cleanline Floor Maintainer 5 Litre', link: '/Cleaning-Chemicals/Floor-Care/Floor-Cleaners-and-Maintainers/Cleanline-Floor-Maintainer~p~051430P?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=051430P_17122018' },
          { img: '//cdn-sitegainer.com/s2le9ifawziysbh.png', alt: 'CleanWorks Caution A Frame Floor Sign', link: '/Janitorial/Equipment/Floor-Signs-and-Barriers/CleanWorks-Caution-Sign-Plastic-A-~p~025070BP?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=025070BP_17122018' },
          { img: '//cdn-sitegainer.com/3c3i52w2oa5huyj.png', alt: 'CleanWorks Mop Bucket & Wringer Blue', link: '/Janitorial/Buckets/CleanWorks-Mop-Bucket-and-Wringer-Blue~p~026051BP?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=026051BP_17122018' },
          { img: '//cdn-sitegainer.com/o97ke6c4zu9jie4.png', alt: 'CleanWorks Lobby Dustpan & Brush Set', link: '/Janitorial/Brushes-and-Brooms/Brushes-and-Brooms/CleanWorks-Lobby-Dustpan-and-Brush-Set~p~016042P?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=016042P_17122018' },
        ];
        Exp.cache.specialOffersCarousel.insertAdjacentHTML('beforebegin', `
        <div class="BCHS027_Offers_Blocks_Container">
          <div class="BCHS027_Large_Offer_Block_Wrap">
            <a class="BCHS027_Large_Link" href="${largeOfferData.link}">
              <img class="BCHS027_Large-Category_Image" src="${largeOfferData.img}" alt="${largeOfferData.alt}"/>
            </a>
          </div>
          <div class="BCHS027_Small_Offer_Blocks_Container">
          </div>
        </div>
      `);
        const smallOfferContainer = Exp.cache.bodyVar.querySelector('.BCHS027_Small_Offer_Blocks_Container');

        // Iterate over offer data and render markup
        for (let i = 0, n = offerData.length; i < n; i += 1) {
          smallOfferContainer.insertAdjacentHTML('beforeend', `
            <div class="BCHS027_Small_Offer_Block">
              <a href="${offerData[i].link}" class="BCHS027_Small_Link">
                <img class="BCHS027_Small_Offer_Image" src="${offerData[i].img}" alt="${offerData[i].alt}" />
              </a>
            </div>
          `);
        }
      },
      rebuildCarousel() {
        // Add container
        Exp.cache.bannerCarousel.insertAdjacentHTML('afterend', `
          <section class="landing_wrap BCHS027_Banner_Carousel">
            <div class="landing_slider"> 
              <div class="BCHS027_Slider_Wrap">
              </div>
            </div>
          </section>
        `);
        // Assign Selectors
        Exp.cache.BCHS027SlickParent = Exp.cache.bodyVar.querySelector('.BCHS027_Slider_Wrap');
        Exp.cache.bodyVar.querySelector('.landing_wrap.BCHS027_Banner_Carousel').className = 'BCHS027_landing_wrap BCHS027_Banner_Carousel';
        Exp.cache.BCHS027SlickParent.classList.add('BCHS027_landing_slider');
        Exp.cache.BCHS027SlickParent.classList.remove('landing_slider');
        Exp.cache.BCHS027SlickParentJQ = $(Exp.cache.BCHS027SlickParent);
        // Build markup based on old slides
        for (let i = 0, n = Exp.cache.oldBannerSlides.length; i < n; i += 1) {
          const currentSlide = Exp.cache.oldBannerSlides[i];
          const currentImageElement = currentSlide.querySelector('img');
          const currentImage = currentImageElement.getAttribute('src');
          const currentAlt = currentImageElement.getAttribute('alt');
          const currentLink = currentSlide.querySelector('a').getAttribute('href');
          const currentSlideMarkup = `
          <div class="BCHS027_Slide_Container">
            <a class="BCHS027_Slide_Link" href="${currentLink}">
              <img class="BCHS027_Slide_Image" src="${currentImage}" alt="${currentAlt}"/>
            </a>
          </div>
          `;
          Exp.cache.BCHS027SlickParent.insertAdjacentHTML('beforeend', currentSlideMarkup);
        }
        // Configure slick
        Exp.cache.BCHS027SlickParentJQ.slick({
          dots: true,
          infinite: true,
          autoplay: true,
          slidesToShow: 1,
          autoplaySpeed: 5000,
          slidesToScroll: 1,
          arrows: false,
          customPaging: (slick, index) => {
            const targetText = slick.$slides.eq(index).find('img').attr('alt') || '';
            return `<span class="BCHS027_Slider_Button">${targetText}</span>`;
          },
        });
      },
      divider() {
        // Render a divider after inserted offer blocks, move categories after divider
        const offerContainer = Exp.cache.bodyVar.querySelector('.BCHS027_Offers_Blocks_Container');
        offerContainer.insertAdjacentHTML('afterend', `
          <div class="BCHS027_Divider"></div>
        `);
        Exp.cache.bodyVar.querySelector('.BCHS027_Divider').insertAdjacentElement('afterend', Exp.cache.homepageCatgeories);
      },
      footerArea() {
        const footerContainer = Exp.cache.docVar.getElementById('foot_outer');
        // Move email signup box above footer
        footerContainer.insertAdjacentElement('beforebegin', Exp.cache.bodyVar.querySelector('.news_signup'));
        // set text of email of sign up button and email input placeholder
        // Add text to newsletter submit button, element is input type=submit
        Exp.cache.docVar.getElementById('enquireBtnNewsletter').value = 'Go!';
        const textAreaSignUp = Exp.cache.bodyVar.querySelector('#news_signup_subscribe_form > p > input.box');
        textAreaSignUp.value = '';
        textAreaSignUp.placeholder = 'Enter email address...';
        // Render social media section
        // Array data: link, icon, alt
        const socialMediaData = [
          ['https://twitter.com/BunzlCleaning', '//d191y0yd6d0jy4.cloudfront.net/mhoelamem4t9ttd.png', 'Follow us on Twitter'],
          ['https://www.youtube.com/user/bunzlcleaning', '//d191y0yd6d0jy4.cloudfront.net/qdfqw3buulx0dtu.png', 'Watch us on YouTube'],
          ['https://www.linkedin.com/company/bunzl-cleaning-&-hygiene-supplies-ltd', '//d191y0yd6d0jy4.cloudfront.net/0yzbjshwypza4uy.png', 'Follow us on LinkedIn'],
        ];
        const footerContainerInner = Exp.cache.docVar.getElementById('footer');
        footerContainerInner.insertAdjacentHTML('afterbegin', `
        <div class="BCHS027_Social_Media_Container">
          <span class="BCHS027_Social_Media_Text">Get in touch...</span>
          <div class="BCHS027_Social_Media_Links_Container">
          </div>
          <a class="BCHS027_Social_Media_Link" href="http://blog.bunzlchs.com/?utm_source=Homepage_Desktop&utm_medium=Footer_Link&utm_campaign=BCHS027_05112018">Stay up to date with the CleanUp Blog</a>
          <a class="BCHS027_Social_Media_Link BCHS027_Blog_Link" href="/Customer-Feedback-Bchs/cf/cleaning_hygiene">Leave your <span class="BCHS027_Underline">feedback</span></a>
        </div>
        `);
        const socialMediaContainer = Exp.cache.bodyVar.querySelector('.BCHS027_Social_Media_Links_Container');
        for (let i = 0, n = socialMediaData.length; i < n; i += 1) {
          socialMediaContainer.insertAdjacentHTML('beforeend', `
            <a class="BCHS027_Social_Media_Link_Image" href="${socialMediaData[i][0]}" target="_blank">
              <img class="BCHS027_Social_Media_Image" src="${socialMediaData[i][1]}" alt="${socialMediaData[i][2]}" />
            </a>
          `);
        }
      },
    },
  };

  Exp.init();
};

export default Run;
