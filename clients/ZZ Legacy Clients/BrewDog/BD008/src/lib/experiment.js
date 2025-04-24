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

  

  
  // If remainCount > 24 == Free delivery
  const box = document.querySelector('.box-basket');
  
  
  
  const boxChanges = () => {
    const popupTrigger = box.querySelector('div[data-trigger="box-modal-trigger"]');
    const boxContainer = document.querySelector('.box-basket .box-meta-container .box-container');
    const countContainer = document.querySelector('.box-basket .box-filled-data');
    const boxTitle = document.querySelector('.box-basket .text-left');


    const emptyBox = document.querySelector(`div[data-bind="if: getFilledBoxes('paid') > 0"] .box-item`);
    const completeBox = document.querySelector(`div[data-bind="if: getFilledBoxes('free') > 0"] .box-item`);
    const filledCount = document.querySelector('.box-filled-info > .box-filled-data span[data-bind="text: filledSlots"]').textContent;
    const remainCount = document.querySelector('.box-filled-info > .box-filled-data span[data-bind="text: totalSlots"]').textContent;
    const filledSlots = parseInt(filledCount, 10);
    const totalSlots = parseInt(remainCount, 10);
    
    
    
    if (totalSlots === 24 && filledSlots < 23) {
      if (!document.querySelector('.BD-changed')) {
        box.classList.add('BD-fill');
        box.classList.remove('BD-full');
        boxTitle ? boxTitle.textContent = '' : null;
        boxTitle ? boxTitle.insertAdjacentHTML('beforeend', `
          <p class="BD-changed"><strong>FREE DELIVERY</strong><br />when you fill a box</p>
          <p class="BD-small">Delivery usually <strong>£6.95</strong></p>
        `) : null;

        // Add empty image
        if (!document.querySelector('.BD-img')) {
          emptyBox.insertAdjacentHTML('beforeend', `
            <span class="BD-img">
              <img src="data:image/png;base64,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" alt="fill the box" />
            </span>
          `);
        }
      }
    } else {
      if (!document.querySelector('.BD-changed')) {
        box.classList.add('BD-full');
        box.classList.remove('BD-fill');
        boxTitle ? boxTitle.textContent = '' : null;
        boxTitle ? boxTitle.insertAdjacentHTML('beforeend', `
          <p class="BD-changed"><strong>You’ve earned Free Delivery on your entire order!</strong></p>
        `) : null;
        
        // Add full image
        if (!document.querySelector('.BD-img') && completeBox) {
          completeBox.insertAdjacentHTML('beforeend', `
            <span class="BD-img">
              <img src="data:image/png;base64,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" alt="full box" />
            </span>
          `);
        }
      }

    }
  
  
    // Slots Filled
    if (document.querySelector('.BD-info')) {
      const el = document.querySelector('.BD-info');
      el.parentNode ? el.parentNode.removeChild(el) : null;
    }
    if (!document.querySelector('.BD-info')) {
      boxContainer.insertAdjacentHTML('afterbegin', `
        <div class="BD-info">
          <p>${filledCount} / ${remainCount}</p>
        </div>
      `);
    }
  
  
    // More info
    if (!document.querySelector('.BD-moreInfo')) {
      let pos = 'afterend';
      if (window.innerWidth < 749) {
        pos = 'beforeend';
      }
      boxContainer.insertAdjacentHTML(pos, `
        <p class="BD-moreInfo">More info</p>
      `);
    }


    const moreInfo = document.querySelector('.BD-moreInfo');
    moreInfo ? moreInfo.addEventListener('click', () => {
      boxTitle.click();
    }) : null;
  }

  boxChanges();

  observer.connect(box, () => {
    
    setTimeout(() => {
      boxChanges();
    }, 500);
  }, {
    config: {
      attributes: false,
      childList: true,
      subtree: true,
    },
  });


};
