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
      <h3>${VARIATION === '1' ? 'Brands' : 'Articles'}</h3>
      <div class="${ID}-resultsInner"></div>
    </div>`;

    const keyWordsContainer = document.querySelector('.algolia-search-container');
    keyWordsContainer.querySelector('.algolia-ac-col.keywords .algolia-ac-keywords').insertAdjacentElement('afterend', searchResultBlock);
    
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

  // on keyup
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

            if(shared.VARIATION === '1') {
              if(data.brands) {
                type = data.brands;
              }
            } else {
              type = data.articles;
            }

            // rebuild if changed
            if(filteredArr[0] !== lastTerm) {
              document.querySelector(`.${ID}-resultContent h3`).style.display = 'none';
              document.querySelector(`.${ID}-resultsInner`).innerHTML = '';
            }
          
            if(!document.querySelector(`.${ID}-resultImage`)) {
              Object.keys(type).forEach((i) => {
                const resultData = type[i];
                const resultLink = document.createElement('div');
                resultLink.classList.add(`${ID}-resultBlock`);
                resultLink.innerHTML = `
                <a href="${resultData.link}">
                  <div class="${ID}-resultImage" style="background-image:url(${resultData.image})"></div>
                  <div class="${ID}-resultName">${[i][0]}</div>
                </a>`;

                document.querySelector(`.${ID}-resultsInner`).appendChild(resultLink);
              });

              // show the title
              document.querySelector(`.${ID}-resultContent h3`).style.display = 'block';
            }

            lastTerm = filteredArr[0];

          }
        } else { // remove the results if the search result has changed
          if(document.querySelector(`.${ID}-resultImage`)) {
            console.log('removed');
            document.querySelector(`.${ID}-resultContent h3`).style.display = 'none';
            document.querySelector(`.${ID}-resultsInner`).innerHTML = '';
          }
        }
      });
    }
  }

  searchEvent();
};
