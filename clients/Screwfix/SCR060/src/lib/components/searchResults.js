import { searchResultItem } from './searchResultItem';

export const searchResults = (id, data, searchTerm) => {
  const html = `
    <ul class="${id}__searchResults">
        ${data.map((item) => searchResultItem(id, item, searchTerm)).join('\n')}
    </ul>

  `;
  return html;
};
