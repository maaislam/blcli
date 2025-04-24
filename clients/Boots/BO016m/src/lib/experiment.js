/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import searchData from './searchData';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;
  
  // add the new content in to the search box
  const addContent = () => {
    const searchResultBlock = document.createElement('div');
    searchResultBlock.classList.add(`${ID}-searchContent`);
    searchResultBlock.innerHTML = `
    <div class="${ID}-resultContent">
      <h3>Brands</h3>
      <div class="${ID}-resultsInner"></div>
    </div>`;

    const keyWordsContainer = document.querySelector('.algolia-search-container');
    if(shared.VARIATION === '1') {
      keyWordsContainer.insertAdjacentElement('afterbegin', searchResultBlock);
    } else if(shared.VARIATION === '2') { 
      keyWordsContainer.querySelector('.algolia-ac-col.keywords').insertAdjacentElement('afterend', searchResultBlock);
    } 
  }
  addContent();

  // check the first returned result
  const getFirstResult = () => {
    const firstReturnedResult = document.querySelector('.algolia-search-container .algolia-ac-keywords .algolia-ac-qs-link');
    if(firstReturnedResult && firstReturnedResult !== '') {
      const resultName = firstReturnedResult.getAttribute('data-keyword');
      return resultName;
    }
  }

  const searchEvent = () => {
    const searchBox = document.querySelector('#searchTermWrapper .search-box');
    const terms = ['mascara', 'soap', 'foundation', 'sun cream', 'toothpaste', 'perfume', 'pregnancy test', 'toothbrush', 'nail polish', 'primer', 'hair', 'hair dye', 'fake tan', 'lipstick', 'vitamin d', 'sunglasses', 'skincare', 'aftershave', 'make up brushes', 'coronavirus'];

    const searchContent = searchData;

    if(searchBox){

      let lastTerm;

      searchBox.addEventListener('keyup', () => {
        // get what is being searched
        const result = getFirstResult();
        const filteredArr = terms.filter((x)=>{
          const matchArr = x.toLowerCase().includes(result);
          if(matchArr === true && result !== '') {
            return result;
          }
        });


        // if what is searched matches term, get the data for the term
        if(terms.indexOf(filteredArr[0]) > -1) {
          const data = searchContent[filteredArr[0]];

          if(data) {
            let type;
            type = data.brands;


            // rebuild if changed
            if(filteredArr[0] !== lastTerm) {
              document.querySelector(`.${ID}-resultContent h3`).style.display = 'none';
              document.querySelector(`.${ID}-resultsInner`).innerHTML = '';
            }
          
            if(!document.querySelector(`.${ID}-brandImage`)) {
              Object.keys(data.brands).forEach((i) => {
                const brandData = data.brands[i];
                const brand = document.createElement('div');
                brand.classList.add(`${ID}-resultBrand`);
                brand.innerHTML = `
                <a href="${brandData.link}">
                  <div class="${ID}-brandImage" style="background-image:url(${brandData.image})"></div>
                  <div class="${ID}-brandName">${[i][0]}</div>
                </a>`;

                document.querySelector(`.${ID}-resultsInner`).appendChild(brand);
              });

              // show the title
              document.querySelector(`.${ID}-resultContent h3`).style.display = 'block';
            }

            lastTerm = filteredArr[0];
          }
        } else { // remove the results if the search result has changed
          if(document.querySelector(`.${ID}-brandImage`)) {
            document.querySelector(`.${ID}-resultContent h3`).style.display = 'none';
            document.querySelector(`.${ID}-resultsInner`).innerHTML = '';
          }
        }
      });
    }
  }

  searchEvent();


  const addEvents = () => {
    window.cmCreateManualLinkClickTag(`/BO016m?cm_sp=Included-_-${ID} variation:${VARIATION}-_-Maxymiser`);

    const searchBox = document.querySelector('#searchTermWrapper .search-box');
    searchBox.addEventListener('keyup', () => {
        const allBrands = document.querySelectorAll(`.${ID}-resultBrand`);
        if(allBrands) {
            for (let index = 0; index < allBrands.length; index += 1) {
              const element = allBrands[index];
              const elName = element.querySelector(`.${ID}-brandName`).textContent.trim();
              element.querySelector('a').addEventListener('click', () => {
                window.cmCreateManualLinkClickTag(`/BO016m?cm_sp=InteractedBrand-_-${ID} variant${VARIATION}:${elName}-_-Maxymiser`);
              });
            }
        }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    addEvents();
  });
 
};
