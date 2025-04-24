/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, fetchAffinityAllData, logMessage } from '../../../../../lib/utils';
 import { fetchMaleFemale, fetchBrands } from './fetchBrands';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

let categoryData = [
  // Female
  { categoryName: 'Party Dresses', categoryURL: 'https://www.houseoffraser.co.uk/women/dresses/party', categoryGender: "female" },
  { categoryName: 'Hoodies & Sweatshirts', categoryURL: 'https://www.houseoffraser.co.uk/women/hoodies-and-sweatshirts', categoryGender: "female" },
  { categoryName: 'Scarves & Wraps', categoryURL: 'https://www.houseoffraser.co.uk/accessories/womens-scarves', categoryGender: "female" },
  { categoryName: 'Boots', categoryURL: 'https://www.houseoffraser.co.uk/shoes-and-boots/ladies-boots', categoryGender: "female" },
  { categoryName: 'Nightwear & Slippers', categoryURL: 'https://www.houseoffraser.co.uk/women/nightwear-and-slippers', categoryGender: "female" },
  { categoryName: 'Knitwear', categoryURL: 'https://www.houseoffraser.co.uk/women/knitwear', categoryGender: "female" },
  { categoryName: 'Gloves', categoryURL: 'https://www.houseoffraser.co.uk/accessories/ladies-gloves', categoryGender: "female" },
  { categoryName: 'Jumper Dresses', categoryURL: 'https://www.houseoffraser.co.uk/women/dresses/jumper-dresses', categoryGender: "female" },
  // Male
  { categoryName: 'Hoodies & Sweatshirts', categoryURL: 'https://www.houseoffraser.co.uk/men/hoodies-and-sweatshirts', categoryGender: "male" },
  { categoryName: 'Boots', categoryURL: 'https://www.houseoffraser.co.uk/shoes-and-boots/mens-boots', categoryGender: "male" },
  { categoryName: 'Knitwear', categoryURL: 'https://www.houseoffraser.co.uk/men/knitwear', categoryGender: "male" },
  { categoryName: 'Nightwear & Slippers', categoryURL: 'https://www.houseoffraser.co.uk/men/nightwear', categoryGender: "male" },
  { categoryName: 'Gloves', categoryURL: 'https://www.houseoffraser.co.uk/accessories/mens-gloves', categoryGender: "male" },
  { categoryName: 'Scarves', categoryURL: 'https://www.houseoffraser.co.uk/accessories/mens-scarves', categoryGender: "male" },
  { categoryName: 'Hats & Caps', categoryURL: 'https://www.houseoffraser.co.uk/accessories/mens-caps-and-hats', categoryGender: "male" },
  { categoryName: 'Suits', categoryURL: 'https://www.houseoffraser.co.uk/men/suits', categoryGender: "male" },

]

const startExperiment = () => {

  

  let expHTML = `
  
    <div class="${ID}-festivebrands">
    
      <div class="${ID}-festivebrands--header">
        <h2> House of Brands </h2>
      </div>

      <div class="${ID}-festivebrands--links">
        <div class="${ID}-festivebrands--linksinner">
        
        </div>
      </div>
    
    </div>
  
  `;

  let insertionPoint = document.querySelector('.quicklinks');
  insertionPoint.innerHTML = "";
  insertionPoint.insertAdjacentHTML('afterbegin', expHTML);

  document.documentElement.classList.add(`${ID}-festivebrandsdisplayed`);

  fetchBrands().then((data) => {

    logMessage("the user is interested in the following brands:");
    logMessage(data);

    let brandData = data;

    let linkInsertionPoint = document.querySelector(`.${ID}-festivebrands--linksinner`);
    [].slice.call(brandData).forEach((item) => {
      console.log(item);
      let linkURL = item[0].toLowerCase();
      linkURL = linkURL.replaceAll(' ', '-');
      let linkHTML = `<a href="/brand/${linkURL}">${item[0]}</a>`;
      linkInsertionPoint.insertAdjacentHTML('beforeend', linkHTML);

    });

    fireAndLogEvent('Visible - experiment has been shown on the christmas page');

    

  })


}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
