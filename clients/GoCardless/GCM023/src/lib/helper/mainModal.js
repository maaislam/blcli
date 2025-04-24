const mainModal = (id) => {
    const htmlStr = `
    <div class="${id}__top-sticky-banner ${id}__slide-out">
            <div class="banner-body">
                <div class="banner-copy">Prêt à automatiser la façon dont vous êtes payé?</div>
                <div class="banner-button-container">
                    <div class="banner-button css-1gxess1">Contactez-nous</div>
                </div>
            </div>
        </div>`;

    return htmlStr.trim();
};

export default mainModal;