import { rightArrow } from '../assets/icons';
export const link = (id, { title, url }) => {
  const html = `
        <a href="${url}" class="${id}__item">
            <span class="${id}__item-text">${title}</span>
            <span class="${id}__item-icon">${rightArrow}</span>    
        </a>
  `;
  return html;
};
