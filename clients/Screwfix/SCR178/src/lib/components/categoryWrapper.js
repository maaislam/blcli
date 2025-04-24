import { categoryOption } from './categoryOption';

export const categoryWrapper = (id, data) => {
  const html = `
        <div class="${id}__categoryWrapper">
            <div class="${id}__categoryContainer">
                ${data.map((item) => categoryOption(id, item)).join('\n')}
            </div>
        </div>
    `;
  return html.trim();
};
