import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import initSwiper from './helper/initSwiper';
import sliderContainer from './components/sliderContainer';
import formatPrice from './helper/formatPrice';
import { observeIntersection } from './helper/utils';

const { ID, VARIATION } = shared;

const miniPodProducts = [
  '/products/wellbeing-pod-mini-essential-oil-diffuser-nude',
  '/products/wellbeing-pod-mini-essential-oil-diffuser-black',
  '/products/happiness-pod-mini-starter-pack',
  '/products/complete-bliss-pod-mini-starter-pack',
  '/products/real-luxury-pod-mini-starter-pack',
  '/products/feel-refreshed-pod-mini-starter-pack',
  '/products/feel-good-vibes-pod-mini-starter-pack',
  '/products/feel-refreshed-pod-mini-starter-pack-black',
  '/products/moment-of-calm-pod-mini-starter-pack',
  '/products/pod-mini-adaptor',
  '/products/our-ultimate-bestseller-edit',
  '/products/wellbeing-pod-family-essential-oil-blends-collection',
  '/products/24-7-essential-oil-blends',
  '/products/ultimate-calm-essential-oil-blends',
  '/products/wellbeing-essential-oil-blends-collection',
  '/products/real-luxury-essential-oil-blend-10ml',
  '/products/perfect-night-sleep-essential-oil-blend-10ml',
  '/products/happiness-essential-oil-blend-10ml',
  '/products/complete-bliss-essential-oil-blend',
  '/products/feel-refreshed-energy-essential-oil-blend-10ml',
  '/products/feel-good-vibes-essential-oil-blend-10ml',
  '/products/focus-the-mind-essential-oil-blend-10ml',
  '/products/bedtime-hero-essential-oil-blend-10ml',
  '/products/moment-of-calm-essential-oil-blend-10ml',
  '/products/sensuous-essential-oil-blend',
  '/products/black-pepper-bergamot-essential-oil-blend',
  '/products/ylang-ylang-vetivert-tonka-bean-essential-oil-blend',
  '/products/grapefruit-mandarin-eucalyptus-essential-oil-blend-10ml',
  '/products/orange-blossom-neroli-essential-oil-blend-10ml',
  '/products/tuberose-cedarwood-ylang-ylang-essential-oil-blend-10ml',
  '/products/jasmine-bergamot-geranium-essential-oil-blend-10ml',
  '/products/wellbeing-pod-mini-essential-oil-diffuser-in-lilac',
  '/products/perfect-night-s-sleep-pod-mini-lilac-starter-pack',
];

const luxPodProducts = [
  '/products/wellbeing-pod-luxe',
  '/products/wellbeing-pod-cleaning-kit',
  '/products/real-luxury-pod-luxe-starter-pack',
  '/products/happiness-pod-luxe-starter-pack',
  '/products/wellbeing-pod-family-essential-oil-blends-collection',
  '/products/feel-refreshed-pod-luxe-starter-pack',
  '/products/wellbeing-pod',
  '/products/wellbeing-pod-essential-oil-diffuser-essential-oil-blends-collection',
  '/products/perfect-nights-sleep-pod-starter-pack',
  '/products/real-luxury-pod-starter-pack',
  '/products/happiness-pod-starter-pack',
  '/products/complete-bliss-pod-starter-pack',
  '/products/wellbeing-pod-family-essential-oil-blends-collection',
  '/products/moment-of-calm-pod-starter-pack',
  '/products/feel-good-vibes-pod-starter-pack',
  '/products/bedtime-hero-pod-starter-pack',
  '/products/feel-refreshed-pod-starter-pack',
  '/products/sensuous-pod-starter-pack',
  '/products/wellbeing-pod-cleaning-kit',
  '/products/wellbeing-pod-essential-oil-diffuser-with-tortoiseshell-glass-cover',
];

const isMiniPodInCart = () =>
  [...document.querySelectorAll('.mini-cart-item')]?.some((item) => miniPodProducts.includes(item.querySelector('a')?.pathname));

