/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;
let firstRun = true;

let productData = [

  {
    sapCode: 10032867,
    productType: "Cold & Flu Relief",
    description: 'NIGHT NURSE LIQUID 160ML 6+ (P) (1E)',
    timingClaim: 'Cold and flu relief during the night',
    efficacyClaim: 'Nothing stronger for cold and flu relief',
    activeIngredients: 'Paracetamol',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10206819,
    productType: "Cold & Flu Relief",
    description: 'Difflam throat and mouth spray 30ml (P)',
    timingClaim: 'Fast, long lasting pain relief for sore throats',
    efficacyClaim: '',
    activeIngredients: 'Benzydamine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10068065,
    productType: "Cold & Flu Relief",
    description: 'STREPSILS HONEY & LEMON 36S G',
    timingClaim: 'Fast relief for up to 2 hours',
    efficacyClaim: 'At the first sign of a sore throat, soothe but also fight infection to prevent it from getting worse',
    activeIngredients: '1.2mg of 2,4-Dichlorobenzyl alcohol',
    productFor: 'Sore throats',
    readLabel: true,
  },
  {
    sapCode: 10028386,
    productType: "Cold & Flu Relief",
    description: 'Sterimar Breathe Easy nasal hygiene 100ml',
    timingClaim: '',
    efficacyClaim: 'Cleanses and eliminates impurities (dust, mucus, allergens…) ',
    activeIngredients: '',
    productFor: 'Helps to breathe better, Helps prevent colds*',
    readLabel: false,
  },
  {
    sapCode: 10006569,
    productType: "Cold & Flu Relief",
    description: 'SUDAFED BLOCK NOSE SP 15 G',
    timingClaim: 'Gets to work in 2 minutes',
    efficacyClaim: 'Rapid & targeted blocked nose relief',
    activeIngredients: 'XYLOMETAZOLINE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10081085,
    productType: "Cold & Flu Relief",
    description: 'Boots Max Strength C&F D/N Caps G',
    timingClaim: 'Rapidly absorbed* Based on the absorption of paracetamol',
    efficacyClaim: 'Maximum strength, non-drowsy cold and flu relief for the day and night. // The capsules contain paracetamol which is a pain reliever (analgesic) and helps to reduce your temperature. When you have a fever, and phenylephrine which is a decongestant to reduce swelling in the passages of the nose to help you breathe more easily. The day capsules additionally contain caffeine which helps to increase the pain relief from paracetamol and makes you feel more alert/ relieve the symptoms of daytime fatigue.',
    activeIngredients: 'Paracetamol',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10060258,
    productType: 'Cold & Flu Relief',
    description: 'Lemsip Max D/N C&F Capsules 16s G',
    timingClaim: 'For 24 hour relief* (*based on capsules for daytime use and capsules to be taken at night)',
    efficacyClaim: 'Night time relief to aid sleep* (*through relief of nasal congestion)',
    activeIngredients: 'Paracetamol',
    productFor: 'cold & flu',
    readLabel: true,
  },
  {
    sapCode: 10081013,
    productType: 'Cold & Flu Relief',
    description: 'Sterimar Hypertonic Cong Relief 100ml',
    timingClaim: '',
    efficacyClaim: 'Helps rapidly decongest the nose in the event of colds and sinusitis* Helps wash away even thick mucus',
    activeIngredients: '',
    productFor: 'decongestion',
    readLabel: true,
  },
  {
    sapCode: 10060261,
    productType: 'Cold & Flu Relief',
    description: 'Vicks VapoRub - 100g G',
    timingClaim: 'Releases vapours for up to 8 hours.',
    efficacyClaim: '4 in 1 relief against cold symptoms: blocked nose, sore throat, congestion, coughs due to cold',
    activeIngredients: 'Levomenthol',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10220406,
    productType: 'Cold & Flu Relief',
    description: 'Boots Pharma dual defence nsl spry 20ml',
    timingClaim: 'Use at 1st signs',
    efficacyClaim: 'Contains clinically proven Carragelose to help shorten the duration and severity of cold and flu-like symptoms',
    activeIngredients: 'CARRAGELOSE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10050146,
    productType: 'Cold & Flu Relief',
    description: 'Vicks First Defence nasal spray 15ml',
    timingClaim: '',
    efficacyClaim: 'Helps to stop and remove cold viruses - at first signs of a cold',
    activeIngredients: 'OXYMETAZOLINE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10132984,
    productType: 'Cold & Flu Relief',
    description: 'Boots Chesty Cough Relief 150ml G',
    timingClaim: 'Gets to work from 15 minutes* refers to absorption of guaifenesin',
    efficacyClaim: 'Provides deep, penetrating relief for chesty coughs. Contains guaifenesin to help clear your chesty cough',
    activeIngredients: 'GUAIFENESIN',
    productFor: 'Chesty cough relief',
    readLabel: true,
  },
  {
    sapCode: 10093685,
    productType: 'Cold & Flu Relief',
    description: 'Lemsip Max All In One Capsules 16s G (1)',
    timingClaim: 'No faster all in one capsule for cold, flu and chesty cough',
    efficacyClaim: '',
    activeIngredients: 'PHENYLEPHRINE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10021919,
    productType: 'Cold & Flu Relief',
    description: 'ZZ OTRIVINE SIN SPRY (G)',
    timingClaim: 'Unblocks in 2 mins and lasts 10hrs',
    efficacyClaim: '',
    activeIngredients: 'XYLOMETAZOLINE',
    productFor: 'Sinusitis',
    readLabel: true,
  },
  {
    sapCode: 10095640,
    productType: 'Cold & Flu Relief',
    description: 'Ultra Chlorsptc thrt spry orig 15ml (G)',
    timingClaim: 'Numbs in seconds',
    efficacyClaim: 'Anaesthetic throat spray that directly targets the source of the pain',
    activeIngredients: 'BENZOCAINE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10181859,
    productType: 'Cold & Flu Relief',
    description: 'Bronchostop cough syrup 120ml',
    timingClaim: '',
    efficacyClaim: 'Traditionally used for the relief of any cough',
    activeIngredients: 'Thyme herb extract',
    productFor: 'Chesty Coughs, Dry tickly irritating coughs, catarrh',
    readLabel: true,
  },
  {
    sapCode: 10060259,
    productType: 'Cold & Flu Relief',
    description: 'Benylin Chesty Cough Syrup N/D 150ml (G)',
    timingClaim: 'Gets to work in 15 mins* (*refers to absorption of Guaifenesin)',
    efficacyClaim: 'Provides deep penetrating relief and a soothing effect',
    activeIngredients: 'Guafenesin',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10132933,
    productType: 'Cold & Flu Relief',
    description: 'Covonia Dry & Tckl Cough Linctus 180ml G',
    timingClaim: '',
    efficacyClaim: 'Soothes and coats the throat to help relieve a tickly cough',
    activeIngredients: 'Glycerol',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10151970,
    productType: 'Cold & Flu Relief',
    description: 'Otrivine blocked nose spray 10ml G',
    timingClaim: 'Unblocks in 2 mins and lasts 10hrs',
    efficacyClaim: '',
    activeIngredients: 'Xylometazoline Hydrochloride',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10286412,
    productType: 'Cold & Flu Relief',
    description: 'Boots saline nasal spray 100ml',
    timingClaim: 'Rapidly decongests the nose from colds, sinusitis and hayfever',
    efficacyClaim: 'Rapidly decongests the nose from colds, sinusitis and hayfever, Acts to moisturise the nasal passageways and clear congestion, Drug and steroid free',
    activeIngredients: 'SODIUM CHLORIDE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10033028,
    productType: 'Cold & Flu Relief',
    description: 'SUDAFED DECONG TABS 12s (PE) (P)',
    timingClaim: '',
    efficacyClaim: 'Unbeatable strength tablet to help unblock the nose',
    activeIngredients: 'PSEUDOEPHEDRINE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10187398,
    productType: 'Cold & Flu Relief',
    description: 'Boots Pharma catarrh pastilles 20s G',
    timingClaim: '',
    efficacyClaim: 'Effectively relieves the symptoms of catarrh, coughs and colds, For easy breathing, clears congestion, Contains plant oils, With antiseptic properties, Eases the symptoms of a chesty cough',    activeIngredients: '',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10149475,
    productType: 'Cold & Flu Relief',
    description: 'Bts Decon & PainRel Tab 12s (PE) (1) (P)',
    timingClaim: '',
    efficacyClaim: 'Dual action congestion and pain relief, Relief of cold and flu symptoms // including feverishness, aches and pains, headache, nasal and sinus congestion(blocked nose and sinuses). Contains Pseudophedrine to reduce swelling in the nasal passageways and relieve congestion/a stuffy nose, and Paracetamol to relieve headache, fever and aches & pains associated with colds and flu',
    activeIngredients: 'PSEUDOEPHEDRINE',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10255671,
    productType: 'Cold & Flu Relief',
    description: 'Boots Ph Easy Breath Vap Plug In & Refill',
    timingClaim: '8 hours comforting release',
    efficacyClaim: 'For easy breathing, day and night',
    activeIngredients: '',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10311751,
    productType: 'Allergy Relief',
    description: 'Allevia 120mg Tablets x 30',
    timingClaim: 'Allevia starts to relieve your symptoms within 1 hour and lasts for 24 hours.',
    efficacyClaim: 'Relieves symptoms associated with hayfever.',
    activeIngredients: 'Fexofenadine',
    productFor: 'Sneezing, Itchy runny blocked nose, Itchy watery and red eyes',
    readLabel: true,
  },
  {
    sapCode: 10311753,
    productType: 'Allergy Relief',
    description: 'Allevia 120mg Tablets x 7',
    timingClaim: 'Allevia starts to relieve your symptoms within 1 hour and lasts for 24 hours.',
    efficacyClaim: 'Relieves symptoms associated with hayfever.',
    activeIngredients: 'Fexofenadine',
    productFor: 'Sneezing, Itchy runny blocked nose, Itchy watery and red eyes',
    readLabel: true,
  },
  {
    sapCode: 10311752,
    productType: 'Allergy Relief',
    description: 'Allevia 120mg Tablets x 15',
    timingClaim: 'Allevia starts to relieve your symptoms within 1 hour and lasts for 24 hours.',
    efficacyClaim: 'Relieves symptoms associated with hayfever.',
    activeIngredients: 'Fexofenadine',
    productFor: 'Sneezing, Itchy runny blocked nose, Itchy watery and red eyes',
    readLabel: true,
  },
  {
    sapCode: 10172560,
    productType: 'Allergy Relief',
    description: 'Boots Hayfever & Allergy Relief 10mg Tablets (30 Tablets)',
    timingClaim: '',
    efficacyClaim: 'This medicine is to treat the symptoms of hayfever',
    activeIngredients: 'Cetirizine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10172575,
    productType: 'Allergy Relief',
    description: 'Boots One-a-Day Hayfever & Allergy Relief 10mg Tablets - 30 Tablets',
    timingClaim: '',
    efficacyClaim: 'This medicine is to treat the symptoms of hayfever',
    activeIngredients: 'Loratadine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10083541,
    productType: 'Allergy Relief',
    description: 'Boots Hayfever & Allergy Relief 10mg Tablets (60 Tablets)',
    timingClaim: '',
    efficacyClaim: 'This medicine is to treat the symptoms of hayfever',
    activeIngredients: 'Cetirizine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10120825,
    productType: 'Allergy Relief',
    description: 'Boots One-a-day Hayfever & Allergy Relief 10mg Tablets - 60 Tablets',
    timingClaim: '',
    efficacyClaim: 'This medicine is to treat the symptoms of hayfever',
    activeIngredients: 'Loratadine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10086382,
    productType: 'Allergy Relief',
    description: 'Boots Hayfever & Allergy Relief 10mg Tablets (14 tablets)',
    timingClaim: '',
    efficacyClaim: 'This medicine is to treat the symptoms of hayfever',
    activeIngredients: 'Cetirizine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10124473,
    productType: 'Allergy Relief',
    description: 'Boots Pharmaceuticals One-A-Day Allergy Relief 10mg Tablets - 14 Tablets',
    timingClaim: '',
    efficacyClaim: 'This medicine is to treat the symptoms of hayfever',
    activeIngredients: 'Loratadine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10314786,
    productType: 'Allergy Relief',
    description: 'Clarityn Allergy 10mg Tablets - 30s',
    timingClaim: '',
    efficacyClaim: 'To relieve allergic symptoms due to hayfever and other airborne allergies, such as house dust mite and pet allergies',
    activeIngredients: 'Loratadine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10322656,
    productType: 'Allergy Relief',
    description: 'Clarityn Allergy 10mg Tablets - 60 Tablets',
    timingClaim: '',
    efficacyClaim: 'To relieve allergic symptoms due to hayfever and other airborne allergies, such as house dust mite and pet allergies',
    activeIngredients: 'Loratadine',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10191827,
    productType: 'Allergy Relief',
    description: 'Piriteze Antihistamine Allergy Relief Tablets, Cetirizine – Pack of 30',
    timingClaim: '',
    efficacyClaim: 'To relieve the symptoms of: hayfever, skin allergies, pet allergies, mould spore allergies, house dust mite allergies',
    activeIngredients: 'Cetirizine hydrochloride',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10263816,
    productType: 'Allergy Relief',
    description: 'Piriteze Antihistamine Allergy Relief Tablets, Cetirizine – Pack of 14',
    timingClaim: '',
    efficacyClaim: 'To relieve the symptoms of: hayfever, skin allergies, pet allergies, mould spore allergies, house dust mite allergies',
    activeIngredients: 'Cetirizine hydrochloride',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10032788,
    productType: 'Allergy Relief',
    description: 'Piriton Antihistamine Allergy Relief Tablets - Pack of 30',
    timingClaim: '',
    efficacyClaim: 'Piriton Allergy for the symptomatic relief from the symptoms of: hayfever and other allergies // e.g. pet, house dust mite & mould spore allergies, nettle rash, hives, heat rash, prickly heat & dermatitisreactions to food, food additives, medicines & insect bites. Also relieves the itchy rash of chickenpox.',
    activeIngredients: 'Chlorphenamine Maleate',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10210936,
    productType: 'Allergy Relief',
    description: 'Pirinase Allergy Relief Fluticasone Propionate 0.05% Nasal Spray 60 Sprays',
    timingClaim: '',
    efficacyClaim: 'Prevents and relieves symptoms of airborne allergens including: Pollen(Hay fever), Pet hair, Dust mite, Mould spores',
    activeIngredients: '0.05% w/w Fluticasone propionate (50 micrograms per spray).',
    productFor: '',
    readLabel: true,
  },
  {
    sapCode: 10024248,
    productType: 'Allergy Relief',
    description: 'Beconase Hayfever Relief for Adults Nasal Spray - 100 Sprays',
    timingClaim: 'Can provide up to 24hr relief (when used twice daily)',
    efficacyClaim: 'Beconase hayfever Relief nasal spray for adults is a highly effective medication for treating hay fever.',
    activeIngredients: 'Beclometasone Dipropionate',
    productFor: '',
    readLabel: true,
  },

];

