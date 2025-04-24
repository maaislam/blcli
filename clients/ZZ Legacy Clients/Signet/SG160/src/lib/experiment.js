/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { insertBeforeElement, insertAfterElement } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if (siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  const checkSession = setInterval(function () {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if (
      sessionStorage.getItem('analyticsDataSentFor') &&
      sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname
    ) {
      if (typeof s !== 'undefined') {
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      //eslint-disable-next-line max-len
      window._uxa.push(['trackDynamicVariable', { key: `${ID}`, value: `Variation ${VARIATION}` }]);
      clearInterval(checkCS);
    }
  }, 800);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (
    VARIATION !== 'control' &&
    getSiteFromHostname() === 'ernestjones' &&
    window.location.pathname === '/'
  ) {
    const waitForSplide = (callback) => {
      if (typeof window.Splide !== 'undefined') {
        callback();
      } else {
        setTimeout(waitForSplide(), 250);
      }
    };

    waitForSplide(() => {
      document.body.classList.add(`${ID}-homepage`);
      const h1Title = document.querySelector('.offer_title').parentElement;
      const highlightsCarousel = document.querySelector('#js-splide-1');

      insertAfterElement(highlightsCarousel, h1Title);

      const firstBanner = document.querySelector('.banner');
      const highlightsWrapper = document.createElement('div');
      highlightsWrapper.classList.add(`${ID}-wrapper`);
      highlightsWrapper.appendChild(highlightsCarousel);

      insertAfterElement(firstBanner, highlightsWrapper);

      const newHighlightsHeader = document.createElement('div');
      newHighlightsHeader.classList.add('archive-title');
      newHighlightsHeader.innerText = 'Our Highlights';

      insertBeforeElement(highlightsCarousel, newHighlightsHeader);

      const quickLinksSection = document.createElement('div');
      quickLinksSection.classList.add(`${ID}-quick-links`);
      quickLinksSection.innerHTML = /* HTML */ `
        <div class="${ID}-wrapper">
          <div class="archive-title small">Our Popular Categories from Ernest Jones</div>
          <ul class="${ID}-quick-links-grid">
            <li class="${ID}-quick-links-grid-item">
              <a href="https://www.ernestjones.co.uk/webstore/l/watches/">
                <div class="${ID}-quick-links-grid-item-icon">
                  <img
                    src="https://blcro.fra1.digitaloceanspaces.com/SG160/Icon-watch.svg"
                    alt=""
                  />
                </div>
                <h4 class="${ID}-quick-links-grid-item-title">Luxury watches</h4>
              </a>
            </li>
            <li class="${ID}-quick-links-grid-item">
              <a href="https://www.ernestjones.co.uk/webstore/l/rings/">
                <div class="${ID}-quick-links-grid-item-icon">
                  <img
                    src="https://blcro.fra1.digitaloceanspaces.com/SG160/Icon-watch.svg"
                    alt=""
                  />
                </div>
                <h4 class="${ID}-quick-links-grid-item-title">Rings</h4>
              </a>
            </li>
            <li class="${ID}-quick-links-grid-item">
              <a href="https://www.ernestjones.co.uk/webstore/l/ladies-necklaces/">
                <div class="${ID}-quick-links-grid-item-icon">
                  <img
                    src="https://blcro.fra1.digitaloceanspaces.com/SG160/Icon-watch.svg"
                    alt=""
                  />
                </div>
                <h4 class="${ID}-quick-links-grid-item-title">Necklaces</h4>
              </a>
            </li>
            <li class="${ID}-quick-links-grid-item">
              <a href="https://www.ernestjones.co.uk/webstore/l/ladies-bracelets/">
                <div class="${ID}-quick-links-grid-item-icon">
                  <img
                    src="https://blcro.fra1.digitaloceanspaces.com/SG160/Icon-watch.svg"
                    alt=""
                  />
                </div>
                <h4 class="${ID}-quick-links-grid-item-title">Bracelets</h4>
              </a>
            </li>
          </ul>
        </div>
      `;

      insertAfterElement(h1Title, quickLinksSection);

      const tabbedSection = document.createElement('div');
      tabbedSection.classList.add(`${ID}-tabbed-section`);
      tabbedSection.innerHTML = /* HTML */ `
        <div class="${ID}-tabbed-section-inner">
          <div class="${ID}-wrapper">
            <div class="${ID}-tabbed-section-nav">
              <button class="${ID}-tabbed-section-toggle active" data-value="watches">
                Watches
              </button>
              <button class="${ID}-tabbed-section-toggle" data-value="diamonds">Diamonds</button>
            </div>
          </div>
          <div class="${ID}-content">
            <div class="${ID}-content-section active" data-section="watches">
              <div class="${ID}-slider-container">
                <div class="${ID}-wrapper">
                  <div class="archive-title small">Popular Watch Brands from Ernest Jones</div>
                  <div
                    id="${ID}-watch-splide"
                    class="splide splide--loop splide--ltr splide--draggable is-active"
                  >
                    <div class="splide__track">
                      <ul class="splide__list"></ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="${ID}-grid-container">
                <div class="${ID}-wrapper">
                  <div class="${ID}-ad-grid">
                    <div>
                      <a href="#">
                        <img
                          src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%286%29.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <img
                          src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%287%29.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <img
                          src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%288%29.png"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="${ID}-content-section" data-section="diamonds">
              <div class="${ID}-slider-container">
                <div class="${ID}-wrapper">
                  <div class="archive-title small">
                    Popular Diamond Categories from Ernest Jones
                  </div>
                  <div
                    id="${ID}-diamond-splide"
                    class="splide splide--loop splide--ltr splide--draggable is-active"
                  >
                    <div class="splide__track">
                      <ul class="splide__list">
                        <li class="splide__slide">
                          <a href="#" class="${ID}-diamond-card">
                            <div class="${ID}-diamond-card-image">
                              <img
                                src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%2812%29.png"
                                alt=""
                              />
                            </div>
                            <div class="${ID}-diamond-card-content">
                              <h4>Ear Rings</h4>
                            </div>
                          </a>
                        </li>
                        <li class="splide__slide">
                          <a href="#" class="${ID}-diamond-card">
                            <div class="${ID}-diamond-card-image">
                              <img
                                src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%2813%29.png"
                                alt=""
                              />
                            </div>
                            <div class="${ID}-diamond-card-content">
                              <h4>Engagement Rings</h4>
                            </div>
                          </a>
                        </li>
                        <li class="splide__slide">
                          <a href="#" class="${ID}-diamond-card">
                            <div class="${ID}-diamond-card-image">
                              <img
                                src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%2814%29.png"
                                alt=""
                              />
                            </div>
                            <div class="${ID}-diamond-card-content">
                              <h4>Diamond Bracelets</h4>
                            </div>
                          </a>
                        </li>
                        <li class="splide__slide">
                          <a href="#" class="${ID}-diamond-card">
                            <div class="${ID}-diamond-card-image">
                              <img
                                src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%2815%29.png"
                                alt=""
                              />
                            </div>
                            <div class="${ID}-diamond-card-content">
                              <h4>Diamond Necklaces</h4>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="${ID}-grid-container">
                <div class="${ID}-wrapper">
                  <div class="${ID}-ad-grid">
                    <div>
                      <a href="#">
                        <img
                          src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%289%29.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <img
                          src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%2810%29.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <img
                          src="https://blcro.fra1.digitaloceanspaces.com/SG160/image%20%2811%29.png"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      insertAfterElement(quickLinksSection, tabbedSection);

      const toggleButtons = document.querySelectorAll(`.${ID}-tabbed-section-toggle`);
      const sections = document.querySelectorAll(`.${ID}-content-section`);

      toggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          sections.forEach((section) => {
            if (btn.dataset.value === section.dataset.section) {
              section.classList.add('active');
            } else {
              section.classList.remove('active');
            }
          });

          toggleButtons.forEach((el) => {
            el.classList.remove('active');
          });

          btn.classList.add('active');
        });
      });

      // eslint-disable-next-line no-undef
      const watchSlider = new window.Splide(`#${ID}-watch-splide`, {
        type: 'loop',
        perPage: 4,
        gap: 20,
        focus: 1,
        breakpoints: {
          480: {
            perPage: 1.5,
            focus: 'center',
          },
          720: {
            perPage: 2,
          },
          900: {
            perPage: 3,
          },
        },
      });

      const diamondSlider = new window.Splide(`#${ID}-diamond-splide`, {
        type: 'loop',
        perPage: 4,
        gap: 20,
        focus: 1,
        breakpoints: {
          480: {
            perPage: 1.5,
            focus: 'center',
          },
          720: {
            perPage: 2,
          },
          900: {
            perPage: 3,
          },
        },
      });

      watchSlider.mount();
      diamondSlider.mount();

      const allWatchCards = document.querySelectorAll('.card.card__link:not(.editorial-card-grid)');

      allWatchCards.forEach((card) => {
        const newSlide = document.createElement('li');
        newSlide.classList.add('splide__slide');
        newSlide.appendChild(card);
        watchSlider.add(newSlide);
      });

      const repairsSection = document.createElement('div');
      repairsSection.classList.add(`${ID}-repairs`);
      repairsSection.innerHTML = /* HTML */ `
        <div class="${ID}-wrapper">
          <div class="archive-title small">Repairs & Services</div>
          <div class="${ID}-repairs-banner">
            <div class="${ID}-repairs-image">
              <img src="https://blcro.fra1.digitaloceanspaces.com/SG160/service.png" />
            </div>
            <div class="${ID}-repairs-content">
              <p>
                Jewellery & Watch Repairs,<br />
                Services & Designs
              </p>
              <a href="#">More information</a>
            </div>
          </div>
        </div>
      `;

      insertAfterElement(tabbedSection, repairsSection);

      watchSlider.refresh();
      diamondSlider.refresh();
    });
  } else {
    // any control code here
  }
};
