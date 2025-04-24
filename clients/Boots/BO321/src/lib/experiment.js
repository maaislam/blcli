/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

const { ID, VARIATION } = shared;
const testID = `${ID}|L'oréal Linked Products`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

let castingProducts = [
  ['10107126', 'Iced Blonde', '1010'],
  ['10178592', 'Ebony Black', '200'],
  ['10217276', 'Blue Black', '210'],
  ['10178590', 'Darkest Brown', '300'],
  ['10178531', 'Plum', '316'],
  ['10178538', 'Dark Chocolate', '323'],
  ['10178529', 'Black Cherry', '360'],
  ['10127798', 'Iced Cocoa', '4.12'],
  ['10178594', 'Dark Brown', '400'],
  ['10178587', 'Iced Chocolate', '415'],
  ['10127799', 'Iced Truffle', '5.13'],
  ['10121106', 'Berry Red', '5.65'],
  ['10178569', 'Medium Brown', '500'],
  ['10178577', 'Mocha', '515'],
  ['10178534', 'Mahogany', '550'],
  ['10127800', 'Iced Mocha', '6.13'],
  ['10178588', 'Light Brown', '600'],
  ['10178601', 'Amber', '645'],
  ['10217272', 'Choco Moccacino', '680'],
  ['10217275', 'Blond', '700'],
  ['10178598', 'Iced Latte', '713'],
  ['10140308', 'Cherry Red', '460'],
  ['10178597', 'Chestnut Honey', '634'],
  ['10154323', 'Chilli Chocolate', '554'],
  ['10154326', 'Chocolate Caramel', '603'],
  ['10136990', 'Liquorice', '100'],
  ['10178595', 'Rich Honey', '734'],
  ['10177595', 'Sunkiss Jelly', '03'],
  ['10178584', 'Chocolate', '535'],
  ['10261033', 'Light Pearl Blonde', '1021'],
  ['10235688', 'Black Henna', '2.46'],
  ['10235686', 'Mahogany Henna', '3.54'],
  ['10235691', 'Auburn Henna', '4.43'],
  ['10298441', 'Choco Mocha', '418'],
  ['10235693', 'Golden Henna', '5.43'],
  ['10298440', 'Vanilla Mocha', '618'],
  ['10261037', 'Satin Blonde', '801'],
  ['10261035', 'Iced Blonde', '910'],
  ['10178599', 'Chocolate Brownie', '454'],
  ['10272680', 'Cool Dark Brown', '310'],
  ['10272681', 'Cool Mocha', '510'],
  ['10317294', 'Black Ganache', '123'],
  ['10317293', 'Brown Espresso', '223'],
  ['10317292', 'Brown Chocolat', '323'],
  ['10317291', 'Brown Noisette', '423'],
  ['10317290', 'Brown Caramel', '523'],
  ['10317289', 'Spiced Auburn', '553'],
  ['10317288', 'Blonde Miel', '623'],
  ['10317287', 'Blonde Amande', '723'],
  ['10317286', 'Latte Light Blonde', '823'],
];

