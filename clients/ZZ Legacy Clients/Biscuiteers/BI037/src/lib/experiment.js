/**
 * BI037 Christmas Homepage Redesign
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { shuffle } from './../../../../../lib/utils/arrays';
import { addPoller, addEventListener, addObserver } from './winstack';
import settings from './settings';
import reviews from './reviews';
import pubSub from './PublishSubscribe';

/**
 * Coin flip
 */
const coinFlip = () => {
  return Math.random() < 0.5 ? 0 : 1;
}

/**
 * Helper is desktop?
 */
const isDesktop = () => {
  return document.body.classList.contains('size-x') || document.body.classList.contains('size-l');
};

/**
 * Is mobile device ( < 513 )
 */
const isMobileDevice = () => {
  return document.body.classList.contains('size-s');
};

/**
 * Helper get christmas date
 *
 * @return {Date}
 */
const getChristmasDay = (year = 2018) => new Date(`${year}-12-25T00:00:00`);

/**
 * Helper get now date default normalised to 00:00
 *
 * @param {Array} a Time Parts
 */
const getNowDate = ([h,m,s,ms] = [0,0,0,0]) => {
  const d = new Date();
  d.setHours(h,m,s,ms);
  return d;
};

/**
 * Subtract dates
 *
 * @param {Date} d1
 * @param {Date} d2
 */
const dateSubtract = (d1, d2) => (d1 - d2);

/**
 * Timestamp to days
 *
 * @param {Number} t
 */
const timestampToDays = (t) => {
  return t / 86400000;
};

/**
 * Add items to header (desktop)
 *
 * @param {Number} daysTilChristmas
 */
const addItemsToDesktopHeader = (daysTilChristmas) => {
  const existing = document.querySelector(`.${settings.ID}-countdown`);
  if(existing) {
    existing.remove();
  }

  const existing2 = document.querySelector(`.${settings.ID}-headfaq`);
  if(existing2) {
    existing2.remove();
  }

  const daysHtml = (daysTilChristmas + '').split('').map((d) => {
    return '<em>' + d + '</em>';
  }).join('');
  const html = `
    <a href="/christmas-delivery-information" class="${settings.ID}-countdown w-3" style="display: none;">
      <span class="${settings.ID}-countdown__days">
        ${daysHtml}
      </span>
      <div>
        <span class="${settings.ID}-countdown__title">
          christmas countdown
        </span>
        <span class="${settings.ID}-countdown__subtitle">
          days 'til christmas
        </span>
      </div>
    </a>
    <div class="${settings.ID}-headfaq w-3" style="display: none;">
      <a class="${settings.ID}-headfaq__link" href="/christmas-delivery-information">
        <span class="${settings.ID}-headfaq__title">
          ordering for christmas?
        </span>
        <span class="${settings.ID}-headfaq__subtitle">
          everything you need to know
        </span>
      </a>
    </div>
  `;

  const headWrap = document.querySelector('if-not-checkout-process .is-b-big');
  if(headWrap) {
    headWrap.insertAdjacentHTML('afterbegin', html);
  }

  const countdown = document.querySelector(`.${settings.ID}-countdown`);
  if(countdown) {
    addEventListener(countdown, 'click', () => pubSub.publish('clicked-element', 'header-countdown'));
  }

  const faqlink = document.querySelector(`.${settings.ID}-headfaq__link`);
  if(faqlink) {
    addEventListener(faqlink, 'click', () => pubSub.publish('clicked-element', 'header-faq-link'));
  }
};

/**
 * Helper modify header items
 */
const modifyHeaderItemsDesktop = () => {
  const w5 = document.querySelector('if-not-checkout-process .flex .w-5');
  if(w5) {
    w5.classList.remove('w-5');
    w5.classList.add('w-3');
    w5.classList.add(`${settings.ID}-nextdaydelivery`);
  }
};

/**
 * Undo modify header items
 */
