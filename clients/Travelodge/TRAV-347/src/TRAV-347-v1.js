export default (pollerLite) => {
    const addMostPopularClass = (selector) => {
        pollerLite([selector], () => {
            const targetElem = document.body.querySelector(selector);
            if (!targetElem) return;

            let mostPopularClass = 'TRAV-347_extraBreakfast';
            if (selector === '.extra-icon-earlyin') {
                mostPopularClass = 'TRAV-347_extraEarlyCheckIn';
            }

            targetElem.closest('.extras-choice-box').classList.add(mostPopularClass);
        });
    };
    const observeExtraModal = (extraModal) => {
        const obs = new MutationObserver(() => {
            if (!extraModal.classList.contains('show')) return;
            addMostPopularClass('.extra-icon-breakfast');
            addMostPopularClass('.extra-icon-earlyin');
        });
        obs.observe(extraModal, { attributeFilter: ['class'] });
    };
    const init = (elemSelector) => {
        const extraModal = document.body.querySelector(elemSelector);
        if (extraModal?.classList.contains('show')) {
            addMostPopularClass('.extra-icon-breakfast');
            addMostPopularClass('.extra-icon-earlyin');
        }
        observeExtraModal(extraModal);
    };
    if (window.location.pathname.includes('checkout')) {
        pollerLite(['#checkoutExtraModal'], () => init('#checkoutExtraModal'));
    } else {
        pollerLite(['#extraModal'], () => init('#extraModal'));
    }
};