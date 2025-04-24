/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

/**
 * Helper render links in header
 */
const renderLinksInHeader = () => {
  const pageHeader = document.querySelector('page-header');
  if(pageHeader) {
    const html = `
      <ul class="${shared.ID}-header-links ${shared.ID}-DOD">
        <li>
          <a href="/biscuits">all biscuits</a>
        </li>
        <li>
          <a href="/send-a-gift/our-top-picks">top 25</a>
        </li>
        <li>
          <a href="/biscuits/personalised-biscuits">personalised</a>
        </li>
      </ul>
    `;

    pageHeader.insertAdjacentHTML('afterend', html);
  }
};

/**
 * Helper scrape existing carousel
 */
const scrapeCarousel = () => {
  const result = [];

  const frames = document.querySelectorAll('.page .carousel__frame');
  [].forEach.call(frames, (frame, idx) => {
    const textElm = frame.querySelector('heading h2');
    const imgElm = frame.querySelector('img.rf.loaded');
    const linkElm = frame.querySelector('a');

    if(textElm && imgElm && linkElm) {
      const data = {
        title: textElm.innerText.trim(),
        link: linkElm.href,
        image: imgElm.src,
      };

      result.push(data);
    }
  });

  return result;
};

/**
 * Helper create new carousel
 */
const createCarousel = () => {
  const pageViewContainer = document.querySelector('main page-view');
  if(pageViewContainer) {
    let resultHtml = `<div class="${shared.ID}-carousel ${shared.ID}-DOD">`;

    const carouselItems = scrapeCarousel();

    carouselItems.forEach((item) => {
      resultHtml += `
        <div class="${shared.ID}-carousel__item">
          <a href="${item.link}" class="${shared.ID}-carousel__imglink">
            <img src="${item.image}">
          </a>
          <a href="${item.link}" class="${shared.ID}-carousel__buttonlink button">
            ${item.title}
          </a>
        </div>
      `;
    });

    resultHtml += '</div>';

    pageViewContainer.insertAdjacentHTML('afterbegin', resultHtml);
  }
};

/**
 * Helper create CTAs
 */
const createCtas = () => {
  const promoMessage = document.querySelector('promo-message');

  promoMessage.insertAdjacentHTML('afterend', `
    <div class="pos-relative">
      <a class="${shared.ID}-cta ${shared.ID}-cta--top25 w-12" href="/send-a-gift/our-top-picks">
        <span>top 25<br>gifts</span>
      </a>
    </div>
    <div class="pos-relative">
      <div class="${shared.ID}-cta ${shared.ID}-cta--personalised w-6">
        <a href="/biscuits/personalised-biscuits">
          <img src="//cdn-sitegainer.com/mvup5xtcbu2gbin.jpeg">
        </a> 
        <a href="/biscuits/personalised-biscuits" class="button">personalised</a> 
      </div>
      <div class="${shared.ID}-cta ${shared.ID}-cta--letterbox w-6">
        <a href="/biscuits/letterbox-biscuits">
          <img src="//cdn-sitegainer.com/gvcxtwbw2eottdm.jpg">
        </a> 
        <a href="/biscuits/letterbox-biscuits" class="button">letterbox friendly</a> 
      </div>
    </div>
  `);
};

/**
 * Helper move sections
 *
 * @param {String} moveable
 * @param {String} target
 */
const moveSectionToAfterSection = (moveable, target) => {
  if(moveable && target) {
    const moveableNode = document.querySelector(moveable);
    const targetNode = document.querySelector(target);

    if(moveableNode && targetNode) {
      targetNode.insertAdjacentElement('afterend', moveableNode);
    }
  }
};

/**
 * Text collapsing with 'read more'
 *
 * @param {HTMLElement} textContainer
 */
const textCollapser = (textContainer) => {
  if(textContainer) {
    textContainer.classList.add(`${shared.ID}-text-collapse`);

    const randId = shared.ID + '-tc-' + Math.ceil(Math.random() * 10000);

    textContainer.insertAdjacentHTML('afterend', `
      <p class="${shared.ID}-tc-readmore">
        <a id="${randId}">read more</a>
      </p>
    `);

    const link = document.querySelector('#' + randId);
    if(link) {
      addEventListener(link, 'click', () => {
        link.parentNode.parentNode.removeChild(link.parentNode);

        textContainer.classList.remove(`${shared.ID}-text-collapse`); 
      });
    }
  }
};

/**
 * Helper load and execute slick slider
 */
const loadAndExecuteSlick = () => {
  const $ = window['j' + ''.trim() + 'Query'];

  const slickSliders = () => {
    const opts = {
      slidesToShow: 1,
      arrows: false,
      dots: true,
      autoplay: false,
      adaptiveHeight: true,
      autoplaySpeed: 4500,
    };

    $(`.${shared.ID}-carousel`).slick(opts);
    $(`.${shared.ID}-carousel`).on('afterChange', () => {
      events.send(shared.ID, `${shared.ID}-${shared.VARIATION}`, 'transitioned-carousel');
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

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  // --------------------------
  // Header Links
  // --------------------------
  renderLinksInHeader();

  // --------------------------
  // Create Carousel
  //
  // > Only when all control carousel images have loaded in can
  //   we proceed to build the new carousel, so we poll for them
  // --------------------------
  if(window.innerWidth < 520) {
    addPoller([
      () => window['j' + ''.trim() + 'Query'],
      () => document.querySelectorAll('.page .carousel__frame img.rf.loaded[src]').length >= 4,
    ], () => {
      createCarousel();
      loadAndExecuteSlick();
    });
  }
  
  // --------------------------
  // CTA blocks
  // --------------------------
  createCtas();
  
  // --------------------------
  // Move sections
  // --------------------------
  moveSectionToAfterSection('#section-10', '#section-12');
  
  // --------------------------
  // Collapse text
  // --------------------------
  const textContainer = document.querySelector('#section-10 .text');
  if(textContainer) {
    textCollapser(textContainer);
  }

  // --------------------------
  // Workaround for orientation change
  // --------------------------
  addEventListener(window, 'orientationchange', () => {
    window.location.reload();
  });
};
