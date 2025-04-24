/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, observePageChange } from '../../../../../lib/utils';
import BraSizes from './BraSizes';
import { h, render } from 'preact';

const { ID, VARIATION } = shared;

export const comparisonChart = [
  {ukSize: '28D', usSize: '28D'},
  {ukSize: '28DD', usSize: '28DD/E'},
  {ukSize: '28E', usSize: '28DDD/F'},
  {ukSize: '28EF', usSize: '28DDD/F/DDDD/G'},
  {ukSize: '28F', usSize: '28DDDD/G'},
  {ukSize: '28FF', usSize: '28H'},
  {ukSize: '28FFG', usSize: '28H/I'},
  {ukSize: '28G', usSize: '28I'},
  {ukSize: '28GG', usSize: '28J'},
  {ukSize: '28GGH', usSize: '28J/K'}, 
  {ukSize: '28H', usSize: '28K'},
  {ukSize: '28HH', usSize: '28L'},
  {ukSize: '28HHJ', usSize: '28L/M'},
  {ukSize: '28J', usSize: '28M'},
  {ukSize: '28JJ', usSize: '28N'},
  {ukSize: '28K', usSize: '28O'},
  {ukSize: '30D', usSize: '30D'},
  {ukSize: '30DD', usSize: '30DD/E'},
  {ukSize: '30DDD', usSize: '30D/DD/E'},
  {ukSize: '30DDE', usSize: '30DD/E/DDD/F'},
  {ukSize: '30E', usSize: '30DDD/F'},
  {ukSize: '30EF', usSize: '30DDD/F/DDDD/G'},
  {ukSize: '30F', usSize: '30DDDD/G'},
  {ukSize: '30FF', usSize: '30H'},
  {ukSize: '30FFF', usSize: '30DDDD/G/H'},
  {ukSize: '30FFG', usSize: '30H/I'},
  {ukSize: '30G', usSize: '30I'},
  {ukSize: '30GG', usSize: '30J'},
  {ukSize: '30GGG', usSize: '30I/J'},
  {ukSize: '30GGH', usSize: '30J/K'},
  {ukSize: '30H', usSize: '30K'},
  {ukSize: '30HH', usSize: '30L'},
  {ukSize: '30HHH', usSize: '30K/L'},
  {ukSize: '30HHJ', usSize: '30L/M'},
  {ukSize: '30J', usSize: '30M'},
  {ukSize: '30JJ', usSize: '30N'},
  {ukSize: '30JJJ', usSize: '30M/N'},
  {ukSize: '30K', usSize: '30O'},
  {ukSize: '30KK', usSize: '30P'},
  {ukSize: '32D', usSize: '32D'},
  {ukSize: '32DD', usSize: '32DD/E'},
  {ukSize: '32DDD', usSize: '32D/DD/E'},
  {ukSize: '32DDE', usSize: '32DD/E/DDD/F'},
  {ukSize: '32E', usSize: '32DDD/F'},
  {ukSize: '32EF', usSize: '32DDD/F/DDDD/G'},
  {ukSize: '32F', usSize: '32DDDD/G'},
  {ukSize: '32FF', usSize: '32H'},
  {ukSize: '32FFF', usSize: '32DDDD/G/H'},
  {ukSize: '32FFG', usSize: '32H/I'},
  {ukSize: '32G', usSize: '32I'},
  {ukSize: '32GG', usSize: '32J'},
  {ukSize: '32GGG', usSize: '32I/J'},
  {ukSize: '32GGH', usSize: '32J/K'},
  {ukSize: '32H', usSize: '32K'},
  {ukSize: '32HH', usSize: '32L'},
  {ukSize: '32HHH', usSize: '32K/L'},
  {ukSize: '32HHJ', usSize: '32L/M'},
  {ukSize: '32J', usSize: '32M'},
  {ukSize: '32JJ', usSize: '32N'},
  {ukSize: '32JJJ', usSize: '32M/N'},
  {ukSize: '32JJK', usSize: '32N/O'},
  {ukSize: '32K', usSize: '32O'},
  {ukSize: '32KK', usSize: '32P'},
  {ukSize: '32L', usSize: '32Q'},
  {ukSize: '34D', usSize: '34D'},
  {ukSize: '34DD', usSize: '34DD/E'},
  {ukSize: '34DDD', usSize: '34D/DD/E'},
  {ukSize: '34DDE', usSize: '34DD/E/DDD/F'},
  {ukSize: '34E', usSize: '34DDD/F'},
  {ukSize: '34EF', usSize: '34DDD/F/DDDD/G'},
  {ukSize: '34F', usSize: '34DDDD/G'},
  {ukSize: '34FF', usSize: '34H'},
  {ukSize: '34FFF', usSize: '34DDDD/G/H'},
  {ukSize: '34FFG', usSize: '34H/I'},
  {ukSize: '34G', usSize: '34I'},
  {ukSize: '34GG', usSize: '34J'},
  {ukSize: '34GGG', usSize: '34I/J'},
  {ukSize: '34GGH', usSize: '34J/K'},
  {ukSize: '34H', usSize: '34K'},
  {ukSize: '34HH', usSize: '34L'},
  {ukSize: '34HHH', usSize: '34K/L'},
  {ukSize: '34HHJ', usSize: '34L/M'},
  {ukSize: '34J', usSize: '34M'},
  {ukSize: '34JJ', usSize: '34N'},
  {ukSize: '34JJJ', usSize: '34M/N'},
  {ukSize: '34JJK', usSize: '34N/O'},
  {ukSize: '34K', usSize: '34O'},
  {ukSize: '34KK', usSize: '34P'},
  {ukSize: '34L', usSize: '34Q'},
  {ukSize: '36D', usSize: '36D'},
  {ukSize: '36DD', usSize: '36DD/E'},
  {ukSize: '36DDD', usSize: '36D/DD/E'},
  {ukSize: '36DDE', usSize: '36DD/E/DDD/F'},
  {ukSize: '36E', usSize: '36DDD/F'},
  {ukSize: '36EF', usSize: '36DDD/F/DDDD/G'},
  {ukSize: '36F', usSize: '36DDDD/G'},
  {ukSize: '36FF', usSize: '36H'},
  {ukSize: '36FFF', usSize: '36DDDD/G/H'},
  {ukSize: '36FFG', usSize: '36H/I'},
  {ukSize: '36G', usSize: '36I'},
  {ukSize: '36GG', usSize: '36J'},
  {ukSize: '36GGG', usSize: '36I/J'},
  {ukSize: '36GGH', usSize: '36J/K'},
  {ukSize: '36H', usSize: '36K'},
  {ukSize: '36HH', usSize: '36L'},
  {ukSize: '36HHH', usSize: '36K/L'},
  {ukSize: '36HHJ', usSize: '36L/M'},
  {ukSize: '36J', usSize: '36M'},
  {ukSize: '36JJ', usSize: '36N'},
  {ukSize: '36JJJ', usSize: '36M/N'},
  {ukSize: '36JJK', usSize: '36N/O'},
  {ukSize: '36K', usSize: '36O'},
  {ukSize: '36KK', usSize: '36P'},
  {ukSize: '36L', usSize: '36Q'},
  {ukSize: '38D', usSize: '38D'},
  {ukSize: '38DD', usSize: '38DD/E'},
  {ukSize: '38DDD', usSize: '38D/DD/E'},
  {ukSize: '38DDE', usSize: '38DD/E/DDD/F'},
  {ukSize: '38E', usSize: '38DDD/F'},
  {ukSize: '38EF', usSize: '38DDD/F/DDDD/G'},
  {ukSize: '38F', usSize: '38DDDD/G'},
  {ukSize: '38FF', usSize: '38H'},
  {ukSize: '38FFF', usSize: '38DDDD/G/H'},
  {ukSize: '38FFG', usSize: '38H/I'},
  {ukSize: '38G', usSize: '38I'},
  {ukSize: '38GG', usSize: '38J'},
  {ukSize: '38GGG', usSize: '38I/J'},
  {ukSize: '38GGH', usSize: '38J/K'},
  {ukSize: '38H', usSize: '38K'},
  {ukSize: '38HH', usSize: '38L'},
  {ukSize: '38HHH', usSize: '38K/L'},
  {ukSize: '38HHJ', usSize: '38L/M'},
  {ukSize: '38J', usSize: '38M'},
  {ukSize: '38JJ', usSize: '38N'},
  {ukSize: '38JJJ', usSize: '38M/N'},
  {ukSize: '38JJK', usSize: '38N/O'},
  {ukSize: '38K', usSize: '38O'},
  {ukSize: '38KK', usSize: '38P'},
  {ukSize: '38L', usSize: '38Q'},
  {ukSize: '40D', usSize: '40D'},
  {ukSize: '40DD', usSize: '40DD/E'},
  {ukSize: '40DDD', usSize: '40D/DD/E'},
  {ukSize: '40DDE', usSize: '40DD/E/DDD/F'},
  {ukSize: '40E', usSize: '40DDD/F'},
  {ukSize: '40EF', usSize: '40DDD/F/DDDD/G'},
  {ukSize: '40F', usSize: '40DDDD/G'},
  {ukSize: '40FF', usSize: '40H'},
  {ukSize: '40FFF', usSize: '40DDDD/G/H'},
  {ukSize: '40FFG', usSize: '40H/I'},
  {ukSize: '40G', usSize: '40I'},
  {ukSize: '40GG', usSize: '40J'},
  {ukSize: '40GGG', usSize: '40I/J'},
  {ukSize: '40GGH', usSize: '40J/K'},
  {ukSize: '40H', usSize: '40K'},
  {ukSize: '40HH', usSize: '40L'},
  {ukSize: '40HHH', usSize: '40K/L'},
  {ukSize: '40HHJ', usSize: '40L/M'},
  {ukSize: '40J', usSize: '40M'},
  {ukSize: '40JJ', usSize: '40N'},
  {ukSize: '40JJJ', usSize: '40M/N'},
  {ukSize: '40JJK', usSize: '40N/O'},
  {ukSize: '40K', usSize: '40O'},
  {ukSize: '40KK', usSize: '40P'},
  {ukSize: '40L', usSize: '40Q'},
];

