import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const generateToolTip = (choice) => {
    return `
    <span class="${ID}-tooltip-container">
        <span class="${ID}-tooltip ${ID}-tooltip-container__tooltip">
            <span class="${ID}-tooltip-container__tooltip-title">
                ${choice.toolTipTitle}
            </span>
            ${choice.toolTipText}
        </span>
    </span>
    `;
};

export default generateToolTip;