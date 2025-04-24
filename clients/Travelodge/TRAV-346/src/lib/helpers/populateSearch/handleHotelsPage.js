import applyRoomDetails from "./applyRoomDetails";
import extractHotelNameFromPath from "./extractHotelNameFromPath";
import populateDateFields from "./populateDateFields";
import populateSearchInput from "./populateSearchInput";

const handleHotelsPage = (id, urlParams) => {
    const location = extractHotelNameFromPath();
    let checkIn = urlParams.get('checkIn');
    let checkOut = urlParams.get('checkOut');

    if (!checkIn) {
        const controlCheckInElem = document.querySelector('#formBookRoom [name="checkIn"]');
        const controlCheckOutElem = document.querySelector('#formBookRoom [name="checkOut"]');
        checkIn = controlCheckInElem.value;
        checkOut = controlCheckOutElem.value
    }

    populateSearchInput(id, location);
    populateDateFields(id, checkIn, checkOut);
    applyRoomDetails(id, urlParams);
};

export default handleHotelsPage;