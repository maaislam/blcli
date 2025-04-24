import formatDateForDisplay from "./formatDateForDisplay";

const formatDates = (checkIn, checkOut) => {
    const convertToFullYear = (shortYear) => 
      shortYear < 50 ? 2000 + Number(shortYear) : 1900 + Number(shortYear);
  
    const parseDate = (date) => {
      const [day, month, year] = date.split('/');
      return `${day}-${month}-${convertToFullYear(year)}`;
    };
  
    const formattedCheckIn = parseDate(checkIn);
    const formattedCheckOut = parseDate(checkOut);
  
    return `${formattedCheckIn} - ${formattedCheckOut}`;
  };

const populateDateFields = (id, checkIn, checkOut) => {
    const checkInField = document.querySelector(`.${id}-checkin`);
    const checkOutField = document.querySelector(`.${id}-checkout`);
    const calenderInputElem = document.querySelector('#calendar-input');

    calenderInputElem.value = formatDates(checkIn, checkOut);

    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
    });
    calenderInputElem.dispatchEvent(inputEvent);

    if (checkIn) {
        checkInField.textContent = formatDateForDisplay(checkIn);
    }
    if (checkOut) {
        checkOutField.textContent = formatDateForDisplay(checkOut);
    }
};
export default populateDateFields;
