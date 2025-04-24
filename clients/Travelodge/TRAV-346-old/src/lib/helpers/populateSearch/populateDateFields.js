import formatDateForDisplay from "./formatDateForDisplay";

const populateDateFields = (id, checkIn, checkOut) => {
    const checkInField = document.querySelector(`.${id}-checkin`);
    const checkOutField = document.querySelector(`.${id}-checkout`);

    if (checkIn) {
        checkInField.textContent = formatDateForDisplay(checkIn);
    }
    if (checkOut) {
        checkOutField.textContent = formatDateForDisplay(checkOut);
    }
};
export default populateDateFields;
