let currentWindowPageYOffset;

const pageScroll = {
    lock() {
        currentWindowPageYOffset = window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = -(currentWindowPageYOffset) + 'px';
    },
    unlock() {
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        currentWindowPageYOffset = currentWindowPageYOffset ? currentWindowPageYOffset : window.pageYOffset;
        window.scrollTo(0, currentWindowPageYOffset);
    },
};

export default pageScroll;