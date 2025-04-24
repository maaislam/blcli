const stayAgainSkeleton = (id) => {
    const htmlStr = `
    <div class="${id}__stayAgainSkeleton">
        <div class='${id}__divider'></div>
        <div class="${id}__skeleton-card">
            <div class="skeleton-text-title"></div>
            <div class="skeleton-content">
                <div class="skeleton-image"></div>
                <div class="skeleton-text"></div>
            </div>
        </div>
    </div>`;

    return htmlStr;
};

export default stayAgainSkeleton;