import { tickIcon, dashIcon } from '../assets/icons';

export const item = (id, { title, isInclude }) => {
  const isActive = isInclude ? `${id}__active` : `${id}__active--no`;
  const attachIcon = isInclude ? tickIcon : dashIcon;
  const html = `<li class="${id}__item ${isActive}">
                    <span class="${id}__icon">${attachIcon}</span>
                    <span class="${id}__text">${title}</span>
                </li>`;
  return html;
};
