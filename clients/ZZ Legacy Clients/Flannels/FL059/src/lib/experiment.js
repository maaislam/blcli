import {
  setup,
  getTerm,
  getGender,
  compareSizes,
  generateHint,
} from './services';
import {
  events
} from '../../../../../lib/utils';
import settings from './settings';
import {men, women} from '../config/sizes';
events.analyticsReference = '_gaUAT';
const {ID} = settings;
const activate = () => {
  setup();
  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }
  const productGender = getGender();
  const productTerms = getTerm();
  const {
    productName
  } = window.dataLayer[1];
  const dropdowns = ['.SizeDropDown', '#divColour select'];
  let isDisabled;
  let curValue;
  // console.log(productGender + '--gender', productTerms + '--terms', productName + '--name');
    /** window.dataLayer[1].pageType === 'ProductDetail'
   * Mens shirts -topsAndKnitwear
    Mens t-shirts -topsAndKnitwear
    Mens polo shirts -topsAndKnitwear
    Mens sweatshirts -outerwear
    Mens knitwear -topsAndKnitwear
    Mens shoes -footwear
    Womens tops -all
    Womens dresses -all
    Womens knitwear -all
    Womens sweatshirts -all
    Womens skirts & shorts -jeans
    Womens trousers -jeans
    Womens shoes -footwear
   */
  if(settings.VARIATION === '1'){
  //Changes each option text on pageload
  events.send(settings.ID, 'Variation 1', 'is active');
  compareSizes(productTerms, productGender);
  /* 
  * Adds change eventListener to both dropdown in page
  * to handle automatic changes triggered by the website itself
  */
  isDisabled = document.querySelector('#divColour select').getAttribute('disabled');
  if(!isDisabled){
    [].forEach.call(dropdowns, function(dropdown){
      document.querySelector(dropdown).setAttribute('data-listener', 'change');
      document.querySelector(dropdown).addEventListener('change', function(){
        compareSizes(productTerms, productGender);
      });
    });
  }
  }
  if(settings.VARIATION === '3'){
    events.send(settings.ID, 'Variation 2', 'is active');
    let index;
    let matchVal;
    let isOutOfStock;
    let title;
    document.querySelector('.SizeDropDown').addEventListener('change', function(e){
      curValue = e.target.options[e.target.selectedIndex].textContent.trim().toUpperCase();
      isOutOfStock = e.target.options[e.target.selectedIndex].getAttribute('class');
      if(productGender === 'men'){
        switch(productTerms[0]){
          case 'topsAndKnitwear':
            if (men.oldtops.indexOf(curValue) > -1 ) {
              index = men.oldtops.indexOf(curValue);
              matchVal = men.newtops[index];
              if(isOutOfStock){
                title = e.target.title.trim().replace(curValue, '');
                generateHint(matchVal, title);
              } else {
                generateHint(matchVal);
              }
            } else {
              if(document.querySelector('#sizeHint')){
                const hint = document.querySelector('#sizeHint');
                hint.parentElement.removeChild('#sizeHint');
              }
            }
            break;
          case 'outerwear':
            if (men.oldtops.indexOf(curValue) > -1) {
              index = men.oldtops.indexOf(curValue);
              matchVal = men.newtops[index];
              if(isOutOfStock){
                title = e.target.title.trim().replace(curValue, '');
                generateHint(matchVal, title);
              } else {
                generateHint(matchVal);
              }
            } else {
              if(document.querySelector('#sizeHint')){
                const hint = document.querySelector('#sizeHint');
                hint.parentElement.removeChild('#sizeHint');
              }
            }
            break;
          case 'footwear':
            if (men.oldshoes.indexOf(curValue) > -1) {
              index = men.oldtops.indexOf(curValue);
              matchVal = men.newshoes[index];
              if(isOutOfStock){
                title = e.target.title.trim().replace(curValue, '');
                generateHint(matchVal, title);
              } else {
                generateHint(matchVal);
              }
            } else {
              if(document.querySelector('#sizeHint')){
                const hint = document.querySelector('#sizeHint');
                hint.parentElement.removeChild('#sizeHint');
              }
            }
            break;
          default:
            break;      
        }
      } else if (productGender === 'women'){
        switch(productTerms[0]){
          case 'all':
            if (women.oldtops.indexOf(curValue) > -1) {
              index = women.oldtops.indexOf(curValue);
              matchVal = women.newtops[index];
              if(isOutOfStock){
                title = e.target.title.trim().replace(curValue, '');
                generateHint(matchVal, title);
              } else {
                generateHint(matchVal);
              }
            } else {
              if(document.querySelector('#sizeHint')){
                const hint = document.querySelector('#sizeHint');
                hint.parentElement.removeChild('#sizeHint');
              }
            }
            break;
          case 'jeans':
            if (women.oldtops.indexOf(curValue) > -1) {
              index = women.oldtops.indexOf(curValue);
              matchVal = women.newtops[index];
              if(isOutOfStock){
                title = e.target.title.trim().replace(curValue, '');
                generateHint(matchVal, title);
              } else {
                generateHint(matchVal);
              }
            } else {
              if(document.querySelector('#sizeHint')){
                const hint = document.querySelector('#sizeHint');
                hint.parentElement.removeChild('#sizeHint');
              }
            }
            break;
          case 'footwear':
            if (women.oldshoes.indexOf(curValue) > -1) {
              index = women.oldshoes.indexOf(curValue);
              matchVal = women.newshoes[index];
              if(isOutOfStock){
                title = e.target.title.trim().replace(curValue, '');
                generateHint(matchVal, title);
              } else {
                generateHint(matchVal);
              }
            } else {
              if(document.querySelector('#sizeHint')){
                const hint = document.querySelector('#sizeHint');
                hint.parentElement.removeChild('#sizeHint');
              }
            }
            break;
          default:
            break;      
        }
      }
    });
  }
};

export default activate;
