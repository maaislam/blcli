import { tickIcon } from '../assets/icons';

export const listItem = (id, title) => {
  const html = `
        <li class="${id}__item">
            <span>${tickIcon}</span>
            <span class="${id}__title">${title}</span>
        </li>
    `;
  return html;
};
