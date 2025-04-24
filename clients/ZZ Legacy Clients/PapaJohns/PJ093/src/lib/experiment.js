/**
 * PJ093 - Offers Page - New Offers Page - Version 2
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * https://www.papajohns.co.uk/stores/manchester-central/offers.aspx
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID}  is RUNNING---`);
  // console.log(data);
  // const standardOffersPanel = document.querySelector(`#StandardOffersPanel`);
  // const newOffersPanel  = document.querySelector(`#NewOffersPanel`);
  if (shared.VARIATION == '1') {
    /**
     * @desc Hide old Offers design and show NEW
     */
    // newOffersPanel.setAttribute('style', 'display: block !important;');
    // standardOffersPanel.setAttribute('style', 'display: none !important;');

    // const deals = document.querySelectorAll('#NewOffersPanel [data-dealid]');
    const deals = document.querySelectorAll('.main.offer--merchandise [data-dealid]');
    let topDeals = 0;
    let priorityNumbers = [];
    /**
     * @desc Loop through all deals based on data-dealid
     * and add class names with priority order number
     * Stores in array @param priorityNumbers priority number from data object
     */
    [].forEach.call(deals, (d) => {
      // d.setAttribute('style', 'background-color: lightblue;');
      const id = d.getAttribute('data-dealid');
      // console.log(id);
      let priorityNum = (data[`${id}`] || {}).priority;
      if(!priorityNum) {
        return;
      }

      // console.log(priorityNum);
      d.classList.add(`${shared.ID}-deal__${priorityNum}`);
      priorityNum = parseInt(priorityNum);
      if (!priorityNumbers.includes(priorityNum)) {
        priorityNumbers.push(priorityNum);
      }

      if (d.closest('.menuList.offerList')) {
        // console.log('----- topDeal -----');
        // --- Top Deal ---
        d.closest('.menuList.offerList').classList.add('topDeal');
        d.closest('.menuList.offerList').setAttribute('id', `${shared.ID}-deal__${priorityNum}-container`);
        d.closest('.menuList.offerList').setAttribute('data-priority-order', `${priorityNum}`);
        // const subText = d.closest('.topDeal').querySelector('.offer--body p').innerText.trim();
      } else if (d.closest('.moreOffersList')) {
        // --- Other Deal ---
        d.closest('.moreOffersList').classList.add('otherDeal');
        d.closest('.moreOffersList').setAttribute('id', `${shared.ID}-deal__${priorityNum}-container`);
        d.closest('.moreOffersList').setAttribute('data-priority-order', `${priorityNum}`);
        // const subText = d.querySelector('td.text p').innerText.trim();

      }
      
    });

    /**
     * @desc Sort numbers in @param priorityNumbers array in ascending order
     */
    let priorityNumbersCopy = priorityNumbers.slice();
    priorityNumbersCopy.sort((a,b) => parseInt(a)-parseInt(b));
    

    /**
     * @desc Loop through priorityNumbers and re-order based on the first FOUR 
     * Creates new TOP DEALS if they do not already exist on TOP Section
     */
    let maxOffers = 0;
    for (let i = 0; i <= priorityNumbersCopy.length; i += 1) {
      const item = priorityNumbersCopy[i];
      document.querySelector(`#${shared.ID}-deal__${item}-container.topDeal`);
      document.querySelector(`#${shared.ID}-deal__${item}-container.otherDeal`);
      if (maxOffers < 4) {
        if (document.querySelector(`#${shared.ID}-deal__${item}-container.topDeal`)) {
          // document.querySelector(`#${shared.ID}-deal__${item}-container`).classList.add(`${shared.ID}-topDeal`);
          document.querySelector(`#${shared.ID}-deal__${item}-container`).classList.remove('hidden');
          // document.querySelector(`#${shared.ID}-deal__${item}-container.topDeal`).setAttribute('style', 'background-color: lightgreen;');
          document.querySelector(`#${shared.ID}-deal__${item}-container.topDeal`).classList.add(`newTopDeal`);

          maxOffers += 1;
        } else if (document.querySelector(`#${shared.ID}-deal__${item}-container.otherDeal`)) {
          // -- Create duplicate on TOP OFFERS
          const d = document.querySelector(`#${shared.ID}-deal__${item}-container.otherDeal`);
          const id = d.querySelector('[data-dealid]').getAttribute('data-dealid');
          const subText = d.querySelector('td.text p').innerText.trim();
          let offerName = data[`${id}`].name;
          if (offerName.indexOf('£x.xx') > -1) {
            offerName = document.querySelector(`.${shared.ID}-deal__${item} h3.offer--title`).innerText.trim();
          }
          const newOfferEl = `<div id="${shared.ID}-deal__${item}-container" class="menuList offerList newTopDeal ${shared.ID}-newTopDeal" data-priority-order="${item}">
              <div class="menuListCont">
                  
                  <div class="pic" style="background-image: url('${data[`${id}`].img}');"></div>
                  <div class="offer--body">
                      <h2 class="w100">${offerName}</h2>
                      <div class="clearFix"></div>
                      <p>${subText}</p>
                  </div>
                  <div class="offer--btns">
                      <table>
                          <tbody>
                              <tr>
                                  <td>
                                      <a id="${shared.ID}-deal__${item}" data-order="${item}" class="greenButton">
                                          <span class="centerB">Choose this deal</span>
                                          <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                      </a>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              
          </div>`;

          if (!d.querySelector('a.aspNetDisabled')) {
            document.querySelector('.menuItems').insertAdjacentHTML('beforeend', newOfferEl);

            maxOffers += 1;

            // --- Hide other offer that's moved to Top
            // d.setAttribute('style', 'background-color: lightcoral;');
            d.classList.add('hiddenOtherDeal');
            d.classList.add('hidden');
          } else {
            // d.setAttribute('style', 'background-color: lightgreen;');
          }
  
          
          
        }
      }
      
    }

    /**
     * @desc Get all TOP DEALS
     * If Original Top Deal does not exist in the TOP FOUR in @param priorityNumbers
     * then HIDE deal and create new OTHER Offer
     */
    // --- All Top Deals
    const allTopDeals = document.querySelectorAll('.topDeal');
    [].forEach.call(allTopDeals, (d) => {
      if (!d.classList.contains('newTopDeal')) {
        d.setAttribute('style', 'border: 2px solid red;');
        d.classList.add('hidden');
        const greenBtns = d.querySelectorAll('[data-dealid]');
        [].forEach.call(greenBtns, (btn) => {
          // const priorityData = d.getAttribute('data-priority-order');
          const id = btn.getAttribute('data-dealid');
          const priorityData = (data[`${id}`] || {}).priority;
          if(!priorityData) {
            return;
          }
          let subText = d.querySelector('.offer--body p').innerText.trim();
          let offerName = data[`${id}`].name;

          if (offerName.indexOf('£x.xx') > -1) {
            offerName = document.querySelector(`#${shared.ID}-deal__${priorityData}-container.menuList h2`).innerText.trim();
          }

          if(id == 620) {
            subText = 'Any large pizza, 1 classic side and 1 premium chicken side for only £20.99';
          }

          // -- Create duplicate on OTHER OFFERS
          //style="background-color: lightblue;"
          const newOtherOfferEl = `<div id="${shared.ID}-deal__${priorityData}-container" class="moreOffersList ${shared.ID}-otherDeal" data-priority-order="${priorityData}">
            <a id="${shared.ID}-deal__${priorityData}" class="${shared.ID}-newOtherDeal">
              <table class="main--table">
                <tbody>
                  <tr class="main--row">
                    <td class="offer-details">
                      <table>
                          <tbody><tr>
                              <td class="text">
                                  <h3 class="offer--title">${offerName}</h3>
                                  <p>${subText}</p>
                              </td>
                              <td class="icon">
                                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                              </td>
                          </tr>
                      </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </a>
          </div>`;

          document.querySelector('.more--offers--wrapper').insertAdjacentHTML('afterbegin', newOtherOfferEl);
        });
        
      } 

    });

    // --- Newly added Top Deals
    /**
     * @desc Click events for newly added top deals
     */
    const newAddedTopDeals = document.querySelectorAll(`.${shared.ID}-newTopDeal`);
    [].forEach.call(newAddedTopDeals, (d) => {
      const greenBtn = d.querySelector('.greenButton');
      greenBtn.addEventListener('click', (e) => {
        let dealId = d.getAttribute('id');
        dealId = dealId.replace('-container', '');
        const hiddenDealToClick = document.querySelector(`.hiddenOtherDeal .${dealId}`);
        hiddenDealToClick.click();
      });
    });

    // --- New added Other Deals
    /**
     * @desc Click events for newly added other deals
     */
    const newAddedOtherDeals = document.querySelectorAll(`.${shared.ID}-newOtherDeal`);
    [].forEach.call(newAddedOtherDeals, (d) => {
      d.addEventListener('click', (e) => {
        let dealId = d.getAttribute('id');
        // dealId = dealId.replace('-container', '');
        const hiddenTopDealToClick = document.querySelector(`.${dealId}`);
        hiddenTopDealToClick.click();
      });
    });

    // ----------------------------------
    // Now re-order the items based on priority order
    // ----------------------------------
    const postSort = (container, childClass) => {
      if(!container) {
        return;
      }

      const elmsArr = [].slice.call(container.querySelectorAll(childClass)).sort((a,b) => {
        return ( ( parseInt(a.getAttribute('data-priority-order') || 99) ) - parseInt((b.getAttribute('data-priority-order') || 99)) );
      });


      elmsArr.forEach((elm) => {
        container.appendChild(elm);
      });
    };

    postSort(document.querySelector('.more--offers--wrapper'), '.moreOffersList');
    postSort(document.querySelector('#NewOffersPanel .menuItems'), '.menuList');

  } else if (shared.VARIATION == 'control') {
    newOffersPanel.setAttribute('style', 'display: none !important;');
  }

  // Now sort
};


export default activate;
