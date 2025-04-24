import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import cache from './lib/cache';
import allProductsSlider from './lib/html/all-products-slider';
import allProductsColumnar from './lib/html/all-products-columnar';
import config from './lib/config';
import slides from './lib/slides';
import ddslider from './lib/ddslider';
import {__, getLanguage} from './lib/helpers';

let $ = null;

// -----------------------------------------------------------
// Set up variations
// -----------------------------------------------------------
let VARIATION = null;
if(typeof TG23VARIATION != 'undefined') {
    VARIATION = TG23VARIATION;
} else {
    VARIATION = 1;
}

// Event sender
const eventSender = utils.events.setDefaultCategory('TG023---Homepage Redesign---V' + VARIATION);

/**
 * Helper scroll to content
 */
let callbackCalled = false; // animate bound to two elms (body,html) so prevent callback firing twice
const scrollTo = (callback) => {
    if(typeof callback != 'function') {
        throw "scrollTo expects argument 1 of type function";
    }

    callbackCalled = false;

    $('body,html').animate({
        'scrollTop': $('.tg23-content').offset().top
    }, 400, function() {
        if(!callbackCalled) {
            callbackCalled = true;

            callback();    
        }
    });
};

/**
 * Build header area
 *
 * Where possible we retain existing dom hierarchies as event handlers
 * and existing styling can be retained this way
 */
const rebuildHeader = () => {
    // Move Elements as required
    const navbarBottom = $('#navbar-bottom'),
        navTopRight = $('#navtop-right'),
        navTopMenuUl = $('#navtop-menu ul'),
        menuUl = navbarBottom.find('.inside ul:first'),
        headerContainer = $('.header-container'),
        toolSearch = $('.navbar-header .tool-search');

    //! $('.header-container .navbar-brand').insertBefore(navbarBottom);


    const slidesToUse = slides[getLanguage()] ? slides[getLanguage()] : slides['default'];
    
    // ------------------------------------------
    // Build slider
    // ------------------------------------------
    $('.header-container').prepend(`
      <div class="tg23-slider">
      </div>
    `);
   slidesToUse.forEach((slide) => {
        $('.tg23-slider').append(`
          <div class="tg23-slider__slide" 
            style="background-image: url('${slide.background}')"></div>
        `);
    });
    
    // ------------------------------------------
    // Add contact us to small menu
    // ------------------------------------------

    // !
    /*
    navTopMenuUl.append(`
        <li class="menu-item">
            <a href="${__('/gb/contacts')}">
                <span>
                    ${__('Contact us')}
                </span>
            </a>
        </li>
    `);

    // ------------------------------------------
    // Add my wellness
    // ------------------------------------------
    navTopMenuUl.append(`
        <li class="menu-item">
            <a href="${__('/gb/mywellness')}">
              <span class="iconic icon-nuvoletta"></span>
              <span>${__('My Wellness')}</span>
            </a>
        </li>
    `);
    */
    
    
    // ------------------------------------------
    // Splash content
    // ------------------------------------------
    headerContainer.append(`
        <div class="tg23-splash">
          <a class="tg23-splash-button tg23-splash-button--prev"></a>

          <div class="tg23-splash-slides">
          </div>

          <a class="tg23-splash-button tg23-splash-button--next"></a>
        </div>
    `);

    slidesToUse.forEach((slide) => {
      $('.tg23-splash-slides').append(`
            <div class="tg23-splash__slide">
              <h1 class="${slide.smallerTitle ? 'tg23-smaller' : ''}">${slide.title}</h1>
              <p class="tg23-subtitle">
                ${slide.text}
              </p>
              <p class="tg23-btnwrap">
                  <a href="${slide.link}"
                    class="button btn-default tg23-btn tg23-btn-splash">${slide.buttonText}</a>
              </p>
            </div>
        `);
    });
    
    // ------------------------------------------
    // Call us
    // ------------------------------------------
    const tel = $('.call-us p:last').text().trim();
    headerContainer.append(`
        <div class="tg23-callout">
            <div class="tg23-callout__inner">
                <p class="tg23-callout__icon"><span class="icon-Callus"></span>
                <p class="tg23-callout__msg">${__('Need help')}<br>${__('or advice?')}</p>
                <p class="tg23-callout__tel">${tel}<?p>
            </div>
        </div>
    `);
    
};

/**
 * Build main content area
 */
