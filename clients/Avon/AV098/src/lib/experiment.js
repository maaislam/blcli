/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setCookie, getCookie } from '../../../../../lib/utils';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import { imgSourcs, menuItems, renderNewNavElm, renderSampleMsg, sampleLogos } from './content';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  fireEvent('Conditions Met');
  menuItems.forEach((item) => {
    const menuItem = document.querySelector(`.site-navigation-megamenu.${item}`).previousElementSibling;
    ['mouseenter', 'touchstart'].forEach((event) => {
      menuItem.addEventListener(event, (e) => {
        fireEvent('Customer views the navigation');
      });
    });
  });

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
  if (document.querySelector(`[class^="${ID}-nav__element--"]`)) return;
  //render new Nav Element

  menuItems.forEach((item, i) => {
    renderNewNavElm(item, imgSourcs[i], ID);

    document
      .querySelector(`.site-navigation-megamenu.${item}`)
      .getElementsByTagName('ul')[0]
      .append(renderSampleMsg(ID, 'desktop', sampleLogos[i].url, sampleLogos[i].name));
  });

  document
    .querySelector(`#site-navigation`)
    .querySelector('.second-level')
    .append(renderSampleMsg(ID, 'mobile-nav__lvl2', sampleLogos[0].url));
  //swap img for backgroundImage
  const imgWrapper = document.querySelectorAll('.round-img__wrapper');
  imgWrapper.forEach((elem) => {
    elem.style.backgroundImage = `url(${elem.getAttribute('data-src')})`;
  });

  //set cookie to rtemember where the user clicked

  document.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('.new-nav__elem') ||
      e.target.closest('.new__nav--link') ||
      e.target.closest('.new-nav__elem')
    ) {
      const sampleType = e.target.closest('.new-nav__elem').getAttribute('data-item');

      setCookie('sample-type', sampleType, 2);

      fireEvent(`customer clicked ${sampleType} sample option`);
      location.href = '/collections/sample';
    }
  });

  var setToFullWidth = () => {
    const elem = document.querySelectorAll('.AV098-sample__msg--desktop');
    elem.forEach((item) => {
      const distFrmEdge = getComputedStyle(document.querySelector('.second-level')).getPropertyValue('padding-left');

      item.style.marginLeft = `-${distFrmEdge}`;
      item.style.paddingLeft = `${distFrmEdge}`;
    });
  };

  document.querySelector('.second-level').addEventListener('mouseenter', setToFullWidth);
  if (location.pathname === '/collections/sample') {
    const sample = getCookie('sample-type');

    const choosenSample = (clickedSample) => {
      if (clickedSample === 'make-up') {
        return document.querySelector("[data-value='Make-Up & Cosmetics']");
      } else if (clickedSample === 'skincare') {
        return document.querySelector("[data-value='Anew Skincare']");
      } else if (clickedSample === 'fragrance') {
        return document.querySelector("[data-value='Fragrance Samples']");
      }
    };

    var checkExist = setInterval(function () {
      if (document.querySelectorAll('.kuFilterNames')[0]) {
        choosenSample(sample)?.dispatchEvent(new Event('click'));
        clearInterval(checkExist);
      }
    }, 100); // check every 100ms

    setCookie('sample-type', '');
  }
};
