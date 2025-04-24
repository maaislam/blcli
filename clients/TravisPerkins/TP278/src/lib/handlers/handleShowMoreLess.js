const handleShowMoreLess = (id, target) => {
    const categoryCard = target.closest(`.${id}__categoryCard`);
    if (!categoryCard) return;

    const categoryList = categoryCard.querySelector(`.${id}__categoryCard-lists`);
    const items = categoryList.querySelectorAll(`.${id}__category`);
    const showMoreButton = categoryCard.querySelector('.show-more');
    const showLessButton = categoryCard.querySelector('.show-less');

    if (target === showMoreButton) {
        items.forEach((item, index) => {
            if (index >= 5) {
                item.classList.remove(`${id}__hide`);
            }
        });
        showMoreButton.style.display = 'none';
        showLessButton.style.display = 'inline';
    } else if (target === showLessButton) {
        items.forEach((item, index) => {
            if (index >= 5) {
                item.classList.add(`${id}__hide`);
            }
        });
        showLessButton.style.display = 'none';
        showMoreButton.style.display = 'inline';
    }
};

export default handleShowMoreLess;