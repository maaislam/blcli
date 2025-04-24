const searchButton = (id) => {
    const { pathname } = window.location;
    const btnText = pathname !== '/' ? 'Search Again' : 'Search';
    const htmlStr = `<button class="${id}__mainSearchBtn">${btnText}</button>`;

    return htmlStr;
};
export default searchButton;
