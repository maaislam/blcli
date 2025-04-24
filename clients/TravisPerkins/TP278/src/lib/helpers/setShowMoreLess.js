const setShowMoreLess = (id) => {
    const categoryCards = document.querySelectorAll(`.${id}__categoryCard`);
    categoryCards.forEach(categoryCard => {
        const categoryList = categoryCard.querySelector(`.${id}__categoryCard-lists`);
        const items = categoryList.querySelectorAll(`.${id}__category`);

        items.forEach((item, index) => {
            if (index >= 5) {
                item.classList.add(`${id}__hide`);
            }
        });

        const showMoreButton = categoryCard.querySelector('.show-more');
        const showLessButton = categoryCard.querySelector('.show-less');

        if (items.length > 5) {
            if (showLessButton) {
                showLessButton.style.display = 'none';
            }
        } else {
            if (showMoreButton) {
                showMoreButton.style.display = 'none';
            }
        }
    });
};

export default setShowMoreLess;
