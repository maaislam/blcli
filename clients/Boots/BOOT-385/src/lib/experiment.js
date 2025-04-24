/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { observer, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;
let currTotalItems = 0;

const startExperiment = (totalBasketValue, pageType) => {
  totalBasketValue = parseFloat(totalBasketValue);
	let totalRemainder = 50 - totalBasketValue;
	totalRemainder = totalRemainder < 0 ? 0 : totalRemainder.toFixed(2);
	let totalRemainderDisplay = '£' + totalRemainder;

  console.log("IEFNQIFNEIFNEIFNEIFNEIFNEIFNEIFNEFNIENF: "+totalBasketValue)

	let bannerHTML = `
  
    <div class="${ID}-banner ${totalBasketValue >= 25 ? `${ID}-hidden` : ``}">
    
      <div class="${ID}-banner--svg">
        <svg id="${ID}-truck" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.25 7.875C19.25 6.42525 18.0747 5.25 16.625 5.25H4.375C2.92525 5.25 1.75 6.42525 1.75 7.875V13.125C1.75 14.5747 2.92525 15.75 4.375 15.75H16.625C18.0747 15.75 19.25 14.5747 19.25 13.125V10.0625H21V14L21.005 14.1235C21.0577 14.7753 21.5235 15.3125 22.1375 15.3125H25.375V19.6875H22.75V20.125C22.75 18.6753 21.5747 17.5 20.125 17.5C18.8243 17.5 17.7446 18.446 17.5363 19.6875H10.4637C10.2554 18.446 9.17569 17.5 7.875 17.5C6.57431 17.5 5.49458 18.446 5.28629 19.6875H2.625V20.5625H5.28629C5.49458 21.804 6.57431 22.75 7.875 22.75C9.17569 22.75 10.2554 21.804 10.4637 20.5625H17.5363C17.7446 21.804 18.8243 22.75 20.125 22.75C21.5747 22.75 22.75 21.5747 22.75 20.125V20.5625H26.25V13.125L26.2457 12.9396C26.1489 10.8511 24.425 9.1875 22.3125 9.1875H19.25V7.875ZM25.375 14.4375V13.125C25.375 11.49 24.0938 10.1543 22.4805 10.067L22.3125 10.0625H21.875V14C21.875 14.2278 21.9835 14.3919 22.0915 14.4294L22.1375 14.4375H25.375ZM4.375 6.125H16.625L16.7556 6.1298C17.6611 6.19661 18.375 6.95243 18.375 7.875V13.125L18.3702 13.2556C18.3034 14.1611 17.5476 14.875 16.625 14.875H4.375L4.2444 14.8702C3.33889 14.8034 2.625 14.0476 2.625 13.125V7.875L2.6298 7.7444C2.69661 6.83889 3.45243 6.125 4.375 6.125ZM6.125 20.125C6.125 19.1585 6.9085 18.375 7.875 18.375C8.8415 18.375 9.625 19.1585 9.625 20.125C9.625 21.0915 8.8415 21.875 7.875 21.875C6.9085 21.875 6.125 21.0915 6.125 20.125ZM20.125 21.875C19.1585 21.875 18.375 21.0915 18.375 20.125C18.375 19.1585 19.1585 18.375 20.125 18.375C21.0915 18.375 21.875 19.1585 21.875 20.125C21.875 21.0915 21.0915 21.875 20.125 21.875Z" fill="#05054B"/><path d="M19.25 10.0625V9.9625H19.15V10.0625H19.25ZM21 10.0625H21.1V9.9625H21V10.0625ZM21 14H20.8999L20.9001 14.004L21 14ZM21.005 14.1235L20.905 14.1275L20.9053 14.1315L21.005 14.1235ZM25.375 15.3125H25.475V15.2125H25.375V15.3125ZM25.375 19.6875V19.7875H25.475V19.6875H25.375ZM22.75 19.6875V19.5875H22.65V19.6875H22.75ZM17.5363 19.6875V19.7875H17.6209L17.6349 19.704L17.5363 19.6875ZM10.4637 19.6875L10.3651 19.704L10.3791 19.7875H10.4637V19.6875ZM5.28629 19.6875V19.7875H5.37091L5.38492 19.704L5.28629 19.6875ZM2.625 19.6875V19.5875H2.525V19.6875H2.625ZM2.625 20.5625H2.525V20.6625H2.625V20.5625ZM5.28629 20.5625L5.38492 20.546L5.37091 20.4625H5.28629V20.5625ZM10.4637 20.5625V20.4625H10.3791L10.3651 20.546L10.4637 20.5625ZM17.5363 20.5625L17.6349 20.546L17.6209 20.4625H17.5363V20.5625ZM22.75 20.5625H22.65V20.6625H22.75V20.5625ZM26.25 20.5625V20.6625H26.35V20.5625H26.25ZM26.25 13.125H26.35L26.35 13.1227L26.25 13.125ZM26.2457 12.9396L26.3457 12.9373L26.3456 12.935L26.2457 12.9396ZM19.25 9.1875H19.15V9.2875H19.25V9.1875ZM25.375 14.4375V14.5375H25.475V14.4375H25.375ZM22.4805 10.067L22.4859 9.96714L22.4832 9.96707L22.4805 10.067ZM22.3125 10.0625L22.3152 9.9625H22.3125V10.0625ZM21.875 10.0625V9.9625H21.775V10.0625H21.875ZM22.0915 14.4294L22.0588 14.5239L22.0663 14.5265L22.0741 14.5279L22.0915 14.4294ZM22.1375 14.4375L22.1201 14.536L22.1287 14.5375H22.1375V14.4375ZM16.625 6.125L16.6287 6.025H16.625V6.125ZM16.7556 6.1298L16.763 6.03L16.7593 6.02987L16.7556 6.1298ZM18.375 13.125L18.475 13.1287V13.125H18.375ZM18.3702 13.2556L18.47 13.263L18.4701 13.2593L18.3702 13.2556ZM4.375 14.875L4.37133 14.975H4.375V14.875ZM4.2444 14.8702L4.23703 14.97L4.24072 14.9701L4.2444 14.8702ZM2.625 7.875L2.525 7.87132V7.875H2.625ZM2.6298 7.7444L2.53 7.73703L2.52987 7.74072L2.6298 7.7444ZM16.625 5.35C18.0195 5.35 19.15 6.48048 19.15 7.875H19.35C19.35 6.37002 18.13 5.15 16.625 5.15V5.35ZM4.375 5.35H16.625V5.15H4.375V5.35ZM1.85 7.875C1.85 6.48048 2.98048 5.35 4.375 5.35V5.15C2.87002 5.15 1.65 6.37002 1.65 7.875H1.85ZM1.85 13.125V7.875H1.65V13.125H1.85ZM4.375 15.65C2.98048 15.65 1.85 14.5195 1.85 13.125H1.65C1.65 14.63 2.87002 15.85 4.375 15.85V15.65ZM16.625 15.65H4.375V15.85H16.625V15.65ZM19.15 13.125C19.15 14.5195 18.0195 15.65 16.625 15.65V15.85C18.13 15.85 19.35 14.63 19.35 13.125H19.15ZM19.15 10.0625V13.125H19.35V10.0625H19.15ZM21 9.9625H19.25V10.1625H21V9.9625ZM21.1 14V10.0625H20.9V14H21.1ZM21.1049 14.1194L21.0999 13.996L20.9001 14.004L20.9051 14.1275L21.1049 14.1194ZM22.1375 15.2125C21.5893 15.2125 21.1543 14.7302 21.1046 14.1154L20.9053 14.1315C20.961 14.8205 21.4577 15.4125 22.1375 15.4125V15.2125ZM25.375 15.2125H22.1375V15.4125H25.375V15.2125ZM25.475 19.6875V15.3125H25.275V19.6875H25.475ZM22.75 19.7875H25.375V19.5875H22.75V19.7875ZM22.85 20.125V19.6875H22.65V20.125H22.85ZM22.85 20.125C22.85 18.62 21.63 17.4 20.125 17.4V17.6C21.5195 17.6 22.65 18.7305 22.65 20.125H22.85ZM20.125 17.4C18.7747 17.4 17.6539 18.3821 17.4377 19.671L17.6349 19.704C17.8353 18.5099 18.874 17.6 20.125 17.6V17.4ZM17.5363 19.5875H10.4637V19.7875H17.5363V19.5875ZM10.5623 19.671C10.3461 18.3821 9.22534 17.4 7.875 17.4V17.6C9.12604 17.6 10.1647 18.5099 10.3651 19.704L10.5623 19.671ZM7.875 17.4C6.52466 17.4 5.4039 18.3821 5.18767 19.671L5.38492 19.704C5.58525 18.5099 6.62396 17.6 7.875 17.6V17.4ZM5.28629 19.5875H2.625V19.7875H5.28629V19.5875ZM2.525 19.6875V20.5625H2.725V19.6875H2.525ZM2.625 20.6625H5.28629V20.4625H2.625V20.6625ZM5.18767 20.579C5.4039 21.8679 6.52466 22.85 7.875 22.85V22.65C6.62396 22.65 5.58525 21.7401 5.38492 20.546L5.18767 20.579ZM7.875 22.85C9.22534 22.85 10.3461 21.8679 10.5623 20.579L10.3651 20.546C10.1647 21.7401 9.12604 22.65 7.875 22.65V22.85ZM10.4637 20.6625H17.5363V20.4625H10.4637V20.6625ZM17.4377 20.579C17.6539 21.8679 18.7747 22.85 20.125 22.85V22.65C18.874 22.65 17.8353 21.7401 17.6349 20.546L17.4377 20.579ZM20.125 22.85C21.63 22.85 22.85 21.63 22.85 20.125H22.65C22.65 21.5195 21.5195 22.65 20.125 22.65V22.85ZM22.85 20.5625V20.125H22.65V20.5625H22.85ZM26.25 20.4625H22.75V20.6625H26.25V20.4625ZM26.15 13.125V20.5625H26.35V13.125H26.15ZM26.1457 12.942L26.15 13.1273L26.35 13.1227L26.3457 12.9373L26.1457 12.942ZM22.3125 9.2875C24.3713 9.2875 26.0515 10.9088 26.1458 12.9443L26.3456 12.935C26.2464 10.7933 24.4787 9.0875 22.3125 9.0875V9.2875ZM19.25 9.2875H22.3125V9.0875H19.25V9.2875ZM19.15 7.875V9.1875H19.35V7.875H19.15ZM25.475 14.4375V13.125H25.275V14.4375H25.475ZM25.475 13.125C25.475 11.4366 24.1519 10.0573 22.4859 9.96718L22.4751 10.1669C24.0356 10.2513 25.275 11.5434 25.275 13.125H25.475ZM22.4832 9.96707L22.3152 9.96254L22.3098 10.1625L22.4778 10.167L22.4832 9.96707ZM22.3125 9.9625H21.875V10.1625H22.3125V9.9625ZM21.775 10.0625V14H21.975V10.0625H21.775ZM21.775 14C21.775 14.1295 21.8058 14.2442 21.855 14.3341C21.9031 14.4219 21.9738 14.4944 22.0588 14.5239L22.1243 14.3349C22.1012 14.3269 22.0636 14.2986 22.0305 14.2381C21.9984 14.1796 21.975 14.0983 21.975 14H21.775ZM22.0741 14.5279L22.1201 14.536L22.1549 14.339L22.1089 14.3309L22.0741 14.5279ZM22.1375 14.5375H25.375V14.3375H22.1375V14.5375ZM16.625 6.025H4.375V6.225H16.625V6.025ZM16.7593 6.02987L16.6287 6.02507L16.6213 6.22493L16.7519 6.22973L16.7593 6.02987ZM18.475 7.875C18.475 6.89967 17.7203 6.1007 16.763 6.03007L16.7482 6.22953C17.6019 6.29251 18.275 7.0052 18.275 7.875H18.475ZM18.475 13.125V7.875H18.275V13.125H18.475ZM18.4701 13.2593L18.4749 13.1287L18.2751 13.1213L18.2703 13.2519L18.4701 13.2593ZM16.625 14.975C17.6003 14.975 18.3993 14.2203 18.4699 13.263L18.2705 13.2482C18.2075 14.1019 17.4948 14.775 16.625 14.775V14.975ZM4.375 14.975H16.625V14.775H4.375V14.975ZM4.24072 14.9701L4.37133 14.9749L4.37867 14.7751L4.24807 14.7703L4.24072 14.9701ZM2.525 13.125C2.525 14.1003 3.27969 14.8993 4.23704 14.9699L4.25175 14.7705C3.39809 14.7075 2.725 13.9948 2.725 13.125H2.525ZM2.525 7.875V13.125H2.725V7.875H2.525ZM2.52987 7.74072L2.52507 7.87133L2.72493 7.87867L2.72973 7.74807L2.52987 7.74072ZM4.375 6.025C3.39967 6.025 2.6007 6.77969 2.53007 7.73704L2.72953 7.75175C2.79251 6.89809 3.5052 6.225 4.375 6.225V6.025ZM7.875 18.275C6.85327 18.275 6.025 19.1033 6.025 20.125H6.225C6.225 19.2137 6.96373 18.475 7.875 18.475V18.275ZM9.725 20.125C9.725 19.1033 8.89673 18.275 7.875 18.275V18.475C8.78627 18.475 9.525 19.2137 9.525 20.125H9.725ZM7.875 21.975C8.89673 21.975 9.725 21.1467 9.725 20.125H9.525C9.525 21.0363 8.78627 21.775 7.875 21.775V21.975ZM6.025 20.125C6.025 21.1467 6.85327 21.975 7.875 21.975V21.775C6.96373 21.775 6.225 21.0363 6.225 20.125H6.025ZM18.275 20.125C18.275 21.1467 19.1033 21.975 20.125 21.975V21.775C19.2137 21.775 18.475 21.0363 18.475 20.125H18.275ZM20.125 18.275C19.1033 18.275 18.275 19.1033 18.275 20.125H18.475C18.475 19.2137 19.2137 18.475 20.125 18.475V18.275ZM21.975 20.125C21.975 19.1033 21.1467 18.275 20.125 18.275V18.475C21.0363 18.475 21.775 19.2137 21.775 20.125H21.975ZM20.125 21.975C21.1467 21.975 21.975 21.1467 21.975 20.125H21.775C21.775 21.0363 21.0363 21.775 20.125 21.775V21.975Z" fill="#05054B"/></svg>
        <svg id="${ID}-spinner" width="28" height="28" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5" stroke="#121923" stroke-width="1.2"/></svg>
      </div>
    
      <div class="${ID}-banner--text">
        <p> You're only <span id="${ID}-delvalue">${totalRemainderDisplay}</span> away from <span>FREE</span> standard delivery</p>
      </div>

    </div>
  
  
  `;

  if(pageType == "product") {
    pollerLite([`#estore_productpage_template_container`], () => {
      let pageContainer = document.getElementById('estore_productpage_template_container');
      pageContainer.insertAdjacentHTML('beforebegin', bannerHTML);
      fireEvent(`Visible - banner added to the ${pageType} page, basket value: ${totalBasketValue.toFixed(2)} which is ${totalBasketValue >= 25 ? `over` : `under`} the minimum delivery threshold, ${totalBasketValue >= 25 ? `banner hidden` : `banner visible`}`, true);
    });
  } else {
    pollerLite([`#estore_lister_template_container`], () => {
      let pageContainer = document.getElementById('estore_lister_template_container');
      pageContainer.insertAdjacentHTML('beforebegin', bannerHTML);
      fireEvent(`Visible - banner added to the ${pageType} page, basket value: ${totalBasketValue.toFixed(2)} which is ${totalBasketValue >= 25 ? `over` : `under`} the minimum delivery threshold, ${totalBasketValue >= 25 ? `banner hidden` : `banner visible`}`, true);
    });
  }

	
};

const updateDeliveryBanner = (totalBasketValue) => {
  totalBasketValue = parseFloat(totalBasketValue);
  let totalRemainder = 25 - totalBasketValue;
  totalRemainder = totalRemainder < 0 ? 0 : totalRemainder.toFixed(2);
  let totalRemainderDisplay = '£' + totalRemainder;

  if (totalBasketValue >= 25) {
		document.querySelector(`.${ID}-banner`).classList.add(`${ID}-hidden`);
	} else {
    document.querySelector(`.${ID}-banner`).classList.remove(`${ID}-hidden`);
    document.getElementById(`${ID}-delvalue`).innerHTML = totalRemainderDisplay;
    document.querySelector(`.${ID}-banner`).classList.remove(`${ID}-calculating`);
	}

  fireEvent(`Interaction - banner updated with value: ${totalRemainderDisplay} which is ${totalBasketValue >= 25 ? `over` : `under`} the minimum delivery threshold, ${totalBasketValue >= 25 ? `banner hidden` : `banner visible`}`, true);
};

const getCurrBasketAmount = () => {

  return new Promise((resolve, reject) => {

    let headers = {
      siteid: 'UK',
      channel: 'Ecommerce',
      context: 'BASKET'
    };

    $.ajax({
      cache: true,
      type: 'GET',
      url: '/api/checkout/basket?calculatePromotions=true',
      data: '',
      headers: headers,
      dataType: 'json',
      success: function (returnedData) {
        if (returnedData) {
          let totalBasketValue = returnedData.basketDetails?.totalAdjustedPrice?.amount ? returnedData.basketDetails.totalAdjustedPrice.amount : 0;
          let totalItemCount = returnedData.basketDetails?.totalItemCount ? returnedData.basketDetails.totalItemCount : 0;

          let basket = {
            totalBasketValue: totalBasketValue,
            totalItemCount: totalItemCount
          }

          resolve(basket);
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        if (textStatus != 'abort') console.error(textStatus + errorThrown);
        return null;
      }
    });

    
  });


	
};

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent('Conditions Met');

	if (window.usabilla_live) {
		window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

  let dataLayer = window.dataLayer;
  let defaultPageView;
  [].slice.call(dataLayer).forEach((item) => {
    
    if(item.event === 'defaultPageView') {
      defaultPageView = item;
    }

  });

  let defaultPageType = "listing";

  if (defaultPageView.page.type == "Listing") {

    // PLP Page
    defaultPageType = "listing";
    fireEvent(`Interaction - user has visited PLP page ${window.location.href}`, true);

  } else {

    // PDP page
    defaultPageType = "product";
    fireEvent(`Interaction - user has visited PDP page ${window.location.href}`, true);

  }

  
  getCurrBasketAmount().then((basket) => {

    currTotalItems = basket.totalItemCount;

    if (VARIATION !== "control") {
      startExperiment(basket.totalBasketValue, defaultPageType);
    }
  });

  window.addEventListener("oct-basket:updated", () => {
    getCurrBasketAmount().then((basket) => {

      currTotalItems = basket.totalItemCount;
      if (VARIATION !== "control" && document.querySelector(`.${ID}-banner`)) {
        updateDeliveryBanner(basket.totalBasketValue);
      }

    });
  });
  
  window.addEventListener("add-to-basket:success", () => {
    getCurrBasketAmount().then((basket) => {

      currTotalItems = basket.totalItemCount;
      if (VARIATION !== "control" && document.querySelector(`.${ID}-banner`)) {
        updateDeliveryBanner(basket.totalBasketValue);
      }

    });
  });
  
  
};
