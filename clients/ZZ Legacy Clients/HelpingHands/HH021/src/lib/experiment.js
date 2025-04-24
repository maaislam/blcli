import { setup } from './services';
import { scrollTo, viewabilityTracker, events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * {{HH021}} - {{Interaction with reviews}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const mobileLocation = docVar.getElementById('main-nav');
      const desktopLocation = bodyVar.querySelector('.row > .text-center');
      const reviewElement = bodyVar.querySelector('.pull-quote.quotation');
      const sdesktopLocation = bodyVar.querySelector('.col-md-3.logo-block');
      // eslint-disable-next-line
      let firstScroll = true;

      return {
        docVar,
        bodyVar,
        mobileLocation,
        desktopLocation,
        reviewElement,
        sdesktopLocation,
        firstScroll,
      };
    })(),
    init: () => {
      setup();
      Exp.render.desktopMarkup();
      Exp.render.smallDesktopMarkup();
      Exp.render.mobileMarkup();
      Exp.bindExperimentEvents.reviewButton();
      Exp.bindExperimentEvents.trackReview();
    },
    render: {
      mobileMarkup: () => {
        Exp.cache.mobileLocation.insertAdjacentHTML('afterend', `
        <div class="HH021_Container HH021_Mobile">
          <span class="HH021_Text">Read our reviews</span>
          <img class="HH021_Image" alt="Click to read our reviews" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/416f9858f61fb45f972e51289d9d9cfb_hh021_image.png" />
        </div>
      `);
      },
      smallDesktopMarkup: () => {
        Exp.cache.sdesktopLocation.insertAdjacentHTML('beforeend', `
        <div class="HH021_Container HH021_SDesktop">
          <span class="HH021_Text">Read our reviews</span>
          <img class="HH021_Image" alt="Click to read our reviews" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/416f9858f61fb45f972e51289d9d9cfb_hh021_image.png" />
        </div>
      `);
      },
      desktopMarkup: () => {
        Exp.cache.desktopLocation.insertAdjacentHTML('beforebegin', `
        <div class="HH021_Container HH021_Desktop">
          <span class="HH021_Text">Read our reviews</span>
          <img class="HH021_Image" alt="Click to read our reviews" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/416f9858f61fb45f972e51289d9d9cfb_hh021_image.png" />
        </div>
      `);
      },
    },
    bindExperimentEvents: {
      handleButtonClick: () => {
        // Send event
        events.send(`${settings.ID}`, 'Clicked', 'Review CTA', { sendOnce: true });
        // Set storage item if not done so
        if (!localStorage.getItem('UC_HH021')) {
          localStorage.setItem('UC_HH021', 'UC_HH021');
        }
        const scrollElement = Exp.cache.reviewElement.getBoundingClientRect();
        const scrollCompensation = window.pageYOffset || Exp.cache.docVar.documentElement.scrollTop;
        // calculate new scroll location based on first scroll
        let scrollLocation = 0;
        if (Exp.cache.firstScroll) {
          Exp.cache.firstScroll = false;
          scrollLocation = scrollElement.bottom + scrollCompensation + 130;
        } else {
          scrollLocation = (scrollElement.top - 5) + scrollCompensation;
        }
        scrollTo(scrollLocation, 3000);
      },
      reviewButton: () => {
        const allReviewButtons = Exp.cache.bodyVar.querySelectorAll('.HH021_Container');
        for (let i = 0, n = allReviewButtons.length; i < n; i += 1) {
          allReviewButtons[i].addEventListener('click', Exp.bindExperimentEvents.handleButtonClick);
        }
      },
      trackReview: () => {
        viewabilityTracker(Exp.cache.reviewElement, () => {
          // Send Event
          events.send(`${settings.ID}`, 'Viewed', 'Viewed Review', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
