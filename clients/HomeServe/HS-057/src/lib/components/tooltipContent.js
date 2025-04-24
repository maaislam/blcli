import { crossIcon } from '../assets/icons';

const tooltipContent = (id) => {
  const html = `
        <div class="tooltiptext tooltip-top">
            <span class="${id}__text">Average cost to fix according to BCIS© Research</span>
            <span class="${id}__icon" tabindex="0">${crossIcon}</span>
        </div>
    `;
  return html.trim();
};

export default tooltipContent;
