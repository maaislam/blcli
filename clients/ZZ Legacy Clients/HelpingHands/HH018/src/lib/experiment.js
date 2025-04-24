import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * {{HH018}} - {{Navigation Swap}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const navParent = docVar.getElementById('menu-main-nav');
      const liveinCare = bodyVar.querySelector('#menu-main-nav > li:nth-child(2)');
      const homeCareServices = bodyVar.querySelector('#menu-main-nav > li:first-child');

      return {
        docVar,
        bodyVar,
        navParent,
        liveinCare,
        homeCareServices,
      };
    })(),
    init: () => {
      setup();
      // Insert live in care link as first child of nav parent
      Exp.cache.navParent.insertAdjacentElement('afterbegin', Exp.cache.liveinCare);
      // Add tracking
      Exp.cache.liveinCare.addEventListener('click', () => {
        events.send(`${settings.ID}`, 'Clicked', 'Live in care', { sendOnce: true });
      });
      Exp.cache.homeCareServices.addEventListener('click', () => {
        events.send(`${settings.ID}`, 'Clicked', 'Home care services', { sendOnce: true });
      });
    },
  };

  Exp.init();
};

export default Run;
