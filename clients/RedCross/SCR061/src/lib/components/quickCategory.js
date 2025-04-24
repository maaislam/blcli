import { link } from './link';

export const quickCategory = (id, data) => {
  const html = `
        <div class="${id}__quickCategoryLinks">
            <p class="${id}__title">top <br/>categories<span class="${id}__character">:</span></p>
            <ul class="${id}__linkLists">
                ${data.map((item) => link(id, item)).join('\n')}
            </ul>
        </div>
    `;
  return html;
};
