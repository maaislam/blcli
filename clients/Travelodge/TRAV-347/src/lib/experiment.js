/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import variationCode from '../TRAV-347-v1';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  const eventsTrigger = (eventName) => {
    window.DY.API('event', {
      name: eventName,
    });
  };

  const eventLogic = () => {
    document.body.addEventListener('click', ({ target }) => {
      if (['addExtraSubmit', 'addCheckoutExtraSubmit'].includes(target.id)) {
        eventsTrigger('extras_viewed');
      } else if (target.id === 'extras-choice-skip') {
        eventsTrigger('extras_skipped');
      } else if (target.id === 'extras-choice-submit') {
        eventsTrigger('proceed_to_summary');
      }
    });

    if (window.location.pathname.includes('/checkout')) {
      pollerLite(['.extras-details'], () => {
        const allExtras = [...document.querySelectorAll('.extras-details')];
        allExtras.forEach((extra) => {
          const extraName = extra.getAttribute('data-extraname');
          if (['earlyIn', 'breakfast'].includes(extraName)) {
            window.DY.API('event', {
              name: 'extra_added',
              properties: {
                extraName,
              },
            });
          }
        });
      });
    }
  };

  eventLogic();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  variationCode(pollerLite);
};