export const undoModifyHeaderItemsDesktop = () => {
  const nd = document.querySelector(`if-not-checkout-process .flex .${settings.ID}-nextdaydelivery`);
  if(nd) {
    nd.classList.remove('w-3');
    nd.classList.add('w-5');
    nd.classList.remove(`${settings.ID}-nextdaydelivery`);
  }
};

/**
 * Add items to mobile header
 */
const addItemsToMobileHeader = (daysTilChristmas) => {
  const daysHtml = (daysTilChristmas + '').split('').map((d) => {
    return '<em>' + d + '</em>';
  }).join('');

  const html = `
    <div class="${settings.ID}-countdown">
      <span class="${settings.ID}-countdown__days">
        ${daysHtml}
      </span>
      <div>
        <span class="${settings.ID}-countdown__title">
          christmas countdown
        </span>
        <span class="${settings.ID}-countdown__subtitle">
          days 'til christmas
        </span>
      </div>
    </div>
  `;

  const pageHeader = document.querySelector('page-header');
  if(pageHeader) {
    pageHeader.insertAdjacentHTML('afterend', html);
  }
};

/**
 * Create new banner
 */
const createNewBanner = () => {
  const holder = document.querySelector('page-view .page');

  if(holder) {
    const linkToUse = settings.CTA_LINKS[settings.VARIATION - 1];

    holder.insertAdjacentHTML('afterbegin', `
      <div class="wrap ${settings.ID}-bannerwrap">
        <div class="${settings.ID}-banner">
          <div class="${settings.ID}-banner__content">
            <p class="${settings.ID}-banner__headline">let us help you tick off your Christmas list and spread a little Christmas happiness!</p>
            <p class="${settings.ID}-banner__ctawrap">
              <a class="${settings.ID}-banner__cta" href="${linkToUse}">all christmas gifts</a>
            </p>
          </div>
        </div>
      </div>
    `);

    const bannerCta = document.querySelector(`.${settings.ID}-banner__cta`);
    if(bannerCta) {
      addEventListener(bannerCta, 'click', () => pubSub.publish('clicked-element', 'banner-cta'));
    }
  }
};

/**
 * Move the discount standout to beneath banner
 */
const moveDiscountBar = () => {
  const banner = document.querySelector(`.${settings.ID}-banner`);
  const holder = document.querySelector('page-view .page');
  if(banner && holder) {
    const discountBar = holder.nextElementSibling;
    if(discountBar) {
      banner.insertAdjacentElement('afterend', discountBar.firstChild);
    }
  }
};

/**
 * Show title before page starts
 */
const pullOutTitle = () => {
  const holder = document.querySelector('page-view .page');
  const title = document.querySelector('.carousel-mosaic .carousel__frame .pos-absolute.right-0');

  if(holder && title) {
    holder.insertAdjacentHTML('beforebegin', `
      <div class="wrap ${settings.ID}-titlewrap center">
        <h2>${title.innerText.trim()}</h2>
      </div>
    `);
  }
};

/**
 * Create Category CTAs from mosaic boxes
 */
const createCatCtasFromMosaic = () => {
  const imageGdUrl = `https://thumbor-gc.tomandco.uk/unsafe/${settings.MOSAIC_IMAGE_SIZE}/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/`;

  const columnRight = document.querySelector('mosaic .column-right');

  if(columnRight) {
    columnRight.classList.remove('c-7-set');
    columnRight.classList.add('c-12-set');

    const mosaicItems = columnRight.querySelectorAll('.item');

    [].forEach.call(mosaicItems, (item) => {
      const img = item.querySelector('img');

      if(!isMobileDevice()) {
        item.classList.remove('c-6-set');
        item.classList.add('c-3-set');
      }

      if(img) {
        let imgSrc = img.getAttribute('image');
        imgSrc = imgSrc.replace('https://www.biscuiteers.com', '').replace('wp', 'static/uploads');

        img.setAttribute('src', imageGdUrl + 'https://www.biscuiteers.com' + imgSrc);
      }

      const link = item.querySelector('a');
      if(link) {
        addEventListener(link, 'click', () => pubSub.publish(
          'clicked-element', 
          'desktop--mosaic-link--' + link.innerText.trim().replace(/\s/g, '').toLowerCase()
        ));
      }
    });
  }
};

