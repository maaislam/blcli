/**
 * HSS011 - PDP Pricing calculator
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, dateConversion, calculateCost, getDayOfWeek, getNumOfDays, updateInfo } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  if (shared.VARIATION == 'control' && !document.querySelector('.hire_now div.out-of-stock-content.col-xs-12')) {
    events.send('CRO Experiment', `${shared.ID}`, 'Control - Activated', { sendOnce: true });
  } else if (!document.querySelector('.hire_now div.out-of-stock-content.col-xs-12')) {
    // rest of experiment code
    events.send('CRO Experiment', `${shared.ID}`, 'V1 - Activated', { sendOnce: true });
    setup();
    let hireFrom = document.querySelector('input#hireFromDate').value;
    hireFrom = dateConversion(hireFrom);
    let dayOfHire = getDayOfWeek(hireFrom);
    // console.log('FIRST DAY:');
    // console.log(`${hireFrom} is ${dayOfHire}`);

    let hireTo = document.querySelector('input#hireToDate').value;
    hireTo = dateConversion(hireTo);
    let dayOfReturn = getDayOfWeek(hireTo);
    // console.log('LAST DAY:');
    // console.log(`${hireTo} is ${dayOfReturn}`);
    
    let numOfDays = getNumOfDays(hireFrom, hireTo);
    // alert(`[035] Number of days: ${numOfDays}`);
    let cost = calculateCost(numOfDays, dayOfHire, dayOfReturn);
    // alert(`[037] Cost for this is: £${cost}`);

    // console.log(`${shared.ID} is RUNNING  ---`);
    let res = '';
    res = hireFrom.split('/');
    let startDate = `${res[1]}/${res[0]}`;
    res = hireTo.split('/');
    let endDate = `${res[1]}/${res[0]}`;
    // alert(`total cost is ${cost}`);
    const postcodeInput = document.querySelector('.check_input');
    const costContainer = `<div class="${shared.ID}-costInfo__wrapper">
      <div class="${shared.ID}-costInfo">
        <span class="${shared.ID}-label">HIRE PRICE FOR <span class="${shared.ID}-start-date">${startDate}</span> - <span class="${shared.ID}-end-date">${endDate}</span>, <span class="${shared.ID}-numberOf-days"></span>:</span>
        <span class="${shared.ID}-cost__wrapper">
          <span class="${shared.ID}-cost">£${cost}</span>
        </span>
      </div>
    </div>`;

    if (!document.querySelector(`.${shared.ID}-costInfo__wrapper`)) {
      postcodeInput.insertAdjacentHTML('beforebegin', costContainer);
    }
    
    if (numOfDays === 0) {
      document.querySelector(`span.${shared.ID}-numberOf-days`).innerText = `1 day`;
    } else if (numOfDays === 1) {
      document.querySelector(`span.${shared.ID}-numberOf-days`).innerText = `${numOfDays} day`;
    } else {
      document.querySelector(`span.${shared.ID}-numberOf-days`).innerText = `${numOfDays} days`;
    }
    
    
    const costEl = document.querySelector(`.${shared.ID}-cost`);
    const numOfDaysEl = document.querySelector(`.${shared.ID}-numberOf-days`);
    // Observers
    observer.connect(document.querySelector('input#hireFromDate'), () => {
      // console.log('HIRE DATE from HAS CHANGED');
      updateInfo(hireFrom, hireTo, res, startDate, endDate, dayOfHire, dayOfReturn, numOfDays, cost, costEl, numOfDaysEl);
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // nodeTree: true,
      },
    });

    observer.connect(document.querySelector('input#hireToDate'), () => {
      // console.log('HIRE DATE to HAS CHANGED');
      updateInfo(hireFrom, hireTo, res, startDate, endDate, dayOfHire, dayOfReturn, numOfDays, cost, costEl, numOfDaysEl);
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // nodeTree: true,
      },
    });

    observer.connect(document.querySelector('#ui-datepicker-div'), () => {
      // setTimeout(() => {
        startDate = document.querySelector(`.${shared.ID}-start-date`).innerText;
        endDate = document.querySelector(`.${shared.ID}-end-date`).innerText;
        let costText = document.querySelector(`.${shared.ID}-cost`).innerText;
        let el = `<div id="${shared.ID}-popUpContent">Hire price ${startDate} - ${endDate}: ${costText}</div>`;
        const closeCTA = document.querySelector(`#ui-datepicker-div .ui-close`);
        if (!document.querySelector(`#${shared.ID}-popUpContent`)) {
          closeCTA.insertAdjacentHTML('beforebegin', el);
        }
        
      // }, 500);
      
      // window.location.reload();
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // nodeTree: true,
      },
    });
    
  }
};


