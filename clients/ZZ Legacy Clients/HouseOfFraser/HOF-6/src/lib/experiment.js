/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { checkIntersection } from '../../../../../evelyn/scrolling';
import { didInteract, removeActivStateOnLinks } from './handler';
import { runSwiper } from './helpers';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

// Vars
const SLIDETO_ENABLED = true;

/**
 * Entry point
 */
export default () => {
  setup();

  const brandLogos = document.querySelector('.HOFhomeBrandLogos');
  if(brandLogos) {
    // -------------------------
    // Fire event when in view
    // -------------------------
    checkIntersection(brandLogos).then(() => {
      fireEvent('View Brand Logos');
    });


    if(shared.VARIATION == 'control') {
      // Control tracking logos
      const controlLinks = brandLogos.querySelectorAll('a[href*=brand]:not(.brandLogoTitle)');
      [].forEach.call(controlLinks, link => {
        link.addEventListener('click', e => {
          fireEvent('Clicked Brand Logo - ' + e.currentTarget.getAttribute('href'));
        });
      });

      // Bail out of control
      return;
    }

    // -------------------------
    // Build markup
    // -------------------------
    const brandDivInner = brandLogos.querySelector('.brandLogo');
    if(brandDivInner) {
      brandDivInner.innerHTML = `
        <a href="/brand" class="HOFtitleText brandLogoTitle">HOUSE OF BRANDS</a>
        <div class="${shared.ID}-logos swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="/brand/polo-ralph-lauren">
                <img alt="Polo Ralph Lauren" 
                  src="https://ucds.ams3.digitaloceanspaces.com/HOF-6/polo-opt.png">
              </a>
            </div>
            <div class="swiper-slide">
              <a href="/brand/mulberry">
                <img alt="Mulberry"
                  src="https://ucds.ams3.digitaloceanspaces.com/HOF-6/mulberry-opt.png">
              </a>
            </div>
            <div class="swiper-slide">
              <a href="/brand/barbour">
                <img alt="Barbour"
                  src="https://ucds.ams3.digitaloceanspaces.com/HOF-6/barbour-opt.png">
              </a>
            </div>
            <div class="swiper-slide">
              <a href="/brand/boss">
                <img alt="BOSS" 
                  src="https://ucds.ams3.digitaloceanspaces.com/HOF-6/boss-opt.png">
              </a>
            </div>
            <div class="swiper-slide">
              <a href="/brand/versace-jeans-couture">
                <img alt="Versace" 
                  src="https://ucds.ams3.digitaloceanspaces.com/HOF-6/versace-opt.png">
              </a>
            </div>
            <div class="swiper-slide">
              <a href="/brand/calvin-klein">
                <img alt="Calvin Klein"
                  src="https://ucds.ams3.digitaloceanspaces.com/HOF-6/ck-opt.png">
              </a>
            </div>
          </div>
        </div>
        <div class="${shared.ID}-explore">
          <a class="CTAwrapper">
            <div class="CTAtext">Explore now</div>
            <div class="CTAtext"><hr></div>
          </a>
        </div>
      `;


      // -------------------------
      // Initialise Swiper
      // -------------------------
      let swiper = null;
      const breakpoint = window.matchMedia('(max-width: 767px)');

      const checkBreakpoint = () => {
        if(breakpoint.matches) {
          swiper = runSwiper();

          swiper.on('slideChangeTransitionEnd', () => {
            const slide = document.querySelector(
              `.${shared.ID}-logos .swiper-slide[data-swiper-slide-index="${swiper.realIndex}"]`
            );

            if(slide && document.querySelector(`.${shared.ID}-bl--active`)) {
              didInteract(swiper, slide);
            }
          });
        } else {
          swiper && swiper.destroy(true, true);
        }
      };

      breakpoint.addListener(() => checkBreakpoint);
      checkBreakpoint();

      // -------------------------
      // On click of 'explore', fire didInteract
      // -------------------------
      const explore = document.querySelector(`.${shared.ID}-explore a`);
      if(explore) {
        explore.addEventListener('click', () => {
          const curIndex = swiper.realIndex;

          const slide = document.querySelector(
            `.${shared.ID}-logos .swiper-slide[data-swiper-slide-index="${curIndex}"]`
          );

          fireEvent('Clicked Explore - Idx=' + curIndex);

          didInteract(swiper, slide);
        });
      }

      // -------------------------
      // On link click, fire did interact
      // -------------------------
      const links = brandLogos.querySelectorAll('.swiper-slide a');
      [].forEach.call(links, link => {
        link.addEventListener('click', e => {
          e.preventDefault();

          fireEvent('Clicked Brand Logo - ' + e.currentTarget.getAttribute('href'));

          const slide = e.currentTarget.parentElement;
          const curTargetIndex = e.currentTarget.parentNode.getAttribute('data-swiper-slide-index');
          // -------------------------
          // If open...
          // -------------------------
          if(e.currentTarget.classList.contains(`${shared.ID}-active`)) {
            removeActivStateOnLinks();
            brandLogos.classList.remove(`${shared.ID}-bl--active`);
            return;
          }

          // -------------------------
          // Run handler
          // -------------------------

          didInteract(swiper, slide);

          if(swiper && SLIDETO_ENABLED) {
            if(curTargetIndex == 0) {
              // Works around weird behaviour with slide to where it doesn't duplicate slides left
              swiper.slideToLoop(curTargetIndex, 0, 0);
            } else {
              swiper.slideTo(curTargetIndex, 0, 0);
            }
          }
        });
      });
    }
  }  
};