let excellenceProducts = [
  ['10285346', 'Ash Blonde', '8.1'],
  ['10178344', 'Beige Blonde', '7.31'],
  ['10178457', 'Dark Gold Blonde', '7.3'],
  ['10178343', 'Light Gold Brown', '6.3'],
  ['10178340', 'Natural Blonde', '01'],
  // ['10274065', 'EXCELL BL SUP 02 BL ULT CL DO ENG'],
  // ['10274066', 'EXCELL BL SUP 03 bl ult cl cend ENG'],
  ['10285604', 'Ultra Ash Blonde', '7.11'],
  ['10285601', 'Ultra Ash Brown', '4.11'],
  ['10285602', 'Ultra Ash Light Brown', '5.11'],
  ['10285603', 'Ultra Ash Dark Blonde', '6.11'],
  ['10320891', 'Black', '1U'],
  ['10308709', 'Blonde', '7U'],
  ['10308706', 'Brown', '4U'],
  ['10308708', 'Dark Blonde', '6U'],
  ['10308705', 'Dark Brown', '3U'],
  ['10308704', 'Darkest Brown', '2U'],
  ['10308712', 'Lightest Blonde', '10U'],
  ['10308710', 'Light Blonde', '8U'],
  ['10308707', 'Light Brown', '5U'],
  ['10308711', 'Very Light Blonde', '9U'],
  ['10340274', 'Light Red', '5UR'],
  ['10340275', 'Dark Red', '8UR'],
  ['10178609', 'Natural Golden Blonde', '8.3'],
  ['10261038', 'Light Pearl Blonde', '10.21'],
  ['10261039', 'Natural Medium Blonde', '9.32'],
  ['10165300', 'Blackest Black', '1.01'],
  ['10178328', 'Dark Blonde', '7'],
  ['10178337', 'Golden Brown', '5.3'],
  ['10119374', 'Iced Brown', '5.15'],
  ['10285345', 'Ash Blonde', '9.1'],
  ['10178330', 'Light Brown', '6'],
  ['10178346', 'Light Gold Blonde', '9.3'],
  ['10178339', 'Mahogany Brown', '5.5'],
  ['10178333', 'Natural Blonde', '8'],
  ['10178347', 'Natural Baby Blonde', '10'],
  ['10178326', 'Natural Brown', '5'],
  ['10178332', 'Natural Dark Brown', '4'],
  ['10285347', 'Natural Darkest Brown', '3'],
  ['10177530', 'Natural Frosted Beige Blonde', '8.12'],
  ['10177560', 'Natural Light Baby Blonde', '10.13'],
  ['10178335', 'Natural Light Blonde', '9'],
  ['10178431', 'Natural Hazelnut', '6.41'],
  ['10178345', 'Rich Auburn', '5.6'],
  // ['#N / A', 'Excellence Rich Auburn 5.54'],
  ['10274068', 'Tempting Brunette', '4.02']
];



let retouchProducts = [
  // ['10290441.P', 'Golden Blonde'], // duplicate
  // ['10290432.P', 'Golden Blonde'], // duplicate 
  ['10290428.P', 'Black', ''], // duplicate
  ['10290430.P', 'Brown', ''],
  ['10290440.P', 'Dark Blonde', ''],
  // ['10290431.P', 'Magic dark blonde 75ml Triple Pack'],
  ['10290429.P', 'Dark Brown', ''],
  ['10290443.P', 'Dark Iced Brown', ''],
  // ['10290435.P', 'Magic Dark Iced Brown Triple Pack'],
  ['10290436.P', 'Golden Brown', ''],
  ['10317277', 'Black', '2'], // duplicate
  ['10317278', 'Darkest Brown', '3'],
  ['10317279', 'Dark Brown', '4'],
  ['10317280', 'Brown', '5'],
  ['10317281', 'Light Brown', '6'],
  ['10317282', 'Dark Blond', '7'],
  ['10317283', 'Blond', '8'],
  ['10317284', 'Light Blond', '9'],
  ['10211370', 'Black', '1'], // duplicate
  ['10235684', 'Golden Brown', '10'],
  ['10211374', 'Dark Brown', '2'], // duplicate
  // ['10235680', 'Dark Brown'], // duplicate
  ['10211377', 'Brown', '3'],  // duplicate
  // ['10235681', 'Brown'],  // duplicate
  ['10211379', 'Dark Blonde', '4'], // duplicate
  // ['10235683', 'Dark Blonde'], // duplicate
  // ['#N/A', 'MAGIC RETOUCH 5 LIGHT BLONDE'],
  ['10222683', 'Mahogany', '6'],
  ['10292085', 'Medium Iced Brown', '7'],
  ['10226506', 'Dark Iced Brown', '8'],
  ['10242692', 'Light Golden Blonde', '9'],
  ['10290439.P', 'Brown', ''], // duplicate
  ['10290438.P', 'Dark Brown', ''], // duplicate
  ['10263657', 'Dark Roots Light', '9.3'],
  ['10263658', 'Dark Roots Medium', '7.3'],
  ['10257063', 'Black', '1'], // duplicate
  ['10257062', 'Dark Brown', '2'], // duplicate
  ['10257061', 'Brown', '3'], // duplicate
  ['10257060', 'Dark Blonde', '4'], // duplicate
  ['10257059', 'Light Blonde', '5'] // duplicate
];

