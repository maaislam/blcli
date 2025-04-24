/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { observer, pollerLite, events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  // console.log({VARIATION})
  // Detect PLP type
  const { pathname } = window.location;
  let points = parseInt(document.querySelector('span.prPoints').textContent, 10);

  if (!points || points == 0) {
    document.body.classList.remove(ID);
  }

  const isMobile = () => {
    if (window.innerWidth < 849) {
      return true;
    }
  }


  let type = 'pizza';
  if (pathname.match(/pizzas.aspx$/)) {
    type = 'pizza';
    if (points < 25) {
      document.body.classList.remove(ID);
      return false;
    };
  } else if (pathname.match(/desserts.aspx$/)) {
    type = 'desert';
    if (points < 8) {
      document.body.classList.remove(ID);
      return false;
    };
  } else if (pathname.match(/sides.aspx$/)) {
    type = 'sides';
    if (points < 8) {
      document.body.classList.remove(ID);
      return false;
    };
  } else if (pathname.match(/drinks.aspx$/)) {
    type = 'drinks';
    if (points < 8) {
      document.body.classList.remove(ID);
      return false;
    };
  } else if (pathname.match(/vegan.aspx$/)) {
    type = 'vegan';
    if (points < 8) {
      document.body.classList.remove(ID);
      return false;
    };
  }
  
  const addHTML = (ref, pos, html) => {
    if (!ref) return;

    ref.insertAdjacentHTML(pos, html);

    events.send('PJ102', 'PJ102 Toggle Added', 'PJ102 User has enough points');
  };

  const toggleBodyClass = () => {
    if (document.body.classList.contains('PJ102-active')) {
      document.body.classList.remove('PJ102-active');
      const inputs = document.querySelectorAll('.makeItFree label.checkedBackground');
      // console.log({inputs})
      Array.from(inputs).map((itm) => {
        itm.click();
      });
    } else {
      document.body.classList.add('PJ102-active')
    }
  };

  // Add Banner
  let bannerRef = document.querySelector('.divSectionSeparator');
  let bannerPos = 'beforeend';
  // if (isMobile()) {
  //   bannerRef = document.querySelector('.menuItensLeft');
  //   bannerPos = 'beforebegin';
  // }

  // console.log({bannerRef});
  // console.log({bannerPos});
  
  addHTML(bannerRef, bannerPos, `
    <div class="PJ-banner">
    
    <div class="PJ-ib">
      ${VARIATION == 2 ? '' : '<span class="PJ-pizzaIcon"></span>'}
        <p>You Have ${points} Points!</p>

        <div class="PJ-outer">
        ${VARIATION == 2 ? '<p class="PJ102-2-toggle PJ-tog">How to redeem <span class="PJ-tog"><i class="PJ-chevron PJ-tog"></i> </span></p>' : '<p>Enable points redemption</p>'}

        ${VARIATION == 2 ? '' : `<label class="PJ-switch">
          <input type="checkbox" autocomplete="off">
          <span class="PJ-slider round"></span>
        </label>`}
        </div>

        ${VARIATION == 2 ? '' : '<span class="PJ-pizzaIcon"></span>'}

        ${VARIATION == 2 ? `<div class="PJ102-2-info" style="opacity: 0; visibility: hidden;">
          <div class="PJ-top">
            <p><span>Top Tip:</span> Tick the Papa Rewards <strong>tickbox before adding</strong> the item to the basket to ensure your points are applied.</p>
          </div>

          <h4><span>25 Points</span> - FREE Large Pizza</h4>
          <p>Large pizzas only. Stuffed crust included, with the usual addition of £2.75.
          <br /Also availlable on customised pizzas, Half & Half and Create your own.</p>


          <h4><span>12 Points</span> - FREE Premium Side or Desserts</h4>
          <p>Most single portion meat sides and most hot desserts.</p>


          <h4><span>8 Points</span> - FREE Side or Drink</h4>
          <p>Most single portions vegetarian sides and most drinks that have a 1.5L option.</p>


        <div>` : ''}
    </div>

    </div>
  `);


  // Add Banner events
  const addedInput = document.querySelector('.PJ-switch input');
  addedInput ? 
    addedInput.addEventListener('click', toggleBodyClass):
  null;


  // Observe list items and add toggle again if need
  const mainEl = document.querySelector('.main');
  observer.connect(mainEl, () => {
    
    setTimeout(() => {
      if (!document.querySelector('.PJ-banner')) {
        
        points = parseInt(document.querySelector('span.prPoints').textContent, 10);
        // Add Banner 
       bannerRef = document.querySelector('.divSectionSeparator');
       bannerPos = 'beforeend';
      //  if (isMobile()) {
      //    bannerRef = document.querySelector('.menuItensLeft');
      //    bannerPos = 'beforebegin';
      //  }
       addHTML(bannerRef, bannerPos, `
         <div class="PJ-banner">
         
         <div class="PJ-ib">
            ${VARIATION == 2 ? '' : '<span class="PJ-pizzaIcon"></span>'}
              <p>You Have ${points} Points!</p>
      
              <div class="PJ-outer">
              ${VARIATION == 2 ? '<p class="PJ102-2-toggle">How to redeem <span><i class="PJ-chevron"></i> </span></p>' : '<p>Enable points redemption</p>'}
      
              ${VARIATION == 2 ? '' : `<label class="PJ-switch">
                <input type="checkbox">
                <span class="PJ-slider round"></span>
              </label>`}
              </div>
      
              ${VARIATION == 2 ? '' : '<span class="PJ-pizzaIcon"></span>'}
      
              ${VARIATION == 2 ? `<div class="PJ102-2-info" style="opacity: 0; visibility: hidden;">
                <div class="PJ-top">
                  <p><span>Top Tip:</span> Tick the Papa Rewards <strong>tickbox before adding</strong> the item to the basket to ensure your points are applied.</p>
                </div>
      
                <h4><span>25 Points</span> - FREE Large Pizza</h4>
                <p>Large pizzas only. Stuffed crust included, with the usual addition of £2.50.
                <br /Also availlable on customised pizzas, Half & Half and Create your own.</p>
      
      
                <h4><span>12 Points</span> - FREE Premium Side or Desert</h4>
                <p>Most single portion meat sides and most hot deserts.</p>
      
      
                <h4><span>8 Points</span> - FREE Side or Drink</h4>
                <p>Most single portions vegeratian sides and most drinks that have a 1.5L option.</p>
      
      
              <div>` : ''}
          </div>
 
         </div>
       `);
 
 
       // Add Banner events
       const addedInput = document.querySelector('.PJ-switch input');
       addedInput ? 
         addedInput.addEventListener('click', toggleBodyClass):
       null;
 
     }
    }, 1000);
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    }
  })

  
  // Loop over PLP's and Add hidden banner to each
  let items = document.querySelectorAll('.menuItems .menuList .menuListCont');
  let itemsLen = items.length;


  const addItems = () => {
    for (let i = 0; itemsLen > i; i += 1) {
      let item = items[i];
      // console.log('item = ', item);
  
      if (type === 'pizza') {
        item.classList.add('PJ102-show');
      }
      let itemRef = items[i].querySelector('.description');
      // if (isMobile()) {
      //   itemRef = items[i].querySelector('h3.titleWithIcon');
      // }
      
      let title = item.querySelector('h3.titleWithIcon span');
      
      
      let titleText = title.textContent.trim();
  
      let sideText = `<p>FREE ${!isMobile() ? 'Classic Side (8pts) or FREE Premium Side' : ''} (12pts)</p>`;
      if (type === 'sides' && titleText) {
        
        if (titleText === 'Cauliflower Wings') {
          sideText = `<p>FREE ${!isMobile() ? 'Classic Side' : ''} (8pts)</p>`;
          item.classList.add('PJ102-show');
        } else if (titleText.match(/poppers|wings/gi) && points >= 12) {
          sideText = `<p>FREE ${!isMobile() ? 'Premium Side' : ''} (12pts)</p>`;
          item.classList.add('PJ102-show');
        } else if (!titleText.match(/dips|dip|pigs/gi)) {
          sideText = `<p>FREE ${!isMobile() ? 'Classic Side' : ''} (8pts)</p>`;
          item.classList.add('PJ102-show');
        } else {
          sideText = '';
        }
      }
  
      let hasBigBottle = false;
      if (type === 'drinks') {
        let descriptionText = itemRef.textContent.trim();
        
        // if (title && title.textContent.trim() == 'Pepsi') return;
        
        // if (isMobile()) {
        //   let options = item.querySelectorAll('.variationDropDown option');
        //   if (!options) return;
          
        //   for (let i = 0; options.length > i; i += 1) {
            
        //     if (options[i] && options[i].innerText.match(/Papa Rewards/gi)) {
        //       hasBigBottle = true;
        //       item.classList.add('PJ102-show');
        //       options[i].checked = true;
        //     }
        //   }
        // } else {
        // }
        if (descriptionText.match(/1.5/) && titleText !== 'Pepsi') {
          hasBigBottle = true;
          item.classList.add('PJ102-show');
          
        }
      }
  
  
      let runOnDesert = true;
      if (type === 'desert' && titleText) {
        if (titleText.match(/Ben\s\&\sJerry's/)) {
          runOnDesert = false;
        } else {
          item.classList.add('PJ102-show');
        }
      }
  
      let veganText = '';
      if (type === 'vegan') {
        
        if (titleText.match(/Vegan Chilli Freak|The Stinger|Jackfruit "Pepperoni"|The Vegan Works|Vegan Cheese & Tomato|Vegan Garden Party|The Alice Tai/)) {
          veganText = `<span class="PJ-pizzaIcon"></span><p>FREE ${!isMobile() ? 'Large Pizza' : ''} (25pts)</p>`;
          item.classList.add('PJ102-show');
        } else if (titleText.match(/Cauli Wings|Cauliflower Wings|Vegan Cheese Potato Tots|Vegan Cheese Potato Tots with Jalapeño|Vegan Cheese & Marmite® Scrolls/)) {
          veganText = `<p>FREE Classic Side (8pts)</p>`;
          item.classList.add('PJ102-show');
        } else if (titleText.match('Cinnamon Scrolls')) {
          veganText = `<p>FREE Hot Desert (12pts)</p>`;
          item.classList.add('PJ102-show');
        }
      }
  
      // if (!item.parentElement.querySelector('.makeItFree')) return;
      // Add Item Banner
      if (item.querySelector('.makeItFree') || isMobile()) {
        addHTML(itemRef, isMobile() ? 'afterend' : 'beforebegin', `
          <div class="PJ-itemBanner">
            ${type === 'pizza' ? `<span class="PJ-pizzaIcon"></span><p>FREE ${!isMobile() ? 'Large Pizza' : ''} (25pts)</p>` : ''}
            ${type === 'desert' && runOnDesert ? `<p>FREE ${!isMobile() ? 'Hot Desert' : ''} (12pts)</p>` : ''}
            ${type === 'sides' ? sideText : ''}
            ${type === 'drinks' && hasBigBottle ? `<p>FREE ${!isMobile() ? '1.5L Bottle' : ''} (8pts)</p>` : ''}
            ${type === 'vegan' ? veganText : ''}
          </div>
        `);
      }
   
    }
  }

  // Loop items & Determine, type and what message to show. Also add PJ102-show to any item that qualifies 
  addItems();



  const bod = document.body;
  

  function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
  }

  // if (isMobile()) {
  //   observer.connect(bod, () => {
  //     pollerLite(['.menuList .PJ102-show'], () => {
  //       const items = document.querySelectorAll('.menuList .PJ102-show');
  //       const itemsLength = items.length;
  //       console.log('change')
  //       for (let i = 0; itemsLength > i; i ++) {
  //         const item = items[i];
  //         const options = item.querySelectorAll('option');
  //         const select = item.querySelector('select.variationDropDown');
  //         let btns = item.querySelectorAll('span.centerB');
  //         // console.log(item);
  //         if (type === 'drinks' || type === 'desert') {
  //           btns = item.querySelectorAll('.greenButton .centerB');
  //         }
  
  //         if (type === 'pizza') {
  //           btns = item.querySelectorAll('.splitButtons a:last-of-type')
  //         }
          
  //         // Get 'Add' Btn
  //         let btn = null;
  //         // let ogBtnText = type === 'pizza' ? 'Add' : 'Add To Basket';
  //         // console.log('btns = ', btns);
  //         for (let b = 0; btns.length > b; b ++) {
  //           // if (isHidden(btns[b])) return;
            
  //           if (!btns[b]) return;
  
  //           let btnText = 'Add';
  
  //           // if (btns[b].textContent.match(/adding/gi)) return;
  //           // if (btns[b].textContent.match(/customise/gi)) return;
  
  //           btnText = btns[b].textContent;
  //           if (btns[b].textContent.match(/add/gi)) {
  //             // btnText = btns[b].textContent;
  //             // console.log({btnText});
              
  //             if (bod.classList.contains('PJ102-active')) {
  //               btns[b].textContent = "Claim";
  //             } else {
              
  //               btns[b].textContent = type === 'pizza' ? 'Add' : 'Add To Basket';
  //             }
  //           } else {
              
  //             btns[b].textContent = type === 'pizza' ? 'Add' : 'Add To Basket';
  //           }
  //           // if (btns[b].textContent === 'ADD TO BASKET') {
  //           //   btn = btns[b];
  //           // }
  //         }
  
  //         // Check for PR option
  //         let op = null;
  //         let ogOp = null;
  //         for (let o = 0; options.length > o; o ++) {
  //           if (options[o].getAttribute('selected') === 'selected') {
  //             // console.log('og op = ', options[o]);
  //             ogOp = options[o];
  //           }
  //           if (options[o] && options[o].innerText.match(/Papa Rewards/gi)) {
  //             op = options[o];
              
  //           }
  //         }
  
  //         // console.log('PROD obj =' , {
  //         //   // btn,
  //         //   op
  //         // });
  
  //         if (bod.classList.contains('PJ102-active')) {
            
  //           if (op) {
  //             select.selectedIndex = op;
  //             op.setAttribute('selected', 'selected');
  //           }
  //         } else {
  //           if (options[select.selectedIndex].innerText.match(/Papa Rewards/gi)) {
  //             select.selectedIndex = ogOp;
  //           }
  //         }
  //       }
        
  //     })
  //     setTimeout(() => {
  //       const basketNotif = document.querySelector('.basketNotification = document.querySelector('.basketNotification');
  // if (basketNotification) {
  //   observer.connect(basketNotification, () => {
  //     console.log('change');
  //   }, {
  //     config: {
  //       attributes: true,
  //       childList: true,
  //       subtree: false
  //     }
  //   })
  // }');
  //       if (basketNotif && basketNotif.style.display === 'block') {
          
  //         // addedInput.click();
  //         setTimeout(() => {
  //           basketNotif.style.display = 'none';
  //           window.location.reload();
  //         }, 2500);
  //       }
  //     }, 500);
  //     // On body class toggle
  //   }, {
  //     config: {
  //       attributes: true,
  //       childList: false,
  //       subtree: false,
  //     }
  //   });
  // };
  
  // if (!isMobile()) {
    
  // }
  const itemWrap = document.querySelector('.main');
  itemWrap.addEventListener('click', (e) => {
    const itm = e.target.closest('.menuList');
    let checkedInput;
    
    if (!document.body.classList.contains('PJ102-active')) {
      // const checkedLabel = document.querySelector('.makeItFree label.checkedBackground');
      // if (!checkedLabel) return;

      // checkedInput = itm.querySelector('input[type="checkbox"]');
      
      // checkedInput.click();
      
      return 
    }
    
    const activeItem = document.querySelector('.menuList .menuListContH');
    if (!activeItem) return;
    
    const prBox = activeItem.querySelector('.makeItFree');
    if (activeItem.contains(e.target) && !e.target.classList.contains('greenButton') && !e.target.classList.contains('centerB')) {
      return;
    }

    if (!prBox) return;

    // if (activeItem.contains(e.target)) {
    //   return;
    // }

    const atbCta = activeItem.querySelector('.buttons a:last-of-type span.centerB');
    

    if (!activeItem.querySelector('.PJ-bigIcon')) {
      prBox.insertAdjacentHTML('beforebegin', `
        <div class="PJ-pizzaIcon PJ-bigIcon"></div>
      `);
    }
    
    if (!document.body.classList.contains('PJ102-active')) {
      atbCta ? atbCta.textContent = 'Add' : null;
    } else {
      atbCta ? atbCta.textContent = 'Claim' : null;
    }
    
    const prBoxCheck = activeItem.querySelector('.makeItFree .makeItPRcheckbox label.checkBoxContLabel');
    if (!prBoxCheck.classList.contains('checkedBackground')) {
      prBoxCheck ? prBoxCheck.click() : null; // Check 
    }
    

    prBoxCheck.addEventListener('click', () => {
      if (prBoxCheck.classList.contains('checkedBackground')) {
        atbCta ? atbCta.textContent = 'Add' : null;
        // addedInput.click();
      } else {
        atbCta ? atbCta.textContent = 'Claim' : null;
      }
    });


    atbCta.addEventListener('click', () => {
      if (atbCta.textContent == 'Add') {
        document.body.classList.remove('PJ102-active')
      }
    });

    return;

  });

  observer.connect(bod, () => {
    
    items = document.querySelectorAll('.menuItems .menuList .menuListCont');
    itemsLen = items.length;
    if (!document.querySelector('.PJ-itemBanner') && points > 0) {
      addItems()
    }

    pollerLite(['.PJ-switch'], () => {
      if (bod.classList.contains('PJ102-active')) {
        const inp = document.querySelector('.PJ-switch input[type="checkbox"]');
        if (inp && !inp.checked) {
          // console.log('here')
          addedInput.click();
        }
      }

      if (!points || points == 0 || points < 8) {
        document.body.classList.add('PJ-noPoints');
        // document.body.classList.remove(ID);
        return false;
      }
    });

    

  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false
    }
  });


  // Basket Observer
  const basketNotification = document.querySelector('.header');
  
  if (basketNotification) {
    observer.connect(basketNotification, () => {
  
      const notifText = document.querySelector('.notification span');
      if (notifText && notifText.textContent) {
        document.body.classList.remove('PJ102-active');
      }
    }, {
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      }
    })
  }


  if (VARIATION == 2) {
    const newToggle = document.querySelector('.PJ102-2-toggle');
    if (!newToggle) return;

    const info = document.querySelector('.PJ102-2-info');

    newToggle.addEventListener('click', () => {
      info.classList.toggle('show')
      newToggle.classList.toggle('flip');
    })

    mainEl.addEventListener('click', (e) => {
      if (!info.contains(e.target) && !e.target.classList.contains('PJ-tog')) {
        info.classList.remove('show');
        newToggle.classList.remove('flip');
      }
      return;
    });

  }

};
