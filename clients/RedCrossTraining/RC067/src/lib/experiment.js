/**
 * RC067 - Trustpilot reviews on homepage
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import initiateSlick from './initiateSlick';
import shared from './shared';
import data from './reviewsData';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  // Write experiment code here
  let device = '';
  let logoSection = '';
  if (window.innerWidth <= 420) {
    device = 'mobile';

    logoSection = `<div class="${shared.ID}-title ${device}" style="background-image: url('//useruploads.visualwebsiteoptimizer.com/useruploads/286844/images/56ea8c41edd437c35c2a82d4bc25c744_trustpilotlogo.png')"></div>
      <div class="reviews-stars ${device}"></div>
      <div class="${shared.ID}-subtitle">
        <span class="reviews-text">Reviews 3,459 • Excellent</span>
      </div>`;
  } else {
    device = 'desktop';

    logoSection = `<div class="${shared.ID}-title">Red Cross Training</div>
      <div class="${shared.ID}-subtitle">
        <span class="reviews-text">Reviews 3,459 • Excellent</span>
        <span class="reviews-stars ${device}"></span>
      </div>`;
  }

  let heroContainer = document.querySelector('.homepage-hero');
  let refPos = 'afterend';
  if (VARIATION == 2) {
    heroContainer = document.querySelector('.related-links-container');
    refPos = 'beforebegin';
  }

  let reviews = '';
  for (let i = 0; i < Object.keys(data).length; i += 1) {
    const review = data[i];
    reviews += `<div class="review-card ${device}">
    <article class="review">
      <aside class="review__consumer-information">
        <div class="consumer-information">
            <div class="consumer-information__picture"><div><svg class="consumer-information__picture"><use xlink:href="#icon_avatar"></use></svg></div></div>
            <div class="consumer-information__details">
              <div class="consumer-information__name" v-pre="">
                ${review["name"]}
              </div>    
            </div>
        </div>
      </aside>
      <section class="review__content">
        <div class="review-content">
          <div class="review-content__header" v-pre="">
            <div class="review-content-header">
              <div class="star-rating star-rating--medium">
                <img src="//cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 stars: Excellent">
              </div>
              <div class="review-content-header__review-verified">
              <div class="review-verified">
                <div class="v-popover">
                  <span class="trigger" style="display: inline-block;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="trustpilot-icon" viewBox="0 0 16 16" id="claimed_16"></svg>
                    <div class="review-verified-tooltip-trigger">Verified</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="review-content__body" v-pre="">
          <h2 class="review-content__title">
            <a class="link link--large link--dark" href="https://uk.trustpilot.com/reviews/${review["id"]}" target="_blank">${review["title"]}</a>
          </h2>
          <p class="review-content__text ${device}">
            ${review["text"]}
          </p>
        </div>
        </div>
      </section>      
      <div class="reporting"></div>
    </article>
  </div>`;
  }
  

  const trustpilotContainer = `
  <div class="${shared.ID}-trustPilot__wrapper ${device}">
    <div class="${shared.ID}-trustPilot__container">
      <div class="${shared.ID}-left__section ${device}">
        ${logoSection}
      </div>
      <div class="${shared.ID}-right__section ${device}">${reviews}</div>
    </div>
  </div>`;

  initiateSlick();

  

  heroContainer.insertAdjacentHTML(refPos, trustpilotContainer);

  const widgetEl = document.querySelector(`.${shared.ID}-icon`);
  if (widgetEl && widgetEl.classList.contains('animate')) {
    function event() {
      if (widgetEl.classList.contains('animate')) {
        for (let i = 0; i < 2; i += 1) {
          widgetEl.animate([
            // keyframes
            { transform: 'translateY(0px)' }, 
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0px)' }, 
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0px)' }, 
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(-10px)' }, 
          ], { 
            // timing options
            duration: 3500,
          });
        }
      }
    };
    event();
    window.setInterval(event, 10000);
  }

  // --- NEW ADDITIONS
  const logoEl = document.querySelector(`.${shared.ID}-left__section`);
  logoEl.addEventListener('click', (e) => {
    // window.location.href = 'https://uk.trustpilot.com/review/redcrossfirstaidtraining.co.uk?utm_medium=trustbox&utm_source=Mini';
    window.open('https://uk.trustpilot.com/review/redcrossfirstaidtraining.co.uk?utm_medium=trustbox&utm_source=Min','_blank');
  });
  
  // -- Icon click scroll reviews into view
  const iconEl = document.querySelector(`.${shared.ID}-icon__wrapper .${shared.ID}-icon`);
  if (iconEl) {
    iconEl.addEventListener('click', (e) => {
      document.querySelector(`.${shared.ID}-right__section`).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    });
  }
  
};


export default activate;
