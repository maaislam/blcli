const mainModal = (id) => {
    const htmlStr = `
    <div class="${id}__top-sticky-banner ${id}__slide-out">
            <div class="banner-body">
                <div class="banner-copy">Want to speak to someone about how you can use ACH Pull?</div>
                <div class="banner-button-container">
                    <div class="banner-button css-1gxess1">Get in touch</div>
                </div>
            </div>
        </div>`;

    return htmlStr.trim();
};

export default mainModal;