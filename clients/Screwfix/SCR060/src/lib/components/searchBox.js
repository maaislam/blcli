import { inputBox } from './inputBox';
import { popularSearches } from './popularSearches';

export const searchBox = (id) => {
  const html = `
        <div class="${id}__searchBox">
            <div class="${id}__searchBox-wrapper">
                <p class="${id}__title">Know what you want? Search now</p>
                ${inputBox(id)}
                ${popularSearches(id)}
            </div>
        </div>
    `;
  return html;
};
