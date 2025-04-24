const roomQuantityHandler = (id, isPlus, controlElem) => {
    const inputElem = controlElem.querySelector("input[type='number']");
    const tooltip = controlElem.querySelector(`.${id}__roomTooltipWrapper`);
    const max = parseInt(inputElem.max, 10) || Infinity;
    const min = parseInt(inputElem.min, 10) || 0;

    let currentValue = parseInt(inputElem.value, 10);

    if (isPlus && currentValue < max) {
        currentValue += 1;
    } else if (!isPlus && currentValue > min) {
        currentValue -= 1;
    }

    inputElem.value = currentValue;

    // Show tooltip if max reached for adults
    if (!tooltip) return;

    const contentElem = controlElem.closest(`.${id}__content`);

    console.log('currentValue', currentValue);
    console.log('max', max);

    if (inputElem.id === `${id}__rooms` && currentValue === max && tooltip) {
        contentElem.classList.add(`${id}__content--tooltip`);
        tooltip.style.display = "block";
    } else if (tooltip) {
        contentElem.classList.remove(`${id}__content--tooltip`);
        tooltip.style.display = "none";
    }
};
export default roomQuantityHandler;