const isLuxPodInCart = () =>
  [...document.querySelectorAll('.mini-cart-item')]?.some((item) => luxPodProducts.includes(item.querySelector('a')?.pathname));

//Intersection observer for upsell
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fireEvent('User scrolls to see carousel');
    }
  });
};

const init = () => {
  const anchorPoint = document.querySelector('.mini-cart-items');
  const basketTotal = formatPrice(window.CartJS.cart.total_price);
  const progressText = document.querySelector('.progress-bar__text');
  const recommendationSection = document.querySelector('#recommendedProductsMini');

  const cartHasMiniPod = isMiniPodInCart();

  const cartHasLuxPod = isLuxPodInCart();

  const renderList = cartHasMiniPod ? (cartHasLuxPod ? 'most popular' : '10ml') : '30ml';
  document.querySelector(`.${ID}_upsell-container`)?.remove();
  if (basketTotal) {
    fireEvent(`User basket total ${basketTotal}`);
  }
  if (progressText && progressText.textContent.includes('£')) {
    fireEvent(`User is ${progressText.textContent}`);
  }

  if (VARIATION == 'control') {
    observeIntersection(recommendationSection, 0, handleIntersection);
    return;
  }

  if (!cartHasMiniPod && !cartHasLuxPod) {
    return;
  }

  recommendationSection && recommendationSection.closest('[rv-show="cart.item_count | gt 0"]').classList.add(`${ID}__hide`);
  if (!document.querySelector(`.${ID}_upsell-container`)) {
    anchorPoint.insertAdjacentHTML('beforeend', sliderContainer(ID, renderList));

    const intersectionAnchor = document.querySelector(`.${ID}_upsell-container`);
    observeIntersection(intersectionAnchor, 0, handleIntersection);
  }

  pollerLite([() => typeof window.Swiper === 'function'], () => {
    initSwiper(ID, `.${ID}_swiper-container`);
  });
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  if (window.location.href.indexOf('us.neomwellbeing.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomwellbeing.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest(`.${ID}_decrease`)) {
      const quantity = target.closest(`.${ID}_quantity-selector`).querySelector(`.${ID}_quantity`);
      if (quantity.textContent > 1) {
        quantity.textContent = parseInt(quantity.textContent) - 1;
        target.closest(`.${ID}-upsell-slide`).querySelector('[name="quantity"]').value = quantity.textContent;
        fireEvent('User interacts with oil quantity');
      }
    } else if (target.closest(`.${ID}_increase`)) {
      const quantity = target.closest(`.${ID}_quantity-selector`).querySelector(`.${ID}_quantity`);
      if (quantity.textContent < 10) {
        quantity.textContent = parseInt(quantity.textContent) + 1;
        target.closest(`.${ID}-upsell-slide`).querySelector('[name="quantity"]').value = quantity.textContent;
        fireEvent('User interacts with oil quantity');
      }
    } else if (target.closest(`.${ID}__productDetails`)) {
      fireEvent('User navigates to oil pdp');
    } else if (target.closest('.mini-cart-footer a[href="/cart"]')) {
      fireEvent('User proceeds to checkout');
    } else if (target.closest('.mini-cart-footer [data-mini-cart-toggle]')) {
      fireEvent('User continues shopping');
    } else if (target.closest('.header-actions a[href="/cart"]')) {
      fireEvent('User opens mini bag');
    } else if (
      target.closest('#recommendedProductsMini') &&
      target.closest('.mini-cart ') &&
      target.closest(' [data-cart-add]')
    ) {
      fireEvent('User purchases an addon product');
    }
  });

  document.body.addEventListener('pointerup', (e) => {
    const target = e.target;
    if (target.closest(`.${ID}__addToBag`)) {
      fireEvent('User adds an oil to their bag');
    } else if (target.closest('.quantity-box')) {
      fireEvent('User interacts with product quantity in mini bag');
    }
  });

  init();

  const observer = new MutationObserver(() => {
    setTimeout(init, 1000);
  });

  observer.observe(document.querySelector('[data-cart-render="item_count"]'), { childList: true, subtree: true });
};
