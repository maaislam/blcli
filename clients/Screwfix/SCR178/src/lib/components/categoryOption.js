import { categoryList } from '../data/data';

export const categoryOption = (id, data) => {
  const { element, categoryName } = data;
  const isAvailableItem = categoryList.find((item) => item.categoryName.toLowerCase() === categoryName.toLowerCase());
  const html = `
        <button class="${id}__categoryOption" data-name="${categoryName}" type="button">
            <span class="${id}__imageWrapper">
                <img src="${isAvailableItem ? isAvailableItem.imgSrc : ''}"/>
            </span>
            <div class="${id}__textWrapper">
                ${element.outerHTML}
            </div>
        </button>
    `;
  return html.trim();
};
