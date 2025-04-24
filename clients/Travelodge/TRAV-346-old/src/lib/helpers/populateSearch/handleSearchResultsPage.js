import applyRoomDetails from "./applyRoomDetails";
import populateDateFields from "./populateDateFields";
import populateSearchInput from "./populateSearchInput";

const handleSearchResultsPage = (id, urlParams) => {
    const location = urlParams.get('location');
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');

    populateSearchInput(id, location);
    populateDateFields(id, checkIn, checkOut);
    applyRoomDetails(id, urlParams);
};

export default handleSearchResultsPage;