/**
 * Why send flowers when you can send biscuiteers?
 */
const recreateWhySendFlowersBlock = () => {
  const titleImage = settings.TEXT_IMAGES[isDesktop() ? 'desktop' : 'mobile'];
  const mosaic = document.querySelector('mosaic');

  const html = `
    <div class="${settings.ID}-whysendflowers text">
      <h2><img src="${titleImage}" alt="Why send flowers when you can send biscuiteers?"></h2>

      <p>
        Our biscuits are hand-iced in London and each one is unique. Everything is made the 
				old-fashioned way and we aim for <a href="/reviews">100% biscuit happiness</a>! Choose from our 
				luxury <a href="/biscuits">biscuits</a>, <a href="/chocolates">chocolates</a>&nbsp;and 
        <a href="/cakes-and-cupcakes">cakes</a>, add a message (if you like), and we'll carefully deliver 
        your gift. We deliver worldwide, so no matter where they are, they’ll be sure to have 100% biscuit 
        happiness. <a href="/send-a-gift">check out the full range</a>
      </p>
    </div>
  `;

  if(mosaic) {
    mosaic.insertAdjacentHTML('afterend', html);
  }
};

/**
 * Create perfect gift area 
 */
const createPerfectGiftFaq = () => {
  const whyFlowersBlock = document.querySelector(`.${settings.ID}-whysendflowers`);

  if(whyFlowersBlock) {
    whyFlowersBlock.insertAdjacentHTML('afterend', `
      <div class="${settings.ID}-perfectgift">
        <h2 class="${settings.ID}-perfectgift__title center">how to send the perfect gift...</h2>
        <div class="${settings.ID}-perfectgift__steps">
          <div class="${settings.ID}-perfectgift__step col-4-set">
            <span class="${settings.ID}-perfectgift__num">1.</span>
            <div class="${settings.ID}-perfectgift__imgwrap">
              <img src="${settings.IMAGES.step1}">
            </div>
            <div class="${settings.ID}-perfectgift__textwrap text">
              <p>Choose from hand-iced biscuits, chocolates and even cakes. Every single gift is hand-iced 
                in our kitchens in London, making them as unique as the lucky recipient.</p>
            </div>
          </div>
          <div class="${settings.ID}-perfectgift__step col-4-set">
            <span class="${settings.ID}-perfectgift__num">2.</span>
            <div class="${settings.ID}-perfectgift__imgwrap">
              <img src="${settings.IMAGES.step2}">
            </div>
            <div class="${settings.ID}-perfectgift__textwrap text">
              <p>We'll carefully pack your gift in our beautiful illustrated tins and boxes. You let us 
                know where and when they need to be delivered and we'll see to the rest.</p>
            </div>
          </div>
          <div class="${settings.ID}-perfectgift__step col-4-set">
            <span class="${settings.ID}-perfectgift__num">3.</span>
            <div class="${settings.ID}-perfectgift__imgwrap">
              <img src="${settings.IMAGES.step3}">
            </div>
            <div class="${settings.ID}-perfectgift__textwrap text">
              <p>Sit back, relax and wait for the 'ooohs' and 'aaahs'. All of the gifts have at least 1 
                month's shelf life from the moment they leave our kitchens for delivery.</p>
            </div>
          </div>
        </div>
      </div>
    `);
  }
};

/**
 * Trending now
 */
const trendingNow = () => {
  const trendingCarousel = document.querySelector('carousel-with-products');
  if(trendingCarousel) {
    trendingCarousel.insertAdjacentHTML('beforebegin', `
      <h2 class="${settings.ID}-carouseltitle">trending now...</h2>
    `);
  }

  const carouselItems = document.querySelectorAll('carousel-with-products .carousel__frame');
  [].forEach.call(carouselItems, (item) => {
    addEventListener(item, 'click', () => pubSub.publish('clicked-element', 'trending-product'));
  });
};

/**
 * Create reviews
 */
