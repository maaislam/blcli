import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function addNewElementsToItineraryPage() {
  const priceContainer = document.querySelector('.NH064-price-line');
  if (priceContainer.querySelector('span.orange')) {
    const textToBeChanged = priceContainer.querySelector('span.orange').innerText;
    priceContainer.querySelector('span.orange').innerText = `${textToBeChanged} Per person`;
  } else {
    const textToBeChanged = priceContainer.innerText;
    priceContainer.innerText = `${textToBeChanged} Per person`;
  }

  // Prices Table
  const priceTable = document.querySelector('.price-table');
  const rows = priceTable.querySelectorAll('div.row');
  let count = 1;
  [].forEach.call(rows, (row) => {
    if (row.classList.contains('head')) {
      const firstRowColumns = row.querySelectorAll('.cell');
      if (firstRowColumns.length > 0) {
        for (let i = 0; i < firstRowColumns.length; i += 1) {
          firstRowColumns[i].classList.add(`NH070-row${i}`);
          if (i === 0 && firstRowColumns[i]) {
            firstRowColumns[i].classList.add('NH070-roomType__title');
          } else if (i === 1 && firstRowColumns[i]) {
            firstRowColumns[i].classList.add('NH070-people__title');
            firstRowColumns[i].innerText = 'For';
          } else if (i === 2 && firstRowColumns[i]) {
            firstRowColumns[i].classList.add('NH070-available__title');
          } else if (i === 3 && firstRowColumns[i]) {
            firstRowColumns[i].classList.add('NH070-price__title');
          } else if (i === 4 && firstRowColumns[i]) {
            firstRowColumns[i].classList.add('NH070-webOffer__title');
          }
        }
      }
      row.insertAdjacentHTML('beforeend', `<div class="NH070-total__title cell">Total</div>`);
    } else {
      let numOfCol = 0;
      const rowColumns = row.querySelectorAll('.cell');
      let numberOfPeopleText = '';
      let numberOfPeople = '';
      if (rowColumns.length > 0) {
        for (let i = 0; i < rowColumns.length; i += 1) {
          rowColumns[i].classList.add(`NH070-row${i}`);
          if (i === 0 && rowColumns[i]) {
            rowColumns[i].classList.add('NH070-roomType__value');
          } else if (i === 1 && rowColumns[i]) {
            rowColumns[i].classList.add('NH070-people__value');
            numberOfPeopleText = rowColumns[i].innerText.trim();
            numberOfPeople = parseInt(numberOfPeopleText);
            if (numberOfPeople === 1) {
              rowColumns[i].innerText = `${numberOfPeople} Person`;
            } else if (numberOfPeople > 1) {
              rowColumns[i].innerText = `${numberOfPeople} People`;
            }
          } else if (i === 2 && rowColumns[i]) {
            rowColumns[i].classList.add('NH070-available__value');
          } else if (i === 3 && rowColumns[i]) {
            rowColumns[i].classList.add('NH070-price__value');
            let priceText = rowColumns[i].innerText.trim();
            rowColumns[i].innerHTML = `${priceText}* <div>Per person</div>`;
          } else if (i === 4 && rowColumns[i]) {
            rowColumns[i].classList.add('NH070-webOffer__value');
            let webOfferText = rowColumns[i].innerText.trim();
            rowColumns[i].innerHTML = `${webOfferText}* <div>Per person</div>`;
          }
        }
      }

      const priceText = rowColumns[rowColumns.length - 1].innerText.trim();
      let price = priceText.replace('£', '');
      price = parseFloat(price);

      // Add Total Price Value
      const totalPrice = (numberOfPeople * price).toFixed(2);
      row.insertAdjacentHTML('beforeend', `<div class="NH070-total__value cell">£${totalPrice}*</div>`);

      count += 1;
    }
  });

  // Add supplement message
  const supplementMsg = `<p class="NH070-supplementMessage">* Supplements may apply for premium and single occupancy</p>`;
  const noteMsg = priceTable.querySelectorAll('.col-md-12')[1].querySelector('p');
  if (noteMsg) {
    noteMsg.insertAdjacentHTML('beforebegin', supplementMsg);
  }

  // Mobile View
  if (window.innerWidth <= 420) {
    // Move table in div
    priceTable.querySelector('.blue-table .col-md-12').insertAdjacentHTML('afterend', `<div class='NH070-mobileTable__wrapper'></div>`);
    const tableWrapper = document.querySelector('.NH070-mobileTable__wrapper');
    [].forEach.call(rows, (row) => {
      tableWrapper.insertAdjacentElement('beforeend', row);
    });
  }
}

function addNewElementsToResultsPage() {
  const results = document.querySelectorAll('.result-item');
  [].forEach.call(results, (item) => {
    const webPrice = item.querySelector('.web-offer');
    if (webPrice) {
      webPrice.innerText = 'Per person';
    }
  });

  // Lightbox content
  const lightboxWebOfferText = document.querySelector('#divQuickviewPopup .content .web-offer');
  if (lightboxWebOfferText) {
    lightboxWebOfferText.innerText = 'Per Person';
  }
}

function amendElementsToShortlist() {
  const shortlistRows = document.querySelectorAll('.shortlist-row');
  if (shortlistRows.length > 0) {
    [].forEach.call(shortlistRows, (row) => {
      const cells = row.querySelectorAll('.shortlist-tbl div.cell');
      [].forEach.call(cells, (cell) => {
        const innerContent = cell.querySelector('.inner-cell');
        if (innerContent && innerContent.querySelector('.was')) {
          innerContent.insertAdjacentHTML('beforeend', `<div class="NH070-ppPrice">Per person</div>`);
        } else if (innerContent && innerContent.querySelector('.orange')) {
          innerContent.insertAdjacentHTML('beforeend', `<div class="NH070-ppWebPrice">Per person</div>`);
        }
      });
      if (!row.querySelector('.cell .was')) {
        const brochurePrice = row.querySelectorAll('.inner-cell')[4];
        if (brochurePrice && brochurePrice.innerHTML.indexOf('£') > -1) {
          brochurePrice.insertAdjacentHTML('beforeend', `<div class="NH070-ppPrice">Per person</div>`);
        }
      }
    });
  }
}

export { setup, addNewElementsToItineraryPage, addNewElementsToResultsPage, amendElementsToShortlist }; // eslint-disable-line
