import { downArrow } from '../assets/icons';

export const viewContent = (id) => {
  const html = `
        <span class="${id}__viewContent">
            <span class="${id}__text">View more</span>
            <span class="${id}__icon">
                ${downArrow}
            </span>
        </span>
    `;
  return html.trim();
};