/**
 * Create containers markup
 */
 const createMarkup = (container, where = 'beforeend') => {
  if(container) {
    container.insertAdjacentHTML(where, `
      <div class="${ID}-sizes">
      </div>
    `);
  }
};

const initSizeExp = () => {
  setup();

  const containerExisting = document.querySelector(`.${ID}-sizes`);
  if(containerExisting) {
    containerExisting.parentNode.removeChild(container);
  }

  addPoller([
    '.c-product-details .c-field-brasize'
  ], () => {
    const c = document.querySelector('.c-product-details .c-field-brasize');
    createMarkup(c);

    const container = document.querySelector(`.${ID}-sizes`);

    if(container) {
      render(<BraSizes />, container);
    }
  });

  addPoller([
    '.c-product-details__size-grid'
  ], () => {
    const c = document.querySelector('.c-product-details__size-grid');
    c.classList.add(`${ID}-force-hide`);
    createMarkup(c, 'afterend');

    const container = document.querySelector(`.${ID}-sizes`);

    if(container) {
      render(<BraSizes />, container);
    }
  });
};

const startExperiment = () => {

  if(window.outerWidth < 560) {

    addPoller(['.c-field-brasize', '.c-field-brasize__button'], () => {

      initSizeExp();

      fireEvent('Visible - Mobile - sizes selector altered to show cup/back size selector along with US sizes inline');
      
    });


  } else {

    addPoller(['.c-product-details__size-grid__title .c-product-details__brand'], () => {

      let allTHSizeTable = document.querySelectorAll('.c-size-grid tbody td');
      [].slice.call(allTHSizeTable).forEach((td) => {
        if(td.querySelector('span') && !td.querySelector('span').classList.contains('c-size-grid__item--no-stock') && !td.querySelector(`.${ID}-ussize`)) {
          let prodCode = td.querySelector('input').getAttribute('data-value');

          let currSize = prodCode.substring(8, prodCode.length);

          let compChart = comparisonChart.find(element => element.ukSize == currSize);
    
          td.querySelector('span').insertAdjacentHTML('afterbegin', `<div class="${ID}-ussize">US <span class="${ID}-ussize--bold">${compChart.usSize}</span></div>`);
          
        }
        
      });

      fireEvent('Visible - Desktop - sizes altered to show hover state tooltips of US sizes');

      
    });
  }

}

const addEvents = () => {
  addPoller(['.c-product-details__add-to-bag > button'], () => {
    let atbButton = document.querySelector('.c-product-details__add-to-bag > button');
    addEventListener(atbButton, 'click', (e) => {
      if(!e.currentTarget.classList.contains('.c-button--disabled')) {
        fireEvent(`Click - user clicked on the ATB button to add product: ${window.location.href} to their basket`);
      }
      
    })
  })
  

}

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  observePageChange(document.body, (p) => {

    if(p.oldHref !== p.href) {
      addEvents();
    }

  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();

  observePageChange(document.body, (p) => {

    if(p.oldHref !== p.href) {
      startExperiment();
    }

  });

  addEventListener(window, 'orientationchange', () => {
    location.reload();
  });

  // add experiment observer to re-add body classes when megamenu opened
  var body = document.body;
  if(body) {
    addObserver(body, function () {
      
      if(!document.documentElement.classList.contains(ID)) {
        document.documentElement.classList.add(ID);
      }

      

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    });
  } 
};
