/**
 * RC074 - Reducing anxiety of attending during COVID
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.redcrossfirstaidtraining.co.uk/courses/first-aid-at-work-courses-uk-mainland/scheduled-courses/first-aid-at-work/
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import initiateSlick from './initiateSlick';
import homepageData from './homepage-data';
import courseSearchData from './courseSearch-data';
import workplacePLPData from './workplacePLP-data';
import workplacePDPData from './workplacePDP-data';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  const homepage = window.location.pathname == "/";
  const regex = RegExp('/scheduled-courses\/.*|courses\/public-first-aid-courses/');
  const coursePage = regex.test(window.location.href);
  const searchPage = window.location.pathname.indexOf('/course-search') > -1;
  const coursePLP = window.location.pathname.indexOf('/courses/') > -1;
  
  if (homepage || searchPage || (coursePLP && !coursePage)) {
    if (homepage) {
      pollerLite([`.homepage-hero`], () => {
        // // --- Re-run TP script
        // window.Trustpilot.loadFromElement(document.querySelector(`.${shared.ID}-TPhomepage .trustpilot-widget`));
  
        const reviewsObj = homepageData;
        console.log(reviewsObj);
        let reviews = '';
        for (const key in reviewsObj) {
          const review = reviewsObj[key];
          let oneLineReview = '';
          if (review.review.length <= 59) {
            oneLineReview = 'one-line-review';
          }
          reviews += `<li class="${shared.ID}-TPreview ${oneLineReview}">
            <a href="https://www.trustpilot.com/users/${key}" target="_blank">
              <span class="${shared.ID}-TPreview__review">${review.review}</span>
              <span class="${shared.ID}-TPreview__reviewer">${review.name}</span>
            </a>
          </li>`;
        }
  
        //<span>Training with us during Covid-19.</span><span>Our customers say:</span>
        
        let tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19. Our customers say:</div>`;
        if (window.innerWidth < 421) {
          tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19.</br>Our customers say:</div>`;
        }
        const tpBannerContainer = `<div class="${shared.ID}-TPbanner__wrapper">
          <div class="${shared.ID}-TPlabel__wrapper">
            ${tpLabelText}
          </div>
          <div class="${shared.ID}-TPreviews__wrapper">
            <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 stars: Excellent">
            <ul class="${shared.ID}-TPreviews__container">
              ${reviews}
            </ul>
          </div>
        </div>`;
        document.querySelector('main').insertAdjacentHTML('afterbegin', tpBannerContainer);
        initiateSlick();
      });
    } else if (searchPage) {
      pollerLite([`.component.content-page-hero`], () => {
        const reviewsObj = courseSearchData;
        console.log(reviewsObj);
        let reviews = '';
        for (const key in reviewsObj) {
          const review = reviewsObj[key];
          let oneLineReview = '';
          if (review.review.length <= 59) {
            oneLineReview = 'one-line-review';
          }
          reviews += `<li class="${shared.ID}-TPreview ${oneLineReview}">
            <a href="https://www.trustpilot.com/users/${key}" target="_blank">
              <span class="${shared.ID}-TPreview__review">${review.review}</span>
              <span class="${shared.ID}-TPreview__reviewer">${review.name}</span>
            </a>
          </li>`;
        }

        let tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19. Our customers say:</div>`;
        if (window.innerWidth < 421) {
          tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19.</br>Our customers say:</div>`;
        }
  
        const tpBannerContainer = `<div class="${shared.ID}-TPbanner__wrapper">
          <div class="${shared.ID}-TPlabel__wrapper">
            ${tpLabelText}
          </div>
          <div class="${shared.ID}-TPreviews__wrapper">
            <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 stars: Excellent">
            <ul class="${shared.ID}-TPreviews__container">
              ${reviews}
            </ul>
          </div>
        </div>`;
        document.querySelector('.component.content-page-hero').insertAdjacentHTML('beforebegin', tpBannerContainer);
        initiateSlick();
      });
    } else if (coursePLP && !coursePage) {
      pollerLite([`.component.content-page-hero`, `.component.course-list`], () => {
        const reviewsObj = workplacePLPData;
        console.log(reviewsObj);
        let reviews = '';
        for (const key in reviewsObj) {
          const review = reviewsObj[key];
          let oneLineReview = '';
          if (review.review.length <= 59) {
            oneLineReview = 'one-line-review';
          }
          reviews += `<li class="${shared.ID}-TPreview ${oneLineReview}">
            <a href="https://www.trustpilot.com/users/${key}" target="_blank">
              <span class="${shared.ID}-TPreview__review">${review.review}</span>
              <span class="${shared.ID}-TPreview__reviewer">${review.name}</span>
            </a>
          </li>`;
        }

        let tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19. Our customers say:</div>`;
        if (window.innerWidth < 421) {
          tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19.</br>Our customers say:</div>`;
        }
  
        const tpBannerContainer = `<div class="${shared.ID}-TPbanner__wrapper">
          <div class="${shared.ID}-TPlabel__wrapper">
            ${tpLabelText}
          </div>
          <div class="${shared.ID}-TPreviews__wrapper">
            <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 stars: Excellent">
            <ul class="${shared.ID}-TPreviews__container">
              ${reviews}
            </ul>
          </div>
        </div>`;
        document.querySelector('.component.content-page-hero').insertAdjacentHTML('beforebegin', tpBannerContainer);
        initiateSlick();
      });
    }

    
  } else if (coursePage) {
    pollerLite([`.${shared.ID}-TPpdp`], () => {
      // --- Re-run TP script
      window.Trustpilot.loadFromElement(document.querySelector(`.${shared.ID}-TPpdp .trustpilot-widget`));
      
      const overlayContainer = `<div class="RC074-overlay hidden"></div>
      <div class="RC074-close hidden">
        <div class="RC074-close__icon"></div>
      </div>`;

      const heroTitle = document.querySelector('h1.hero-title');
      heroTitle.insertAdjacentHTML('afterbegin', overlayContainer);

      const close = document.querySelector('.RC074-close__icon');
      close.addEventListener('click', (e) => {
        // alert('clicked');
        document.querySelector(`.${shared.ID}-TPpdp`).classList.remove('show');
        document.querySelector(`.${shared.ID}-overlay`).classList.add('hidden');
        document.querySelector(`.${shared.ID}-close`).classList.add('hidden');
      });
      document.querySelector(`.${shared.ID}-overlay`).addEventListener('click', (e) => {
        // alert('clicked');
        document.querySelector(`.${shared.ID}-TPpdp`).classList.remove('show');
        document.querySelector(`.${shared.ID}-overlay`).classList.add('hidden');
        document.querySelector(`.${shared.ID}-close`).classList.add('hidden');
      });

      const courseDateEl = document.querySelector('.component.course-info .wrapper div p');
      const covidTable = `<div class="${shared.ID}-covidTable__wrapper">
        <div class="${shared.ID}-covidTable__container">
          <div class="${shared.ID}-covidTable__header">
            <p>Covid-19 Compliancy</p>
          </div>
          <ul class="${shared.ID}-covidTable__content">
            <li class="${shared.ID}-covidTable__promise">Social distancing maintained whenever possible</li>
            <li class="${shared.ID}-covidTable__promise">PPE provided when social distancing cannot be maintained</li>
            <li class="${shared.ID}-covidTable__promise">Regular cleaning of equipment and venues</li>
            ><a href="/covid-19-update"> More information</a></br>
            ><a href="javascript:void(0)" class="${shared.ID}-openLightbox"> What our customers have said</a>
          </ul>
        </div>
      </div>`;
      courseDateEl.insertAdjacentHTML('afterend', covidTable);

      document.querySelector(`.${shared.ID}-openLightbox`).addEventListener('click', (e) => {
        // alert('clicked!');
        document.querySelector(`.${shared.ID}-TPpdp`).classList.add('show');
        document.querySelector(`.${shared.ID}-overlay`).classList.remove('hidden');
        document.querySelector(`.${shared.ID}-close`).classList.remove('hidden');
      });
    });

    pollerLite([`.main`], () => {
      // // --- Re-run TP script
      // window.Trustpilot.loadFromElement(document.querySelector(`.${shared.ID}-TPhomepage .trustpilot-widget`));
      const reviewsObj = workplacePDPData;
      console.log(reviewsObj);
      let reviews = '';
      for (const key in reviewsObj) {
        const review = reviewsObj[key];
        let oneLineReview = '';
        if (review.review.length <= 59) {
          oneLineReview = 'one-line-review';
        }
        reviews += `<li class="${shared.ID}-TPreview ${oneLineReview}">
          <a href="https://www.trustpilot.com/users/${key}" target="_blank">
            <span class="${shared.ID}-TPreview__review">${review.review}</span>
            <span class="${shared.ID}-TPreview__reviewer">${review.name}</span>
          </a>
        </li>`;
      }

      //<span>Training with us during Covid-19.</span><span>Our customers say:</span>
      let tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19. Our customers say:</div>`;
      if (window.innerWidth < 421) {
        tpLabelText = `<div class="${shared.ID}-TPlabel">Training with us during Covid-19.</br>Our customers say:</div>`;
      }

      const tpBannerContainer = `<div class="${shared.ID}-TPbanner__wrapper">
        <div class="${shared.ID}-TPlabel__wrapper">
          ${tpLabelText}
        </div>
        <div class="${shared.ID}-TPreviews__wrapper">
          <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 stars: Excellent">
          <ul class="${shared.ID}-TPreviews__container">
            ${reviews}
          </ul>
        </div>
      </div>`;
      document.querySelector('main').insertAdjacentHTML('afterbegin', tpBannerContainer);
      initiateSlick();
    });

  }

  
  
};


export default activate;