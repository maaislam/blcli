import {
  addCssToHead,
  addScriptToHead,
  fireEvent,
  formatText,
  newEvents,
  numberObjext,
  obsIntersection,
  setup,
} from './helpers/utils';
import shared from '../../../../../core-files/shared';
import { viewContent } from './components/viewContent';
import { data, pageList } from './data/data';
import planComparison from './components/planComparison';
import viewMoreCover from './components/viewMoreCover';
import { listItems } from './data/listItems';
import { listStr } from './components/listStr';
import promoBar from './components/promoBar';
import { pollerLite } from '../../../../../lib/utils';
import filterSlidesByPlan from './helpers/filterSlidesByPlan';
import showAllSlider from './helpers/showAllSlider';
import tagStr from './components/tagStr';
import insertTrustpilotMicroCombo from './helpers/insertTrustpilotMicroCombo';
import generateTrustpilotRating from './helpers/insertTrustpilotMicroCombo';

const { ID, VARIATION } = shared;

const handleIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenCarousel`)) {
      fireEvent('User scrolls the carousel');
      document.body.classList.add(`${ID}__seenCarousel`);
    }
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, handleIntersection);
  }
};

const test035Init = () => {
  const { pathname } = window.location;
  const plpData = listItems[pathname];
  if (!plpData) {
    return;
  }
  const promoBoxes = document.querySelectorAll('.category-items .promo-box');
  promoBoxes.forEach((box) => {
    const targetPoint = box.querySelector('.list');
    const findOutUrl = box.querySelector('.btn--rounded').href.split('.uk')[1];
    const productData = plpData[findOutUrl];
    if (box.querySelector(`.${ID}__list`)) {
      box.querySelector(`.${ID}__list`).remove();
    }
    targetPoint && targetPoint.insertAdjacentHTML('beforebegin', listStr(ID, productData));

    const firstInactiveItem = box.querySelector(`.${ID}__active--no`);
    if (firstInactiveItem) {
      firstInactiveItem.classList.add(`${ID}__first-inactive`);
    }
  });
};

const test047Init = () => {
  const promoBoxes = document.querySelectorAll('.category-items .promo-box');
  promoBoxes.forEach((box) => {
    const bubbleElement = box.querySelector('.bubble');
    const claimRibon = box.querySelector('.claims-ribbon');
    const serviceWrapper = box.querySelector('.service-box');
    const buttons = box.querySelectorAll('.choose-excess > div');
    !bubbleElement && box.classList.add(`${ID}__promoBox`);
    if (bubbleElement && !box.querySelector(`.${ID}__promoBar`)) {
      const bubbleText = bubbleElement.innerText;

      const mainText = formatText(bubbleText);

      bubbleElement.insertAdjacentHTML('beforebegin', promoBar(ID, mainText));
    }

    if (buttons && buttons.length > 1) {
      box.querySelector('.choose-excess').classList.add(`${ID}__excess`);
    }

    claimRibon && serviceWrapper?.querySelector('.no-service')?.insertAdjacentElement('beforeend', claimRibon);
    if (!box.querySelector('.no-service') && claimRibon) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
          <div class="no-service"></div>`;
      wrapper.classList.add('service-box');
      box.insertAdjacentElement('beforeend', wrapper);
      wrapper.querySelector('.no-service').insertAdjacentElement('beforeend', claimRibon);
    }

    if (box.classList.contains('promo-box--grey') && box.querySelector(`.${ID}__list-title`)) {
      box.querySelector(`.${ID}__list-title`).textContent = `With this plan, you'll get:`;
    }
  });
};
const fetchTrustpilotReviews = () => {
  const trustpilotApiUrl = 'https://api.trustpilot.com/v1/business-units/64b11585032e5461343eaae5';
  const apiKey = 'VK9z8jj9woA9vzmnoULdEvrOnDz6g192'; // Replace with your actual API key

  return fetch(`${trustpilotApiUrl}?apikey=${apiKey}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching Trustpilot data:', error));
};
const init = () => {
  const { pathname } = window.location;
  const pageType = pageList[pathname];
  document.body.classList.add(`${ID}__${pageType}`);

  const pageElem = document.querySelector('.page.page--category');
  const trustPilotMobileElem = document.querySelector('#tpMobile');
  const bannerContentElement = document.querySelector('.hero-banner__content');
  const bannerdescriptionElement = bannerContentElement.querySelector('p.intro');
  const rowCategoryItems = document.querySelector('.row.category-items');
  const promoCards = document.querySelectorAll('.promo-box');

  if (VARIATION !== 'control') {
    pageElem.insertAdjacentElement('afterbegin', trustPilotMobileElem);
  }

  promoCards.forEach((promoCard) => {
    const promoCardLink = promoCard.querySelector('a');
    const promoUrl = promoCardLink.getAttribute('href');
    const planName = data[promoUrl];
    const promoBoxTitle = promoCard.querySelector('h3');

    if (planName) promoCard.setAttribute('data-plan', planName);
    if (planName && !promoCard.querySelector(`.${ID}__tag`) && VARIATION !== 'control') {
      promoBoxTitle.insertAdjacentHTML('beforebegin', tagStr(ID, planName));
    }
  });

  if (VARIATION === 'control') return;

  if (!document.querySelector(`.${ID}__viewContent`)) {
    bannerdescriptionElement.insertAdjacentHTML('afterend', viewContent(ID));
  }

  if (!document.querySelector(`.${ID}__plans`)) rowCategoryItems.insertAdjacentHTML('beforebegin', planComparison(ID));
  if (!document.querySelector(`.${ID}__viewMoreCover`))
    rowCategoryItems.insertAdjacentHTML('afterend', viewMoreCover(ID, pageType));

  pollerLite([() => window.Trustpilot && typeof window.Trustpilot.loadFromElement === 'function'], () => {
    fetchTrustpilotReviews()
      .then((data) => {
        if (data && data.numberOfReviews && data.numberOfReviews.total) {
          const trustPilotTargetPoint = document.querySelector('#tpMobile');
          trustPilotTargetPoint.insertAdjacentHTML(
            'beforebegin',
            generateTrustpilotRating(ID, data.score.stars, data.numberOfReviews.total)
          );
        }
      })
      .catch((error) => console.error('Failed to fetch reviews:', error));
  });
};
export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest(`span.${ID}__viewContent`)) {
      const clickedItem = target.closest(`span.${ID}__viewContent`);
      const testElement = clickedItem.querySelector(`.${ID}__text`);
      const wrapper = clickedItem.closest('.hero-banner__content');
      if (!wrapper.classList.contains(`${ID}__show`)) {
        wrapper.classList.add(`${ID}__show`);
        testElement.textContent = 'Show less';
      } else {
        wrapper.classList.remove(`${ID}__show`);
        testElement.textContent = 'View more';
      }

      fireEvent('User clicks “view more” in hero');
    } else if (target.closest(`.${ID}__tooltipBtn`)) {
      const tooltipBox = document.querySelector(`.${ID}__tooltip`);
      setTimeout(() => tooltipBox.classList.remove(`${ID}__hide`), 150);
      tooltipBox.classList.add(`${ID}__show`);

      fireEvent('User clicks on tooltip');
    } else if (target.closest(`.${ID}__plan`)) {
      const plansWrapper = document.querySelector(`.${ID}__plansWrapper`);
      const activePlan = target.closest(`.${ID}__plan`);
      const allPlans = document.querySelectorAll(`.${ID}__plan`);

      allPlans.forEach((plan) => plan.classList.remove(`${ID}__active`));
      activePlan.classList.add(`${ID}__active`);

      plansWrapper.classList.add(`${ID}__filterActive`);

      const planName = activePlan.getAttribute('data-plan');
      fireEvent(`User interacts with ${planName}`);

      filterSlidesByPlan(planName);
    } else if (target.closest(`.${ID}__showAll`)) {
      const plansWrapper = document.querySelector(`.${ID}__plansWrapper`);
      const allPlans = document.querySelectorAll(`.${ID}__plan`);

      allPlans.forEach((plan) => plan.classList.remove(`${ID}__active`));
      plansWrapper.classList.remove(`${ID}__filterActive`);

      showAllSlider();
    } else if (target.closest(`.${ID}__coverUrl`)) {
      const coverUrl = target.closest(`.${ID}__coverUrl`);
      const coverName = coverUrl.getAttribute('data-cover');
      fireEvent(`User clicks on the ${coverName} button`);
    } else if (target.closest('.faq-wrapper') && target.closest('li')) {
      const listELem = target.closest('li');
      const listText = listELem.querySelector('p').textContent;
      fireEvent(`User interacts with ${listText}`);
    } else if (target.closest('.promo-box') && target.closest('a.btn--rounded')) {
      const promoBoxes = document.querySelectorAll('.promo-box');
      const index = [...promoBoxes].indexOf(target.closest('.promo-box'));
      const promoBox = promoBoxes[index];
      const { plan } = promoBox.dataset;
      fireEvent(`User clicked "Find Out More" CTA on product ${index + 1} ${plan} type`);
    }

    if (target.closest(`.${ID}__tooltipCrossIcon`)) {
      const tooltipBox = document.querySelector(`.${ID}__tooltip`);
      tooltipBox.classList.remove(`${ID}__show`);
      tooltipBox.classList.add(`${ID}__hide`);
    }
  });

  pollerLite(['.row.category-items'], () => {
    handleObserver('.row.category-items');
  });

  if (VARIATION == 'control') {
    const promoBoxes = document.querySelectorAll('.promo-box');
    const handleIntersectionForPromoBoxes = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = [...promoBoxes].indexOf(entry.target);
          if (!document.querySelector(`.${ID}__slide_${index + 1}`)) {
            const promoBox = promoBoxes[index];
            const { plan } = promoBox.dataset;

            fireEvent(`Customer scrolls to see product ${index + 1} of ${plan} type`);
            document.body.classList.add(`${ID}__slide_${index + 1}`);
          }
        }
      });
    };
    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(handleIntersectionForPromoBoxes, {
      root: null,
      threshold: 0.2,
    });

    promoBoxes.forEach((promoBox) => observer.observe(promoBox));
  }

  if (VARIATION !== 'control') {
    test035Init();
    test047Init();
  }

  init();

  //add swiper

  if (VARIATION === 'control') {
    return;
  }

  addCssToHead('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  addScriptToHead('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperInit = () => {
    pollerLite(['.promo-box', () => typeof window.Swiper == 'function'], () => {
      const slides = document.querySelectorAll('.promo-box');
      const wrapper = document.querySelector('.row.category-items');
      slides.forEach((slide) => {
        slide.classList.add('swiper-slide');

        slide.closest('.row').classList.add('swiper');

        const swiperParentElem = slide.closest('.swiper');
        const swiperWrapper = swiperParentElem.querySelector('div');
        swiperWrapper.classList.remove('grid');
        swiperWrapper.classList.add('swiper-wrapper');
      });

      wrapper.querySelectorAll('.swiper-pagination').forEach((el) => el.remove());
      wrapper.querySelectorAll('.swiper-button-next').forEach((el) => el.remove());
      wrapper.querySelectorAll('.swiper-button-prev').forEach((el) => el.remove());

      document.querySelector('.row.category-items .swiper-wrapper').insertAdjacentHTML(
        'afterend',
        `
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        `
      );

      const swiper = new window.Swiper('.swiper', {
        slidesPerView: 1.15,
        spaceBetween: 10,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          slideChange: () => {
            const promoBoxes = document.querySelectorAll('.promo-box');
            const { activeIndex } = swiper; // Destructure Swiper properties

            if (!document.querySelector(`.${ID}__slide_${activeIndex + 1}`)) {
              const promoBox = promoBoxes[activeIndex];
              const { plan } = promoBox.dataset;
              fireEvent(`User has seen the ${numberObjext[activeIndex + 1]} product card of ${plan} type`);
              document.body.classList.add(`${ID}__slide_${activeIndex + 1}`);
            }
          },
        },
      });
    });
  };

  swiperInit();

  // Listen for orientation changes
  window.matchMedia('(orientation: portrait)').addEventListener('change', (e) => {
    const portrait = e.matches;
    if (portrait) {
      swiperInit();
    } else {
      window.location.reload();
    }
  });
};
