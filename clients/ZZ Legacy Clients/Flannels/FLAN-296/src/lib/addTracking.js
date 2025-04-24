import { setup, fireEvent } from '../../../../../core-files/services';

export default () => {
    const modal = document.querySelector('#hotspotModal');
    // Check for when modal is opened/closed
    let modalClassObserver = new MutationObserver(function (event) {
        const opened = modal.classList.contains('in');
        if (opened) {
            fireEvent('Quick view opened');
        }
    });
    modalClassObserver.observe(modal, {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    });
};