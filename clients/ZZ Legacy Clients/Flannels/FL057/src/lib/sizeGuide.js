import getGender from './helpers/gender';
import getTerm from './helpers/terms';
import { events } from '../../../../../lib/utils';
import mensSizes from './config/mensConfig';
import womensSizes from './config/womensConfig';
import settings from './settings';

export default class sizeGuide {
  constructor(termsArr, gender) {
    this.terms = termsArr;
    this.gender = gender;
  }

  getSizeItems() {
    if (this.gender === 'men' || this.gender === 'unisex' && this.terms) {
      const sizeGuideItems = this.terms.map((term) => {
        return [term, mensSizes[term]];
      });
      // console.log('Size guide items, ', sizeGuideItems);
      return sizeGuideItems;
    }
    if (this.gender === 'women' && this.terms) {
      const sizeGuideItems = this.terms.map((term) => {
        return [term, womensSizes[term]];
      });
      // console.log('Size guide items, ', sizeGuideItems);
      return sizeGuideItems;
    }
  }

  generateHTML(sizeObjectArrays) {
    if (!sizeObjectArrays) return;
    const html = document.createElement('div');
    html.classList.add('FL057-size-guide');
    let catTitle;
    let count = 0;
    const sizeElements = sizeObjectArrays.map((sizeGuide, sizeIndex) => {

      // Store data from each size guide.
      const { options } = sizeGuide[1];
      const { type } = sizeGuide[1];
      const title = sizeGuide[0];
      const titleResult = title.replace( /([A-Z])/g, " $1" );
      const finalTitle = titleResult.charAt(0).toUpperCase() + titleResult.slice(1);
      catTitle = finalTitle;
      count = sizeIndex + 1;

      const renderedHTML = `
        <div class="FL057-size-part" data-sg="${sizeIndex}" id="FL057-${title}">
          ${count === 1 ? '' : `<h2>${finalTitle}</h2>`}
          <table class="table-striped table table-hover">
            <tr class="FL057-titles">
              <th data-row="0" data-col="0" class="FL057-sticky-col"><p>${catTitle === 'Footwear' ? 'British' : '&nbsp;'}</p></th>
              ${options.map((option, colIndex) => {
                return `<th data-row="0" data-col="${colIndex + 1}"><p>${option}</p></th>`
              }).join('')}
            </tr>

            ${type.map((each, typeIndex) => {
              return `
                <tr class="FL057-sizes">
                  <th data-row="${typeIndex + 1}" data-col="0" class="FL057-sticky-col"><p>${each.name}</p></th>
                  ${each.values.map((val, valIndex) => {
                    // if (val !== null) {
                      return `<td data-row="${typeIndex + 1}" data-col="${valIndex + 1}">${val ? val : ''}</td>`
                    // }
                  }).join('')}
                </tr>
              `;
            }).join('')}
          </table>
        </div>
      `;
      return renderedHTML;
    });

    const htmlToAdd = `
      <div class="FL057-sizeGuide-header">
        <h1>SIZE GUIDE</h1>
        <span class="FL057-close"></span>
      </div>
      <div class="FL057-size-intro">
        <h1>${this.gender === 'unisex' ? 'unisex' : `${this.gender}s`} ${count > 1 ? 'Clothing' : catTitle}</h1>
        <p>For various fits, a size up or a size down might help. Please refer to the description within each product for further detail on each product and sizing and country of origin.</p>
        <h2>Find your size</h2>
      </div>
      <div class="FL057-wrap">
        ${[...sizeElements].join('')}
      </div>
    `;
    html.innerHTML = htmlToAdd;
    return html;
    
  }

  render(ref, html) {
    if (ref && html) {
      ref.insertAdjacentHTML('beforeend', `
        <div class="FL057-sizeGuide" style="opacity: 0; visibility: hidden;">
          ${html.outerHTML}
        </div>
      `);
    }
  }
}