import { fireEvent } from "../../../../../../core-files/services";
import { closeModal } from "../experiment";
import openModal from "../helpers/openModal";

const handleKeydown = (ID, VARIATION) => {
    const morePrdBtn = document.querySelector(`.${ID}__more-product-details`);
    const closeBtn = document.querySelector(`.${ID}__closeWrapper`);

    const keyDownHandler = (e) => {
        const modal = document.querySelector(`.${ID}__modal`);
        const focusableSelectors = `[target="_blank"][href]:not([disabled]), .${ID}__closeWrapper`;
        const focusableElements = modal ? Array.from(modal.querySelectorAll(focusableSelectors)) : [];

        if ((e.key === 'Enter' || e.key === ' ') && e.target === morePrdBtn) {
            e.preventDefault();

            if (VARIATION === '1') {
                fireEvent('Users tapping More Info');
                const moreInfoElement = document.querySelector('[data-qaid="pdp-more-info-link"]');
                moreInfoElement.click();
            } else if (VARIATION === '2') {
                window.lastActiveElement = document.activeElement;
                openModal(ID);
            }
        } else if (modal && modal.classList.contains(`${ID}__open`)) {
            if (e.key === 'Tab') {
                e.preventDefault(); // Prevent default tab behavior
            
                const firstFocusableElement = focusableElements[0];
                const lastFocusableElement = focusableElements[focusableElements.length - 1];
            
                if (e.shiftKey) {
                    // SHIFT + TAB: Cycle to the last element if currently on the first
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                    } else {
                        const index = focusableElements.indexOf(document.activeElement);
                        focusableElements[Math.max(0, index - 1)].focus();
                    }
                } else {
                    // TAB: Cycle to the first element if currently on the last
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                    } else {
                        const index = focusableElements.indexOf(document.activeElement);
                        focusableElements[Math.min(focusableElements.length - 1, index + 1)].focus();
                    }
                }
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }

        //this is for the close button
        if ((e.key === 'Enter' || e.key === 'Escape') && e.target === closeBtn) {
            e.preventDefault();
            closeModal();
        }

        //this is for the escape key only
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    document.body.removeEventListener('keydown', keyDownHandler);
    document.body.addEventListener('keydown', keyDownHandler);
};

export default handleKeydown;
