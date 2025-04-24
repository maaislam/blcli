const mainModal = (id) => {
    const htmlStr = `
    <div class="${id}__top-sticky-banner ${id}__slide-out">
            <div class="banner-body">
                <div class="banner-copy">Ready for payments without the hassle?</div>
                <div class="banner-button-container">
                    <div class="banner-button css-1gxess1">Chat to us</div>
                </div>
            </div>
        </div>`;

    return htmlStr.trim();
};

export default mainModal;