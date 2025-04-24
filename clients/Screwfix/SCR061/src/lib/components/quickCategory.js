import { link } from './link';

export const quickCategory = (id, data) => {
  const html = `
        <div class="${id}__quickCategoryLinks zQLGEj">
            <div class="${id}__quickCategoryLinks-wrapper IB6kBx">
              <p class="${id}__title"><span>top categories</span><span class="${id}__character">:</span></p>
              <ul class="${id}__linkLists">
                  ${data.map((item) => link(id, item)).join('\n')}
              </ul>
            </div>
        </div>
    `;
  return html;
};