const processAddingAdditionalInfo = (product, listerOption, index) => {

  let currPositionInRow = 0;
  if (window.outerWidth > 1280) {
  currPositionInRow = index % 4;
  } else if (window.outerWidth <= 1280 && window.outerWidth > 575) {
    currPositionInRow = index % 3;
  } else if (window.outerWidth <= 575) {
    currPositionInRow = index % 2;
  }

  let currListerOption = listerOption;

  if (currPositionInRow == 1 && window.outerWidth > 575) {
    listerOption.previousElementSibling.insertAdjacentElement('beforebegin', currListerOption);
  } else if (currPositionInRow == 2 && window.outerWidth > 575) {
    listerOption.previousElementSibling.previousElementSibling.insertAdjacentElement('beforebegin', currListerOption);
  } else if (currPositionInRow == 3 && window.outerWidth > 575) {
    listerOption.previousElementSibling.previousElementSibling.previousElementSibling.insertAdjacentElement('beforebegin', currListerOption);
  }

  let theLister = '';

  if(listerOption == '') {
    theLister = document.querySelector('.oct-listers-hits .oct-grid__cell');
  } else {
    theLister = listerOption;
  }

  theLister.classList.add(`${ID}-promoted`);

  let claimText = VARIATION == 1 ? product.timingClaim : product.efficacyClaim;
  let claimHTML = `<h2>${claimText}</h2>`;
  if(claimText.indexOf('//') > -1) {
    let claimHeader = claimText.split('//')[0];
    let claimSubHeader = claimText.split('//')[1];

    claimHTML = `<h2 class="${ID}-modheader">${claimHeader}</h2><p class="${ID}-modp">${claimSubHeader}</p>`;

  }


  let newHTML = `

            <div class="${ID}-additionalinfo">
              
              <div class="${ID}-additionalinfo--header">
                <h3>${product.productType}</h3>
              </div>
              
              <div class="${ID}-additionalinfo--detail">
          
                ${claimHTML}

                ${product.productFor !== "" ? `
                <h4>For relief of: </h4>

                <ul>
                  ${product.productFor ? product.productFor.split(',').map((item) => { return `<li>${item}</li>` }).join('') : ''}
                </ul>
                ` : ``}
              
              </div>

              <div class="${ID}-additionalinfo--footer">
                ${product.readLabel == true ? `<p class="${ID}-firstline">Always read the label</p>` : ``}
                ${product.activeIngredients ? `<p>Active ingredient: ${product.activeIngredients} </p>` : ``}
              </div>
            
            
            </div>
            

          `;

  if(!theLister.querySelector(`.${ID}-additionalinfo`)) {
    theLister.querySelector('.oct-teaser-wrapper').insertAdjacentHTML('afterend', newHTML);
  }

}

