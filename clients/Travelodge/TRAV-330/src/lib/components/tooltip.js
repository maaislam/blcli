import { toolTipIcon } from '../assets/icons';

const toolTip = (id) => {
  const html = `
    <div class="${id}__expressIcon">
        ${toolTipIcon}
    </div>
  `;
  return html;
};

export default toolTip;
