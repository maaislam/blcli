import tooltip from "./tooltip";

const planComparison = (id) => {
    const htmlStr = `
        <div class='${id}__plansWrapper'>
            <div class='${id}__plansHeader'>
                <span class='${id}__plansHeader-text'>Compare by cover level</span>
                <div class='${id}__tooltipWrapper'>${tooltip(id)}</div>
                <div class='${id}__showAll'>Show all</div>
            </div>
            <div class="${id}__plans">
                <div class="${id}__plan" data-plan="bronze">Bronze</div>
                <div class="${id}__plan" data-plan="silver">Silver</div>
                <div class="${id}__plan" data-plan="gold">Gold</div>
                <div class="${id}__plan" data-plan="plans">Plans</div>
            </div>
        </div>
        `;

    return htmlStr
};

export default planComparison;
