const visibleElements = (selectors, id) => selectors.forEach(selector => document.querySelector(selector).classList.add(`${id}__visible`));
export default visibleElements;
