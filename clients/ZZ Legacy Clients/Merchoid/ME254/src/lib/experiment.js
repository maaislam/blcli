/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { popularBrands, otherBrands ,genderData, categoriesData} from './data';
import { events } from "../../../../../lib/utils";

/**
 * Validate form
 */
const isValidForm = (form) => {
  let valid = false;

  if(form) {
    const selects = form.querySelectorAll('select');

    [].forEach.call(selects, (s) => {
      if(s.value.trim().length) {
        valid = true;
      }
    });
  }

  return valid;
}

/**
 * Build result page URL
 */
const buildResultPageUrl = (brand, gender, category) => {
  // --------------------------
  // If category is set, redirect to /category-url/
  // Otherwise, redirect to /all-products/ by default
  // --------------------------
  let targetPage = '/all-products/';
  if(category) {
    targetPage = category;
  }

  // --------------------------
  // Build url from other segments
  // --------------------------
  let params = [`${shared.ID}=true`];
  if(brand) {
    params.push('brand=' + brand);
  }
  if(gender) {
    params.push('ucgender=' + gender);
  }
  
  const result = `${targetPage}?${params.join('&')}`;

  return result;

};

/**
 * Process form
 */
const processForm = (evt) => {
  evt.preventDefault();

  const form = evt.currentTarget;

  if(!isValidForm(form)) {
    const btn = form.querySelector(`.${shared.ID}-pf__search`);
    if(btn) {
      btn.insertAdjacentHTML('beforebegin', `<p class="${shared.ID}-error">Please choose at least one option</p>`);
    }
  } else {
    form.classList.add(`${shared.ID}-pf--processing`);

    const brand = (form.querySelector(`[name="${shared.ID}-brand"]`) || {}).value;
    const gender = (form.querySelector(`[name="${shared.ID}-gender"]`) || {}).value;
    const category = (form.querySelector(`[name="${shared.ID}-category"]`) || {}).value;

    events.send(`${shared.ID}-${shared.VARIATION}`, 'did-search', `${(brand || 'NA')} | ${(gender || 'NA')} | ${(category || 'NA')}`);

    const resultUrl = buildResultPageUrl(brand, gender, category);
    window.location = resultUrl;
  }
};

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  // Parse data into options
  const popularBrandsArr = [];
  Object.keys(popularBrands).forEach((k) => {
    // Popular brands are unsorted, so chang the order in the data array
    // Chage the order of the brands in data.js if required
    popularBrandsArr.push('<option value="' + popularBrands[k] + '">' + k + '</option>');
  });

  const brandArr = [];
  Object.keys(otherBrands).sort().forEach((k) => {
    // All other brands are passed through sort() for alphabetical sorting
    brandArr.push('<option value="' + otherBrands[k] + '">' + k + '</option>');
  });

  const genderArr = [];
  Object.keys(genderData).forEach((k) => {
    genderArr.push('<option value="' + genderData[k] + '">' + k + '</option>');
  });

  const categoriesArr = [];
  Object.keys(categoriesData).sort().forEach((k) => {
    categoriesArr.push('<option value="' + categoriesData[k] + '">' + k + '</option>');
  });

  // Write experiment code here
  const mainContent = document.querySelector('#maincontent');
  if(mainContent) {
    mainContent.insertAdjacentHTML('beforebegin', `
      <div class="${shared.ID}-pf-wrapper">
        <form id="${shared.ID}-form" class="${shared.ID}-pf">
          <h2 class="${shared.ID}-pf__title"><span>Product Finder</span></h2>

          <div class="${shared.ID}-pf__rows">
            <div class="${shared.ID}-pf__row">
              <label>Brand</label>
              <select name="${shared.ID}-brand">
                <option value="">Choose a brand</option>

                <optgroup label="Popular Brands">
                  ${popularBrandsArr.join('')}
                </optgroup>

                <optgroup label="Other Brands">
                  ${brandArr.join('')}
                </optgroup>
              </select>
            </div>

            <div class="${shared.ID}-pf__row">
              <label>Gender</label>
              <select name="${shared.ID}-gender">
                <option value="">Choose a gender</option>
                ${genderArr.join('')}
              </select>
            </div>

            <div class="${shared.ID}-pf__row">
              <label>Category</label>
              <select name="${shared.ID}-category">
                <option value="">Choose a category</option>
                ${categoriesArr.join('')}
              </select>
            </div>
          </div>

          <div class="${shared.ID}-pf__search-wrap">
            <button type="submit" class="button action primary ${shared.ID}-pf__search">Search</a>
          </div>

        </div>
      </div>
    `);

    const form = document.querySelector(`#${shared.ID}-form`);
    if(form) {
      form.addEventListener('submit', processForm);
    }

    // Event interaction
    const selects = form.querySelectorAll('select');
    [].forEach.call(selects, (s) => {
      s.addEventListener('change', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'did-interact-with-select');
      });
    });
  }
};
