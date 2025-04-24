import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const generateLightboxContent = () => {
  const data = window.digitalData.products;
  const numOfProducts = data.length;

  let firstRow = '';
  let pImages = '';
  let pNames = '';
  let pPrices = '';
  let pOffers = '';
  let pMonoCost = '';
  let pMonoCostCalc = '';
  let pColourCost = '';
  let pColourCostCalc = '';
  let pCtaBtns = '';

  let currentP = '';
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < numOfProducts; j += 1) {
      const item = data[j];

      if (j === 0) {
        currentP = 'current-product';
      } else {
        currentP = '';
      }
      if (i === 1) {
        if (currentP === 'current-product') {
          firstRow += `<td class="compareitemcell" style="border: none; position: absolute; top: 22px; padding: 0.75rem 1rem .75rem 1.2rem;">
            <span class="first-row-item" style="font-weight: 700; font-size: 13px;">
              Currently viewing
            </span>
          </td>`;
        } else {
          firstRow += `<td class="compareitemcell ${currentP}" style="border: none;">
            <span class="first-row-item"></span>
          </td>`;
        }
        
      } else if (i === 2) {
        pPrices += `<td class="compareitemcell ${currentP}">
            <span class="compareprice">
              <span class="red"> £${item.priceExVat} ex VAT</span> <br>£${item.priceIncVat} inc VAT
            </span>
          </td>`;
      } else if (i === 3) {
        // pOffers += `<td class="compareoffercell ${currentP}">
          // <span class="compareoffertitle_S">
          //   ${item.specialOffers}
          // </span>
        // </td>`;
        pOffers += `<td class="compareoffercell ${currentP}"'>
          <span class="compareoffertitle_S">
            ${item.specialOffers}
          </span>
        </td>`;
      } else if (i === 4) {
        if (item.costPerMonoPage !== '0.0' 
        && item.costPerMonoPage !== '0') {
          pMonoCost += `<td class="compareitemcell ${currentP}">
            <span>${item.costPerMonoPage}p per mono page</span>
          </td>`;
        } else {
          pMonoCost += `<td class="compareitemcell ${currentP}">
            <span>&nbsp;</span>
          </td>`;
        }
        
      } else if (i === 5) {
        if (item.costPerMonoPage !== '0.0'
        && item.costPerMonoPage !== '0') {
          pMonoCostCalc += `<td class="${shared.ID}_calculator__item compareitemcell" data-calc="${item.costPerMonoPage}">
            <span><strong></strong></span>
          </td>`;
        } else {
          pMonoCostCalc += `<td class="${shared.ID}_calculator__item compareitemcell"></td>`;
        }
        
      } else if (i === 6) {
        if (item.costPerColourPage !== '0.0'
        && item.costPerColourPage !== '0') {
          pColourCost += `<td class="compareitemcell ${currentP}">
            <span>${item.costPerColourPage}p per colour page</span>
          </td>`;
        } else {
          pColourCost += `<td class="compareitemcell ${currentP}">
            <span>&nbsp;</span>
          </td>`;
        }
        
      } else if (i === 7) {
        if (item.costPerColourPage !== '0.0'
        && item.costPerColourPage !== '0') {
          pColourCostCalc += `<td class="${shared.ID}_calculator__item compareitemcell" data-calc="${item.costPerMonoPage}">
            <span><strong></strong></span>
          </td>`;
        } else {
          pColourCostCalc += `<td class="${shared.ID}_calculator__item compareitemcell"></td>`;
        }
        
      } else if (i === 8) {
        if (currentP === 'current-product') {
          pCtaBtns += `<td class="compareitemcell ${currentP}">
            <a class="btn btn--yellow" href="javascript: void(0)" style="display: none !important;">View</a>
          </td>`;
        } else {
          pCtaBtns += `<td class="compareitemcell ${currentP}">
            <a class="btn btn--yellow" href="${item.url}">View</a>
          </td>`;
        }
        
      } else {
        pImages += `<td class="compareitemcell" style="border: none;">
          <a class="compareProductname" href="${item.url}">
            <img class="compareimagecell" src="${item.productImageUrl}" style="border-width:0px;">
          </a>
          <a href="${item.url}">${item.productName}</a>
        </td>`;
      }
    }
  }

  const content = `<div id="${shared.ID}-similar_products">
    <table class="comparetable" cellspacing="0px" cellpadding="0px" border="0">
      <tbody>
        <tr class="first-row">
          <td class="comparetitlewhite" style="border: none;"><span></span></td>
          ${firstRow}
        </tr>
        <tr class="image-row">
          <td class="comparetitlewhite"><span></span></td>
          ${pImages}
        </tr>
        <tr class="price-row">
          <td class="comparetitlewhite">
            <span>Price</span>
          </td>
            ${pPrices}
          </tr>
          <tr class="offers-row ${shared.ID}-specialoffer">
            <td class="comparetitlewhite">
              <span>Special Offer</span>
            </td>
            ${pOffers}
          </tr>
          <tr class="mono-row ${shared.ID}-monocostperpage">
            <td class="comparetitlewhite">
              <span>Mono Cost per Page</span>
            </td>
            ${pMonoCost}
          </tr>

          <tr class="colour-row ${shared.ID}-colourcostperpage">
            <td class="comparetitlewhite">
              <span>Colour Cost per Page</span>
            </td>
            ${pColourCost}
          </td>
        </tr>

        <tr class="cta-row">
          <td class="comparetitlewhite">
            <span>&nbsp;</span>
          </td>
          ${pCtaBtns}
        </tr>
      </tbody>
    </table>

  </div>`;
  
  pollerLite([`.${shared.ID}-lightbox__content`], () => {
    document.querySelector(`.${shared.ID}-lightbox__content`).innerHTML = content;
  });
  
};

export default generateLightboxContent;
