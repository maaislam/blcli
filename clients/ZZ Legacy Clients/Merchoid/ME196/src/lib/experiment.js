/**
 * ME186 - Homepage rethink
 * @author User Conversion
 */
import { setup, productListToSections } from './services';
import { getClosest } from '../../../../../lib/utils';
import CleanHeader from '../components/CleanHeader/CleanHeader';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import BrandSlider from '../components/BrandSlider/BrandSlider';
import Banner from '../components/Banner/Banner';
import ProductFinder from '../components/ProductFinder/ProductFinder';
import LastViewedProducts from '../components/LastViewedProducts/LastViewedProducts';
import productFinderChanges from '../components/ProductFinder/productFinderLightbox';
import Lightbox from '../components/ProductFinder/productFinderLightbox';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // Components

  const cleanHeader = new CleanHeader();
  if (settings.VARIATION === '1') {
    const heroBanner = new HeroBanner({
      slides: [
        {
          img: '//cdn.optimizely.com/img/6087172626/0dc8ed06709e4922b615ab27eae43b30.jpg',
          title: 'Avengers',
          desc: 'Even Dr Strange couldn\'t foresee the amazing Avengers merchandise we have available',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/brand/the-avengers/',
        },
        {
          img: '//cdn.optimizely.com/img/6087172626/e9d6069e3b0344baa605ec044e7e12e1.jpg',
          title: 'Game of thrones',
          desc: 'Explore the finest merchandise in all of the Seven Kingdoms',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/brand/game-of-thrones/',
        },
        {
          img: '//cdn.optimizely.com/img/6087172626/e10eeaad646a4e42971bfca3de2cbd20.jpg',
          title: 'Marvel',
          desc: 'Get Marvel-ous merch that you\'re going to love 3000',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/official-marvel-merchandise/',
        },
        {
          img: '//cdn.optimizely.com/img/6087172626/357f30b3d764444e8c3038d6c3e66bce.jpg',
          title: 'Legend of zelda',
          desc: 'Hey, listen! Get the best Zelda gifts, whether you\'re after a link to the past or the latest releases',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/brand/nintendo-legend-of-zelda/',
        },
      ],
    });
  } else if (settings.VARIATION === '2') {
    const heroBanner = new HeroBanner({
      slides: [
        {
          img: '//cdn.optimizely.com/img/6087172626/413f30db21da47e699546a440811f9c4.jpg',
          title: 'Avengers',
          desc: 'Even Dr Strange couldn\'t foresee the amazing Avengers merchandise we have available',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/brand/the-avengers/',
        },
        {
          img: '//cdn.optimizely.com/img/6087172626/43115e84ca844579b82e613f08cef4e7.jpg',
          title: 'Game of thrones',
          desc: 'Explore the finest merchandise in all of the Seven Kingdoms',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/brand/game-of-thrones/',
        },
        {
          img: '//cdn.optimizely.com/img/6087172626/18ea12d9db1a4539a173cba16d171d37.jpg',
          title: 'Marvel',
          desc: 'Get Marvel-ous merch that you\'re going to love 3000',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/official-marvel-merchandise/',
        },
        {
          img: '//cdn.optimizely.com/img/6087172626/8c1b6d8f4893480c914a233a74cd3491.jpg',
          title: 'Legend of zelda',
          desc: 'Hey, listen! Get the best Zelda gifts, whether you\'re after a link to the past or the latest releases',
          ctaText: 'Shop now',
          link: 'https://www.merchoid.com/brand/nintendo-legend-of-zelda/',
        },
      ],
    });
  }

  const brandSlider = new BrandSlider();
  const secondaryBanner = new Banner({
    img: 'https://merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2015/02/superman-hoodie-banner.jpg',
    link: '#',
    render: (component) => {
      brandSlider.component.insertAdjacentElement('afterend', component);
    },
  });

  // Amend - product finder lightbox
  const finderLightbox = new Lightbox(settings.ID, {
    content: `<div class="ME186-product_finder"></div>`,
  });

  pollerLite([`.${settings.ID}_Lightbox__content`], () => {
    const productFinder = new ProductFinder();
  });

  const lastViewedProducts = new LastViewedProducts();


  pollerLite([`.${settings.ID}_Banner`], () => {
    // Move latest products to under product finder and split into sections of 8
    const latestProducts = document.querySelector('.products');
    const latestProductsContainer = getClosest(latestProducts, '.woocommerce');
    const finderBanner = document.querySelector(`.${settings.ID}_Banner`);
    finderBanner.insertAdjacentElement('afterend', latestProductsContainer);
    finderBanner.insertAdjacentHTML('afterend', '<h1>Our Latest Additions</h1>');
    productListToSections(latestProducts.children, 8);
  });

  pollerLite(['.UC_fb-tab-container'], () => {
    // add class on open & close to rotate the arrow
    const pickupTabBg = document.querySelector('.UC_fb-tab-container');
    const feedbackTabDiv = document.querySelector('.UC_fb-tab');
    feedbackTabDiv.addEventListener('click', () => {
      if (pickupTabBg.style.bottom !== '0px') {
        feedbackTabDiv.classList.add(`${settings.ID}-tab_show`);
      } else {
        feedbackTabDiv.classList.remove(`${settings.ID}-tab_show`);
      }
    });
  });
};

export default activate;
