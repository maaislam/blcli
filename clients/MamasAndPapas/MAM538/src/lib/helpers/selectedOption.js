const selectedOption = (id, option) => {
    const optionSection = document.querySelector(`.${id}__optionSection`);
    const dataLabel = option.dataset.label;
    optionSection.dataset.selected = dataLabel;

    const selectedOption = document.querySelectorAll(`.${id}__option`);

    selectedOption.forEach((selected) => {
        selected.classList.remove(`${id}__selectedOption`);
    });
    option.classList.add(`${id}__selectedOption`);
};
export default selectedOption;
