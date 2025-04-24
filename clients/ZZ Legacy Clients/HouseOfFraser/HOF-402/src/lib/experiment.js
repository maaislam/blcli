/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...
    const isPLP = () => {
        return document.querySelector('#productlistcontainer #navlist');
    };
    if (isPLP()) {
        fireEvent(`User reaches PLP - ${window.location.pathname} from variation=${VARIATION}`);
    }

    const newArray = ['productdescriptionbrand', 'WishIcon', 'QuickLookIcon'];
    document.body.addEventListener('mouseover', (e) => {
        if (newArray.indexOf(e.target.className) != -1) {
            fireEvent(`mouse over ${e.target.className}`);
        }
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.className.includes('QuickLookIcon')) {
            fireEvent(`User interacts with quick view in the variation=${VARIATION}`);
        } else if (e.target.className.includes('WishIcon')) {
            fireEvent(`User interacts with wishlist in the variation=${VARIATION}`);
        }
    });

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...

    if (shared.VARIATION == '1') {
        var projectName = {
            init: function() {
                projectName.mainCss();
                projectName.mainJS();
            },
            mainCss: function() {
                var styles = document.createElement('style');
                styles.setAttribute('type', 'text/css');
                document.head.appendChild(styles).textContent =
                    '' +
                    /* CSS will be imported here */
                    '';
            },
            swipers: {},
            mainJS: function() {
                fireEvent(`User is shown PLP Tidy`);
                document.body.classList.add('flanProdListV1');
                var allProducts = document.querySelectorAll('#navlist>li');

                allProducts.forEach(function(product) {
                    if (product.querySelector(`.slider-container-ab`)) {
                        return;
                    }
                    product.querySelector('.product-rollup>li') && product.classList.add('has-color-ab');
                    var pid = product.getAttribute('li-productid');
                    var pdpURL = product.getAttribute('li-url');
                    var sliderContainer = document.createElement('div');
                    sliderContainer.classList.add('slider-container-ab');
                    sliderContainer.innerHTML =
                        '<div class="swiper-container wt-wrapper">' +
                        '<div class="swiper-wrapper">' +
                        (function() {
                            var html = '';
                            product.querySelectorAll('.product-rollup-variant').forEach(function(variant) {
                                html += '<div class="swiper-slide">' + variant.innerHTML + '</div>';
                            });
                            return html;
                        })() +
                        '</div>' +
                        '</div>' +
                        '<div class="swiper-button-nextCat ab-navigation pid-' +
                        pid +
                        '"></div>' +
                        '<div class="swiper-button-prevCat ab-navigation pid-' +
                        pid +
                        '"></div>';

                    var colorsAlreadyGot = [...product.querySelectorAll('.product-rollup-variant')].map(function(variant) {
                        return variant.getAttribute('data-colourvariantid');
                    });

                    product.querySelector('.product-rollup>li') && product.querySelector('.productimage ').after(sliderContainer);

                    projectName.swipers[product.getAttribute('li-productid')] = new Swiper(
                        '[li-productid="' + pid + '"] .slider-container-ab .wt-wrapper', {
                            slidesPerView: 3,
                            spaceBetween: 5,
                            loop: false,
                            navigation: {
                                nextEl: '.swiper-button-nextCat.ab-navigation.pid-' + pid,
                                prevEl: '.swiper-button-prevCat.ab-navigation.pid-' + pid,
                            },
                            breakpoints: {
                                // when window width is <= 768px
                                450: {
                                    slidesPerView: 2,
                                    spaceBetween: 5,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 5,
                                },
                            },
                            on: {
                                slideChange: function() {
                                    if (product.classList.contains('has-full-slider-ab')) {
                                        return;
                                    }

                                    var plpTidyv1 = this;
                                    var url = pdpURL;
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('GET', url);
                                    xhr.onload = function() {
                                        if (this.status >= 200 && this.status < 300) {
                                            var pdpDOM = new DOMParser().parseFromString(xhr.response, 'text/html');
                                            var colors = pdpDOM.querySelectorAll('#ulColourImages>li');
                                            var slidesv1 = [];
                                            colors.forEach(function(color) {
                                                var colorId = color.getAttribute('data-colvarid');
                                                if (colorsAlreadyGot.indexOf(colorId) > -1) {
                                                    return;
                                                }
                                                var coloredURL = pdpURL.replace(/colcode=[0-9]*/gi, 'colcode=' + colorId);
                                                var imgSrc = color.querySelector('img') && color.querySelector('img').getAttribute('src');
                                                imgSrc &&
                                                    slidesv1.push(`<div class="swiper-slide">
                                              <a href="${coloredURL}">
                                                  <span class="BrowseRollupThumbnail background-contain" style="background-image: url('${imgSrc}');"></span>
                                              </a>
                                          </div>`);
                                            });

                                            plpTidyv1.appendSlide(slidesv1);
                                            product.classList.add('has-full-slider-ab');
                                        }
                                    };
                                    xhr.send();
                                },
                            },
                        }
                    );

                    function checkFunction() {
                        var allProducts = document.querySelectorAll('#navlist>li');

                        allProducts.forEach(function(product) {
                            if (
                                product.querySelector('.slider-container-ab .swiper-button-nextCat.swiper-button-disabled') &&
                                product.querySelector('.slider-container-ab .swiper-button-prevCat.swiper-button-disabled')
                            ) {
                                product
                                    .querySelector('.slider-container-ab .swiper-button-nextCat.swiper-button-disabled')
                                    .classList.add('button-hidden');
                                product
                                    .querySelector('.slider-container-ab .swiper-button-prevCat.swiper-button-disabled')
                                    .classList.add('button-hidden');
                            }
                        });
                    }

                    checkFunction();
                });

                const targetNode = document.querySelector('#productlistcontainer ul#navlist');
                const config = { attributes: true, childList: true };
                const callback = function(mutationsList, observer) {
                    for (const mutation of mutationsList) {
                        mutationsList.forEach((mutation) => {
                            if (mutation.type === 'childList') {
                                projectName.init();
                            }
                        });
                    }
                };
                const observer = new MutationObserver(callback);
                targetNode && observer.observe(targetNode, config);
            },
        };

        pollerLite(
            ['#navlist > li', '.catswiperSection [data-swiper-slide-index="0"]~[data-swiper-slide-index="0"]', 'footer'],
            () => {
                projectName.init();
            }
        );
    } else if (shared.VARIATION == '2') {
        var projectName = {
            init: function() {
                projectName.mainJS();
            },

            swipers: {},
            mainJS: function() {
                fireEvent(`User is shown PLP Tidy`);
                document.body.classList.add('flanProdListV2');
                var allProducts = document.querySelectorAll('#navlist>li');

                allProducts.forEach(function(product) {
                    if (product.querySelector(`.slider-container-ab`)) {
                        return;
                    }
                    product.querySelector('.product-rollup>li') && product.classList.add('has-color-ab');
                    var pid = product.getAttribute('li-productid');
                    var pdpURL = product.getAttribute('li-url');
                    var sliderContainer = document.createElement('div');
                    sliderContainer.classList.add('slider-container-ab');
                    sliderContainer.innerHTML =
                        `
                    <div class="swiper-container wt-wrapper">
                    <div class="swiper-wrapper">` +
                        (function() {
                            var html = '';
                            product.querySelectorAll('.product-rollup-variant').forEach(function(variant) {
                                html += '<div class="swiper-slide">' + variant.innerHTML + '</div>';
                            });
                            return html;
                        })() +
                        `</div>
                    </div>
                    <div class="swiper-button-nextCat pid-${pid}"></div>
                    <div class="swiper-button-prevCat pid-${pid}"></div>
                `;

                    var colorsAlreadyGot = [...product.querySelectorAll('.product-rollup-variant')].map(function(variant) {
                        return variant.getAttribute('data-colourvariantid');
                    });
                    const v2 = sliderContainer.cloneNode(true);
                    v2.classList.add('v2-only-mobile');
                    product.querySelector('.product-rollup>li') && product.querySelector('.rollUpQuickBuyWrap').after(sliderContainer);
                    product.querySelector('.product-rollup>li') && product.querySelector('.productimage').after(v2);

                    if (product.classList.contains('has-color-ab')) {
                        projectName.hotspotBuy(product);
                        projectName.hotspotWish(product);
                    } else {
                        projectName.hotspotBuy(product);
                        projectName.hotspotWish(product);
                    }

                    projectName.swipers[product.getAttribute('li-productid')] = new Swiper(
                        '[li-productid="' + pid + '"] .slider-container-ab .wt-wrapper', {
                            slidesPerView: 3,
                            spaceBetween: 5,
                            loop: false,
                            navigation: {
                                nextEl: '.swiper-button-nextCat.pid-' + pid,
                                prevEl: '.swiper-button-prevCat.pid-' + pid,
                            },
                            breakpoints: {
                                // desktop first
                                // when window width is <= 768px
                                450: {
                                    slidesPerView: 2,
                                    spaceBetween: 5,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 5,
                                },
                            },
                            on: {
                                slideChange: function() {
                                    if (product.classList.contains('has-full-slider-ab')) {
                                        return;
                                    }

                                    var plpTidyv2 = this;
                                    var url = pdpURL;
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('GET', url);
                                    xhr.onload = function() {
                                        if (this.status >= 200 && this.status < 300) {
                                            var pdpDOM = new DOMParser().parseFromString(xhr.response, 'text/html');
                                            var colors = pdpDOM.querySelectorAll('#ulColourImages>li');
                                            var slidesv2 = [];
                                            colors.forEach(function(color) {
                                                var colorId = color.getAttribute('data-colvarid');
                                                if (colorsAlreadyGot.indexOf(colorId) > -1) {
                                                    return;
                                                }
                                                var coloredURL = pdpURL.replace(/colcode=[0-9]*/gi, 'colcode=' + colorId);
                                                var imgSrc = color.querySelector('img') && color.querySelector('img').getAttribute('src');
                                                imgSrc &&
                                                    slidesv2.push(`<div class="swiper-slide">
                                            <a href="${coloredURL}">
                                                <span class="BrowseRollupThumbnail background-contain" style="background-image: url('${imgSrc}');"></span>
                                            </a>
                                        </div>`);
                                            });

                                            plpTidyv2.appendSlide(slidesv2);
                                            product.classList.add('has-full-slider-ab');
                                        }
                                    };
                                    xhr.send();
                                },
                            },
                        }
                    );

                    function checkFunction() {
                        var allProducts = document.querySelectorAll('#navlist>li');

                        allProducts.forEach(function(product) {
                            if (
                                product.querySelector('.slider-container-ab .swiper-button-nextCat.swiper-button-disabled') &&
                                product.querySelector('.slider-container-ab .swiper-button-prevCat.swiper-button-disabled')
                            ) {
                                product
                                    .querySelector('.slider-container-ab .swiper-button-nextCat.swiper-button-disabled')
                                    .classList.add('button-hidden');
                                product
                                    .querySelector('.slider-container-ab .swiper-button-prevCat.swiper-button-disabled')
                                    .classList.add('button-hidden');
                            }
                        });
                    }
                    checkFunction();
                });

                const targetNode = document.querySelector('ul#navlist');
                const config = { attributes: true, childList: true };
                const callback = function(mutationsList, observer) {
                    for (const mutation of mutationsList) {
                        mutationsList.forEach((mutation) => {
                            if (mutation.type === 'childList') {
                                projectName.init();
                            }
                        });
                    }
                };
                const observer = new MutationObserver(callback);
                targetNode && observer.observe(targetNode, config);
            },

            hotspotBuy: function(product) {
                const productBuy = `<div class="hotspotbuy hotspotquickbuy">
                              <span class="QuickLookIcon"></span>
                              <span class="QuickLookText">Quick view</span>
                          </div>`;
                if (!product.querySelector('.TextSizeWrap .hotspotquickbuy')) {
                    product.querySelector('.reviews-container').insertAdjacentHTML('beforebegin', productBuy);
                }

                product.querySelector('.TextSizeWrap .hotspotquickbuy').addEventListener('click', (e) => {
                    if (e.target.closest('div.hotspotbuy.hotspotquickbuy')) {
                        product.querySelector('.productimage .hotspotbuy.hotspotquickbuy').click();
                    }
                });
            },
            hotspotWish: function(product) {
                const productWish = `<div class="hotspotbuy hotspotwishlist">
        <span class="WishIcon"></span>
        <span class="WishText">Wish list</span>
    </div>`;
                if (!product.querySelector('.TextSizeWrap .hotspotwishlist')) {
                    product.querySelector('.reviews-container').insertAdjacentHTML('beforebegin', productWish);
                }
                product.querySelector('.TextSizeWrap .hotspotwishlist').addEventListener('click', (e) => {
                    if (e.target.closest('div.hotspotbuy.hotspotwishlist')) {
                        product.querySelector('.productimage .hotspotbuy.hotspotwishlist').click();
                    }
                });
            },
        };

        pollerLite(
            ['#navlist > li', '.catswiperSection [data-swiper-slide-index="0"]~[data-swiper-slide-index="0"]', 'footer'],
            () => {
                projectName.init();
            }
        );
    }
};