const buildContentRegion = () => {
    $('.content-container').before(`
        <div class="tg23-content clearfix">
        </div>
    `);

    const content = $('.tg23-content');

    content.append(allProductsSlider);    
    const sliderCats = allProductsSlider.find('.tg23-all-products-slider__categories');
    sliderCats.slick({
        dots: false,
        slidesToShow: 7
    });

    $('.tg23-toggle').on('click', (e) => {
      if(e.currentTarget.classList.contains('tg23-toggle--ranges')) {
        $('.tg23-toggle--cats').removeClass('tg23-toggle--active'); 
        $('.tg23-toggle--ranges').addClass('tg23-toggle--active'); 

        $('.tg23-all-products-slider__categories').addClass('tg23-hide');
        $('.tg23-all-products-slider__ranges').removeClass('tg23-hide');
      } else {
        $('.tg23-toggle--cats').addClass('tg23-toggle--active'); 
        $('.tg23-toggle--ranges').removeClass('tg23-toggle--active'); 

        $('.tg23-all-products-slider__categories').removeClass('tg23-hide');
        $('.tg23-all-products-slider__ranges').addClass('tg23-hide');

        sliderCats.slick('reInit');
      }
    });
    
    // -----------------------------------------------------------
    // Build contact banner strip
    // -----------------------------------------------------------
    content.append(`
      <div class="tg23-need-help">
        ${__('Need advice choosing the perfect fitness equipment? Contact us')}
        <a href="/${getLanguage()}/contacts">
          ${__('here')}
        </a>
      </div>
    `);
    
    // -----------------------------------------------------------
    // Build most popular products
    // -----------------------------------------------------------
    content.append(`
        <div class="tg23-popular-products">
            <h2>${__('Our Most Popular Products')}</h2>

            <div class="tg23-most-popular-toggle-wrap">
              <span class="tg23-most-popular-toggle tg23-most-popular-toggle--home tg23-most-popular-toggle--active">
                ${__('For Your Home')}
              </span>
              <span class="tg23-most-popular-toggle tg23-most-popular-toggle--business">
                ${__('For Your Business')}
              </span>
            </div>

            <div class="tg23-popular-products__content tg23-popular-products__content--home">
            </div>
            <div class="tg23-popular-products__content tg23-popular-products__content--business tg23-hide">
            </div>
        </div>
    `);

    const popularContentHome = $('.tg23-popular-products__content--home');
    const popularContentBusiness = $('.tg23-popular-products__content--business');

    $.each(config.popular['home'][getLanguage()], (idx, item) => {
        popularContentHome.append(`
            <div class="col-xs-4 tg23-popular-product">
                <a href="${item.link}">
                    <img src="${item.img}">
                    <p class="tg23-popular-product__title">${item.title}</p>
                </a>
            </div>
        `);
    });

    $.each(config.popular['business'][getLanguage()], (idx, item) => {
        popularContentBusiness.append(`
            <div class="col-xs-4 tg23-popular-product">
                <a href="${item.link}">
                    <img src="${item.img}">
                    <p class="tg23-popular-product__title">${item.title}</p>
                </a>
            </div>
        `);
    });

    $('.tg23-most-popular-toggle').on('click', (e) => {
      if(e.currentTarget.classList.contains('tg23-most-popular-toggle--business')) {
        $('.tg23-most-popular-toggle--home').removeClass('tg23-most-popular-toggle--active'); 
        $('.tg23-most-popular-toggle--business').addClass('tg23-most-popular-toggle--active'); 

        $('.tg23-popular-products__content--business').removeClass('tg23-hide');
        $('.tg23-popular-products__content--home').addClass('tg23-hide');
      } else {
        $('.tg23-most-popular-toggle--home').addClass('tg23-most-popular-toggle--active'); 
        $('.tg23-most-popular-toggle--business').removeClass('tg23-most-popular-toggle--active'); 

        $('.tg23-popular-products__content--business').addClass('tg23-hide');
        $('.tg23-popular-products__content--home').removeClass('tg23-hide');
      }
    });
    
    // -----------------------------------------------------------
    // Build newsroom elements
    // -----------------------------------------------------------
    content.append(`
        <div class="tg23-newsroom-feature">
          <h2>${__('Newsroom')}</h2>

          <div class="col-sm-6 tg23-newsroom-feature__item">
          </div>
          <div class="col-sm-6 tg23-newsroom-feature__item">
          </div>
        </div>
    `);

    // Featured post 1
    const link1 = $('.featured_post_wrapper:first .text_featured_post:first p:last a').attr('href');

    $('.tg23-newsroom-feature__item:first').append($('.featured_post_wrapper:first .featured_post_image:first'));
    $('.tg23-newsroom-feature__item:first .featured_post_image').wrap(`<a href="${link1}"></a>`);

    $('.tg23-newsroom-feature__item:first').append(`
      <div class="tg23-newsroom-feature__title">
        <a href="${link1}">
          ${$('.featured_post_wrapper:first .text_featured_post:first h2').text().trim()}
        </a>
      </div>
      <div class="tg23-newsroom-feature__text">
        ${$('.featured_post_wrapper:first .text_featured_post:first p:first').text().trim()}
      </div>
      <div class="tg23-newsroom-feature__btnwrap">
        <a class="button btn-default" href="${link1}">
          ${__('Read more')}
        </a>
      </div>
    `);

    // Featured post 2
    const link2 = $('.featured_post_wrapper:eq(1) .text_featured_post:first p:last a').attr('href');

    $('.tg23-newsroom-feature__item:last').append($('.featured_post_wrapper:eq(1) .featured_post_image:first'));
    $('.tg23-newsroom-feature__item:last .featured_post_image').wrap(`<a href="${link2}"></a>`);

    $('.tg23-newsroom-feature__item:last').append(`
      <div class="tg23-newsroom-feature__title">
        <a href="${link2}">
          ${$('.featured_post_wrapper:eq(1) .text_featured_post:first h2').text().trim()}
        </a>
      </div>
      <div class="tg23-newsroom-feature__text">
        ${$('.featured_post_wrapper:eq(1) .text_featured_post:first p:first').text().trim()}
      </div>
      <div class="tg23-newsroom-feature__btnwrap">
        <a class="button btn-default" href="${link2}">
          ${__('Read more')}
        </a>
      </div>
    `);
    
    // -----------------------------------------------------------
    // Skillrun
    // -----------------------------------------------------------
    const containers = $('.post-container .wrapper_container').filter(function(idx) {
      const wrapper = this;

      const shortcodeText = $(wrapper).find('.column-content .shortcode-text');

      const conditions = [
        $(wrapper).find('a[href*=skillrun]').length > 0,
        !!(shortcodeText && shortcodeText.text() && shortcodeText.text().trim().match(/skillrun/i))
      ];

      let result = conditions.every((c) => c === true);

      return result;
    });

    containers.addClass('tg23-skillrun').appendTo(content);
    
    // -----------------------------------------------------------
    // Build newsroom feature 2
    // -----------------------------------------------------------
    const features2 = $(`
      <div class="tg23-newsroom-feature tg23-newsroom-feature--additional">
      </div>
    `);

    content.append(features2);

    let additionalFeatures = $('.featured_post_wrapper:eq(2)');
    additionalFeatures = additionalFeatures.add('.featured_post_wrapper:eq(3)');
    additionalFeatures = additionalFeatures.add('.featured_post_wrapper:eq(4)');
    additionalFeatures = additionalFeatures.add('.featured_post_wrapper:eq(5)');

    additionalFeatures.each((idx, item) => {
      const link = $(item).find('.text_featured_post:first p:last a').attr('href');
      const title = $(item).find('.text_featured_post:first h2').text().trim();
      const text = $(item).find('.text_featured_post:first p:first').text().trim();

      if(!link || !title) {
        return;
      }

      const feature = $(`
        <div class="tg23-newsroom-feature__item col-sm-6">
          <div class="tg23-newsroom-feature__title">
            <a href="${link}">
              ${title}
            </a>
          </div>
          <div class="tg23-newsroom-feature__text">
            ${text}
          </div>
          <div class="tg23-newsroom-feature__btnwrap">
            <a class="button btn-default" href="${link}">
              ${__('Read more')}
            </a>
          </div>
        </div>
      `);

      features2.append(feature);

      const featureImage = $(item).find('.featured_post_image:first');
      feature.prepend(featureImage);
      featureImage.wrap(`<a href="${link}"></a>`);
    });

  // For all images with lazy load but don't have the style set, set it
  // from the src dataset attribute
  $('.featured_post_image.lazybg').each((idx, item) => {
      const styleAttribute = $(item).attr('style');
      if(!styleAttribute) {
        const dataSrc = $(item).attr('data-src');
        $(item).attr('style', `background-repeat: no-repeat; background-image:url('${dataSrc}')`);
      }
  });
    

  // -----------------------------------------------------------
  // SEO text
  //
  // Use DOM:Ready to work around issues with element
  // being manipulated by JS on frontend already
  // -----------------------------------------------------------
  $(document).ready(() => {
    UC.poller([
      '.footer-bottom',
      '.text_seo'
    ], () => {
      const seoText = $('.text_seo');
      seoText.removeClass('row');
      seoText.addClass('tg23-seo');

      seoText.insertBefore('.footer-bottom');
    });
  });
};

