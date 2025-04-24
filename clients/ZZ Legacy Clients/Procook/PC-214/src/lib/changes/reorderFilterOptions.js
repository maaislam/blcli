import shared from '../../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

export default (url, allFilters) => {
  // --- Hob Type
  if (window.location.pathname.indexOf(`cookware`) > -1) {
    const hobPriority = ['induction hob safe', 'ceramic hob safe', 'gas hob safe', 'electric hob safe', 'oven safe'];
    pollerLite([`#${ID}-usage`], () => {
      let allTypes = document.querySelectorAll(`.filter#usage .filterBoxDropDown ul li`);
      [].forEach.call(allTypes, (type) => {
        const typeText = type.querySelector('.filterText').innerText.trim().toLowerCase();

        if (hobPriority.indexOf(typeText) > -1) {
          type.setAttribute('id', `${ID}-${typeText.replace(' ', '-').replace(' ', '-')}`);
        }
      });

      for (let i = 0; i < hobPriority.length; i += 1) {
        let hobP = hobPriority[i];
        let filterOpt = document.querySelector(`#${ID}-${hobP.replace(' ', '-').replace(' ', '-')}`);
        if (filterOpt) {
          document.querySelector(`.filter#usage .filterBoxDropDown ul`).insertAdjacentElement('beforeend', filterOpt);
        }
        
      }
    });
  }
  
  // --- Knives - Range (hardness rating)
  if (window.location.pathname.indexOf(`knives`) > -1) {
    const knivesPriority = ['designpro', 'gourmet x30', 'nihon x50', 'professional x50', 'elite ice x50', 'elite aus8', 'damascus 67'];

    pollerLite([`.filter#range`], () => {
      let allRanges = document.querySelectorAll(`.filter#range .filterBoxDropDown ul li`);
      [].forEach.call(allRanges, (range) => {
        const rangeText = range.querySelector('.filterText').innerText.trim().toLowerCase();

        if (knivesPriority.indexOf(rangeText) > -1) {
          range.setAttribute('id', `${ID}-${rangeText.replace(' ', '-').replace(' ', '-')}`);
        }

        for (let i = 0; i < knivesPriority.length; i += 1) {
          let rangeP = knivesPriority[i];
          let filterOpt = document.querySelector(`#${ID}-${rangeP.replace(' ', '-').replace(' ', '-')}`);
          if (filterOpt) {
            document.querySelector(`.filter#range .filterBoxDropDown ul`).insertAdjacentElement('beforeend', filterOpt);
          }
          
        }
      });
    });
  }
  

};