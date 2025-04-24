import applyRoomDetails from "./applyRoomDetails";
import populateDateFields from "./populateDateFields";
import populateSearchInput from "./populateSearchInput";

const handleSearchResultsPage = (id, urlParams) => {
    const location = urlParams.get('location');
    let checkIn = urlParams.get('checkIn');
    let checkOut = urlParams.get('checkOut');

    if (!checkIn) {
        const controlCheckInElem = document.querySelector('.search-form #checkIn');
        const controlCheckOutElem = document.querySelector('.search-form #checkOut');
        checkIn = controlCheckInElem.dataset.value;
        checkOut = controlCheckOutElem.dataset.value;
    }

    populateSearchInput(id, location);
    populateDateFields(id, checkIn, checkOut);
    applyRoomDetails(id, urlParams);
};

export default handleSearchResultsPage;