const isPage = (pages) => {
    return pages.some(p => window.location.href.indexOf(p) > -1);
}

export default isPage;