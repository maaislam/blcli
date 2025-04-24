/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import modalTop from './components/modalTop';
//import equityArray from './data/data';
import { observeIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    //console.log('🚀 ~ entries.forEach ~ entry:', entry);
    const stickySection = document.querySelector(`.${ID}__modalTop`);
    const modal = document.querySelector(`.${ID}__modalTop`);
    const dropdown = stickySection.querySelector('.wrapper-dropdown');
    const arrowIcon = stickySection.querySelector('svg');

    let scrollTimer;
    clearTimeout(scrollTimer);
    if (entry.isIntersecting || entry.boundingClientRect.y > 0) {
      stickySection.classList.remove(`${ID}__show`);
      stickySection.classList.add('slide-out-bottom');
      scrollTimer = setTimeout(() => {
        stickySection.classList.add(`${ID}__hide`);
      }, 250);
    } else {
      stickySection.classList.remove('slide-out-bottom');
      stickySection.classList.remove(`${ID}__hide`);
      stickySection.classList.add(`${ID}__show`);

      if (!document.body.classList.contains(`${ID}__condition-met`)) {
        fireEvent('Conditions Met');
        document.body.classList.add(`${ID}__condition-met`);
      }
    }

    modal.classList.remove('active');
    dropdown.classList.remove('active');
    arrowIcon.classList.remove('rotated');
  });
};

const collectData = () => {
  if (!document.querySelector('#content')) {
    const allH2Elems = document.querySelectorAll('section h2:not(.accordion-heading)');

    const allTableData = Array.from(allH2Elems).map((item) => {
      if (!item.textContent.toLowerCase().includes('ready to get started') && item.textContent !== '') {
        const text = item.textContent.trim();
        
        item.setAttribute('id', text.replace(/\s+/g, '-').replace(/\?/g, '').toLowerCase());
        const link = item.id;
  
        return {
          name: text,
          url: `#${link}`,
        };
      }

    }).filter(Boolean); // remove undefined values

    return allTableData;
  }
  const tableContent = document.querySelector('.text-simple ul.list.list--chevron');
  const tableContentElements = Array.from(tableContent.querySelectorAll('li'));

  const allTableData = tableContentElements.map((item) => {
    const text = item.querySelector('span')?.innerText.trim();
    const link = item.querySelector('a')?.href;

    return {
      name: text,
      url: `${link}`,
    };
  });

  return allTableData;
};

const init = () => {
  const target = document.body;
  const krBodyContainer = document.querySelector('.kr-body-container');
  const intersectionAnchor =
    krBodyContainer.querySelector('.hero-banner__section--additional') ||
    krBodyContainer.querySelector('.hero-banner') ||
    krBodyContainer.querySelector('#conv-calc');
  let euityData;

  //const { pathname } = window.location;
  // if (pathname === '/equity-release') {
  //   euityData = equityArray;
  // } else if (pathname.includes('/equity-release/')) {
  //   euityData = collectData();
  // }
  euityData = collectData();
  if (!euityData) {
    return;
  }
  // console.log('🚀 ~ init ~ euityData:', euityData);

  if (!target.querySelector(`.${ID}__modalTop`) && VARIATION !== 'Control') {
    target.insertAdjacentHTML('beforeend', modalTop(ID, euityData));
  }

  observeIntersection(intersectionAnchor, 0, handleIntersection);
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['datalayer'];
  newEvents.property = 'G-LNFZ1KRLB8';
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.selected-wrapper`)) {
      const modal = document.querySelector(`.${ID}__modalTop`);
      const dropdown = document.querySelector('.wrapper-dropdown');
      const arrowIcon = dropdown.querySelector('svg');
      modal.classList.toggle('active');
      dropdown.classList.toggle('active');
      arrowIcon.classList.toggle('rotated');
    } else if (target.closest(`.${ID}__modalTop-content-two`)) {
      fireEvent('user clicks to go back to the top');
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (target.closest(`.${ID}__item`)) {
      fireEvent('user clicks a link from the content jumper');
      //const linkElem = target.querySelector('a');
      const text = target.innerText;
      const selectedText = document.querySelector('.selected-display');
      selectedText.innerText = text;
    } else if (target.closest(`.${ID}__modalTop .dropdown-footer-button`)) {
      const calcBtn = document.querySelector('.hero-banner a.button__primary');
      calcBtn ? calcBtn.click() : window.scrollTo(0, 0);
    } else if (target.closest(`.${ID}__modalTop-overlay`)) {
      document.querySelector(`.${ID}__modalTop .selected-wrapper`).click();
    }
  });

  init();
};
