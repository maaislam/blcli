/**
 * NE-327 - Imagery: Product tags v1.0 UK
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from '../../../../../lib/utils';
import tagsData from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Get products
 */
const getProducts = () => {
  const prodElms = document.querySelectorAll('.product-list-item');

  const prods = {};

  [].forEach.call(prodElms, p => {
    const titleElm = p.querySelector('.product-list-item__title');
    const linkElm = p.querySelector('a');

    if(titleElm && linkElm) {
      const title = titleElm.innerText.trim();
      const href = linkElm.pathname;

      prods[title] = {
        title: title,
        link: href,
        element: p
      };
    }
  });

  return prods;
};


// const getData = () => {
//   return new Promise((res, rej) => {
//     const keyName = `${shared.ID}-data-v2`; // Rename the key if data changes to force clear caches

//     const localData = localStorage.getItem(keyName);
//     if(localData) {
//       res(localData);
//     } else {
//       fetch(tagsData)
//       .then(response => response.json())
//       .then(data => {
//         const d = JSON.stringify(data);
//         localStorage.setItem(keyName, d);

//         res(d);
//       });
//     }
//   });
// };

/**
 * Entry point
 */
export default () => {
  // getData().then(stringData => {
    const data = tagsData;

		setup();

		fireEvent('Conditions Met');

		if(VARIATION == 'control') {
			return;
		}

		const prods = getProducts();
		for(let p in prods) {
			if(data[prods[p].link]) {
        let tags = data[prods[p].link];
        tags = tags.split(',');
        let tagsList = '';
        for(let i = 0; i < tags.length; i += 1) {
          tagsList += `<div class="${ID}-tag">${tags[i]}</div>`;
        }
        prods[p].element.querySelector('.product-list-item-image').insertAdjacentHTML('afterend', `<div class="${ID}-tags__wrapper">${tagsList}</div>`);
        prods[p].element.classList.add(`${ID}-has-tags`);
      }
		}

	// });
  
};
