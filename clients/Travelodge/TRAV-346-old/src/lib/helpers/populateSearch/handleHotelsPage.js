import applyRoomDetails from "./applyRoomDetails";
import extractHotelNameFromPath from "./extractHotelNameFromPath";
import populateDateFields from "./populateDateFields";
import populateSearchInput from "./populateSearchInput";

const handleHotelsPage = (id, urlParams) => {
    const location = extractHotelNameFromPath();
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');

    populateSearchInput(id, location);
    populateDateFields(id, checkIn, checkOut);
    applyRoomDetails(id, urlParams);
};

export default handleHotelsPage;