const hidePromoTiles = () => {

  return new Promise((resolve) => {

    if(VARIATION !== "control") {
      let allIngridTeasers = document.querySelectorAll('.oct-teaser__inGrid');

      [].slice.call(allIngridTeasers).forEach((ingridTeaser) => {

        ingridTeaser.closest('.oct-grid__cell').classList.add(`${ID}-hidden`);

      });

      let allContentSlots = document.querySelectorAll('.AT-1505ContentSlot');

      [].slice.call(allContentSlots).forEach((contentSlot) => {

        contentSlot.classList.add(`${ID}-hidden`);
      
      });
    }
    resolve();

  });


}

const startExperiment = () => {
  pollerLite(['.oct-listers-hits .oct-grid__cell'], () => {

   
    setTimeout(() => {
      let allCurrListerOptions = document.querySelectorAll('.oct-listers-hits > .oct-grid__cell');
      allCurrListerOptions = [].slice.call(allCurrListerOptions).filter((listerOption) => {
        if (listerOption.getAttribute('style') == "display: none !important;" || listerOption.classList.contains(`${ID}-hidden`)) {
          return false;
        } else {
          return listerOption;
        }
        
      });
      let foundProduct = false;
      allCurrListerOptions.forEach((listerOption, index) => {
        let listerOptionSKU = '';
      
        if(!listerOption.getAttribute('data-productid') && window.location.href.indexOf('searchTerm') > -1) {
          const urlParams = new URLSearchParams(window.location.search);
          const searchTerm = urlParams.get('searchTerm');
          if(isNaN(parseInt(searchTerm))) {
            let product = listerOption.querySelector('.oct-link').href;
            let skuCode = product.split('-')[product.split('-').length - 1];
            listerOptionSKU = skuCode;
          } else {
            let product = productData.find(product => product.sapCode == searchTerm);
            listerOptionSKU = product.sapCode;
          }
        } else {
          listerOptionSKU = listerOption.getAttribute('data-productid') ? listerOption.getAttribute('data-productid').replace('.P', '') : '00000000';
        }

        if(productData.find(product => product.sapCode == listerOptionSKU) && foundProduct == false) {
          let claimFound = false;
          let product = productData.find(product => product.sapCode == listerOptionSKU);
          if(VARIATION == 1) {
            if(product.timingClaim !== "") {
              claimFound = true;
            }
          } else if (VARIATION == 2) {
            if(product.efficacyClaim !== "") {  
              claimFound = true;
            }
          } else {
            claimFound = true;
          }

          
          
          if (VARIATION !== "control" && claimFound == true) {
            processAddingAdditionalInfo(product, listerOption, index);
            foundProduct = true;
          
          }

          if (claimFound == true) {
            fireEvent(`Conditions Met - product found, experience ${VARIATION == "control" ? "would have" : "was"} displayed on page: ${window.location.href} with product [${product.description}] sku [${product.sapCode}] highlighted`, true);
          } 

        }
        
      });

    }, 1000);


  })

}