const createReviews = () => {
  const footerUpsell = document.querySelector(!isMobileDevice() ? '#section-6' : '#section-7');

  if(footerUpsell) {
    const reviewsContainer = document.createElement('div');
    reviewsContainer.classList.add(`${settings.ID}-reviews-container`);
    const reviewsWrap = document.createElement('div');
    reviewsWrap.classList.add(`${settings.ID}-reviews`);
    reviewsWrap.classList.add('wrap');

    const randomReviews = shuffle(reviews).slice(0, 3);
    randomReviews.forEach((review) => {
      reviewsWrap.insertAdjacentHTML('beforeend', `
        <div class="${settings.ID}-reviews__item">
          <blockquote>
            ${review.quote}
          </blockquote>
          <p class="${settings.ID}-reviews__rating">
            <img src="${settings.IMAGES.iconstar}">
            <img src="${settings.IMAGES.iconstar}">
            <img src="${settings.IMAGES.iconstar}">
            <img src="${settings.IMAGES.iconstar}">
            <img src="${settings.IMAGES.iconstar}">
          </p>
          <p class="${settings.ID}-reviews__author">
            - ${review.author}
          </p>
        </div>
      `);
    });

    reviewsContainer.appendChild(reviewsWrap);
    reviewsContainer.insertAdjacentHTML('afterbegin', '<h2>what our customers say...</h2>');
    reviewsContainer.insertAdjacentHTML('beforeend', `
      <p class="${settings.ID}-reviews__more">
        <a class="${settings.ID}-reviews__more-link" href="/reviews">read the rest of the reviews here</a>
      </p>
    `);

    footerUpsell.insertAdjacentElement('beforebegin', reviewsContainer);

    const reviewsMoreLink = document.querySelector(`.${settings.ID}-reviews__more-link`);
    if(reviewsMoreLink) {
      addEventListener(reviewsMoreLink, 'click', () => pubSub.publish('clicked-element', 'reviews-more'));
    }
  }
};

/**
 * Biscuiteering in action
 */
const biscuiteeringInAction = () => {
  const footerUpsell = document.querySelector(!isMobileDevice() ? '#section-6' : '#section-7');

  const instaImages = shuffle(settings.INSTA_IMAGES).slice(0,5);

  if(footerUpsell) {

    footerUpsell.insertAdjacentHTML('beforebegin', `
      <div class="${settings.ID}-insta">
        <h2>#Biscuiteering in action</h2>
        <div class="text">
          <p>
            #Biscuiteering: the art of bringing joy and happiness through biscuits. Our customers share their moments. Join us on @biscuiteersltd
          </p>
        </div>
        <div class="${settings.ID}-insta__images">
          <a target="_blank" href="${instaImages[0][0]}" style="background-image: url('${instaImages[0][1]}')"></a>
          <a target="_blank" href="${instaImages[1][0]}" style="background-image: url('${instaImages[1][1]}')"></a>
          <a target="_blank" href="${instaImages[2][0]}" style="background-image: url('${instaImages[2][1]}')"></a>
          <a target="_blank" href="${instaImages[3][0]}" style="background-image: url('${instaImages[3][1]}')"></a>
          <a target="_blank" href="${instaImages[4][0]}" style="background-image: url('${instaImages[4][1]}')"></a>
        </div>
        <p class="${settings.ID}-insta__view-wrap">
          <a target="_blank" href="${settings.INSTA_URL}" class="${settings.ID}-insta__view-btn">
            <img src="${settings.IMAGES.iconinsta}">
            <span>view on instagram</span>
          </a>
        </p>
      </div>
    `);

    const instaMoreLink = document.querySelector(`.${settings.ID}-insta__view-btn`);
    if(instaMoreLink) {
      addEventListener(instaMoreLink, 'click', () => pubSub.publish('clicked-element', 'instagram-more'));
    }

    const instaLinks = document.querySelectorAll(`.${settings.ID}-insta__images a`);
    [].forEach.call(instaLinks, (imgLink) => {
      addEventListener(imgLink, 'click', () => pubSub.publish('clicked-element', 'instagram-image-link'));
    });
  }
};

