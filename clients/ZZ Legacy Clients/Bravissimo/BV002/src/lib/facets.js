import settings from './settings';
import { mapDualSizes } from './data';
import { events } from '../../../../../lib/utils';

/**
 * Handle facet tokens being clicked
 */
export const onFacetTokenClick = () => {
  const curvyRef = ['curvy', 'reallycurvy', 'supercurvy'];

  const tokens = document.querySelectorAll(`.${settings.ID}_trigger`);

  [].forEach.call(tokens, (token) => {
    if(token.classList.contains(`${settings.ID}-listeneradded`)) {
      return;
    }

    token.classList.add(`${settings.ID}-listeneradded`);

    token.addEventListener('click', (e) => {
      const parentEl = e.target.closest('.c-facet-token');
      const facetLabel = parentEl.querySelector('.c-facet-token__label');
      if(!facetLabel) {
        return;
      }

      const elRef = facetLabel.textContent.trim().replace(/\s/g, '').toLowerCase();

      const match = /(\d+)(.+)/.exec(elRef);
      const number = (match || [])[1];
      const letter = (match || [])[2];

      curvyRef.forEach(function (el) {
        if (letter === el) {
          const corresponding = document.querySelector(`[data-value="${letter}"]`);
          if(corresponding) {
            corresponding.click();
          }
        } else if (match) {
          const correspondingNumber = document.querySelector(`[data-value="${number}"]`);
          if(correspondingNumber) {
            correspondingNumber.click();
          }
          const correspondingLetter = document.querySelector(`[data-value="${letter}"]`);
          if(correspondingLetter) {
            correspondingLetter.click();
          }
        }
      });

      let newUrl = window.location.href;

      if(newUrl.match(/f_(backsize|cupsize)/)) {
        const facets = document.querySelectorAll(`.c-results-facets .c-facet-token__label`); 

        let newSizes = [];
        [].forEach.call(facets, (facet) => {
          const single = facet.innerText.trim().toLowerCase();

          newSizes.push(single);

          const match = /(\d+)(.+)/.exec(single);
          const number = (match || [])[1];
          const letter = (match || [])[2];

          if(number && letter && mapDualSizes[letter]) {
            const singleDual = number + mapDualSizes[letter];

            newSizes.indexOf(singleDual) > -1 || newSizes.push(singleDual); 
          }
        });

        newUrl = newUrl.replace(
          /&f_(backsize|cupsize)\[\]=[^&]+/ig, 
          '&f_size[]=' + newSizes.join('&f_size[]=')
        );
      }

      const queriesArray = [
        '&f_size\\[\\]=', 
        '&f_cupsize\\[\\]=', 
        '&f_colour\\[\\]=', 
        '&f_backsize\\[\\]=', 
        '&f_curvysize\\[\\]=', 
        '&f_type\\[\\]=', 
        '&f_brand\\[\\]=', 
        '&f_brieftype\\[\\]=', 
        '&f_category\\[\\]='
      ];

      queriesArray.forEach((queryParameter) => {
        newUrl = newUrl.replace(new RegExp(queryParameter + elRef + '(?=(&|$))', 'g'), '');
      });

      if(number && letter && mapDualSizes[letter]) {
        queriesArray.forEach((queryParameter) => {
          newUrl = newUrl.replace(new RegExp(queryParameter + (number + mapDualSizes[letter]) + '(?=(&|$))', 'g'), '');
        });
      }

      e.target.parentElement.remove();

      if(newUrl) {
        events.send(settings.ID, 'User clicked', 'facet-token');
        window.location = newUrl;
      }
    });
  });
};

/**
 * Inject a fake X on top of the one created by react
 * when you tap it, it removes the right filter created by the test
 * and updates the page
 */
export const styleFacetTokens = () => {
  const tokens = document.querySelectorAll('.c-results__main .c-results-facets .c-facet-token');
  
  if (tokens) {
    tokens.forEach((token) => {
      if (!token.querySelector(`.${settings.ID}_trigger`)) {
        const element = document.createElement('div');
        element.classList.add('c-facet-token__action');
        element.classList.add(`${settings.ID}_trigger`);
        element.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 200 200" role="img" data-reactid="954"><path d="M182 42c8-8 8-20 2-26s-18-6-26 2l-58 58-58-58c-8-8-20-8-26-2s-6 18 2 26l58 58-58 58c-8 8-8 20-2 26s18 6 26-2l58-58 58 58c8 8 20 8 26 2s6-18-2-26l-58-58 58-58z" data-reactid="955"></path></svg>
        `;
        token.querySelector('.c-facet-token__label').insertAdjacentElement('afterend', element);
      }
    });
  }
};
