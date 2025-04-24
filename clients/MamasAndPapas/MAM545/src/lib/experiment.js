/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import productGuideMapping from './productGuideMapping';

const { ID, VARIATION } = shared;

const observeElementInView = (selector, callback, options = {}) => {
  const elements = document.querySelectorAll(selector);
  const observerOptions = {
    root: options.root || null, // null means the viewport
    rootMargin: options.rootMargin || '0px',
    threshold: options.threshold || 0.1, // 10% of the element must be visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target, true); // Element is in view
      } else {
        callback(entry.target, false); // Element is not in view
      }
    });
  }, observerOptions);

  elements.forEach((element) => observer.observe(element));
};

const buyingGuide = (id, guideUrlData) => {
  const { title, subtitle, url } = guideUrlData;

  const htmlStr = `<div class="${id}__buying-guide">
    <div class="${id}__buying-guide-heading">${title}</div>
    <div class="${id}__buyuing-guide-description">${subtitle}</div>
    <a href="${url}" class="${id}__buying-guide-cta">
      <div style="display: flex;align-items: center;">
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 3.88013C1.885 3.51013 3.154 3.11113 4.388 2.98713C5.718 2.85313 6.846 3.05013 7.5 3.73913V13.4851C6.565 12.9551 5.38 12.8821 4.287 12.9921C3.107 13.1121 1.917 13.4531 1 13.8031V3.88013ZM8.5 3.73913C9.154 3.05013 10.282 2.85313 11.612 2.98713C12.846 3.11113 14.115 3.51013 15 3.88013V13.8031C14.082 13.4531 12.893 13.1111 11.713 12.9931C10.619 12.8821 9.435 12.9541 8.5 13.4851V3.73913ZM8 2.83513C7.015 1.98813 5.587 1.86213 4.287 1.99213C2.773 2.14513 1.245 2.66413 0.293 3.09713C0.205649 3.13685 0.131575 3.20088 0.079621 3.28156C0.0276667 3.36224 2.65714e-05 3.45617 0 3.55213L0 14.5521C2.3162e-05 14.6358 0.0210371 14.7181 0.0611171 14.7915C0.101197 14.865 0.159062 14.9272 0.229411 14.9724C0.29976 15.0177 0.380345 15.0446 0.463783 15.0507C0.547222 15.0567 0.630848 15.0418 0.707 15.0071C1.589 14.6071 3.01 14.1261 4.387 13.9871C5.796 13.8451 6.977 14.0741 7.61 14.8641C7.65685 14.9225 7.71622 14.9697 7.78372 15.002C7.85122 15.0344 7.92513 15.0512 8 15.0512C8.07487 15.0512 8.14878 15.0344 8.21628 15.002C8.28378 14.9697 8.34315 14.9225 8.39 14.8641C9.023 14.0741 10.204 13.8451 11.612 13.9871C12.99 14.1261 14.412 14.6071 15.293 15.0071C15.3692 15.0418 15.4528 15.0567 15.5362 15.0507C15.6197 15.0446 15.7002 15.0177 15.7706 14.9724C15.8409 14.9272 15.8988 14.865 15.9389 14.7915C15.979 14.7181 16 14.6358 16 14.5521V3.55213C16 3.45617 15.9723 3.36224 15.9204 3.28156C15.8684 3.20088 15.7944 3.13685 15.707 3.09713C14.755 2.66413 13.227 2.14513 11.713 1.99213C10.413 1.86113 8.985 1.98813 8 2.83513Z" fill="#323232"></path>
        </svg>
      </div>
      <div>Buying Guide</div>
    </a>
  </div>`;

  return htmlStr;
};

const init = () => {
  const { pathname } = window.location;
  const buyerGuideUrlData = productGuideMapping[pathname];

  const productDescTabs = document.querySelector('.product-single__description.tabs');
  const descTab = productDescTabs.querySelector('label[for="tab-1"] + #tabpanel-1 > .tab__wrapper');

  descTab.insertAdjacentHTML('beforeend', buyingGuide(ID, buyerGuideUrlData));

  observeElementInView(`.${ID}__buying-guide`, (element, inView) => {
    if (inView) {
      fireEvent('Buying Guide In View');
    }
  });
};

export default () => {
  setup();
  const triggerPoints = [25, 50, 75];
  let triggered = [];

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-PVM1K635XR';

  fireEvent('Conditions Met');

  window.addEventListener('scroll', () => {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const scrollPercentage = (currentScroll / totalScrollHeight) * 100;

    triggerPoints.forEach((point) => {
      if (scrollPercentage >= point && !triggered.includes(point)) {
        //console.log(`Triggering at ${point}%`);
        fireEvent(`Scroll ${point}%`);
        triggered.push(point);
      }
    });
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__buying-guide-cta`)) {
      fireEvent('Buying Guide CTA Clicked');
    } else if (target.closest('.product-form__cart-submit')) {
      fireEvent('user clicked add to bag');
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  init();
};
