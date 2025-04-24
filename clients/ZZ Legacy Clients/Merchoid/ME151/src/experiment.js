import { fullStory, events } from '../../../../lib/utils';
import { allProducts } from './lib/ME151-products';
import { poller } from '../../../../lib/uc-lib';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME151',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    components.createNewImage();
    services.specifyProduct();
    components.viewAllImages();
    components.brandsTitle();
    components.subHeading();
    components.thumbnailsClick();

    if (settings.VARIATION === '1' || settings.VARIATION === '2') {
      components.createKeyfeatures();
      poller(['.ME151-keyFeatures'], () => {
        components.addKeyfeaturesContent();
        components.addBrandLogo();
      });
    }
    if (settings.VARIATION === '2') {
      components.cloneAddtoBag();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Loop through products get the matching one
     */
    specifyProduct: function specifyProduct() {
      const pageURL = window.location.href;
      for (let i = 0; i < Object.keys(allProducts).length; i += 1) {
        const data = Object.entries(allProducts)[i];
        const productURL = data[1].URL;
        const productImageToClick = data[1].Image;
        if (productURL === pageURL) {
          const slideImage = document.querySelectorAll('.flickity-slider li')[productImageToClick].querySelector('a').getAttribute('href');
          const newMainImage = document.querySelector('.ME151-product_image');
          newMainImage.style.backgroundImage = `url(${slideImage})`;
        }
      }
    },
  },
  components: {
    /**
     * @desc Loop through products get the matching one
     */
    createNewImage: function createNewImage() {
      const newTopImage = document.createElement('div');
      newTopImage.classList.add('ME151-product_image');
      const currentImage = document.querySelector('.images');
      currentImage.insertBefore(newTopImage, currentImage.querySelector('.product-image-assoc-brand').nextElementSibling);
    },
    /**
     * @desc Button to view all images
     */
    viewAllImages: function viewAllImages() {
      const allImagesButton = document.createElement('div');
      allImagesButton.classList.add('ME151-all_images');
      allImagesButton.innerHTML = '<span>View Photos</span>';
      document.querySelector('.ME151-product_image').appendChild(allImagesButton);

      allImagesButton.addEventListener('click', () => {
        document.querySelector('.product-gallery-slider.ux-slider a').click();
      });
    },
    /**
     * @desc Create the merchoid X brand title
     */
    brandsTitle: function brandsTitle() {
      const brandLogo = document.querySelector('.product-image-assoc-brand img').getAttribute('src');
      const newBrandCollabBlock = document.createElement('div');
      newBrandCollabBlock.classList.add('ME151-brand_collab');
      newBrandCollabBlock.innerHTML = `<div class="ME151-merchoid_logo"></div><div class="ME151-times"></div><div class="ME151-brand_logo" style ="background-image: url('${brandLogo}')"></div>`;

      const productTitle = document.querySelector('.product-title-region');
      productTitle.appendChild(newBrandCollabBlock);
    },
    /**
     * @desc Add subheading undertitle
     */
    subHeading: function subheading() {
      const subTitle = document.createElement('div');
      subTitle.classList.add('ME151-premium_text');
      subTitle.innerHTML = '- Part of the Merchoid Premium Collection -';
      const titleWrapper = document.querySelector('.product-title-region');
      titleWrapper.insertBefore(subTitle, titleWrapper.querySelector('.mobile-target-product-title').nextElementSibling);
    },
    /**
     * @desc on click on the thumbnails on V2 show the big slider
     */
    thumbnailsClick: function thumbnailsClick() {
      const thumbnails = document.querySelectorAll('.product-thumbnails li a');
      for (let i = 0; i < thumbnails.length; i += 1) {
        const element = thumbnails[i];
        element.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelector('.product-gallery-slider.ux-slider a').click();
        });
      }
    },
    /**
     * @desc Create the 3 key features
     */
    createKeyfeatures: function createKeyfeatures() {
      const keyFeatures = document.createElement('div');
      keyFeatures.classList.add('ME151-keyFeatures-wrapper');
      keyFeatures.innerHTML = `
      <div class="ME151-keyFeatures">
        <div class="ME151-textBlock"></div>
      </div>
      <div class="ME151-keyFeatures">
        <div class="ME151-textBlock"></div>
      </div>
      <div class="ME151-keyFeatures">
        <div class="ME151-textBlock"></div>
      </div>`;
      const bottomAccordion = document.querySelector('.mobile-only-768.product-information-mobile');
      bottomAccordion.insertAdjacentElement('beforebegin', keyFeatures);
    },
    /**
     * @desc Add the content to the key features
     */
    addKeyfeaturesContent: function addKeyfeaturesContent() {
      const pageURL = window.location.href;
      for (let i = 0; i < Object.keys(allProducts).length; i += 1) {
        const data = Object.entries(allProducts)[i];
        const productURL = data[1].URL;
        if (productURL === pageURL) {
          const featureImage1 = data[1].featureimage1;
          const featureImage2 = data[1].featureimage2;
          const featureImage3 = data[1].featureimage3;
          const featureText1 = data[1].featureimage1text;
          const featureText2 = data[1].featureimage2text;
          const featureText3 = data[1].featureimage3text;

          const block1 = document.querySelector('.ME151-keyFeatures');
          const block2 = document.querySelector('.ME151-keyFeatures:nth-of-type(2)');
          const block3 = document.querySelector('.ME151-keyFeatures:last-of-type');

          const carouselToUse1 = document.querySelectorAll('.flickity-slider li')[featureImage1].querySelector('a').getAttribute('href');
          const carouselToUse2 = document.querySelectorAll('.flickity-slider li')[featureImage2].querySelector('a').getAttribute('href');
          const carouselToUse3 = document.querySelectorAll('.flickity-slider li')[featureImage3].querySelector('a').getAttribute('href');


          block1.querySelector('.ME151-textBlock').innerHTML = featureText1;
          block2.querySelector('.ME151-textBlock').innerHTML = featureText2;
          block3.querySelector('.ME151-textBlock').innerHTML = featureText3;

          block1.style.backgroundImage = `url(${carouselToUse1})`;
          block2.style.backgroundImage = `url(${carouselToUse2})`;
          block3.style.backgroundImage = `url(${carouselToUse3})`;
        }
      }
    },
    /**
    * @desc Add the brand logo to the new feature
    */
    addBrandLogo: function addBrandLogo() {
      const brandFeature = document.querySelector('.ME151-textBlock .ME151-brand');
      const brandLogo = document.querySelector('.merchoid_price_framing img').getAttribute('src');
      brandFeature.style.backgroundImage = `url(${brandLogo})`;
    },
    /**
    * @desc Button to view all images
    */
    cloneAddtoBag: function cloneAddtoBag() {
      const keyFeat = document.querySelector('.ME151-keyFeatures-wrapper');
      const newAddTobagWrapper = document.createElement('div');
      newAddTobagWrapper.classList.add('ME151-secondAdd');
      keyFeat.insertAdjacentElement('afterend', newAddTobagWrapper);

      // price and title
      const addToBagWrapper = document.querySelector('.product-info .offers');
      const newAddToBag = addToBagWrapper.cloneNode(true);
      newAddTobagWrapper.appendChild(newAddToBag);

      // sizes
      const size = document.querySelector('.variations_form.cart');
      const clonedSize = size.cloneNode(true);
      newAddTobagWrapper.appendChild(clonedSize);
    },
  },
};

export default Experiment;
