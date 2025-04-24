import { fullStory, events } from '../../../../lib/utils';
import { allProducts } from './lib/ME156-products';
import { poller } from '../../../../lib/uc-lib';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME156',
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

    components.createKeyfeatures();
    poller(['.ME156-keyFeatures'], () => {
      components.addKeyfeaturesContent();
      components.addBrandLogo();
    });
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
        const productmainImage = data[1].mainimage;
        if (productURL === pageURL) {
          const newMainImage = document.querySelector('.ME156-product_image');
          newMainImage.style.backgroundImage = `url(${productmainImage})`;
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
      newTopImage.classList.add('ME156-product_image');
      const currentImage = document.querySelector('.images');
      currentImage.insertBefore(newTopImage, currentImage.querySelector('.product-image-assoc-brand').nextElementSibling);
    },
    /**
     * @desc Button to view all images
     */
    viewAllImages: function viewAllImages() {
      const allImagesButton = document.createElement('div');
      allImagesButton.classList.add('ME156-all_images');
      allImagesButton.innerHTML = '<span>View Photos</span>';
      document.querySelector('.ME156-product_image').appendChild(allImagesButton);

      allImagesButton.addEventListener('click', () => {
        document.querySelector('.product-gallery-slider.ux-slider a').click();
      });
      document.querySelector('.ME156-product_image').addEventListener('click', () => {
        document.querySelector('.product-gallery-slider.ux-slider a').click();
      });
    },
    /**
     * @desc Create the merchoid X brand title
     */
    brandsTitle: function brandsTitle() {
      const brandLogo = document.querySelector('.product-image-assoc-brand img').getAttribute('src');
      const newBrandCollabBlock = document.createElement('div');
      newBrandCollabBlock.classList.add('ME156-brand_collab');
      newBrandCollabBlock.innerHTML = `<div class="ME156-merchoid_logo"></div><div class="ME156-times"></div><div class="ME156-brand_logo" style ="background-image: url('${brandLogo}')"></div>`;

      const productTitle = document.querySelector('.product-title-region');
      productTitle.appendChild(newBrandCollabBlock);
    },
    /**
     * @desc Add subheading undertitle
     */
    subHeading: function subheading() {
      const subTitle = document.createElement('div');
      subTitle.classList.add('ME156-premium_text');
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
      keyFeatures.classList.add('ME156-keyFeatures-wrapper');
      keyFeatures.innerHTML = `
      <div class="ME156-keyFeatures">
        <div class="ME156-textBlock"></div>
      </div>
      <div class="ME156-keyFeatures">
        <div class="ME156-textBlock"></div>
      </div>
      <div class="ME156-keyFeatures">
        <div class="ME156-textBlock"></div>
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

          const block1 = document.querySelector('.ME156-keyFeatures');
          const block2 = document.querySelector('.ME156-keyFeatures:nth-of-type(2)');
          const block3 = document.querySelector('.ME156-keyFeatures:last-of-type');

          block1.style.backgroundImage = `url('${featureImage1}')`;
          block2.style.backgroundImage = `url('${featureImage2}')`;
          block3.style.backgroundImage = `url('${featureImage3}')`;

          const featureText1 = data[1].feature1text;
          const featureText2 = data[1].feature2text;
          const featureText3 = data[1].feature3text;

          block1.querySelector('.ME156-textBlock').innerHTML = featureText1;
          block2.querySelector('.ME156-textBlock').innerHTML = featureText2;
          block3.querySelector('.ME156-textBlock').innerHTML = featureText3;
        }
      }
    },
    /**
    * @desc Add the brand logo to the new feature
    */
    addBrandLogo: function addBrandLogo() {
      const brandFeature = document.querySelector('.ME156-textBlock .ME156-brand');
      const brandLogo = document.querySelector('.merchoid_price_framing img').getAttribute('src');
      brandFeature.style.backgroundImage = `url(${brandLogo})`;
    },
    /**
    * @desc Button to view all images
    */
    cloneAddtoBag: function cloneAddtoBag() {
      const keyFeat = document.querySelector('.ME156-keyFeatures-wrapper');
      const newAddTobagWrapper = document.createElement('div');
      newAddTobagWrapper.classList.add('ME156-secondAdd');
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