const fireOnListerUpdates = (callback, frequency = 500) => {

  // helper function for comparing nodeLists
  const eq = (A, B) => {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== B[i]) return false;
    }
    return true;
  }

  let titles = document.querySelectorAll('.oct-teaser-with-listers').length > 0 ? document.querySelectorAll('.oct-teaser-with-listers') : document.querySelectorAll('.product_name_link');

  window.setInterval(() => {
    let newTitles = document.querySelectorAll('.oct-teaser-with-listers').length > 0 ? document.querySelectorAll('.oct-teaser-with-listers') : document.querySelectorAll('.product_name_link');
    if (!eq(titles, newTitles)) {
      titles = newTitles;
      callback();
    }
  }, frequency)


}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if (e.target.classList.contains('oct-add-to-basket_button') || e.target.closest('.oct-add-to-basket_button')) {

      let promotedCTA = e.target.closest(`.${ID}-promoted`) ? true : false;
      let productName = e.target.closest('.oct-grid__cell').querySelector('.oct-link').href;

      fireEvent(`Click - user has clicked ATB button for product [${productName}] on page [${window.location.href}] which ${promotedCTA ? "was" : "was not"} promoted by the experiment`);

    }


  });

}

export default () => {

  setup();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
 
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  addTracking();

  if(firstRun) {
    hidePromoTiles().then(() => {
      startExperiment();
    });
    
    firstRun = false;
  }

  fireOnListerUpdates(() => {

    if(firstRun == false) {
      setTimeout(() => {
        hidePromoTiles().then(() => {
          startExperiment();
        });
        
      }, 50);
    }
    
    

  });


};