// above probably needs checked
let preferenceProducts = [
  ['10178465', 'Light Ash Blonde', ''],
  ['10178464', 'Lightest Natural Blonde', ''],
  ['10217292', 'Ultra Light Pearl Blonde', '11.21'],
  ['10217291', 'Ultra Light Crystal Blonde', '11.11'],
  ['10308702', 'Light Blonde', 'C29'],
  ['10308703', 'Dark Blonde', 'C29'],
  ['10286141', 'Siberia', '9.12'],
  ['10286139', 'Iceland', '7.1'],
  ['10286140', 'Copenhagen', '8.1'],
  ['10178502', 'Expresso', ''],
  ['10178463', 'Florida', ''],
  ['10179946', 'Glamorous', '03'],
  ['10178511', 'Havana', ''],
  ['10334686', 'Pink', '7.222'],
  ['10334688', 'Coral', '6.403'],
  ['10334687', 'Lilac', '9.120'],
  ['10308701', 'Brown to Dark Brown', '104'],
  ['10147180', 'Platinum Blonde', ''],
  ['10308700', 'Blue Black', '1.102'],
  ['10308687', 'Silver Grey', '10.11'],
  ['10308699', 'Deep Black', '2.01'],
  ['10308698', 'Magnetic Plum', '3.16'],
  ['10308697', 'Dark Purple', ''],
  ['10308696', 'Mocha', '5.23'],
  ['10308695', 'Violet', ''],
  ['10308694', 'Cherry Red', '5.66'],
  ['10308693', 'Copper', '7.43'],
  ['10308692', 'Mango', '7.46'],
  ['10308691', 'Bright Red', '8.624'],
  ['10308690', 'Light Rose Gold', '9.23'],
  ['10308688', 'Smokey Grey', '9.11'],
  ['10308689', 'Rose Gold', '9.213'],
  ['10178491', 'Wild Ombre Intense', ''],
  ['10241781', 'Chocolate Rose', ''],
  ['10241830', 'Rich Rose', '7.23'],
  ['10241980', 'Shimmering', '8.23'],
  ['10272682', 'Napoli', '1'],
  ['10217267', 'Starry Night Blue Black', ''],
  ['10127801', 'Paris BC', '4.013'],
  ['10217290', 'Sofia', ''],
  ['10217265', 'Mango Intense Copper', '74'],
  ['10178484', 'Bergen', ''],
  ['10178462', 'Brasilia+', '3.0'],
  ['10165304', 'Brooklyn', '6.45'],
  ['10178488', 'California', '8'],
  ['10178495', 'Capri', '6.0'],
  ['10154327', 'Florence', ''],
  ['10178508', 'Helsinki', '10.1'],
  ['10195983', 'Opera', '6.21'],
  ['10217271', 'Deep Wicked Black', 'P11'],
  ['10217270', 'Deep Purple', ''],
  ['10217261', 'Scarlet Power', ''],
  ['10178473', 'Palma', '5.0'],
  ['10147179', 'Platinum Very Light Blonde', ''],
  ['10242693', 'Pure Burgundy', ''],
  ['10178471', 'Rimini', '7.0'],
  ['10178480', 'Stockholm', '10.21'],
  ['10178460', 'Ultra Violet', 'P37'],
  ['10195985', 'Viking+', '9.1'],
  ['10340272', 'Platinum Ice', ''],
  ['10340273', 'Pearly Boost', ''],
  ['10285348', 'Virginia', '5.3'],
  ['10147185', 'Wild Ombre', '']
];

let colourSensationProducts = [
];

