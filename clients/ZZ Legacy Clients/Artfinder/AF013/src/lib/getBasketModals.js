export default () => {
    const modalsElements = document.querySelectorAll('.reveal-modal');
    const modalsElementsReact = document.querySelectorAll('#navbar-basket');
    const revealModals = modalsElements.length ? modalsElements : modalsElementsReact.length ? modalsElementsReact : null;
    let basketViewsMobile = [];
    revealModals.forEach(modal => {
        const modalTitle = modal.querySelector('h3') ?? modal.querySelector('.header-art');
        let titleText = modalTitle?.innerText;
        if (titleText) {
            titleText = titleText.replace(/\s/g, '');
        }
        if (titleText == 'YourBasket') {
            basketViewsMobile.push(modal);
        };
    });
    return basketViewsMobile;
}