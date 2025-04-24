const skelatonLoader = (id) => {
    const htmlStr = `<div class="${id}__loader">
        <div class="skeleton-animation first-bar"></div>
        <div class="skeleton-animation second-bar"></div>
    </div>`;
    return htmlStr;
};

export default skelatonLoader;
