import { toolTipText } from './toolTipText';
import { toolTipMessage } from './toolTipMessage';

export const toolTipWrapper = (id, className = 'desktop') => {
  const html = `
        <div class="${id}__tooltipWrapper ${id}__${className}">
            ${toolTipText(id)}
            ${toolTipMessage(id)}
        </div>
    `;
  return html;
};
