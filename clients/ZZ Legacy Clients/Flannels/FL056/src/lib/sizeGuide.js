import getGender from './helpers/gender';
import getTerm from './helpers/terms';
import { events } from '../../../../../lib/utils';
import mensSizes from './config/mensConfig';
import womensSizes from './config/womensConfig';
import brandLogos from './helpers/brandLogos';
import settings from './settings';

export default class sizeGuide {
  constructor(termsArr, gender, brand) {
    this.terms = termsArr;
    this.gender = gender;
    this.brand = brand;
    this.hasBrand = false;
  }

  doesBrandMatch(currentBrand, brandList) {
    // Loop over brands, check for a match.
    let match = null;
    for (let i = 0; brandList.length > i; i += 1) {
      const brandName = brandList[i].name;
      if (brandName && this.brand) {
        if (brandName.trim() === this.brand.toLowerCase().trim()) {
          match = this.brand.toLowerCase().trim();
          this.hasBrand = true;
        }
      }
    } 
    return match;
  }

  getSizeItems() {
    if (this.gender === 'men' || this.gender === 'unisex' && this.terms) {
      const sizeGuideItems = this.terms.map((term) => {
        // Check for Brands
        const { brands } = mensSizes[term];
        let brandConfig = null;
        const matchedBrand = this.doesBrandMatch(this.brand, brands);
        if (matchedBrand) {
          for (let key in brands) {
            const { name } = brands[key];
            if (name === matchedBrand) {
              brandConfig = brands[key];
            }
          }
          return [term, brandConfig];
        } else {
          return [term, mensSizes[term]];
        }
      });
      return sizeGuideItems;
    }
    if (this.gender === 'women' && this.terms) {
      const sizeGuideItems = this.terms.map((term) => {
        const { brands } = womensSizes[term];
        // Bail if valentino womens tops
        if (this.brand === 'VALENTINO') {
          return [term, womensSizes[term]];
        }
        let brandConfig = null;
        const matchedBrand = this.doesBrandMatch(this.brand, brands);
        if (matchedBrand) {
          for (let key in brands) {
            const { name } = brands[key];
            if (name === matchedBrand) {
              brandConfig = brands[key];
            }
          }
          return [term, brandConfig];
        } else {
          return [term, womensSizes[term]];
        }
        
      });
      return sizeGuideItems;
    }
  }

  generateHTML(sizeObjectArrays) {
    if (!sizeObjectArrays) return;
    const html = document.createElement('div');
    html.classList.add('FL056-size-guide');
    let catTitle;
    let count = 0;
    let brandName;
    const sizeElements = sizeObjectArrays.map((sizeGuide, sizeIndex) => {
      // Store data from each size guide.
      let options;
      let type;
      let title;
      let titleResult;
      let finalTitle;
      if (sizeGuide[1]) {
        options = sizeGuide[1].options;
        brandName = sizeGuide[1].name;
        type = sizeGuide[1].type;
      }
      if (sizeGuide[0]) {
        title = sizeGuide[0];
      }
      if (title) {
        titleResult = title.replace( /([A-Z])/g, " $1" );
        finalTitle = titleResult.charAt(0).toUpperCase() + titleResult.slice(1);
      }
      catTitle = finalTitle;
      // console.log({
      //   options,
      //   type,
      //   title,
      //   brandName,
      // })
      count = sizeIndex + 1;
      const hasRowTitle = () => {
        let title;
        if (catTitle === 'Footwear') {
          title = 'British';
        } else if (catTitle === 'Casual Shirts' && brandName === 'gucci') {
          title = 'GUCCI';
        } else {
          title = '&nbsp;';
        }
        return title;
      }

      const renderedHTML = `
        <div class="FL056-size-part" data-sg="${sizeIndex}" id="FL056-${title}">
          ${count === 1 ? '' : `<h2>${finalTitle}</h2>`}
          <table class="table-striped table table-hover">
            <tr class="FL056-titles">
              <th data-row="0" data-col="0" class="FL056-sticky-col"><p>${hasRowTitle()}</p></th>
              ${options ? options.map((option, colIndex) => {
                return `<th data-row="0" data-col="${colIndex + 1}"><p>${option}</p></th>`
              }).join('') : ''}
            </tr>

            ${type.map((each, typeIndex) => {
              return `
                <tr class="FL056-sizes">
                  <th data-row="${typeIndex + 1}" data-col="0" class="FL056-sticky-col"><p>${each.name}</p></th>
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

    this.getBrandImage();

    const htmlToAdd = `
      <div class="FL056-sizeGuide-header">
        <h1>SIZE GUIDE</h1>
        <span class="FL056-close"></span>
      </div>
      <div class="FL056-size-intro">
        ${this.getBrandImage()}
        ${this.hasBrand ? `<p class="FL056-brand-title">The official <span>${brandName === 'cp company' ? 'CP Company' : brandName}</span> Sizing Chart for</p>` : ''}
        <h1>${this.gender === 'unisex' ? 'unisex' : `${this.gender}s`} ${count > 1 ? 'Clothing' : `${catTitle === 'All' ? 'Clothing': catTitle}`}</h1>
        <div class="FL056-box">
          <p>For various fits, a size up or a size down might help. Please refer to the description within each product for further detail on each product and sizing and country of origin.</p>
        </div>
        <h2>Find your size</h2>
      </div>
      <div class="FL056-wrap">
        ${[...sizeElements].join('')}
      </div>
    `;
    html.innerHTML = htmlToAdd;
    return html;
    
  }

  getBrandImage() {
    if (this.brand) {
      let thisBrand = this.brand.toLowerCase().trim();
      if (thisBrand.match(/\s/g)) {
        thisBrand = thisBrand.replace(/\s/g, '');
      }
      const brandDataImg = brandLogos[thisBrand];
      if (brandDataImg) {
        return `<img src="${brandDataImg}" alt="${this.brand}"/>`;
      } else {
        return '';
      }
    }
  }

  render(ref, html) {
    if (ref && html) {
      ref.insertAdjacentHTML('beforeend', `
        <div class="FL056-sizeGuide" style="opacity: 0; visibility: hidden;">
          ${html.outerHTML}
        </div>
      `);
    }
  }
}