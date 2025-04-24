import { events } from '../../../../../../lib/utils';
import settings from '../settings';

export const stickyAtb = (ref, pos, data) => {
  if (!ref) return;
  // if (!data || !data.name || !data.img || !data.cta) return;
  if (document.querySelector('.DO001-stickyAtb')) return;
  // We need...
  /**
   * Product Data
   * QTY Copy > Feed back to OG
   * ATB > Feed back to OG
   * Gift option > Feed back to OG
   */
  let html = `
    <section class="DO001-stickyAtb">
      <div class="DO001-stickyAtb--wrap">
        <h4>${data.name} <span>£${data.price}</span></h4>
      
        <div class="DO001-stickyAtb--gift">
          ${data.gift ? data.gift.outerHTML : '<div class="gift-options-checkbox-wrapper full-width"&nbsp;></div>'}
        </div>

        <div class="DO001-stickyAtb--img">
          ${data.img.outerHTML}
        </div>

        <div class="DO001-stickyAtb--ctas">
          ${data.cta.outerHTML}
        </div>
      </div>
    </section>
  `;
  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    ${html}
  `);

  // Check if element has been added and attach events
  if (document.querySelector('.DO001-stickyAtb')) {

    // Newly added elements
    const newGift = document.querySelector('.DO001-stickyAtb .DO001-stickyAtb--gift input');
    const newInput = document.querySelector('.DO001-stickyAtb .DO001-stickyAtb--ctas #sQuantity');
    const newBtn = document.querySelector('.DO001-stickyAtb .DO001-stickyAtb--ctas button');

    // Existing elements
    const oldGift = data.gift ? data.gift.querySelector('input') : null;
    const oldInput = data.cta.querySelector('select#sQuantity');
    const oldBtn = data.cta.querySelector('button');

    // console.log(`
    //   new: {
    //     ${newGift}
    //     ${newInput}
    //     ${newBtn}
    //   },
    //   old: {
    //     ${oldInput}
    //     ${oldBtn}
    //     ${oldGift}
    //   }
    // `);

    /**
     * Add the events!
     */

    // The gift option
    if (newGift) {
      newGift.addEventListener('click', (e) => {
        events.send(settings.ID, 'DO001 Click', 'User clicked gift option in sticky bag.');
        if (e.target.checked === true) {
          oldGift.checked = true;
        } else {
          oldGift.checked = false;
        }
      });
    }

    // Qty selctor
    newInput.addEventListener('change', (e) => {
      events.send(settings.ID, 'DO001 Click', 'User changed qty in sticky bag.');
      const val = e.target.value;
      oldInput.value = val;
    });

    // Add to Bag CTA
    newBtn.addEventListener('click', () => {
      events.send(settings.ID, 'DO001 Click', 'User clicked add to bag, in sticky <bag className=""></bag>');
      oldBtn.click();
    });
  }
};