let nutrisseProducts = [
  ['10261028', 'Ultra Violet', ''],
  ['10240949', 'Black', '1'],
  ['10241077', 'Deep Red', '4.6'],
  ['10240772', 'Deep Red Brown', '3.6'],
  ['10241081', 'Light Natural Blonde', '100'],
  ['10241078', 'Golden Brown', '5.3'],
  ['10241079', 'Light Brown', '6'],
  ['10241084', 'Light Natural Blonde', '9'], // duplicate
  // ['#N/A', 'NATEA MEDIUM BLONDE'],
  // ['10087856', 'Natea Pre Lightener'], // seems like a product rather than a colour
  ['10107117', 'Pure Chocolate', '4 1/2'],
  ['10202876', 'Natural Gold Pearl', ''],
  ['10241075', 'Auburn', ''],
  ['10311058', 'Bleach Intense Platinum', 'D4+'],
  ['10154189', 'Bleach Max Lightener', 'D+++'],
  ['10240776', 'Brown', '5'],
  ['10107113', 'Golden Light Brown', '6.3'],
  // ['10274069', 'NUTRISSE CLA OXI 3.12 KI1PC ENG'], - doesn't exist
  ['10274070', 'Glacial Brown', '5.12'],
  ['10240775', 'Dark Brown', '4'],
  ['10192453', 'Dark Golden Brown', '4.3'],
  ['10241076', 'Deep Burgundy', ''],
  ['10107111', 'Ebony', '3'],
  ['10291897', 'Infinite Blue', '1.10'],
  ['10291896', 'Midnight Blue', '3.10'],
  ['10291895', 'Intense Lilac', '5.21'],
  ['10291898', 'Copper Passion', '7.40'],
  ['10241080', 'Golden Blonde', ''],
  // ['10242460', 'Honey Blonde'], - doesn't exist
  ['10311060', 'Luminous Chestnut Brown', '4.13'],
  ['10311061', 'Natural Golden Dark Blonde', '6.03'],
  ['10311059', 'Light Ashy Blonde', '8.11'],
  ['10311062', 'Very Light Pearly Blonde', '9.12'],
  ['10235695', 'Light Brown', ''],
  ['10235697', 'Dark Blonde', ''],
  ['10235694', 'Medium Blonde', '8N'],
  ['10177637', 'Natural Baby Blonde', '10.01'],
  ['10177657', 'Medium Beige Blonde', '8.13'],
  ['10285349', 'Light Ash Blonde', '9.13'],
  ['10189391', 'Sparkle Brown', '3.23'],
  ['10324888', 'Burgundy Garnet', '3.62'],
  ['10317295', 'Purple', '4.26'],
  ['10127759', 'Ice Blonde', '10.1'],
  ['10137003', 'Dark Cherry', '2.6'],
  ['10127754', 'Iced Coffee', '4.15'],
  ['10127756', 'Vibrant Red', ''],
  ['10127757', 'Fiery Red', '6.60'],
  // ['#N/A', 'Nutrisse Ultra-Colour 7.64 IntenseCopper'],
  ['10127755', 'Frosted Chestnut', '5.25'],
  ['10241073', 'Very Light Brown', '7']
];

