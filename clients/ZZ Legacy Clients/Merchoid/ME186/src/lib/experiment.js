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
  const heroBanner = new HeroBanner({
    slides: [
      {
        img: '//cdn.optimizely.com/img/6087172626/6d10facb1650441a84dd4d613d23f975.jpg',
        title: 'Avengers Jackets',
        desc: 'Celebrate 22 MCU movies with limited-edition numbered jackets!',
        ctaText: 'Shop now',
        link: 'https://www.merchoid.com/official-marvel-merchandise/',
      },
      {
        img: '//cdn.optimizely.com/img/6087172626/ce35849bfd1945c9a988aeb47dbf45f7.jpg',
        title: 'Zelda Alarm Clock',
        desc: "Make mornings awesome by Waking up with the 'Link to the Past' theme tune",
        ctaText: 'Shop now',
        link: 'https://www.merchoid.com/product/legend-of-zelda-time-to-save-hyrule-triforce-alarm-clock/',
      },
      {
        img: '//cdn.optimizely.com/img/6087172626/01db0390b8f04e1292393217c5e1cd89.jpg',
        title: 'Jurassic Park Legacy Kit',
        desc: 'Welcome to Jurassic Park!',
        ctaText: 'Shop now',
        link: 'https://www.merchoid.com/product/jurassic-park-visitor-centre-limited-edition-legacy-kit/',
      },
      {
        img: '//cdn.optimizely.com/img/6087172626/646f809e5f104f9b8174c9cc8142ce5b.png',
        title: 'Avengers mug',
        desc: 'Great coffee is just a click away!',
        ctaText: 'Shop now',
        link: 'https://www.merchoid.com/product/avengers-fine-i-ll-pour-it-myself-thanos-mug/',
      },
    ],
  });
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


  const productFinder = new ProductFinder();
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
