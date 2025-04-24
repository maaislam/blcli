import { item } from './item';

export const listStr = (id, data) => {
  const html = `
        <div class="list ${id}__list">
            <div class="${id}__list-title">Includes:</div>
            <ul>
                ${data.map((list) => item(id, list)).join('\n')}
            </ul>
        </div>
    `;
  return html;
};
