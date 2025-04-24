import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}
function removeFilter(){
  const tokens = document.querySelectorAll('.c-results-facets .c-facet-token');
  if(tokens){
    Array.from(tokens).forEach((token) => {
      const element = document.createElement('div');
      element.classList.add('c-facet-token__action', `${ID}_trigger`);
      element.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 200 200" role="img" data-reactid="954"><path d="M182 42c8-8 8-20 2-26s-18-6-26 2l-58 58-58-58c-8-8-20-8-26-2s-6 18 2 26l58 58-58 58c-8 8-8 20-2 26s18 6 26-2l58-58 58 58c8 8 20 8 26 2s6-18-2-26l-58-58 58-58z" data-reactid="955"></path></svg>
      `;
      if(!token.querySelector(`.${ID}_trigger`)){
        token.querySelector('.c-facet-token__label').insertAdjacentElement('afterend', element);
      }
      /**
       * Clean all the filters removing the ones added by react
       */
      const content = token.querySelector('.c-facet-token__label').textContent.trim();
      const newContent = content.replace(/\//g, '').replace(' ', '').toLowerCase();
      const reg = /(\d+)(\D+)/g;
      const match = reg.exec(content);
      let backNum;
      let cupSize;
      let loc = window.location.href;
      token.querySelector(`.${ID}_trigger`).addEventListener('click', (e) => {
        e.target.parentNode.remove();
        const coloursArray = [
          'acqua',
          'black',
          'blue',
          'bronze',
          'brown',
          'cream',
          'gold',
          'green',
          'grey',
          'ivory',
          'multi',
          'nude',
          'orange',
          'pink',
          'print',
          'pourple',
          'red',
          'silver',
          'turquoise',
          'white',
          'yellow'
        ];
        let queryString;
        let fSize;
        let baseUrl;
        baseUrl = loc.split('?')[0];
        baseUrl += '?limit=48&page=1&sortBy=default';
        const tokens = document.querySelectorAll('.c-results-facets .c-facet-token');
        Array.from(tokens).forEach(function(token){
          fSize = token.querySelector('.c-facet-token__label').textContent.toLowerCase().trim().replace(/\//g, '').replace(' ', '');
          if(coloursArray.indexOf(fSize) > -1){
            queryString = `&f_colour[]=${fSize}`;
          } else {
            queryString = `&f_size[]=${fSize}`;
          }
          baseUrl += queryString;
        });
        window.location = baseUrl;
      });
    });
  }
}

export { setup, removeFilter }; // eslint-disable-line
// Querystring after experiment filter gets clicked
// https://www.bravissimo.com/collections/new-in-lingerie/?limit=48&page=1&sortBy=default&f_backsize[]=34&f_cupsize[]=f
// Querystring after remove filter gets clicked  see contente in here --> --{...}--
// https://www.bravissimo.com/collections/new-in-lingerie/?limit=48&page=1&sortBy=default--{&f_size[]=34f}--&f_backsize[]=34&f_cupsize[]=f