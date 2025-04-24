import handleHotelsPage from "./handleHotelsPage";
import handleSearchResultsPage from "./handleSearchResultsPage";

const populateFieldsBasedOnPage = (id) => {
    const {pathname} = window.location;
    const urlParams = new URLSearchParams(window.location.search);

    if (pathname.includes('/search/results')) {
        handleSearchResultsPage(id, urlParams);
    } else if (pathname.includes('/hotels')) {
        handleHotelsPage(id, urlParams)
    }
};

export default populateFieldsBasedOnPage;