/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 3 Variations, 4 including control
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events, pollerLite, observer } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 4) {
    events.send(ID, `${ID} Control`);
    return false;
  } else {
    events.send(ID, `${ID} Variation ${VARIATION} Active`, `Variation ${VARIATION} is active`);    
  }


  // Collect Each Filter Container
  const filterContainers = cacheDom.getAll('.productFilters .productFilter');
  const filterContainersArr = Array.from(filterContainers); // Currently in Order 0 - ...
  
  
  
  // Ensure all exist
  const isInArray = (value, array) => {
    return array.indexOf(value) > -1;
  }
  
  

  // Order by Quantity 
  const orderListItems = (list) => {
    if (!list) return;
    const items = list.querySelectorAll('.FilterListItem');
    const itemConainer = list.querySelector('.productFilterList');
    const itemsToRemove = list.querySelectorAll('.productFilterList .FilterListItem');
    const itemsArr = Array.from(items);
    const orderedItemsArr = itemsArr.sort((a, b) => {
      const aCount = a.getAttribute('data-productcount');
      const bCount = b.getAttribute('data-productcount');

      return bCount - aCount;
    });

    if (orderedItemsArr) {
      
      // console.log('items to remove , ', itemsToRemove);
      for (let i = 0; itemsToRemove.length > i; i += 1) {
        if (itemsToRemove[i].parentNode) {
          
          itemsToRemove[i].parentNode.removeChild(itemsToRemove[i]);
        } 
      }
      // console.log('ordered items arr ', orderedItemsArr);
      itemConainer.insertAdjacentHTML('beforeend', `
        ${orderedItemsArr.map((item, index) => {
          return (`
           ${VARIATION == 2 && index > 4 ? `<span class="SD-hide">${item ? item.outerHTML : ''}</span>` : item ? item.outerHTML : ''} 
          `)
        }).join('')}
        
      `);

      if (!itemConainer.parentElement.querySelector('button.SD-show-more')) {
        itemConainer.insertAdjacentHTML('afterend', `${VARIATION == 2 && orderedItemsArr.length > 6 ? `<button class="SD-show-more">Show More</button>` : ''}`);
        // setTimeout(() => {
        // }, 500);
      }

    }
  }

  // // let newArr;
  for (let i = 0; filterContainersArr.length > i; i += 1) {
    if (!isInArray(filterContainersArr[i], filterContainersArr)) {
      //console.error('missing filters, exiting SD022');
      //events.send(ID, `${ID} Fail`, 'SD022 Test failed, filters weren\'t captrued');
      return false;
    }

    // Order items (Except Price)
    if (filterContainersArr[i].querySelector('h3.productFilterTitle').textContent.trim() !== 'Price') {

      orderListItems(filterContainersArr[i]);
    }
  }

  // Passed
  const reOrder = (filtersArr, order = [1,2,3,4,5,6,7,8]) => {
    if (!filtersArr) return;
    const arrClone = [].concat(filtersArr); 

    let newArrOrder = [];
    for (let i = 0; arrClone.length > i; i += 1) {
      if (arrClone[i].querySelector('h3.productFilterTitle')) {
        if (arrClone[i].querySelector('h3.productFilterTitle').textContent.trim() == 'Brand') {
          // newArrOrder.splice(0, 0, arrClone[i]);
          newArrOrder[0] = arrClone[i];
        } else if (arrClone[i].querySelector('h3.productFilterTitle').textContent.trim() == 'Size') {
          // newArrOrder.splice(1, 0, arrClone[i]);
          newArrOrder[1] = arrClone[i];
        } else if (arrClone[i].querySelector('h3.productFilterTitle').textContent.trim() == 'Price') {
          // newArrOrder.splice(2, 0, arrClone[i]);
          newArrOrder[2] = arrClone[i];
        } else if (arrClone[i].querySelector('h3.productFilterTitle').textContent.trim() == 'Colour') {
          // newArrOrder.splice(3, 0, arrClone[i]);
          newArrOrder[3] = arrClone[i];
        } else if (arrClone[i].querySelector('h3.productFilterTitle').textContent.trim() == 'Gender') {
          newArrOrder[4] = arrClone[i];
          // newArrOrder.splice(4, 0, arrClone[i]);
        } else {
          newArrOrder.push(arrClone[i]);
        }
      }
    }
    

    const parent = filtersArr[0].parentElement;
    parent.textContent = '';
    parent.insertAdjacentHTML('beforeend', `
      ${newArrOrder.map((item) => {
        return(`
          ${item ? item.outerHTML : ''}
        `)
      }).join('')}
    `);
  };
  
  
  // Run Add Filters
  reOrder(filterContainersArr);
  

  // Add toggle function back to titles
  const newTitles = document.querySelectorAll('#filterlist .productFilterTitleBox');
  if (newTitles.length) {
    for (let i = 0; newTitles.length > i; i += 1) {
      const newTitleParent = newTitles[i].parentElement;
      newTitles[i].addEventListener('click', (e) => {
        e.preventDefault
        console.log('click', newTitles[i]);
        newTitles[i].classList.toggle('FilterClosed');
        newTitleParent ? newTitleParent.classList.toggle('SD022-toggle') : null;
        events.send(ID, `${ID} Click`, `SD022 Clicked show/hide toggle`);
      });

      if (VARIATION == 3) {
        if (i !== 0) {
          newTitles[i].click();
        }
    }
  }

  const filterWrap = document.querySelector('#innerfiltercontainer');
    // if (VARIATION == 3) {
    // observer.connect(filterWrap, () => {
    //   const closedFilters = document.querySelectorAll('.FilterClosed');
    //     if (closedFilters && closedFilters.length > 1) {
    //       if (newTitles.length) {
    //         for (let i = 0; newTitles.length > i; i += 1) {
    //           if (i !== 0 && !newTitles[i].classList.contains('FilterClosed')) {
    //             newTitles[i].click();
    //           }
    //         }
    //       }
    //     }
    //   }, {
    //     config: {
    //       attributes: true,
    //       childList: false,
    //       subtree: false,
    //     }
    //   });
    // }
  }


  
  // Variation 2
  if (VARIATION == 2) {
    // Show more 
    const showMoreBtns = document.querySelectorAll('.SD-show-more');
    if (showMoreBtns.length) {
      for (let i = 0; showMoreBtns.length > i; i += 1) {
        const btnParent = showMoreBtns[i].parentElement;
        showMoreBtns[i].addEventListener('click', (e) => {
          e.preventDefault();
          if (btnParent) {
            btnParent.classList.toggle('SD-showAll');
            if (showMoreBtns[i].textContent == 'Show More') {
              showMoreBtns[i].textContent = 'Show Less';
            } else {
              showMoreBtns[i].textContent = 'Show More';
            }
          }

          events.send(ID, `${ID} Click`, `SD022 Clicked Show More button`);
        });
      }
    }
    
  }
  // Change brand input placeholder 
  const brandInput = document.querySelector('input#txtBrandSearch');
  if (brandInput) {
    brandInput.setAttribute('placeholder', 'Find your brand...');
    brandInput.focus();
    setTimeout(() => {
      brandInput.blur();
    }, 1200);

    function myKeyPress(e){
      var keynum;
  
      if(window.event) { // IE                    
        keynum = e.keyCode;
      } else if(e.which){ // Netscape/Firefox/Opera                   
        keynum = e.which;
      }
      
      return String.fromCharCode(keynum);
      // alert(String.fromCharCode(keynum));
    }

    // Re-add auto fill func
    const brandParent = document.querySelector('.brandSearchSort').parentElement;
    
    const brandListItems = brandParent.querySelectorAll('.FilterListItem');
    const brandListItemsLen = brandListItems.length;
    
    if (brandListItems.length && brandParent) {
      
      if (VARIATION == 2) { // Show more buttons
        setTimeout(() => {
          const showMoreBtn = brandParent.querySelector('button.SD-show-more');
          if (showMoreBtn) {
            brandInput.addEventListener('click', () => {
              if (showMoreBtn && showMoreBtn.textContent == 'Show More') {
                  showMoreBtn.click();
                  showMoreBtn.classList.add('SD-hide-imp');
              }
            });
          }
        }, 500);
      }

      
      brandInput.addEventListener('keyup', (e) => {  
        const thisChar = myKeyPress(e);
        
        setTimeout(() => {
          if (brandInput.value.length == 0) {
            for (let i = 0; brandListItemsLen > i; i += 1) {
              brandListItems[i].classList.remove('SD-hide-imp');
            }  
            showMoreBtn ? showMoreBtn.classList.remove('SD-hide-imp') : null;
          }
        }, 500);

        for (let i = 0; brandListItemsLen > i; i += 1) {
          if (brandListItems[i].getAttribute('data-productname')) {
            const name = brandListItems[i].getAttribute('data-productname');
            
            if (name.toLowerCase().indexOf(brandInput.value.toLowerCase()) > -1) {
              brandListItems[i].classList.remove('SD-hide-imp');
            } else {
              brandListItems[i].classList.add('SD-hide-imp');
            }
            
          }
        }
      });
    }
  }

  

  window.addEventListener('scroll', (e) => {
    if (window.scrollY === 0) {
      filterWrap.style.position = 'relative';
    }
  });


  // If in this section exists
  pollerLite(['.ChildCategoriesListWrapper'], () => {
    const catList = document.querySelector('.ChildCategoriesListWrapper');
    const newBrandsPos = document.querySelector('ul.productFilters>li:first-of-type');
    if (catList && newBrandsPos) {
      newBrandsPos.insertAdjacentElement('afterend', catList);
      catList.style.marginBottom = '15px';
    }
  });
  

};