/**
 * 'As seen in'
 */
const asSeenIn = () => {
  const footerUpsell = document.querySelector(!isMobileDevice() ? '#section-6' : '#section-7');

  if(footerUpsell) {
    footerUpsell.insertAdjacentHTML('beforebegin', `
      <div class="${settings.ID}-as-seen">
        <h2>as seen in...</h2>
        <div class="${settings.ID}-as-seen__images wrap">
          <img src="${settings.IMAGES.company.dailytelegraph}">
          <img src="${settings.IMAGES.company.londoneveningstandard}">
          <img src="${settings.IMAGES.company.goodhousekeeping}">
          <img src="${settings.IMAGES.company.thehandbook}">
          <img src="${settings.IMAGES.company.vogue}">
          <img src="${settings.IMAGES.company.hello}">
          <img src="${settings.IMAGES.company.sheerluxe}">
          <img src="${settings.IMAGES.company.houseandgarden}">
          <img src="${settings.IMAGES.company.womanandhome}">
          <img src="${settings.IMAGES.company.idealhome}">
          <img src="${settings.IMAGES.company.stylist}">
          <img src="${settings.IMAGES.company.metro}">
        </div>
      </div>
    `);
  }
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  // ------------------------------------------
  // Desktop-specific Amends
  // ------------------------------------------
  addPoller([
    () => isDesktop,
    'if-not-checkout-process .is-b-big'
  ], () => {
    const daysTilChristmas = timestampToDays(dateSubtract(getChristmasDay(), getNowDate()));

    document.body.classList.add(`${settings.ID}-is-desktop`);

    addItemsToDesktopHeader(daysTilChristmas);
    modifyHeaderItemsDesktop();
    pullOutTitle();
  });

  // ------------------------------------------
  // Non-desktop-specific Amends
  // ------------------------------------------
  addPoller([
    () => !isDesktop(),
  ], () => {
    const daysTilChristmas = timestampToDays(dateSubtract(getChristmasDay(), getNowDate()));

    document.body.classList.add(`${settings.ID}-is-mobile`);

    addItemsToMobileHeader(daysTilChristmas);
  });
  
  // ------------------------------------------
  // All screen sizes amends
  // ------------------------------------------
  const jqStr = 'jQ' + 'uery';
  addPoller([
    'page-view .page',
    'carousel-with-products',
    () => !!window[jqStr],
  ], () => {
    const $ = window[jqStr];

    createNewBanner();
    moveDiscountBar();

    if(!isMobileDevice()) {
      createCatCtasFromMosaic();
    }

    recreateWhySendFlowersBlock();
    createPerfectGiftFaq();
    trendingNow();
    createReviews();
    biscuiteeringInAction();
    asSeenIn();

    // Other Events
    const promoLink = document.querySelector('promo-message a');
    if(promoLink) {
      addEventListener(promoLink, 'click', () => pubSub.publish('clicked-element', 'promo-box'));
    }

    // Mobile requires some different references
    // and orders of things
    if(isMobileDevice()) {
      // --------------------------------------------------------
      // Move the promo message
      // --------------------------------------------------------
      const banner = document.querySelector(`.${settings.ID}-banner`);
      const promoMessage = document.querySelector('promo-message');

      if(promoMessage && banner) {
        banner.insertAdjacentElement('afterend', promoMessage);
      }

      const slickSliders = () => {
        const opts = {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          autoplay: false,
          adaptiveHeight: true,
        };

        $(`.${settings.ID}-perfectgift__steps`).slick(opts);
        $(`.${settings.ID}-reviews`).slick(opts);
        $(`.${settings.ID}-insta__images`).slick({
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 3000,
          infinite: true,
        });
        $(`.${settings.ID}-as-seen__images`).slick({
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: false,
          autoplay: true,
          autoplaySpeed: 1000,
        });
      };

      if($.fn.slick) {
        slickSliders();
      } else {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
          slickSliders();
        });
      }
    }
  });
};

export default activate;
