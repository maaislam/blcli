import { staticSearchItems } from '../data/data';
import { item } from './item';

export const popularSearches = (id) => {
  const html = `
        <div class="${id}__popularSearches">
            <div class="${id}__popularSearches-wrapper">
                <p><span>Popular</span> Searches:</p>
                <div class="${id}__items">
                    ${staticSearchItems.map((data) => item(id, data)).join('\n')}
                </div>
            </div>
        </div>
    `;
  return html;
};
