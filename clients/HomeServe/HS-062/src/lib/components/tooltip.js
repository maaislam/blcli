import { polygon, tooltipCrossIcon, tooltipOpenner } from "../assets/icons";

const tooltip = (id) => {
    const htmlStr = `
        <div class="${id}__tooltipBtn">${tooltipOpenner}
            <div class="${id}__tooltip ${id}__hide">
                <div class="tooltip-box">
                    <span class='${id}__tooltipCrossIcon'>${tooltipCrossIcon}</span>
                    <span class='${id}__tooltipArrow'>${polygon}</span>
                    <span class='tooltip-text'>Tap to compare different levels of&nbsp;cover</span>
                </div>
            </div>
        </div>
        `;

  return htmlStr;
};

export default tooltip;
