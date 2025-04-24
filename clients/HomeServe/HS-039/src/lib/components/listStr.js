import { item } from './item';

export const listStr = (id, data, parentElem) => {
  const isGrayBox = parentElem.classList.contains('promo-box--grey');
  const listTitle = isGrayBox ? "With this plan, you'll get:" : 'This policy covers:';

  const html = `
        <div class="list ${id}__list">
            <div class="${id}__list-title">${listTitle}</div>
            <ul>
                ${data.map((list) => item(id, list)).join('\n')}
            </ul>
        </div>
    `;
  return html;
};
