import handleHotelsPage from "./handleHotelsPage";
import handleSearchResultsPage from "./handleSearchResultsPage";
import {pollerLite} from "../../../../../../../lib/uc-lib";

const populateFieldsBasedOnPage = (id) => {
    const { pathname } = window.location;
    const urlParams = new URLSearchParams(window.location.search);

    if (pathname.includes('/search/results')) {
        pollerLite(['.search-form #checkIn'], () => {
            handleSearchResultsPage(id, urlParams);
        });
    } else if (pathname.includes('/hotels')) {
        pollerLite(['#formBookRoom [name="checkIn"]', () => typeof window.hotelInfo === 'object'], () => {
            handleHotelsPage(id, urlParams)
        });
    }
};

export default populateFieldsBasedOnPage;