let oliaProducts = [
  ['10242451', 'Super Light Blonde', '110'],
  ['10261027', 'Silver', '9.11'],
  ['10147193', 'Deep Black', '1.0'],
  ['10147211', 'Very Light Ash Blonde', '10.1'],
  ['10147209', 'Soft Black', '3.0'],
  ['10147212', 'Deep Violet', '3.16'],
  ['10165290', 'Deep Cherry', ''],
  ['10147213', 'Dark Brown', '4.0'],
  ['10147214', 'Iced Chocolate', '4.15'],
  ['10154190', 'Dark Golden Brown', ''],
  ['10196102', 'Dark Garnet', '4.62'],
  ['10147196', 'Brown', '5.0'],
  ['10189394', 'Frosted Chocolate', '5.15'],
  ['10147198', 'Golden Brown', '5.3'],
  ['10189396', 'Rich Chocolate', '5.35'],
  ['10147200', 'Light Brown', '6.0'],
  ['10147201', 'Golden Light Brown', ''],
  // ['#N/A', 'Olia 6.35 Light Chocolate'],
  ['10147202', 'Intense Red', '6.60'],
  ['10196101', 'Vivid Garnet', '6.66'],
  ['10147203', 'Dark Blonde', '7.0'],
  ['10147204', 'Dark Beige Blonde', '7.13'],
  ['10155191', 'Intense Copper', '7.40'],
  ['10147205', 'Blonde', '8.0'],
  // ['#N/A', 'Olia 8.31 Golden Ash Blonde'],
  ['10147207', 'Light Blonde', '9.0'],
  ['10147208', 'Golden Light Blonde', '9.3'],
  ['10242453', 'Rose Violet', ''],
  ['10242454', 'Deep Rose', '7.22'],
  ['10242455', 'Rose Gold', ''],
  // ['#N/A', 'Olia Conditioner 54ml Pack (x130)'],
  ['10285605', 'Black Sapphire', '1.10'],
  ['10165287', 'Very Light Blond', '10.0'],
  ['10274071', 'Black Diamond', '2.0'],
  ['10274072', 'Black Chocolate', ''],
  ['10211388', 'Max Bleach', 'B+++'],
  ['10317296', 'Iridescent Brown', '5.12'],
  ['10311063', 'Iridescent Light Brown', '6.12'],
  // ['10298442', 'OLIA GOLD EN 9.30'], - doesn't exist
  ['10320892', 'Highlights for Blondes', ''],
  ['10320893', 'Highlights for Brunettes', ''],
  // ['10211384', 'OLIA SUPER BLONDS GB 112 SUPERLIGHT'] - doesn't exist
  ['10340269', 'Platinum Blonde', '10.01'],
  ['10340270', 'Pearly Blonde', '10.2'],
  ['10340271', 'Cool Blonde', '9.1'],

];

let goodProducts = [
  // ['10340171', ' Garnier good hr clr 1.10 mdnt illsn 217g'],
  // ['10340172', ' Garnier good hr clr 4.61 blzng snrs 217g'],
  // ['10340173', ' Garnier good hr clr 5.32 bnshd snst 217g'], - don't exist
  ['10340174', 'Dawn Beige', '8.13'],
  ['10324874', 'Cacao Brown', '4.0'],
  ['10324875', 'Iced Chestnut Brown', '4.15'],
  ['10324876', 'Coffee Roast Brown', '5.0'],
  ['10324877', 'Chamomile Blonde', '10.14'],
  ['10324878', 'Vanilla Blonde', '9.1'],
  ['10324879', 'Mochaccino Brown', '6.0'],
  ['10324880', 'Honey Blonde', '8.0'],
  ['10324881', 'Almond Cream Dark Blonde', '7.0'],
  ['10324882', 'Pomegranate Red', '6.6'],
  ['10324883', 'Dark Chocolate Brown', '3.0'],
  ['10324884', 'Turmeric Copper', '7.43'],
  ['10324885', 'Sweet Latte', '7.12'],
  ['10324886', 'Blackberry Brown', '3.12'],
  ['10324887', 'Auburn Hibiscus Brown', '5.5'],
  ['10324889', 'Terracotta Chilli', ''],
  ['10324888', 'Burgundy Garnet', '3.62']
];

// let belleProducts = [
//   ['10329075', 'Natural Dark Brown'],
//   ['10329076', 'Natural Brown'],
//   ['10329077', 'Natural Dark Ash Blonde'],
//   ['10329078', 'Extra Light Ash Blonde'],
//   ['10329079', 'Natural Light Brown'],
//   ['10329080', 'Natural Light Blonde'],
//   ['10329081', 'Ultra Light Blonde'],
//   ['10329082', 'Black'],
//   ['10329083', 'Light Honey Blonde'],
//   ['10329084', 'Dark Brown'],
//   ['10329085', 'Natural Light Auburn'],
//   ['10329086', 'Natural Medium Blonde'],
//   ['10329087', 'Dark Golden Blonde'],
//   ['10329088', 'Natural Golden Blonde']
// ];

