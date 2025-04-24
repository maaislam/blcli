const handleMouseInOut = (menuItem, elements, isItemAdded) => {
    menuItem.forEach((item) => {
        let inTimer;
        item.addEventListener('mouseenter', (e) => {
            console.log(isItemAdded)
            inTimer = setTimeout(() => {
                if (sessionStorage.getItem(`${elements.expId}-ps-survey`) !== 'true' && !isItemAdded) {
                    elements.question.innerText = elements.text
                    elements.surveyOverlay.classList.remove('hidden')
                    elements.surveyContainer.classList.remove('hidden')
                    sessionStorage.setItem(`${elements.expId}-ps-survey`, 'true')
                }
            }, 400);
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(inTimer);
        });
    });
};

export default handleMouseInOut;