import { fullStory } from '../../../../lib/utils';
import { allProducts } from './lib/ME146-products';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME146',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
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

    if (settings.VARIATION === '2') {
      components.thumbnailsClick();
    }
  },
  /* put outside functions in here */
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
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
          const newMainImage = document.querySelector('.ME146-product_image');
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
      newTopImage.classList.add('ME146-product_image');
      const currentImage = document.querySelector('.images');
      currentImage.insertBefore(newTopImage, currentImage.querySelector('.product-image-assoc-brand').nextElementSibling);
    },
    /**
     * @desc Button to view all images
     */
    viewAllImages: function viewAllImages() {
      const allImagesButton = document.createElement('div');
      allImagesButton.classList.add('ME146-all_images');
      allImagesButton.innerHTML = '<span>View Photos</span>';
      document.querySelector('.ME146-product_image').appendChild(allImagesButton);

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
      newBrandCollabBlock.classList.add('ME146-brand_collab');
      newBrandCollabBlock.innerHTML = `<div class="ME146-merchoid_logo"></div><div class="ME146-times"></div><div class="ME146-brand_logo" style ="background-image: url('${brandLogo}')"></div>`;

      const productTitle = document.querySelector('.product-title-region');
      productTitle.appendChild(newBrandCollabBlock);
    },
    /**
     * @desc Add subheading undertitle
     */
    subHeading: function subheading() {
      const subTitle = document.createElement('div');
      subTitle.classList.add('ME146-premium_text');
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
  },
};

export default Experiment;