// let maybellineProducts = [
//   ['10291592', 'Sky High Black'],
//   ['10323005', 'Sky High Brown'],
//   ['10338210', 'Sky High Blue Mist'],
//   ['10338209', 'Sky High Burgundy Haze'],
// ];

function fetchProductData(sapCode) {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${sapCode}`).then((response) => response.json());
}

const startExperiment = (products, productType) => {

  document.documentElement.classList.add(`${ID}-expbegins`);

  pollerLite(['#in_stock_actions'], () => {

    let viewMoreColoursButtonHTML = `<button disabled class="${ID}-more-button" id="${ID}-more-button">View more colours</button>`;
    document.querySelector('#in_stock_actions').insertAdjacentHTML('beforebegin', viewMoreColoursButtonHTML);

    let allProductSKUs = products.map((product) => product[0]);
    let coloursLength = products.length;
    let sapCodes = allProductSKUs.join('&');

    let modalHTML = `
    
      <div class="${ID}-modal" id="${ID}-colours-modal">

        <button class="${ID}-close" id="${ID}-close"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16.5 16.5L0.5 0.5M16.5 0.5L0.5 16.5" stroke="#333" stroke-linecap="round" stroke-linejoin="round"/></svg></button>

        <div class="${ID}-modal--header">
        
          <h2>${coloursLength} available colours</h2>

        </div>

        <div class="${ID}-modal--search">

          <label for="${ID}-search">Search</label>
          <div class="${ID}-searchbox">
            <input type="text" id="${ID}-search" placeholder="Search colours" />
            <button class="${ID}-searchbutton"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>

        </div>

        <div class="${ID}-modal--colours">
        
          
        
        </div>
          

      </div>
    
    
    `;

    // fireEvent('Conditions Met');

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
      return;
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    let modal = document.querySelector(`#${ID}-colours-modal`);

    fetchProductData(sapCodes).then((data) => {

      document.getElementById(`${ID}-more-button`).removeAttribute('disabled');

      let returnedProductData = data;

      returnedProductData.sort((a, b) => {
        let colourA = products.find((product) => product[0] == a.model)[1];
        let colourB = products.find((product) => product[0] == b.model)[1];

        if (colourA < colourB) {
          return -1;
        }
        if (colourA > colourB) {
          return 1;
        }
        return 0;
      });

      // sort returnedProductData so that any with 0 stockDescription are at the end

      returnedProductData.sort((a, b) => {
        if (a.stockDescription == 0) {
          return 1;
        }
        if (b.stockDescription == 0) {
          return -1;
        }
        return 0;
      });

      let allColourHTML = returnedProductData.map((dataProduct) => {

        let colourData = products.find((product) => product[0] == dataProduct.model)
        
        let colour = colourData[1];
        let shade = colourData[2];

        return `
        
          <button data-href="${dataProduct.actionURL}" data-colour="${colour}" class="${ID}-colour ${parseInt(dataProduct.stockDescription) == 0 ? `${ID}-oos` : ``}">

            <div class="${ID}-image"><img onerror="this.parentElement.classList.add('broken-image')" src="https://blcro.fra1.digitaloceanspaces.com/BO321/${productType}/${dataProduct.model}.jpg" /></div>

            <p>${colour} ${shade !== "" ? `<span>(Shade: ${shade})</span>` : ``}</p>
          
          </button>
        
        `

      }).join('');

      document.querySelector(`.${ID}-modal--colours`).insertAdjacentHTML('beforeend', allColourHTML); 

    });
    fireBootsEvent('View - user has viewed the VMC modal', true, eventTypes.experience_render, {
      render_element: elementTypes.Modal,
      render_detail: 'View - user has viewed the VMC modal'
    });
  
    document.getElementById(`${ID}-more-button`).addEventListener('click', () => {
      modal.classList.add(`${ID}-active`);
      document.documentElement.classList.add(`${ID}-noscroll`);
      // fireEvent(`Click - user has clicked on the VMC button to open the modal`, true);
      fireBootsEvent('Click - user has clicked on the VMC button to open the modal', true, eventTypes.experience_action, {
        action_type: actionTypes.open,
        action_detail: 'Click - user has clicked on the VMC button to open the modal'
      });
    });
    
    document.getElementById(`${ID}-close`).addEventListener('click', () => {
      modal.classList.remove(`${ID}-active`);
      document.documentElement.classList.remove(`${ID}-noscroll`);
    });

    document.documentElement.addEventListener('click', (e) => {

      if (e.target.classList.contains(`${ID}-noscroll`) && !e.target.closest(`.${ID}-modal`)) {
        modal.classList.remove(`${ID}-active`);
        document.documentElement.classList.remove(`${ID}-noscroll`);
      }

    });

    document.body.addEventListener('click', (e) => {

      if(e.target.classList.contains(`${ID}-colour`) || e.target.closest(`.${ID}-colour`)) {

        let colourButton = e.target.closest(`.${ID}-colour`) || e.target;

        colourButton.classList.add(`${ID}-processing`);

        let href = colourButton.getAttribute('data-href');

        // fireEvent(`Click - user has selected a colour [${e.target.closest(`.${ID}-colour`).getAttribute('data-colour')}] going to href [${href}]`, true);
        fireBootsEvent(`Click - user has selected a colour [${e.target.closest(`.${ID}-colour`).getAttribute('data-colour')}] going to href [${href}]`, true, eventTypes.experience_action, {
          action_type: actionTypes.click_product,
          action_detail: `Click - user has selected a colour`
        });
        setTimeout(() => {
          window.location.href = href;
        }, 2000);
        

      }

    });

    document.getElementById(`${ID}-search`).addEventListener('keyup', (e) => {
      let value = e.target.value;

      if (value.length > 2) {
        let allCurrColours = document.querySelectorAll(`.${ID}-colour`);
        allCurrColours = [].slice.call(allCurrColours);
        
        allCurrColours.forEach((colour) => {
          let colourText = colour.querySelector('p').textContent.toLowerCase();
          if (colourText.includes(value.toLowerCase())) {
            colour.style.display = 'flex';
          } else {
            colour.style.display = 'none';
          }
        });

      } else {
        let allCurrColours = document.querySelectorAll(`.${ID}-colour`);
        allCurrColours = [].slice.call(allCurrColours);
        
        allCurrColours.forEach((colour) => {
          colour.style.display = 'flex';
        });
      }

    });

  })

}



