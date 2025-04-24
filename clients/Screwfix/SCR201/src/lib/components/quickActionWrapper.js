import { quickActionOption } from './quickActionOption';

export const quickActionWrapper = (id, data) => {
  const html = `
        <div class="${id}__quickActionWrapper">
            <h2 class="${id}__title">Your quick actions</h2>
            <div class="${id}__quickWrapperContainer">
                ${data.map((item) => quickActionOption(id, item)).join('\n')}
            </div>
        </div>
    `;
  return html.trim();
};
