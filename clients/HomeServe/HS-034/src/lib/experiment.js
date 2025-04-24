import shared from '../../../../../core-files/shared';
import getStarted from './components/getStarted';
import data from './data/data';
import { fireEvent, newEvents, obsIntersection, onUrlChange, setup } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  const getQueryParamValue = (paramName) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
  };
  const { pathname, search } = window.location;

  const paramKey = search.includes('propertyType') ? 'propertyType' : search.includes('Type') ? 'Type' : null;
  const paramKeyAlt = search.includes('propertyType') ? 'Type' : search.includes('Type') ? 'Type' : null;

  const typeParams = getQueryParamValue(paramKey) || '';
  const path = search && paramKey ? `${pathname}?${paramKeyAlt}=${typeParams}` : pathname;

  //console.log('🚀 ~ init ~ path:', path);
  const detailsData = data[path];
  //console.log('🚀 ~ init ~ detailsData:', detailsData);

  let interval = setInterval(() => {
    const attachPoint = document.querySelector('.row.has-bg-teal') || document.querySelector('#get-started');
    if (document.querySelector(`.${ID}__getStarted`)) {
      document.querySelector(`.${ID}__getStarted`).remove();
    }
    attachPoint.insertAdjacentHTML('beforebegin', getStarted(ID, detailsData));
  }, 500);
  setTimeout(() => {
    clearInterval(interval);
    const stickyHeader = document.querySelector('#stickyClone') || document.querySelector('#price-sticky-header');
    const callback = (entry) => {
      //console.log('🚀 ~ callback ~ entry:', entry);

      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        stickyHeader.style.display = 'flex';
        stickyHeader.style.opacity = 1;
      } else {
        stickyHeader.style.display = 'none';
      }
    };
    const intersectionAnchor = document.querySelectorAll('[data-sticky="stickyClone"]')[0];

    if (intersectionAnchor) {
      stickyHeader.style.display = '';
      stickyHeader.classList.add('is-sticky');
      obsIntersection(intersectionAnchor, 0.1, callback);
    }
  }, 3000);
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__eligibilityBtn`)) {
      const ctrEligibileBtn = document.querySelector('[href="#faq-eligible"]');
      ctrEligibileBtn.click();
    } else if (target.closest(`.${ID}__termsConditions span`)) {
      fireEvent('Customer clicks the Agreement or T&C');
      const ctrFaqDocBtn = document.querySelector('[href="#faq-documents"]');
      ctrFaqDocBtn.click();
    } else if (target.closest(`.${ID}__btnWrapper .apply-now-btn`)) {
      fireEvent('Customer clicks “Apply Now”');
      const ctrBtn = document.querySelector('.has-bg-teal a.btn--rounded:not(.hidden)');

      if (!ctrBtn) {
        const ctrApplyBtn = document.querySelector('#get-started .apply-now-btn');
        ctrApplyBtn.click();
        return;
      }

      ctrBtn.click();
    } else if (target.closest('#label_propertyToggle1') || target.closest('#label_propertyToggle2')) {
      fireEvent('Customer clicks the “House / Flat” Radio buttons');
    } else if (target.closest('.apply-now-btn')) {
      fireEvent('Customer clicks “Apply Now”');
    } else if (target.closest('#get-started [href="#faq-documents"]')) {
      fireEvent('Customer clicks the Agreement or T&C');
    } else if (target.closest('[href="#faq-eligible"]')) {
      fireEvent('Customer clicks Check if you’re eligible link');
    } else if (target.closest('.has-bg-teal a.house') || target.closest('.has-bg-teal a.flat')) {
      fireEvent('Customer clicks “Apply Now”');
    }
  });

  const intersectionCallback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
      fireEvent('Customer scrolls to Primary CTA area');
    }
  };

  const intersectionAnchor = document.querySelector('.upsell-container') || document.getElementById('insurance-details');
  obsIntersection(intersectionAnchor, 1, intersectionCallback);

  if (VARIATION == 'control') return;

  init();

  onUrlChange(() => {
    init();
  });
};
