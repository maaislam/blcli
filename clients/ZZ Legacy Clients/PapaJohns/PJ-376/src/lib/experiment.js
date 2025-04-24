/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkIntersection } from '../../../../../lib/scrolling';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  const STORAGE_KEY = 'bl_saw_papadias';

  const u = location.href;

  if(u.match(/dealbuilder.aspx/i)) {
    [].forEach.call(document.querySelectorAll('.choosePizza'), p => {
      if(p.innerText.match(/papadias/i)) {
        localStorage.setItem(STORAGE_KEY, 1);
      }
    });
  }

  if(u.match(/papadias.aspx/i)) {
    localStorage.setItem(STORAGE_KEY, 1);
  }

  if(u.match(/sides.aspx/i)) {
    const img = document.querySelector('h2 img[alt=Papadias]');
    if(img) {
      const container = img.closest('.menuItems');
      if(container) {
        checkIntersection(container).then(() => {
          localStorage.setItem(STORAGE_KEY, 1);
        });
      }
    }
  }
  
  // Trigger Polls on confirmation page
  if(u.match(/order-confirmation.aspx/i)) {
    window.dataLayer.forEach(p => {
      if(p['transactionProducts']) {
        const o = p['transactionProducts'].filter(d => d.category.match(/papadias/i) || d.ProductName.match(/papadias/i));

        const didSeePapadias = !!localStorage.getItem(STORAGE_KEY);

        if(o.length > 0) {
          hj('event', 'papadias_view_purchase');
        } else {
          if(didSeePapadias) {
            hj('event', 'papadias_view_notpurchased');
          } else {
            hj('event', 'papadias_notviewed');
          }
        }
      }
    });
  }
};
