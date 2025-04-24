/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { observer } from '../../../../../lib/utils';

export default () => {
  setup();

  // Write experiment code here
  const runFunc = () => {
    const stringEl = document.querySelectorAll('#amasty-shopby-product-list li.productTile__packaging');


    const slotCalc = (string) => {
      if (!string) return;

      if (string.match(/\sx\s/g)) {
        var match = string.match(/\sx\s/g);
        if (match && match.length > 1) {
          return;
        }
      }

      let num = 0;

      const itemName = string.match(/Can|Bottle/i) ? string.match(/Can|Bottle/i)[0] : null;
      const itemNum = string.match(/^\d+/) ? string.match(/^\d+/)[0] : null;
      let itemAmt = string.match(/(\d+)\w+\)/) ? string.match(/(\d+)\w+\)/)[1] : null;

      if (!itemAmt) { // Some don't have brackets
        itemAmt = string.match(/\d+\w+$/) ? string.match(/\d+\w+$/)[0] : null
      }

      if (!itemName || !itemAmt) return;
      
      // console.log('item = ', {
      //   itemName,
      //   itemAmt,
      //   itemNum
      // })
      

      if (!itemNum) {
        
        num = 1;

        if (itemName === 'Can') {
          num = .5;
        }
        return num;
      };

      if (itemName === 'Can') { // Usually .5 slots

        if (itemAmt === '330') { // = .5 Slots x 1
          num = itemNum / 2;
        }

        if (itemAmt === '440') {
          num = itemNum / 2;
        }

        if (itemAmt === '402') { // 1 slot
          num = itemNum / 2;
        }

      } else if (itemName === 'Bottle') { // = 1 Slots x 1

        num = itemNum;

      } else {
        return;
      }

      return num;
    }


    Array.from(stringEl).forEach((el) => {
      let ref = el;

      let slotNum = slotCalc(el.textContent);

      if (!slotNum || !ref) return;

      if (ref.parentElement && !ref.parentElement.querySelector('.BD007-badge')) {
        ref.insertAdjacentHTML('afterend', 
          `<li class="BD007-badge">
            <span class="BD007-icon"></span>

            <p>Fills ${slotNum} box slots</p>
          </li>`
        );
      }
    });
  }

  runFunc();

  const listWrap = document.querySelector('#maincontent');

  observer.connect(listWrap, () => {
    
    runFunc()
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    }
  });
  
};