// -----------------------------------------------------------
// Bind additional events
// -----------------------------------------------------------
const bindAdditionalEvents = () => {
    let didSendHover = false;
    $('#navbar-bottom ul li').on('mouseover.tg23', (e) => {
        if(!didSendHover) {
            didSendHover = true;
            eventSender.send(null, 'did-interact-with-main-menu');
        } else {
            $(e.currentTarget).off('mouseover.tg23');
        }
    });

    $('.tg23-all-products-slider__view-all').on('click.tg23', (e) => {
        eventSender.send(null, 'did-click-view-all-products');
    });

    $('.tg23-popular-product a').on('click.tg23', (e) => {
        eventSender.send(null, 'did-click-a-popular-product');
    });

    $('.tg23-all-products-slider').on('click.tg23', '.slick-slide a', (e) => {
        eventSender.send(null, 'did-click-category-v1-slider');
    });

    $('.tg23-all-products-slider').on('click.tg23', '.slick-arrow', (e) => {
        eventSender.send(null, 'did-click-arrow-v1-slider');
    });

    $('.tg23-all-products-columnar').on('click.tg23', 'ul li a', (e) => {
        eventSender.send(null, 'did-click-v2-category');
    });
};

// -----------------------------------------------------------
// Entry point for running app once polling conditions met
// -----------------------------------------------------------
const run = () => {
    // -----------------------------------------------------------
    // Setup
    // -----------------------------------------------------------
    $('body').addClass('TG023 tg23 tg23-v' + VARIATION);

    // Send GA event on run
    eventSender.send(null, 'Page View', 'TG023 - Homepage Redesign');

    // -----------------------------------------------------------
    // Build new header
    // -----------------------------------------------------------
    rebuildHeader();
    
    // -----------------------------------------------------------
    // Build new content
    // -----------------------------------------------------------
    buildContentRegion();
    
    // -----------------------------------------------------------
    // Init new slider
    // -----------------------------------------------------------
    const bgSlides = $('.tg23-slider')[0];
    const mainSlides = $('.tg23-splash-slides')[0];
    const prevBtn = $('.tg23-splash-button--prev')[0];
    const nextBtn = $('.tg23-splash-button--next')[0];

    ddslider.init(bgSlides, mainSlides, prevBtn, nextBtn);
    
    // -----------------------------------------------------------
    // Bind additional events
    // -----------------------------------------------------------
    bindAdditionalEvents();
    
    // -----------------------------------------------------------
    // 2018-09-10
    // AD-HOC AMEND 
    // Client requested replacement of one of the feature boxes
    // -----------------------------------------------------------
    
    if(getLanguage() === 'it') {
      setTimeout(() => {
        $('.tg23-newsroom-feature__item:nth-of-type(4)').each((idx, item) => {
          const title = $(item).find('.tg23-newsroom-feature__title');
          const titleText = title.text().trim();
          const text = $(item).find('.tg23-newsroom-feature__text');
          const textText = text.text().trim();
          const btn = $(item).find('.tg23-newsroom-feature__btnwrap a');
          const link = $(item).find('.tg23-newsroom-feature__title a');
          const img = $(item).find('.featured_post_image');

          img.attr('style', 'background-image: url("//cdn.optimizely.com/img/8355110909/030456582988488a97ac28c2707b1262.jpg")');
          title.find('a').text('TECHNOGYM MILANO');
          text.text('La prima boutique dedicata al Wellness');
          $(item).find('a').attr('href', 'https://www.technogym.com/it/technogym-milano.html');

          return false;
        });
      }, 3000);
    }
};

// -----------------------------------------------------------
// Poll elements required for *all* tests
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.jQuery && !!window.jQuery.fn.slick,
    () => !!window.requestAnimationFrame,
    '.featured_post_wrapper',
    '.wrapper > .content-container',
    '.content-container .wordpress-page-view .page-container',
    '#main',
], () => {
    utils.fullStory('TG023---Homepage-Redesign', 'Variant 1');

    $ = window.jQuery;

    run();
}); 

