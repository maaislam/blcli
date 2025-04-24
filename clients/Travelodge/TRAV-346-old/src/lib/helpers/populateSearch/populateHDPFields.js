const populateHDPFields = (id) => {
    const urlParams = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;

    // Extract Hotel Name from URL
    const hotelNameMatch = pathname.match(/\/hotels\/\d+\/([^?]+)/);
    if (hotelNameMatch && hotelNameMatch[1]) {
        const hotelName = hotelNameMatch[1].replace(/-/g, ' '); // Replace hyphens with spaces
        const locationInput = document.querySelector(`.${id}__search-input`);
        if (locationInput) {
            locationInput.value = decodeURIComponent(hotelName);
        }
    }

    // Populate Dates (Check-In and Check-Out)
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const checkInElement = document.querySelector('.TRAV-345-checkin');
    const checkOutElement = document.querySelector('.TRAV-345-checkout');
    if (checkInElement) {
        checkInElement.textContent = checkIn ? decodeURIComponent(checkIn) : 'Check in';
    }
    if (checkOutElement) {
        checkOutElement.textContent = checkOut ? decodeURIComponent(checkOut) : 'Check out';
    }

    // Populate Room Details
    const roomParams = [...urlParams.entries()].filter(([key]) => key.startsWith('rooms'));
    console.log('roomParams: ', roomParams);
    let roomDetails = [];
    roomParams.forEach(([key, value]) => {
        const match = key.match(/rooms\[(\d+)\]\[(.+)\]/);
        if (match) {
            const [_, roomIndex, field] = match; //ignore first element
            roomDetails[roomIndex] = roomDetails[roomIndex] || {};
            roomDetails[roomIndex][field] = value;
        }
    });

    // Update Room Info in "Who?" Section
    const roomLabel = document.querySelector('.TRAV-345__roomLabel');
    if (roomLabel && roomDetails.length > 0) {
        const totalRooms = roomDetails.length;
        let totalAdults = 0;
        let totalChildren = 0;

        roomDetails.forEach((room) => {
            totalAdults += parseInt(room.adults || 0, 10);
            totalChildren += parseInt(room.children || 0, 10);
        });

        roomLabel.textContent = `${totalRooms} Room${totalRooms > 1 ? 's' : ''}, ${totalAdults} Adult${totalAdults > 1 ? 's' : ''}${
            totalChildren > 0 ? `, ${totalChildren} Child${totalChildren > 1 ? 'ren' : ''}` : ''
        }`;
    }

    // Populate individual room fields if needed
    const roomContainers = document.querySelectorAll(`.${id}__room`);
    roomDetails.forEach((room, index) => {
        const roomContainer = roomContainers[index];
        if (roomContainer) {
            const adultsInput = roomContainer.querySelector('.adult-setting .TRAV-345__control input');
            const childrenInput = roomContainer.querySelector('.children-setting .TRAV-345__control input');
            const accessibleInput = roomContainer.querySelector('.accessible-room-setting .custom-checkbox');

            if (adultsInput) adultsInput.value = room.adults || '1';
            if (childrenInput) childrenInput.value = room.children || '0';
            if (accessibleInput) accessibleInput.checked = room.accessible === '1';
        }
    });
};

export default populateHDPFields;