export default () => {

  bootsEvents.initiate = true;
	bootsEvents.methods = ["datalayer"];
	bootsEvents.property = "G-C3KVJJE2RH"; 
	bootsEvents.testID = testIDAndVariant;

  setup();

  

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  pollerLite([
    () => {
      if (window.dataLayer.find((item) => item.event == "defaultPageView")) {
        return true;
      }
    }
  ], () => {

    let dataLayer = window.dataLayer || [];
    let pageView = dataLayer.filter((item) => {
      if (item.event == "defaultPageView") {
        return item;
      }
    });

    if (pageView[0].page.type == "PDP") {
      let sku = window.location.pathname.split("-").pop().replaceAll('p', '');

      if (castingProducts.find((product) => product[0] == sku)) {
        startExperiment(castingProducts, 'casting');
      } else if (excellenceProducts.find((product) => product[0] == sku)) {
        startExperiment(excellenceProducts, 'excellence');
      } else if (retouchProducts.find((product) => product[0] == sku)) {
        startExperiment(retouchProducts, 'magicretouch');
      } else if (preferenceProducts.find((product) => product[0] == sku)) {
        startExperiment(preferenceProducts, 'preference');
      } else if (oliaProducts.find((product) => product[0] == sku)) {
        startExperiment(oliaProducts, 'olia');
      } else if (goodProducts.find((product) => product[0] == sku)) {
        startExperiment(goodProducts, 'good');
      } else if (nutrisseProducts.find((product) => product[0] == sku)) {
        startExperiment(nutrisseProducts, 'nutrisse');
      } 
    }

  });

  

};
