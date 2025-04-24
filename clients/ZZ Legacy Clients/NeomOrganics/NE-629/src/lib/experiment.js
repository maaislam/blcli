/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

import products from './products';
import Grid from './components/Grid';
import Box from './components/Box';
import Product from './components/Product';
import Banner from './components/Banner';
import KeyIngredients from './components/KeyIngredients';
import ProductCarousel from './components/ProductCarousel';
import BlogBanner from './components/BlogBanner';
import LinkBanner from './components/LinkBanner';
import SmallText from './components/SmallText';
import getProducts from './helpers/getProducts';

const { ID, VARIATION } = shared;

export default function activate() {
  pollerLite(['body', () => location.pathname === '/collections/bath-milks'], () => {
    setup();
    fireEvent('Conditions met');

    if (VARIATION === 'control') {
      // Control code
      return;
    }

    function getLocale() {
      switch (location.host) {
        case 'www.neomorganics.com':
          return 'uk';
        case 'neomorganics.eu':
          return 'eu';
        case 'us.neomorganics.com':
          return 'us';
        default:
          return 'uk';
      }
    }

    function loadScript(url, id) {
      const existingScript = document.getElementById(id);

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.id = id;
        document.body.appendChild(script);
      }
    }

    loadScript('https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js', 'bl-splide');

    pollerLite([() => !!window.Splide], () => {
      const entryElement = document.querySelector('section.collection-section > div.container');

      getProducts()
        .then((productsData) => {
          window[`${ID}__data`] = productsData;

          entryElement.appendChild(
            Grid(
              Box(
                Product(
                  products[0].url,
                  products[0].range,
                  products[0].name,
                  products[0].price[getLocale()],
                  products[0].images,
                  products[0].oldPrice[getLocale()],
                  products[0].productId[getLocale()]
                )
              ),
              Box(
                Product(
                  products[1].url,
                  products[1].range,
                  products[1].name,
                  products[1].price[getLocale()],
                  products[1].images,
                  products[1].oldPrice[getLocale()],
                  products[1].productId[getLocale()]
                )
              ),
              Box(
                Banner('https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/banner.webp', [
                  {
                    main: '96%',
                    sub: 'said it helped them to relax and unwind*',
                  },
                  {
                    main: '94%',
                    sub: 'agree it helped to soothe tired muscles*',
                  },
                  {
                    main: '82%',
                    sub: 'said it helped to soothe tired muscles*',
                  },
                ]),
                2
              ),
              Box(
                KeyIngredients([
                  {
                    image: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-1.webp',
                    mobileImage: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-1-mobile.webp',
                    heading: 'ORGANIC OILS',
                    text: 'Your skin will love this blend of jojoba oil to balance and soothe skin, argan oil to nourish and restore and vitamin E to boost skin softness.',
                  },
                  {
                    image: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-2.webp',
                    mobileImage: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-2-mobile.webp',
                    heading: 'MAGNESIUM',
                    text: 'This mighty mineral helps to remineralise, cleanse and enhance the natural hydration of skin. When infused within a warm bath, it also creates a calming and relaxing experience to help relieve tight, sore and tired muscles.',
                  },
                  {
                    image: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-3.webp',
                    mobileImage: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-3-mobile.webp',
                    heading: 'ESSENTIAL OILS',
                    subheading: "Perfect Night's Sleep",
                    text: 'Our signature sleepy scent welcomes 100% natural lavender, chamomile and patchouli to help you unwind and prepare for a Perfect Night’s Sleep.',
                  },
                  {
                    image: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-3.webp',
                    mobileImage: 'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/key-ingredients-3-mobile.webp',
                    heading: 'ESSENTIAL OILS',
                    subheading: 'Real Luxury',
                    text: 'Our signature de-stressing Real Luxury scent welcomes 100% natural lavender, jasmine and sandalwood which can all help to create a moment of calm.',
                  },
                ]),
                2
              ),
              Box(
                Product(
                  products[2].url,
                  products[2].range,
                  products[2].name,
                  products[2].price[getLocale()],
                  products[2].images,
                  products[2].oldPrice[getLocale()],
                  products[2].productId[getLocale()]
                )
              ),
              Box(
                Product(
                  products[3].url,
                  products[3].range,
                  products[3].name,
                  products[3].price[getLocale()],
                  products[3].images,
                  products[3].oldPrice[getLocale()],
                  products[3].productId[getLocale()]
                )
              ),
              Box(
                BlogBanner(
                  'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/NE-629_blog_banner.jpg',
                  'What is bath milk and how can it transform your bathing ritual?',
                  'Elevate tub time and de-stress both mind and body with our soothing NEW Bath Milks...',
                  'https://us.neomorganics.com/blogs/product-advice/what-is-bath-milk-and-how-can-it-transform-your-bathing-ritual'
                ),
                'full'
              ),
              Box(
                ProductCarousel([
                  {
                    url: products[4].url[getLocale()],
                    range: products[4].range,
                    name: products[4].name,
                    price: products[4].price[getLocale()],
                    image: products[4].image,
                    productId: products[4].productId[getLocale()],
                  },
                  {
                    url: products[5].url[getLocale()],
                    range: products[5].range,
                    name: products[5].name,
                    price: products[5].price[getLocale()],
                    image: products[5].image,
                    productId: products[5].productId[getLocale()],
                  },
                  {
                    url: products[6].url[getLocale()],
                    range: products[6].range,
                    name: products[6].name,
                    price: products[6].price[getLocale()],
                    image: products[6].image,
                    productId: products[6].productId[getLocale()],
                  },
                  {
                    url: products[7].url[getLocale()],
                    range: products[7].range,
                    name: products[7].name,
                    price: products[7].price[getLocale()],
                    image: products[7].image,
                    productId: products[7].productId[getLocale()],
                  },
                ]),
                'full'
              ),
              Box(
                LinkBanner(
                  'Shop the Magnesium Range',
                  'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/magnesium-range.webp',
                  '/collections/body-butter'
                ),
                2
              ),
              Box(
                LinkBanner(
                  'Shop Bath Time',
                  'https://blcro.fra1.digitaloceanspaces.com/NE-BATH-PLP/bath-time.webp',
                  '/collections/bath-body'
                ),
                2
              ),
              Box(
                SmallText(
                  "*Independent blind study over 2 weeks on 62 people using Perfect Night's Sleep and 68 people using Real Luxury"
                ),
                'full'
              )
            )
          );

          const Splide = window.Splide;

          const productSliders = document.querySelectorAll(`.${ID}-product-image-slider`);

          productSliders.forEach((slider) => {
            const splide = new Splide(slider, {
              type: 'fade',
              rewind: true,
            });

            splide.mount();
          });

          new Splide(`.${ID}-product-carousel .splide`, {
            perPage: 2,
            mediaQuery: 'min',
            gap: '1rem',
            breakpoints: {
              1024: {
                perPage: 4,
                arrows: false,
                drag: false,
                gap: '2rem',
              },
            },
          }).mount();

          new Splide(`.${ID}-key-ingredients-slider`, {
            type: 'loop',
            autoplay: true,
            perPage: 1,
            resetProgress: false,
            interval: 5000,
          }).mount();

          new Splide(`.${ID}-banner .splide`, {
            autoplay: true,
            type: 'fade',
            rewind: true,
            perPage: 1,
            resetProgress: false,
            pauseOnHover: false,
            interval: 5000,
            arrows: false,
            pagination: false,
            drag: false,
          }).mount();
        })
        .catch(error => {
          console.error("Error fetching products:", error.message);
        });
    });
  });
}
